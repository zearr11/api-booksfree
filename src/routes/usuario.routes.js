import { Router } from 'express'
import {
  actualizarUsuario,
  buscarLibrosGuardadosPorUser,
  crearUsuario,
  eliminarLibroEnUsuario,
  guardarLibroEnUsuario,
  obtenerUsuarioPorId,
  obtenerUsuarios
} from '../controllers/usuario.controller.js'

const router = Router()

router.get('/', obtenerUsuarios)
router.get('/:id', obtenerUsuarioPorId)
router.post('/', crearUsuario)
router.put('/:id', actualizarUsuario)

router.get('/books/:id', buscarLibrosGuardadosPorUser)
router.post('/books', guardarLibroEnUsuario)
router.delete('/books', eliminarLibroEnUsuario)

export default router
