import { ValueObject } from '@/domain/@shared/domain'

class StubValueObject extends ValueObject {}

describe('ValueObject', () => {
  it('should set value', () => {
    let vo = new StubValueObject('string value')
    expect(vo.value).toBe('string value')

    vo = new StubValueObject({ prop1: 'value 1' })
    expect(vo.value).toStrictEqual({ prop1: 'value 1' })
  })
})
