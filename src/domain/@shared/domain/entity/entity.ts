import { UniqueEntityId } from '@/domain/@shared/domain'

export default abstract class Entity<Props> {
  public readonly uniqueEntityId: UniqueEntityId

  constructor (private readonly props: Props, id?: UniqueEntityId) {
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
