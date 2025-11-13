// src/components/NotificationModal.tsx
import { useNotifications } from "../context/NotificationContext";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export default function NotificationModal({ isOpen, onClose }: Props) {
  const { notifications, markAsRead } = useNotifications();

  if (!isOpen) return null;

  return (
    <div className="notif-overlay">
      <div className="notif-modal">
        <div className="notif-header">
          <h2>Notificações</h2>
          <button className="notif-close" onClick={onClose}>
            ✖
          </button>
        </div>

        {notifications.length === 0 ? (
          <p className="texto-suave">Você não tem notificações no momento.</p>
        ) : (
          <ul className="notif-list">
            {notifications.map((n) => (
              <li
                key={n.id}
                className={`notif-item ${n.read ? "" : "unread"}`}
                onClick={() => markAsRead(n.id)}
              >
                <div className="notif-title-row">
                  <strong>{n.title}</strong>
                  {!n.read && <span className="notif-dot" />}
                </div>
                <p className="notif-message">{n.message}</p>
                <span className="notif-date">
                  {new Date(n.createdAt).toLocaleString("pt-BR")}
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}