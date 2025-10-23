
import './globals.css';
import Link from 'next/link';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import dynamic from 'next/dynamic';
const AuthButtons = dynamic(() => import('@/components/AuthButtons'), { ssr: false });
export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const session = await getServerSession(authOptions);
  return (
    <html lang="pt-BR"><body><div className="container">
      <header className="header">
        <div className="brand">Moeda Estudantil</div>
        <nav className="nav">
          <Link href="/">Home</Link>
          <Link href="/dashboard">Dashboard</Link>
          <Link href="/alunos">Alunos</Link>
          <Link href="/empresas">Empresas</Link>
          <Link href="/vantagens">Vantagens</Link>
          <Link href="/transacoes">Transações</Link>
          <Link href="/extrato">Extrato</Link>
          <Link href="/parceiro">Parceiro</Link>
        </nav>
        {session ? <AuthButtons role={(session as any).role as string}/> : <div className="nav"><Link href="/login" className="btn">Entrar</Link></div>}
      </header>
      {children}
    </div></body></html>
  );
}
