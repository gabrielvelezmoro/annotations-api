import { inject, injectable } from 'tsyringe'
import { Person } from '@modules/operation/infra/typeorm/entities/person'
import { IPersonRepository } from '@modules/operation/repositories/i-person-repository'
import { HttpResponse } from '@shared/helpers'

@injectable()
class SelectPersonUseCase {
  constructor(
    @inject('PersonRepository')
    private personRepository: IPersonRepository
  ) {}

  async execute(): Promise<HttpResponse> {
    const persons = await this.personRepository.select()

    return persons
  }
}

export { SelectPersonUseCase }
