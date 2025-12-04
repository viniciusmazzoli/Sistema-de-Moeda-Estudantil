// src/context/NotificationContext.tsx
import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import { useAuth } from "./AuthContext";
import { useToast } from "./ToastContext";

interface Notification {
  id: number;
  title: string;
  message: string;
  read: boolean;
  createdAt: string;
}

interface NotificationContextType {
  notifications: Notification[];
  unreadCount: number;
  markAsRead: (id: number) => Promise<void>;
  reload: () => Promise<void>;
}

const NotificationContext = createContext<NotificationContextType | null>(null);

export function NotificationProvider({ children }: { children: ReactNode }) {
  const { user } = useAuth();
  const { showToast } = useToast();
  const [notifications, setNotifications] = useState<Notification[]>([]);

  const loadNotifications = async () => {
    if (!user) {
      setNotifications([]);
      return;
    }

    try {
      const resp = await fetch(
        `http://localhost:3333/notifications/${user.backendId}`
      );
      const data: Notification[] = await resp.json();

      // Notificações ainda não lidas
      const unread = data.filter((n) => !n.read);

      // Dispara toast para cada notificação nova
      unread.forEach((n) => {
        const texto = n.title ? `${n.title}: ${n.message}` : n.message;
        showToast(texto, "info");
      });

      // Marca como lida no frontend
      const atualizadas = data.map((n) =>
        unread.some((u) => u.id === n.id) ? { ...n, read: true } : n
      );
      setNotifications(atualizadas);

      // Marca como lida no backend (não bloqueia a tela)
      if (unread.length > 0) {
        Promise.all(
          unread.map((n) =>
            fetch(`http://localhost:3333/notifications/${n.id}/read`, {
              method: "PATCH",
            })
          )
        ).catch((err) =>
          console.error("Erro ao marcar notificações como lidas:", err)
        );
      }
    } catch (err) {
      console.error("Erro ao carregar notificações:", err);
    }
  };

  useEffect(() => {
    loadNotifications();
  }, [user]);

  const markAsRead = async (id: number) => {
    try {
      await fetch(`http://localhost:3333/notifications/${id}/read`, {
        method: "PATCH",
      });

      setNotifications((prev) =>
        prev.map((n) => (n.id === id ? { ...n, read: true } : n))
      );
    } catch (err) {
      console.error("Erro ao marcar notificação como lida:", err);
    }
  };

  return (
    <NotificationContext.Provider
      value={{
        notifications,
        unreadCount: notifications.filter((n) => !n.read).length,
        markAsRead,
        reload: loadNotifications,
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
}

export function useNotifications() {
  const ctx = useContext(NotificationContext);
  if (!ctx) {
    throw new Error(
      "useNotifications deve ser usado dentro de NotificationProvider"
    );
  }
  return ctx;
}
