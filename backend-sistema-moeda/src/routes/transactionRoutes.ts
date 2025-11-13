// src/routes/transactionRoutes.ts
import { Router } from "express";
import { prisma } from "../prisma";
import {
  sendStudentReceivedCoinsEmail,
  sendProfessorConfirmationEmail,
} from "../services/mailService";

const router = Router();

/**
 * POST /transactions/transfer
 * Body:
 * {
 *   professorId: number,
 *   alunoId: number,
 *   amount: number,
 *   reason: string
 * }
 */
router.post("/transfer", async (req, res) => {
  try {
    const { professorId, alunoId, amount, reason } = req.body;

    if (!professorId || !alunoId || !amount || !reason) {
      return res.status(400).json({
        error:
          "Campos obrigatórios: professorId, alunoId, amount, reason",
      });
    }

    const professor = await prisma.user.findUnique({
      where: { id: Number(professorId) },
      include: { account: true },
    });

    const aluno = await prisma.user.findUnique({
      where: { id: Number(alunoId) },
      include: { account: true },
    });

    if (!professor || professor.role !== "PROFESSOR") {
      return res.status(400).json({ error: "Professor inválido." });
    }

    if (!aluno || aluno.role !== "ALUNO") {
      return res.status(400).json({ error: "Aluno inválido." });
    }

    if (!professor.account) {
      return res.status(400).json({
        error: "Conta do professor não encontrada.",
      });
    }

    if (!aluno.account) {
      return res.status(400).json({
        error: "Conta do aluno não encontrada.",
      });
    }

    if (professor.account.balance < amount) {
      return res
        .status(400)
        .json({ error: "Saldo insuficiente do professor." });
    }

    const result = await prisma.$transaction(async (tx) => {
      // Atualiza contas
      const updatedProfessorAcc = await tx.account.update({
        where: { id: professor.account!.id },
        data: { balance: { decrement: amount } },
      });

      const updatedAlunoAcc = await tx.account.update({
        where: { id: aluno.account!.id },
        data: { balance: { increment: amount } },
      });

      // Registra transação
      const transaction = await tx.transaction.create({
        data: {
          type: "ENVIO_PROFESSOR_ALUNO",
          fromAccountId: professor.account!.id,
          toAccountId: aluno.account!.id,
          amount,
          description: reason,
        },
      });

      return { updatedProfessorAcc, updatedAlunoAcc, transaction };
    });

    // --------------------------
    // E-MAILS (NÃO QUEBRAM A REQUISIÇÃO SE DER ERRO)
    // --------------------------
    if (aluno.email) {
      sendStudentReceivedCoinsEmail({
        alunoNome: aluno.name,
        alunoEmail: aluno.email,
        professorNome: professor.name,
        amount,
        reason,
      }).catch((err) => {
        console.error("Erro ao enviar email para aluno:", err);
      });
    }

    if (professor.email) {
      const novoSaldo = result.updatedProfessorAcc.balance;

      sendProfessorConfirmationEmail({
        professorNome: professor.name,
        professorEmail: professor.email,
        alunoNome: aluno.name,
        amount,
        reason,
        novoSaldo,
      }).catch((err) => {
        console.error("Erro ao enviar email para professor:", err);
      });
    }

    // --------------------------
    // NOTIFICAÇÕES 🔔
    // --------------------------
    try {
      // Notificação para o aluno
      await prisma.notification.create({
        data: {
          userId: aluno.id,
          title: "Você recebeu moedas!",
          message: `Você recebeu ${amount} moedas do professor ${professor.name}. Motivo: ${reason}.`,
        },
      });

      // Notificação para o professor
      await prisma.notification.create({
        data: {
          userId: professor.id,
          title: "Envio de moedas registrado",
          message: `Você enviou ${amount} moedas para o aluno ${aluno.name}. Motivo: ${reason}.`,
        },
      });
    } catch (notiErr) {
      console.error("Erro ao criar notificações:", notiErr);
      // não interrompe a resposta se falhar
    }

    return res.status(201).json({
      message: "Moedas enviadas com sucesso",
      updatedProfessorAcc: result.updatedProfessorAcc,
      updatedAlunoAcc: result.updatedAlunoAcc,
      transaction: result.transaction,
    });
  } catch (error) {
    console.error("Erro em POST /transactions/transfer:", error);
    return res.status(500).json({ error: "Erro ao enviar moedas" });
  }
});

export default router;