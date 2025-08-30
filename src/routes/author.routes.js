import { Router } from 'express'
import {
  getAuthors,
  getAuthorById,
  createAuthor,
  actualizeAuthor
} from '../controllers/author.controller.js'

const router = Router()

router.get('/', getAuthors)
router.get('/:id', getAuthorById)
router.post('/', createAuthor)
router.put('/:id', actualizeAuthor)

export default router
