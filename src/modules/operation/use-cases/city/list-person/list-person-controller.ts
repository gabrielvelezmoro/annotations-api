import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { ListPersonUseCase } from './list-person-use-case'
import { HttpResponse } from '@shared/helpers'

class ListPersonController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { 
      search,
      page,
      rowsPerPage,
      columnOrder
    } = request.body

    const listPersonUseCase = container.resolve(ListPersonUseCase)

    const persons = await listPersonUseCase.execute({
      search: search as string,
      page: page as number,
      rowsPerPage: rowsPerPage as number,
      columnOrder: columnOrder as Array<'ASC' | 'DESC'>
    })

    return response.json(persons)
  }
}

export { ListPersonController }
