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

export class SearchParams<Filter = string> {
  protected _page: number
  protected _per_page: number
  protected _sort: string | null
  protected _sort_dir: SortDirection | null
  protected _filter: Filter | null

  constructor (props: SearchProps = {}) {
    this.page = props.page ?? 1
    this.per_page = props.per_page ?? 15
    this.sort = props.sort ?? null
    this.sort_dir = props.sort_dir ?? null
    this.filter = props.filter ?? null as any
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

  get sort_dir (): SortDirection | null {
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

  get filter (): Filter | null {
    return this._filter
  }

  private set filter (value: Filter | null) {
    this._filter =
      value === null || value === undefined || (value as unknown) === ''
        ? null
        // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
        : (`${value}` as any)
  }
}

type SearchResultProps<E extends Entity, Filter> = {
  items: E[]
  total: number
  current_page: number
  per_page: number
  sort: string | null
  sort_dir: string | null
  filter: Filter
}

export class SearchResult<E extends Entity, Filter = string | null> {
  readonly items: E[]
  readonly total: number
  readonly current_page: number
  readonly per_page: number
  readonly last_page: number
  readonly sort: string | null
  readonly sort_dir: string | null
  readonly filter: Filter

  constructor (props: SearchResultProps<E, Filter>) {
    this.items = props.items
    this.total = props.total
    this.current_page = props.current_page
    this.per_page = props.per_page
    this.last_page = Math.ceil(this.total / this.per_page)
    this.sort = props.sort
    this.sort_dir = props.sort_dir
    this.filter = props.filter
  }

  toJSON (forceEntity = false): object {
    return {
      items: forceEntity ? this.items.map((item) => item.toJSON()) : this.items,
      total: this.total,
      current_page: this.current_page,
      per_page: this.per_page,
      last_page: this.last_page,
      sort: this.sort,
      sort_dir: this.sort_dir,
      filter: this.filter
    }
  }
}

export interface SearchableRepositoryInterface<
  E extends Entity,
  Filter = string,
  SearchInput = SearchParams,
  SearchOutput = SearchResult<E, Filter | null>
> extends InMemoryRepositoryInterface<E> {
  sortableFields: string[]
  search: (props: SearchInput) => Promise<SearchOutput>
}
