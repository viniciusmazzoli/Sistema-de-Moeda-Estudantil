-- Script 003: Dados iniciais (seed)
-- Instituições pré-cadastradas

INSERT INTO instituicoes (nome, endereco) VALUES
    ('Pontifícia Universidade Católica de Minas Gerais', 'Av. Dom José Gaspar, 500 - Coração Eucarístico, Belo Horizonte - MG'),
    ('Universidade Federal de Minas Gerais', 'Av. Pres. Antônio Carlos, 6627 - Pampulha, Belo Horizonte - MG'),
    ('Universidade Federal de São Paulo', 'Rua Botucatu, 740 - Vila Clementino, São Paulo - SP'),
    ('Universidade de São Paulo', 'Av. Prof. Luciano Gualberto, 374 - Butantã, São Paulo - SP'),
    ('Universidade Federal do Rio de Janeiro', 'Av. Pedro Calmon, 550 - Cidade Universitária, Rio de Janeiro - RJ')
ON CONFLICT DO NOTHING;
