// src/components/Modal.tsx
import { ReactNode } from "react";

interface ModalProps {
  isOpen: boolean;
  title?: string;
  children: ReactNode;
  onClose: () => void;
  onConfirm?: () => void;
  confirmText?: string;
  cancelText?: string;
}

export default function Modal({
  isOpen,
  title,
  children,
  onClose,
  onConfirm,
  confirmText = "Confirmar",
  cancelText = "Cancelar",
}: ModalProps) {
  if (!isOpen) return null;

  return (
    <div className="modal-backdrop">
      <div className="modal">
        {title && <h2 className="card-title">{title}</h2>}
        <div>{children}</div>

        <div className="modal-actions">
          <button className="secondary-button" onClick={onClose}>
            {cancelText}
          </button>
          {onConfirm && (
            <button className="primary-button" onClick={onConfirm}>
              {confirmText}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
