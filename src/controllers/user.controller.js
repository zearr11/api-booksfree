import { BadRequestError400 } from '../utils/exceptions/models.error.js'
import {
  findAllUsersPaginated,
  findUserById,
  saveUser,
  updateUser,
  findAllUserBookByIdUser,
  saveUserBook,
  deleteUserBook
} from '../services/user.service.js'

export const getUsers = async (req, res) => {
  const data = await findAllUsersPaginated(req.query)
  res.status(200).json(data)
}

export const getUserById = async (req, res) => {
  const data = await findUserById(req.params.id)
  res.status(200).json(data)
}

export const createUser = async (req, res) => {
  if (!req.body) throw new BadRequestError400('Debe declararse el cuerpo de la solicitud.')
  const data = await saveUser(req.body)
  res.status(201).json(data)
}

export const actualizeUser = async (req, res) => {
  if (!req.body) throw new BadRequestError400('Debe declararse el cuerpo de la solicitud.')
  const data = await updateUser(req.params.id, req.body)
  res.status(200).json(data)
}

export const getAllUserBookByIdUser = async (req, res) => {
  const data = await findAllUserBookByIdUser(req.params.id)
  res.status(200).json(data)
}

export const createUserBook = async (req, res) => {
  if (!req.body) throw new BadRequestError400('Debe declararse el cuerpo de la solicitud.')
  const data = await saveUserBook(req.body)
  res.status(200).json(data)
}

export const eliminateUserBook = async (req, res) => {
  if (!req.body) throw new BadRequestError400('Debe declararse el cuerpo de la solicitud.')
  const data = await deleteUserBook(req.body)
  res.status(200).json(data)
}
