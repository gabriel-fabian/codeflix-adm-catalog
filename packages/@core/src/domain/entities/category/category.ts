import { Entity, UniqueEntityId } from '@/@shared/domain'
import { EntityValidationError } from '@/@shared/errors'
import { makeCategoryValidator } from '@/domain'

export type CategoryProps = {
  name: string
  description?: string
  is_active?: boolean
  created_at?: Date
}

// Refactor: remove props manipulation
export class Category extends Entity<CategoryProps> {
  constructor (props: CategoryProps, id?: UniqueEntityId) {
    Category.validate(props)
    super(props, id)
    this.props.description = props.description ?? ''
    this.props.is_active = props.is_active ?? false
    this.props.created_at = props.created_at ?? new Date()
  }

  update (name: string, description: string): void {
    Category.validate({ name, description })
    this.props.name = name
    this.props.description = description ?? ''
  }

  static validate (props: CategoryProps): void {
    const validator = makeCategoryValidator()
    const isValid = validator.validate(props)
    if (!isValid) {
      throw new EntityValidationError(JSON.stringify(validator.errors))
    }
  }

  activate (): void {
    this.props.is_active = true
  }

  deactivate (): void {
    this.props.is_active = false
  }

  get name (): string {
    return this.props.name
  }

  get description (): string {
    return this.props.description as string
  }

  get is_active (): boolean {
    return this.props.is_active as boolean
  }

  get created_at (): Date {
    return this.props.created_at as Date
  }
}
