import { inject, injectable } from 'tsyringe'
import { IPessoaRepository } from '@modules/operation/repositories/i-pessoa-repository'
import { HttpResponse } from '@shared/helpers'

interface IRequest {
  search: string,
}

@injectable()
class CountPessoaUseCase {
  constructor(
    @inject('PessoaRepository')
    private pessoaRepository: IPessoaRepository
  ) {}

  async execute({
    search
  }: IRequest): Promise<HttpResponse> {
    const pessoaCount = await this.pessoaRepository.count(
      search
    )

    return pessoaCount
  }
}

export { CountPessoaUseCase }
