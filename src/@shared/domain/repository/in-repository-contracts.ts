import { Entity, UniqueEntityId } from '@/@shared/domain'

export interface InMemoryRepositoryInterface<E extends Entity> {
  insert: (entity: E) => Promise<void>
  findById: (id: string | UniqueEntityId) => Promise<E>
  findAll: () => Promise<E[]>
  update: (entity: E) => Promise<void>
  delete: (id: string | UniqueEntityId) => Promise<void>
}
