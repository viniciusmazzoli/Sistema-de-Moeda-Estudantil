# 🪙 Sistema de Moeda Estudantil (Release 2)

# Backlog Consolidado — Sistema de Reconhecimento Acadêmico

| Épico | ID  | História / Funcionalidade | Prioridade | Pontos | Critérios de Aceite (Gherkin) / Observações |
|:------|:----|:---------------------------|:------------|:--------|:---------------------------------------------|
| **A — Autenticação & Contas** |
|  | **A1** | Cadastro de Aluno | Must | 5 | Dado que informo todos os campos obrigatórios válidos, quando confirmo o cadastro, então a conta é criada e recebo e-mail de confirmação.<br>Dado um CPF já cadastrado, quando tento cadastrar, então devo ver erro “CPF já utilizado”. |
|  | **A2** | Selecionar Instituição Pré-Cadastrada | Must | 3 | Dado que a instituição existe, quando a seleciono, então meu perfil fica vinculado a ela.<br>Dado que pesquiso por nome parcial, quando digito, então a lista é filtrada. |
|  | **A3** | Login (Aluno/Professor/Empresa) | Must | 3 | Dado credenciais válidas, quando autentico, então entro e vejo meu dashboard.<br>Dado senha incorreta 5x, quando tento novamente, então a conta é temporariamente bloqueada. |
|  | **A4** | Recuperar Senha | Should | 3 | Dado meu e-mail cadastrado, quando solicito recuperação, então recebo link de redefinição que expira em 30 min. |
|  | **A5** | Cadastro de Empresa Parceira | Must | 5 | Dado CNPJ válido e e-mail único, quando envio cadastro, então recebo confirmação e posso acessar o painel. |
|  | **A6** | Pré-Cadastro de Professores (via Instituição) | Must | 5 | Dado um arquivo válido (CSV), quando importo, então registros são criados, duplicatas reportadas e professores recebem e-mail de primeiro acesso. |
| **B — Moedas & Transações** |
|  | **B1** | Crédito Semestral Automático (1.000 moedas) | Must | 5 | Dado o início de semestre, quando o job executa, então são adicionadas +1000 moedas ao saldo.<br>Dado falha e reexecução, o job é idempotente (sem duplicar crédito). |
|  | **B2** | Enviar Moedas a Aluno | Must | 8 | Dado saldo suficiente, quando informo aluno, valor e motivo, então a transação é concluída e registrada.<br>Dado saldo insuficiente, vejo erro “saldo insuficiente”. |
|  | **B3** | Extrato do Professor | Must | 3 | Dado que acesso extrato, quando aplico filtro por período, então vejo transações (data, aluno, valor, motivo). |
|  | **B4** | Notificar Aluno por E-mail ao Receber Moedas | Must | 3 | Dado recebimento de moedas, quando a transação é confirmada, então recebo e-mail com professor, valor e motivo. |
|  | **B5** | Extrato do Aluno | Must | 3 | Dado que acesso extrato, quando aplico filtros por tipo (recebimento/resgate), então vejo entradas/saídas com detalhes. |
|  | **B6** | Reversão por Erro Operacional | Could | 8 | Dado solicitação aprovada, quando reverter, então o sistema gera transação inversa com trilha de auditoria. |
| **C — Vantagens & Resgates** |
|  | **C1** | Cadastrar Vantagem (Empresa) | Must | 5 | Dado dados válidos, quando salvo, então a vantagem fica ativa e listável.<br>Dado custo ≤ 0, vejo erro de validação. |
|  | **C2** | Listar/Filtrar Vantagens (Aluno) | Should | 3 | Dado que acesso lista, quando filtro por custo máximo, então retorno apenas itens com custo ≤ filtro. |
|  | **C3** | Resgatar Vantagem (Cupom) | Must | 8 | Dado saldo suficiente, quando confirmo resgate, então o saldo é debitado e um código único é gerado.<br>Dado resgate concluído, recebo e-mail com o cupom e instruções. |
|  | **C4** | Notificar Parceiro do Resgate | Must | 3 | Dado resgate concluído, quando enviado, então parceiro recebe e-mail com dados do aluno, vantagem, código e status. |
|  | **C5** | Consultar Resgates (Empresa) | Should | 5 | Dado tela de resgates, quando filtro por período e status, então vejo cupons emitidos com código e data. |
|  | **C6** | Validar Cupom Presencialmente | Should | 5 | Dado código válido e não utilizado, quando confirmo, então muda para “consumido” e registro horário/operador.<br>Dado código já utilizado/expirado, vejo erro e status permanece. |
| **D — Governança & Catálogos** |
|  | **D1** | Gerir Catálogo de Instituições | Must | 3 | Dado que crio/edito instituição, quando salvo, então ela fica disponível no cadastro de aluno. |
|  | **D2** | Vincular Professor à Instituição/Departamento | Must | 3 | Dado professor vinculado, então só pode enviar moedas a alunos da mesma instituição (regra configurável). |
|  | **D3** | Relatórios de Uso | Should | 5 | Dado filtros de período e instituição, quando gero relatório, então vejo métricas (moedas distribuídas, top professores/empresas, vantagens mais resgatadas). |
| **E — Notificações & Operação** |
|  | **E1** | Template de E-mail de Recebimento (Aluno) | Must | 2 | Dado evento de recebimento, quando envio e-mail, então segue template aprovado e é entregue (status 2xx). |
|  | **E2** | Template de E-mail de Cupom (Aluno) e Aviso (Parceiro) | Must | 3 | Dado resgate, quando disparamos e-mails, então ambos contêm código, identificação mínima (LGPD), vantagem e prazo. |
|  | **E3** | Reenvio de E-mail (Operacional) | Could | 3 | Dado resgate/recebimento, quando clico “reenviar”, então histórico registra novo envio e status do provedor. |
| **F — Segurança & Conformidade** |
|  | **F1** | Sessão Segura e Expiração | Must | 2 | Dado 30 min de inatividade, quando tento operar, então preciso logar novamente. |
|  | **F2** | Auditoria de Transações | Should | 5 | Dado transações, quando consulto auditoria, então vejo hash/ID, autor, IP, data/hora e correlação com e-mails enviados. |

