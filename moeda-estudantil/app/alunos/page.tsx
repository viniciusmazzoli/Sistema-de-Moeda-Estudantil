
'use client';
import { useEffect, useState } from 'react';
import DataTable from '@/components/DataTable';
import Form from '@/components/Form';
type Aluno = { id: string; nome: string; email: string; cpf: string; rg: string; endereco: string; curso: string; instituicaoId?: string | null; };
export default function AlunosPage() {
  const [alunos, setAlunos] = useState<Aluno[]>([]);
  const [editing, setEditing] = useState<Aluno | null>(null);
  async function load(){ const r = await fetch('/api/alunos',{cache:'no-store'}); setAlunos(await r.json()); }
  useEffect(()=>{ load(); },[]);
  async function createAluno(a: Partial<Aluno>) {
    const res = await fetch('/api/alunos',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(a)});
    if(!res.ok){ let m=`Erro ${res.status}`; try{const j=await res.json(); m=j?.error?JSON.stringify(j.error):m;}catch{} throw new Error(m); }
    await load();
  }
  async function updateAluno(a: Partial<Aluno> & { id: string }) {
    const res = await fetch(`/api/alunos/${a.id}`,{method:'PUT',headers:{'Content-Type':'application/json'},body:JSON.stringify(a)});
    if(!res.ok){ let m=`Erro ${res.status}`; try{const j=await res.json(); m=j?.error?JSON.stringify(j.error):m;}catch{} throw new Error(m); }
    setEditing(null); await load();
  }
  async function deleteAluno(row: Aluno) {
    const res = await fetch(`/api/alunos/${row.id}`,{method:'DELETE'}); if(!res.ok) throw new Error('Falha ao excluir'); await load();
  }
  return (<main className="grid" style={{gap:24}}>
    <h2 className="h2">Alunos</h2>
    <section className="card grid"><h3 className="h3">Novo Aluno</h3>
      <Form initial={{nome:'',email:'',cpf:'',rg:'',endereco:'',curso:'',instituicaoId:''}}
        fields={[{name:'nome',label:'Nome'},{name:'email',label:'Email',type:'email'},{name:'cpf',label:'CPF'},{name:'rg',label:'RG'},{name:'endereco',label:'Endereço'},{name:'curso',label:'Curso'},{name:'instituicaoId',label:'Instituição (ID opcional)'}]}
        onSubmit={async d=>{const payload={...d, instituicaoId:d.instituicaoId||undefined}; await createAluno(payload);}} submitText="Cadastrar"/></section>
    <section className="grid"><h3 className="h3">Lista</h3>
      <DataTable data={alunos} columns={[{key:'nome',header:'Nome'},{key:'email',header:'Email'},{key:'cpf',header:'CPF'},{key:'curso',header:'Curso'}]} onEdit={setEditing} onDelete={deleteAluno}/>
    </section>
    {editing && <section className="card grid"><h3 className="h3">Editar Aluno</h3>
      <Form initial={editing} fields={[{name:'nome',label:'Nome'},{name:'email',label:'Email',type:'email'},{name:'cpf',label:'CPF'},{name:'rg',label:'RG'},{name:'endereco',label:'Endereço'},{name:'curso',label:'Curso'}]}
        onSubmit={async d=>{ await updateAluno({...(d as any), id: editing.id}); }} submitText="Salvar alterações"/></section>}
  </main>);
}
