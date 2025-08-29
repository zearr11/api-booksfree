import { createAutor, getAutorById, getAutores, updateAutor } from '../services/autor.service.js'
import { BadRequestError400 } from '../utils/exceptions/models.error.js'

export const obtenerAutores = async (req, res) => {
  const data = await getAutores()
  res.status(200).json(data)
}

export const obtenerAutorPorId = async (req, res) => {
  const data = await getAutorById(req.params.id)
  res.status(200).json(data)
}

export const crearAutor = async (req, res) => {
  if (!req.body) throw new BadRequestError400('Debe declararse el cuerpo de la solicitud.')
  const data = await createAutor(req.body)
  res.status(201).json(data)
}

export const actualizarAutor = async (req, res) => {
  if (!req.body) throw new BadRequestError400('Debe declararse el cuerpo de la solicitud.')
  const data = await updateAutor(req.params.id, req.body)
  res.status(200).json(data)
}
