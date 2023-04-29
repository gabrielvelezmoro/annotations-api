import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { ListPessoaUseCase } from './list-pessoa-use-case'

class ListPessoaController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { 
      search,
      page,
      rowsPerPage,
      columnOrder
    } = request.body

    const listPessoaUseCase = container.resolve(ListPessoaUseCase)

    const pessoas = await listPessoaUseCase.execute({
      search: search as string,
      page: page as number,
      rowsPerPage: rowsPerPage as number,
      columnOrder: columnOrder as Array<'ASC' | 'DESC'>
    })

    return response.json(pessoas)
  }
}

export { ListPessoaController }
