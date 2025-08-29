import { editorial } from '../../../models/modelos.js'
import { ConflictError409 } from '../../exceptions/models.error.js'

const findRepeated = async ({ publisher }) => {
  const publisherExist = await editorial.findAll({
    where: {
      publisher
    }
  })
  return publisherExist
}

export const validateExistPublisher = async ({ publisher }) => {
  const result = await findRepeated({ publisher })

  if (result.length > 0) {
    throw new ConflictError409('La editorial ingresada ya se encuentra registrada.')
  }
}

export const validateOtherPublisher = async ({ publisher, idPublisher }) => {
  const result = await findRepeated({ publisher })
  const existsOther = result.some(obj => obj.id_publisher !== idPublisher)

  if (existsOther) {
    throw new ConflictError409('La editorial ingresada ya se encuentra registrada.')
  }
}
