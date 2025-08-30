import streamifier from 'streamifier'
import { v2 as cloudinary } from 'cloudinary'
import { ConflictError409 } from '../utils/exceptions/models.error.js'
import {
  CLOUDINARY_API_KEY,
  CLOUDINARY_API_SECRET,
  CLOUDINARY_CLOUD_NAME
} from './env.config.js'

cloudinary.config({
  cloud_name: CLOUDINARY_CLOUD_NAME,
  api_key: CLOUDINARY_API_KEY,
  api_secret: CLOUDINARY_API_SECRET
})

const deleteFromCloudinary = async (url) => {
  const startIn = url.indexOf('lib-online')
  const finishIn = url.lastIndexOf('.')
  const publicId = url.slice(startIn, finishIn)

  return cloudinary.uploader.destroy(publicId)
}

const uploadToCloudinary = (file, folder) => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { folder },
      (error, result) => {
        if (error) reject(new ConflictError409('Error al subir archivos a Cloudinary.'))
        else resolve(result)
      }
    )
    streamifier.createReadStream(file.buffer).pipe(stream)
  })
}

export { uploadToCloudinary, deleteFromCloudinary }
