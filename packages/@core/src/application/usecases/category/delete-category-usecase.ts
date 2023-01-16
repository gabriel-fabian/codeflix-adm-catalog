import { CategoryRepository } from '@/domain/repository'
import { UseCase } from '@/@shared/application'

export class DeleteCategoryUseCase implements UseCase<Input, void> {
  constructor (
    private readonly repository: CategoryRepository.Repository
  ) {}

  async run (input: Input): Promise<void> {
    await this.repository.delete(input.id)
  }
}

type Input = {
  id: string
}
