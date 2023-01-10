import { UniqueEntityId } from '@/@shared/domain/'
import { InvalidUuidError } from '@/@shared/errors'

import { faker } from '@faker-js/faker'

describe('UniqueEntityId', () => {
  it('should throw error if UUID is not valid', () => {
    expect(() => {
      new UniqueEntityId('invalid uuid')
    }).toThrowError(new InvalidUuidError())
  })

  it('should accept a valid UUID', () => {
    const uuid = faker.datatype.uuid()
    const uniqueEntityId = new UniqueEntityId(uuid)
    expect(uniqueEntityId.id).toEqual(uuid)
  })
})
