
export const runtime = 'nodejs';
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { alunoSchema } from "@/app/api/validators";
import { requireRole } from "@/app/api/_auth";
interface Ctx{ params:{ id:string } }
export async function GET(_r:Request, ctx:Ctx){ const a=await prisma.aluno.findUnique({where:{id:ctx.params.id}}); if(!a) return NextResponse.json({error:'Aluno não encontrado'},{status:404}); return NextResponse.json(a); }
export async function PUT(req:Request, ctx:Ctx){ const auth=await requireRole(['ADMIN']); if(!auth.ok) return NextResponse.json({error:auth.message},{status:auth.status}); const p=alunoSchema.partial().safeParse(await req.json()); if(!p.success) return NextResponse.json({error:p.error.flatten()},{status:400}); const u=await prisma.aluno.update({where:{id:ctx.params.id}, data:p.data}); return NextResponse.json(u); }
export async function DELETE(_r:Request, ctx:Ctx){ const auth=await requireRole(['ADMIN']); if(!auth.ok) return NextResponse.json({error:auth.message},{status:auth.status}); await prisma.aluno.delete({where:{id:ctx.params.id}}); return NextResponse.json({ok:true}); }
