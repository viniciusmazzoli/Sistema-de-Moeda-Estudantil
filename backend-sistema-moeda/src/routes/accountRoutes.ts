// src/routes/accountRoutes.ts
import { Router } from "express";
import { prisma } from "../prisma";

const router = Router();

/**
 * GET /accounts/:userId/summary
 * Retorna saldo e extrato (envios/recebimentos) de um usuário
 */
router.get("/:userId/summary", async (req, res) => {
  try {
    const userId = Number(req.params.userId);
    if (isNaN(userId)) {
      return res.status(400).json({ error: "userId inválido" });
    }

    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      return res.status(404).json({ error: "Usuário não encontrado" });
    }

    const account = await prisma.account.findUnique({
      where: { userId },
    });

    if (!account) {
      return res
        .status(404)
        .json({ error: "Conta não encontrada para este usuário" });
    }

    // Transações onde essa conta é origem (envios)
    const sent = await prisma.transaction.findMany({
      where: { fromAccountId: account.id },
      orderBy: { createdAt: "desc" },
    });

    // Transações onde essa conta é destino (recebimentos)
    const received = await prisma.transaction.findMany({
      where: { toAccountId: account.id },
      orderBy: { createdAt: "desc" },
    });

    return res.json({
      user: {
        id: user.id,
        name: user.name,
        role: user.role,
        email: user.email,
      },
      account: {
        id: account.id,
        balance: account.balance,
      },
      sent,
      received,
    });
  } catch (error) {
    console.error("Erro em GET /accounts/:userId/summary:", error);
    return res.status(500).json({ error: "Erro ao buscar extrato" });
  }
});

export default router;
