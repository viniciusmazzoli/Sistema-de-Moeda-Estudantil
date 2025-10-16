import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { CheckCircle2 } from "lucide-react"

export default function SignUpSuccessPage() {
  return (
    <div className="flex min-h-screen w-full items-center justify-center p-6 md:p-10 bg-gradient-to-b from-background to-muted">
      <div className="w-full max-w-md">
        <div className="flex flex-col gap-6">
          <div className="flex justify-center">
            <div className="bg-green-100 dark:bg-green-900/20 p-4 rounded-full">
              <CheckCircle2 className="h-16 w-16 text-green-600 dark:text-green-400" />
            </div>
          </div>
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl text-center">Cadastro Realizado!</CardTitle>
              <CardDescription className="text-center">Verifique seu email para confirmar sua conta</CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-sm text-muted-foreground mb-6">
                Enviamos um email de confirmação para você. Por favor, clique no link do email para ativar sua conta
                antes de fazer login.
              </p>
              <Link href="/auth/login">
                <Button className="w-full">Ir para Login</Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
