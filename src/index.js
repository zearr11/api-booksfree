import { initDb } from './database/load.database.js'
import { APP_PORT } from './config/env.config.js'
import app from './app.js'

const PORT = APP_PORT

app.listen(PORT, async () => {
  await initDb()
  console.log('Server listening on: http://localhost:' + PORT)
})
