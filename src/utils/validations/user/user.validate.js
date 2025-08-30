import { BadRequestError400 } from '../../exceptions/models.error.js'
import {
  validateExistDocIden,
  validateExistEmail,
  validateExistUsername,
  validateOtherExistDocIden,
  validateOtherExistEmail,
  validateOtherExistUsername
} from './user.valid.db.js'
import {
  validateFormatedDocIden,
  validateFormatedEmail,
  validateFormatedUsername,
  validateGenderValid,
  validateRoleValid,
  validateTypeDocValid
} from './user.valid.formated.js'

export const validateNewUser = async ({
  names, lastnames, typeDocEnum, nid,
  genderEnum, email, username, password, roleEnum
}) => {
  // Validacion NOT NULL
  validationNotNull({
    names, lastnames, typeDocEnum, nid, genderEnum, email, username, password, roleEnum
  })

  // Validacion ENUM's
  validateTypeDocValid({ typeDocEnum })
  validateGenderValid({ genderEnum })
  validateRoleValid({ roleEnum })

  // Validacion formato especial
  validateFormatedDocIden({ typeDocUser: typeDocEnum, numDocUser: nid })
  validateFormatedUsername({ username })
  validateFormatedEmail({ email })

  // Validacion en db
  await validateExistDocIden({ typeDocEnum, nid })
  await validateExistEmail({ email })
  await validateExistUsername({ username })
}

const validationNotNull = ({
  names, lastnames, typeDocEnum, nid, genderEnum, email, username, password, roleEnum
}) => {
  if (!names) throw new BadRequestError400('El campo \'names\' es obligatorio.')
  if (!lastnames) throw new BadRequestError400('El campo \'lastnames\' es obligatorio.')
  if (!typeDocEnum) throw new BadRequestError400('El campo \'typeDoc\' es obligatorio.')
  if (!nid) throw new BadRequestError400('El campo \'nid\' es obligatorio.')
  if (!genderEnum) throw new BadRequestError400('El campo \'gender\' es obligatorio.')
  if (!email) throw new BadRequestError400('El campo \'email\' es obligatorio.')
  if (!username) throw new BadRequestError400('El campo \'username\' es obligatorio.')
  if (!password) throw new BadRequestError400('El campo \'password\' es obligatorio.')
  if (!roleEnum) throw new BadRequestError400('El campo \'role\' es obligatorio.')
}

export const validateUpdateUser = async ({
  names, lastnames, typeDoc, nid, gender, email, username, role, password, isEnabled
}, user) => {
  // Person
  if (names === undefined || names === null) names = user.person.names
  if (lastnames === undefined || lastnames === null) lastnames = user.person.lastnames
  if (typeDoc === undefined || typeDoc === null) typeDoc = user.person.typeDoc
  if (nid === undefined || nid === null) nid = user.person.nid
  if (gender === undefined || gender === null) gender = user.person.gender
  if (email === undefined || email === null) email = user.person.email

  // User
  if (username === undefined || username === null) username = user.username
  if (role === undefined || role === null) role = user.role
  if (password === undefined || password === null) password = user.password
  if (isEnabled === undefined || isEnabled === null) isEnabled = user.isEnabled

  // Validacion ENUM's
  validateTypeDocValid({ typeDocEnum: typeDoc })
  validateGenderValid({ genderEnum: gender })
  validateRoleValid({ roleEnum: role })

  // Validacion formato especial
  validateFormatedDocIden({ typeDocUser: typeDoc, numDocUser: nid })
  validateFormatedUsername({ username })
  validateFormatedEmail({ email })

  // Validacion en db
  await validateOtherExistDocIden({
    typeDocEnum: typeDoc, nid, idPerson: user.person.idPerson
  })
  await validateOtherExistEmail({
    email, idPerson: user.person.idPerson
  })
  await validateOtherExistUsername({
    username, idUser: user.idUser
  })

  return {
    names,
    lastnames,
    typeDoc,
    nid,
    gender,
    email,
    username,
    role,
    password,
    isEnabled
  }
}
