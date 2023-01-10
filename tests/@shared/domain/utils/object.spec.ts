import { deepFreeze } from '@/@shared/domain/utils'

import { faker } from '@faker-js/faker'

describe('Object', () => {
  it('should not freeze a scalar value', () => {
    const str = deepFreeze(faker.random.words())
    expect(typeof str).toBe('string')

    const boolean = faker.datatype.boolean()
    expect(typeof boolean).toBe('boolean')

    const num = deepFreeze(faker.datatype.number())
    expect(typeof num).toBe('number')
  })

  it('should be a immutable object', () => {
    const obj = deepFreeze({
      prop1: faker.random.words(),
      deep: { prop2: faker.random.words(), prop3: new Date() }
    })

    expect(() => {
      (obj).prop1 = faker.random.words()
    }).toThrow(
      "Cannot assign to read only property 'prop1' of object '#<Object>'"
    )

    expect(() => {
      (obj).deep.prop2 = faker.random.words()
    }).toThrow(
      "Cannot assign to read only property 'prop2' of object '#<Object>'"
    )

    expect(obj.deep.prop3).toBeInstanceOf(Date)
  })
})
