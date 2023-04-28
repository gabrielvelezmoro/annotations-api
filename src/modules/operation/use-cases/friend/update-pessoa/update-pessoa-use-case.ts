import { inject, injectable } from 'tsyringe'
import { IPessoaRepository } from '@modules/operation/repositories/i-pessoa-repository'
import { HttpResponse } from '@shared/helpers'

interface IRequest {
  nome: string;
  nomeMae: string;
  nomePai?: string;
  cep: string;
  dataNascimento: Date;
}

@injectable()
class UpdatePessoaUseCase {
  constructor(
    @inject('PessoaRepository')
    private pessoaRepository: IPessoaRepository
  ) {}

  async execute({
    nome,
    nomeMae,
    nomePai,
    cep,
    dataNascimento,
  }: IRequest): Promise<HttpResponse> {
    const friend = await this.pessoaRepository.update({
      nome,
      nomeMae,
      nomePai,
      cep,
      dataNascimento,
    })

    return friend
  }
}

export { UpdatePessoaUseCase }
