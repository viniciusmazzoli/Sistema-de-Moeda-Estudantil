
export const runtime = 'nodejs';
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireRole } from "@/app/api/_auth";
interface Ctx { params: { id: string } }
export async function GET(_req: Request, ctx: Ctx) {
  const auth = await requireRole(['ADMIN','EMPRESA']);
  if (!auth.ok) return NextResponse.json({ error: auth.message }, { status: auth.status });
  const id = ctx.params.id;
  const empresa = await prisma.empresaParceira.findUnique({ where: { id } });
  if (!empresa) return NextResponse.json({ error: "Empresa não encontrada" }, { status: 404 });
  const resgates = await prisma.transaction.findMany({ where: { type: 'REDEEM', vantagem: { empresaParceiraId: id } }, include: { vantagem: true, alunoResgate: true }, orderBy: { createdAt: 'desc' } });
  return NextResponse.json({ empresa, resgates });
}
