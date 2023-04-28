import { inject, injectable } from 'tsyringe'
import { Pessoa } from '@modules/operation/infra/typeorm/entities/pessoa'
import { IPessoaRepository } from '@modules/operation/repositories/i-pessoa-repository'

interface IRequest {
  nome: string;
  nomeMae: string;
  nomePai?: string;
  cep: string;
  dataNascimento: Date;
}

@injectable()
class CreatePessoaUseCase {
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
  }: IRequest): Promise<Pessoa> { 
    console.log(nome)
    const result = await this.pessoaRepository.create({
        nome,
        nomeMae,
        nomePai,
        cep,
        dataNascimento
      })
      .then(pessoaResult => {
        console.log('entrei no then', pessoaResult)
        return pessoaResult
      })
      .catch(error => {
        return error
      })

    return result
  }
}

export { CreatePessoaUseCase }
