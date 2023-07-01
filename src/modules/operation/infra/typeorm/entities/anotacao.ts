import {
  PrimaryColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
} from "typeorm";

import { Pessoa } from "./pessoa";

@Entity("anotacao")
class Anotacao {
  @PrimaryColumn()
  id?: number;

  @ManyToOne(() => Pessoa, { nullable: false, eager: true })
  @JoinColumn({ name: "id_pessoa", referencedColumnName: "id" })
  idPessoa?: number;

  @Column({ name: "titulo", nullable: false })
  titulo?: string;

  @Column({ name: "descricao", nullable: true })
  descricao?: string;

  @CreateDateColumn({ name: "data_cadastro", nullable: false })
  dataCadastro?: Date;

  @UpdateDateColumn({ name: "data_edicao", nullable: false })
  dataEdicao?: Date;
}

export { Anotacao };
