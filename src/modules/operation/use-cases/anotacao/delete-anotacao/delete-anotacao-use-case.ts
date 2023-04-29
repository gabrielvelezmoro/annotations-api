import { inject, injectable } from 'tsyringe'
import { IAnotacaoRepository } from '@modules/operation/repositories/i-anotacao-repository'
import { HttpResponse } from '@shared/helpers'

@injectable()
class DeleteAnotacaoUseCase {
  constructor(
    @inject('AnotacaoRepository')
    private anotacaoRepository: IAnotacaoRepository
  ) {}

  async execute(id: string): Promise<HttpResponse> {
    const anotacao = await this.anotacaoRepository.delete(id)

    return anotacao
  }
}

export { DeleteAnotacaoUseCase }