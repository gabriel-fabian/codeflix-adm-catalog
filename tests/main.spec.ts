import { faker } from '@faker-js/faker'

import { greeter } from '@/main'

describe('Main Greeter test', () => {
  it('should return a greeting to a specified name', () => {
    const name = faker.name.firstName()
    const res = greeter(name)

    expect(res).toEqual(`Hello ${name}.`)
  })
})
