/* eslint-disable @typescript-eslint/no-namespace */
import {
  CreateCategoryUseCase,
  UpdateCategoryUseCase,
  GetCategoryUseCase,
  ListCategoriesUseCase,
  DeleteCategoryUseCase
} from 'micro-videos/application'
import { CategoryRepository } from 'micro-videos/domain'
import {
  CategoryInMemoryRepository
} from 'micro-videos/infra'
export namespace CATEGORY_PROVIDERS {
  export namespace REPOSITORIES {
    export const CATEGORY_IN_MEMORY_REPOSITORY = {
      provide: 'CategoryInMemoryRepository',
      useClass: CategoryInMemoryRepository
    }
  }

  export namespace USE_CASES {
    export const CREATE_CATEGORY_USE_CASE = {
      provide: CreateCategoryUseCase,
      useFactory: (categoryRepo: CategoryRepository.Repository) => {
        return new CreateCategoryUseCase(categoryRepo)
      },
      inject: [REPOSITORIES.CATEGORY_IN_MEMORY_REPOSITORY.provide]
    }

    export const UPDATE_CATEGORY_USE_CASE = {
      provide: UpdateCategoryUseCase,
      useFactory: (categoryRepo: CategoryRepository.Repository) => {
        return new UpdateCategoryUseCase(categoryRepo)
      },
      inject: [REPOSITORIES.CATEGORY_IN_MEMORY_REPOSITORY.provide]
    }

    export const LIST_CATEGORIES_USE_CASE = {
      provide: ListCategoriesUseCase,
      useFactory: (categoryRepo: CategoryRepository.Repository) => {
        return new ListCategoriesUseCase(categoryRepo)
      },
      inject: [REPOSITORIES.CATEGORY_IN_MEMORY_REPOSITORY.provide]
    }

    export const GET_CATEGORY_USE_CASE = {
      provide: GetCategoryUseCase,
      useFactory: (categoryRepo: CategoryRepository.Repository) => {
        return new GetCategoryUseCase(categoryRepo)
      },
      inject: [REPOSITORIES.CATEGORY_IN_MEMORY_REPOSITORY.provide]
    }

    export const DELETE_CATEGORY_USE_CASE = {
      provide: DeleteCategoryUseCase,
      useFactory: (categoryRepo: CategoryRepository.Repository) => {
        return new DeleteCategoryUseCase(categoryRepo)
      },
      inject: [REPOSITORIES.CATEGORY_IN_MEMORY_REPOSITORY.provide]
    }
  }
}
