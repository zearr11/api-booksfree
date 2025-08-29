import { BadRequestError400 } from '../utils/exceptions/models.error.js'
import {
  createLibro,
  deleteCategoriasInLibro,
  getLibroById,
  getLibrosPaginated,
  insertCategoriasInLibro,
  updateLibro
} from '../services/libro.service.js'

export const obtenerLibros = async (req, res) => {
  const data = await getLibrosPaginated(req.query)
  res.status(200).json(data)
}

export const obtenerLibroPorId = async (req, res) => {
  const data = await getLibroById(req.params.id)
  res.status(200).json(data)
}

export const crearLibro = async (req, res) => {
  if (!req.body) throw new BadRequestError400('Debe declararse el cuerpo de la solicitud.')
  const data = await createLibro(req.body)
  res.status(201).json(data)
}

export const actualizarLibro = async (req, res) => {
  if (!req.body) throw new BadRequestError400('Debe declararse el cuerpo de la solicitud.')
  const data = await updateLibro(req.params.id, req.body)
  res.status(200).json(data)
}

export const agregarCategoriasEnLibro = async (req, res) => {
  if (!req.body) {
    throw new BadRequestError400('Debe declararse el cuerpo de la solicitud.')
  }
  const data = await insertCategoriasInLibro(req.params.id, req.body)
  res.status(200).json(data)
}

export const eliminarCategoriasEnLibro = async (req, res) => {
  if (!req.body) {
    throw new BadRequestError400('Debe declararse el cuerpo de la solicitud.')
  }
  const data = await deleteCategoriasInLibro(req.params.id, req.body)
  res.status(200).json(data)
}
