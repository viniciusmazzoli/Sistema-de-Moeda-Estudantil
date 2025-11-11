// src/pages/RegisterPage.tsx
import { FormEvent, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Modal from "../components/Modal";
import { useToast } from "../context/ToastContext";

type Role = "aluno" | "professor" | "parceiro";

const roleLabel: Record<Role, string> = {
  aluno: "Aluno",
  professor: "Professor",
  parceiro: "Empresa Parceira",
};

// mapeia role do front para enum do backend
const backendRoleMap: Record<Role, string> = {
  aluno: "ALUNO",
  professor: "PROFESSOR",
  parceiro: "PARCEIRO",
};

export default function RegisterPage() {
  const { role } = useParams<{ role: Role }>();
  const navigate = useNavigate();
  const { showToast } = useToast();

  if (!role || !roleLabel[role]) {
    return <div>Perfil inválido. Volte à página inicial.</div>;
  }

  // Campos comuns
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");

  // Senha
  const [senha, setSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");

  // Aluno
  const [cpf, setCpf] = useState("");
  const [rg, setRg] = useState("");
  const [endereco, setEndereco] = useState("");
  const [instituicao, setInstituicao] = useState("");
  const [curso, setCurso] = useState("");

  // Professor
  const [departamento, setDepartamento] = useState("");

  // Parceiro
  const [cnpj, setCnpj] = useState("");
  const [contato, setContato] = useState("");

  const [confirmOpen, setConfirmOpen] = useState(false);
  const [carregando, setCarregando] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (!nome.trim() || !email.trim()) {
      showToast("Preencha pelo menos nome e e-mail.", "error");
      return;
    }

    if (!senha.trim() || !confirmarSenha.trim()) {
      showToast("Preencha a senha e a confirmação de senha.", "error");
      return;
    }

    if (senha !== confirmarSenha) {
      showToast("As senhas não conferem.", "error");
      return;
    }

    // Valida específicos simples
    if (role === "aluno") {
      if (!cpf.trim() || !instituicao.trim() || !curso.trim()) {
        showToast("Preencha CPF, instituição e curso para aluno.", "error");
        return;
      }
    }

    if (role === "professor") {
      if (!cpf.trim() || !instituicao.trim() || !departamento.trim()) {
        showToast(
          "Preencha CPF, instituição e departamento para professor.",
          "error"
        );
        return;
      }
    }

    if (role === "parceiro") {
      if (!cnpj.trim()) {
        showToast("Preencha o CNPJ para empresa parceira.", "error");
        return;
      }
    }

    setConfirmOpen(true);
  };

  const handleConfirmCadastro = async () => {
    setConfirmOpen(false);
    setCarregando(true);
    try {
      const resp = await fetch("http://localhost:3333/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: nome,
          email,
          password: senha,
          role: backendRoleMap[role],
          // campos extras vão como opcional; o backend pode passar a usá-los depois
          cpf,
          rg,
          address: endereco,
          institution: instituicao,
          course: curso,
          department: departamento,
          cnpj,
          contactName: contato,
        }),
      });

      const data = await resp.json();

      if (!resp.ok) {
        console.error("Erro em /auth/register:", data);
        showToast(data.error || "Erro ao realizar cadastro.", "error");
        return;
      }

      showToast("Cadastro realizado com sucesso! Agora faça login.", "success");
      navigate(`/login/${role}`);
    } catch (err) {
      console.error(err);
      showToast("Erro inesperado ao realizar cadastro.", "error");
    } finally {
      setCarregando(false);
    }
  };

  return (
    <div className="center-page">
      <div className="auth-card">
        <h1>Cadastro – {roleLabel[role]}</h1>

        <form className="auth-form" onSubmit={handleSubmit}>
          <label>
            Nome
            <input
              type="text"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              required
            />
          </label>

          <label>
            E-mail
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </label>

          <label>
            Senha
            <input
              type="password"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              required
            />
          </label>

          <label>
            Confirmar senha
            <input
              type="password"
              value={confirmarSenha}
              onChange={(e) => setConfirmarSenha(e.target.value)}
              required
            />
          </label>

          {role === "aluno" && (
            <>
              <label>
                CPF
                <input
                  type="text"
                  value={cpf}
                  onChange={(e) => setCpf(e.target.value)}
                />
              </label>

              <label>
                RG
                <input
                  type="text"
                  value={rg}
                  onChange={(e) => setRg(e.target.value)}
                />
              </label>

              <label>
                Endereço
                <input
                  type="text"
                  value={endereco}
                  onChange={(e) => setEndereco(e.target.value)}
                />
              </label>

              <label>
                Instituição de Ensino
                <input
                  type="text"
                  value={instituicao}
                  onChange={(e) => setInstituicao(e.target.value)}
                />
              </label>

              <label>
                Curso
                <input
                  type="text"
                  value={curso}
                  onChange={(e) => setCurso(e.target.value)}
                />
              </label>
            </>
          )}

          {role === "professor" && (
            <>
              <label>
                CPF
                <input
                  type="text"
                  value={cpf}
                  onChange={(e) => setCpf(e.target.value)}
                />
              </label>

              <label>
                Instituição
                <input
                  type="text"
                  value={instituicao}
                  onChange={(e) => setInstituicao(e.target.value)}
                />
              </label>

              <label>
                Departamento
                <input
                  type="text"
                  value={departamento}
                  onChange={(e) => setDepartamento(e.target.value)}
                />
              </label>
            </>
          )}

          {role === "parceiro" && (
            <>
              <label>
                CNPJ
                <input
                  type="text"
                  value={cnpj}
                  onChange={(e) => setCnpj(e.target.value)}
                />
              </label>

              <label>
                Nome do responsável / contato
                <input
                  type="text"
                  value={contato}
                  onChange={(e) => setContato(e.target.value)}
                />
              </label>

              <label>
                Endereço
                <input
                  type="text"
                  value={endereco}
                  onChange={(e) => setEndereco(e.target.value)}
                />
              </label>
            </>
          )}

          <button type="submit" className="primary-button" disabled={carregando}>
            {carregando ? "Cadastrando..." : "Cadastrar"}
          </button>
        </form>
      </div>

      <Modal
        isOpen={confirmOpen}
        title="Confirmar cadastro"
        onClose={() => setConfirmOpen(false)}
        onConfirm={handleConfirmCadastro}
        confirmText={carregando ? "Aguarde..." : "Confirmar cadastro"}
        cancelText="Voltar e editar"
      >
        <p className="texto-suave">
          Confira os dados antes de confirmar o cadastro:
        </p>
        <ul style={{ fontSize: 14, paddingLeft: 18 }}>
          <li>
            <strong>Nome:</strong> {nome}
          </li>
          <li>
            <strong>E-mail:</strong> {email}
          </li>
          {role === "aluno" && (
            <>
              <li>
                <strong>CPF:</strong> {cpf}
              </li>
              <li>
                <strong>Instituição:</strong> {instituicao}
              </li>
              <li>
                <strong>Curso:</strong> {curso}
              </li>
            </>
          )}
          {role === "professor" && (
            <>
              <li>
                <strong>CPF:</strong> {cpf}
              </li>
              <li>
                <strong>Instituição:</strong> {instituicao}
              </li>
              <li>
                <strong>Departamento:</strong> {departamento}
              </li>
            </>
          )}
          {role === "parceiro" && (
            <>
              <li>
                <strong>CNPJ:</strong> {cnpj}
              </li>
              <li>
                <strong>Contato:</strong> {contato}
              </li>
            </>
          )}
        </ul>
      </Modal>
    </div>
  );
}
