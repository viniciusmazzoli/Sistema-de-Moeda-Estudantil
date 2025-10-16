# Sprint 02 - Modelo ER e Implementação

## Modelo Entidade-Relacionamento (ER)

\`\`\`mermaid
erDiagram
    INSTITUICAO ||--o{ ALUNO : "possui"
    INSTITUICAO ||--o{ PROFESSOR : "possui"
    ALUNO ||--o{ TRANSACAO : "recebe"
    PROFESSOR ||--o{ TRANSACAO : "envia"
    ALUNO ||--o{ RESGATE : "realiza"
    EMPRESA_PARCEIRA ||--o{ VANTAGEM : "oferece"
    VANTAGEM ||--o{ RESGATE : "é_resgatada"
    
    INSTITUICAO {
        uuid id PK
        string nome
        string endereco
        timestamp created_at
    }
    
    ALUNO {
        uuid id PK
        string email UK
        string nome
        string cpf UK
        string rg
        string endereco
        string curso
        decimal saldo_moedas
        uuid instituicao_id FK
        timestamp created_at
    }
    
    PROFESSOR {
        uuid id PK
        string email UK
        string nome
        string cpf UK
        string departamento
        decimal saldo_moedas
        uuid instituicao_id FK
        timestamp created_at
    }
    
    EMPRESA_PARCEIRA {
        uuid id PK
        string email UK
        string nome
        string cnpj UK
        string endereco
        timestamp created_at
    }
    
    TRANSACAO {
        uuid id PK
        decimal valor
        string descricao
        string tipo
        uuid remetente_id FK
        uuid destinatario_id FK
        timestamp created_at
    }
    
    VANTAGEM {
        uuid id PK
        string descricao
        decimal custo_moedas
        string foto_url
        boolean ativa
        uuid empresa_id FK
        timestamp created_at
    }
    
    RESGATE {
        uuid id PK
        string codigo UK
        string status
        uuid aluno_id FK
        uuid vantagem_id FK
        timestamp created_at
    }
\`\`\`

## Estratégia de Acesso ao Banco de Dados

### Padrão Repository + ORM (Supabase Client)

**Vantagens:**
- Abstração do acesso aos dados
- Facilita testes unitários
- Centraliza queries SQL
- Type-safe com TypeScript
- Row Level Security (RLS) integrado

**Estrutura:**
\`\`\`
lib/
  ├── supabase/
  │   ├── client.ts          # Cliente browser
  │   ├── server.ts          # Cliente servidor
  │   └── middleware.ts      # Auth middleware
  ├── repositories/          # Padrão Repository
  │   ├── aluno.repository.ts
  │   ├── professor.repository.ts
  │   ├── empresa.repository.ts
  │   ├── transacao.repository.ts
  │   ├── vantagem.repository.ts
  │   └── resgate.repository.ts
  └── models/                # Tipos TypeScript
      ├── aluno.model.ts
      ├── professor.model.ts
      └── ...
\`\`\`

---

## Implementação Sprint 02

### Entregas:
1. ✅ Scripts SQL para criação das tabelas
2. ✅ Configuração Supabase (client/server)
3. ✅ Repositories para Aluno e Empresa
4. ✅ CRUD de Aluno (front + back)
5. ✅ CRUD de Empresa Parceira (front + back)
6. ✅ Sistema de autenticação básico
