import { inject, injectable } from 'tsyringe'
import { IPessoaRepository } from '@modules/operation/repositories/i-pessoa-repository'
import { HttpResponse } from '@shared/helpers'
import { AxiosRequest } from '@utils/axios'
import {AxiosRequestConfig} from 'axios'
import { AppError } from '@shared/errors/app-error'


interface IRequest {
  nome: string;
  nomeMae: string;
  nomePai?: string;
  cep: string;
  dataNascimento: Date;
}

@injectable()
class UpdatePessoaUseCase {
  constructor(
    @inject('PessoaRepository')
    private pessoaRepository: IPessoaRepository
    ) {}
    
    async execute({
      nome,
      nomeMae,
      nomePai,
      cep,
      dataNascimento,
    }: IRequest): Promise<HttpResponse> {
    const axiosRequest = new AxiosRequest() 
      
    const config: AxiosRequestConfig = {
      baseURL: 'https://viacep.com.br/ws/' + cep + '/json/',
      method: "GET",
    };
    
    try {
      await axiosRequest.execute(config)
    } catch (error) {
      throw new AppError('CEP não localizado', 404)
    }
  

    const person = await this.pessoaRepository.update({
      nome,
      nomeMae,
      nomePai,
      cep,
      dataNascimento,
    })

    return person
  }
}

export { UpdatePessoaUseCase }
