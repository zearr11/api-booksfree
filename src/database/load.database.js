import { sequelize } from './sequelize.js'

import '../models/models.js'

export const initDb = async () => {
  try {
    await sequelize.sync({ force: false })
  } catch (e) {
    console.log(e.message)
  }
}
