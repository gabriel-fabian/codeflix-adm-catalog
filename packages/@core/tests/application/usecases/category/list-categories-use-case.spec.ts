import { ListCategoriesUseCase } from '@/application/usecases'
import { Category } from '@/domain'
import { CategoryInMemoryRepository } from '@/infra'

type SutTypes = {
  sut: ListCategoriesUseCase
  repository: CategoryInMemoryRepository
}

const makeSut = (): SutTypes => {
  const repository = new CategoryInMemoryRepository()
  const sut = new ListCategoriesUseCase(repository)

  return {
    sut,
    repository
  }
}

describe('ListCategoriesUseCase', () => {
  it('should return output using empty input with categories ordered by created_at', async () => {
    const { sut, repository } = makeSut()

    const items = [
      new Category({ name: 'test 1' }),
      new Category({
        name: 'test 2',
        created_at: new Date(new Date().getTime() + 100)
      })
    ]
    repository.items = items

    const output = await sut.run({})
    expect(output).toStrictEqual({
      items: [...items].reverse().map((i) => (i.toJSON())),
      total: 2,
      current_page: 1,
      per_page: 15,
      last_page: 1
    })
  })

  it('should returns output using pagination, sort and filter', async () => {
    const { sut, repository } = makeSut()

    const items = [
      new Category({ name: 'a' }),
      new Category({
        name: 'AAA'
      }),
      new Category({
        name: 'AaA'
      }),
      new Category({
        name: 'b'
      }),
      new Category({
        name: 'c'
      })
    ]
    repository.items = items

    let output = await sut.run({
      page: 1,
      per_page: 2,
      sort: 'name',
      filter: 'a'
    })
    expect(output).toStrictEqual({
      items: [items[1].toJSON(), items[2].toJSON()],
      total: 3,
      current_page: 1,
      per_page: 2,
      last_page: 2
    })

    output = await sut.run({
      page: 2,
      per_page: 2,
      sort: 'name',
      filter: 'a'
    })
    expect(output).toStrictEqual({
      items: [items[0].toJSON()],
      total: 3,
      current_page: 2,
      per_page: 2,
      last_page: 2
    })

    output = await sut.run({
      page: 1,
      per_page: 2,
      sort: 'name',
      sort_dir: 'desc',
      filter: 'a'
    })
    expect(output).toStrictEqual({
      items: [items[0].toJSON(), items[2].toJSON()],
      total: 3,
      current_page: 1,
      per_page: 2,
      last_page: 2
    })
  })
})
