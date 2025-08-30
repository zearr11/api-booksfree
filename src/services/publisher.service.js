import { sequelize } from '../database/sequelize.js'
import allModels from '../models/models.js'
import { NotFoundError404 } from '../utils/exceptions/models.error.js'
import {
  validateNewPublisher,
  validateUpdatePublisher
} from '../utils/validations/publisher/publisher.validate.js'

export const findAllPublishers = async () => {
  const publishers = await allModels.publisher.findAll()
  return publishers
}

export const findPublisherById = async (id) => {
  const entity = await allModels.publisher.findByPk(id)

  if (!entity) throw new NotFoundError404(`La editorial con id: ${id} no existe.`)
  return entity
}

export const savePublisher = async ({ publisher }) => {
  await validateNewPublisher({ publisher })
  const t = await sequelize.transaction()

  try {
    const newPublisher = await allModels.publisher.create({
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

export const updatePublisher = async (id, { publisher }) => {
  const t = await sequelize.transaction()

  try {
    const entityPublisher = await allModels.publisher.findByPk(id, {
      transaction: t
    })
    if (!entityPublisher) throw new NotFoundError404(`La editorial con id: ${id} no existe.`)
    Object.assign(entityPublisher, { publisher: publisher ?? entityPublisher.publisher })

    await validateUpdatePublisher({
      publisher: entityPublisher.publisher,
      idPublisher: entityPublisher.idPublisher
    })

    await entityPublisher.save({ transaction: t })
    await t.commit()

    return entityPublisher
  } catch (e) {
    await t.rollback()
    throw e
  }
}
