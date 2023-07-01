import { inject, injectable } from "tsyringe";
import { IPessoaRepository } from "@modules/operation/repositories/i-pessoa-repository";
import { HttpResponse } from "@shared/helpers";

@injectable()
class DeletePessoaUseCase {
  constructor(
    @inject("PessoaRepository")
    private pessoaRepository: IPessoaRepository
  ) {}

  async execute(id: string): Promise<HttpResponse> {
    const pessoa = await this.pessoaRepository.delete(id);

    return pessoa;
  }
}

export { DeletePessoaUseCase };
