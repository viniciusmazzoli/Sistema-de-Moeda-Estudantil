
export const runtime = 'nodejs';
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireRole } from "@/app/api/_auth";
interface Ctx { params: { id: string } }
export async function GET(_req: Request, ctx: Ctx) {
  const auth = await requireRole(['ADMIN','ALUNO']);
  if (!auth.ok) return NextResponse.json({ error: auth.message }, { status: auth.status });
  const id = ctx.params.id;
  const aluno = await prisma.aluno.findUnique({ where: { id } });
  if (!aluno) return NextResponse.json({ error: "Aluno não encontrado" }, { status: 404 });
  const recebimentos = await prisma.transaction.findMany({ where: { alunoId: id, type: 'GRANT' }, include: { professor: true }, orderBy: { createdAt: 'desc' } });
  const resgates = await prisma.transaction.findMany({ where: { alunoResgateId: id, type: 'REDEEM' }, include: { vantagem: { include: { empresaParceira: true } } }, orderBy: { createdAt: 'desc' } });
  return NextResponse.json({ aluno, recebimentos, resgates });
}
