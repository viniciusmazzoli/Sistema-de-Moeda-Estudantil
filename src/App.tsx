// src/App.tsx
import { Routes, Route } from "react-router-dom";
import RoleSelectionPage from "./pages/RoleSelectionPage";
import LoginPage from "./pages/LoginPage";
import StudentDashboard from "./pages/StudentDashboard";
import ProfessorDashboard from "./pages/ProfessorDashboard";
import PartnerDashboard from "./pages/PartnerDashboard";
import RegisterPage from "./pages/RegisterPage";
import AdminDashboard from "./pages/AdminDashboard";

function App() {
  return (
    <Routes>
      {/* Página inicial: escolha do tipo de usuário */}
      <Route path="/" element={<RoleSelectionPage />} />

      {/* Login para cada tipo de usuário */}
      <Route path="/login/:role" element={<LoginPage />} />

      {/* Cadastro para cada tipo de usuário (exceto admin) */}
      <Route path="/cadastro/:role" element={<RegisterPage />} />

      {/* Dashboards */}
      <Route path="/aluno" element={<StudentDashboard />} />
      <Route path="/professor" element={<ProfessorDashboard />} />
      <Route path="/parceiro" element={<PartnerDashboard />} />
      <Route path="/admin" element={<AdminDashboard />} />

      {/* Rota coringa */}
      <Route path="*" element={<RoleSelectionPage />} />
    </Routes>
  );
}

export default App;
