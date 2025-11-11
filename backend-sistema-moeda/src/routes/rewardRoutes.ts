// src/routes/rewardRoutes.ts
import { Router } from "express";
import { prisma } from "../prisma";
import { sendRewardRedemptionEmails } from "../services/mailService";

const router = Router();

/**
 * POST /rewards
 * Criação de vantagem pelo parceiro
 * Body:
 * {
 *   partnerId: number,
 *   title: string,
 *   description: string,
 *   cost: number,
 *   imageUrl?: string
 * }
 */
router.post("/", async (req, res) => {
  try {
    const { partnerId, title, description, cost, imageUrl } = req.body;

    if (!partnerId || !title || !description || !cost) {
      return res.status(400).json({
        error: "Campos obrigatórios: partnerId, title, description, cost",
      });
    }

    const partner = await prisma.user.findUnique({
      where: { id: Number(partnerId) },
    });

    if (!partner || partner.role !== "PARCEIRO") {
      return res.status(400).json({ error: "Parceiro inválido." });
    }

    const reward = await prisma.reward.create({
      data: {
        partnerId: partner.id,
        title,
        description,
        cost: Number(cost),
        imageUrl: imageUrl || null,
      },
    });

    return res.status(201).json(reward);
  } catch (error) {
    console.error("Erro em POST /rewards:", error);
    return res.status(500).json({ error: "Erro ao criar vantagem." });
  }
});

/**
 * GET /rewards
 * Lista vantagens ativas (opcionalmente filtrando por partnerId)
 * Query:
 *   ?partnerId=10  (opcional)
 */
router.get("/", async (req, res) => {
  try {
    const { partnerId } = req.query;

    const where: any = { active: true };

    if (partnerId) {
      where.partnerId = Number(partnerId);
    }

    const rewards = await prisma.reward.findMany({
      where,
      orderBy: { createdAt: "desc" },
    });

    return res.json(rewards);
  } catch (error) {
    console.error("Erro em GET /rewards:", error);
    return res.status(500).json({ error: "Erro ao listar vantagens." });
  }
});

/**
 * POST /rewards/redeem
 * Resgate de vantagem por aluno
 * Body:
 * {
 *   studentId: number,
 *   rewardId: number
 * }
 */
router.post("/redeem", async (req, res) => {
  try {
    const { studentId, rewardId } = req.body;

    if (!studentId || !rewardId) {
      return res
        .status(400)
        .json({ error: "Campos obrigatórios: studentId e rewardId." });
    }

    const aluno = await prisma.user.findUnique({
      where: { id: Number(studentId) },
      include: { account: true },
    });

    if (!aluno || aluno.role !== "ALUNO") {
      return res.status(400).json({ error: "Aluno inválido para resgate." });
    }

    const reward = await prisma.reward.findUnique({
      where: { id: Number(rewardId) },
      include: { partner: true },
    });

    if (!reward || !reward.active) {
      return res.status(400).json({ error: "Vantagem inválida ou inativa." });
    }

    if (!aluno.account) {
      return res
        .status(400)
        .json({ error: "Conta do aluno não encontrada." });
    }

    if (aluno.account.balance < reward.cost) {
      return res
        .status(400)
        .json({ error: "Saldo insuficiente para resgatar esta vantagem." });
    }

    // gera código único de cupom
    const couponCode = Math.random().toString(36).substring(2, 10).toUpperCase();

    const result = await prisma.$transaction(async (tx) => {
      // debita saldo
      const updatedAccount = await tx.account.update({
        where: { id: aluno.account!.id },
        data: { balance: { decrement: reward.cost } },
      });

      // registra resgate
      const redemption = await tx.redemption.create({
        data: {
          rewardId: reward.id,
          studentId: aluno.id,
          code: couponCode,
          status: "GERADO",
        },
      });

      // registra transação
      const transaction = await tx.transaction.create({
        data: {
          type: "RESGATE_VANTAGEM",
          fromAccountId: aluno.account!.id,
          toAccountId: null,
          amount: reward.cost,
          description: `Resgate da vantagem: ${reward.title}`,
          couponCode,
        },
      });

      return { updatedAccount, redemption, transaction };
    });

    // envia emails (aluno + parceiro), sem quebrar resposta se falhar
    if (aluno.email && reward.partner?.email) {
      sendRewardRedemptionEmails({
        alunoNome: aluno.name,
        alunoEmail: aluno.email,
        partnerNome: reward.partner.name,
        partnerEmail: reward.partner.email,
        rewardTitle: reward.title,
        couponCode,
      }).catch((err) => {
        console.error("Erro ao enviar emails de resgate:", err);
      });
    }

    return res.status(201).json({
      message: "Vantagem resgatada com sucesso.",
      couponCode,
      reward,
      updatedAccount: result.updatedAccount,
      redemption: result.redemption,
      transaction: result.transaction,
    });
  } catch (error) {
    console.error("Erro em POST /rewards/redeem:", error);
    return res.status(500).json({ error: "Erro ao resgatar vantagem." });
  }
});

export default router;
