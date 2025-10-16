# Sprint 01 - Modelagem do Sistema

## Sistema de Moeda Estudantil

---

## 1. Diagrama de Casos de Uso

### Atores
- **Aluno**: Estudante que recebe e troca moedas
- **Professor**: Docente que distribui moedas aos alunos
- **Empresa Parceira**: Organização que oferece vantagens
- **Sistema**: Gerencia notificações e autenticação

### Casos de Uso

#### Aluno
- UC01: Realizar Cadastro
- UC02: Fazer Login
- UC03: Consultar Extrato
- UC04: Visualizar Vantagens Disponíveis
- UC05: Resgatar Vantagem
- UC06: Receber Notificação de Moedas

#### Professor
- UC07: Fazer Login
- UC08: Enviar Moedas para Aluno
- UC09: Consultar Extrato
- UC10: Visualizar Saldo de Moedas

#### Empresa Parceira
- UC11: Realizar Cadastro
- UC12: Fazer Login
- UC13: Cadastrar Vantagem
- UC14: Visualizar Resgates
- UC15: Receber Notificação de Resgate

\`\`\`mermaid
graph TB
    Aluno((Aluno))
    Professor((Professor))
    Empresa((Empresa<br/>Parceira))
    
    Aluno --> UC01[UC01: Realizar Cadastro]
    Aluno --> UC02[UC02: Fazer Login]
    Aluno --> UC03[UC03: Consultar Extrato]
    Aluno --> UC04[UC04: Visualizar Vantagens]
    Aluno --> UC05[UC05: Resgatar Vantagem]
    
    Professor --> UC07[UC07: Fazer Login]
    Professor --> UC08[UC08: Enviar Moedas]
    Professor --> UC09[UC09: Consultar Extrato]
    Professor --> UC10[UC10: Visualizar Saldo]
    
    Empresa --> UC11[UC11: Realizar Cadastro]
    Empresa --> UC12[UC12: Fazer Login]
    Empresa --> UC13[UC13: Cadastrar Vantagem]
    Empresa --> UC14[UC14: Visualizar Resgates]
\`\`\`

---

## 2. Histórias de Usuário

### Aluno

**US01 - Cadastro de Aluno**
\`\`\`
Como aluno
Quero me cadastrar no sistema
Para poder receber e trocar moedas por vantagens

Critérios de Aceitação:
- Deve informar: nome, email, CPF, RG, endereço, instituição e curso
- A instituição deve ser selecionada de uma lista pré-cadastrada
- Email deve ser único no sistema
- Deve criar login e senha
\`\`\`

**US02 - Receber Moedas**
\`\`\`
Como aluno
Quero receber moedas de professores
Para acumular saldo e trocar por vantagens

Critérios de Aceitação:
- Deve receber notificação por email ao receber moedas
- Deve visualizar o motivo do reconhecimento
- O saldo deve ser atualizado automaticamente
\`\`\`

**US03 - Consultar Extrato**
\`\`\`
Como aluno
Quero consultar meu extrato
Para visualizar meu saldo e histórico de transações

Critérios de Aceitação:
- Deve exibir saldo atual de moedas
- Deve listar todas as transações (recebimentos e resgates)
- Deve mostrar data, valor e descrição de cada transação
\`\`\`

**US04 - Resgatar Vantagem**
\`\`\`
Como aluno
Quero resgatar vantagens com minhas moedas
Para obter descontos e produtos

Critérios de Aceitação:
- Deve ter saldo suficiente para o resgate
- Deve receber email com cupom e código de resgate
- O saldo deve ser debitado automaticamente
- A empresa parceira deve ser notificada
\`\`\`

### Professor

**US05 - Enviar Moedas**
\`\`\`
Como professor
Quero enviar moedas para meus alunos
Para reconhecer bom comportamento e participação

Critérios de Aceitação:
- Deve ter saldo suficiente (1000 moedas/semestre)
- Deve selecionar o aluno destinatário
- Deve informar motivo obrigatório (mensagem)
- O aluno deve ser notificado por email
\`\`\`

**US06 - Consultar Saldo**
\`\`\`
Como professor
Quero consultar meu saldo de moedas
Para saber quantas moedas ainda posso distribuir

Critérios de Aceitação:
- Deve exibir saldo atual
- Deve mostrar histórico de distribuições
- Deve indicar quando receberá novas moedas
\`\`\`

### Empresa Parceira

**US07 - Cadastro de Empresa**
\`\`\`
Como empresa parceira
Quero me cadastrar no sistema
Para oferecer vantagens aos alunos

Critérios de Aceitação:
- Deve informar: nome, CNPJ, endereço, email
- Deve criar login e senha
- Email deve ser único no sistema
\`\`\`

**US08 - Cadastrar Vantagem**
\`\`\`
Como empresa parceira
Quero cadastrar vantagens
Para atrair alunos e promover meus produtos

Critérios de Aceitação:
- Deve informar: descrição, custo em moedas, foto
- Deve poder editar e desativar vantagens
- Vantagens ativas devem aparecer para os alunos
\`\`\`

**US09 - Visualizar Resgates**
\`\`\`
Como empresa parceira
Quero visualizar os resgates realizados
Para controlar as trocas e validar cupons

Critérios de Aceitação:
- Deve receber email com código de resgate
- Deve listar todos os resgates pendentes e concluídos
- Deve poder marcar resgate como utilizado
\`\`\`

---

## 3. Diagrama de Classes

\`\`\`mermaid
classDiagram
    class Usuario {
        <<abstract>>
        #id: UUID
        #email: string
        #senha: string
        #created_at: Date
        +login()
        +logout()
    }
    
    class Aluno {
        -nome: string
        -cpf: string
        -rg: string
        -endereco: string
        -curso: string
        -saldo_moedas: number
        -instituicao_id: UUID
        +consultarExtrato()
        +resgatarVantagem()
        +receberMoedas()
    }
    
    class Professor {
        -nome: string
        -cpf: string
        -departamento: string
        -saldo_moedas: number
        -instituicao_id: UUID
        +enviarMoedas()
        +consultarExtrato()
        +receberMoedasSemestrais()
    }
    
    class EmpresaParceira {
        -nome: string
        -cnpj: string
        -endereco: string
        +cadastrarVantagem()
        +visualizarResgates()
        +editarVantagem()
    }
    
    class Instituicao {
        -id: UUID
        -nome: string
        -endereco: string
        -created_at: Date
    }
    
    class Transacao {
        -id: UUID
        -valor: number
        -descricao: string
        -data: Date
        -tipo: string
        -remetente_id: UUID
        -destinatario_id: UUID
    }
    
    class Vantagem {
        -id: UUID
        -descricao: string
        -custo_moedas: number
        -foto_url: string
        -ativa: boolean
        -empresa_id: UUID
        -created_at: Date
    }
    
    class Resgate {
        -id: UUID
        -codigo: string
        -data_resgate: Date
        -status: string
        -aluno_id: UUID
        -vantagem_id: UUID
    }
    
    Usuario <|-- Aluno
    Usuario <|-- Professor
    Usuario <|-- EmpresaParceira
    
    Aluno "n" --> "1" Instituicao
    Professor "n" --> "1" Instituicao
    
    Professor "1" --> "n" Transacao : envia
    Aluno "1" --> "n" Transacao : recebe
    
    EmpresaParceira "1" --> "n" Vantagem : oferece
    
    Aluno "1" --> "n" Resgate : realiza
    Vantagem "1" --> "n" Resgate : é resgatada
\`\`\`

---

## 4. Diagrama de Componentes (Arquitetura MVC)

\`\`\`mermaid
graph TB
    subgraph "Camada de Apresentação (View)"
        V1[Páginas Next.js]
        V2[Componentes React]
        V3[Formulários]
    end
    
    subgraph "Camada de Controle (Controller)"
        C1[API Routes]
        C2[Server Actions]
        C3[Middleware Auth]
    end
    
    subgraph "Camada de Modelo (Model)"
        M1[Entidades]
        M2[Serviços de Negócio]
        M3[Repositórios]
    end
    
    subgraph "Camada de Dados"
        D1[(Supabase PostgreSQL)]
        D2[Supabase Auth]
        D3[Email Service]
    end
    
    V1 --> C1
    V2 --> C2
    V3 --> C2
    
    C1 --> M2
    C2 --> M2
    C3 --> D2
    
    M2 --> M1
    M2 --> M3
    
    M3 --> D1
    M2 --> D3
    
    style V1 fill:#e1f5ff
    style V2 fill:#e1f5ff
    style V3 fill:#e1f5ff
    style C1 fill:#fff4e1
    style C2 fill:#fff4e1
    style C3 fill:#fff4e1
    style M1 fill:#e8f5e9
    style M2 fill:#e8f5e9
    style M3 fill:#e8f5e9
    style D1 fill:#f3e5f5
    style D2 fill:#f3e5f5
    style D3 fill:#f3e5f5
\`\`\`

### Descrição dos Componentes

#### View (Apresentação)
- **Páginas Next.js**: Rotas da aplicação (aluno, professor, empresa)
- **Componentes React**: UI reutilizável (cards, forms, tables)
- **Formulários**: Inputs e validações

#### Controller (Controle)
- **API Routes**: Endpoints REST para operações CRUD
- **Server Actions**: Ações do servidor para mutações
- **Middleware Auth**: Autenticação e autorização

#### Model (Modelo)
- **Entidades**: Classes de domínio (Aluno, Professor, etc)
- **Serviços de Negócio**: Lógica de negócio (enviar moedas, resgatar)
- **Repositórios**: Acesso aos dados (padrão Repository)

#### Dados
- **Supabase PostgreSQL**: Banco de dados relacional
- **Supabase Auth**: Sistema de autenticação
- **Email Service**: Notificações por email

---

## 5. Requisitos Não Funcionais

### Segurança
- Autenticação obrigatória para todas as operações
- Senhas criptografadas
- Row Level Security (RLS) no banco de dados
- Validação de dados no cliente e servidor

### Performance
- Consultas otimizadas com índices
- Cache de dados frequentes
- Paginação de listas grandes

### Usabilidade
- Interface responsiva (mobile-first)
- Feedback visual de ações
- Mensagens de erro claras

### Manutenibilidade
- Código TypeScript tipado
- Arquitetura MVC bem definida
- Documentação inline
- Testes unitários

---

## Conclusão Sprint 01

A modelagem do Sistema de Moeda Estudantil está completa, incluindo:
- ✅ Diagrama de Casos de Uso (15 casos de uso)
- ✅ Histórias de Usuário (9 histórias principais)
- ✅ Diagrama de Classes (8 classes principais)
- ✅ Diagrama de Componentes (Arquitetura MVC)

**Próximos Passos**: Sprint 02 - Implementação do banco de dados e CRUDs iniciais.
