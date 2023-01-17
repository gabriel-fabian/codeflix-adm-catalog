import { CreateCategoryUseCase } from '@/application/usecases'
import { CategoryInMemoryRepository } from '@/infra'

type SutTypes = {
  sut: CreateCategoryUseCase
  repository: CategoryInMemoryRepository
}

const makeSut = (): SutTypes => {
  const repository = new CategoryInMemoryRepository()
  const sut = new CreateCategoryUseCase(repository)

  return {
    sut,
    repository
  }
}

describe('CreateCategoryUseCase', () => {
  it('should create a category', async () => {
    const { sut, repository } = makeSut()

    let output = await sut.run({ name: 'any_category' })

    expect(output).toStrictEqual({
      id: repository.items[0].id,
      name: 'any_category',
      description: '',
      is_active: false,
      created_at: repository.items[0].created_at
    })

    output = await sut.run({
      name: 'any_category',
      description: 'any_description',
      is_active: true
    })

    expect(output).toStrictEqual({
      id: repository.items[1].id,
      name: 'any_category',
      description: 'any_description',
      is_active: true,
      created_at: repository.items[1].created_at
    })
  })
})
