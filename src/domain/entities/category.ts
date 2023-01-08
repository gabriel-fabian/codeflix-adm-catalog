import { Entity, UniqueEntityId } from '@/domain/@shared/domain'
import { ValidatorRules } from '../@shared/validators/validator-rules'

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
    Category.validate(props)
    super(props, id)
    this._name = props.name
    this._description = props.description ?? ''
    this._is_active = props.is_active ?? false
    this._created_at = props.created_at ?? new Date()
  }

  update (name: string, description: string): void {
    Category.validate({ name, description })
    this._name = name
    this._description = description
  }

  static validate (props: Omit<CategoryProps, 'created_at'>): void {
    ValidatorRules.values(props.name, 'name').required().string().maxLength(255)
    ValidatorRules.values(props.description, 'description').string()
  }

  activate (): void {
    this._is_active = true
  }

  deactivate (): void {
    this._is_active = false
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
}
