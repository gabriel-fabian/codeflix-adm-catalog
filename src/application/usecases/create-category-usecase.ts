import { Category } from '@/domain/entities'
import { CategoryRepository } from '@/domain/repository'
import { CategoryOutput } from '@/application/dto'

export class CreateCategoryUseCase {
  constructor (
    private readonly repository: CategoryRepository.Repository
  ) {}

  async run (input: Input): Promise<CategoryOutput> {
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

type Input = {
  name: string
  description?: string
  is_active?: boolean
}
