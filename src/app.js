import express from 'express'
import archivoRoutes from './routes/archivo.routes.js'
import autorRoutes from './routes/autor.routes.js'
import categoriaRoutes from './routes/categoria.routes.js'
import editorialRoutes from './routes/editorial.routes.js'
import libroRoutes from './routes/libro.routes.js'
import usuarioRoutes from './routes/usuario.routes.js'
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
app.use(`${URL}/files`, archivoRoutes)
app.use(`${URL}/authors`, autorRoutes)
app.use(`${URL}/categories`, categoriaRoutes)
app.use(`${URL}/publishers`, editorialRoutes)
app.use(`${URL}/books`, libroRoutes)
app.use(`${URL}/users`, usuarioRoutes)

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
