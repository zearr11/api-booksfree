import { sequelize } from '../database/sequelize.js'
import { archivo, autor, categoria, editorial, libro } from '../models/modelos.js'
import { deconstructBook } from '../utils/converts/libro.util.js'
import { NotFoundError404 } from '../utils/exceptions/models.error.js'
import { validateArrayCategories } from '../utils/validations/categoria/categoria.validate.js'
import { validateNewBook, validateUpdatedBook } from '../utils/validations/libro/libro.validate.js'
import { validatePageAndSize } from '../utils/validations/paginated.validate.js'
import { getCategoriaById } from './categoria.service.js'

const filterQuery = {
  attributes: { exclude: ['fk_id_file', 'fk_id_publisher', 'fk_id_author'] },
  include: [
    {
      model: archivo,
      as: 'archivo',
      attributes: ['url_img', 'url_file']
    },
    {
      model: editorial,
      as: 'editorial',
      attributes: ['publisher']
    },
    {
      model: autor,
      as: 'autor',
      attributes: ['names']
    },
    {
      model: categoria,
      as: 'categorias',
      attributes: ['category'],
      through: { attributes: [] }
    }
  ]
}

export const getLibrosPaginated = async (params) => {
  const { page = 1, size = 10 } = params
  validatePageAndSize({ page, size })

  const limit = Number(size)
  const offset = (Number(page) - 1) * limit

  const options = {
    limit,
    offset,
    ...filterQuery
  }

  const { count, rows } = await libro.findAndCountAll(options)

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

export const getLibroById = async (id) => {
  const book = await libro.findByPk(id, filterQuery)
  if (!book) throw new NotFoundError404(`El libro con id: ${id} no existe.`)
  return deconstructBook(book)
}

export const createLibro = async (bookEntity) => {
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
    const newBook = await libro.create({
      title,
      description,
      year,
      fk_id_file: idFile,
      fk_id_publisher: idPublisher,
      fk_id_author: idAuthor
    }, { transaction: t })

    await t.commit()
    return deconstructBook(
      await libro.findByPk(newBook.id_book, filterQuery)
    )
  } catch (e) {
    await t.rollback()
    throw e
  }
}

export const updateLibro = async (id, currentBook) => {
  const t = await sequelize.transaction()

  try {
    const updatedBook = await libro.findByPk(id, {
      transaction: t
    })

    if (!updatedBook) throw new NotFoundError404(`El libro con id: ${id} no existe.`)

    const bookValid = await validateUpdatedBook(currentBook, updatedBook)

    Object.assign(updatedBook, {
      title: bookValid.title,
      description: bookValid.description,
      year: bookValid.year,
      fk_id_publisher: bookValid.idPublisher,
      fk_id_author: bookValid.idAuthor,
      is_enable: bookValid.isEnable
    })

    await updatedBook.save({ transaction: t })
    await t.commit()

    return deconstructBook(
      await libro.findByPk(updatedBook.id_book, filterQuery)
    )
  } catch (e) {
    await t.rollback()
    throw e
  }
}

export const insertCategoriasInLibro = async (id, bodyCategories) => {
  const { categories } = validateArrayCategories(bodyCategories)
  const book = await libro.findByPk(id)
  if (!book) throw new NotFoundError404(`El libro con id: ${id} no existe.`)

  for (let i = 0; i < categories.length; i++) {
    await getCategoriaById(categories[i])
  }

  await book.addCategorias(categories)

  return deconstructBook(
    await libro.findByPk(book.id_book, filterQuery)
  )
}

export const deleteCategoriasInLibro = async (id, bodyCategories) => {
  const { categories } = validateArrayCategories(bodyCategories)
  const book = await libro.findByPk(id)
  if (!book) throw new NotFoundError404(`El libro con id: ${id} no existe.`)

  for (let i = 0; i < categories.length; i++) {
    await getCategoriaById(categories[i])
  }

  await book.removeCategorias(categories)

  return deconstructBook(
    await libro.findByPk(book.id_book, filterQuery)
  )
}
