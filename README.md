# 🎓 Sistema de Moeda Estudantil

Um sistema inovador desenvolvido para **reconhecer e valorizar o mérito estudantil** por meio de uma moeda virtual. Professores distribuem a moeda, e alunos a utilizam para resgatar produtos e vantagens exclusivas oferecidas por empresas parceiras.

O projeto adota a arquitetura **MVC (Model–View–Controller)** e utiliza um conjunto de tecnologias modernas de desenvolvimento web.

---

## 🚀 Visão Geral e Funcionalidades

O sistema oferece uma plataforma completa para a gestão da moeda estudantil, abrangendo as seguintes funcionalidades:

| Módulo | Funcionalidades Principais |
| :--- | :--- |
| **Geral** | Cadastro de alunos, professores e empresas parceiras. Autenticação e controle de acesso. |
| **Transações** | Envio de moedas por professores. Consulta de extrato de transações. |
| **Vantagens** | Cadastro de vantagens pelas empresas. Troca de moedas por produtos ou descontos. |
| **Notificações** | Notificações automáticas por e-mail. Visualização de notificações na homepage. |
| **Resgate** | Geração e envio de cupons com código de confirmação para validação. |

### 📌 Funcionalidades por Perfil

| Perfil | Ações Permitidas |
| :--- | :--- |
| **👨‍🏫 Professores** | Enviar moedas aos alunos, registrar o motivo do reconhecimento, consultar extrato e saldo total, receber notificações importantes por e-mail. |
| **👨‍🎓 Alunos** | Realizar cadastro completo, receber moedas e notificações por e-mail, acessar extrato detalhado, trocar moedas por vantagens cadastradas, receber cupom de troca com código único. |
| **🏢 Empresas Parceiras** | Cadastrar vantagens (título, descrição e foto), receber notificação por e-mail quando um cupom é resgatado, validar o código enviado pelo sistema. |

### ✉️ Sistema de Notificações

O sistema utiliza o **Nodemailer** para disparar e-mails automáticos nos seguintes eventos:
*   Envio de moedas por professores.
*   Recebimento de moedas pelos alunos.
*   Resgate de vantagens.
*   Envio de cupom contendo código gerado pelo sistema.
*   Notificação à empresa parceira para validação.

---

## 🛠️ Tecnologias Utilizadas

O projeto foi construído com foco em performance, segurança e manutenibilidade, utilizando as seguintes tecnologias:

| Categoria | Tecnologia | Propósito |
| :--- | :--- | :--- |
| **Frontend** | **React** + **Vite** | Interface do usuário (View) e servidor de desenvolvimento rápido. |
| | **TypeScript** | Tipagem estática para maior segurança e escalabilidade. |
| | **JavaScript (ES6+)** | Lógica de interface e manipulação de DOM. |
| | **HTML5** / **CSS3** | Estruturação das páginas e estilização responsiva. |
| **Backend** | **Node.js** + **Express** | Criação da API REST (Controller e parte do Model). |
| | **Prisma ORM** | Acesso e modelagem do banco de dados. |
| | **Nodemailer** | Envio de e-mails transacionais. |

---

## 🏗️ Arquitetura do Projeto

O projeto segue o padrão **MVC (Model–View–Controller)** para garantir organização, facilidade de manutenção e clareza no fluxo do sistema:

*   **Model**: Contém as regras de negócio e estruturas de dados.
*   **View**: Interface do usuário, construída com HTML, CSS e React/TypeScript.
*   **Controller**: Lógica de aplicação, fluxos de uso e coordenação entre as camadas.

### 📂 Organização do Repositório

A estrutura geral do repositório é a seguinte:

```
/
├── src/
│   ├── routes/        # Rotas da API (transactions, rewards, auth, etc.)
│   ├── services/      # Serviços (e-mail, notificações, etc.)
│   ├── middleware/    # Middlewares (upload, autenticação, etc.)
│   ├── prisma.ts      # Conexão com o banco de dados
│   └── server.ts      # Servidor Express (API)
├── pages/             # Páginas React (RoleSelection, Login, Dashboards)
├── components/        # Componentes reutilizáveis (Layout, Card, etc.)
├── contexts/          # Contextos (Auth, Toast, Notificações)
├── styles/            # Estilização geral
├── public/
│   ├── LogoAcademi.png
│   └── bg-academi.jpg # Imagem de fundo da tela de seleção de perfil
├── README.md
├── package.json
└── tsconfig.json
```

---

## 🧭 Instruções para Rodar a Aplicação

A aplicação é composta por uma **API em Node.js/Express** (back-end) e uma **interface web em React + Vite** (front-end).

### 1. Pré-requisitos

Certifique-se de ter instalado:
*   **Node.js 18+**
*   **npm** (instalado junto com o Node)
*   Banco de dados configurado (conforme `prisma.ts`)
*   Acesso a um servidor **SMTP** (ex: Gmail com senha de app)

### 2. Instalar Dependências

No diretório raiz do projeto, execute:

```bash
npm install
```

### 3. Configurar Variáveis de Ambiente

Crie um arquivo `.env` na raiz do projeto com as seguintes configurações:

```ini
# Porta da API
PORT=3333

# Banco de dados (exemplo usando SQLite / ajuste conforme seu ambiente)
DATABASE_URL="file:./dev.db"

# SMTP para envio de e-mails
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=seu_email@gmail.com
SMTP_PASS=sua_senha_de_app
SMTP_FROM="Sistema de Mérito Estudantil <seu_email@gmail.com>"
```

> ⚠️ **Ajuste:** Caso utilize outro provedor de e-mail ou outro banco de dados, modifique os valores acima.

### 4. Preparar o Banco de Dados

Se estiver utilizando **Prisma**, execute as migrations para preparar o banco de dados:

```bash
npx prisma migrate dev
# Opcional: npx prisma generate
```

### 5. Subir a API (Back-end)

Execute o servidor Express responsável pela lógica de negócio:

```bash
npx ts-node server.ts
# Ou, se houver script configurado: npm run api
```

A API estará disponível em: `http://localhost:3333`

### 6. Subir a Interface Web (Front-end)

Em um **novo terminal**, ainda na raiz do projeto, execute:

```bash
npm run dev
```

O Vite iniciará o servidor de desenvolvimento em: `http://localhost:5173`

A aplicação web consumirá a API disponível em `http://localhost:3333`.

### Resumo Rápido

```bash
npm install
# Criar .env com DATABASE_URL, SMTP_* e PORT
npx prisma migrate dev
npx ts-node server.ts  # Rodar a API
npm run dev            # Rodar o front
# Acessar em http://localhost:5173
```

---

## 👥 Participantes

*   Vinicius Mazzoli
*   Matheus Santos
*   Gabriel Burdgnon

## 🤝 Contribuições

Contribuições são muito bem-vindas! Este projeto também faz parte de um processo de análise crítica, e aceitamos:
*   Sugestões de melhorias
*   Refatoração de código
*   Pull requests documentados

## 📜 Licença

Este é um **projeto acadêmico**. O uso é permitido apenas para fins educacionais.
