import { EntityValidationError } from '@/@shared/errors'
import { Category } from '@/domain/entities'

describe('Category Integration', () => {
  describe('create method', () => {
    it('should throw a EntityValidationError when create with invalid params', () => {
      expect(() => {
        new Category({ name: '' })
      }).toThrowError(new EntityValidationError(JSON.stringify({ name: ['name should not be empty'] })))

      expect(() => {
        new Category({ name: 'c'.repeat(256) })
      }).toThrowError(new EntityValidationError(JSON.stringify({ name: ['name must be shorter than or equal to 255 characters'] })))
    })
  })
})
