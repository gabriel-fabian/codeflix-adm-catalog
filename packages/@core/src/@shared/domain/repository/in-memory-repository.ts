import { Entity } from '@/@shared/domain'
import {
  InMemoryRepositoryInterface,
  SearchParams,
  SearchResult,
  SearchableRepositoryInterface
} from './in-memory-repository-contracts'
import NotFoundError from '@/@shared/errors/not-found-error'

export abstract class InMemoryRepository<E extends Entity> implements InMemoryRepositoryInterface<E> {
  items: E[] = []

  async insert (entity: E): Promise<void> {
    this.items.push(entity)
  }

  async findById (id: string): Promise<E> {
    return await this._get(id)
  }

  async findAll (): Promise<E[]> {
    return this.items
  }

  async update (entity: E): Promise<void> {
    await this._get(entity.id)
    const index = this.items.findIndex(i => i.id === entity.id)
    this.items[index] = entity
  }

  async delete (id: string): Promise<void> {
    await this._get(id)
    const index = this.items.findIndex(i => i.id === id)
    this.items.splice(index, 1)
  }

  protected async _get (id: string): Promise<E> {
    const item = this.items.find(i => i.id === id)
    if (!item) {
      throw new NotFoundError(`Entity with ID ${id} not found`)
    }
    return item
  }
}

export abstract class InMemorySearchableRepository<E extends Entity>
  extends InMemoryRepository<E>
  implements SearchableRepositoryInterface<E> {
  sortableFields: string[] = []

  async search (props: SearchParams): Promise<SearchResult<E>> {
    const itemsFiltered = await this.applyFilter(this.items, props.filter)
    const itemsSorted = await this.applySort(itemsFiltered, props.sort, props.sort_dir)
    const itemsPaginated = await this.applyPaginate(itemsSorted, props.page, props.per_page)
    return new SearchResult({
      items: itemsPaginated,
      total: itemsFiltered.length,
      current_page: props.page,
      per_page: props.per_page,
      sort: props.sort,
      sort_dir: props.sort_dir,
      filter: props.filter
    })
  }

  abstract applyFilter (items: E[], filter: string | null): Promise<E[]>

  async applySort (items: E[], sort: string | null, sort_dir: string | null): Promise<E[]> {
    if (!sort || !this.sortableFields.includes(sort)) {
      return items
    }

    return [...items].sort((a, b) => {
      if (a.props[sort] < b.props[sort]) {
        return sort_dir === 'asc' ? -1 : 1
      }

      if (a.props[sort] > b.props[sort]) {
        return sort_dir === 'asc' ? 1 : -1
      }

      return 0
    })
  }

  async applyPaginate (
    items: E[],
    page: SearchParams['page'],
    per_page: SearchParams['per_page']
  ): Promise<E[]> {
    const start = (page - 1) * per_page // 1 * 15 = 15
    const limit = start + per_page // 15 + 15 = 30
    return items.slice(start, limit)
  }
}
