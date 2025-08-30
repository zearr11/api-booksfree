import { sequelize } from '../database/sequelize.js'
import { author } from '../models/models.js'
import { NotFoundError404 } from '../utils/exceptions/models.error.js'
import {
  validateNewAuthor,
  validateUpdateAuthor
} from '../utils/validations/author/author.validate.js'

// Obtener autores
export const findAllAuthors = async () => {
  const authors = await author.findAll()
  return authors
}

// Obtener autor por id
export const findAuthorById = async (id) => {
  const authorSearch = await author.findByPk(id)
  if (!authorSearch) throw new NotFoundError404(`El autor con id: ${id} no existe.`)

  return authorSearch
}

// Crear autor
export const saveAuthor = async ({ names, country }) => {
  await validateNewAuthor({
    names, country
  })

  const t = await sequelize.transaction()

  try {
    const newAuthor = await author.create(
      { names, country },
      { transaction: t }
    )
    await t.commit()

    return newAuthor
  } catch (e) {
    await t.rollback()
    throw e
  }
}

// Actualizar autor
export const updateAuthor = async (id, { names, country }) => {
  const t = await sequelize.transaction()

  try {
    const authorUpdated = await author.findByPk(id, {
      transaction: t
    })
    if (!authorUpdated) throw new NotFoundError404(`El autor con id: ${id} no existe.`)
    Object.assign(authorUpdated, { names: names ?? authorUpdated.names, country: country ?? authorUpdated.country })

    await validateUpdateAuthor({
      names: authorUpdated.names,
      country: authorUpdated.country,
      idAuthor: authorUpdated.idAuthor
    })

    await authorUpdated.save({ transaction: t })
    await t.commit()

    return authorUpdated
  } catch (e) {
    await t.rollback()
    throw e
  }
}
