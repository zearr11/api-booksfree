import { book } from '../../../models/models.js'
import { findFileById } from '../../../services/file.service.js'
import { findAuthorById } from '../../../services/author.service.js'
import { findPublisherById } from '../../../services/publisher.service.js'
import { ConflictError409 } from '../../exceptions/models.error.js'

const findExistWithFile = async (idFile) => {
  await findFileById(idFile)

  const result = await book.findAll({
    where: {
      fkIdFile: idFile
    }
  })
  return result
}

export const validateEntityExist = async ({ idAuthor, idPublisher }) => {
  await findAuthorById(idAuthor)
  await findPublisherById(idPublisher)
}

export const validateFileExist = async (idFile) => {
  const result = await findExistWithFile(idFile)

  if (result.length > 0) {
    throw new ConflictError409('El file indicado ya se encuentra asociado a un libro.')
  }
}
