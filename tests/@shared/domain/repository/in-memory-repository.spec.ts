import { Entity, InMemoryRepository } from '@/@shared/domain'

type StubEntityProps = {
  name: string
  price: number
}

class StubEntity extends Entity<StubEntityProps> {}

class StubInMemoryRepository extends InMemoryRepository<StubEntity> {}

describe('InMemoryRepository', () => {
  it('should insert a new entity', async () => {
    const repository = new StubInMemoryRepository()
    const entity = new StubEntity({
      name: 'any_name',
      price: 10
    })

    await repository.insert(entity)

    expect(entity.toJSON()).toStrictEqual(repository.items[0].toJSON())
  })
})
