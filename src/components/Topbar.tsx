// src/components/Topbar.tsx
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const roleLabelCurto: Record<string, string> = {
  aluno: "Aluno",
  professor: "Professor",
  parceiro: "Parceiro",
  admin: "Administrador",
};

export default function Topbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <header className="topbar">
        <img src="/LogoAcademi.png" alt="Logo" className="logo-homepage" />

      <nav className="topbar-nav">
        <Link to="/">Início</Link>

        {user && (
          <>
            <span style={{ marginLeft: 16, fontSize: 14 }}>
              Logado como <strong>{user.nome}</strong> (
              {roleLabelCurto[user.role] ?? user.role})
            </span>
            <button
              onClick={handleLogout}
              className="secondary-button"
              style={{ marginLeft: 16 }}
            >
              Sair
            </button>
          </>
        )}
      </nav>
    </header>
  );
}
