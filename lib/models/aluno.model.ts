export interface Aluno {
  id: string
  email: string
  nome: string
  cpf: string
  rg: string
  endereco: string
  curso: string
  saldo_moedas: number
  instituicao_id: string
  created_at: string
}

export interface CreateAlunoDTO {
  email: string
  password: string
  nome: string
  cpf: string
  rg: string
  endereco: string
  curso: string
  instituicao_id: string
}

export interface UpdateAlunoDTO {
  nome?: string
  endereco?: string
  curso?: string
}
