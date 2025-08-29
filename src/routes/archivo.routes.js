import { Router } from 'express'
import { actualizarArchivo, crearArchivo } from '../controllers/archivo.controller.js'

const router = Router()

router.post('/', crearArchivo)

router.put('/:id', actualizarArchivo)

export default router
