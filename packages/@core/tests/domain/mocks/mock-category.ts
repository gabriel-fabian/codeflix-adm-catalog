import { Category } from '@/domain'

import { faker } from '@faker-js/faker'

type mockProps = {
  name?: string
  description?: string
  is_active?: boolean
}

export const mockCategory = (props?: mockProps): Category => {
  const categoryProps = {
    name: props?.name ?? faker.word.noun(),
    description: props?.description ?? faker.random.words(),
    is_active: props?.is_active ?? false,
    created_at: faker.date.recent()
  }
  return new Category(categoryProps)
}
