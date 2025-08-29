export class BadRequestError400 extends Error {
  constructor (message) {
    super(message)
    this.name = 'BadRequestError400'
    this.status = 400
  }
}

export class UnauthorizedError401 extends Error {
  constructor (message) {
    super(message)
    this.name = 'UnauthorizedError401'
    this.status = 401
  }
}

export class NotFoundError404 extends Error {
  constructor (message) {
    super(message)
    this.name = 'NotFoundError404'
    this.status = 404
  }
}

export class ConflictError409 extends Error {
  constructor (message) {
    super(message)
    this.name = 'ConflictError409'
    this.status = 409
  }
}
