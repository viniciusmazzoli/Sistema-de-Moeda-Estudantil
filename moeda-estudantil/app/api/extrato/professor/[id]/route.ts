
export const runtime = 'nodejs';
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireRole } from "@/app/api/_auth";
interface Ctx { params: { id: string } }
export async function GET(_req: Request, ctx: Ctx) {
  const auth = await requireRole(['ADMIN','PROFESSOR']);
  if (!auth.ok) return NextResponse.json({ error: auth.message }, { status: auth.status });
  const id = ctx.params.id;
  const professor = await prisma.professor.findUnique({ where: { id } });
  if (!professor) return NextResponse.json({ error: "Professor não encontrado" }, { status: 404 });
  const envios = await prisma.transaction.findMany({ where: { professorId: id, type: 'GRANT' }, include: { aluno: true }, orderBy: { createdAt: 'desc' } });
  return NextResponse.json({ professor, envios });
}
