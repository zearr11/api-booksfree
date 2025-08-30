import { Router } from 'express'
import {
  createFile,
  actualizeFile
} from '../controllers/file.controller.js'

const router = Router()

router.post('/', createFile)
router.put('/:id', actualizeFile)

export default router
