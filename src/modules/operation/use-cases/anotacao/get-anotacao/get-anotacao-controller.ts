import { Request, Response } from "express";
import { container } from "tsyringe";
import { GetAnotacaoUseCase } from "./get-anotacao-use-case";

class GetAnotacaoController {
  async handle(request: Request, response: Response): Promise<Response> {
    const id = request.params.id;
    const getAnotacaoUseCase = container.resolve(GetAnotacaoUseCase);
    const pessoa = await getAnotacaoUseCase.execute(id);

    return response.status(pessoa.statusCode).json(pessoa);
  }
}

export { GetAnotacaoController };