---

### Backlog Consolidado (Resumo)
| Prioridade | Itens |
|:------------|:------|
| **Must** | A1, A2, A3, A5, A6, B1, B2, B3, B4, B5, C1, C3, C4, D1, D2, E1, E2, F1 |
| **Should** | A4, C2, C5, C6, D3, F2 |
| **Could** | B6, E3 |
| **Won’t (por enquanto)** | Marketplace externo, app mobile nativo, cashback em dinheiro, multimoeda |

---

### Dependências Principais
| Dependência | Descrição |
|:-------------|:-----------|
| **B2 → A3, A6, B1** | Enviar Moedas depende de Login, Professores e Crédito. |
| **C3 → A3, C1, B5** | Resgatar depende de Login, Vantagem e Saldo do Aluno. |
| **C4/C5/C6 → C3, e-mail** | Notificações e consultas dependem do resgate e do serviço de e-mail. |
| **E1/E2 → B2, C3** | E-mails disparam após eventos de envio de moedas e resgates. |
| **D2 → B2** | Professor precisa estar vinculado para aplicar regras de escopo. |

---

### Requisitos Não Funcionais (NFRs)
- **Segurança:** Hash forte (Argon2/bcrypt), MFA opcional, mínimo de dados pessoais (LGPD).  
- **Disponibilidade:** 99,5% mensal.  
- **Escalabilidade:** Suportar picos de e-mail no início do semestre (job B1).  
- **Performance:** Listagens < 1,5s (95º percentil, 10k transações).  
- **Observabilidade:** Logs estruturados e métricas de jobs (sucesso/falha/reexecução).  
- **Integridade:** Transações atômicas e idempotentes.  
- **Usabilidade:** Acessibilidade AA, mensagens de erro claras.  

---

### Definição de Pronto (DoD)
- Critérios Gherkin atendidos e testados (unitários + integração).  
- Logs e auditoria conforme NFR.  
- Templates de e-mail revisados (jurídico/LGPD) e testados no provedor.  
- Tratamento de erros e mensagens localizadas (pt-BR).  
- Documentação de API e migrações de BD versionadas.

