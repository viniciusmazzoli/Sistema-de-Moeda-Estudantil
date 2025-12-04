// src/server.ts
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";

import { prisma } from "./prisma";

// ROTAS
import transactionRoutes from "./routes/transactionRoutes";
import accountRoutes from "./routes/accountRoutes";
import rewardRoutes from "./routes/rewardRoutes";
import authRoutes from "./routes/authRoutes";
import notificationRoutes from "./routes/notificationRoutes"; // 👈 NOVO

dotenv.config();

const app = express();

// MIDDLEWARES
app.use(cors());
app.use(express.json());

// Servir imagens enviadas pelos parceiros
app.use("/uploads", express.static(path.join(__dirname, "..", "uploads")));

// ROTA DE STATUS DA API
app.get("/", (req, res) => {
  res.json({ message: "API Sistema de Mérito Estudantil OK" });
});

// ----------------------------
//        USERS CRUD
// ----------------------------
app.post("/users", async (req, res) => {
  try {
    const {
      role,
      name,
      email,
      cpf,
      rg,
      address,
      institution,
      course,
      department,
      cnpj,
      contactName,
    } = req.body;

    if (!role || !name || !email) {
      return res
        .status(400)
        .json({ error: "Campos obrigatórios: role, name, email" });
    }

    const user = await prisma.user.create({
      data: {
        role,
        name,
        email,
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
      include: { account: true },
    });

    return res.status(201).json(user);
  } catch (error) {
    console.error("Erro em POST /users:", error);
    return res.status(500).json({ error: "Erro ao criar usuário" });
  }
});

app.get("/users", async (req, res) => {
  try {
    const users = await prisma.user.findMany({
      include: { account: true },
    });
    return res.json(users);
  } catch (error) {
    console.error("Erro em GET /users:", error);
    return res.status(500).json({ error: "Erro ao listar usuários" });
  }
});

app.put("/users/:id", async (req, res) => {
  try {
    const id = Number(req.params.id);
    const { name, email, role, active } = req.body;

    const data: any = {};
    if (name !== undefined) data.name = name;
    if (email !== undefined) data.email = email;
    if (role !== undefined) data.role = role;
    if (active !== undefined) data.active = active;

    const updated = await prisma.user.update({
      where: { id },
      data,
    });

    return res.json(updated);
  } catch (error) {
    console.error("Erro em PUT /users/:id:", error);
    return res.status(500).json({ error: "Erro ao atualizar usuário" });
  }
});

app.patch("/users/:id/status", async (req, res) => {
  try {
    const id = Number(req.params.id);
    const { active } = req.body;

    if (active === undefined) {
      return res
        .status(400)
        .json({ error: "Campo 'active' é obrigatório no body." });
    }

    const updated = await prisma.user.update({
      where: { id },
      data: { active },
    });

    return res.json(updated);
  } catch (error) {
    console.error("Erro em PATCH /users/:id/status:", error);
    return res.status(500).json({ error: "Erro ao atualizar status do usuário" });
  }
});

app.delete("/users/:id", async (req, res) => {
  try {
    const id = Number(req.params.id);

    await prisma.$transaction([
      prisma.account.deleteMany({ where: { userId: id } }),
      prisma.reward.deleteMany({ where: { partnerId: id } }),
      prisma.redemption.deleteMany({ where: { studentId: id } }),
      prisma.user.delete({ where: { id } }),
    ]);

    return res.json({ message: "Usuário excluído com sucesso." });
  } catch (error) {
    console.error("Erro em DELETE /users/:id:", error);
    return res.status(500).json({ error: "Erro ao excluir usuário" });
  }
});

// ----------------------------
//        AUTH / LOGIN JWT
// ----------------------------
app.use("/auth", authRoutes);

// ----------------------------
//        TRANSAÇÕES
// ----------------------------
app.use("/transactions", transactionRoutes);

// ----------------------------
//        CONTAS
// ----------------------------
app.use("/accounts", accountRoutes);

// ----------------------------
//        RECOMPENSAS
// ----------------------------
app.use("/rewards", rewardRoutes);

// ----------------------------
//        NOTIFICAÇÕES
// ----------------------------
app.use("/notifications", notificationRoutes);

// ----------------------------
//        START SERVER
// ----------------------------
const PORT = process.env.PORT || 3333;

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});

