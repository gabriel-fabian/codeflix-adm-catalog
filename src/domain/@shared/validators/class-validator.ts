import { Errors, ValidatorInterface } from './validator-interface'

import { validateSync } from 'class-validator'

export abstract class ClassValidator<ValidateProps> implements ValidatorInterface<ValidateProps> {
  errors: Errors
  validatedData: ValidateProps

  validate (data: any): boolean {
    const errors = validateSync(data)
    if (errors.length) {
      this.errors = {}
      for (const error of errors) {
        if (error.constraints) {
          const field = error.property
          this.errors[field] = Object.values(error.constraints)
        }
      }
    } else {
      this.validatedData = data
    }
    return !errors.length
  }
}
