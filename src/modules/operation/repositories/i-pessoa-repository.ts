import { IPessoaDTO } from '@modules/operation/dtos/i-pessoa-dto'
import { HttpResponse } from '@shared/helpers'

interface IPessoaRepository {
  // create
  create (data: IPessoaDTO): Promise<HttpResponse> 


  // list
  list (
    search: string,
    page: number,
    rowsPerPage: number,
    columnOrder: ('ASC' | 'DESC')[]
  ): Promise<HttpResponse>


  // select
  select (): Promise<HttpResponse>


  // count
  count (search: string): Promise<HttpResponse>


  // get
  get (id: string): Promise<HttpResponse>


  // update
  update (data: IPessoaDTO): Promise<HttpResponse>


  // delete
  delete (id: string): Promise<HttpResponse>
}

export { IPessoaRepository }
