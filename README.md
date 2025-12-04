## 🎓 Sistema de Moeda Estudantil

Um sistema desenvolvido para reconhecer e valorizar o mérito estudantil por meio de uma moeda virtual, distribuída por professores e utilizada por alunos para resgatar produtos e vantagens oferecidas por empresas parceiras.
O projeto segue arquitetura MVC e utiliza tecnologias modernas de desenvolvimento web.

## 🚀 Visão Geral

O sistema permite:

Cadastro de alunos, professores e empresas parceiras

Envio de moedas por professores

Notificações automáticas por e-mail

Visualização de notificações na homepage para usuários notificados

Consulta de extrato de transações

Cadastro de vantagens pelas empresas

Troca de moedas por produtos ou descontos

Geração e envio de cupons com código de confirmação

Autenticação e controle de acesso

## 🛠️ Tecnologias Utilizadas

As principais tecnologias utilizadas no projeto foram:

TypeScript – Tipagem estática e maior segurança no desenvolvimento

JavaScript (ES6+) – Lógica de interface e manipulação de DOM

HTML5 – Estruturação das páginas

CSS3 – Estilização e layout responsivo

No back-end e integração com o banco de dados foram utilizados:

Node.js + Express – Criação da API REST

Prisma ORM – Acesso e modelagem do banco de dados

Nodemailer – Envio de e-mails transacionais

## 🏗️ Arquitetura do Projeto

O projeto foi desenvolvido seguindo o padrão MVC (Model–View–Controller):

Model → Regras de negócio e estruturas de dados

View → Interface do usuário construída com HTML, CSS e JS/TS (React)

Controller → Lógica de aplicação, fluxos de uso e coordenação entre camadas

Essa divisão garante melhor organização, facilidade de manutenção e clareza no fluxo do sistema.

## 📌 Funcionalidades
👨‍🏫 Professores

Podem enviar moedas aos alunos

Registram o motivo do reconhecimento

Consultam extrato e saldo total

Recebem notificações importantes por e-mail

👨‍🎓 Alunos

Realizam cadastro completo

Recebem moedas e são notificados por e-mail

Acessam extrato detalhado

Trocarm moedas por vantagens cadastradas

Recebem cupom de troca com código único

🏢 Empresas Parceiras

Cadastram vantagens contendo título, descrição e foto

Recebem notificação por e-mail quando um cupom é resgatado

Validam o código enviado pelo sistema

✉️ Sistema de Notificações

Os seguintes eventos disparam e-mails automáticos:

Envio de moedas por professores

Recebimento de moedas pelos alunos

Resgate de vantagens

Envio de cupom contendo código gerado pelo sistema

Notificação à empresa parceira para validação

## 📂 Organização do Repositório

O repositório segue esta estrutura geral:

/src
  /routes         # Rotas da API (transactions, rewards, auth, etc.)
  /services       # Serviços (e-mail, notificações, etc.)
  /middleware     # Middlewares (upload, autenticação, etc.)
  /prisma.ts      # Conexão com o banco de dados
  /server.ts      # Servidor Express (API)
  /pages          # Páginas React (RoleSelection, Login, Dashboards)
  /components     # Componentes reutilizáveis (Layout, Card, etc.)
  /contexts       # Contextos (Auth, Toast, Notificações)
  /styles         # Estilização geral

/public
  LogoAcademi.png
  bg-academi.jpg  # Imagem de fundo da tela de seleção de perfil

README.md
package.json
tsconfig.json

## 📈 Processo de Desenvolvimento

Este projeto foi construído ao longo das releases definidas no laboratório:

Release 01 → Modelagem, arquitetura, CRUDs iniciais

Release 02 → Envio de moedas, extratos, vantagens, trocas

Release 03 → Envio de cupons, refatorações e melhorias gerais

## 🧭 6 Instruções para rodar a aplicação

A aplicação é composta por uma API em Node.js/Express (responsável por regras de negócio, banco de dados e envio de e-mails) e uma interface web em React + Vite.

6.1. Pré-requisitos

Node.js 18+

npm (instalado junto com o Node)

Banco de dados configurado conforme o prisma.ts

Acesso a um servidor SMTP (por exemplo, Gmail com senha de app)

6.2. Instalar dependências

No diretório raiz do projeto:

npm install

6.3. Configurar variáveis de ambiente

Crie um arquivo .env na raiz com as configurações da aplicação, por exemplo:

# Porta da API
PORT=3333

# Banco de dados (exemplo usando SQLite / ajuste conforme o seu ambiente)
DATABASE_URL="file:./dev.db"

# SMTP para envio de e-mails
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=seu_email@gmail.com
SMTP_PASS=sua_senha_de_app
SMTP_FROM="Sistema de Mérito Estudantil <seu_email@gmail.com>"


Caso utilize outro provedor de e-mail ou outro banco, basta ajustar os valores acima.

6.4. Preparar o banco de dados

Caso esteja utilizando Prisma, execute as migrations (ou o script equivalente configurado no seu ambiente):

npx prisma migrate dev
# e opcionalmente:
npx prisma generate

6.5. Subir a API (back-end)

Execute o servidor Express responsável por toda a lógica de negócio:

npx ts-node server.ts


ou, se houver script configurado:

npm run api   # exemplo


A API ficará disponível em:

http://localhost:3333

6.6. Subir a interface web (front-end)

Em outro terminal, ainda na raiz do projeto, execute:

npm run dev


O Vite iniciará o servidor de desenvolvimento em:

http://localhost:5173


A aplicação web consumirá a API disponível em http://localhost:3333.

6.7. Resumo rápido

npm install

Criar .env com DATABASE_URL, SMTP_* e PORT

npx prisma migrate dev (se aplicável)

Rodar a API → npx ts-node server.ts

Rodar o front → npm run dev

Acessar em http://localhost:5173

## 👥 Participantes

Vinicius Mazzoli

Matheus Santos

Gabriel Burdgnon

## 🤝 Contribuições

Contribuições são bem-vindas!
Este projeto também faz parte do processo de análise crítica entre grupos, envolvendo:

Sugestões de melhorias

Refatoração de código

Pull requests documentados

## 📜 Licença

Este é um projeto acadêmico. Uso permitido apenas para fins educacionais.
