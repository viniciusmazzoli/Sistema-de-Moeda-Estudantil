✅ README estilo GitHub PRO – Pronto para copiar e colar
🎓 Sistema de Moeda Estudantil — Release 3
<div align="center">










</div>
📘 Sobre o Projeto

O Sistema de Mérito Estudantil é uma plataforma completa para reconhecimento do desempenho acadêmico por meio de moedas virtuais, enviadas por professores e trocadas por benefícios oferecidos por empresas parceiras.

O projeto implementa:

Cadastro de usuários (Aluno, Professor, Parceiro, Admin)

Envio de moedas com motivo registrado

Resgate de vantagens com código único

Envio de e-mails automáticos (com imagens)

Validação de cupons por empresas

Controle de saldo e extrato

Upload de imagens e CRUD completo

Autenticação com controle de acesso

Interface web moderna e responsiva

🛠️ Tecnologias Utilizadas
<div style="display: flex; gap: 10px;">
















</div>
🏗️ Arquitetura do Sistema (MVC)
/src
 ├── controllers/      # Lógica de rotas e fluxos
 ├── models/           # Prisma ORM, tabelas e entidades
 ├── services/         # E-mails, regras de negócio, upload
 ├── routes/           # Endpoints agrupados
 ├── middleware/       # Autenticação, upload, validação
 ├── public/           # Interfaces HTML/CSS/JS
 └── prisma/           # Schema e migrações

📌 Funcionalidades Principais
👨‍🏫 Professores
Funcionalidade	Status
Envio de moedas para alunos	✔️
Motivo detalhado	✔️
Extrato de transações	✔️
Notificações por e-mail	✔️
👨‍🎓 Alunos
Funcionalidade	Status
Receber moedas	✔️
Extrato e saldo	✔️
Resgatar vantagens	✔️
Receber cupom por e-mail (com imagem)	✔️
🏢 Parceiros
Funcionalidade	Status
Cadastro de vantagens	✔️
Upload de imagem	✔️
Validação de cupons	✔️
Notificação automática	✔️
📨 Sistema de Notificações Automáticas

O sistema envia e-mails para:

Aluno ao receber moedas

Professor ao enviar moedas

Parceiro e aluno ao resgatar cupom

Parceiro e aluno ao validar cupom

Recuperação de senha

E-mails incluem imagens via CID

🖼️ Exemplos de E-mails Gerados

Cupom com código único

Imagem da vantagem resgatada

Layout responsivo e premium

Notificações profissionais

(acesse /src/services/mailService.ts para visualizar os templates)

📌 Instruções para Rodar o Projeto
1️⃣ Pré-requisitos

Certifique-se de ter instalado:

Node.js 18+

npm ou yarn

PostgreSQL (ou SQLite se configurado)

Prisma CLI

2️⃣ Clone o repositório
git clone https://github.com/seu-repo/sistema-moeda-estudantil.git
cd sistema-moeda-estudantil

3️⃣ Instale as dependências
npm install

4️⃣ Configure o arquivo .env

Crie um arquivo:

DATABASE_URL="postgresql://user:password@localhost:5432/merito"
SMTP_HOST=smtp.seuservidor.com
SMTP_PORT=587
SMTP_USER=seuemail
SMTP_PASS=suasenha
SMTP_FROM="Merito <no-reply@merito.com>"

5️⃣ Execute as migrações do banco
npx prisma migrate dev

6️⃣ Inicie o servidor backend
npm run dev


Servidor rodará em:

http://localhost:3000

7️⃣ Inicie o frontend
npm run dev --prefix frontend


Frontend rodará em:

http://localhost:5173

👥 Participantes

Vinicius Mazzoli

Matheus Santos

Gabriel Burdgnon

🤝 Contribuindo

Pull Requests são bem-vindos.
Sinta-se livre para sugerir melhorias no código, interface ou arquitetura.

📜 Licença

Uso permitido somente para fins educacionais.
