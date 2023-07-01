import { Request, Response } from "express";
import { container } from "tsyringe";
import { DeleteAnotacaoUseCase } from "./delete-anotacao-use-case";
import { ListAnotacaoUseCase } from "../list-anotacao/list-anotacao-use-case";

class DeleteAnotacaoController {
  async handle(request: Request, response: Response): Promise<Response> {
    // delete record

    const id = request.params.id;
    const deleteAnotacaoUseCase = container.resolve(DeleteAnotacaoUseCase);
    await deleteAnotacaoUseCase.execute(id);

    // restore list with updated records

    const listAnotacaoUseCase = container.resolve(ListAnotacaoUseCase);
    const pessoas = await listAnotacaoUseCase.execute({
      search: "",
      page: 0,
      rowsPerPage: 100,
      columnOrder: [],
    });

    return response.json(pessoas);
  }
}

export { DeleteAnotacaoController };
