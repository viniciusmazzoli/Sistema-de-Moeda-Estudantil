
'use client';
import { useState } from 'react';
type Props<T>={ initial:T, fields:{name:keyof T;label:string;type?:string}[], onSubmit:(data:T)=>Promise<void>, submitText?:string };
export default function Form<T extends Record<string,any>>({initial,fields,onSubmit,submitText='Salvar'}:Props<T>){
  const [data,setData]=useState<T>(initial); const [loading,setLoading]=useState(false); const [error,setError]=useState<string|null>(null); const [ok,setOk]=useState<string|null>(null);
  async function handleSubmit(e:React.FormEvent){ e.preventDefault(); setLoading(true); setError(null); setOk(null);
    try{ await onSubmit(data); setOk('Salvo com sucesso!'); }catch(err:any){ setError(err?.message??'Erro'); }finally{ setLoading(false); } }
  return (<form onSubmit={handleSubmit} className="grid" style={{maxWidth:620}}>{error&&<div className="alert error">{error}</div>}{ok&&<div className="alert success">{ok}</div>}
    {fields.map(f=>(<label key={String(f.name)} className="grid"><span className="label">{f.label}</span>
      <input className="input" type={f.type??'text'} value={data[f.name]??''} onChange={e=>setData({...data,[f.name]:e.target.value})}/></label>))}
    <button disabled={loading} className={"btn "+(loading?"":"primary")}>{loading?'Enviando…':submitText}</button></form>);
}
