import { UniqueEntityId } from '@/@shared/domain'

export default abstract class Entity<Props = any> {
  public readonly uniqueEntityId: UniqueEntityId

  constructor (readonly props: Props, id?: UniqueEntityId) {
    this.uniqueEntityId = id ?? new UniqueEntityId()
  }

  get id (): string {
    return this.uniqueEntityId.id
  }

  toJSON (): object {
    return {
      id: this.id,
      ...this.props
    }
  }
}
