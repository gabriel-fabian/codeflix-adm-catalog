import { Module } from '@nestjs/common'
import {
  CreateCategoryUseCase,
  DeleteCategoryUseCase,
  GetCategoryUseCase,
  ListCategoriesUseCase,
  UpdateCategoryUseCase
} from 'micro-videos/application'
import { CategoryInMemoryRepository } from 'micro-videos/infra'
import { CategoryRepository } from 'micro-videos/domain'

import { CategoriesController } from './categories.controller'

@Module({
  controllers: [CategoriesController],
  providers: [
    {
      provide: 'CategoryRepository',
      useClass: CategoryInMemoryRepository
    },
    {
      provide: CreateCategoryUseCase,
      useFactory: (categoryRepo: CategoryRepository.Repository) => {
        return new CreateCategoryUseCase(categoryRepo)
      },
      inject: ['CategoryRepository']
    },
    {
      provide: UpdateCategoryUseCase,
      useFactory: (categoryRepo: CategoryRepository.Repository) => {
        return new UpdateCategoryUseCase(categoryRepo)
      },
      inject: ['CategoryRepository']
    },
    {
      provide: DeleteCategoryUseCase,
      useFactory: (categoryRepo: CategoryRepository.Repository) => {
        return new DeleteCategoryUseCase(categoryRepo)
      },
      inject: ['CategoryRepository']
    },
    {
      provide: GetCategoryUseCase,
      useFactory: (categoryRepo: CategoryRepository.Repository) => {
        return new GetCategoryUseCase(categoryRepo)
      },
      inject: ['CategoryRepository']
    },
    {
      provide: ListCategoriesUseCase,
      useFactory: (categoryRepo: CategoryRepository.Repository) => {
        return new ListCategoriesUseCase(categoryRepo)
      },
      inject: ['CategoryRepository']
    }
  ]
})
export class CategoriesModule {}
