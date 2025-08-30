import { DataTypes } from 'sequelize'
import { sequelize } from '../../database/sequelize.js'
import { role } from '../../utils/enums.js'

export const user = sequelize.define('user', {
  idUser: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  username: {
    type: DataTypes.STRING(100),
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
  isEnabled: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
  }
}, {
  timestamps: false
})
