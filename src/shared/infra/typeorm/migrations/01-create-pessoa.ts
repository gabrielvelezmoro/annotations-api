import { MigrationInterface, QueryRunner, Table } from 'typeorm'

export class CreatePessoa1672799344002 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'pessoa',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: "increment"
          },
          {
            name: 'nome',
            type: 'varchar',
            isNullable: false,
            length: "255"
          },
          {
            name: 'nome_mae',
            type: 'varchar',
            isNullable: false,
            length: "255"
          },
          {
            name: 'nome_pai',
            type: 'varchar',
            isNullable: true,
            length: "255"
          },
          {
            name: 'cep',
            type: 'varchar',
            isNullable: false,
            length: "8"
          },
          {
            name: 'data_nascimento',
            type: 'date',
            isNullable: false,
          },
          {
            name: 'data_cadastro',
            type: 'date',
            default: 'now()',
            isNullable: false,
          },
          {
            name: 'data_edicao',
            type: 'date',
            default: 'now()',
            isNullable: false,
          }
        ],
      })
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('pessoa')
  }
}
