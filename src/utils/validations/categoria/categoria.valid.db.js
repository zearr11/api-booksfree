import { categoria } from '../../../models/modelos.js'
import { ConflictError409 } from '../../exceptions/models.error.js'

const findRepeated = async ({ category }) => {
  const categoryExist = await categoria.findAll({
    where: {
      category
    }
  })
  return categoryExist
}

export const validateExistCategory = async ({ category }) => {
  const result = await findRepeated({ category })

  if (result.length > 0) {
    throw new ConflictError409('La categoria ingresada ya se encuentra registrada.')
  }
}

export const validateOtherCategory = async ({ category, idCategory }) => {
  const result = await findRepeated({ category })
  const existsOther = result.some(obj => obj.id_category !== idCategory)

  if (existsOther) {
    throw new ConflictError409('La categoria ingresada ya se encuentra registrada.')
  }
}
