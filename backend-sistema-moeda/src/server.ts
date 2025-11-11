// src/server.ts
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { prisma } from "./prisma";
import transactionRoutes from "./routes/transactionRoutes";
import accountRoutes from "./routes/accountRoutes";
import rewardRoutes from "./routes/rewardRoutes";
import authRoutes from "./routes/authRoutes";



dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

// Rota de teste
app.get("/", (req, res) => {
  res.json({ message: "API Sistema de Mérito Estudantil OK" });
});

// ---------- USERS ----------

// Cadastro de aluno / professor / parceiro / admin
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
      include: {
        account: true,
      },
    });

    return res.status(201).json(user);
  } catch (error) {
    console.error("Erro em POST /users:", error);
    return res.status(500).json({ error: "Erro ao criar usuário" });
  }
});

// Lista todos os usuários
app.get("/users", async (req, res) => {
  try {
    const users = await prisma.user.findMany({
      include: { account: true },
    });
    res.json(users);
  } catch (error) {
    console.error("Erro em GET /users:", error);
    res.status(500).json({ error: "Erro ao listar usuários" });
  }
});

// atualizar usuário (nome, email, role, active)
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

// desativar / reativar usuário (toggle de active)
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

// excluir usuário (e dados ligados)
app.delete("/users/:id", async (req, res) => {
  try {
    const id = Number(req.params.id);

    await prisma.$transaction([
      // apaga contas ligadas
      prisma.account.deleteMany({ where: { userId: id } }),
      // apaga vantagens do parceiro (se for PARCEIRO)
      prisma.reward.deleteMany({ where: { partnerId: id } }),
      // apaga resgates do aluno (se for ALUNO)
      prisma.redemption.deleteMany({ where: { studentId: id } }),
      // por último apaga o usuário
      prisma.user.delete({ where: { id } }),
    ]);

    return res.json({ message: "Usuário excluído com sucesso." });
  } catch (error) {
    console.error("Erro em DELETE /users/:id:", error);
    return res.status(500).json({ error: "Erro ao excluir usuário" });
  }
});


// ---------- AUTH (LOGIN) ----------

/* app.post("/auth/login", async (req, res) => {
  try {
    const { role, email } = req.body;

    if (!role || !email) {
      return res
        .status(400)
        .json({ error: "Campos obrigatórios: role e email" });
    }

    // procura usuário com esse role e email
    const user = await prisma.user.findFirst({
      where: {
        role,   // "ALUNO" | "PROFESSOR" | ...
        email,
      },
      include: {
        account: true,
      },
    });

    if (!user) {
      return res
        .status(401)
        .json({ error: "Usuário não encontrado. Verifique os dados ou faça cadastro." });
    }

    // aqui seria onde num sistema real você validaria senha, etc.
    return res.json({
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      account: user.account,
    });
  } catch (error) {
    console.error("Erro em POST /auth/login:", error);
    return res.status(500).json({ error: "Erro ao fazer login" });
  }
}); */

// ---------- TRANSAÇÕES ----------
app.use("/transactions", transactionRoutes);

// ---------- CONTAS / EXTRATO ----------
app.use("/accounts", accountRoutes);

// ---------- VANTAGENS / REWARDS ----------
app.use("/rewards", rewardRoutes);

// ---------- MIDDLEWARES ----------
app.use("/auth", authRoutes);


// ---------- START ----------
const PORT = 3333;
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
