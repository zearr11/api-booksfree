import { createEditorial, getEditorialById, getEditoriales, updateEditorial } from '../services/editorial.service.js'
import { BadRequestError400 } from '../utils/exceptions/models.error.js'

export const obtenerEditoriales = async (req, res) => {
  const data = await getEditoriales()
  res.status(200).json(data)
}

export const obtenerEditorialPorId = async (req, res) => {
  const data = await getEditorialById(req.params.id)
  res.status(200).json(data)
}

export const crearEditorial = async (req, res) => {
  if (!req.body) throw new BadRequestError400('Debe declararse el cuerpo de la solicitud.')
  const data = await createEditorial(req.body)
  res.status(201).json(data)
}

export const actualizarEditorial = async (req, res) => {
  if (!req.body) throw new BadRequestError400('Debe declararse el cuerpo de la solicitud.')
  const data = await updateEditorial(req.params.id, req.body)
  res.status(200).json(data)
}
