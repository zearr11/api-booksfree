import multer from 'multer'

export const loadInMemory = multer({
  storage: multer.memoryStorage()
})
