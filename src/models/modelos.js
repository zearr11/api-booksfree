import { archivo } from './libro/archivo.js'
import { autor } from './libro/autor.js'
import { categoria } from './libro/categoria.js'
import { editorial } from './libro/editorial.js'
import { libro } from './libro/libro.js'
import { persona } from './usuario/persona.js'
import { usuario } from './usuario/usuario.js'
import { usuarioLibro } from './usuario/usuario_libro.js'

// Persona - Usuario (1:1)
persona.hasOne(usuario, {
  foreignKey: 'fk_id_person',
  as: 'usuario'
})

usuario.belongsTo(persona, {
  foreignKey: 'fk_id_person',
  as: 'persona'
})

// Archivo - Libro (1:1)
archivo.hasOne(libro, {
  foreignKey: 'fk_id_file',
  as: 'libro'
})

libro.belongsTo(archivo, {
  foreignKey: 'fk_id_file',
  as: 'archivo'
})

// Editorial - Libro (1:N)
editorial.hasMany(libro, {
  foreignKey: 'fk_id_publisher',
  as: 'libros'
})

libro.belongsTo(editorial, {
  foreignKey: 'fk_id_publisher',
  as: 'editorial'
})

// Autor - Libro (1:N)
autor.hasMany(libro, {
  foreignKey: 'fk_id_author',
  as: 'libros'
})

libro.belongsTo(autor, {
  foreignKey: 'fk_id_author',
  as: 'autor'
})

// Categoria - Libro (N:N)
libro.belongsToMany(categoria, {
  through: 'libro_categoria',
  foreignKey: 'fk_id_book',
  otherKey: 'fk_id_category',
  as: 'categorias',
  timestamps: false
})

categoria.belongsToMany(libro, {
  through: 'libro_categoria',
  foreignKey: 'fk_id_category',
  otherKey: 'fk_id_book',
  as: 'libros',
  timestamps: false
})

// Usuario - UsuarioLibro (1:N)
usuario.hasMany(usuarioLibro, {
  foreignKey: 'fk_id_user',
  as: 'usuariosLibros'
})

usuarioLibro.belongsTo(usuario, {
  foreignKey: 'fk_id_user',
  as: 'usuario'
})

// Libro - UsuarioLibro (1:N)
libro.hasMany(usuarioLibro, {
  foreignKey: 'fk_id_book',
  as: 'usuariosLibros'
})

usuarioLibro.belongsTo(libro, {
  foreignKey: 'fk_id_book',
  as: 'libro'
})

export { persona, usuario, archivo, autor, editorial, libro, categoria, usuarioLibro }
