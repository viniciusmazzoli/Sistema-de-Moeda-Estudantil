// src/pages/AdminDashboard.tsx
import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import Layout from "../components/Layout";
import Card from "../components/Card";
import Modal from "../components/Modal";
import { useAuth } from "../context/AuthContext";
import { useToast } from "../context/ToastContext";

type RoleEnum = "ALUNO" | "PROFESSOR" | "PARCEIRO" | "ADMIN";
type Aba = "todos" | "alunos" | "professores" | "parceiros";
type StatusFiltro = "todos" | "ativos" | "inativos";

interface UsuarioCadastrado {
  id: number;
  role: RoleEnum;
  name: string;
  email: string;
  cpf?: string | null;
  rg?: string | null;
  address?: string | null;
  institution?: string | null;
  course?: string | null;
  department?: string | null;
  cnpj?: string | null;
  contactName?: string | null;
  createdAt?: string;
  active: boolean;
}

export default function AdminDashboard() {
  const { user } = useAuth();
  const { showToast } = useToast();
  const [usuarios, setUsuarios] = useState<UsuarioCadastrado[]>([]);
  const [loading, setLoading] = useState(false);
  const [erro, setErro] = useState<string | null>(null);

  const [aba, setAba] = useState<Aba>("todos");
  const [busca, setBusca] = useState("");
  const [statusFiltro, setStatusFiltro] = useState<StatusFiltro>("todos");

  // paginação
  const [pagina, setPagina] = useState(1);
  const pageSize = 10;

  // modal de edição
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [userBeingEdited, setUserBeingEdited] =
    useState<UsuarioCadastrado | null>(null);
  const [editNome, setEditNome] = useState("");
  const [editEmail, setEditEmail] = useState("");
  const [editLoading, setEditLoading] = useState(false);

  if (!user || user.role !== "admin") {
    return <Navigate to="/" replace />;
  }

  const carregarUsuarios = async () => {
    try {
      setLoading(true);
      setErro(null);

      const resp = await fetch("http://localhost:3333/users");
      if (!resp.ok) throw new Error(`Erro ${resp.status}`);
      const data = await resp.json();
      setUsuarios(data);
    } catch (e) {
      console.error("Erro ao buscar usuários:", e);
      setErro("Erro ao carregar lista de usuários.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    carregarUsuarios();
  }, []);

  // sempre que mudar filtro, volta pra primeira página
  useEffect(() => {
    setPagina(1);
  }, [aba, busca, statusFiltro]);

  const alunos = usuarios.filter((u) => u.role === "ALUNO");
  const professores = usuarios.filter((u) => u.role === "PROFESSOR");
  const parceiros = usuarios.filter((u) => u.role === "PARCEIRO");
  const totalAtivos = usuarios.filter((u) => u.active).length;

  // filtros (aba + busca + status)
  const filtrados = usuarios.filter((u) => {
    if (aba === "alunos" && u.role !== "ALUNO") return false;
    if (aba === "professores" && u.role !== "PROFESSOR") return false;
    if (aba === "parceiros" && u.role !== "PARCEIRO") return false;

    if (statusFiltro === "ativos" && !u.active) return false;
    if (statusFiltro === "inativos" && u.active) return false;

    const termo = busca.toLowerCase().trim();
    if (!termo) return true;

    return (
      u.name.toLowerCase().includes(termo) ||
      u.email.toLowerCase().includes(termo) ||
      (u.institution || "").toLowerCase().includes(termo) ||
      (u.cnpj || "").toLowerCase().includes(termo)
    );
  });

  // paginação em cima da lista filtrada
  const totalFiltrados = filtrados.length;
  const totalPaginas = Math.max(1, Math.ceil(totalFiltrados / pageSize));
  const paginaAtual = Math.min(pagina, totalPaginas);
  const inicio = (paginaAtual - 1) * pageSize;
  const fim = inicio + pageSize;
  const exibidos = filtrados.slice(inicio, fim);

  async function handleToggleActive(u: UsuarioCadastrado) {
    const novoStatus = !u.active;
    try {
      const resp = await fetch(
        `http://localhost:3333/users/${u.id}/status`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ active: novoStatus }),
        }
      );
      const data = await resp.json();
      if (!resp.ok) {
        console.error(data);
        showToast(
          data.error || "Erro ao atualizar status do usuário.",
          "error"
        );
        return;
      }
      setUsuarios((prev) =>
        prev.map((item) =>
          item.id === u.id ? { ...item, active: data.active } : item
        )
      );
      showToast(
        `Usuário ${novoStatus ? "reativado" : "desativado"} com sucesso.`,
        "success"
      );
    } catch (err) {
      console.error(err);
      showToast("Erro inesperado ao atualizar status.", "error");
    }
  }

  async function handleDelete(u: UsuarioCadastrado) {
    const confirmar = window.confirm(
      `Tem certeza que deseja excluir o usuário "${u.name}"? Essa ação não pode ser desfeita.`
    );
    if (!confirmar) return;

    try {
      const resp = await fetch(`http://localhost:3333/users/${u.id}`, {
        method: "DELETE",
      });
      const data = await resp.json();
      if (!resp.ok) {
        console.error(data);
        showToast(data.error || "Erro ao excluir usuário.", "error");
        return;
      }
      setUsuarios((prev) => prev.filter((item) => item.id !== u.id));
      showToast("Usuário excluído com sucesso.", "success");
    } catch (err) {
      console.error(err);
      showToast("Erro inesperado ao excluir usuário.", "error");
    }
  }

  function abrirModalEdicao(u: UsuarioCadastrado) {
    setUserBeingEdited(u);
    setEditNome(u.name);
    setEditEmail(u.email);
    setEditModalOpen(true);
  }

  async function handleConfirmEdit() {
    if (!userBeingEdited) return;
    if (!editNome.trim() || !editEmail.trim()) {
      showToast("Preencha nome e e-mail.", "error");
      return;
    }

    try {
      setEditLoading(true);
      const resp = await fetch(
        `http://localhost:3333/users/${userBeingEdited.id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: editNome,
            email: editEmail,
          }),
        }
      );
      const data = await resp.json();
      if (!resp.ok) {
        console.error(data);
        showToast(data.error || "Erro ao editar usuário.", "error");
        return;
      }

      setUsuarios((prev) =>
        prev.map((item) =>
          item.id === userBeingEdited.id
            ? { ...item, name: data.name, email: data.email }
            : item
        )
      );

      showToast("Usuário atualizado com sucesso.", "success");
      setEditModalOpen(false);
      setUserBeingEdited(null);
    } catch (err) {
      console.error(err);
      showToast("Erro inesperado ao editar usuário.", "error");
    } finally {
      setEditLoading(false);
    }
  }

  const renderStatus = (u: UsuarioCadastrado) => (
    <span className="status-pill">
      <span
        className="status-dot"
        style={{ backgroundColor: u.active ? "#16a34a" : "#b91c1c" }}
      />
      {u.active ? "Ativo" : "Inativo"}
    </span>
  );

  const tituloTabela =
    aba === "alunos"
      ? "Alunos"
      : aba === "professores"
      ? "Professores"
      : aba === "parceiros"
      ? "Empresas parceiras"
      : "Todos os usuários";

  return (
    <Layout title={`Área Administrativa – ${user.nome}`}>
      <div className="admin-top-row">
        <div>
          <h2 className="admin-title">Painel de usuários</h2>
          <p className="texto-suave">
            Gerencie alunos, professores e parceiros cadastrados no sistema.
          </p>
        </div>
        <div className="admin-actions">
          <input
            className="admin-search-input"
            type="text"
            placeholder="Buscar por nome, e-mail ou instituição..."
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
          />
          <button
            type="button"
            className="secondary-button"
            onClick={carregarUsuarios}
          >
            Atualizar
          </button>
        </div>
      </div>

      <div className="admin-summary-grid">
        <div className="admin-summary-item">
          <span className="admin-summary-label">Total de usuários</span>
          <span className="admin-summary-value">{usuarios.length}</span>
        </div>
        <div className="admin-summary-item">
          <span className="admin-summary-label">Ativos</span>
          <span className="admin-summary-value">{totalAtivos}</span>
        </div>
        <div className="admin-summary-item">
          <span className="admin-summary-label">Alunos</span>
          <span className="admin-summary-value">{alunos.length}</span>
        </div>
        <div className="admin-summary-item">
          <span className="admin-summary-label">Professores</span>
          <span className="admin-summary-value">{professores.length}</span>
        </div>
        <div className="admin-summary-item">
          <span className="admin-summary-label">Parceiros</span>
          <span className="admin-summary-value">{parceiros.length}</span>
        </div>
      </div>

      <Card title="Filtros">
        <div className="admin-filters-row">
          <div className="admin-tabs">
            <button
              className={`admin-tab ${aba === "todos" ? "is-active" : ""}`}
              onClick={() => setAba("todos")}
            >
              Todos
            </button>
            <button
              className={`admin-tab ${aba === "alunos" ? "is-active" : ""}`}
              onClick={() => setAba("alunos")}
            >
              Alunos
            </button>
            <button
              className={`admin-tab ${aba === "professores" ? "is-active" : ""}`}
              onClick={() => setAba("professores")}
            >
              Professores
            </button>
            <button
              className={`admin-tab ${aba === "parceiros" ? "is-active" : ""}`}
              onClick={() => setAba("parceiros")}
            >
              Parceiros
            </button>
          </div>

          <div className="admin-status-filter">
            <label className="texto-suave" style={{ fontSize: 13 }}>
              Status:
              <select
                value={statusFiltro}
                onChange={(e) =>
                  setStatusFiltro(e.target.value as StatusFiltro)
                }
                style={{ marginLeft: 8 }}
              >
                <option value="todos">Todos</option>
                <option value="ativos">Ativos</option>
                <option value="inativos">Inativos</option>
              </select>
            </label>
          </div>
        </div>
      </Card>

      {loading && <p className="texto-suave">Carregando usuários...</p>}
      {erro && (
        <p className="texto-suave" style={{ color: "#b91c1c", marginTop: 8 }}>
          {erro}
        </p>
      )}

      {!loading && (
        <>
          {exibidos.length === 0 ? (
            <Card title={tituloTabela}>
              <p className="texto-suave">
                Nenhum usuário encontrado para os filtros atuais.
              </p>
            </Card>
          ) : (
            <Card title={tituloTabela}>
              <table className="tabela">
                <thead>
                  <tr>
                    <th>Nome</th>
                    <th>E-mail</th>
                    <th>Perfil</th>
                    <th>Instituição / Empresa</th>
                    <th>Info extra</th>
                    <th>Status</th>
                    <th>Ações</th>
                    <th>Criado em</th>
                  </tr>
                </thead>
                <tbody>
                  {exibidos.map((u) => (
                    <tr key={u.id}>
                      <td>{u.name}</td>
                      <td>{u.email}</td>
                      <td>
                        {u.role === "ALUNO"
                          ? "Aluno"
                          : u.role === "PROFESSOR"
                          ? "Professor"
                          : u.role === "PARCEIRO"
                          ? "Parceiro"
                          : "Admin"}
                      </td>
                      <td>
                        {u.role === "PARCEIRO"
                          ? u.address || "-"
                          : u.institution || "-"}
                      </td>
                      <td>
                        {u.role === "ALUNO" && (u.course || "-")}
                        {u.role === "PROFESSOR" && (u.department || "-")}
                        {u.role === "PARCEIRO" && (u.cnpj || "-")}
                        {u.role === "ADMIN" && "-"}
                      </td>
                      <td>{renderStatus(u)}</td>
                      <td>
                        <div className="admin-actions-group">
                          <button
                            className="btn-edit"
                            onClick={() => abrirModalEdicao(u)}
                          >
                            ✏️ Editar
                          </button>
                          <button
                            className="btn-toggle"
                            onClick={() => handleToggleActive(u)}
                          >
                            {u.active ? "⏸ Desativar" : "▶️ Reativar"}
                          </button>
                          <button
                            className="btn-delete"
                            onClick={() => handleDelete(u)}
                          >
                            🗑️ Excluir
                          </button>
                        </div>
                      </td>
                      <td>
                        {u.createdAt
                          ? new Date(u.createdAt).toLocaleString("pt-BR")
                          : "-"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <div className="admin-pagination">
                <span className="texto-suave">
                  Mostrando{" "}
                  {totalFiltrados === 0
                    ? "0"
                    : `${inicio + 1}–${Math.min(fim, totalFiltrados)}`}{" "}
                  de {totalFiltrados} usuários
                </span>
                <div className="admin-pagination-buttons">
                  <button
                    className="secondary-button"
                    disabled={paginaAtual === 1}
                    onClick={() => setPagina((p) => Math.max(1, p - 1))}
                  >
                    Anterior
                  </button>
                  <span className="texto-suave">
                    Página {paginaAtual} de {totalPaginas}
                  </span>
                  <button
                    className="secondary-button"
                    disabled={paginaAtual === totalPaginas}
                    onClick={() =>
                      setPagina((p) => Math.min(totalPaginas, p + 1))
                    }
                  >
                    Próxima
                  </button>
                </div>
              </div>
            </Card>
          )}
        </>
      )}

      {/* Modal de edição */}
      <Modal
        isOpen={editModalOpen}
        title="Editar usuário"
        onClose={() => {
          if (editLoading) return;
          setEditModalOpen(false);
          setUserBeingEdited(null);
        }}
        onConfirm={handleConfirmEdit}
        confirmText={editLoading ? "Salvando..." : "Salvar alterações"}
        cancelText="Cancelar"
      >
        <p className="texto-suave" style={{ marginBottom: 12 }}>
          Ajuste os dados básicos deste usuário.
        </p>

        <div className="auth-form">
          <label>
            Nome
            <input
              type="text"
              value={editNome}
              onChange={(e) => setEditNome(e.target.value)}
            />
          </label>

          <label>
            E-mail
            <input
              type="email"
              value={editEmail}
              onChange={(e) => setEditEmail(e.target.value)}
            />
          </label>
        </div>
      </Modal>
    </Layout>
  );
}
