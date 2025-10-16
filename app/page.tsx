import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Coins, GraduationCap, Building2, ArrowRight } from "lucide-react"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <div className="flex justify-center mb-6">
            <div className="bg-primary/10 p-4 rounded-full">
              <Coins className="h-16 w-16 text-primary" />
            </div>
          </div>
          <h1 className="text-5xl font-bold mb-4 text-balance">Sistema de Moeda Estudantil</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto text-pretty">
            Reconheça o mérito estudantil através de moedas virtuais. Professores distribuem, alunos trocam por
            vantagens.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto mb-16">
          <Card className="border-2 hover:border-primary transition-colors">
            <CardHeader>
              <div className="bg-blue-100 dark:bg-blue-900/20 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                <GraduationCap className="h-6 w-6 text-blue-600 dark:text-blue-400" />
              </div>
              <CardTitle>Para Alunos</CardTitle>
              <CardDescription>Receba moedas por bom comportamento e troque por vantagens</CardDescription>
            </CardHeader>
            <CardContent>
              <Link href="/auth/aluno/sign-up">
                <Button className="w-full bg-transparent" variant="outline">
                  Cadastrar como Aluno
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="border-2 hover:border-primary transition-colors">
            <CardHeader>
              <div className="bg-green-100 dark:bg-green-900/20 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                <GraduationCap className="h-6 w-6 text-green-600 dark:text-green-400" />
              </div>
              <CardTitle>Para Professores</CardTitle>
              <CardDescription>Distribua moedas e reconheça seus melhores alunos</CardDescription>
            </CardHeader>
            <CardContent>
              <Link href="/auth/login">
                <Button className="w-full bg-transparent" variant="outline">
                  Login Professor
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="border-2 hover:border-primary transition-colors">
            <CardHeader>
              <div className="bg-purple-100 dark:bg-purple-900/20 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                <Building2 className="h-6 w-6 text-purple-600 dark:text-purple-400" />
              </div>
              <CardTitle>Para Empresas</CardTitle>
              <CardDescription>Ofereça vantagens e atraia estudantes para seu negócio</CardDescription>
            </CardHeader>
            <CardContent>
              <Link href="/auth/empresa/sign-up">
                <Button className="w-full bg-transparent" variant="outline">
                  Cadastrar Empresa
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>

        <div className="text-center">
          <p className="text-muted-foreground mb-4">Já possui uma conta?</p>
          <Link href="/auth/login">
            <Button size="lg">Fazer Login</Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
