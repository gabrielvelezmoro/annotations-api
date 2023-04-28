import { inject, injectable } from 'tsyringe'
import { Person } from '@modules/operation/infra/typeorm/entities/person'
import { IPersonRepository } from '@modules/operation/repositories/i-person-repository'
import { HttpResponse } from '@shared/helpers'

@injectable()
class DeletePersonUseCase {
  constructor(
    @inject('PersonRepository')
    private personRepository: IPersonRepository
  ) {}

  async execute(id: string): Promise<HttpResponse> {
    const person = await this.personRepository.delete(id)

    return person
  }
}

export { DeletePersonUseCase }
