import { MigrationInterface, QueryRunner, Table } from 'typeorm'

export class CreateAnotacao1672799344025 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'anotacao',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: "increment"
          },
          {
            name: 'id_pessoa',
            type: 'int',
            isNullable: false,
          },
          {
            name: 'titulo',
            type: 'varchar',
            isNullable: false,
            length: "255"
          },
          {
            name: 'descricao',
            type: 'varchar',
            isNullable: true,
            length: "2000"
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
        foreignKeys: [
          {
            name: 'FKAnotacaoPessoa',
            referencedTableName: 'pessoa',
            referencedColumnNames: ['id'],
            columnNames: ['id_pessoa'],
            onDelete: 'SET NULL',
            onUpdate: 'SET NULL',
          }
        ],
      })
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('anotacao')
  }
}
