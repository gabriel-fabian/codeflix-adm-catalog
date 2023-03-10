import { Entity, InMemoryRepository } from '@/@shared/domain'
import NotFoundError from '@/@shared/errors/not-found-error'

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

  it('should throw error when entity not found', () => {
    const sut = makeSut()

    expect(sut.findById('fake_id')).rejects.toThrow(
      new NotFoundError('Entity with ID fake_id not found')
    )
  })

  it('should find an entity by id', async () => {
    const sut = makeSut()
    const entity = new StubEntity({
      name: 'any_name',
      price: 10
    })
    sut.items[0] = entity

    const foundEntity = await sut.findById(entity.id)

    expect(foundEntity).toStrictEqual(sut.items[0])
  })

  it('should return all entries', async () => {
    const sut = makeSut()
    const entity1 = new StubEntity({
      name: 'any_name',
      price: 10
    })
    const entity2 = new StubEntity({
      name: 'any_name2',
      price: 20
    })
    sut.items.push(entity1)
    sut.items.push(entity2)

    const foundEntries = await sut.findAll()

    expect(foundEntries).toStrictEqual([entity1, entity2])
  })

  it('should throw error on update when entity do not exist', async () => {
    const sut = makeSut()
    const entity = new StubEntity({
      name: 'any_name',
      price: 10
    })

    expect(sut.update(entity)).rejects.toThrow(
      new NotFoundError(`Entity with ID ${entity.id} not found`)
    )
  })

  it('should update an entity', async () => {
    const sut = makeSut()
    const entity = new StubEntity({
      name: 'any_name',
      price: 10
    })
    sut.items.push(entity)

    const updatedEntity = new StubEntity({
      name: 'updated_name',
      price: 20
    }, entity.uniqueEntityId)

    await sut.update(updatedEntity)

    expect(updatedEntity.toJSON()).toStrictEqual(sut.items[0].toJSON())
  })

  it('should throw error on delete when entity do not exist', async () => {
    const sut = makeSut()

    expect(sut.delete('any_id')).rejects.toThrow(
      new NotFoundError('Entity with ID any_id not found')
    )
  })

  it('should delete an entity', async () => {
    const sut = makeSut()
    const entity = new StubEntity({
      name: 'any_name',
      price: 10
    })
    sut.items.push(entity)

    await sut.delete(entity.id)

    expect(sut.items).toEqual([])
  })
})
