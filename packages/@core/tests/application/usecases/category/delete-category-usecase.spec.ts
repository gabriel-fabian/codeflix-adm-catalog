import NotFoundError from '@/@shared/errors/not-found-error'
import { DeleteCategoryUseCase } from '@/application/usecases/category'
import { Category } from '@/domain/entities'
import { CategoryInMemoryRepository } from '@/infra/repos/in-memory'

type SutTypes = {
  sut: DeleteCategoryUseCase
  repository: CategoryInMemoryRepository
}

const makeSut = (): SutTypes => {
  const repository = new CategoryInMemoryRepository()
  const sut = new DeleteCategoryUseCase(repository)

  return {
    sut,
    repository
  }
}

describe('DeleteCategoryUseCase', () => {
  it('should throw when repository throws', async () => {
    const { sut } = makeSut()

    expect(sut.run({ id: 'invalid_id' })).rejects.toThrow(
      new NotFoundError('Entity with ID invalid_id not found')
    )
  })

  it('should delete a category', async () => {
    const { sut, repository } = makeSut()
    const category = new Category({
      name: 'any_name'
    })
    repository.items = [category]

    await sut.run({ id: category.id })

    expect(repository.items).toStrictEqual([])

    repository.items = [
      new Category({ name: 'another_category' }),
      category
    ]

    await sut.run({ id: category.id })

    expect(repository.items).toStrictEqual([repository.items[0]])
    expect(repository.items[0].name).toStrictEqual('another_category')
  })
})
