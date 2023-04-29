import { inject, injectable } from 'tsyringe'
import { IPessoaRepository } from '@modules/operation/repositories/i-pessoa-repository'
import { HttpResponse } from '@shared/helpers'
import { AxiosRequest } from '@utils/axios'
import {AxiosRequestConfig} from 'axios'

@injectable()
class GetPessoaUseCase {
  constructor(
    @inject('PessoaRepository')
    private pessoaRepository: IPessoaRepository
  ) {}

  async execute(id: string): Promise<HttpResponse> {
    const pessoa = await this.pessoaRepository.get(id)
    
    const axiosRequest = new AxiosRequest() 
      
    const config: AxiosRequestConfig = {
      baseURL: 'https://viacep.com.br/ws/' + pessoa.data.cep + '/json/',
      method: "GET",
    };
    
    const data = await axiosRequest.execute(config)
    
    pessoa.data.localizacao = data.data
    
    

    return pessoa
  }
}

export { GetPessoaUseCase }
