import ValueObject from './value-object'
import { InvalidUuidError } from '@/@shared/errors'

import { v4 as uuid, validate as uuidValidate } from 'uuid'

export default class UniqueEntityId extends ValueObject<string> {
  constructor (id?: string) {
    super(id ?? uuid())
    this.validate()
  }

  get id (): string {
    return this.value
  }

  private validate (): void {
    const isValid = uuidValidate(this.value)
    if (!isValid) {
      throw new InvalidUuidError()
    }
  }
}
