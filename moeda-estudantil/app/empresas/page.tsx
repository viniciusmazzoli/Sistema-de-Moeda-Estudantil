
'use client';
import { useEffect, useState } from 'react';
import DataTable from '@/components/DataTable';
import Form from '@/components/Form';
type Empresa = { id: string; nome: string; email: string; cnpj: string; endereco: string; };
export default function EmpresasPage() {
  const [empresas, setEmpresas] = useState<Empresa[]>([]);
  const [editing, setEditing] = useState<Empresa | null>(null);
  async function load(){ const r = await fetch('/api/empresas',{cache:'no-store'}); setEmpresas(await r.json()); }
  useEffect(()=>{ load(); },[]);
  async function createEmpresa(e: Omit<Empresa,'id'>) {
    const res = await fetch('/api/empresas',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(e)});
    if(!res.ok){ let m=`Erro ${res.status}`; try{const j=await res.json(); m=j?.error?JSON.stringify(j.error):m;}catch{} throw new Error(m); }
    await load();
  }
  async function updateEmpresa(e: Empresa) {
    const res = await fetch(`/api/empresas/${e.id}`,{method:'PUT',headers:{'Content-Type':'application/json'},body:JSON.stringify(e)});
    if(!res.ok){ let m=`Erro ${res.status}`; try{const j=await res.json(); m=j?.error?JSON.stringify(j.error):m;}catch{} throw new Error(m); }
    setEditing(null); await load();
  }
  async function deleteEmpresa(row: Empresa) {
    const res = await fetch(`/api/empresas/${row.id}`,{method:'DELETE'}); if(!res.ok) throw new Error('Falha ao excluir'); await load();
  }
  return (<main className="grid" style={{gap:24}}>
    <h2 className="h2">Empresas Parceiras</h2>
    <section className="card grid"><h3 className="h3">Nova Empresa</h3>
      <Form initial={{nome:'',email:'',cnpj:'',endereco:''}}
        fields={[{name:'nome',label:'Nome'},{name:'email',label:'Email',type:'email'},{name:'cnpj',label:'CNPJ'},{name:'endereco',label:'Endereço'}]}
        onSubmit={async d=>{ await createEmpresa(d as any); }} submitText="Cadastrar"/></section>
    <section className="grid"><h3 className="h3">Lista</h3>
      <DataTable data={empresas} columns={[{key:'nome',header:'Nome'},{key:'email',header:'Email'},{key:'cnpj',header:'CNPJ'}]} onEdit={setEditing} onDelete={deleteEmpresa}/>
    </section>
    {editing && <section className="card grid"><h3 className="h3">Editar Empresa</h3>
      <Form initial={editing} fields={[{name:'nome',label:'Nome'},{name:'email',label:'Email',type:'email'},{name:'cnpj',label:'CNPJ'},{name:'endereco',label:'Endereço'}]}
        onSubmit={async d=>{ await updateEmpresa(d as Empresa); }} submitText="Salvar alterações"/></section>}
  </main>);
}
