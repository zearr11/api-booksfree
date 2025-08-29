import bcrypt from 'bcrypt'

const dateNow = new Date().toISOString().split('T')[0]

const deconstructUser = (user) => {
  const result = {
    code: user.id_user,
    userData: {
      username: user.username,
      role: user.role,
      is_enable: user.is_enable
    },
    personalData: {
      names: user.persona.names,
      lastnames: user.persona.lastnames,
      type_doc: user.persona.type_doc,
      nid: user.persona.nid,
      gender: user.persona.gender,
      email: user.persona.email,
      date_register: user.persona.date_register
    }
  }
  return result
}

const deconstructDatas = (dataUser, dataPersonal) => {
  const result = {
    code: dataUser.id_user,
    userData: {
      username: dataUser.username,
      role: dataUser.role,
      is_enable: dataUser.is_enable
    },
    personalData: {
      names: dataPersonal.names,
      lastnames: dataPersonal.lastnames,
      type_doc: dataPersonal.type_doc,
      nid: dataPersonal.nid,
      gender: dataPersonal.gender,
      email: dataPersonal.email,
      date_register: dataPersonal.date_register
    }
  }
  return result
}

const createPersonalData = ({ names, lastnames, typeDoc, nid, gender, email }) => {
  return {
    names,
    lastnames,
    type_doc: typeDoc,
    nid,
    gender,
    email,
    date_register: dateNow
  }
}

const createUserData = async ({ username, password, role, idPerson }) => {
  return {
    username,
    password: await bcrypt.hash(password, 10),
    role,
    fk_id_person: idPerson
  }
}

export { deconstructUser, deconstructDatas, createPersonalData, createUserData }
