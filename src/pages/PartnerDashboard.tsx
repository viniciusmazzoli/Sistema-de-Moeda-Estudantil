// src/pages/PartnerDashboard.tsx
import { FormEvent, useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import Layout from "../components/Layout";
import Card from "../components/Card";
import { useAuth } from "../context/AuthContext";
import Modal from "../components/Modal";

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

  // Proteção de rota
  if (!user || user.role !== "parceiro") {
    return <Navigate to="/" replace />;
  }

  const partnerBackendId = user.backendId;

  // --- STATE CADASTRO ---
  const [rewards, setRewards] = useState<Reward[]>([]);
  const [titulo, setTitulo] = useState("");
  const [descricao, setDescricao] = useState("");
  const [custo, setCusto] = useState<number>(10);
  const [imagemArquivo, setImagemArquivo] = useState<File | null>(null);
  const [carregandoLista, setCarregandoLista] = useState(false);
  const [carregandoCriacao, setCarregandoCriacao] = useState(false);

  // --- STATE CUPOM / RESGATES ---
  const [codigoCupom, setCodigoCupom] = useState("");
  const [validando, setValidando] = useState(false);
  const [redemptions, setRedemptions] = useState<any[]>([]);
  const [filtroStatus, setFiltroStatus] = useState<StatusFiltro>("TODOS");

  // --- STATE MODAL EDIÇÃO ---
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editingReward, setEditingReward] = useState<Reward | null>(null);
  const [editTitulo, setEditTitulo] = useState("");
  const [editDescricao, setEditDescricao] = useState("");
  const [editCusto, setEditCusto] = useState<number>(0);
  const [editImagemArquivo, setEditImagemArquivo] = useState<File | null>(null);
  const [salvandoEdicao, setSalvandoEdicao] = useState(false);

  // -------------------------
  // CARREGAR VANTAGENS DO PARCEIRO (ATIVAS + INATIVAS)
  // -------------------------
  useEffect(() => {
    if (!partnerBackendId) return;

    const carregarRewards = async () => {
      try {
        setCarregandoLista(true);
        const resp = await fetch(
          `http://localhost:3333/rewards?partnerId=${partnerBackendId}&includeInactive=true`
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

  // -------------------------
  // CARREGAR RESGATES DO PARCEIRO
  // -------------------------
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

  // -------------------------
  // CADASTRAR VANTAGEM
  // -------------------------
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

      const formData = new FormData();
      formData.append("partnerId", String(partnerBackendId));
      formData.append("title", titulo);
      formData.append("description", descricao);
      formData.append("cost", String(custo));
      if (imagemArquivo) {
        formData.append("image", imagemArquivo);
      }

      const resp = await fetch("http://localhost:3333/rewards", {
        method: "POST",
        body: formData,
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
      setImagemArquivo(null);

      alert("Vantagem cadastrada com sucesso!");
    } catch (err) {
      console.error("Erro ao criar vantagem:", err);
      alert("Erro inesperado ao criar vantagem.");
    } finally {
      setCarregandoCriacao(false);
    }
  };

  // -------------------------
  // VALIDAR CUPOM
  // -------------------------
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

  // -------------------------
  // EXCLUIR VANTAGEM
  // -------------------------
  const handleExcluir = async (id: number) => {
    if (!confirm("Tem certeza que deseja excluir esta vantagem?")) return;

    try {
      const resp = await fetch(`http://localhost:3333/rewards/${id}`, {
        method: "DELETE",
      });

      if (!resp.ok) {
        const data = await resp.json();
        alert(data.error || "Erro ao excluir vantagem.");
        return;
      }

      setRewards((prev) => prev.filter((r) => r.id !== id));
    } catch (err) {
      console.error("Erro ao excluir vantagem:", err);
      alert("Erro inesperado ao excluir vantagem.");
    }
  };

  // -------------------------
  // ATIVAR / INATIVAR VANTAGEM
  // -------------------------
  const handleTrocarStatus = async (reward: Reward) => {
    const novo = !reward.active;

    try {
      const resp = await fetch(
        `http://localhost:3333/rewards/${reward.id}/status`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ active: novo }),
        }
      );

      if (!resp.ok) {
        const data = await resp.json();
        alert(data.error || "Erro ao alterar status da vantagem.");
        return;
      }

      setRewards((prev) =>
        prev.map((r) => (r.id === reward.id ? { ...r, active: novo } : r))
      );
    } catch (err) {
      console.error("Erro ao atualizar status da vantagem:", err);
      alert("Erro inesperado ao atualizar status.");
    }
  };

  // -------------------------
  // ABRIR MODAL DE EDIÇÃO
  // -------------------------
  const handleEditar = (reward: Reward) => {
    setEditingReward(reward);
    setEditTitulo(reward.title);
    setEditDescricao(reward.description);
    setEditCusto(reward.cost);
    setEditImagemArquivo(null);
    setEditModalOpen(true);
  };

  // -------------------------
  // CONFIRMAR EDIÇÃO (MODAL)
  // -------------------------
  const handleConfirmEditar = async () => {
    if (!editingReward) return;

    if (!editTitulo.trim() || !editDescricao.trim()) {
      alert("Preencha título e descrição.");
      return;
    }
    if (editCusto <= 0) {
      alert("O custo deve ser maior que zero.");
      return;
    }

    try {
      setSalvandoEdicao(true);

      const formData = new FormData();
      formData.append("title", editTitulo);
      formData.append("description", editDescricao);
      formData.append("cost", String(editCusto));
      if (editImagemArquivo) {
        formData.append("image", editImagemArquivo);
      }

      const resp = await fetch(
        `http://localhost:3333/rewards/${editingReward.id}`,
        {
          method: "PUT",
          body: formData,
        }
      );

      const data = await resp.json();

      if (!resp.ok) {
        alert(data.error || "Erro ao salvar alteração.");
        return;
      }

      setRewards((prev) =>
        prev.map((r) => (r.id === editingReward.id ? data : r))
      );

      setEditModalOpen(false);
      setEditingReward(null);
    } catch (err) {
      console.error("Erro ao editar vantagem:", err);
      alert("Erro inesperado ao editar vantagem.");
    } finally {
      setSalvandoEdicao(false);
    }
  };

  const handleCloseEditModal = () => {
    setEditModalOpen(false);
    setEditingReward(null);
  };

  // -------------------------
  // RENDER
  // -------------------------
  return (
    <Layout title={`Área da Empresa – ${user.nome}`}>
      <div className="grid-2">
        {/* FORM CADASTRO VANTAGEM */}
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
              Imagem da vantagem (opcional)
              <input
                type="file"
                accept="image/*"
                onChange={(e) =>
                  setImagemArquivo(e.target.files?.[0] || null)
                }
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

        {/* LISTA DE VANTAGENS */}
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

                    {r.imageUrl && (
                      <img
                        src={`http://localhost:3333${r.imageUrl}`}
                        alt="Imagem da vantagem"
                        style={{
                          width: "120px",
                          borderRadius: 8,
                          margin: "6px 0",
                          objectFit: "cover",
                        }}
                      />
                    )}

                    <p className="texto-suave" style={{ marginTop: 4 }}>
                      {r.description}
                    </p>
                    <p className="vantagem-custo">
                      Custo: {r.cost} moedas
                    </p>
                    <p className="texto-suave">
                      Status: {r.active ? "Ativa" : "Inativa"}
                    </p>
                    <p className="texto-suave">
                      Criada em{" "}
                      {new Date(r.createdAt).toLocaleDateString("pt-BR")}
                    </p>
                  </div>

                  <div style={{ display: "flex", gap: 8, marginTop: 10 }}>
                    <button
                      className="button-edit"
                      onClick={() => handleEditar(r)}
                    >
                      ✏️ Editar
                    </button>

                    <button
                      className="button-status"
                      style={{
                        backgroundColor: r.active ? "#f59e0b" : "#16a34a",
                      }}
                      onClick={() => handleTrocarStatus(r)}
                    >
                      {r.active ? "Inativar" : "Ativar"}
                    </button>

                    <button
                      className="button-delete"
                      onClick={() => handleExcluir(r.id)}
                    >
                      🗑️ Excluir
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </Card>
      </div>

      {/* Validar Cupom */}
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
            <button
              type="submit"
              className="primary-button"
              disabled={validando}
            >
              {validando ? "Validando..." : "Validar e marcar como utilizado"}
            </button>
          </div>
          <p className="texto-suave">
            O código chega por e-mail para o aluno.
          </p>
        </form>
      </Card>

      {/* Lista de Resgates */}
      <Card title="Resgates do seu estabelecimento">
        <div style={{ marginBottom: 12 }}>
          <label className="texto-suave" style={{ fontSize: 13 }}>
            Filtrar por status:
            <select
              value={filtroStatus}
              onChange={(e) =>
                setFiltroStatus(e.target.value as StatusFiltro)
              }
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
                    <span
                      className="status-pill"
                      style={{ background: "#f3f4f6" }}
                    >
                      <span
                        className="status-dot"
                        style={{
                          backgroundColor:
                            r.status === "UTILIZADO"
                              ? "#16a34a"
                              : "#f59e0b",
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

      {/* MODAL DE EDIÇÃO */}
      <Modal
        isOpen={editModalOpen}
        title="Editar vantagem"
        onClose={handleCloseEditModal}
        onConfirm={handleConfirmEditar}
        confirmText={salvandoEdicao ? "Salvando..." : "Salvar alterações"}
        cancelText="Cancelar"
      >
        <div className="auth-form">
          <label>
            Título
            <input
              type="text"
              value={editTitulo}
              onChange={(e) => setEditTitulo(e.target.value)}
            />
          </label>

          <label>
            Descrição
            <textarea
              value={editDescricao}
              onChange={(e) => setEditDescricao(e.target.value)}
              rows={3}
            />
          </label>

          <label>
            Custo em moedas
            <input
              type="number"
              min={1}
              value={editCusto}
              onChange={(e) => setEditCusto(Number(e.target.value))}
            />
          </label>

          <label>
            Nova imagem (opcional)
            <input
              type="file"
              accept="image/*"
              onChange={(e) =>
                setEditImagemArquivo(e.target.files?.[0] || null)
              }
            />
          </label>
        </div>
      </Modal>
    </Layout>
  );
}
