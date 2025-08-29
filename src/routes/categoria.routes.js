import { Router } from 'express'
import { actualizarCategoria, crearCategoria, obtenerCategoriaPorId, obtenerCategorias } from '../controllers/categoria.controller.js'

const router = Router()

router.get('/', obtenerCategorias)
router.get('/:id', obtenerCategoriaPorId)
router.post('/', crearCategoria)
router.put('/:id', actualizarCategoria)

export default router
