import { getRepository, Repository } from 'typeorm'
import { IPessoaDTO } from '@modules/operation/dtos/i-pessoa-dto'
import { IPessoaRepository } from '@modules/operation/repositories/i-pessoa-repository'
import { Pessoa } from '@modules/operation/infra/typeorm/entities/pessoa'
import { noContent, serverError, ok, notFound, HttpResponse } from '@shared/helpers'

class PessoaRepository implements IPessoaRepository {
  private repository: Repository<Pessoa>

  constructor() {
    this.repository = getRepository(Pessoa)
  }


  // create
  async create ({
    nome,
    nomeMae,
    nomePai,
    cep,
    dataNascimento
  }: IPessoaDTO): Promise<HttpResponse> {
    const pessoa = this.repository.create(
    { 
      nome,
      nomeMae,
      nomePai,
      cep,
      dataNascimento}
    )

    const result = await this.repository.save(pessoa)
      .then(pessoaResult => {
        return ok(pessoaResult)
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
      let persons = await this.repository.createQueryBuilder('per')
        .select([
          'per.id',
          'per.nome',
          'per.nomeMae',
          'per.nomePai',
          'per.dataNascimento',
          'per.dataCadastro',
          'per.dataEdicao',
          'per.cep',
        ])
        .where('CAST(nome AS VARCHAR) ilike :search', { search: `%${search}%` })
        .take(rowsPerPage)
        .skip(offset)
        .getMany()

      // below statements are to solve typeorm bug related to use of leftjoins, filters, .take and .skip together

      if (persons.length > rowsPerPage) {
        persons = persons.slice(offset, offset + rowsPerPage)
      }

      //

      return ok(persons)
    } catch (err) {
      return serverError(err)
    }
  }


  // select
  async select (): Promise<HttpResponse> {
    try {
      const persons = await this.repository.createQueryBuilder('per')
        .select([
          'per.id',
          'per.nome',
          'per.nomeMae',
          'per.nomePai',
          'per.cep',
        ])
        .addOrderBy('per.nome')
        .getMany()

      return ok(persons)
    } catch (err) {
      return serverError(err)
    }
  }


  // count
  async count (
    search: string,
  ): Promise<HttpResponse> {
    try {
      const persons = await this.repository.createQueryBuilder('per')
        .select([
          'per.id as "id"',
        ])
        .where('per.nome ilike :search', { search: `%${search}%` })
        .orWhere('per.nomeMae ilike :search', { search: `%${search}%` })
        .orWhere('per.nomePai ilike :search', { search: `%${search}%` })
        .getMany()

      return ok({ count: persons.length })
    } catch (err) {
      return serverError(err)
    }
  }


  // get
  async get (id: string): Promise<HttpResponse> {
    try {
      const person = await this.repository.findOne(id)

      if (typeof person === 'undefined') {
        return noContent()
      }

      return ok(person)
    } catch (err) {
      return serverError(err)
    }
  }


  // update
  async update ({
    id,
    nome,
    nomeMae,
    nomePai,
    cep,
    dataNascimento,
    dataCadastro,
    dataEdicao
  }: IPessoaDTO): Promise<HttpResponse> {
    const pessoa = await this.repository.findOne(id)

    if (!pessoa) {
      return notFound()
    }

    const newPessoa = this.repository.create({
      nome,
      nomeMae,
      nomePai,
      cep,
      dataNascimento,
      dataCadastro,
      dataEdicao
    })

    try {
      await this.repository.update(pessoa,newPessoa)

      return ok(newPessoa)
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

export { PessoaRepository }
