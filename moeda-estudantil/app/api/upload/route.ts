
export const runtime = 'nodejs';
import { NextResponse } from "next/server";
import { writeFile, mkdir } from "fs/promises";
import { join } from "path";
import { requireRole } from "@/app/api/_auth";
export async function POST(req: Request){
  const auth = await requireRole(['ADMIN','EMPRESA']); if(!auth.ok) return NextResponse.json({error:auth.message},{status:auth.status});
  const { filename, dataUrl } = await req.json();
  if (!filename || !dataUrl) return NextResponse.json({ error: "filename e dataUrl são obrigatórios" }, { status:400 });
  const m = /^data:(.+);base64,(.*)$/.exec(dataUrl); if(!m) return NextResponse.json({ error:"dataUrl inválido" },{status:400});
  const dir = join(process.cwd(), "public", "uploads"); await mkdir(dir, { recursive: true });
  await writeFile(join(dir, filename), Buffer.from(m[2], "base64"));
  return NextResponse.json({ url: `/uploads/${filename}` }, { status: 201 });
}
