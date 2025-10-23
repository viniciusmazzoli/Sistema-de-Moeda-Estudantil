
'use client';
import { useEffect, useState } from 'react';
import DataTable from '@/components/DataTable';
import Form from '@/components/Form';
type Vantagem = { id: string; titulo: string; descricao: string; custoEmMoedas: number; fotoUrl?: string | null; empresaParceiraId: string };
type Empresa = { id: string; nome: string };
export default function VantagensPage(){
  const [vantagens, setVantagens] = useState<Vantagem[]>([]);
  const [empresas, setEmpresas] = useState<Empresa[]>([]);
  const [editing, setEditing] = useState<Vantagem | null>(null);
  const [file, setFile] = useState<File | null>(null);
  async function load(){
    const v = await fetch('/api/vantagens',{cache:'no-store'}).then(r=>r.json());
    const e = await fetch('/api/empresas',{cache:'no-store'}).then(r=>r.json());
    setVantagens(v); setEmpresas(e);
  }
  useEffect(()=>{ load(); },[]);
  async function uploadIfNeeded(){ if (!file) return undefined; const b64 = await file.arrayBuffer().then(b=>Buffer.from(b).toString('base64'));
    const res = await fetch('/api/upload',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({filename:file.name, dataUrl:`data:${file.type};base64,${b64}`})}); if(!res.ok) throw new Error('Falha no upload');
    const j = await res.json(); return j.url; }
  async function create(v:any){ const fotoUrl = await uploadIfNeeded(); v.custoEmMoedas = Number(v.custoEmMoedas);
    const res = await fetch('/api/vantagens',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({...v, fotoUrl})}); if(!res.ok){ let m=`Erro ${res.status}`; try{const j=await res.json(); m=j?.error?JSON.stringify(j.error):m;}catch{} throw new Error(m); }
    setFile(null); await load(); }
  async function update(v:any){ const fotoUrl = await uploadIfNeeded(); v.custoEmMoedas = Number(v.custoEmMoedas);
    const res = await fetch(`/api/vantagens/${v.id}`,{method:'PUT',headers:{'Content-Type':'application/json'},body:JSON.stringify({...v, fotoUrl: fotoUrl ?? v.fotoUrl})}); if(!res.ok){ let m=`Erro ${res.status}`; try{const j=await res.json(); m=j?.error?JSON.stringify(j.error):m;}catch{} throw new Error(m); }
    setEditing(null); setFile(null); await load(); }
  async function del(row:Vantagem){ const r=await fetch(`/api/vantagens/${row.id}`,{method:'DELETE'}); if(!r.ok) throw new Error('Falha ao excluir'); await load(); }
  return (<main className="grid" style={{gap:24}}>
    <h2 className="h2">Vantagens</h2>
    <section className="card grid"><h3 className="h3">Nova Vantagem</h3>
      <Form initial={{titulo:'',descricao:'',custoEmMoedas:'',empresaParceiraId:'',fotoUrl:''} as any}
        fields={[{name:'titulo',label:'Título'},{name:'descricao',label:'Descrição'},{name:'custoEmMoedas',label:'Custo em Moedas',type:'number'},{name:'empresaParceiraId',label:'Empresa (ID)'}]}
        onSubmit={async d=>{ await create(d); }} submitText="Cadastrar"/>
      <label className="grid"><span className="label">Foto (opcional)</span>
        <input className="input" type="file" onChange={e=>setFile(e.target.files?.[0] ?? null)} /></label>
      <div className="mono">Empresas: {empresas.map(e=>`${e.nome} (${e.id})`).join(' | ')}</div>
    </section>
    <section className="grid"><h3 className="h3">Lista</h3>
      <DataTable data={vantagens} columns={[{key:'titulo',header:'Título'},{key:'descricao',header:'Descrição'},{key:'custoEmMoedas',header:'Custo'}]} onEdit={setEditing} onDelete={del}/>
    </section>
    {editing && <section className="card grid"><h3 className="h3">Editar Vantagem</h3>
      <Form initial={editing as any} fields={[{name:'titulo',label:'Título'},{name:'descricao',label:'Descrição'},{name:'custoEmMoedas',label:'Custo',type:'number'}]}
        onSubmit={async d=>{ await update(d); }} submitText="Salvar alterações"/>
      <label className="grid"><span className="label">Nova Foto (opcional)</span>
        <input className="input" type="file" onChange={e=>setFile(e.target.files?.[0] ?? null)} /></label>
    </section>}
  </main>);
}
