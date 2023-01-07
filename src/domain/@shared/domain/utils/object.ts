export function deepFreeze<T> (obj: T): any {
  const propNames = Object.getOwnPropertyNames(obj)

  for (const name of propNames as any) {
    const value = obj[name as keyof T]

    if (value && typeof value === 'object') {
      deepFreeze(value)
    }
  }

  return Object.freeze(obj)
}
