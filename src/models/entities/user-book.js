import { DataTypes } from 'sequelize'
import { sequelize } from '../../database/sequelize.js'
import { typeSave } from '../../utils/enums.js'

export const userBook = sequelize.define('userBook', {
  idUserBook: {
    type: DataTypes.BIGINT,
    primaryKey: true,
    autoIncrement: true
  },
  typeSave: {
    type: DataTypes.ENUM(...Object.values(typeSave)),
    allowNull: false
  }
}, {
  timestamps: false
})
