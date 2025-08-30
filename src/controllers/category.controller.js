import { BadRequestError400 } from '../utils/exceptions/models.error.js'
import {
  findAllCategories,
  findCategoryById,
  saveCategory,
  updateCategory
} from '../services/category.service.js'

export const getCategories = async (req, res) => {
  const data = await findAllCategories()
  res.status(200).json(data)
}

export const getCategoryById = async (req, res) => {
  const data = await findCategoryById(req.params.id)
  res.status(200).json(data)
}

export const createCategory = async (req, res) => {
  if (!req.body) throw new BadRequestError400('Debe declararse el cuerpo de la solicitud.')
  const data = await saveCategory(req.body)
  res.status(201).json(data)
}

export const actualizeCategory = async (req, res) => {
  if (!req.body) throw new BadRequestError400('Debe declararse el cuerpo de la solicitud.')
  const data = await updateCategory(req.params.id, req.body)
  res.status(200).json(data)
}
