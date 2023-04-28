import { inject, injectable } from 'tsyringe'
import { IPessoaRepository } from '@modules/operation/repositories/i-pessoa-repository'
import { HttpResponse } from '@shared/helpers'

interface IRequest {
  search: string,
  page: number,
  rowsPerPage: number,
  columnOrder: Array<'ASC' | 'DESC'>
}

@injectable()
class ListPessoaUseCase {
  constructor(
    @inject('PessoaRepository')
    private pessoaRepository: IPessoaRepository
  ) {}

  async execute({
    search,
    page,
    rowsPerPage,
    columnOrder
  }: IRequest): Promise<HttpResponse> {
    const pessoas = await this.pessoaRepository.list(
      search,
      page,
      rowsPerPage,
      columnOrder
    )

    return pessoas
  }
}

export { ListPessoaUseCase }
