// src/pages/PartnerDashboard.tsx
import { FormEvent, useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import Layout from "../components/Layout";
import Card from "../components/Card";
import { useAuth } from "../context/AuthContext";

interface Reward {
  id: number;
  title: string;
  description: string;
  cost: number;
  imageUrl?: string | null;
  active: boolean;
  createdAt: string;
}

export default function PartnerDashboard() {
  const { user } = useAuth(); // HOOK 1

  // TODOS os hooks aqui em cima
  const [rewards, setRewards] = useState<Reward[]>([]);
  const [titulo, setTitulo] = useState("");
  const [descricao, setDescricao] = useState("");
  const [custo, setCusto] = useState<number>(10);
  const [imagemUrl, setImagemUrl] = useState("");
  const [carregandoLista, setCarregandoLista] = useState(false);
  const [carregandoCriacao, setCarregandoCriacao] = useState(false);

  const partnerBackendId = user?.backendId;

  useEffect(() => {
    if (!partnerBackendId) return;

    const carregarRewards = async () => {
      try {
        setCarregandoLista(true);
        const resp = await fetch(
          `http://localhost:3333/rewards?partnerId=${partnerBackendId}`
        );
        const data = await resp.json();
        setRewards(data);
      } catch (err) {
        console.error("Erro ao carregar vantagens:", err);
      } finally {
        setCarregandoLista(false);
      }
    };

    carregarRewards();
  }, [partnerBackendId]);

  // SÓ AGORA vêm os returns condicionais

  if (!user || user.role !== "parceiro") {
    return <Navigate to="/" replace />;
  }

  if (!partnerBackendId) {
    return (
      <Layout title="Área da Empresa Parceira">
        <p>
          Este usuário parceiro não está vinculado corretamente ao backend
          (sem <code>backendId</code>).
        </p>
      </Layout>
    );
  }

  const handleCriarVantagem = async (e: FormEvent) => {
    e.preventDefault();

    if (!titulo.trim() || !descricao.trim()) {
      alert("Preencha título e descrição.");
      return;
    }

    if (custo <= 0) {
      alert("O custo deve ser maior que zero.");
      return;
    }

    try {
      setCarregandoCriacao(true);

      const resp = await fetch("http://localhost:3333/rewards", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          partnerId: partnerBackendId,
          title: titulo,
          description: descricao,
          cost: custo,
          imageUrl: imagemUrl || undefined,
        }),
      });

      const data = await resp.json();

      if (!resp.ok) {
        console.error(data);
        alert(data.error || "Erro ao cadastrar vantagem.");
        return;
      }

      setRewards((prev) => [data, ...prev]);

      setTitulo("");
      setDescricao("");
      setCusto(10);
      setImagemUrl("");

      alert("Vantagem cadastrada com sucesso!");
    } catch (err) {
      console.error("Erro ao criar vantagem:", err);
      alert("Erro inesperado ao criar vantagem.");
    } finally {
      setCarregandoCriacao(false);
    }
  };

  return (
    <Layout title={`Área da Empresa – ${user.nome}`}>
      <div className="grid-2">
        <Card title="Cadastrar nova vantagem">
          <form className="form-grid" onSubmit={handleCriarVantagem}>
            <label className="full-row">
              Título da vantagem
              <input
                type="text"
                value={titulo}
                onChange={(e) => setTitulo(e.target.value)}
                placeholder="Ex: 10% de desconto no almoço"
              />
            </label>

            <label className="full-row">
              Descrição
              <textarea
                value={descricao}
                onChange={(e) => setDescricao(e.target.value)}
                rows={3}
                placeholder="Explique rapidamente o benefício e como usar."
              />
            </label>

            <label>
              Custo em moedas
              <input
                type="number"
                min={1}
                value={custo}
                onChange={(e) => setCusto(Number(e.target.value))}
              />
            </label>

            <label>
              URL da imagem (opcional)
              <input
                type="text"
                value={imagemUrl}
                onChange={(e) => setImagemUrl(e.target.value)}
                placeholder="https://exemplo.com/imagem.png"
              />
            </label>

            <div className="full-row">
              <button
                type="submit"
                className="primary-button"
                disabled={carregandoCriacao}
              >
                {carregandoCriacao ? "Salvando..." : "Cadastrar vantagem"}
              </button>
            </div>
          </form>
        </Card>

        <Card title="Resumo das suas vantagens">
          {carregandoLista ? (
            <p className="texto-suave">Carregando vantagens...</p>
          ) : rewards.length === 0 ? (
            <p className="texto-suave">
              Nenhuma vantagem cadastrada ainda. Use o formulário ao lado para
              criar a primeira.
            </p>
          ) : (
            <ul className="lista-vantagens">
              {rewards.map((r) => (
                <li key={r.id} className="vantagem-item">
                  <div>
                    <strong>{r.title}</strong>
                    <p className="texto-suave" style={{ marginTop: 4 }}>
                      {r.description}
                    </p>
                    <p className="vantagem-custo">
                      Custo: {r.cost} moedas
                    </p>
                    <p className="texto-suave">
                      Criada em{" "}
                      {new Date(r.createdAt).toLocaleDateString("pt-BR")}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </Card>
      </div>
    </Layout>
  );
}
