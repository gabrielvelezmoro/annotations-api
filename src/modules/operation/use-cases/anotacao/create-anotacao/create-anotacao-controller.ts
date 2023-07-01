import { Request, Response } from "express";
import { container } from "tsyringe";
import { CreateAnotacaoUseCase } from "./create-anotacao-use-case";

class CreateAnotacaoController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { idPessoa, titulo, descricao } = request.body;

    const createAnotacaoUseCase = container.resolve(CreateAnotacaoUseCase);

    const result = await createAnotacaoUseCase
      .execute({
        idPessoa,
        titulo,
        descricao,
      })
      .then((anotacaoResult) => {
        return anotacaoResult;
      })
      .catch((error) => {
        return error;
      });

    return response.status(result.statusCode).json(result);
  }
}

export { CreateAnotacaoController };
