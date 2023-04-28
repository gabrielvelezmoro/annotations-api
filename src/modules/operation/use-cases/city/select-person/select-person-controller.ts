import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { SelectPersonUseCase } from './select-person-use-case'
import { HttpResponse } from '@shared/helpers'

class SelectPersonController {
  async handle(request: Request, response: Response): Promise<Response> {
    const selectPersonUseCase = container.resolve(SelectPersonUseCase)

    const persons = await selectPersonUseCase.execute()

    return response.json(persons)
  }
}

export { SelectPersonController }
