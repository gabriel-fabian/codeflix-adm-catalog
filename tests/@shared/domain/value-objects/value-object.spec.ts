import { ValueObject } from '@/@shared/domain'

import { faker } from '@faker-js/faker'

class StubValueObject extends ValueObject {}

describe('ValueObject', () => {
  it('should set a value', () => {
    let vo = new StubValueObject('string value')
    expect(vo.value).toBe('string value')

    vo = new StubValueObject({ prop1: 'value 1' })
    expect(vo.value).toStrictEqual({ prop1: 'value 1' })
  })

  it('should be a immutable object', () => {
    const obj = {
      prop1: faker.random.words(),
      deep: { prop2: faker.random.words(), prop3: new Date() }
    }
    const vo = new StubValueObject(obj)

    expect(() => {
      (vo as any).value.prop1 = faker.random.words()
    }).toThrow(
      "Cannot assign to read only property 'prop1' of object '#<Object>'"
    )

    expect(() => {
      (vo as any).value.deep.prop2 = faker.random.words()
    }).toThrow(
      "Cannot assign to read only property 'prop2' of object '#<Object>'"
    )

    expect(vo.value.deep.prop3).toBeInstanceOf(Date)
  })
})
