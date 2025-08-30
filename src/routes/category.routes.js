import { Router } from 'express'
import {
  getCategories,
  getCategoryById,
  createCategory,
  actualizeCategory
} from '../controllers/category.controller.js'

const router = Router()

router.get('/', getCategories)
router.get('/:id', getCategoryById)
router.post('/', createCategory)
router.put('/:id', actualizeCategory)

export default router
