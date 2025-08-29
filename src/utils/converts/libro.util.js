export const deconstructBook = (objBook) => {
  const plain = objBook.get({ plain: true })

  if (plain.archivo) {
    plain.url_img = plain.archivo.url_img
    plain.url_file = plain.archivo.url_file
    delete plain.archivo
  }

  if (plain.editorial) {
    plain.publisher = plain.editorial.publisher
    delete plain.editorial
  }

  if (plain.autor) {
    plain.author_name = plain.autor.names
    delete plain.autor
  }

  if (plain.categorias && plain.categorias.length > 0) {
    plain.categories = plain.categorias.map(c => c.category)
  }
  delete plain.categorias

  return plain
}
