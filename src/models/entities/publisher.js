import { DataTypes } from 'sequelize'
import { sequelize } from '../../database/sequelize.js'

export const publisher = sequelize.define('publisher', {
  idPublisher: {
    type: DataTypes.BIGINT,
    primaryKey: true,
    autoIncrement: true
  },
  publisher: {
    type: DataTypes.STRING(200),
    allowNull: false,
    unique: true
  }
}, {
  timestamps: false
})
