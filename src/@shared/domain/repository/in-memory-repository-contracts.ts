import { Entity, UniqueEntityId } from '@/@shared/domain'

export interface InMemoryRepositoryInterface<E extends Entity> {
  insert: (entity: E) => Promise<void>
  findById: (id: string | UniqueEntityId) => Promise<E>
  findAll: () => Promise<E[]>
  update: (entity: E) => Promise<void>
  delete: (id: string | UniqueEntityId) => Promise<void>
}

export type SortDirection = 'asc' | 'desc'

export type SearchProps<Filter = string> = {
  page?: number
  per_page?: number
  sort?: string | null
  sort_dir?: SortDirection | null
  filter?: Filter | null
}

export class SearchParams {
  protected _page: number
  protected _per_page: number
  protected _sort: string | null
  protected _sort_dir: SortDirection | null
  protected _filter: string | null

  constructor (props: SearchProps = {}) {
    this.page = props.page ?? 1
    this.per_page = props.per_page ?? 15
    this.sort = props.sort ?? null
    this.sort_dir = props.sort_dir ?? null
    this.filter = props.filter ?? null
  }

  get page (): number {
    return this._page
  }

  private set page (value: number) {
    const page = Math.floor(+value)

    if (Number.isNaN(page) || page <= 0) {
      this._page = 1
      return
    }

    this._page = page
  }

  get per_page (): number {
    return this._per_page
  }

  private set per_page (value: number) {
    const per_page = value === true as any ? 15 : Math.floor(+value)

    if (Number.isNaN(per_page) || per_page <= 0) {
      this._per_page = 15
      return
    }

    this._per_page = per_page
  }

  get sort (): string | null {
    return this._sort
  }

  private set sort (value: string | null) {
    this._sort =
      value === null || value === undefined || value === '' ? null : `${value}`
  }

  get sort_dir (): string | null {
    return this._sort_dir
  }

  private set sort_dir (value: string | null) {
    if (!this.sort) {
      this._sort_dir = null
      return
    }
    const dir = `${value as string}`.toLowerCase()
    this._sort_dir = dir !== 'asc' && dir !== 'desc' ? 'asc' : dir
  }

  get filter (): string | null {
    return this._filter
  }

  private set filter (value: string | null) {
    this._filter = value === null || value === undefined || value === '' ? null : `${value}`
  }
}

export interface SearchableRepositoryInterface<E extends Entity, SearchInput, SearchOutput>
  extends InMemoryRepositoryInterface<E> {
  search: (props: SearchInput) => Promise<SearchOutput>
}
