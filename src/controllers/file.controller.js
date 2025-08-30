import { loadInMemory } from '../config/multer.config.js'
import { BadRequestError400 } from '../utils/exceptions/models.error.js'
import {
  saveFile,
  updateFile
} from '../services/file.service.js'

export const createFile = async (req, res, next) => {
  await connectWithService(req, res, next)
}

export const actualizeFile = async (req, res, next) => {
  await connectWithService(req, res, next)
}

const connectWithService = async (req, res, next) => {
  const memory = loadInMemory.fields([
    { name: 'fileLib', maxCount: 1 },
    { name: 'imageLib', maxCount: 1 }
  ])

  memory(req, res, async (err) => {
    if (err) {
      return next(new BadRequestError400(err.message))
    }
    if (!req.files || Object.keys(req.files).length === 0) {
      return next(new BadRequestError400('No se recibieron archivos.'))
    }

    const { fileLib, imageLib } = req.files

    try {
      const data = (req.params.id)
        ? await updateFile(fileLib, imageLib, req.params.id)
        : await saveFile(fileLib, imageLib)

      res.status(201).json(data)
    } catch (error) {
      next(error)
    }
  })
}
