
'use client';
type Column<T>={key:keyof T;header:string};
export default function DataTable<T extends {id:string}>({data,columns,onEdit,onDelete}:{data:T[];columns:Column<T>[];onEdit?:(row:T)=>void;onDelete?:(row:T)=>void;}){
  return (<table className="table card"><thead><tr>{columns.map(c=><th key={String(c.key)}>{c.header}</th>)}<th>Ações</th></tr></thead>
    <tbody>{data.map(row=>(<tr key={row.id}>{columns.map(c=><td key={String(c.key)}>{String((row as any)[c.key]??'')}</td>)}
      <td className="actions">{onEdit&&<button className="btn" onClick={()=>onEdit(row)}>Editar</button>}{onDelete&&<button className="btn danger" onClick={()=>onDelete(row)}>Excluir</button>}</td></tr>))}</tbody></table>);
}
