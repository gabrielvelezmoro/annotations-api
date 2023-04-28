import { inject, injectable } from 'tsyringe'
import { IPessoaRepository } from '@modules/operation/repositories/i-pessoa-repository'
import { HttpResponse } from '@shared/helpers'

@injectable()
class GetPessoaUseCase {
  constructor(
    @inject('PessoaRepository')
    private pessoaRepository: IPessoaRepository
  ) {}

  async execute(id: string): Promise<HttpResponse> {
    const pessoa = await this.pessoaRepository.get(id)

    return pessoa
  }
}

export { GetPessoaUseCase }
