import { BadRequestError400 } from '../utils/exceptions/models.error.js'
import {
  findAllBooksPaginated,
  findBookById,
  saveBook,
  updateBook,
  saveCategoriesInBook,
  deleteCategoriesInBook
} from '../services/book.service.js'

export const getBooks = async (req, res) => {
  const data = await findAllBooksPaginated(req.query)
  res.status(200).json(data)
}

export const getBookById = async (req, res) => {
  const data = await findBookById(req.params.id)
  res.status(200).json(data)
}

export const createBook = async (req, res) => {
  if (!req.body) throw new BadRequestError400('Debe declararse el cuerpo de la solicitud.')
  const data = await saveBook(req.body)
  res.status(201).json(data)
}

export const actualizeBook = async (req, res) => {
  if (!req.body) throw new BadRequestError400('Debe declararse el cuerpo de la solicitud.')
  const data = await updateBook(req.params.id, req.body)
  res.status(200).json(data)
}

export const createCategoriesInBook = async (req, res) => {
  if (!req.body) {
    throw new BadRequestError400('Debe declararse el cuerpo de la solicitud.')
  }
  const data = await saveCategoriesInBook(req.params.id, req.body)
  res.status(200).json(data)
}

export const eliminateCategoriesInBook = async (req, res) => {
  if (!req.body) {
    throw new BadRequestError400('Debe declararse el cuerpo de la solicitud.')
  }
  const data = await deleteCategoriesInBook(req.params.id, req.body)
  res.status(200).json(data)
}
