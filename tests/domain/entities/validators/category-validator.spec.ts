import { CategoryValidator, makeCategoryValidator } from '@/domain/entities/validators'

describe('CategoryValidator', () => {
  let validator: CategoryValidator

  beforeEach(() => (validator = makeCategoryValidator()))

  test('invalidation cases for name field', () => {
    expect(validator.validate({ name: '' })).toBeFalsy()
    expect(validator.errors).toEqual({ name: ['name should not be empty'] })
    expect(validator.validatedData).toBeUndefined()

    expect(validator.validate({ name: 'c'.repeat(256) })).toBeFalsy()
    expect(validator.errors).toEqual({ name: ['name must be shorter than or equal to 255 characters'] })
    expect(validator.validatedData).toBeUndefined()
  })
})
