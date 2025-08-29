import { DataTypes } from 'sequelize'
import { sequelize } from '../../database/sequelize.js'
import { typeSave } from '../../utils/enums.js'

export const usuarioLibro = sequelize.define('usuario_libro', {
  id: {
    type: DataTypes.BIGINT,
    primaryKey: true,
    autoIncrement: true
  },
  type_save: {
    type: DataTypes.ENUM(...Object.values(typeSave)),
    allowNull: false
  }
}, {
  timestamps: false
})
