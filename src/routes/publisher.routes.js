import { Router } from 'express'
import {
  getPublishers,
  getPublisherById,
  createPublisher,
  actualizePublisher
} from '../controllers/publisher.controller.js'

const router = Router()

router.get('/', getPublishers)
router.get('/:id', getPublisherById)
router.post('/', createPublisher)
router.put('/:id', actualizePublisher)

export default router
