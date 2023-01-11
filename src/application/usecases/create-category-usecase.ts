import { Category } from '@/domain/entities'
import { CategoryRepository } from '@/domain/repository'

export class CreateCategoryUseCase {
  constructor (
    private readonly repository: CategoryRepository.Repository
  ) {}

  async run (input: Input): Promise<Output> {
    const category = new Category(input)
    await this.repository.insert(category)
    return {
      id: category.id,
      name: category.name,
      description: category.description,
      is_active: category.is_active,
      created_at: category.created_at
    }
  }
}

export type Input = {
  name: string
  description?: string
  is_active?: boolean
}

export type Output = {
  id: string
  name: string
  description: string | null
  is_active: boolean
  created_at: Date
}
