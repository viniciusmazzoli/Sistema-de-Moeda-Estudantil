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

type StatusFiltro = "TODOS" | "GERADO" | "UTILIZADO";

export default function PartnerDashboard() {
  const { user } = useAuth();

  if (!user || user.role !== "parceiro") {
    return <Navigate to="/" replace />;
  }

  const partnerBackendId = user.backendId;

  const [rewards, setRewards] = useState<Reward[]>([]);
  const [titulo, setTitulo] = useState("");
  const [descricao, setDescricao] = useState("");
  const [custo, setCusto] = useState<number>(10);
  const [imagemUrl, setImagemUrl] = useState("");
  const [carregandoLista, setCarregandoLista] = useState(false);
  const [carregandoCriacao, setCarregandoCriacao] = useState(false);

  // NOVO: validação de cupom + lista de resgates
  const [codigoCupom, setCodigoCupom] = useState("");
  const [validando, setValidando] = useState(false);
  const [redemptions, setRedemptions] = useState<any[]>([]);
  const [filtroStatus, setFiltroStatus] = useState<StatusFiltro>("TODOS");

  // Carrega vantagens do parceiro
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

  // Carrega resgates do parceiro (com filtro por status)
  useEffect(() => {
    if (!partnerBackendId) return;

    const carregarResgates = async () => {
      try {
        const qs = new URLSearchParams();
        qs.set("partnerId", String(partnerBackendId));
        if (filtroStatus !== "TODOS") qs.set("status", filtroStatus);
        const resp = await fetch(
          `http://localhost:3333/rewards/partner/redemptions?${qs.toString()}`
        );
        const data = await resp.json();
        setRedemptions(data);
      } catch (err) {
        console.error("Erro ao carregar resgates:", err);
      }
    };

    carregarResgates();
  }, [partnerBackendId, filtroStatus]);

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
        headers: { "Content-Type": "application/json" },
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

      // adiciona a nova vantagem no topo da lista
      setRewards((prev) => [data, ...prev]);

      // limpa formulário
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

  const handleValidarCupom = async (e: FormEvent) => {
    e.preventDefault();

    const code = codigoCupom.trim().toUpperCase();
    if (!code) {
      alert("Informe o código do cupom.");
      return;
    }

    try {
      setValidando(true);
      const resp = await fetch("http://localhost:3333/rewards/validate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          partnerId: partnerBackendId,
          code,
        }),
      });
      const data = await resp.json();

      if (!resp.ok) {
        alert(data.error || "Erro ao validar cupom.");
        return;
      }

      alert("Cupom validado com sucesso!");
      setCodigoCupom("");

      // refresh da lista de resgates
      const qs = new URLSearchParams();
      qs.set("partnerId", String(partnerBackendId));
      if (filtroStatus !== "TODOS") qs.set("status", filtroStatus);
      const refresh = await fetch(
        `http://localhost:3333/rewards/partner/redemptions?${qs.toString()}`
      );
      setRedemptions(await refresh.json());
    } catch (err) {
      console.error("Erro ao validar cupom:", err);
      alert("Erro inesperado ao validar cupom.");
    } finally {
      setValidando(false);
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

        <Card title="Suas vantagens">
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
                    <p className="vantagem-custo">Custo: {r.cost} moedas</p>
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

      {/* NOVO: Validar Cupom */}
      <Card title="Validar cupom de resgate">
        <form className="form-grid" onSubmit={handleValidarCupom}>
          <label className="full-row">
            Código do cupom
            <input
              type="text"
              value={codigoCupom}
              onChange={(e) => setCodigoCupom(e.target.value)}
              placeholder="Ex: 8F2K1QZL"
            />
          </label>
          <div className="full-row">
            <button type="submit" className="primary-button" disabled={validando}>
              {validando ? "Validando..." : "Validar e marcar como utilizado"}
            </button>
          </div>
          <p className="texto-suave">
            Dica: o código chega por e-mail para o aluno e para o parceiro no momento do resgate.
          </p>
        </form>
      </Card>

      {/* NOVO: Lista de Resgates */}
      <Card title="Resgates do seu estabelecimento">
        <div style={{ marginBottom: 12 }}>
          <label className="texto-suave" style={{ fontSize: 13 }}>
            Filtrar por status:
            <select
              value={filtroStatus}
              onChange={(e) => setFiltroStatus(e.target.value as StatusFiltro)}
              style={{ marginLeft: 8 }}
            >
              <option value="TODOS">Todos</option>
              <option value="GERADO">Gerado</option>
              <option value="UTILIZADO">Utilizado</option>
            </select>
          </label>
        </div>

        {redemptions.length === 0 ? (
          <p className="texto-suave">Nenhum resgate para os filtros atuais.</p>
        ) : (
          <table className="tabela">
            <thead>
              <tr>
                <th>Data</th>
                <th>Aluno</th>
                <th>Vantagem</th>
                <th>Código</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {redemptions.map((r) => (
                <tr key={r.id}>
                  <td>{new Date(r.createdAt).toLocaleString("pt-BR")}</td>
                  <td>{r.student?.name || "-"}</td>
                  <td>{r.reward?.title || "-"}</td>
                  <td>
                    <code>{r.code}</code>
                  </td>
                  <td>
                    <span className="status-pill" style={{ background: "#f3f4f6" }}>
                      <span
                        className="status-dot"
                        style={{
                          backgroundColor:
                            r.status === "UTILIZADO" ? "#16a34a" : "#f59e0b",
                        }}
                      />
                      {r.status === "UTILIZADO" ? "Utilizado" : "Gerado"}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </Card>
    </Layout>
  );
}
