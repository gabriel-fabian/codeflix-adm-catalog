import { ClassValidator } from '@/domain/@shared/validators'

import * as libClassValidator from 'class-validator'

class StubClassValidator extends ClassValidator<{ field: string }> {}

describe('ClassValidator', () => {
  it('should initialize errors and validatedData with undefined', () => {
    const validator = new StubClassValidator()
    expect(validator.errors).toBeUndefined()
    expect(validator.validatedData).toBeUndefined()
  })

  it('validate with errors', () => {
    jest.spyOn(libClassValidator, 'validateSync').mockReturnValueOnce([
      { property: 'field', constraints: { isRequired: 'some error' } }
    ])

    const validator = new StubClassValidator()

    expect(validator.validate(null)).toBeFalsy()
    expect(validator.validatedData).toBeUndefined()
    expect(validator.errors).toStrictEqual({
      field: ['some error']
    })
  })

  it('validate without errors', () => {
    jest.spyOn(libClassValidator, 'validateSync').mockReturnValueOnce([])

    const validator = new StubClassValidator()

    expect(validator.validate({ field: 'value' })).toBeTruthy()
    expect(validator.validatedData).toEqual({ field: 'value' })
    expect(validator.errors).toBeUndefined()
  })
})
