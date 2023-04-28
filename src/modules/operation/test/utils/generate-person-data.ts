import { faker } from '@faker-js/faker'

export function generateNewPersonData(overide = {}) {
  return {
    organizationId: null,
    roleId: null,
    name: faker.datatype.string(60),
    email: faker.datatype.string(60),
    mobile: faker.datatype.string(20),
    operatorId: null,
    whatsapp: faker.datatype.string(20),
    stateId: null,
    cityId: null,
    zipCode: faker.datatype.string(10),
    address: faker.datatype.string(200),
    number: faker.datatype.string(5),
    complement: faker.datatype.string(200),
    genreId: null,
    validated: false,
    disabled: false,
    createdAt: new Date(),
    updatedAt: new Date(),
    ...overide
  }
}

export function generatePersonData(overide = {}) {
  return {
    id: faker.datatype.uuid(),
    organizationId: null,
    roleId: null,
    name: faker.datatype.string(60),
    email: faker.datatype.string(60),
    mobile: faker.datatype.string(20),
    operatorId: null,
    whatsapp: faker.datatype.string(20),
    stateId: null,
    cityId: null,
    zipCode: faker.datatype.string(10),
    address: faker.datatype.string(200),
    number: faker.datatype.string(5),
    complement: faker.datatype.string(200),
    genreId: null,
    validated: false,
    disabled: false,
    createdAt: new Date(),
    updatedAt: new Date(),
    ...overide
  }
}

export function generatePersonsData(n: number = 1, overide = {}) {
  return Array.from(
    {
      length: n,
    },
    (_, i) => {
      return generatePersonData(overide)
    }
  )
}
