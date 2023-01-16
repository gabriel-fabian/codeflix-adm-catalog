export class ValidationError extends Error {
  constructor (message: string) {
    super(message)
    this.name = 'ValidationError'
  }
}

export class EntityValidationError extends Error {
  constructor (message: string) {
    super(message)
    this.name = 'EntityValidationError'
  }
}
