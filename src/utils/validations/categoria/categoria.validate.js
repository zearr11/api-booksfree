import { BadRequestError400 } from '../../exceptions/models.error.js'
import { validateExistCategory, validateOtherCategory } from './categoria.valid.db.js'

export const validateNewCategory = async ({ category }) => {
  if (!category) throw new BadRequestError400('El campo \'category\' es obligatorio.')
  await validateExistCategory({ category })
}

export const validateUpdateCategory = async ({ category, idCategory }) => {
  await validateOtherCategory({ category, idCategory })
}

export const validateArrayCategories = (bodyCategories) => {
  if (!bodyCategories.categories) {
    throw new BadRequestError400('Debe declararse \'categories\' con sus ids.')
  }

  return bodyCategories
}
