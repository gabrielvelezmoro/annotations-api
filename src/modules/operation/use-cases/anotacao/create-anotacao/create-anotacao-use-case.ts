import { inject, injectable } from 'tsyringe'
import { Anotacao } from '@modules/operation/infra/typeorm/entities/anotacao'
import { IAnotacaoRepository } from '@modules/operation/repositories/i-anotacao-repository'

interface IRequest {
  idPessoa: number,
  titulo: string,
  descricao: string
}

@injectable()
class CreateAnotacaoUseCase {
  constructor(
    @inject('AnotacaoRepository')
    private anotacaoRepository: IAnotacaoRepository
  ) {}

  async execute({
   idPessoa,
   titulo,
   descricao
  }: IRequest): Promise<Anotacao> { 
      const result = await this.anotacaoRepository.create({
        idPessoa,
        titulo,
        descricao
      })
      .then(anotacaoResult => {
        return anotacaoResult
      })
      .catch(error => {
        return error
      })

    return result
  }
}

export { CreateAnotacaoUseCase }
