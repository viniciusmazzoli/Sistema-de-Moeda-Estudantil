// src/routes/notificationRoutes.ts
import { Router } from "express";
import {
  getUserNotifications,
  markAsRead,
} from "../services/notificationService";

const router = Router();

/**
 * GET /notifications/:userId
 * Lista notificações de um usuário
 */
router.get("/:userId", async (req, res) => {
  try {
    const userId = Number(req.params.userId);
    if (Number.isNaN(userId)) {
      return res.status(400).json({ error: "userId inválido." });
    }

    const list = await getUserNotifications(userId);
    return res.json(list);
  } catch (error) {
    console.error("Erro em GET /notifications/:userId:", error);
    return res.status(500).json({ error: "Erro ao listar notificações." });
  }
});

/**
 * PATCH /notifications/:id/read
 * Marca notificação como lida
 */
router.patch("/:id/read", async (req, res) => {
  try {
    const id = Number(req.params.id);
    if (Number.isNaN(id)) {
      return res.status(400).json({ error: "id inválido." });
    }

    const updated = await markAsRead(id);
    return res.json(updated);
  } catch (error) {
    console.error("Erro em PATCH /notifications/:id/read:", error);
    return res.status(500).json({ error: "Erro ao marcar notificação como lida." });
  }
});

export default router;