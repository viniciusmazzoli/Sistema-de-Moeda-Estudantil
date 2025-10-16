import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Coins, LogOut } from "lucide-react"

export default async function DashboardPage() {
  const supabase = await createClient()

  const { data, error } = await supabase.auth.getUser()
  if (error || !data?.user) {
    redirect("/auth/login")
  }

  // Verificar tipo de usuário
  const { data: aluno } = await supabase.from("alunos").select("*").eq("id", data.user.id).single()

  const { data: empresa } = await supabase.from("empresas_parceiras").select("*").eq("id", data.user.id).single()

  const userType = aluno ? "aluno" : empresa ? "empresa" : "professor"
  const userName = aluno?.nome || empresa?.nome || "Usuário"
  const saldo = aluno?.saldo_moedas || 0

  async function handleLogout() {
    "use server"
    const supabase = await createClient()
    await supabase.auth.signOut()
    redirect("/")
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted">
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center gap-3">
            <div className="bg-primary/10 p-2 rounded-full">
              <Coins className="h-8 w-8 text-primary" />
            </div>
            <div>
              <h1 className="text-3xl font-bold">Dashboard</h1>
              <p className="text-muted-foreground">Bem-vindo, {userName}!</p>
            </div>
          </div>
          <form action={handleLogout}>
            <Button variant="outline" type="submit">
              <LogOut className="mr-2 h-4 w-4" />
              Sair
            </Button>
          </form>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Tipo de Conta</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold capitalize">{userType}</p>
            </CardContent>
          </Card>

          {aluno && (
            <Card>
              <CardHeader>
                <CardTitle>Saldo de Moedas</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold">{saldo.toFixed(2)}</p>
              </CardContent>
            </Card>
          )}

          <Card>
            <CardHeader>
              <CardTitle>Email</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">{data.user.email}</p>
            </CardContent>
          </Card>
        </div>

        <div className="mt-8">
          <Card>
            <CardHeader>
              <CardTitle>Sistema em Desenvolvimento</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Este é o dashboard básico do Sistema de Moeda Estudantil. As funcionalidades completas serão
                implementadas na Sprint 03.
              </p>
              <div className="mt-4 space-y-2">
                <p className="text-sm">✅ Sprint 01: Modelagem completa</p>
                <p className="text-sm">✅ Sprint 02: Banco de dados e CRUDs de Aluno e Empresa</p>
                <p className="text-sm">⏳ Sprint 03: Funcionalidades completas (próxima etapa)</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
