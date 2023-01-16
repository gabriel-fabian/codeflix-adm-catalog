import {
  SearchableRepositoryInterface,
  SearchParams as DefaultSearchParams,
  SearchResult as DefaultSearchResult
} from '@/@shared/domain'
import { Category } from '@/domain/entities'

export namespace CategoryRepository {
  export type Filter = string

  export class SearchParams extends DefaultSearchParams<Filter | null> {}

  export class SearchResult extends DefaultSearchResult<Category, Filter | null> {}

  export interface Repository
    extends SearchableRepositoryInterface<
    Category,
    Filter,
    SearchParams,
    SearchResult
    > {}
}

export default CategoryRepository
