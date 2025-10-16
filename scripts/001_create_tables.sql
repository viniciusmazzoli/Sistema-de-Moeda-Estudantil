-- Script 001: Criação das tabelas principais
-- Sistema de Moeda Estudantil

-- Tabela de Instituições (pré-cadastradas)
CREATE TABLE IF NOT EXISTS instituicoes (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    nome TEXT NOT NULL,
    endereco TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabela de Alunos
CREATE TABLE IF NOT EXISTS alunos (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    email TEXT UNIQUE NOT NULL,
    nome TEXT NOT NULL,
    cpf TEXT UNIQUE NOT NULL,
    rg TEXT NOT NULL,
    endereco TEXT NOT NULL,
    curso TEXT NOT NULL,
    saldo_moedas DECIMAL(10, 2) DEFAULT 0.00,
    instituicao_id UUID REFERENCES instituicoes(id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabela de Professores
CREATE TABLE IF NOT EXISTS professores (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    email TEXT UNIQUE NOT NULL,
    nome TEXT NOT NULL,
    cpf TEXT UNIQUE NOT NULL,
    departamento TEXT NOT NULL,
    saldo_moedas DECIMAL(10, 2) DEFAULT 1000.00,
    instituicao_id UUID REFERENCES instituicoes(id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabela de Empresas Parceiras
CREATE TABLE IF NOT EXISTS empresas_parceiras (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    email TEXT UNIQUE NOT NULL,
    nome TEXT NOT NULL,
    cnpj TEXT UNIQUE NOT NULL,
    endereco TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabela de Transações
CREATE TABLE IF NOT EXISTS transacoes (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    valor DECIMAL(10, 2) NOT NULL,
    descricao TEXT NOT NULL,
    tipo TEXT NOT NULL CHECK (tipo IN ('envio', 'recebimento', 'resgate')),
    remetente_id UUID,
    destinatario_id UUID,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabela de Vantagens
CREATE TABLE IF NOT EXISTS vantagens (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    descricao TEXT NOT NULL,
    custo_moedas DECIMAL(10, 2) NOT NULL,
    foto_url TEXT,
    ativa BOOLEAN DEFAULT TRUE,
    empresa_id UUID REFERENCES empresas_parceiras(id) ON DELETE CASCADE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabela de Resgates
CREATE TABLE IF NOT EXISTS resgates (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    codigo TEXT UNIQUE NOT NULL,
    status TEXT NOT NULL DEFAULT 'pendente' CHECK (status IN ('pendente', 'utilizado', 'cancelado')),
    aluno_id UUID REFERENCES alunos(id) ON DELETE CASCADE,
    vantagem_id UUID REFERENCES vantagens(id) ON DELETE CASCADE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Índices para melhor performance
CREATE INDEX IF NOT EXISTS idx_alunos_instituicao ON alunos(instituicao_id);
CREATE INDEX IF NOT EXISTS idx_professores_instituicao ON professores(instituicao_id);
CREATE INDEX IF NOT EXISTS idx_vantagens_empresa ON vantagens(empresa_id);
CREATE INDEX IF NOT EXISTS idx_transacoes_remetente ON transacoes(remetente_id);
CREATE INDEX IF NOT EXISTS idx_transacoes_destinatario ON transacoes(destinatario_id);
CREATE INDEX IF NOT EXISTS idx_resgates_aluno ON resgates(aluno_id);
CREATE INDEX IF NOT EXISTS idx_resgates_vantagem ON resgates(vantagem_id);
