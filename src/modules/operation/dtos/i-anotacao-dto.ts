interface IAnotacaoDTO {
  id: number
  idPessoa: number
  titulo: string
  descricao?: string
  dataCadastro?: Date
  dataEdicao?: Date
}

export { IAnotacaoDTO }
