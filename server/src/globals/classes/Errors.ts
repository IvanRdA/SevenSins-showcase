// This file includes all the custom error classes that I needed by the moment in the project.
export class DatabaseConnection extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'Database connection error'
  }
}

export class DatabaseOperation extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'Database operation error'
  }
}

export class ProceduralProcess extends Error {
  constructor(message: string, process: string) {
    super(message)
    this.name = `${process} procedural process error`
  }
}

export class ValidationError extends Error {
  constructor(message: string) {
    super(message)
    this.name = `Validation error`
  }
}

export class NullTokenError extends Error {
  constructor(message: string) {
    super(message)
    this.name = `Null JWT token`
  }
}

export class InvalidToken extends Error {
  constructor(message: string) {
    super(message)
    this.name = `Invalid token`
  }
}
