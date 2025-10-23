
export const runtime = 'nodejs';
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { vantagemSchema } from "@/app/api/validators";
import { requireRole } from "@/app/api/_auth";
interface Ctx{ params:{ id:string } }
export async function GET(_r:Request, ctx:Ctx){ const v=await prisma.vantagem.findUnique({where:{id:ctx.params.id}}); if(!v) return NextResponse.json({error:'Vantagem não encontrada'},{status:404}); return NextResponse.json(v); }
export async function PUT(req:Request, ctx:Ctx){
  const auth=await requireRole(['ADMIN','EMPRESA']); if(!auth.ok) return NextResponse.json({error:auth.message},{status:auth.status});
  const b=await req.json(); const p=vantagemSchema.partial().safeParse({ ...b, custoEmMoedas: b.custoEmMoedas?Number(b.custoEmMoedas):undefined });
  if(!p.success) return NextResponse.json({error:p.error.flatten()},{status:400});
  const u=await prisma.vantagem.update({where:{id:ctx.params.id}, data:p.data}); return NextResponse.json(u);
}
export async function DELETE(_r:Request, ctx:Ctx){ const auth=await requireRole(['ADMIN','EMPRESA']); if(!auth.ok) return NextResponse.json({error:auth.message},{status:auth.status}); await prisma.vantagem.delete({where:{id:ctx.params.id}}); return NextResponse.json({ok:true}); }
