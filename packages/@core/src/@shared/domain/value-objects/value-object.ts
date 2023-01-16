import { deepFreeze } from '@/@shared/domain/utils'

export default abstract class ValueObject<Value = any> {
  protected readonly _value: Value

  constructor (value: Value) {
    this._value = deepFreeze(value)
  }

  get value (): Value {
    return this._value
  }
}
