import { BadRequestError400 } from '../../exceptions/models.error.js'

const MAX_SIZE = 10 * 1024 * 1024

export const validateFile = (fileLib) => {
  if (!fileLib) {
    throw new BadRequestError400('Debe subir el archivo como fileLib.')
  }
  if (fileLib[0].size > MAX_SIZE) {
    throw new BadRequestError400('El archivo excede el tamaño máximo permitido (10MB).')
  }
  if (fileLib[0].mimetype !== 'application/pdf') {
    throw new BadRequestError400('El archivo \'fileLib\' debe ser un PDF.')
  }
}

export const validateImage = (imageLib) => {
  if (!imageLib) {
    throw new BadRequestError400('Debe subir la imagen como imageLib.')
  }
  if (imageLib[0].size > MAX_SIZE) {
    throw new BadRequestError400('La imagen excede el tamaño máximo permitido (10MB).')
  }
  if (!imageLib[0].mimetype.startsWith('image/')) {
    throw new BadRequestError400('El archivo \'imageLib\' debe ser una imagen.')
  }
}
