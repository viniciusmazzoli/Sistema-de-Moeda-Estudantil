# 🎓 Sistema de Moeda Estudantil — Release 3

Um sistema desenvolvido para reconhecer e valorizar o mérito estudantil por meio de uma **moeda virtual**, distribuída por professores e utilizada por alunos para resgatar produtos e vantagens oferecidas por empresas parceiras.  
O projeto segue arquitetura **MVC** e utiliza tecnologias modernas de desenvolvimento web.

---

## 🚀 Visão Geral

O sistema permite:

- Cadastro de **alunos**, **professores** e **empresas parceiras**
- Envio de moedas por professores
- Notificações automáticas por e-mail
- Visualização de notificações na homepage para usuários notificados
- Consulta de extrato de transações
- Cadastro de vantagens pelas empresas
- Troca de moedas por produtos ou descontos
- Geração e envio de cupons com código de confirmação
- Autenticação e controle de acesso

---

## 🛠️ Tecnologias Utilizadas

As principais tecnologias utilizadas no projeto foram:

- **TypeScript** – Tipagem estática e maior segurança no desenvolvimento  
- **JavaScript (ES6+)** – Lógica de interface e manipulação de DOM  
- **HTML5** – Estruturação das páginas  
- **CSS3** – Estilização e layout responsivo

---

## 🏗️ Arquitetura do Projeto

O projeto foi desenvolvido seguindo o padrão **MVC (Model–View–Controller)**:

- **Model** → Regras de negócio e estruturas de dados  
- **View** → Interface do usuário construída com HTML, CSS e JS  
- **Controller** → Lógica de aplicação, fluxos de uso e coordenação entre camadas  

Essa divisão garante melhor organização, facilidade de manutenção e clareza no fluxo do sistema.

---

## 📌 Funcionalidades

### 👨‍🏫 Professores
- Podem enviar moedas aos alunos  
- Registram o motivo do reconhecimento  
- Consultam extrato e saldo total  
- Recebem notificações importantes por e-mail

### 👨‍🎓 Alunos
- Realizam cadastro completo  
- Recebem moedas e são notificados por e-mail  
- Acessam extrato detalhado  
- Trocarm moedas por vantagens cadastradas  
- Recebem cupom de troca com código único

### 🏢 Empresas Parceiras
- Cadastram vantagens contendo título, descrição e foto  
- Recebem notificação por e-mail quando um cupom é resgatado  
- Validam o código enviado pelo sistema

---

## ✉️ Sistema de Notificações

Os seguintes eventos disparam e-mails automáticos:

- Envio de moedas por professores  
- Recebimento de moedas pelos alunos  
- Resgate de vantagens  
- Envio de cupom contendo código gerado pelo sistema  
- Notificação à empresa parceira para validação  

---

## 📂 Organização do Repositório

O repositório segue esta estrutura:

/src
/models
/controllers
/views
/services
/utils
/public
/css
/js
/img
README.md


---

## 📈 Processo de Desenvolvimento

Este projeto foi construído ao longo das releases definidas no laboratório:

- **Release 01** → Modelagem, arquitetura, CRUDs iniciais  
- **Release 02** → Envio de moedas, extratos, vantagens, trocas  
- **Release 03** → Envio de cupons, refatorações e melhorias gerais  

---

## 👥 Participantes

- **Vinicius Mazzoli**  
- **Matheus Santos**  
- **Gabriel Burdgnon**

---

## 🤝 Contribuições

Contribuições são bem-vindas!  
Este projeto também faz parte do processo de análise crítica entre grupos, envolvendo:

- Sugestões de melhorias  
- Refatoração de código  
- Pull requests documentados  

---

## 📜 Licença

Este é um projeto acadêmico. Uso permitido apenas para fins educacionais.

