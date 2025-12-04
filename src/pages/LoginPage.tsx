// src/pages/LoginPage.tsx
import { type FormEvent, useState, useEffect } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

type Role = "aluno" | "professor" | "parceiro" | "admin";
type RoleParam = "aluno" | "professor" | "parceiro" | "admin";

const roleLabel: Record<RoleParam, string> = {
  aluno: "Aluno",
  professor: "Professor",
  parceiro: "Empresa Parceira",
  admin: "Administrador",
};

// backend → front
const backendRoleToFront: Record<string, RoleParam> = {
  ALUNO: "aluno",
  PROFESSOR: "professor",
  PARCEIRO: "parceiro",
  ADMIN: "admin",
};

export default function LoginPage() {
  const { role } = useParams<{ role: RoleParam }>();
  const navigate = useNavigate();
  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [carregando, setCarregando] = useState(false);
  const [erro, setErro] = useState<string | null>(null);

  // Aplica o fundo de imagem específico da tela de login
  useEffect(() => {
    document.body.classList.add("login-bg");
    return () => {
      document.body.classList.remove("login-bg");
    };
  }, []);

  if (!role || !roleLabel[role]) {
    return <div>Perfil inválido. Volte à página inicial.</div>;
  }

  const rotaDestinoPorRole = (r: Role): string => {
    switch (r) {
      case "aluno":
        return "/aluno";
      case "professor":
        return "/professor";
      case "parceiro":
        return "/parceiro";
      case "admin":
        return "/admin";
      default:
        return "/";
    }
  };

  const podeCadastrar =
    role === "aluno" || role === "professor" || role === "parceiro";

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setErro(null);

    if (!email.trim() || !senha.trim()) {
      setErro("Informe e-mail e senha.");
      return;
    }

    try {
      setCarregando(true);

      const resp = await fetch("http://localhost:3333/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          password: senha,
        }),
      });

      const data = await resp.json();

      if (!resp.ok) {
        setErro(data.error || "Falha ao fazer login. Verifique os dados.");
        return;
      }

      // data.user.role vem do backend (ALUNO, PROFESSOR, ...)
      const backendRole: string = data.user.role;
      const frontRole = backendRoleToFront[backendRole];

      if (!frontRole) {
        setErro("Tipo de usuário inválido retornado pelo servidor.");
        return;
      }

      // garante que o usuário bate com o perfil da tela atual
      if (frontRole !== role) {
        setErro(
          `Este usuário não pertence ao perfil "${roleLabel[role]}". Tente entrar pela opção correta na tela inicial.`
        );
        return;
      }

      // salva no contexto (incluindo token JWT)
      login({
        nome: data.user.name,
        email: data.user.email,
        role: frontRole,
        backendId: data.user.id,
        token: data.token,
      });

      navigate(rotaDestinoPorRole(frontRole));
    } catch (err) {
      console.error(err);
      setErro("Erro inesperado ao fazer login.");
    } finally {
      setCarregando(false);
    }
  };

  return (
    <div className="center-page">
      <div className="auth-card">
        <h1>Login – {roleLabel[role]}</h1>

        <form onSubmit={handleSubmit} className="auth-form">
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

          <p
            className="texto-suave"
            style={{ fontSize: 14, marginBottom: 8, textAlign: "center" }}
          >
            <Link to="/esqueci-senha">Esqueceu a senha?</Link>
          </p>

          <button
            type="submit"
            className="primary-button"
            disabled={carregando}
          >
            {carregando ? "Entrando..." : "Entrar"}
          </button>
        </form>

        {erro && (
          <p
            className="texto-suave"
            style={{ color: "#b91c1c", marginTop: 8 }}
          >
            {erro}
          </p>
        )}

        {podeCadastrar && (
          <p className="texto-suave" style={{ marginTop: 16 }}>
            Ainda não tem cadastro?{" "}
            <Link to={`/cadastro/${role}`}>Cadastre-se aqui</Link>
          </p>
        )}

        {role === "admin" && (
          <p className="texto-suave" style={{ marginTop: 16 }}>
            *Para acessar como administrador, é preciso já existir um usuário
            ADMIN cadastrado com este e-mail.
          </p>
        )}
      </div>
    </div>
  );
}
