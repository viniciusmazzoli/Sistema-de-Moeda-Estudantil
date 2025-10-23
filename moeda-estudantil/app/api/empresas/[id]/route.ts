
export const runtime = 'nodejs';
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { empresaSchema } from "@/app/api/validators";
import { requireRole } from "@/app/api/_auth";
interface Ctx{ params:{ id:string } }
export async function GET(_r:Request, ctx:Ctx){ const e=await prisma.empresaParceira.findUnique({where:{id:ctx.params.id}}); if(!e) return NextResponse.json({error:'Empresa não encontrada'},{status:404}); return NextResponse.json(e); }
export async function PUT(req:Request, ctx:Ctx){
  const auth = await requireRole(['ADMIN','EMPRESA']); if (!auth.ok) return NextResponse.json({error:auth.message},{status:auth.status});
  const p = empresaSchema.partial().safeParse(await req.json()); if(!p.success) return NextResponse.json({error:p.error.flatten()},{status:400});
  const u = await prisma.empresaParceira.update({where:{id:ctx.params.id}, data:p.data}); return NextResponse.json(u);
}
export async function DELETE(_r:Request, ctx:Ctx){ const auth=await requireRole(['ADMIN']); if(!auth.ok) return NextResponse.json({error:auth.message},{status:auth.status}); await prisma.empresaParceira.delete({where:{id:ctx.params.id}}); return NextResponse.json({ok:true}); }
