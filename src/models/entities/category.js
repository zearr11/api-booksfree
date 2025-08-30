import { DataTypes } from 'sequelize'
import { sequelize } from '../../database/sequelize.js'

export const category = sequelize.define('category', {
  idCategory: {
    type: DataTypes.BIGINT,
    primaryKey: true,
    autoIncrement: true
  },
  category: {
    type: DataTypes.STRING(200),
    allowNull: false,
    unique: true
  }
}, {
  timestamps: false
})
