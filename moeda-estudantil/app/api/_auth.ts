
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
export async function requireRole(roles: string[]) {
  const session = await getServerSession(authOptions);
  if (!session) return { ok: false, status: 401 as const, message: "Não autenticado" };
  const role = (session as any).role as string | undefined;
  if (!role || !roles.includes(role)) return { ok: false, status: 403 as const, message: "Sem permissão" };
  return { ok: true, role, session };
}
