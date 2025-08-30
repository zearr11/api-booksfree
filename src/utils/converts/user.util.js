import bcrypt from 'bcrypt'

const dateNow = new Date().toISOString().split('T')[0]

export const deconstructUser = (user) => {
  const result = {
    code: user.idUser,
    userData: {
      username: user.username,
      role: user.role,
      isEnabled: user.isEnabled
    },
    personalData: {
      names: user.person.names,
      lastnames: user.person.lastnames,
      typeDoc: user.person.typeDoc,
      nid: user.person.nid,
      gender: user.person.gender,
      email: user.person.email,
      dateRegister: user.person.dateRegister
    }
  }
  return result
}

export const deconstructDatas = (dataUser, dataPersonal) => {
  const result = {
    code: dataUser.idUser,
    userData: {
      username: dataUser.username,
      role: dataUser.role,
      isEnabled: dataUser.isEnabled
    },
    personalData: {
      names: dataPersonal.names,
      lastnames: dataPersonal.lastnames,
      typeDoc: dataPersonal.typeDoc,
      nid: dataPersonal.nid,
      gender: dataPersonal.gender,
      email: dataPersonal.email,
      dateRegister: dataPersonal.dateRegister
    }
  }
  return result
}

export const createPersonalData = ({ names, lastnames, typeDoc, nid, gender, email }) => {
  return {
    names,
    lastnames,
    typeDoc,
    nid,
    gender,
    email,
    dateRegister: dateNow
  }
}

export const createUserData = async ({ username, password, role, idPerson }) => {
  return {
    username,
    password: await bcrypt.hash(password, 10),
    role,
    fkIdPerson: idPerson
  }
}
