
export const runtime = 'nodejs';
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { vantagemSchema } from "@/app/api/validators";
import { requireRole } from "@/app/api/_auth";
export async function GET(){ return NextResponse.json(await prisma.vantagem.findMany({ include:{empresaParceira:true}, orderBy:{createdAt:'desc'}})); }
export async function POST(req: Request){
  const auth = await requireRole(['ADMIN','EMPRESA']); if(!auth.ok) return NextResponse.json({error:auth.message},{status:auth.status});
  const body = await req.json(); const parsed = vantagemSchema.safeParse({ ...body, custoEmMoedas: Number(body.custoEmMoedas) });
  if(!parsed.success) return NextResponse.json({error:parsed.error.flatten()},{status:400});
  const created = await prisma.vantagem.create({ data: parsed.data }); return NextResponse.json(created,{status:201});
}
