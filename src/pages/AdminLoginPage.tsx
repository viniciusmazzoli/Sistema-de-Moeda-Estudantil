// src/pages/AdminLoginPage.tsx
import { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useToast } from "../context/ToastContext";

export default function AdminLoginPage() {
  const { login } = useAuth();
  const { showToast } = useToast();
  const navigate = useNavigate();

  const [usuario, setUsuario] = useState("");
  const [senha, setSenha] = useState("");

  const handleLogin = (e: FormEvent) => {
    e.preventDefault();

    if (usuario === "admin" && senha === "1234") {
      login({ nome: "Administrador", email: "admin@sme.com", role: "admin" });
      showToast("Login realizado com sucesso!", "success");
      navigate("/admin");
    } else {
      showToast("Usuário ou senha inválidos.", "error");
    }
  };

  return (
    <div className="center-page">
      <div className="auth-card">
        <h1>Login Administrativo</h1>
        <form className="auth-form" onSubmit={handleLogin}>
          <label>
            Usuário
            <input
              type="text"
              value={usuario}
              onChange={(e) => setUsuario(e.target.value)}
            />
          </label>
          <label>
            Senha
            <input
              type="password"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
            />
          </label>
          <button type="submit" className="primary-button">
            Entrar
          </button>
        </form>
      </div>
    </div>
  );
}
