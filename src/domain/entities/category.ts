import { Entity, UniqueEntityId } from '@/domain/@shared/domain'

type CategoryProps = {
  name: string
  description?: string
  is_active?: boolean
  created_at?: Date
}

export class Category extends Entity<CategoryProps> {
  private _name: string
  private _description: string
  private _is_active: boolean
  private readonly _created_at: Date

  constructor (props: CategoryProps, id?: UniqueEntityId) {
    super(props, id)
    this._name = props.name
    this._description = props.description ?? ''
    this._is_active = props.is_active ?? false
    this._created_at = props.created_at ?? new Date()
  }

  get name (): string {
    return this._name
  }

  get description (): string {
    return this._description
  }

  get is_active (): boolean {
    return this._is_active
  }

  get created_at (): Date {
    return this._created_at
  }

  update (name: string, description: string): void {
    this._name = name
    this._description = description
  }

  activate (): void {
    this._is_active = true
  }

  deactivate (): void {
    this._is_active = false
  }
}
