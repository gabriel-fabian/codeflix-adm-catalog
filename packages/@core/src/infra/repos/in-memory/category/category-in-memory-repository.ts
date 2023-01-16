import { InMemorySearchableRepository, SortDirection } from '@/@shared/domain'
import { Category } from '@/domain/entities'
import CategoryRepository from '@/domain/repository/category-repository'

export class CategoryInMemoryRepository
  extends InMemorySearchableRepository<Category>
  implements CategoryRepository.Repository {
  sortableFields: string[] = ['name', 'created_at']

  async applyFilter (
    items: Category[],
    filter: CategoryRepository.Filter
  ): Promise<Category[]> {
    if (!filter) {
      return items
    }

    return items.filter((i) => {
      return i.props.name.toLowerCase().includes(filter.toLowerCase())
    })
  }

  async applySort (
    items: Category[],
    sort: string | null,
    sort_dir: SortDirection | null
  ): Promise<Category[]> {
    return !sort
      ? await super.applySort(items, 'created_at', 'desc')
      : await super.applySort(items, sort, sort_dir)
  }
}
