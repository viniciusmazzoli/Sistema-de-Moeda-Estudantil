
'use client';
import { useEffect, useState } from 'react';
type Item = { id: string; createdAt: string; amount: number; message?: string | null; couponCode?: string | null; professor?: any; aluno?: any; vantagem?: any; };
type Aluno = { id: string; nome: string; saldoMoedas: number };
type Professor = { id: string; nome: string; saldoMoedas: number };
type Empresa = { id: string; nome: string };
export default function ExtratoPage(){
  const [tab, setTab] = useState<'aluno'|'professor'|'empresa'>('aluno');
  const [alunos, setAlunos] = useState<Aluno[]>([]);
  const [profs, setProfs] = useState<Professor[]>([]);
  const [emps, setEmps] = useState<Empresa[]>([]);
  const [id, setId] = useState<string>('');
  const [data, setData] = useState<any>(null);
  const [err, setErr] = useState<string|null>(null);
  useEffect(()=>{ (async () => { const [a,p,e] = await Promise.all([ fetch('/api/alunos').then(r=>r.json()), fetch('/api/professores').then(r=>r.json()).catch(()=>[]), fetch('/api/empresas').then(r=>r.json()) ]); setAlunos(a); setProfs(p); setEmps(e); })(); },[]);
  async function load(){ setErr(null); setData(null); if(!id) { setErr('Selecione um ID'); return; } const url = tab === 'aluno' ? `/api/extrato/aluno/${id}` : tab === 'professor' ? `/api/extrato/professor/${id}` : `/api/extrato/empresa/${id}`; const r = await fetch(url, { cache: 'no-store' }); if(!r.ok){ setErr('Erro ao buscar extrato'); return; } setData(await r.json()); }
  useEffect(()=>{ setId(''); setData(null); },[tab]);
  return (<main className="grid" style={{gap:24}}>
    <h2 className="h2">Extrato</h2>
    <div className="card" style={{display:'flex', gap:12}}>
      <button className={'btn '+(tab==='aluno'?'primary':'')} onClick={()=>setTab('aluno')}>Aluno</button>
      <button className={'btn '+(tab==='professor'?'primary':'')} onClick={()=>setTab('professor')}>Professor</button>
      <button className={'btn '+(tab==='empresa'?'primary':'')} onClick={()=>setTab('empresa')}>Empresa</button>
    </div>
    <div className="card grid">
      {tab==='aluno' && (<label className="grid"><span className="label">Aluno</span><select className="input" value={id} onChange={e=>setId(e.target.value)}><option value="">-- selecione --</option>{alunos.map(a=> <option key={a.id} value={a.id}>{a.nome} ({a.id})</option>)}</select></label>)}
      {tab==='professor' && (<label className="grid"><span className="label">Professor</span><select className="input" value={id} onChange={e=>setId(e.target.value)}><option value="">-- selecione --</option>{profs.map(p=> <option key={p.id} value={p.id}>{p.nome} ({p.id})</option>)}</select></label>)}
      {tab==='empresa' && (<label className="grid"><span className="label">Empresa</span><select className="input" value={id} onChange={e=>setId(e.target.value)}><option value="">-- selecione --</option>{emps.map(p=> <option key={p.id} value={p.id}>{p.nome} ({p.id})</option>)}</select></label>)}
      <button className="btn primary" onClick={load}>Buscar extrato</button>
    </div>
    {err && <div className="alert error">{err}</div>}
    {data && tab==='aluno' && (<section className="grid" style={{gap:16}}>
      <div className="card"><div className="h3">Aluno</div><div className="mono">{data.aluno.nome} • saldo: {data.aluno.saldoMoedas}</div></div>
      <div className="card grid"><div className="h3">Recebimentos</div><table className="table"><thead><tr><th>Data</th><th>Professor</th><th>Qtd</th><th>Motivo</th></tr></thead><tbody>{data.recebimentos.map((t:Item)=>(<tr key={t.id}><td>{new Date(t.createdAt).toLocaleString()}</td><td>{t.professor?.nome}</td><td>{t.amount}</td><td>{t.message}</td></tr>))}</tbody></table></div>
      <div className="card grid"><div className="h3">Resgates</div><table className="table"><thead><tr><th>Data</th><th>Vantagem</th><th>Empresa</th><th>Custo</th><th>Cupom</th></tr></thead><tbody>{data.resgates.map((t:Item)=>(<tr key={t.id}><td>{new Date(t.createdAt).toLocaleString()}</td><td>{t.vantagem?.titulo}</td><td>{t.vantagem?.empresaParceira?.nome}</td><td>{t.amount}</td><td className="mono">{t.couponCode}</td></tr>))}</tbody></table></div>
    </section>)}
    {data && tab==='professor' && (<section className="grid" style={{gap:16}}>
      <div className="card"><div className="h3">Professor</div><div className="mono">{data.professor.nome} • saldo: {data.professor.saldoMoedas}</div></div>
      <div className="card grid"><div className="h3">Envios</div><table className="table"><thead><tr><th>Data</th><th>Aluno</th><th>Qtd</th><th>Motivo</th></tr></thead><tbody>{data.envios.map((t:Item)=>(<tr key={t.id}><td>{new Date(t.createdAt).toLocaleString()}</td><td>{t.aluno?.nome}</td><td>{t.amount}</td><td>{t.message}</td></tr>))}</tbody></table></div>
    </section>)}
    {data && tab==='empresa' && (<section className="grid" style={{gap:16}}>
      <div className="card"><div className="h3">Empresa</div><div className="mono">{data.empresa.nome}</div></div>
      <div className="card grid"><div className="h3">Resgates</div><table className="table"><thead><tr><th>Data</th><th>Aluno</th><th>Vantagem</th><th>Custo</th><th>Cupom</th></tr></thead><tbody>{data.resgates.map((t:Item)=>(<tr key={t.id}><td>{new Date(t.createdAt).toLocaleString()}</td><td>{t.alunoResgate?.nome}</td><td>{t.vantagem?.titulo}</td><td>{t.amount}</td><td className="mono">{t.couponCode}</td></tr>))}</tbody></table></div>
    </section>)}
  </main>);
}
