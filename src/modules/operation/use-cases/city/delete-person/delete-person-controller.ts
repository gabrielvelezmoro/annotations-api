import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { DeletePersonUseCase } from './delete-person-use-case'
import { ListPersonUseCase } from '../list-person/list-person-use-case'
import { HttpResponse } from '@shared/helpers'

class DeletePersonController {
  async handle(request: Request, response: Response): Promise<Response> {
    // delete record
    
    const id = request.params.id
    const deletePersonUseCase = container.resolve(DeletePersonUseCase)
    await deletePersonUseCase.execute(id)


    // restore list with updated records

    const listPersonUseCase = container.resolve(ListPersonUseCase)
    const persons = await listPersonUseCase.execute({
      search: '',
      page: 0,
      rowsPerPage: 100,
      columnOrder: []
    })

    return response.json(persons)
  }
}

export { DeletePersonController }
