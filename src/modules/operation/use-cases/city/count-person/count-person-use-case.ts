import { inject, injectable } from 'tsyringe'
import { Person } from '@modules/operation/infra/typeorm/entities/person'
import { IPersonRepository } from '@modules/operation/repositories/i-person-repository'
import { HttpResponse } from '@shared/helpers'

interface IRequest {
  search: string,
}

@injectable()
class CountPersonUseCase {
  constructor(
    @inject('PersonRepository')
    private personRepository: IPersonRepository
  ) {}

  async execute({
    search
  }: IRequest): Promise<HttpResponse> {
    const personsCount = await this.personRepository.count(
      search
    )

    return personsCount
  }
}

export { CountPersonUseCase }
