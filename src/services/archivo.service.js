import { deleteFromCloudinary, uploadToCloudinary } from '../config/cloudinary.config.js'
import { CLOUDINARY_FOLDER_FILES, CLOUDINARY_FOLDER_IMAGES } from '../config/env.config.js'
import { archivo } from '../models/libro/archivo.js'
import { NotFoundError404 } from '../utils/exceptions/models.error.js'
import { validateFile, validateImage } from '../utils/validations/archivo/archivo.validate.js'

export const getFileById = async (id) => {
  const file = await archivo.findByPk(id)
  if (!file) throw new NotFoundError404(`El file con id: ${id} no existe.`)
  return file
}

export const uploadFilesEntity = async (fileLib, imageLib) => {
  validateFile(fileLib)
  validateImage(imageLib)

  const uploadedFile = await uploadToCloudinary(fileLib[0], CLOUDINARY_FOLDER_FILES)
  const uploadedImage = await uploadToCloudinary(imageLib[0], CLOUDINARY_FOLDER_IMAGES)

  const dataFiles = {
    urlFile: uploadedFile.secure_url,
    urlImage: uploadedImage.secure_url
  }

  const newFile = await archivo.create({
    url_file: dataFiles.urlFile,
    url_img: dataFiles.urlImage
  })

  return newFile
}

export const updateFilesEntity = async (fileLib, imageLib, id) => {
  const fileToUpdate = await archivo.findByPk(id)

  if (!fileToUpdate) {
    throw new NotFoundError404(`El file con id: ${id} no existe.`)
  }

  if (fileLib) {
    validateFile(fileLib)
    await deleteFromCloudinary(fileToUpdate.url_file)
    const uploadedFile = await uploadToCloudinary(fileLib[0], CLOUDINARY_FOLDER_FILES)
    fileToUpdate.url_file = uploadedFile.secure_url
  }
  if (imageLib) {
    validateImage(imageLib)
    await deleteFromCloudinary(fileToUpdate.url_img)
    const uploadedImage = await uploadToCloudinary(imageLib[0], CLOUDINARY_FOLDER_IMAGES)
    fileToUpdate.url_img = uploadedImage.secure_url
  }

  await fileToUpdate.save()

  return fileToUpdate
}
