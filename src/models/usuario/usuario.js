import { DataTypes } from 'sequelize'
import { sequelize } from '../../database/sequelize.js'
import { role } from '../../utils/enums.js'

export const usuario = sequelize.define('usuario', {
  id_user: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  username: {
    type: DataTypes.TEXT,
    unique: true,
    allowNull: false
  },
  password: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  role: {
    type: DataTypes.ENUM(...Object.values(role)),
    allowNull: false
  },
  is_enable: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
  }
}, {
  timestamps: false
})
