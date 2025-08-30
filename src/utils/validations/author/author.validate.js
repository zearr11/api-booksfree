import { BadRequestError400 } from '../../exceptions/models.error.js'
import { validateExistAuthor, validateOtherAuthor } from './author.valid.db.js'

export const validateNewAuthor = async ({ names, country }) => {
  validationNotNull({ names, country })
  await validateExistAuthor({ names, country })
}

export const validateUpdateAuthor = async ({ names, country, idAuthor }) => {
  await validateOtherAuthor({ names, country, idAuthor })
}

const validationNotNull = ({ names, country }) => {
  if (!names) throw new BadRequestError400('El campo \'names\' es obligatorio.')
  if (!country) throw new BadRequestError400('El campo \'country\' es obligatorio.')
}
