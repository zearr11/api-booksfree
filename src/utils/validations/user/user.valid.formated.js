import { gender, role, typeDoc } from '../../enums.js'
import { BadRequestError400 } from '../../exceptions/models.error.js'

export const validateFormatedDocIden = ({ typeDocUser, numDocUser }) => {
  let isDocValid = false

  if (typeDocUser === typeDoc.DNI && numDocUser.length === 8) {
    isDocValid = true
  } else if (
    typeDocUser === typeDoc.CE &&
    numDocUser.length >= 8 &&
    numDocUser.length <= 13
  ) {
    isDocValid = true
  }

  if (!isDocValid) {
    throw new BadRequestError400('El número de documento ingresado no es válido.')
  }
}

export const validateFormatedUsername = ({ username }) => {
  if (username.length <= 6) {
    throw new BadRequestError400('El username debe tener una longitud mayor a 6 carácteres.')
  }
}

export const validateFormatedEmail = ({ email }) => {
  const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
  if (!regex.test(email)) {
    throw new BadRequestError400('El email ingresado no es válido.')
  }
}

export const validateTypeDocValid = ({ typeDocEnum }) => {
  if (!Object.values(typeDoc).includes(typeDocEnum)) {
    throw new BadRequestError400('El campo \'typeDoc\' no es válido.')
  }
}

export const validateGenderValid = ({ genderEnum }) => {
  if (!Object.values(gender).includes(genderEnum)) {
    throw new BadRequestError400('El campo \'gender\' no es válido.')
  }
}

export const validateRoleValid = ({ roleEnum }) => {
  if (!Object.values(role).includes(roleEnum)) {
    throw new BadRequestError400('El campo \'role\' no es válido.')
  }
}
