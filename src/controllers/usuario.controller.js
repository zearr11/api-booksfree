import { BadRequestError400 } from '../utils/exceptions/models.error.js'
import {
  createUsuario,
  deleteLibroInUser,
  getUsuarioById,
  getUsuariosPaginated,
  saveLibroInUser,
  searchLibrosForUser,
  updateUsuario
} from '../services/usuario.service.js'

const obtenerUsuarios = async (req, res) => {
  const data = await getUsuariosPaginated(req.query)
  res.status(200).json(data)
}

const obtenerUsuarioPorId = async (req, res) => {
  const data = await getUsuarioById(req.params.id)
  res.status(200).json(data)
}

const crearUsuario = async (req, res) => {
  if (!req.body) throw new BadRequestError400('Debe declararse el cuerpo de la solicitud.')
  const data = await createUsuario(req.body)
  res.status(201).json(data)
}

const actualizarUsuario = async (req, res) => {
  if (!req.body) throw new BadRequestError400('Debe declararse el cuerpo de la solicitud.')
  const data = await updateUsuario(req.params.id, req.body)
  res.status(200).json(data)
}

const buscarLibrosGuardadosPorUser = async (req, res) => {
  const data = await searchLibrosForUser(req.params.id)
  res.status(200).json(data)
}

const guardarLibroEnUsuario = async (req, res) => {
  if (!req.body) {
    throw new BadRequestError400('Debe declararse el cuerpo de la solicitud.')
  }
  const data = await saveLibroInUser(req.body)
  res.status(200).json(data)
}

const eliminarLibroEnUsuario = async (req, res) => {
  if (!req.body) {
    throw new BadRequestError400('Debe declararse el cuerpo de la solicitud.')
  }
  const data = await deleteLibroInUser(req.body)
  res.status(200).json(data)
}

export {
  obtenerUsuarios,
  obtenerUsuarioPorId,
  crearUsuario,
  actualizarUsuario,
  guardarLibroEnUsuario,
  eliminarLibroEnUsuario,
  buscarLibrosGuardadosPorUser
}
