import { Router } from 'express'
import {
  getBooks,
  getBookById,
  createBook,
  actualizeBook,
  createCategoriesInBook,
  eliminateCategoriesInBook
} from '../controllers/book.controller.js'

const router = Router()

router.get('/', getBooks)
router.get('/:id', getBookById)
router.post('/', createBook)
router.put('/:id', actualizeBook)

router.post('/:id/categories', createCategoriesInBook)
router.delete('/:id/categories', eliminateCategoriesInBook)

export default router
