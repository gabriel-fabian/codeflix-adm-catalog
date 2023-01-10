import { Entity, InMemoryRepository } from '@/@shared/domain'

type StubEntityProps = {
  name: string
  price: number
}

class StubEntity extends Entity<StubEntityProps> {}

class StubInMemoryRepository extends InMemoryRepository<StubEntity> {}

const makeSut = (): InMemoryRepository<StubEntity> => {
  return new StubInMemoryRepository()
}

describe('InMemoryRepository', () => {
  it('should insert a new entity', async () => {
    const sut = makeSut()
    const entity = new StubEntity({
      name: 'any_name',
      price: 10
    })

    await sut.insert(entity)

    expect(entity.toJSON()).toStrictEqual(sut.items[0].toJSON())
  })
})
