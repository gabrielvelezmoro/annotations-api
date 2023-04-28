import { PrimaryColumn, Column, CreateDateColumn, UpdateDateColumn, Entity } from 'typeorm'

@Entity('pessoa')
class Pessoa {
  @PrimaryColumn()
  id?: number

  @Column({ name: 'nome', nullable: false })
  nome?: string

  @Column({ name: 'nome_mae', nullable: false })
  nomeMae?: string

  @Column({ name: 'nome_pai', nullable: true })
  nomePai?: string

  @Column({ name: 'cep', nullable: false })
  cep?: string

  @Column({ name: 'data_nascimento', nullable: false })
  dataNascimento?: Date

  @CreateDateColumn({ name: 'data_cadastro', nullable: false })
  dataCadastro?: Date

  @UpdateDateColumn({ name: 'data_edicao', nullable: false })
  dataEdicao?: Date
}

export { Pessoa }
