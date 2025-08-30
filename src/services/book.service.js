import { sequelize } from '../database/sequelize.js'
import { file, author, category, publisher, book } from '../models/models.js'
import { deconstructBook } from '../utils/converts/book.util.js'
import { NotFoundError404 } from '../utils/exceptions/models.error.js'
import { validateArrayCategories } from '../utils/validations/category/category.validate.js'
import {
  validateNewBook,
  validateUpdatedBook
} from '../utils/validations/book/book.validate.js'
import { validatePageAndSize } from '../utils/validations/paginated.validate.js'
import { findCategoryById } from './category.service.js'

const filterQuery = {
  attributes: { exclude: ['fkIdFile', 'fkIdPublisher', 'fkIdAuthor'] },
  include: [
    {
      model: file,
      as: 'file'
    },
    {
      model: publisher,
      as: 'publisher',
      attributes: ['publisher']
    },
    {
      model: author,
      as: 'author',
      attributes: ['names']
    },
    {
      model: category,
      as: 'categories',
      attributes: ['category'],
      through: { attributes: [] }
    }
  ]
}

export const findAllBooksPaginated = async (params) => {
  const { page = 1, size = 10 } = params
  validatePageAndSize({ page, size })

  const limit = Number(size)
  const offset = (Number(page) - 1) * limit

  const options = {
    limit,
    offset,
    ...filterQuery
  }

  const { count, rows } = await book.findAndCountAll(options)

  const result = rows.map(l => deconstructBook(l))

  return {
    page: Number(page), // número de página actual
    pageSize: limit, // cantidad solicitada por página
    itemsOnPage: result.length, // cantidad real en esta página
    totalItems: count, // total de registros
    totalPages: Math.ceil(count / limit), // total de páginas
    data: result
  }
}

export const findBookById = async (id) => {
  const bookSearch = await book.findByPk(id, filterQuery)
  if (!bookSearch) throw new NotFoundError404(`El libro con id: ${id} no existe.`)
  return deconstructBook(bookSearch)
}

export const saveBook = async (bookEntity) => {
  const {
    title,
    description,
    year,
    idFile,
    idPublisher,
    idAuthor
  } = await validateNewBook(bookEntity)

  const t = await sequelize.transaction()

  try {
    const newBook = await book.create({
      title,
      description,
      year,
      fkIdFile: idFile,
      fkIdPublisher: idPublisher,
      fkIdAuthor: idAuthor
    }, { transaction: t })

    await t.commit()
    return deconstructBook(
      await book.findByPk(newBook.idBook, filterQuery)
    )
  } catch (e) {
    await t.rollback()
    throw e
  }
}

export const updateBook = async (id, currentBook) => {
  const t = await sequelize.transaction()

  try {
    const updatedBook = await book.findByPk(id, {
      transaction: t
    })

    if (!updatedBook) throw new NotFoundError404(`El libro con id: ${id} no existe.`)

    const bookValid = await validateUpdatedBook(currentBook, updatedBook)

    Object.assign(updatedBook, {
      title: bookValid.title,
      description: bookValid.description,
      year: bookValid.year,
      fkIdPublisher: bookValid.idPublisher,
      fkIdAuthor: bookValid.idAuthor,
      isEnabled: bookValid.isEnabled
    })

    await updatedBook.save({ transaction: t })
    await t.commit()

    return deconstructBook(
      await book.findByPk(updatedBook.idBook, filterQuery)
    )
  } catch (e) {
    await t.rollback()
    throw e
  }
}

export const saveCategoriesInBook = async (id, bodyCategories) => {
  const { categories } = validateArrayCategories(bodyCategories)
  const bookSearch = await book.findByPk(id)
  if (!bookSearch) throw new NotFoundError404(`El libro con id: ${id} no existe.`)

  for (let i = 0; i < categories.length; i++) {
    await findCategoryById(categories[i])
  }

  await bookSearch.addCategories(categories)

  return deconstructBook(
    await book.findByPk(bookSearch.idBook, filterQuery)
  )
}

export const deleteCategoriesInBook = async (id, bodyCategories) => {
  const { categories } = validateArrayCategories(bodyCategories)
  const bookSearch = await book.findByPk(id)
  if (!bookSearch) throw new NotFoundError404(`El libro con id: ${id} no existe.`)

  for (let i = 0; i < categories.length; i++) {
    await findCategoryById(categories[i])
  }

  await bookSearch.removeCategories(categories)

  return deconstructBook(
    await book.findByPk(bookSearch.idBook, filterQuery)
  )
}
