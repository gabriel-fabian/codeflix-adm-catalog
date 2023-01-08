export type Errors = Record<string, string[]>

export interface ValidatorInterface<ValidatedProps> {
  errors: Errors
  validatedData: ValidatedProps
  validate: (data: any) => boolean
}
