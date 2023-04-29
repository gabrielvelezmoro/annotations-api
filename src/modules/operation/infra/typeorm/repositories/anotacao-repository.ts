import { getRepository, Repository } from 'typeorm'
import { IAnotacaoDTO } from '@modules/operation/dtos/i-anotacao-dto'
import { IAnotacaoRepository } from '@modules/operation/repositories/i-anotacao-repository'
import { Anotacao } from '@modules/operation/infra/typeorm/entities/anotacao'
import { noContent, serverError, ok, notFound, HttpResponse } from '@shared/helpers'

class AnotacaoRepository implements IAnotacaoRepository {
  private repository: Repository<Anotacao>

  constructor() {
    this.repository = getRepository(Anotacao)
  }


  // create
  async create ({
    idPessoa,
    titulo,
    descricao,
  }: IAnotacaoDTO): Promise<HttpResponse> {
    const anotacao = this.repository.create(
    { 
      idPessoa,
      titulo,
      descricao,
      }
    )

    const result = await this.repository.save(anotacao)
      .then(anotacaoResult => {
        return ok(anotacaoResult)
      })
      .catch(error => {
        return serverError(error.message)
      })

    return result
  }


  // list
  async list (
    search: string,
    page: number,
    rowsPerPage: number,
    columnOrder: Array<'ASC' | 'DESC'>
  ): Promise<HttpResponse> {

    if ((typeof columnOrder === 'undefined') || (columnOrder.length === 0)) {
      const sortArray = new Array<'ASC' | 'DESC'>(4).fill('ASC')
      columnOrder = sortArray
    }

    const offset = rowsPerPage * page

    try {
      let anotacoes = await this.repository.createQueryBuilder('nota')
        .select([
          'nota.id',
          'nota.idPessoa',
          'nota.titulo'
        ])
        .where('CAST(titulo AS VARCHAR) ilike :search', { search: `%${search}%` })
        .take(rowsPerPage)
        .skip(offset)
        .getMany()

      // below statements are to solve typeorm bug related to use of leftjoins, filters, .take and .skip together

      if (anotacoes.length > rowsPerPage) {
        anotacoes = anotacoes.slice(offset, offset + rowsPerPage)
      }
      //

      return ok(anotacoes)
    } catch (err) {
      return serverError(err)
    }
  }



  // get
  async get (id: string): Promise<HttpResponse> {
    try {
      const anotacao = await this.repository.findOne(id)

      if (typeof anotacao === 'undefined') {
        return noContent()
      }

      return ok(anotacao)
    } catch (err) {
      return serverError(err)
    }
  }


  // update
  async update ({
    id,
    idPessoa,
    titulo,
    descricao,
    dataCadastro,
    dataEdicao
  }: IAnotacaoDTO): Promise<HttpResponse> {
    const anotacao = await this.repository.findOne(id)

    if (!anotacao) {
      return notFound()
    }

    const newAnotacao = this.repository.create({
      id,
      idPessoa,
      titulo,
      descricao,
      dataCadastro,
      dataEdicao
    })

    try {
      await this.repository.update(anotacao,newAnotacao)

      return ok(newAnotacao)
    } catch (err) {
      return serverError(err)
    }
  }


  // delete
  async delete (id: string): Promise<HttpResponse> {
    await this.repository.delete(id)

    return noContent()
  }
}

export { AnotacaoRepository }
