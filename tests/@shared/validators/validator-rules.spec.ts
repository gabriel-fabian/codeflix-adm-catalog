import { ValidationError } from '@/@shared/errors'
import { ValidatorRules } from '@/@shared/validators/validator-rules'

const makeSut = (value: any, property: string): ValidatorRules => {
  return ValidatorRules.values(value, property)
}

describe('ValidatorRules', () => {
  test('values method', () => {
    const value = ''
    const property = 'field'

    const validator = makeSut(value, property)

    expect(validator).toBeInstanceOf(ValidatorRules)
    expect(validator.value).toBe(value)
    expect(validator.property).toBe(property)
  })

  describe('Required method', () => {
    it('should throw an error when field is missing', () => {
      const arrangeValues: any[] = [
        '',
        null,
        undefined
      ]
      const property = 'field'

      arrangeValues.forEach(value => {
        const validator = makeSut(value, property)
        expect(() => {
          validator.required()
        }).toThrowError(new ValidationError(`The ${property} is required`))
      })
    })

    it('should not throw when param is valid', () => {
      const value = 'valid param'
      const property = 'field'

      const validator = makeSut(value, property)

      expect(() => {
        validator.required()
      }).not.toThrowError()
    })
  })

  describe('String method', () => {
    it('should throw an error when param is not string', () => {
      const value = 10
      const property = 'field'

      const validator = makeSut(value, property)

      expect(() => {
        validator.string()
      }).toThrowError(new ValidationError(`The ${property} must be a string`))
    })

    it('should not throw an error when param is a string', () => {
      const value = 'valid_value'
      const property = 'field'

      const validator = makeSut(value, property)

      expect(() => {
        validator.string()
      }).not.toThrowError()
    })
  })

  describe('MaxLength method', () => {
    it('should throw an error when param is greater than maxLenght', () => {
      const value = 'thisIsGreaterThanMaxLength'
      const property = 'field'
      const maxLenght = 5

      const validator = makeSut(value, property)

      expect(() => {
        validator.maxLength(maxLenght)
      }).toThrowError(new ValidationError(`The ${property} must be less or equal than ${maxLenght} characters`))
    })

    it('should not throw an error when param is valid', () => {
      const value = 'thisIsLowerThanMaxLength'
      const property = 'field'
      const maxLenght = 255

      const validator = makeSut(value, property)

      expect(() => {
        validator.maxLength(maxLenght)
      }).not.toThrowError()
    })
  })

  describe('Boolean method', () => {
    it('should throw an error when param is not a boolean', () => {
      const value = 'notABoolean'
      const property = 'field'

      const validator = makeSut(value, property)

      expect(() => {
        validator.boolean()
      }).toThrowError(new ValidationError(`The ${property} must be a boolean`))
    })

    it('should not throw when param is valid', () => {
      const value = true
      const property = 'field'

      const validator = makeSut(value, property)

      expect(() => {
        validator.boolean()
      }).not.toThrowError()
    })
  })

  it('should should throw an error with combined rules and invalid values', () => {
    const property = 'field'
    const maxLenght = 5
    const dataValues: Array<{ value: any, error: ValidationError }> = [
      { value: '', error: new ValidationError(`The ${property} is required`) },
      { value: true, error: new ValidationError(`The ${property} must be a string`) },
      {
        value: 'invalid_size',
        error: new ValidationError(`The ${property} must be less or equal than ${maxLenght} characters`)
      }
    ]

    dataValues.forEach(data => {
      const validator = makeSut(data.value, property)
      expect(() => {
        validator.required().string().maxLength(maxLenght)
      }).toThrowError(data.error)
    })
  })

  it('should not throw an error with combined rules and valid values', () => {
    const property = 'field'
    const maxLenght = 50
    const dataValues: Array<{ value: any, error: ValidationError }> = [
      { value: 'any_value', error: new ValidationError(`The ${property} is required`) },
      { value: 'any_string', error: new ValidationError(`The ${property} must be a string`) },
      {
        value: 'valid_size',
        error: new ValidationError(`The ${property} must be less or equal than ${maxLenght} characters`)
      }
    ]

    dataValues.forEach(data => {
      const validator = makeSut(data.value, property)
      expect(() => {
        validator.required().string().maxLength(maxLenght)
      }).not.toThrowError(data.error)
    })
  })
})
