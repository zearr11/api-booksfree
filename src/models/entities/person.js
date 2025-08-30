import { DataTypes } from 'sequelize'
import { sequelize } from '../../database/sequelize.js'
import { gender, typeDoc } from '../../utils/enums.js'

export const person = sequelize.define('person', {
  idPerson: {
    type: DataTypes.BIGINT,
    primaryKey: true,
    autoIncrement: true
  },
  names: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  lastnames: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  typeDoc: {
    type: DataTypes.ENUM(...Object.values(typeDoc)),
    allowNull: false
  },
  nid: {
    type: DataTypes.STRING(20),
    allowNull: false
  },
  gender: {
    type: DataTypes.ENUM(...Object.values(gender)),
    allowNull: false
  },
  email: {
    type: DataTypes.STRING(200),
    unique: true,
    allowNull: false
  },
  dateRegister: {
    type: DataTypes.DATEONLY,
    allowNull: false
  }
}, {
  timestamps: false
})
