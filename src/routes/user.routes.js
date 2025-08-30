import { Router } from 'express'
import {
  getUsers,
  getUserById,
  createUser,
  actualizeUser,
  getAllUserBookByIdUser,
  createUserBook,
  eliminateUserBook
} from '../controllers/user.controller.js'

const router = Router()

router.get('/', getUsers)
router.get('/:id', getUserById)
router.post('/', createUser)
router.put('/:id', actualizeUser)

router.get('/:id/books', getAllUserBookByIdUser)
router.post('/books', createUserBook)
router.delete('/books', eliminateUserBook)

export default router
