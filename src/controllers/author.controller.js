import { BadRequestError400 } from '../utils/exceptions/models.error.js'
import {
  findAllAuthors,
  findAuthorById,
  saveAuthor,
  updateAuthor
} from '../services/author.service.js'

export const getAuthors = async (req, res) => {
  const data = await findAllAuthors()
  res.status(200).json(data)
}

export const getAuthorById = async (req, res) => {
  const data = await findAuthorById(req.params.id)
  res.status(200).json(data)
}

export const createAuthor = async (req, res) => {
  if (!req.body) throw new BadRequestError400('Debe declararse el cuerpo de la solicitud.')
  const data = await saveAuthor(req.body)
  res.status(201).json(data)
}

export const actualizeAuthor = async (req, res) => {
  if (!req.body) throw new BadRequestError400('Debe declararse el cuerpo de la solicitud.')
  const data = await updateAuthor(req.params.id, req.body)
  res.status(200).json(data)
}
