import { Request, Response } from "express";
import { container } from "tsyringe";
import { DeletePessoaUseCase } from "./delete-pessoa-use-case";
import { ListPessoaUseCase } from "../list-pessoa/list-pessoa-use-case";

class DeletePessoaController {
  async handle(request: Request, response: Response): Promise<Response> {
    // delete record

    const id = request.params.id;
    const deletePessoaUseCase = container.resolve(DeletePessoaUseCase);
    await deletePessoaUseCase.execute(id);

    // restore list with updated records

    const listPessoaUseCase = container.resolve(ListPessoaUseCase);
    const pessoas = await listPessoaUseCase.execute({
      search: "",
      page: 0,
      rowsPerPage: 100,
      columnOrder: [],
    });

    return response.json(pessoas);
  }
}

export { DeletePessoaController };
