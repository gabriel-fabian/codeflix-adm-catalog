import { Category } from '@/domain/entities'
import { faker } from '@faker-js/faker'

export const mockCategory = (): Category => {
  const props = {
    name: faker.word.noun(),
    description: faker.random.words(),
    is_active: faker.datatype.boolean(),
    created_at: faker.date.recent()
  }
  return new Category(props)
}
