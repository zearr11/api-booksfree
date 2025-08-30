import data from '../../../models/models.js'
import { ConflictError409 } from '../../exceptions/models.error.js'

const findRepeated = async ({ publisher }) => {
  const publisherExist = await data.publisher.findAll({
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
  const existsOther = result.some(obj => obj.idPublisher !== idPublisher)

  if (existsOther) {
    throw new ConflictError409('La editorial ingresada ya se encuentra registrada.')
  }
}
