export interface EmpresaParceira {
  id: string
  email: string
  nome: string
  cnpj: string
  endereco: string
  created_at: string
}

export interface CreateEmpresaDTO {
  email: string
  password: string
  nome: string
  cnpj: string
  endereco: string
}

export interface UpdateEmpresaDTO {
  nome?: string
  endereco?: string
}
