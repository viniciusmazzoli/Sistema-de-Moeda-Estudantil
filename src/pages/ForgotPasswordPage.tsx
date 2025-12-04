// src/pages/ForgotPasswordPage.tsx
import { FormEvent, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "../context/ToastContext";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [carregando, setCarregando] = useState(false);
  const { showToast } = useToast();
  const navigate = useNavigate();

  // Usa o mesmo fundo do login
  useEffect(() => {
    document.body.classList.add("login-bg");
    return () => {
      document.body.classList.remove("login-bg");
    };
  }, []);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!email.trim()) {
      showToast("Informe o e-mail para recuperação.", "error");
      return;
    }

    try {
      setCarregando(true);

      const resp = await fetch(
        "http://localhost:3333/auth/forgot-password",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email }),
        }
      );

      const data = await resp.json();

      if (!resp.ok) {
        showToast(
          data.error ||
            "Erro ao solicitar recuperação de senha. Tente novamente.",
          "error"
        );
        return;
      }

      showToast(
        "Se este e-mail estiver cadastrado, enviaremos um link de recuperação.",
        "info"
      );

      // Opcional: volta para tela inicial ou login
      setTimeout(() => {
        navigate("/");
      }, 2000);
    } catch (error) {
      console.error(error);
      showToast(
        "Erro inesperado ao solicitar recuperação de senha.",
        "error"
      );
    } finally {
      setCarregando(false);
    }
  };

  return (
    <div className="center-page">
      <div className="auth-card">
        <h1>Esqueci minha senha</h1>

        <p className="texto-suave" style={{ marginBottom: 16 }}>
          Informe o seu e-mail cadastrado. Se encontrarmos uma conta,
          enviaremos um link para redefinição de senha.
        </p>

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

          <button
            type="submit"
            className="primary-button"
            disabled={carregando}
          >
            {carregando ? "Enviando..." : "Enviar link de recuperação"}
          </button>
        </form>
      </div>
    </div>
  );
}
