import { ReactNode, useState } from "react";
import Topbar from "./Topbar";
import Modal from "./Modal";
import { useNotifications } from "../context/NotificationContext";

// importar CSS separado
import "../styles/notifications.css";

interface LayoutProps {
  title: string;
  children: ReactNode;
}

export default function Layout({ title, children }: LayoutProps) {
  const { notifications, unreadCount, markAllAsRead } = useNotifications();

  const [notifModal, setNotifModal] = useState(false);

  return (
    <div className="app-container">
      <Topbar />

      {/* 🔔 Sino de notificações */}
      <div className="notification-bell-wrapper">
        <button
          className="notification-bell"
          onClick={() => setNotifModal(true)}
        >
          🔔
          {unreadCount > 0 && (
            <span className="notification-badge">{unreadCount}</span>
          )}
        </button>
      </div>

      <main className="content">
        <h1 className="page-title">{title}</h1>
        {children}
      </main>

      {/* MODAL DE NOTIFICAÇÕES */}
      <Modal
        isOpen={notifModal}
        onClose={() => setNotifModal(false)}
        title="Notificações"
        confirmText="Marcar tudo como lido"
        cancelText="Fechar"
        onConfirm={markAllAsRead}
      >
        {notifications.length === 0 ? (
          <p className="texto-suave">Nenhuma notificação por enquanto.</p>
        ) : (
          <ul className="notif-list">
            {notifications.map((n) => (
              <li
                key={n.id}
                className={`notif-item ${n.read ? "lida" : "nao-lida"}`}
              >
                <p>{n.message}</p>
                <small>
                  {new Date(n.createdAt).toLocaleString("pt-BR")}
                </small>
              </li>
            ))}
          </ul>
        )}
      </Modal>
    </div>
  );
}