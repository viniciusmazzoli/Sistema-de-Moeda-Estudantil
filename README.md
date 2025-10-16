# Sistema de Moeda Estudantil

Sistema para estimular o reconhecimento do mérito estudantil através de uma moeda virtual.

## 📋 Sobre o Projeto

Este sistema permite que:
- **Professores** distribuam moedas virtuais para alunos como reconhecimento
- **Alunos** acumulem moedas e troquem por vantagens
- **Empresas Parceiras** ofereçam produtos e descontos

## 🏗️ Arquitetura

- **Framework**: Next.js 15 com App Router
- **Linguagem**: TypeScript
- **Banco de Dados**: Supabase (PostgreSQL)
- **Autenticação**: Supabase Auth
- **Padrão**: MVC (Model-View-Controller)
- **UI**: shadcn/ui + Tailwind CSS v4

## 📁 Estrutura do Projeto

\`\`\`
├── app/                      # Páginas e rotas (View)
│   ├── auth/                 # Autenticação
│   │   ├── login/
│   │   ├── aluno/sign-up/
│   │   └── empresa/sign-up/
│   ├── dashboard/            # Dashboard principal
│   └── page.tsx              # Home
├── lib/                      # Lógica de negócio
│   ├── models/               # Modelos de dados (Model)
│   ├── repositories/         # Acesso aos dados (Model)
│   └── supabase/             # Configuração Supabase
├── scripts/                  # Scripts SQL
│   ├── 001_create_tables.sql
│   ├── 002_row_level_security.sql
│   └── 003_seed_data.sql
└── docs/                     # Documentação
    ├── SPRINT01_MODELAGEM.md
    └── SPRINT02_BANCO_DADOS.md
\`\`\`

## 🚀 Como Executar

### 1. Configurar Banco de Dados

Execute os scripts SQL na ordem:
1. `001_create_tables.sql` - Cria as tabelas
2. `002_row_level_security.sql` - Configura segurança
3. `003_seed_data.sql` - Insere dados iniciais

### 2. Instalar Dependências

\`\`\`bash
npm install
\`\`\`

### 3. Executar o Projeto

\`\`\`bash
npm run dev
\`\`\`

Acesse: `http://localhost:3000`

## 📊 Sprints

### ✅ Sprint 01 - Modelagem
- Diagrama de Casos de Uso
- Histórias de Usuário
- Diagrama de Classes
- Diagrama de Componentes

### ✅ Sprint 02 - Banco de Dados e CRUDs
- Modelo ER
- Scripts SQL com RLS
- Repositories (Padrão Repository)
- CRUD de Aluno (cadastro completo)
- CRUD de Empresa Parceira (cadastro completo)
- Sistema de autenticação

### ⏳ Sprint 03 - Funcionalidades Completas
- Envio de moedas (Professor → Aluno)
- Cadastro de vantagens
- Resgate de vantagens
- Sistema de notificações por email
- Extrato de transações
- Apresentação final

## 🔐 Segurança

- **Row Level Security (RLS)** habilitado em todas as tabelas
- Autenticação obrigatória via Supabase Auth
- Políticas de acesso por tipo de usuário
- Senhas criptografadas

## 🎨 Design

- Interface responsiva (mobile-first)
- Design system com shadcn/ui
- Tema claro/escuro
- Componentes reutilizáveis

## 📝 Documentação

Toda a documentação está na pasta `docs/`:
- `SPRINT01_MODELAGEM.md` - Diagramas e histórias
- `SPRINT02_BANCO_DADOS.md` - Modelo ER e estratégia de dados

## 👥 Tipos de Usuário

1. **Aluno**: Recebe e troca moedas
2. **Professor**: Distribui moedas (1000/semestre)
3. **Empresa Parceira**: Oferece vantagens

## 🛠️ Tecnologias

- Next.js 15
- TypeScript
- Supabase
- Tailwind CSS v4
- shadcn/ui
- Lucide Icons

## 📧 Contato

Projeto desenvolvido para a disciplina de Laboratório de Desenvolvimento de Software.
