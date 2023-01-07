import { Entity, UniqueEntityId } from '@/domain/@shared/domain'

import { validate as uuidValidate } from 'uuid'

class StubEntity extends Entity<{ prop1: string, prop2: number }> {}

describe('Entity', () => {
  it('should set props and id', () => {
    const entity = new StubEntity({ prop1: 'value', prop2: 10 })
    expect(uuidValidate(entity.id)).toBeTruthy()
    expect(entity.toJSON()).toEqual({
      id: expect.any(String),
      prop1: 'value',
      prop2: 10
    })
  })

  it('should accept a valid uuid', () => {
    const uuid = new UniqueEntityId()
    const entity = new StubEntity({ prop1: 'value', prop2: 10 }, uuid)
    expect(entity.toJSON()).toEqual({
      id: uuid.id,
      prop1: 'value',
      prop2: 10
    })
  })
})
