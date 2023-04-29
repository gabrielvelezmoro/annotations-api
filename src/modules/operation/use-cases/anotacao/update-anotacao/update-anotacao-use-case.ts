import { inject, injectable } from 'tsyringe'
import { IAnotacaoRepository } from '@modules/operation/repositories/i-anotacao-repository'
import { HttpResponse } from '@shared/helpers'


interface IRequest {
  id: number,
  idPessoa: number,
  descricao:string,
  titulo: string
}

@injectable()
class UpdateAnotacaoUseCase {
  constructor(
    @inject('AnotacaoRepository')
    private AnotacaoRepository: IAnotacaoRepository
    ) {}

    async execute({
      id,
      idPessoa,
      titulo,
      descricao
    }: IRequest): Promise<HttpResponse> {

    const person = await this.AnotacaoRepository.update({
      id,
      idPessoa,
      titulo,
      descricao
    })

    return person
  }
}

export { UpdateAnotacaoUseCase }
