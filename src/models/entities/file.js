import { DataTypes } from 'sequelize'
import { sequelize } from '../../database/sequelize.js'

export const file = sequelize.define('file', {
  idFile: {
    type: DataTypes.BIGINT,
    primaryKey: true,
    autoIncrement: true
  },
  urlImg: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  urlFile: {
    type: DataTypes.TEXT,
    allowNull: false
  }
}, {
  timestamps: false
})
