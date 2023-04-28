import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { GetPersonUseCase } from './get-person-use-case'
import { HttpResponse } from '@shared/helpers'

class GetPersonController {
  async handle(request: Request, response: Response): Promise<Response> {
    const id = request.params.id
    const getPersonUseCase = container.resolve(GetPersonUseCase)
    const person = await getPersonUseCase.execute(id)

    return response.status(person.statusCode).json(person)
  }
}

export { GetPersonController }
