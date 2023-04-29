import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { CreatePessoaUseCase } from './create-pessoa-use-case'
import { HttpResponse } from '@shared/helpers'

class CreatePessoaController {
  async handle(request: Request, response: Response): Promise<Response> {
    const {
      nome,
      nomeMae,
      nomePai,
      cep,
      dataNascimento,
    } = request.body

    const createPessoaUseCase = container.resolve(CreatePessoaUseCase)

    const result = await createPessoaUseCase.execute({
        nome,
        nomeMae,
        nomePai,
        cep,
        dataNascimento,
      })
      .then(pessoaResult => {
        return pessoaResult
      })
      .catch(error => {
        return error
      })

    return response.status(result.statusCode).json(result)
  }
}

export { CreatePessoaController }
