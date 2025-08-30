import bcrypt from 'bcrypt'
import { sequelize } from '../database/sequelize.js'
import {
  book,
  person,
  user,
  userBook
} from '../models/models.js'
import {
  createPersonalData,
  createUserData,
  deconstructDatas,
  deconstructUser
} from '../utils/converts/user.util.js'
import {
  validateNewUser,
  validateUpdateUser
} from '../utils/validations/user/user.validate.js'
import {
  ConflictError409,
  NotFoundError404
} from '../utils/exceptions/models.error.js'
import { validatePageAndSize } from '../utils/validations/paginated.validate.js'
import {
  validateDataLibroUser,
  validateIdsInSaveLibroUser
} from '../utils/validations/book/book.validate.js'
import { findBookById } from './book.service.js'

// Obtener usuarios paginado
export const findAllUsersPaginated = async (params) => {
  const { page = 1, size = 10 } = params

  validatePageAndSize({ page, size })

  const limit = Number(size)
  const offset = (Number(page) - 1) * limit

  const options = {
    limit,
    offset,
    include: {
      model: person,
      as: 'person'
    }
  }

  const { count, rows } = await user.findAndCountAll(options)
  const result = rows.map(u => deconstructUser(u))

  return {
    page: Number(page), // número de página actual
    pageSize: limit, // cantidad solicitada por página
    itemsOnPage: result.length, // cantidad real en esta página
    totalItems: count, // total de registros
    totalPages: Math.ceil(count / limit), // total de páginas
    data: result
  }
}

// Obtener usuarios
/*
const getUsuarios = async () => {
  const usuarios = await usuario.findAll({
    include: {
      model: person,
      as: 'person'
    }
  })
  const resultado = usuarios.map(u => (deconstructUser(u)))
  return resultado
}
*/

// Obtener usuario por id
export const findUserById = async (id) => {
  const userSearch = await user.findByPk(id, {
    include: {
      model: person,
      as: 'person'
    }
  })

  if (!userSearch) throw new NotFoundError404(`El usuario con id: ${id} no existe.`)

  return deconstructUser(userSearch)
}

// Crear usuario
export const saveUser = async ({
  names, lastnames, typeDoc, nid,
  gender, email, username, password, role
}) => {
  await validateNewUser({
    names,
    lastnames,
    typeDocEnum: typeDoc,
    nid,
    genderEnum: gender,
    email,
    username,
    password,
    roleEnum: role
  })

  const t = await sequelize.transaction()

  try {
    const personalData = await person.create(
      createPersonalData({ names, lastnames, typeDoc, nid, gender, email }),
      { transaction: t }
    )

    const userData = await user.create(
      await createUserData({ username, password, role, idPerson: personalData.idPerson }),
      { transaction: t }
    )

    await t.commit()

    return deconstructDatas(
      userData, personalData
    )
  } catch (e) {
    await t.rollback()
    throw e
  }
}

// Actualizar usuario
export const updateUser = async (id, {
  names, lastnames, typeDoc, nid, gender,
  email, username, password, role, isEnabled
}) => {
  const t = await sequelize.transaction()

  try {
    const userSearch = await user.findByPk(id, {
      transaction: t,
      include: { model: person, as: 'person' }
    })

    if (!userSearch) {
      throw new NotFoundError404(`El usuario con id: ${id} no existe.`)
    }

    const dataValid = await validateUpdateUser({
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
    }, userSearch)

    if (userSearch.person) {
      await userSearch.person.update({
        names: dataValid.names,
        lastnames: dataValid.lastnames,
        typeDoc: dataValid.typeDoc,
        nid: dataValid.nid,
        gender: dataValid.gender,
        email: dataValid.email
      }, { transaction: t })
    }

    const updatedData = {
      username: dataValid.username,
      role: dataValid.role,
      isEnabled: dataValid.isEnabled
    }

    if (password && password !== userSearch.password) {
      updatedData.password = await bcrypt.hash(password, 10)
    }

    const updatedUser = await userSearch.update(
      updatedData,
      { transaction: t }
    )

    await t.commit()

    return deconstructUser(
      updatedUser
    )
  } catch (e) {
    await t.rollback()
    throw e
  }
}

export const findAllUserBookByIdUser = async (id) => {
  const idBooksSaved = await userBook.findAll({
    attributes: { exclude: ['idUserBook', 'fkIdUser'] },
    where: {
      fkIdUser: id
    }
  })

  if (idBooksSaved.length === 0) {
    throw new NotFoundError404('El usuario no cuenta con libros guardados.')
  }

  const booksSaved = []

  for (let i = 0; i < idBooksSaved.length; i++) {
    const book = await findBookById(idBooksSaved[i].fkIdBook)
    booksSaved.push(book)
  }

  return booksSaved
}

export const saveUserBook = async (bodyData) => {
  const { typeSave, idUser, idBook } = validateDataLibroUser(bodyData)

  const bookSearch = await book.findByPk(idBook)
  if (!bookSearch) throw new NotFoundError404(`El libro con id: ${idBook} no existe.`)

  const userSearch = await user.findByPk(idUser)
  if (!userSearch) throw new NotFoundError404(`El usuario con id: ${idUser} no existe.`)

  const searchRelation = await userBook.findAll({
    where: {
      fkIdUser: idUser,
      fkIdBook: idBook
    }
  })

  if (searchRelation.length !== 0) {
    const typeSaveFound = searchRelation[0].typeSave
    throw new ConflictError409(
      `El libro con id: ${idBook} ya está guardado en '${typeSaveFound}'.`
    )
  }

  await userBook.create({
    typeSave,
    fkIdUser: idUser,
    fkIdBook: idBook
  })

  return {
    message: 'Libro guardado exitosamente.'
  }
}

export const deleteUserBook = async (bodyData) => {
  const { idUser, idBook } = validateIdsInSaveLibroUser(bodyData)

  const bookSearch = await book.findByPk(idBook)
  if (!bookSearch) throw new NotFoundError404(`El libro con id: ${idBook} no existe.`)

  const userSearch = await user.findByPk(idUser)
  if (!userSearch) throw new NotFoundError404(`El usuario con id: ${idUser} no existe.`)

  const query = await userBook.findAll({
    where: {
      fkIdUser: idUser,
      fkIdBook: idBook
    }
  })

  if (query.length === 0) {
    throw new NotFoundError404('El libro no tiene relación con el usuario.')
  }

  await query[0].destroy()

  return {
    message: 'Libro eliminado de la lista de guardados satisfactoriamente.'
  }
}
