import { libro } from '../../../models/modelos.js'
import { getFileById } from '../../../services/archivo.service.js'
import { getAutorById } from '../../../services/autor.service.js'
import { getEditorialById } from '../../../services/editorial.service.js'
import { ConflictError409 } from '../../exceptions/models.error.js'

const findExistWithFile = async (idFile) => {
  await getFileById(idFile)

  const result = await libro.findAll({
    where: {
      fk_id_file: idFile
    }
  })
  return result
}

export const validateEntityExist = async ({ idAuthor, idPublisher }) => {
  await getAutorById(idAuthor)
  await getEditorialById(idPublisher)
}

export const validateFileExist = async (idFile) => {
  const result = await findExistWithFile(idFile)

  if (result.length > 0) {
    throw new ConflictError409('El file indicado ya se encuentra asociado a un libro.')
  }
}
