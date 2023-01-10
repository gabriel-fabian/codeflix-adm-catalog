import { Entity } from '@/@shared/domain'
import { InMemoryRepositoryInterface } from './in-repository-contracts'
import NotFoundError from '@/@shared/errors/not-found-error'

export abstract class InMemoryRepository<E extends Entity> implements InMemoryRepositoryInterface<E> {
  items: E[] = []

  async insert (entity: E): Promise<void> {
    this.items.push(entity)
  }

  async findById (id: string): Promise<E> {
    return await this._get(id)
  }

  async findAll (): Promise<E[]> {
    return this.items
  }

  async update (entity: E): Promise<void> {
    await this._get(entity.id)
    const index = this.items.findIndex(i => i.id === entity.id)
    this.items[index] = entity
  }

  async delete (id: string): Promise<void> {
    await this._get(id)
    const index = this.items.findIndex(i => i.id === id)
    this.items.splice(index, 1)
  }

  protected async _get (id: string): Promise<E> {
    const item = this.items.find(i => i.id === id)
    if (!item) {
      throw new NotFoundError(`Entity with ID ${id} not found`)
    }
    return item
  }
}
