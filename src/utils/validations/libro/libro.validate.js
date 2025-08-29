import { typeSave } from '../../enums.js'
import { BadRequestError400 } from '../../exceptions/models.error.js'
import { validateEntityExist, validateFileExist } from './libro.valid.db.js'

export const validateNewBook = async (bookEntity) => {
  // Validacion basica
  validationNotNull(bookEntity)
  validateIdFile(bookEntity.idFile)
  validateIdPublisher(bookEntity.idPublisher)
  validateIdAuthor(bookEntity.idAuthor)

  // Validacion en db
  await validateEntityExist(bookEntity)
  await validateFileExist(bookEntity.idFile)

  return bookEntity
}

export const validateUpdatedBook = async (currentBook, updatedBook) => {
  if ((!currentBook.title) || currentBook.title === undefined || currentBook.title === null) {
    currentBook.title = updatedBook.title
  }
  if ((!currentBook.description) || currentBook.description === undefined || currentBook.description === null) {
    currentBook.description = updatedBook.description
  }
  if ((!currentBook.year) || currentBook.year === undefined || currentBook.year === null) {
    currentBook.year = updatedBook.year
  }
  if ((!currentBook.idPublisher) || currentBook.idPublisher === undefined || currentBook.idPublisher === null) {
    currentBook.idPublisher = updatedBook.fk_id_publisher
  }
  if ((!currentBook.idAuthor) || currentBook.idAuthor === undefined || currentBook.idAuthor === null) {
    currentBook.idAuthor = updatedBook.fk_id_author
  }
  if (currentBook.isEnable === undefined || currentBook.isEnable === null) {
    currentBook.isEnable = updatedBook.is_enable
  }
  // Validacion basica
  validateIsEnable(currentBook.isEnable)
  validateIdPublisher(currentBook.idPublisher)
  validateIdAuthor(currentBook.idAuthor)

  // Validacion en db
  await validateEntityExist(currentBook)

  return currentBook
}

const validationNotNull = ({ title, description, year, idFile, idPublisher, idAuthor }) => {
  if (!title) throw new BadRequestError400('El campo \'title\' es obligatorio.')
  if (!description) throw new BadRequestError400('El campo \'description\' es obligatorio.')
  if (!year) throw new BadRequestError400('El campo \'year\' es obligatorio.')
  if (!idFile) throw new BadRequestError400('El campo \'idFile\' es obligatorio.')
  if (!idPublisher) throw new BadRequestError400('El campo \'idPublisher\' es obligatorio.')
  if (!idAuthor) throw new BadRequestError400('El campo \'idAuthor\' es obligatorio.')
}

const validateIsEnable = (isEnable) => {
  if (typeof isEnable !== 'boolean') {
    throw new BadRequestError400('El campo \'isEnable\' solo puede ser true o false.')
  }
}

const validateIdFile = (idFile) => {
  if (!Number.isInteger(Number(idFile))) {
    throw new BadRequestError400('El campo \'idFile\' debe ser un número entero válido.')
  }
}

const validateIdPublisher = (idPublisher) => {
  if (!Number.isInteger(Number(idPublisher))) {
    throw new BadRequestError400('El campo \'idPublisher\' debe ser un número entero válido.')
  }
}

const validateIdAuthor = (idAuthor) => {
  if (!Number.isInteger(Number(idAuthor))) {
    throw new BadRequestError400('El campo \'idAuthor\' debe ser un número entero válido.')
  }
}

export const validateDataLibroUser = (bodyData) => {
  validateIdsInSaveLibroUser(bodyData)

  if (!Object.values(typeSave).includes(bodyData.typeSave)) {
    throw new BadRequestError400('El campo \'typeSave\' no es válido.')
  }

  return bodyData
}

export const validateIdsInSaveLibroUser = (bodyData) => {
  if (!bodyData.idUser) {
    throw new BadRequestError400('El campo \'idUser\' es obligatorio.')
  }
  if (!bodyData.idBook) {
    throw new BadRequestError400('El campo \'idBook\' es obligatorio.')
  }

  return bodyData
}
