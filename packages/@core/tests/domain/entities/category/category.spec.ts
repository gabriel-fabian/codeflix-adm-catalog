import { Category } from '@/domain'
import { mockCategory } from '@/tests/domain/mocks'

import { faker } from '@faker-js/faker'

describe('Category', () => {
  beforeEach(() => {
    Category.validate = jest.fn()
  })

  it('should construct a new category with all params', () => {
    const categoryProps = {
      id: faker.datatype.uuid(),
      name: faker.random.word(),
      description: faker.random.words(),
      is_active: faker.datatype.boolean(),
      created_at: faker.date.recent()
    }

    const category = new Category(categoryProps)

    expect(Category.validate).toHaveBeenCalled()
    expect(category.id).toBeTruthy()
    expect(category.name).toEqual(categoryProps.name)
    expect(category.description).toEqual(categoryProps.description)
    expect(category.is_active).toEqual(categoryProps.is_active)
    expect(category.created_at).toEqual(categoryProps.created_at)
  })

  it('should construct a new category with only name', () => {
    const categoryProps = {
      name: faker.random.word()
    }

    const category = new Category(categoryProps)

    expect(category.id).toBeTruthy()
    expect(category.name).toEqual(categoryProps.name)
    expect(category.description).toEqual('')
    expect(category.is_active).toEqual(false)
    expect(category.created_at).toEqual(expect.any(Date))
  })

  it('should update a category with valid params', () => {
    const category = mockCategory()
    const updatedName = faker.word.noun()
    const updatedDescription = faker.random.words()

    category.update(updatedName, updatedDescription)

    expect(Category.validate).toHaveBeenCalledTimes(2)
    expect(category.name).toEqual(updatedName)
    expect(category.description).toEqual(updatedDescription)
  })

  it('should activate a category', () => {
    const category = mockCategory({ is_active: false })
    category.activate()

    expect(category.is_active).toEqual(true)
  })

  it('should deactivate a category', () => {
    const category = mockCategory({ is_active: true })
    category.deactivate()

    expect(category.is_active).toEqual(false)
  })
})
