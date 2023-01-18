import { CategoryRepository } from '@/domain'
import { CategoryOutput } from '@/application'
import { UseCase } from '@/@shared/application'

export class UpdateCategoryUseCase implements UseCase<Input, CategoryOutput> {
  constructor (
    private readonly repository: CategoryRepository.Repository
  ) {}

  async run (input: Input): Promise<CategoryOutput> {
    const category = await this.repository.findById(input.id)
    category.update(input.name, input.description as string)

    if (input.is_active === true) {
      category.activate()
    }

    if (input.is_active === false) {
      category.deactivate()
    }

    await this.repository.update(category)
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
  name: string
  description?: string
  is_active?: boolean
}
