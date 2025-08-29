import { Router } from 'express'
import {
  actualizarLibro,
  agregarCategoriasEnLibro,
  crearLibro,
  eliminarCategoriasEnLibro,
  obtenerLibroPorId,
  obtenerLibros
} from '../controllers/libro.controller.js'

const router = Router()

router.get('/', obtenerLibros)
router.get('/:id', obtenerLibroPorId)
router.post('/', crearLibro)
router.put('/:id', actualizarLibro)

router.post('/categories/:id', agregarCategoriasEnLibro)
router.delete('/categories/:id', eliminarCategoriasEnLibro)

export default router
