import { Request, Response } from "express";
import { container } from "tsyringe";
import { UpdatePessoaUseCase } from "./update-pessoa-use-case";

class UpdatePessoaController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { nome, nomeMae, nomePai, cep, dataNascimento } = request.body;

    const updatePessoaUseCase = container.resolve(UpdatePessoaUseCase);

    const result = await updatePessoaUseCase
      .execute({
        nome,
        nomeMae,
        nomePai,
        cep,
        dataNascimento,
      })
      .then((pessoaResult) => {
        return pessoaResult;
      })
      .catch((error) => {
        return error;
      });

    return response.status(result.statusCode).json(result);
  }
}

export { UpdatePessoaController };
