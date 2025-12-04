// src/routes/authRoutes.ts
import { Router } from "express";
import { prisma } from "../prisma";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import crypto from "crypto";
import { sendPasswordResetEmail } from "../services/mailService";


dotenv.config();
const router = Router();

/**
 * CADASTRO (com senha e criação de conta)
 * POST /auth/register
 */
router.post("/register", async (req, res) => {
  try {
    const {
      role,
      name,
      email,
      password,
      cpf,
      rg,
      address,
      institution,
      course,
      department,
      cnpj,
      contactName,
    } = req.body;

    if (!role || !name || !email || !password) {
      return res
        .status(400)
        .json({ error: "Campos obrigatórios: role, name, email, password" });
    }

    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) {
      return res.status(400).json({ error: "E-mail já cadastrado" });
    }

    const passwordHash = await bcrypt.hash(password, 10);

    // cria usuário + conta vinculada (igual /users antigo, mas com senha)
    const user = await prisma.user.create({
      data: {
        role,
        name,
        email,
        passwordHash,
        cpf,
        rg,
        address,
        institution,
        course,
        department,
        cnpj,
        contactName,
        account: {
          create: {
            balance: role === "PROFESSOR" ? 1000 : 0,
          },
        },
      },
      include: {
        account: true,
      },
    });

    return res
      .status(201)
      .json({ message: "Usuário criado com sucesso", user });
  } catch (error) {
    console.error("Erro em /auth/register:", error);
    return res.status(500).json({ error: "Erro ao registrar usuário" });
  }
});

/**
 * LOGIN (e-mail + senha, gera JWT)
 * POST /auth/login
 */
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ error: "Campos obrigatórios: email e password" });
    }

    const user = await prisma.user.findUnique({ where: { email } });

    if (!user || !user.passwordHash) {
      return res.status(401).json({ error: "Credenciais inválidas" });
    }

    const valid = await bcrypt.compare(password, user.passwordHash);
    if (!valid) {
      return res.status(401).json({ error: "E-mail ou senha incorretos" });
    }

    const token = jwt.sign(
      { id: user.id, role: user.role },
      process.env.JWT_SECRET!,
      { expiresIn: process.env.JWT_EXPIRES_IN || "7d" }
    );

    return res.json({
      message: "Login bem-sucedido",
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.error("Erro em /auth/login:", error);
    return res.status(500).json({ error: "Erro no login" });
  }
});

/**
 * ESQUECI A SENHA
 * POST /auth/forgot-password
 * body: { email: string }
 */
router.post("/forgot-password", async (req, res) => {
  try {
    const { email } = req.body;

    if (!email || typeof email !== "string") {
      return res.status(400).json({ error: "E-mail inválido." });
    }

    const user = await prisma.user.findUnique({
      where: { email },
    });

    // Não revela se o e-mail existe ou não (por segurança)
    if (!user) {
      return res.json({
        message:
          "Se este e-mail estiver cadastrado, enviaremos um link de recuperação.",
      });
    }

    const token = crypto.randomBytes(32).toString("hex");
    const expires = new Date(Date.now() + 60 * 60 * 1000); // 1 hora

    await prisma.user.update({
      where: { id: user.id },
      data: {
        passwordResetToken: token,
        passwordResetExpiresAt: expires,
      },
    });

    const frontendBase =
      process.env.FRONTEND_URL || "http://localhost:5173";

    const resetLink = `${frontendBase}/reset-senha/${token}`;

    await sendPasswordResetEmail({
      to: user.email,
      name: user.name,
      resetLink,
    });

    return res.json({
      message:
        "Se este e-mail estiver cadastrado, enviaremos um link de recuperação.",
    });
  } catch (error) {
    console.error("Erro em /auth/forgot-password:", error);
    return res
      .status(500)
      .json({ error: "Erro ao processar recuperação de senha." });
  }
});

/**
 * REDEFINIR SENHA
 * POST /auth/reset-password
 * body: { token: string, password: string }
 */
router.post("/reset-password", async (req, res) => {
  try {
    const { token, password } = req.body;

    if (!token || typeof token !== "string") {
      return res.status(400).json({ error: "Token inválido." });
    }

    if (!password || typeof password !== "string" || password.length < 6) {
      return res
        .status(400)
        .json({ error: "Senha inválida. Use ao menos 6 caracteres." });
    }

    const now = new Date();

    const user = await prisma.user.findFirst({
      where: {
        passwordResetToken: token,
        passwordResetExpiresAt: {
          gt: now,
        },
      },
    });

    if (!user) {
      return res
        .status(400)
        .json({ error: "Token inválido ou expirado. Solicite novamente." });
    }

    const passwordHash = await bcrypt.hash(password, 10);

    await prisma.user.update({
      where: { id: user.id },
      data: {
        passwordHash,
        passwordResetToken: null,
        passwordResetExpiresAt: null,
      },
    });

    return res.json({ message: "Senha redefinida com sucesso." });
  } catch (error) {
    console.error("Erro em /auth/reset-password:", error);
    return res
      .status(500)
      .json({ error: "Erro ao redefinir senha. Tente novamente." });
  }
});


export default router;
