"use client"

import type React from "react"

import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState, useEffect } from "react"
import { Coins } from "lucide-react"
import type { Instituicao } from "@/lib/models/instituicao.model"

export default function AlunoSignUpPage() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    repeatPassword: "",
    nome: "",
    cpf: "",
    rg: "",
    endereco: "",
    curso: "",
    instituicao_id: "",
  })
  const [instituicoes, setInstituicoes] = useState<Instituicao[]>([])
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  useEffect(() => {
    async function loadInstituicoes() {
      const supabase = createClient()
      const { data } = await supabase.from("instituicoes").select("*").order("nome")
      if (data) setInstituicoes(data)
    }
    loadInstituicoes()
  }, [])

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault()
    const supabase = createClient()
    setIsLoading(true)
    setError(null)

    if (formData.password !== formData.repeatPassword) {
      setError("As senhas não coincidem")
      setIsLoading(false)
      return
    }

    try {
      // Criar usuário no auth
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          emailRedirectTo: process.env.NEXT_PUBLIC_DEV_SUPABASE_REDIRECT_URL || `${window.location.origin}/dashboard`,
          data: {
            user_type: "aluno",
            nome: formData.nome,
          },
        },
      })

      if (authError) throw authError

      if (authData.user) {
        // Criar perfil de aluno
        const { error: profileError } = await supabase.from("alunos").insert({
          id: authData.user.id,
          email: formData.email,
          nome: formData.nome,
          cpf: formData.cpf,
          rg: formData.rg,
          endereco: formData.endereco,
          curso: formData.curso,
          instituicao_id: formData.instituicao_id,
        })

        if (profileError) throw profileError
      }

      router.push("/auth/sign-up-success")
    } catch (error: unknown) {
      setError(error instanceof Error ? error.message : "Erro ao cadastrar")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen w-full items-center justify-center p-6 md:p-10 bg-gradient-to-b from-background to-muted">
      <div className="w-full max-w-2xl">
        <div className="flex flex-col gap-6">
          <div className="flex justify-center mb-4">
            <div className="bg-primary/10 p-3 rounded-full">
              <Coins className="h-10 w-10 text-primary" />
            </div>
          </div>
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">Cadastro de Aluno</CardTitle>
              <CardDescription>Preencha seus dados para começar a receber moedas</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSignUp}>
                <div className="flex flex-col gap-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="grid gap-2">
                      <Label htmlFor="nome">Nome Completo</Label>
                      <Input
                        id="nome"
                        required
                        value={formData.nome}
                        onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="grid gap-2">
                      <Label htmlFor="cpf">CPF</Label>
                      <Input
                        id="cpf"
                        required
                        placeholder="000.000.000-00"
                        value={formData.cpf}
                        onChange={(e) => setFormData({ ...formData, cpf: e.target.value })}
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="rg">RG</Label>
                      <Input
                        id="rg"
                        required
                        value={formData.rg}
                        onChange={(e) => setFormData({ ...formData, rg: e.target.value })}
                      />
                    </div>
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="endereco">Endereço</Label>
                    <Input
                      id="endereco"
                      required
                      value={formData.endereco}
                      onChange={(e) => setFormData({ ...formData, endereco: e.target.value })}
                    />
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="grid gap-2">
                      <Label htmlFor="instituicao">Instituição</Label>
                      <Select
                        value={formData.instituicao_id}
                        onValueChange={(value) => setFormData({ ...formData, instituicao_id: value })}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione" />
                        </SelectTrigger>
                        <SelectContent>
                          {instituicoes.map((inst) => (
                            <SelectItem key={inst.id} value={inst.id}>
                              {inst.nome}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="curso">Curso</Label>
                      <Input
                        id="curso"
                        required
                        value={formData.curso}
                        onChange={(e) => setFormData({ ...formData, curso: e.target.value })}
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="grid gap-2">
                      <Label htmlFor="password">Senha</Label>
                      <Input
                        id="password"
                        type="password"
                        required
                        value={formData.password}
                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="repeat-password">Repetir Senha</Label>
                      <Input
                        id="repeat-password"
                        type="password"
                        required
                        value={formData.repeatPassword}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            repeatPassword: e.target.value,
                          })
                        }
                      />
                    </div>
                  </div>

                  {error && <p className="text-sm text-destructive">{error}</p>}
                  <Button type="submit" className="w-full" disabled={isLoading}>
                    {isLoading ? "Cadastrando..." : "Cadastrar"}
                  </Button>
                </div>
                <div className="mt-4 text-center text-sm">
                  Já tem uma conta?{" "}
                  <Link href="/auth/login" className="underline underline-offset-4">
                    Fazer login
                  </Link>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
