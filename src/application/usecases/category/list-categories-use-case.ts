import { CategoryOutput } from '@/application/dto'
import { UseCase } from '@/@shared/application'
import { CategoryRepository } from '@/domain/repository'
import { SortDirection } from '@/@shared/domain'

export class ListCategoriesUseCase implements UseCase<Input, Output> {
  constructor (
    private readonly repository: CategoryRepository.Repository
  ) {}

  async run (input: Input): Promise<Output> {
    const params = new CategoryRepository.SearchParams(input)
    const searchResult = await this.repository.search(params)
    return {
      items: searchResult.items.map(i => ({
        id: i.id,
        name: i.name,
        description: i.description,
        is_active: i.is_active,
        created_at: i.created_at
      })),
      total: searchResult.total,
      current_page: searchResult.current_page,
      last_page: searchResult.last_page,
      per_page: searchResult.per_page
    }
  }
}

type Input = {
  page?: number
  per_page?: number
  sort?: string | null
  sort_dir?: SortDirection | null
  filter?: string | null
}

type Output = {
  items: CategoryOutput[]
  total: number
  current_page: number
  last_page: number
  per_page: number
}
