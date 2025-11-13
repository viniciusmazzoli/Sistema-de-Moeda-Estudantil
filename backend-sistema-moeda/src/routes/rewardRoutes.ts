// src/routes/rewardRoutes.ts
import { Router } from "express";
import { prisma } from "../prisma";
import {
  sendRewardRedemptionEmails,
  sendRewardUsedEmails,
} from "../services/mailService";
import { upload } from "../middleware/upload";

const router = Router();

/**
 * POST /rewards
 * Criação de vantagem pelo parceiro
 * Body (multipart/form-data):
 *  - partnerId
 *  - title
 *  - description
 *  - cost
 *  - image (file opcional)
 */
router.post("/", upload.single("image"), async (req, res) => {
  try {
    const { partnerId, title, description, cost } = req.body;

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

    const imageUrl = req.file ? `/uploads/${req.file.filename}` : null;

    const reward = await prisma.reward.create({
      data: {
        partnerId: partner.id,
        title,
        description,
        cost: Number(cost),
        imageUrl,
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
 * Query: ?partnerId=10 (opcional)
 */
router.get("/", async (req, res) => {
  try {
    const { partnerId } = req.query;
    const where: any = { active: true };
    if (partnerId) where.partnerId = Number(partnerId);

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
 * Body: { studentId: number, rewardId: number }
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

// ------------------------
// Validação de cupom pelo parceiro
// POST /rewards/validate
// Body: { partnerId: number, code: string }
// ------------------------
router.post("/validate", async (req, res) => {
  try {
    const { partnerId, code } = req.body;

    if (!partnerId || !code) {
      return res
        .status(400)
        .json({ error: "Campos obrigatórios: partnerId e code." });
    }

    const redemption = await prisma.redemption.findUnique({
      where: { code },
      include: {
        reward: { include: { partner: true } },
        student: true,
      },
    });

    if (!redemption) {
      return res.status(404).json({ error: "Cupom não encontrado." });
    }

    if (redemption.reward.partnerId !== Number(partnerId)) {
      return res
        .status(403)
        .json({ error: "Cupom não pertence a este parceiro." });
    }

    if (redemption.status === "UTILIZADO") {
      return res.status(400).json({ error: "Cupom já utilizado." });
    }
    if (redemption.status === "EXPIRADO") {
      return res.status(400).json({ error: "Cupom expirado." });
    }

    const updated = await prisma.redemption.update({
      where: { id: redemption.id },
      data: { status: "UTILIZADO" },
      include: {
        reward: { include: { partner: true } },
        student: true,
      },
    });

    // envia e-mails de confirmação de uso
    try {
      const alunoNome = updated.student?.name || "Aluno";
      const alunoEmail = updated.student?.email || "";
      const partnerNome = updated.reward?.partner?.name || "Parceiro";
      const partnerEmail = updated.reward?.partner?.email || "";
      const rewardTitle = updated.reward?.title || "Vantagem";
      const couponCode = updated.code;

      if (alunoEmail && partnerEmail) {
        await sendRewardUsedEmails({
          alunoNome,
          alunoEmail,
          partnerNome,
          partnerEmail,
          rewardTitle,
          couponCode,
          usedAt: new Date(),
        });
      }
    } catch (mailErr) {
      console.error("Erro ao enviar e-mails de confirmação de uso:", mailErr);
    }

    return res.json({
      message: "Cupom validado e marcado como UTILIZADO.",
      redemption: updated,
    });
  } catch (error) {
    console.error("Erro em POST /rewards/validate:", error);
    return res.status(500).json({ error: "Erro ao validar cupom." });
  }
});

/**
 * GET /rewards/partner/redemptions?partnerId=10&status=GERADO|UTILIZADO (status opcional)
 * Lista resgates do parceiro
 */
router.get("/partner/redemptions", async (req, res) => {
  try {
    const { partnerId, status } = req.query;

    if (!partnerId) {
      return res.status(400).json({ error: "Informe partnerId." });
    }

    const redemptions = await prisma.redemption.findMany({
      where: {
        reward: { partnerId: Number(partnerId) },
        ...(status ? { status: String(status) as any } : {}),
      },
      orderBy: { createdAt: "desc" },
      include: {
        reward: true,
        student: true,
      },
    });

    return res.json(redemptions);
  } catch (error) {
    console.error("Erro em GET /rewards/partner/redemptions:", error);
    return res.status(500).json({ error: "Erro ao listar resgates." });
  }
});

/**
 * PUT /rewards/:id
 * Atualiza título, descrição, custo e, opcionalmente, a imagem
 * Body (multipart/form-data):
 *  - title
 *  - description
 *  - cost
 *  - image (file opcional)
 */
router.put("/:id", upload.single("image"), async (req, res) => {
  try {
    const id = Number(req.params.id);
    const { title, description, cost } = req.body;

    const existing = await prisma.reward.findUnique({ where: { id } });
    if (!existing) {
      return res.status(404).json({ error: "Vantagem não encontrada." });
    }

    const dataToUpdate: any = {};

    if (title !== undefined) dataToUpdate.title = title;
    if (description !== undefined) dataToUpdate.description = description;
    if (cost !== undefined) dataToUpdate.cost = Number(cost);

    // se veio um novo arquivo, troca a imagem; se não, mantém a antiga
    if (req.file) {
      dataToUpdate.imageUrl = `/uploads/${req.file.filename}`;
    } else {
      dataToUpdate.imageUrl = existing.imageUrl;
    }

    const updated = await prisma.reward.update({
      where: { id },
      data: dataToUpdate,
    });

    return res.json(updated);
  } catch (error) {
    console.error("Erro em PUT /rewards/:id:", error);
    return res.status(500).json({ error: "Erro ao atualizar vantagem." });
  }
});

/**
 * PATCH /rewards/:id/status
 * Ativa / inativa vantagem
 * Body: { active: boolean }
 */
router.patch("/:id/status", async (req, res) => {
  try {
    const id = Number(req.params.id);
    const { active } = req.body;

    if (active === undefined) {
      return res.status(400).json({ error: "Campo 'active' é obrigatório." });
    }

    const updated = await prisma.reward.update({
      where: { id },
      data: { active: Boolean(active) },
    });

    return res.json(updated);
  } catch (error) {
    console.error("Erro em PATCH /rewards/:id/status:", error);
    return res.status(500).json({ error: "Erro ao alterar status." });
  }
});

/**
 * DELETE /rewards/:id
 * Exclui vantagem e seus resgates
 */
router.delete("/:id", async (req, res) => {
  try {
    const id = Number(req.params.id);

    await prisma.$transaction([
      prisma.redemption.deleteMany({ where: { rewardId: id } }),
      prisma.reward.delete({ where: { id } }),
    ]);

    return res.json({ message: "Vantagem excluída com sucesso." });
  } catch (error) {
    console.error("Erro em DELETE /rewards/:id:", error);
    return res.status(500).json({ error: "Erro ao excluir vantagem." });
  }
});

export default router;
