import { Test, TestingModule } from '@nestjs/testing'
import {
  CreateCategoryUseCase,
  UpdateCategoryUseCase,
  DeleteCategoryUseCase,
  GetCategoryUseCase,
  ListCategoriesUseCase
} from 'micro-videos/application'
import { SortDirection } from 'micro-videos/@shared'

import { CategoriesController } from '../../src/categories/categories.controller'

class UseCasesSpy {
  input = ''
  callsCount = 0

  async run (input?: any): Promise<any> {
    this.callsCount++
    this.input = input
  }
}

const makeSut = async (mocked: UseCasesSpy) => {
  const module: TestingModule = await Test.createTestingModule({
    controllers: [CategoriesController],
    providers: [
      {
        provide: CreateCategoryUseCase,
        useValue: mocked
      },
      {
        provide: UpdateCategoryUseCase,
        useValue: mocked
      },
      {
        provide: DeleteCategoryUseCase,
        useValue: mocked
      },
      {
        provide: GetCategoryUseCase,
        useValue: mocked
      },
      {
        provide: ListCategoriesUseCase,
        useValue: mocked
      }
    ]
  }).compile()

  return module.get<CategoriesController>(CategoriesController)
}

describe('CategoriesController', () => {
  let mockedUseCase: UseCasesSpy
  let sut: CategoriesController

  beforeEach(async () => {
    mockedUseCase = new UseCasesSpy()
    sut = await makeSut(mockedUseCase)
  })

  it('should call CreateUseCase', async () => {
    const input = {
      name: 'any_name',
      description: 'any_description',
      is_active: true
    }

    await sut.create(input)

    expect(mockedUseCase.callsCount).toBe(1)
    expect(mockedUseCase.input).toStrictEqual(input)
  })

  it('should call UpdateUseCase', async () => {
    const id = 'any_id'

    const input = {
      name: 'updated_name',
      description: 'updated_description',
      is_active: false
    }

    await sut.update(id, input)

    expect(mockedUseCase.callsCount).toBe(1)
    expect(mockedUseCase.input).toStrictEqual({
      id,
      ...input
    })
  })

  it('should call DeleteUseCase', async () => {
    const id = 'any_id'

    await sut.remove(id)

    expect(mockedUseCase.callsCount).toBe(1)
    expect(mockedUseCase.input).toStrictEqual({
      id
    })
  })

  it('should call GetUseCase', async () => {
    const id = 'any_id'

    await sut.findOne(id)

    expect(mockedUseCase.callsCount).toBe(1)
    expect(mockedUseCase.input).toStrictEqual({
      id
    })
  })

  it('should call ListUseCase', async () => {
    const searchParams = {
      page: 1,
      per_page: 2,
      sort: 'name',
      sort_dir: 'desc' as SortDirection,
      filter: 'test'
    }

    await sut.search(searchParams)

    expect(mockedUseCase.callsCount).toBe(1)
    expect(mockedUseCase.input).toStrictEqual(searchParams)
  })
})
