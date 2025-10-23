
import { prisma } from "../lib/prisma";
import bcrypt from "bcryptjs";

async function main() {
  if (await prisma.instituicao.count() === 0) {
    await prisma.instituicao.createMany({
      data: [
        { nome: "PUC Minas", endereco: "Av. Dom José Gaspar, 500" },
        { nome: "UFMG", endereco: "Av. Antônio Carlos, 6627" },
        { nome: "UFBA", endereco: "Ondina" }
      ]
    });
  }
  const empresa = await prisma.empresaParceira.upsert({
    where: { cnpj: "12345678000199" },
    update: {},
    create: { nome: "Empresa X", email: "contato@x.com", cnpj: "12345678000199", endereco: "Av. Principal, 100" }
  });
  const prof = await prisma.professor.upsert({
    where: { cpf: "99988877766" },
    update: {},
    create: { nome: "Prof. Carlos", cpf: "99988877766", departamento: "Computação", saldoMoedas: 1000, lastAllocationAt: new Date() }
  });
  const aluno = await prisma.aluno.upsert({
    where: { cpf: "11122233344" },
    update: {},
    create: { nome: "Ana Teste", email: "ana@ex.com", cpf: "11122233344", rg: "MG12345", endereco: "Rua A, 10", curso: "ADS", saldoMoedas: 0 }
  });

  const pass = await bcrypt.hash("admin123", 10);
  await prisma.user.upsert({ where: { email: "admin@me.com" }, update: {}, create: { name: "Admin", email: "admin@me.com", password: pass, role: "ADMIN" } });

  const passProf = await bcrypt.hash("prof123", 10);
  await prisma.user.upsert({ where: { email: "prof@me.com" }, update: {}, create: { name: "Prof Carlos", email: "prof@me.com", password: passProf, role: "PROFESSOR", professorId: prof.id } });

  const passAluno = await bcrypt.hash("aluno123", 10);
  await prisma.user.upsert({ where: { email: "aluno@me.com" }, update: {}, create: { name: "Ana", email: "aluno@me.com", password: passAluno, role: "ALUNO", alunoId: aluno.id } });

  const passEmp = await bcrypt.hash("empresa123", 10);
  await prisma.user.upsert({ where: { email: "empresa@me.com" }, update: {}, create: { name: "Empresa X", email: "empresa@me.com", password: passEmp, role: "EMPRESA", empresaId: empresa.id } });

  console.log("Seed OK");
}

main().catch(e=>{console.error(e);process.exit(1)}).finally(async()=>{await prisma.$disconnect()});
