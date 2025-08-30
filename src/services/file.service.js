import {
  deleteFromCloudinary,
  uploadToCloudinary
} from '../config/cloudinary.config.js'
import {
  CLOUDINARY_FOLDER_FILES,
  CLOUDINARY_FOLDER_IMAGES
} from '../config/env.config.js'
import { file } from '../models/models.js'
import { NotFoundError404 } from '../utils/exceptions/models.error.js'
import { validateFile, validateImage } from '../utils/validations/file/file.validate.js'

export const findFileById = async (id) => {
  const fileSearch = await file.findByPk(id)
  if (!fileSearch) throw new NotFoundError404(`El file con id: ${id} no existe.`)
  return fileSearch
}

export const saveFile = async (fileLib, imageLib) => {
  validateFile(fileLib)
  validateImage(imageLib)

  const uploadedFile = await uploadToCloudinary(fileLib[0], CLOUDINARY_FOLDER_FILES)
  const uploadedImage = await uploadToCloudinary(imageLib[0], CLOUDINARY_FOLDER_IMAGES)

  const newFile = await file.create({
    urlFile: uploadedFile.secure_url,
    urlImg: uploadedImage.secure_url
  })

  return newFile
}

export const updateFile = async (fileLib, imageLib, id) => {
  const fileToUpdate = await file.findByPk(id)

  if (!fileToUpdate) {
    throw new NotFoundError404(`El file con id: ${id} no existe.`)
  }

  if (fileLib) {
    validateFile(fileLib)
    await deleteFromCloudinary(fileToUpdate.urlFile)
    const uploadedFile = await uploadToCloudinary(fileLib[0], CLOUDINARY_FOLDER_FILES)
    fileToUpdate.urlFile = uploadedFile.secure_url
  }

  if (imageLib) {
    validateImage(imageLib)
    await deleteFromCloudinary(fileToUpdate.urlImg)
    const uploadedImage = await uploadToCloudinary(imageLib[0], CLOUDINARY_FOLDER_IMAGES)
    fileToUpdate.urlImg = uploadedImage.secure_url
  }

  await fileToUpdate.save()

  return fileToUpdate
}
