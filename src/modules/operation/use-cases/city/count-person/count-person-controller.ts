import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { CountPersonUseCase } from './count-person-use-case'

class CountPersonController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { 
      search
    } = request.body

    const countPersonUseCase = container.resolve(CountPersonUseCase)

    const personsCount = await countPersonUseCase.execute({
      search: search as string
    })

    return response.status(personsCount.statusCode).json(personsCount)
  }
}

export { CountPersonController }
