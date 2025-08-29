import { sequelize } from '../database/sequelize.js'
import { categoria } from '../models/modelos.js'
import { NotFoundError404 } from '../utils/exceptions/models.error.js'
import { validateNewCategory, validateUpdateCategory } from '../utils/validations/categoria/categoria.validate.js'

export const getCategorias = async () => {
  const categories = await categoria.findAll()
  return categories
}

export const getCategoriaById = async (id) => {
  const category = await categoria.findByPk(id)
  if (!category) throw new NotFoundError404(`La categoria con id: ${id} no existe.`)

  return category
}

export const createCategoria = async ({ category }) => {
  await validateNewCategory({ category })
  const t = await sequelize.transaction()

  try {
    const newCategory = await categoria.create({
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

export const updateCategoria = async (id, { category }) => {
  const t = await sequelize.transaction()

  try {
    const entityCategory = await categoria.findByPk(id, {
      transaction: t
    })
    if (!entityCategory) throw new NotFoundError404(`La categoria con id: ${id} no existe.`)
    Object.assign(entityCategory, { category: category ?? entityCategory.category })

    await validateUpdateCategory({
      category: entityCategory.category,
      idCategory: entityCategory.id_category
    })

    await entityCategory.save({ transaction: t })

    await t.commit()
    return entityCategory
  } catch (e) {
    await t.rollback()
    throw e
  }
}
