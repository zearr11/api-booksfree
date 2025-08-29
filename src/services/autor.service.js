import { sequelize } from '../database/sequelize.js'
import { autor } from '../models/modelos.js'
import { NotFoundError404 } from '../utils/exceptions/models.error.js'
import { validateNewAuthor, validateUpdateAuthor } from '../utils/validations/autor/autor.validate.js'

// Obtener autores
const getAutores = async () => {
  const autores = await autor.findAll()
  return autores
}

// Obtener autor por id
const getAutorById = async (id) => {
  const author = await autor.findByPk(id)
  if (!author) throw new NotFoundError404(`El autor con id: ${id} no existe.`)

  return author
}

// Crear autor
const createAutor = async ({ names, country }) => {
  await validateNewAuthor({
    names, country
  })

  const t = await sequelize.transaction()

  try {
    const newAuthor = await autor.create(
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
const updateAutor = async (id, { names, country }) => {
  const t = await sequelize.transaction()

  try {
    const author = await autor.findByPk(id, {
      transaction: t
    })
    if (!author) throw new NotFoundError404(`El autor con id: ${id} no existe.`)
    Object.assign(author, { names: names ?? author.names, country: country ?? author.country })

    await validateUpdateAuthor({
      names: author.names,
      country: author.country,
      idAutor: author.id_author
    })

    await author.save({ transaction: t })

    await t.commit()
    return author
  } catch (e) {
    await t.rollback()
    throw e
  }
}

export { getAutores, getAutorById, updateAutor, createAutor }
