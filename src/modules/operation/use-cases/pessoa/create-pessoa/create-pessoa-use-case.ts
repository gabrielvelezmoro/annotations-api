import { inject, injectable } from "tsyringe";
import { Pessoa } from "@modules/operation/infra/typeorm/entities/pessoa";
import { IPessoaRepository } from "@modules/operation/repositories/i-pessoa-repository";
import { AxiosRequest } from "@utils/axios";
import { AxiosRequestConfig } from "axios";
import { AppError } from "@shared/errors/app-error";
interface IRequest {
  nome: string;
  nomeMae: string;
  nomePai?: string;
  cep: string;
  dataNascimento: Date;
}

@injectable()
class CreatePessoaUseCase {
  constructor(
    @inject("PessoaRepository")
    private pessoaRepository: IPessoaRepository
  ) {}

  async execute({
    nome,
    nomeMae,
    nomePai,
    cep,
    dataNascimento,
  }: IRequest): Promise<Pessoa> {
    const axiosRequest = new AxiosRequest();

    const config: AxiosRequestConfig = {
      baseURL: "https://viacep.com.br/ws/" + cep + "/json/",
      method: "GET",
    };

    try {
      await axiosRequest.execute(config);
    } catch (error) {
      throw new AppError("CEP não localizado", 404);
    }
    const result = await this.pessoaRepository
      .create({
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

    return result;
  }
}

export { CreatePessoaUseCase };
