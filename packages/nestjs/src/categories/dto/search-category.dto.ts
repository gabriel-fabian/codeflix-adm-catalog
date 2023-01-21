import { SortDirection, SearchProps } from 'micro-videos/@shared'

export class SearchCategoryDto implements SearchProps {
  page?: number
  per_page?: number
  sort?: string
  sort_dir?: SortDirection
  filer?: string
}
