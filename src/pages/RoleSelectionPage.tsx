// src/pages/RoleSelectionPage.tsx
import { useNavigate } from "react-router-dom";

export default function RoleSelectionPage() {
  const navigate = useNavigate();

  const handleSelectRole = (
    role: "aluno" | "professor" | "parceiro" | "admin"
  ) => {
    navigate(`/login/${role}`);
  };

  return (
    <div className="center-page">
      <div className="role-container">
        <img src="/LogoAcademi.png" alt="Logo da Academia" className="logo" />
        <p>Selecione como deseja acessar:</p>

        <div className="role-grid">
          <button
            className="role-button"
            onClick={() => handleSelectRole("aluno")}
          >
            👨‍🎓 Sou Aluno
          </button>

          <button
            className="role-button"
            onClick={() => handleSelectRole("professor")}
          >
            👩‍🏫 Sou Professor
          </button>

          <button
            className="role-button"
            onClick={() => handleSelectRole("parceiro")}
          >
            🏢 Sou Empresa Parceira
          </button>

          <button
            className="role-button"
            onClick={() => handleSelectRole("admin")}
          >
            🛠️ Sou Administrador
          </button>
        </div>
      </div>
    </div>
  );
}
