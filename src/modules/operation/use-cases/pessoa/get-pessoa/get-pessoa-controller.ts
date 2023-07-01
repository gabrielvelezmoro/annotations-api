import { Request, Response } from "express";
import { container } from "tsyringe";
import { GetPessoaUseCase } from "./get-pessoa-use-case";

class GetPessoaController {
  async handle(request: Request, response: Response): Promise<Response> {
    const id = request.params.id;
    const getPessoaUseCase = container.resolve(GetPessoaUseCase);
    const pessoa = await getPessoaUseCase.execute(id);

    return response.status(pessoa.statusCode).json(pessoa);
  }
}

export { GetPessoaController };
