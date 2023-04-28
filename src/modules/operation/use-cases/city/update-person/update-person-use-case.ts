import { inject, injectable } from 'tsyringe'
import { Person } from '@modules/operation/infra/typeorm/entities/person'
import { IPersonRepository } from '@modules/operation/repositories/i-person-repository'
import { AppError } from '@shared/errors/app-error'
import { HttpResponse } from '@shared/helpers'

interface IRequest {
  id: string
  organizationId: string
  roleId: string
  name: string
  email: string
  mobile: string
  operatorId: string
  whatsapp: string
  stateId: string
  cityId: string
  zipCode: string
  address: string
  number: string
  complement: string
  genreId: string
  validated: boolean
  validationDate: Date
  disabled: boolean
}

@injectable()
class UpdatePersonUseCase {
  constructor(
    @inject('PersonRepository')
    private personRepository: IPersonRepository
  ) {}

  async execute({
    id,
    organizationId,
    roleId,
    name,
    email,
    mobile,
    operatorId,
    whatsapp,
    stateId,
    cityId,
    zipCode,
    address,
    number,
    complement,
    genreId,
    validated,
    validationDate,
    disabled
  }: IRequest): Promise<HttpResponse> {
    const person = await this.personRepository.update({
      id,
      organizationId,
      roleId,
      name,
      email,
      mobile,
      operatorId,
      whatsapp,
      stateId,
      cityId,
      zipCode,
      address,
      number,
      complement,
      genreId,
      validated,
      validationDate,
      disabled
    })

    return person
  }
}

export { UpdatePersonUseCase }
