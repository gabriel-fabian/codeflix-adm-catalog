import { Category } from '@/domain/entities'

import { faker } from '@faker-js/faker'

describe('Category Entity', () => {
  it('should construct a new category with all params', () => {
    const categoryProps = {
      id: faker.datatype.uuid(),
      name: faker.random.word(),
      description: faker.random.words(),
      is_active: faker.datatype.boolean(),
      created_at: faker.date.recent()
    }

    const category = new Category(categoryProps)

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
})
