import { sequelize } from './sequelize.js'

// import '../models/modelos.js'

export const initDb = async () => {
  try {
    // await sequelize.sync({ force: false })
    await sequelize.sync()
  } catch (e) {
    console.log(e.message)
  }
}
