import { sequelize } from '../database/sequelize.js'
import data from '../models/models.js'
import { NotFoundError404 } from '../utils/exceptions/models.error.js'
import {
  validateNewCategory,
  validateUpdateCategory
} from '../utils/validations/category/category.validate.js'

export const findAllCategories = async () => {
  const categories = await data.category.findAll()
  return categories
}

export const findCategoryById = async (id) => {
  const category = await data.category.findByPk(id)
  if (!category) throw new NotFoundError404(`La categoria con id: ${id} no existe.`)

  return category
}

export const saveCategory = async ({ category }) => {
  await validateNewCategory({ category })
  const t = await sequelize.transaction()

  try {
    const newCategory = await data.category.create({
      category
    }, {
      transaction: t
    })
    await t.commit()

    return newCategory
  } catch (e) {
    await t.rollback()
    throw e
  }
}

export const updateCategory = async (id, { category }) => {
  const t = await sequelize.transaction()

  try {
    const entityCategory = await data.category.findByPk(id, {
      transaction: t
    })
    if (!entityCategory) throw new NotFoundError404(`La categoria con id: ${id} no existe.`)
    Object.assign(entityCategory, { category: category ?? entityCategory.category })

    await validateUpdateCategory({
      category: entityCategory.category,
      idCategory: entityCategory.idCategory
    })

    await entityCategory.save({ transaction: t })
    await t.commit()

    return entityCategory
  } catch (e) {
    await t.rollback()
    throw e
  }
}
