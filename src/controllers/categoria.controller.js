import { createCategoria, getCategoriaById, getCategorias, updateCategoria } from '../services/categoria.service.js'
import { BadRequestError400 } from '../utils/exceptions/models.error.js'

export const obtenerCategorias = async (req, res) => {
  const data = await getCategorias()
  res.status(200).json(data)
}

export const obtenerCategoriaPorId = async (req, res) => {
  const data = await getCategoriaById(req.params.id)
  res.status(200).json(data)
}

export const crearCategoria = async (req, res) => {
  if (!req.body) throw new BadRequestError400('Debe declararse el cuerpo de la solicitud.')
  const data = await createCategoria(req.body)
  res.status(201).json(data)
}

export const actualizarCategoria = async (req, res) => {
  if (!req.body) throw new BadRequestError400('Debe declararse el cuerpo de la solicitud.')
  const data = await updateCategoria(req.params.id, req.body)
  res.status(200).json(data)
}
