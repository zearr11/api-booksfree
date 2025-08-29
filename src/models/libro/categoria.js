import { DataTypes } from 'sequelize'
import { sequelize } from '../../database/sequelize.js'

export const categoria = sequelize.define('categoria', {
  id_category: {
    type: DataTypes.BIGINT,
    primaryKey: true,
    autoIncrement: true
  },
  category: {
    type: DataTypes.TEXT,
    allowNull: false,
    unique: true
  }
}, {
  timestamps: false
})
