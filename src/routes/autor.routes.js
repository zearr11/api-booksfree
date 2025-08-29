import { Router } from 'express'
import { actualizarAutor, crearAutor, obtenerAutores, obtenerAutorPorId } from '../controllers/autor.controller.js'

const router = Router()

router.get('/', obtenerAutores)
router.get('/:id', obtenerAutorPorId)
router.post('/', crearAutor)
router.put('/:id', actualizarAutor)

export default router
