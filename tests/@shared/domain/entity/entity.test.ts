import { ValidationError } from '@/domain/@shared/errors'
import { Category } from '@/domain/entities'

describe('Category Integration', () => {
  describe('create method', () => {
    it('should throw a ValidationError when create with invalid params', () => {
      expect(() => {
        new Category({ name: '' })
      }).toThrowError(new ValidationError('The name is required'))

      expect(() => {
        new Category({ name: 'c'.repeat(256) })
      }).toThrowError(new ValidationError('The name must be less or equal than 255 characters'))
    })
  })
})
