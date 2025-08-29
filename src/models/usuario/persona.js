import { DataTypes } from 'sequelize'
import { sequelize } from '../../database/sequelize.js'
import { gender, typeDoc } from '../../utils/enums.js'

export const persona = sequelize.define('persona', {
  id_person: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  names: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  lastnames: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  type_doc: {
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
    type: DataTypes.TEXT,
    unique: true,
    allowNull: false
  },
  date_register: {
    type: DataTypes.DATEONLY,
    allowNull: false
  }
}, {
  timestamps: false
})
