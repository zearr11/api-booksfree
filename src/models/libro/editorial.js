import { DataTypes } from 'sequelize'
import { sequelize } from '../../database/sequelize.js'

export const editorial = sequelize.define('editorial', {
  id_publisher: {
    type: DataTypes.BIGINT,
    primaryKey: true,
    autoIncrement: true
  },
  publisher: {
    type: DataTypes.TEXT,
    allowNull: false,
    unique: true
  }
}, {
  timestamps: false
})
