import { inject, injectable } from 'tsyringe'
import { IPessoaRepository } from '@modules/operation/repositories/i-pessoa-repository'
import { HttpResponse } from '@shared/helpers'

@injectable()
class SelectPessoaUseCase {
  constructor(
    @inject('PessoaRepository')
    private pessoaRepository: IPessoaRepository
  ) {}

  async execute(): Promise<HttpResponse> {
    const pessoas = await this.pessoaRepository.select()

    return pessoas
  }
}

export { SelectPessoaUseCase }
