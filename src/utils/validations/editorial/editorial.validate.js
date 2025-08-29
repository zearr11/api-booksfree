import { BadRequestError400 } from '../../exceptions/models.error.js'
import { validateExistPublisher, validateOtherPublisher } from './editorial.valid.db.js'

export const validateNewPublisher = async ({ publisher }) => {
  if (!publisher) throw new BadRequestError400('El campo \'publisher\' es obligatorio.')
  await validateExistPublisher({ publisher })
}

export const validateUpdatePublisher = async ({ publisher, idPublisher }) => {
  await validateOtherPublisher({ publisher, idPublisher })
}
