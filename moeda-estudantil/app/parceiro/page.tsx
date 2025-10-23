
'use client';
import { useEffect, useState } from 'react';
export default function ParceiroPage(){
  const [empresas, setEmpresas] = useState<any[]>([]);
  const [id, setId] = useState<string>('');
  const [data, setData] = useState<any>(null);
  useEffect(()=>{ (async()=>{ const e = await fetch('/api/empresas').then(r=>r.json()); setEmpresas(e); })(); },[]);
  async function load(){ if(!id) return; const r = await fetch('/api/extrato/empresa/'+id, { cache: 'no-store' }); if(r.ok) setData(await r.json()); }
  return (<main className="grid" style={{gap:24}}>
    <h2 className="h2">Painel do Parceiro</h2>
    <div className="card grid">
      <label className="grid"><span className="label">Empresa</span>
        <select className="input" value={id} onChange={e=>setId(e.target.value)}><option value="">-- selecione --</option>{empresas.map((e:any)=> <option key={e.id} value={e.id}>{e.nome} ({e.id})</option>)}</select>
      </label>
      <button className="btn primary" onClick={load}>Abrir</button>
    </div>
    {data && (<section className="card grid">
      <div className="h3">Resgates</div>
      <table className="table"><thead><tr><th>Data</th><th>Aluno</th><th>Vantagem</th><th>Custo</th><th>Cupom</th></tr></thead>
      <tbody>{data.resgates.map((t:any)=>(<tr key={t.id}><td>{new Date(t.createdAt).toLocaleString()}</td><td>{t.alunoResgate?.nome}</td><td>{t.vantagem?.titulo}</td><td>{t.amount}</td><td className="mono">{t.couponCode}</td></tr>))}</tbody></table>
    </section>)}
  </main>);
}
