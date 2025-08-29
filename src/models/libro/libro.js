import { DataTypes } from 'sequelize'
import { sequelize } from '../../database/sequelize.js'

export const libro = sequelize.define('libro', {
  id_book: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  title: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  year: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  is_enable: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
  }
}, {
  timestamps: false
})
