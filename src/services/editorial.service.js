import { sequelize } from '../database/sequelize.js'
import { editorial } from '../models/libro/editorial.js'
import { NotFoundError404 } from '../utils/exceptions/models.error.js'
import { validateNewPublisher, validateUpdatePublisher } from '../utils/validations/editorial/editorial.validate.js'

export const getEditoriales = async () => {
  const publishers = await editorial.findAll()
  return publishers
}

export const getEditorialById = async (id) => {
  const entity = await editorial.findByPk(id)

  if (!entity) throw new NotFoundError404(`La editorial con id: ${id} no existe.`)
  return entity
}

export const createEditorial = async ({ publisher }) => {
  await validateNewPublisher({ publisher })
  const t = await sequelize.transaction()

  try {
    const newPublisher = await editorial.create({
      publisher
    }, {
      transaction: t
    })
    await t.commit()

    return newPublisher
  } catch (e) {
    await t.rollback()
    throw e
  }
}

export const updateEditorial = async (id, { publisher }) => {
  const t = await sequelize.transaction()

  try {
    const entityPublisher = await editorial.findByPk(id, {
      transaction: t
    })
    if (!entityPublisher) throw new NotFoundError404(`La editorial con id: ${id} no existe.`)
    Object.assign(entityPublisher, { publisher: publisher ?? entityPublisher.publisher })

    await validateUpdatePublisher({
      publisher: entityPublisher.publisher,
      idPublisher: entityPublisher.id_publisher
    })

    await entityPublisher.save({ transaction: t })

    await t.commit()
    return entityPublisher
  } catch (e) {
    await t.rollback()
    throw e
  }
}
