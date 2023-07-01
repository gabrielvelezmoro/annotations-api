import { inject, injectable } from "tsyringe";
import { IAnotacaoRepository } from "@modules/operation/repositories/i-anotacao-repository";
import { HttpResponse } from "@shared/helpers";

interface IRequest {
  search: string;
  page: number;
  rowsPerPage: number;
  columnOrder: Array<"ASC" | "DESC">;
}

@injectable()
class ListAnotacaoUseCase {
  constructor(
    @inject("AnotacaoRepository")
    private anotacaoRepository: IAnotacaoRepository
  ) {}

  async execute({
    search,
    page,
    rowsPerPage,
    columnOrder,
  }: IRequest): Promise<HttpResponse> {
    const anotacaos = await this.anotacaoRepository.list(
      search,
      page,
      rowsPerPage,
      columnOrder
    );

    return anotacaos;
  }
}

export { ListAnotacaoUseCase };
