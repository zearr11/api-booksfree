import { author } from '../../../models/models.js'
import { ConflictError409 } from '../../exceptions/models.error.js'

const findRepeated = async ({ names, country }) => {
  const authorExist = await author.findAll({
    where: {
      names,
      country
    }
  })
  return authorExist
}

export const validateExistAuthor = async ({ names, country }) => {
  const result = await findRepeated({ names, country })
  if (result.length > 0) {
    throw new ConflictError409('El autor ingresado ya se encuentra registrado.')
  }
}

export const validateOtherAuthor = async ({ names, country, idAuthor }) => {
  const result = await findRepeated({ names, country })
  const existsOther = result.some(obj => obj.idAuthor !== idAuthor)

  if (existsOther) {
    throw new ConflictError409('El autor ingresado ya se encuentra registrado.')
  }
}
