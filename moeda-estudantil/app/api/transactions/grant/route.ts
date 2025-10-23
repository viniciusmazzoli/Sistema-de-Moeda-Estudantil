
export const runtime = 'nodejs';
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { grantSchema } from "@/app/api/validators";
import { semestersSince } from "@/lib/utils";
import { sendMail } from "@/lib/mailer";
import { requireRole } from "@/app/api/_auth";
export async function POST(req: Request){
  const auth = await requireRole(['ADMIN','PROFESSOR']); if(!auth.ok) return NextResponse.json({error:auth.message},{status:auth.status});
  try{
    const parsed = grantSchema.safeParse(await req.json());
    if (!parsed.success) return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
    const { professorId, alunoId, amount, message } = parsed.data;
    const prof = await prisma.professor.findUnique({ where:{ id: professorId } });
    const aluno = await prisma.aluno.findUnique({ where:{ id: alunoId } });
    if (!prof || !aluno) return NextResponse.json({ error: "Professor ou Aluno inválido" }, { status: 400 });
    const extra = semestersSince(prof.lastAllocationAt);
    if (extra > 0) await prisma.professor.update({ where:{ id: professorId }, data:{ saldoMoedas: { increment: 1000*extra }, lastAllocationAt: new Date() } });
    const fresh = await prisma.professor.findUnique({ where:{ id: professorId } });
    if (!fresh || fresh.saldoMoedas < amount) return NextResponse.json({ error: "Saldo insuficiente do professor" }, { status: 400 });
    const tx = await prisma.$transaction(async (db) => {
      const t = await db.transaction.create({ data: { type: "GRANT", amount, message, professorId, alunoId } });
      await db.professor.update({ where:{ id: professorId }, data:{ saldoMoedas: { decrement: amount } } });
      await db.aluno.update({ where:{ id: alunoId }, data:{ saldoMoedas: { increment: amount } } });
      return t;
    });
    await sendMail(aluno.email, "Você recebeu moedas 🎉", `<p>Você recebeu <b>${amount}</b> moedas. Motivo: ${message}</p>`);
    return NextResponse.json(tx, { status: 201 });
  }catch(e:any){ return NextResponse.json({ error: e.message }, { status: 500 }); }
}
