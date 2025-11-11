// src/context/AuthContext.tsx
import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";

export type Role = "aluno" | "professor" | "parceiro" | "admin";

export interface AuthUser {
  nome: string;
  email: string;
  role: Role;
  backendId: number;
  token: string;
}

interface AuthContextType {
  user: AuthUser | null;
  login: (user: AuthUser) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem("auth_user");
    if (stored) {
      try {
        const parsed = JSON.parse(stored) as AuthUser;
        setUser(parsed);
      } catch {
        localStorage.removeItem("auth_user");
      }
    }
  }, []);

  const login = (u: AuthUser) => {
    setUser(u);
    localStorage.setItem("auth_user", JSON.stringify(u));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("auth_user");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth deve ser usado dentro de AuthProvider");
  }
  return ctx;
}
