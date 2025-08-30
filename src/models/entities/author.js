import { DataTypes } from 'sequelize'
import { sequelize } from '../../database/sequelize.js'

export const author = sequelize.define('author', {
  idAuthor: {
    type: DataTypes.BIGINT,
    primaryKey: true,
    autoIncrement: true
  },
  names: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  country: {
    type: DataTypes.TEXT,
    allowNull: false
  }
}, {
  timestamps: false
})
