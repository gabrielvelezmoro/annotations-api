import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { ListAnotacaoUseCase } from './list-anotacao-use-case'

class ListAnotacaoController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { 
      search,
      page,
      rowsPerPage,
      columnOrder
    } = request.body

    const listAnotacaoUseCase = container.resolve(ListAnotacaoUseCase)

    const pessoas = await listAnotacaoUseCase.execute({
      search: search as string,
      page: page as number,
      rowsPerPage: rowsPerPage as number,
      columnOrder: columnOrder as Array<'ASC' | 'DESC'>
    })

    return response.json(pessoas)
  }
}

export { ListAnotacaoController }
