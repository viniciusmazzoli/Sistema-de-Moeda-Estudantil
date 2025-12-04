// src/pages/ResetPasswordPage.tsx
import { type FormEvent, useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useToast } from "../context/ToastContext";

export default function ResetPasswordPage() {
  const { token } = useParams<{ token: string }>();
  const [senha, setSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");
  const [carregando, setCarregando] = useState(false);
  const { showToast } = useToast();
  const navigate = useNavigate();

  // Usa mesmo fundo
  useEffect(() => {
    document.body.classList.add("login-bg");
    return () => {
      document.body.classList.remove("login-bg");
    };
  }, []);

  if (!token) {
    return <div>Token inválido. Verifique o link enviado no e-mail.</div>;
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!senha.trim() || !confirmarSenha.trim()) {
      showToast("Preencha a senha e a confirmação de senha.", "error");
      return;
    }

    if (senha !== confirmarSenha) {
      showToast("As senhas não conferem.", "error");
      return;
    }

    if (senha.length < 6) {
      showToast("Use uma senha com pelo menos 6 caracteres.", "error");
      return;
    }

    try {
      setCarregando(true);

      const resp = await fetch(
        "http://localhost:3333/auth/reset-password",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ token, password: senha }),
        }
      );

      const data = await resp.json();

      if (!resp.ok) {
        showToast(data.error || "Erro ao redefinir a senha.", "error");
        return;
      }

      showToast("Senha redefinida com sucesso! Faça login novamente.", "success");

      setTimeout(() => {
        navigate("/");
      }, 2000);
    } catch (error) {
      console.error(error);
      showToast(
        "Erro inesperado ao redefinir a senha. Tente novamente.",
        "error"
      );
    } finally {
      setCarregando(false);
    }
  };

  return (
    <div className="center-page">
      <div className="auth-card">
        <h1>Redefinir senha</h1>

        <form onSubmit={handleSubmit} className="auth-form">
          <label>
            Nova senha
            <input
              type="password"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              required
            />
          </label>

          <label>
            Confirmar nova senha
            <input
              type="password"
              value={confirmarSenha}
              onChange={(e) => setConfirmarSenha(e.target.value)}
              required
            />
          </label>

          <button
            type="submit"
            className="primary-button"
            disabled={carregando}
          >
            {carregando ? "Salvando..." : "Redefinir senha"}
          </button>
        </form>
      </div>
    </div>
  );
}
