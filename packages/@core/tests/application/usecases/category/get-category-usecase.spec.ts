import NotFoundError from '@/@shared/errors/not-found-error'
import { GetCategoryUseCase } from '@/application/usecases/category'
import { Category } from '@/domain/entities'
import { CategoryInMemoryRepository } from '@/infra/repos/in-memory'

type SutTypes = {
  sut: GetCategoryUseCase
  repository: CategoryInMemoryRepository
}

const makeSut = (): SutTypes => {
  const repository = new CategoryInMemoryRepository()
  const sut = new GetCategoryUseCase(repository)

  return {
    sut,
    repository
  }
}

describe('GetCategoryUseCase', () => {
  it('should throw when repository throws', async () => {
    const { sut } = makeSut()

    expect(sut.run({ id: 'invalid_id' })).rejects.toThrow(
      new NotFoundError('Entity with ID invalid_id not found')
    )
  })

  it('should get a category', async () => {
    const { sut, repository } = makeSut()
    const category = new Category({
      name: 'any_name'
    })
    repository.insert(category)

    const foundCategory = await sut.run({ id: category.id })

    expect(foundCategory).toStrictEqual({
      id: category.id,
      name: category.name,
      description: category.description,
      is_active: category.is_active,
      created_at: category.created_at
    })
  })
})
