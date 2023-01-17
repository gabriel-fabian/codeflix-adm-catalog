import { CategoryRepository } from '@/domain'
import { CategoryOutput } from '@/application/dto'
import { UseCase } from '@/@shared/application'

export class GetCategoryUseCase implements UseCase<Input, CategoryOutput> {
  constructor (
    private readonly repository: CategoryRepository.Repository
  ) {}

  async run (input: Input): Promise<CategoryOutput> {
    const category = await this.repository.findById(input.id)
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
  id: string
}
