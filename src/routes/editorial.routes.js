import { Router } from 'express'
import { actualizarEditorial, crearEditorial, obtenerEditoriales, obtenerEditorialPorId } from '../controllers/editorial.controller.js'

const router = Router()

router.get('/', obtenerEditoriales)
router.get('/:id', obtenerEditorialPorId)
router.post('/', crearEditorial)
router.put('/:id', actualizarEditorial)

export default router
