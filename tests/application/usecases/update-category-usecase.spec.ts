import NotFoundError from '@/@shared/errors/not-found-error'
import { UpdateCategoryUseCase } from '@/application/usecases'
import { Category } from '@/domain/entities'
import { CategoryInMemoryRepository } from '@/infra/repos/in-memory'

type SutTypes = {
  sut: UpdateCategoryUseCase
  repository: CategoryInMemoryRepository
}

const makeSut = (): SutTypes => {
  const repository = new CategoryInMemoryRepository()
  const sut = new UpdateCategoryUseCase(repository)

  return {
    sut,
    repository
  }
}

describe('UpdateCategoryUseCase', () => {
  it('should throw when category ID does not exist', () => {
    const { sut } = makeSut()

    expect(
      sut.run({ id: 'invalid_id', name: 'valid_name' })
    ).rejects.toThrow(new NotFoundError('Entity with ID invalid_id not found'))
  })

  it('should update a category', async () => {
    const { sut, repository } = makeSut()
    const category = new Category({ name: 'any_name' })
    repository.items = [category]

    let output = await sut.run({
      id: category.id,
      name: 'updated_name'
    })

    expect(output).toStrictEqual({
      id: repository.items[0].id,
      name: 'updated_name',
      description: '',
      is_active: false,
      created_at: repository.items[0].created_at
    })

    output = await sut.run({
      id: category.id,
      name: 'updated_name',
      description: 'updated_description',
      is_active: true
    })

    expect(output).toStrictEqual({
      id: repository.items[0].id,
      name: 'updated_name',
      description: 'updated_description',
      is_active: true,
      created_at: repository.items[0].created_at
    })

    output = await sut.run({
      id: category.id,
      name: 'updated_name',
      is_active: false
    })

    expect(output).toStrictEqual({
      id: repository.items[0].id,
      name: 'updated_name',
      description: repository.items[0].description,
      is_active: false,
      created_at: repository.items[0].created_at
    })
  })
})
