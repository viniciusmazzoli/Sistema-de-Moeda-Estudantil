
export const runtime = 'nodejs';
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { empresaSchema } from "@/app/api/validators";
import { requireRole } from "@/app/api/_auth";
export async function GET(){ return NextResponse.json(await prisma.empresaParceira.findMany({ orderBy:{createdAt:'desc'} })); }
export async function POST(req: Request){
  const auth = await requireRole(['ADMIN']); if (!auth.ok) return NextResponse.json({error:auth.message},{status:auth.status});
  const parsed = empresaSchema.safeParse(await req.json());
  if(!parsed.success) return NextResponse.json({error:parsed.error.flatten()},{status:400});
  const created = await prisma.empresaParceira.create({ data: parsed.data }); return NextResponse.json(created,{status:201});
}
