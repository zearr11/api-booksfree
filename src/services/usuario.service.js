import bcrypt from 'bcrypt'
import { sequelize } from '../database/sequelize.js'
import { libro, persona, usuario, usuarioLibro } from '../models/modelos.js'
import { createPersonalData, createUserData, deconstructDatas, deconstructUser } from '../utils/converts/usuario.util.js'
import { validateNewUser, validateUpdateUser } from '../utils/validations/usuario/usuario.validate.js'
import { ConflictError409, NotFoundError404 } from '../utils/exceptions/models.error.js'
import { validatePageAndSize } from '../utils/validations/paginated.validate.js'
import { validateDataLibroUser, validateIdsInSaveLibroUser } from '../utils/validations/libro/libro.validate.js'
import { getLibroById } from './libro.service.js'

// Obtener usuarios paginado
const getUsuariosPaginated = async (params) => {
  const { page = 1, size = 10 } = params

  validatePageAndSize({ page, size })

  const limit = Number(size)
  const offset = (Number(page) - 1) * limit

  const options = {
    limit,
    offset,
    include: {
      model: persona,
      as: 'persona'
    }
  }

  const { count, rows } = await usuario.findAndCountAll(options)
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
const getUsuarios = async () => {
  const usuarios = await usuario.findAll({
    include: {
      model: persona,
      as: 'persona'
    }
  })

  const resultado = usuarios.map(u => (deconstructUser(u)))

  return resultado
}

// Obtener usuario por id
const getUsuarioById = async (id) => {
  const user = await usuario.findByPk(id, {
    include: {
      model: persona,
      as: 'persona'
    }
  })

  if (!user) throw new NotFoundError404(`El usuario con id: ${id} no existe.`)

  return deconstructUser(user)
}

// Crear usuario
const createUsuario = async ({
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
    const personalData = await persona.create(
      createPersonalData({ names, lastnames, typeDoc, nid, gender, email }),
      { transaction: t }
    )

    const userData = await usuario.create(
      await createUserData({ username, password, role, idPerson: personalData.id_person }),
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
const updateUsuario = async (id, {
  names, lastnames, typeDoc, nid, gender,
  email, username, password, role, isEnable
}) => {
  const t = await sequelize.transaction()

  try {
    const user = await usuario.findByPk(id, {
      transaction: t,
      include: { model: persona, as: 'persona' }
    })

    if (!user) {
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
      isEnable
    }, user)

    if (user.persona) {
      await user.persona.update({
        names: dataValid.names,
        lastnames: dataValid.lastnames,
        type_doc: dataValid.typeDoc,
        nid: dataValid.nid,
        gender: dataValid.gender,
        email: dataValid.email
      }, { transaction: t })
    }

    const updatedData = {
      username: dataValid.username,
      role: dataValid.role,
      is_enable: dataValid.isEnable
    }

    if (password && password !== user.password) {
      updatedData.password = await bcrypt.hash(password, 10)
    }

    const updatedUser = await user.update(
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

const searchLibrosForUser = async (id) => {
  const idBooksSaved = await usuarioLibro.findAll({
    attributes: { exclude: ['id', 'fk_id_user'] },
    where: {
      fk_id_user: id
    }
  })

  if (idBooksSaved.length === 0) {
    throw new NotFoundError404('El usuario no cuenta con libros guardados.')
  }

  const booksSaved = []

  for (let i = 0; i < idBooksSaved.length; i++) {
    const book = await getLibroById(idBooksSaved[i].fk_id_book)
    booksSaved.push(book)
  }

  return booksSaved
}

const saveLibroInUser = async (bodyData) => {
  const { typeSave, idUser, idBook } = validateDataLibroUser(bodyData)

  const book = await libro.findByPk(idBook)
  if (!book) throw new NotFoundError404(`El libro con id: ${idBook} no existe.`)

  const user = await usuario.findByPk(idUser)
  if (!user) throw new NotFoundError404(`El libro con id: ${idUser} no existe.`)

  const searchRelation = await usuarioLibro.findAll({
    where: {
      fk_id_user: idUser,
      fk_id_book: idBook
    }
  })

  if (searchRelation) {
    const typeSaveFound = searchRelation[0].type_save
    throw new ConflictError409(
      `El libro con id: ${idBook} ya está guardado en '${typeSaveFound}'.`
    )
  }

  await usuarioLibro.create({
    type_save: typeSave,
    fk_id_user: idUser,
    fk_id_book: idBook
  })

  return {
    message: 'Libro guardado exitosamente.'
  }
}

const deleteLibroInUser = async (bodyData) => {
  const { idUser, idBook } = validateIdsInSaveLibroUser(bodyData)

  const query = await usuarioLibro.findAll({
    where: {
      fk_id_user: idUser,
      fk_id_book: idBook
    }
  })

  if (!query) throw new NotFoundError404('No se encontro relación de libro con usuario.')

  await query[0].destroy()

  return {
    message: 'Libro eliminado de la lista de guardados satisfactoriamente.'
  }
}

export {
  getUsuariosPaginated,
  getUsuarios,
  getUsuarioById,
  createUsuario,
  updateUsuario,
  saveLibroInUser,
  deleteLibroInUser,
  searchLibrosForUser
}
