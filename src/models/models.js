import { file } from './entities/file.js'
import { author } from './entities/author.js'
import { category } from './entities/category.js'
import { publisher } from './entities/publisher.js'
import { book } from './entities/book.js'
import { person } from './entities/person.js'
import { user } from './entities/user.js'
import { userBook } from './entities/user-book.js'

// Persona - Usuario (1:1)
person.hasOne(user, {
  foreignKey: 'fkIdPerson',
  as: 'user'
})

user.belongsTo(person, {
  foreignKey: 'fkIdPerson',
  as: 'person'
})

// Archivo - Libro (1:1)
file.hasOne(book, {
  foreignKey: 'fkIdFile',
  as: 'book'
})

book.belongsTo(file, {
  foreignKey: 'fkIdFile',
  as: 'file'
})

// Editorial - Libro (1:N)
publisher.hasMany(book, {
  foreignKey: 'fkIdPublisher',
  as: 'books'
})

book.belongsTo(publisher, {
  foreignKey: 'fkIdPublisher',
  as: 'publisher'
})

// Autor - Libro (1:N)
author.hasMany(book, {
  foreignKey: 'fkIdAuthor',
  as: 'books'
})

book.belongsTo(author, {
  foreignKey: 'fkIdAuthor',
  as: 'author'
})

// Categoria - Libro (N:N)
book.belongsToMany(category, {
  through: 'bookCategory',
  foreignKey: 'fkIdBook',
  otherKey: 'fkIdCategory',
  as: 'categories',
  timestamps: false
})

category.belongsToMany(book, {
  through: 'bookCategory',
  foreignKey: 'fkIdCategory',
  otherKey: 'fkIdBook',
  as: 'books',
  timestamps: false
})

// Usuario - UsuarioLibro (1:N)
user.hasMany(userBook, {
  foreignKey: 'fkIdUser',
  as: 'userBooks'
})

userBook.belongsTo(user, {
  foreignKey: 'fkIdUser',
  as: 'user'
})

// Libro - UsuarioLibro (1:N)
book.hasMany(userBook, {
  foreignKey: 'fkIdBook',
  as: 'userBooks'
})

userBook.belongsTo(book, {
  foreignKey: 'fkIdBook',
  as: 'book'
})

export default { person, user, file, author, publisher, book, category, userBook }
export { person, user, file, author, publisher, book, category, userBook }
