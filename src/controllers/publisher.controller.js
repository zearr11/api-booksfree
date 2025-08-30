import { BadRequestError400 } from '../utils/exceptions/models.error.js'
import {
  findAllPublishers,
  findPublisherById,
  savePublisher,
  updatePublisher
} from '../services/publisher.service.js'

export const getPublishers = async (req, res) => {
  const data = await findAllPublishers()
  res.status(200).json(data)
}

export const getPublisherById = async (req, res) => {
  const data = await findPublisherById(req.params.id)
  res.status(200).json(data)
}

export const createPublisher = async (req, res) => {
  if (!req.body) throw new BadRequestError400('Debe declararse el cuerpo de la solicitud.')
  const data = await savePublisher(req.body)
  res.status(201).json(data)
}

export const actualizePublisher = async (req, res) => {
  if (!req.body) throw new BadRequestError400('Debe declararse el cuerpo de la solicitud.')
  const data = await updatePublisher(req.params.id, req.body)
  res.status(200).json(data)
}
