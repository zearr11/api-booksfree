import express from 'express'
import fileRoutes from './routes/file.routes.js'
import authorRoutes from './routes/author.routes.js'
import categoryRoutes from './routes/category.routes.js'
import publisherRoutes from './routes/publisher.routes.js'
import bookRoutes from './routes/book.routes.js'
import userRoutes from './routes/user.routes.js'
import { errorHandler } from './utils/exceptions/exception.handler.js'

const URL = '/api/v1'

const app = express()

// Configs
app.use(express.json())

// Middleware pre request
app.use('/', (req, res, next) => {
  next()
})

// Endpoints
app.use(`${URL}/files`, fileRoutes)
app.use(`${URL}/authors`, authorRoutes)
app.use(`${URL}/categories`, categoryRoutes)
app.use(`${URL}/publishers`, publisherRoutes)
app.use(`${URL}/books`, bookRoutes)
app.use(`${URL}/users`, userRoutes)

// Middleware global errors
app.use(errorHandler)

// Middleware post request
app.use((req, res, next) => {
  res.status(404).json({
    timestamp: new Date().toISOString(),
    status: 404,
    message: 'El endpoint solicitado no existe.',
    path: req.originalUrl
  })
})

export default app
