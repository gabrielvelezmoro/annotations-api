import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { CountPessoaUseCase } from './count-pessoa-use-case'

class CountPessoaController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { 
      search
    } = request.body

    const countPessoaUseCase = container.resolve(CountPessoaUseCase)

    const pessoasCount = await countPessoaUseCase.execute({
      search: search as string
    })

    return response.status(pessoasCount.statusCode).json(pessoasCount)
  }
}

export { CountPessoaController }
