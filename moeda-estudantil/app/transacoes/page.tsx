
'use client';
import { useEffect, useState } from 'react';
import Form from '@/components/Form';
type Aluno = { id:string; nome:string; email:string; saldoMoedas:number };
type Professor = { id:string; nome:string; saldoMoedas:number };
type Vantagem = { id:string; titulo:string; custoEmMoedas:number };
export default function TransacoesPage(){
  const [alunos,setAlunos]=useState<Aluno[]>([]);
  const [profs,setProfs]=useState<Professor[]>([]);
  const [vants,setVants]=useState<Vantagem[]>([]);
  const [msg,setMsg]=useState<string | null>(null);
  const [err,setErr]=useState<string | null>(null);
  async function load(){ setMsg(null); setErr(null);
    const [a,p,v] = await Promise.all([ fetch('/api/alunos',{cache:'no-store'}).then(r=>r.json()), fetch('/api/professores',{cache:'no-store'}).then(r=>r.json()).catch(()=>[]), fetch('/api/vantagens',{cache:'no-store'}).then(r=>r.json()) ]);
    setAlunos(a); setProfs(p); setVants(v); }
  useEffect(()=>{ load(); },[]);
  async function grant(d:any){ setMsg(null); setErr(null); d.amount=Number(d.amount);
    const res=await fetch('/api/transactions/grant',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(d)});
    if(!res.ok){ let m=`Erro ${res.status}`; try{const j=await res.json(); m=j?.error?JSON.stringify(j.error):m;}catch{} setErr(m); return; }
    setMsg('Moedas enviadas com sucesso!'); await load(); }
  async function redeem(d:any){ setMsg(null); setErr(null);
    const res=await fetch('/api/transactions/redeem',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(d)});
    if(!res.ok){ let m=`Erro ${res.status}`; try{const j=await res.json(); m=j?.error?JSON.stringify(j.error):m;}catch{} setErr(m); return; }
    setMsg('Resgate efetuado! Verifique o e-mail.'); await load(); }
  return (<main className="grid" style={{gap:24}}>
    <h2 className="h2">Transações</h2>
    {err&&<div className="alert error">{err}</div>}{msg&&<div className="alert success">{msg}</div>}
    <section className="card grid"><h3 className="h3">Envio de Moedas (Professor ➜ Aluno)</h3>
      <Form initial={{ professorId:'', alunoId:'', amount:'', message:'' } as any}
        fields={[{name:'professorId',label:'Professor ID'},{name:'alunoId',label:'Aluno ID'},{name:'amount',label:'Quantidade',type:'number'},{name:'message',label:'Motivo'}]}
        onSubmit={grant} submitText="Enviar moedas" />
      <div className="mono">Professores: {profs.map(p=>`${p.nome} (${p.id}) saldo=${p.saldoMoedas}`).join(' | ')}</div>
      <div className="mono">Alunos: {alunos.map(a=>`${a.nome} (${a.id}) saldo=${a.saldoMoedas}`).join(' | ')}</div>
    </section>
    <section className="card grid"><h3 className="h3">Resgate de Vantagem (Aluno ➜ Empresa)</h3>
      <Form initial={{ alunoId:'', vantagemId:'' } as any}
        fields={[{name:'alunoId',label:'Aluno ID'},{name:'vantagemId',label:'Vantagem ID'}]}
        onSubmit={redeem} submitText="Resgatar" />
      <div className="mono">Vantagens: {vants.map(v=>`${v.titulo} (${v.id}) custo=${v.custoEmMoedas}`).join(' | ')}</div>
    </section>
  </main>);}
