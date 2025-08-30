export const deconstructBook = (objBook) => {
  const plain = objBook.get({ plain: true })

  if (plain.publisher) {
    plain.publisher = plain.publisher.publisher
  }

  if (plain.author) {
    plain.authorName = plain.author.names
    delete plain.author
  }

  if (plain.categories && plain.categories.length > 0) {
    plain.categories = plain.categories.map(c => c.category)
  } else {
    delete plain.categories
  }

  return plain
}
