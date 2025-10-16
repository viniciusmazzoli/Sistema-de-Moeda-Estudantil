-- Script 002: Row Level Security (RLS)
-- Políticas de segurança para proteger os dados

-- Habilitar RLS em todas as tabelas
ALTER TABLE alunos ENABLE ROW LEVEL SECURITY;
ALTER TABLE professores ENABLE ROW LEVEL SECURITY;
ALTER TABLE empresas_parceiras ENABLE ROW LEVEL SECURITY;
ALTER TABLE transacoes ENABLE ROW LEVEL SECURITY;
ALTER TABLE vantagens ENABLE ROW LEVEL SECURITY;
ALTER TABLE resgates ENABLE ROW LEVEL SECURITY;

-- Políticas para ALUNOS
-- Alunos podem ver e editar apenas seus próprios dados
CREATE POLICY "alunos_select_own" ON alunos
    FOR SELECT USING (auth.uid() = id);

CREATE POLICY "alunos_update_own" ON alunos
    FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "alunos_insert_own" ON alunos
    FOR INSERT WITH CHECK (auth.uid() = id);

-- Políticas para PROFESSORES
-- Professores podem ver e editar apenas seus próprios dados
CREATE POLICY "professores_select_own" ON professores
    FOR SELECT USING (auth.uid() = id);

CREATE POLICY "professores_update_own" ON professores
    FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "professores_insert_own" ON professores
    FOR INSERT WITH CHECK (auth.uid() = id);

-- Professores podem ver dados básicos de alunos da mesma instituição
CREATE POLICY "professores_view_alunos" ON alunos
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM professores
            WHERE professores.id = auth.uid()
            AND professores.instituicao_id = alunos.instituicao_id
        )
    );

-- Políticas para EMPRESAS PARCEIRAS
-- Empresas podem ver e editar apenas seus próprios dados
CREATE POLICY "empresas_select_own" ON empresas_parceiras
    FOR SELECT USING (auth.uid() = id);

CREATE POLICY "empresas_update_own" ON empresas_parceiras
    FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "empresas_insert_own" ON empresas_parceiras
    FOR INSERT WITH CHECK (auth.uid() = id);

-- Políticas para VANTAGENS
-- Empresas podem gerenciar apenas suas próprias vantagens
CREATE POLICY "vantagens_select_own" ON vantagens
    FOR SELECT USING (
        empresa_id IN (
            SELECT id FROM empresas_parceiras WHERE id = auth.uid()
        )
    );

CREATE POLICY "vantagens_insert_own" ON vantagens
    FOR INSERT WITH CHECK (
        empresa_id IN (
            SELECT id FROM empresas_parceiras WHERE id = auth.uid()
        )
    );

CREATE POLICY "vantagens_update_own" ON vantagens
    FOR UPDATE USING (
        empresa_id IN (
            SELECT id FROM empresas_parceiras WHERE id = auth.uid()
        )
    );

CREATE POLICY "vantagens_delete_own" ON vantagens
    FOR DELETE USING (
        empresa_id IN (
            SELECT id FROM empresas_parceiras WHERE id = auth.uid()
        )
    );

-- Alunos podem ver todas as vantagens ativas
CREATE POLICY "alunos_view_vantagens_ativas" ON vantagens
    FOR SELECT USING (
        ativa = TRUE AND
        EXISTS (SELECT 1 FROM alunos WHERE id = auth.uid())
    );

-- Políticas para TRANSAÇÕES
-- Usuários podem ver transações onde são remetente ou destinatário
CREATE POLICY "transacoes_select_own" ON transacoes
    FOR SELECT USING (
        auth.uid() = remetente_id OR auth.uid() = destinatario_id
    );

CREATE POLICY "transacoes_insert" ON transacoes
    FOR INSERT WITH CHECK (
        auth.uid() = remetente_id OR auth.uid() = destinatario_id
    );

-- Políticas para RESGATES
-- Alunos podem ver seus próprios resgates
CREATE POLICY "resgates_select_aluno" ON resgates
    FOR SELECT USING (
        aluno_id IN (SELECT id FROM alunos WHERE id = auth.uid())
    );

-- Empresas podem ver resgates de suas vantagens
CREATE POLICY "resgates_select_empresa" ON resgates
    FOR SELECT USING (
        vantagem_id IN (
            SELECT id FROM vantagens WHERE empresa_id = auth.uid()
        )
    );

CREATE POLICY "resgates_insert_aluno" ON resgates
    FOR INSERT WITH CHECK (
        aluno_id IN (SELECT id FROM alunos WHERE id = auth.uid())
    );

-- Políticas para INSTITUIÇÕES (leitura pública)
ALTER TABLE instituicoes ENABLE ROW LEVEL SECURITY;

CREATE POLICY "instituicoes_select_all" ON instituicoes
    FOR SELECT USING (TRUE);
