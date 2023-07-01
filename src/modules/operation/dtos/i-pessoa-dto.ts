interface IPessoaDTO {
  id?: number;
  nome: string;
  nomeMae: string;
  nomePai?: string;
  cep: string;
  dataNascimento?: Date;
  dataCadastro?: Date;
  dataEdicao?: Date;
}

export { IPessoaDTO };
