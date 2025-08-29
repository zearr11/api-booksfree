import { DataTypes } from 'sequelize'
import { sequelize } from '../../database/sequelize.js'

export const archivo = sequelize.define('archivo', {
  id_file: {
    type: DataTypes.BIGINT,
    primaryKey: true,
    autoIncrement: true
  },
  url_img: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  url_file: {
    type: DataTypes.TEXT,
    allowNull: false
  }
}, {
  timestamps: false
})
