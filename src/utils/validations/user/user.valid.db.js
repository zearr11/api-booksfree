import { person, user } from '../../../models/models.js'
import { ConflictError409 } from '../../exceptions/models.error.js'

const findDocIden = async ({ typeDocEnum, nid }) => {
  const typeAndNumDocExist = await person.findAll({
    where: {
      typeDoc: typeDocEnum,
      nid
    }
  })
  return typeAndNumDocExist
}

const findEmail = async ({ email }) => {
  const emailExist = await person.findAll({
    where: {
      email
    }
  })
  return emailExist
}

const findUsername = async ({ username }) => {
  const usernameExist = await user.findAll({
    where: {
      username
    }
  })
  return usernameExist
}

export const validateExistDocIden = async ({ typeDocEnum, nid }) => {
  const result = await findDocIden({ typeDocEnum, nid })
  if (result.length > 0) {
    throw new ConflictError409('El numero de documento ya se encuentra registrado.')
  }
}

export const validateExistEmail = async ({ email }) => {
  const result = await findEmail({ email })
  if (result.length > 0) {
    throw new ConflictError409('El email ya está registrado, use otro.')
  }
}

export const validateExistUsername = async ({ username }) => {
  const result = await findUsername({ username })
  if (result.length > 0) {
    throw new ConflictError409('El username ingresado ya está registrado, use otro.')
  }
}

export const validateOtherExistDocIden = async ({ typeDocEnum, nid, idPerson }) => {
  const result = await findDocIden({ typeDocEnum, nid })

  const existsOther = result.some(obj => obj.idPerson !== idPerson)
  if (existsOther) {
    throw new ConflictError409('El número de documento ya se encuentra registrado.')
  }
}

export const validateOtherExistEmail = async ({ email, idPerson }) => {
  const result = await findEmail({ email })

  const existsOther = result.some(obj => obj.idPerson !== idPerson)
  if (existsOther) {
    throw new ConflictError409('El email ya está registrado, use otro.')
  }
}

export const validateOtherExistUsername = async ({ username, idUser }) => {
  const result = await findUsername({ username })

  const existsOther = result.some(obj => obj.idUser !== idUser)
  if (existsOther) {
    throw new ConflictError409('El username ingresado ya está registrado, use otro.')
  }
}
