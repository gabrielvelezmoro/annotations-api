import { IAnotacaoDTO } from '@modules/operation/dtos/i-anotacao-dto'
import { HttpResponse } from '@shared/helpers'

interface IAnotacaoRepository {
  // create
  create (data: IAnotacaoDTO): Promise<HttpResponse> 


  // list
  list (
    search: string,
    page: number,
    rowsPerPage: number,
    columnOrder: ('ASC' | 'DESC')[]
  ): Promise<HttpResponse>

  // get
  get (id: string): Promise<HttpResponse>


  // update
  update (data: IAnotacaoDTO): Promise<HttpResponse>


  // delete
  delete (id: string): Promise<HttpResponse>
}

export { IAnotacaoRepository }
