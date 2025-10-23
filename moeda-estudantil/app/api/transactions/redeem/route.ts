
export const runtime = 'nodejs';
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { redeemSchema } from "@/app/api/validators";
import { generateCouponCode } from "@/lib/utils";
import { sendMail } from "@/lib/mailer";
import { requireRole } from "@/app/api/_auth";
export async function POST(req: Request){
  const auth = await requireRole(['ADMIN','ALUNO']); if(!auth.ok) return NextResponse.json({error:auth.message},{status:auth.status});
  try{
    const parsed = redeemSchema.safeParse(await req.json());
    if (!parsed.success) return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
    const { alunoId, vantagemId } = parsed.data;
    const aluno = await prisma.aluno.findUnique({ where:{ id: alunoId } });
    const v = await prisma.vantagem.findUnique({ where:{ id: vantagemId }, include:{ empresaParceira:true } });
    if (!aluno || !v) return NextResponse.json({ error: "Aluno ou Vantagem inválidos" }, { status: 400 });
    if (aluno.saldoMoedas < v.custoEmMoedas) return NextResponse.json({ error: "Saldo insuficiente do aluno" }, { status: 400 });
    const code = generateCouponCode("ME");
    const tx = await prisma.$transaction(async (db) => {
      const t = await db.transaction.create({ data: { type: "REDEEM", amount: v.custoEmMoedas, couponCode: code, vantagemId, alunoResgateId: alunoId } });
      await db.aluno.update({ where:{ id: alunoId }, data:{ saldoMoedas: { decrement: v.custoEmMoedas } } });
      return t;
    });
    await sendMail(aluno.email, "Cupom resgatado ✅", `<p>Você resgatou: <b>${v.titulo}</b> (custo ${v.custoEmMoedas} moedas).<br/>Código: <b>${code}</b></p>`);
    await sendMail(v.empresaParceira.email, "Alerta de resgate", `<p>Aluno ${aluno.nome} resgatou ${v.titulo}. Código: <b>${code}</b></p>`);
    return NextResponse.json(tx, { status: 201 });
  }catch(e:any){ return NextResponse.json({ error: e.message }, { status: 500 }); }
}
