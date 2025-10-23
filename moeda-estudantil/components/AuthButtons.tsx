
'use client';
import { signOut } from 'next-auth/react';
export default function AuthButtons({ role }: { role?: string }) {
  return (
    <div className="nav">
      {role && <span className="badge">{role}</span>}
      <button className="btn" onClick={() => signOut({ callbackUrl: '/login' })}>Sair</button>
    </div>
  );
}
