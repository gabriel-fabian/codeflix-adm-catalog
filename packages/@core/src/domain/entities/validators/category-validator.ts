import { ClassValidator } from '@/@shared/validators'
import { CategoryProps } from '@/domain'
import { IsBoolean, IsDate, IsNotEmpty, IsOptional, IsString, MaxLength } from 'class-validator'

class ValidateProps {
  @MaxLength(255)
  @IsString()
  @IsNotEmpty()
    name: string

  @IsString()
  @IsOptional()
    description: string

  @IsBoolean()
  @IsOptional()
    is_active: boolean

  @IsDate()
  @IsOptional()
    created_at: Date

  constructor ({ name, description, is_active, created_at }: CategoryProps) {
    Object.assign(this, { name, description, is_active, created_at })
  }
}

export class CategoryValidator extends ClassValidator<ValidateProps> {
  validate (data: CategoryProps): boolean {
    return super.validate(new ValidateProps(data))
  }
}

export const makeCategoryValidator = (): CategoryValidator => {
  return new CategoryValidator()
}
