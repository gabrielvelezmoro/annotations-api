import { Request, Response } from "express";
import { container } from "tsyringe";
import { UpdateAnotacaoUseCase } from "./update-anotacao-use-case";

class UpdateAnotacaoController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id, idPessoa, descricao, titulo } = request.body;

    const updateAnotacaoUseCase = container.resolve(UpdateAnotacaoUseCase);

    const result = await updateAnotacaoUseCase
      .execute({
        id,
        idPessoa,
        descricao,
        titulo,
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

export { UpdateAnotacaoController };
