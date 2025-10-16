"use client"

import type React from "react"

import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { Building2 } from "lucide-react"

export default function EmpresaSignUpPage() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    repeatPassword: "",
    nome: "",
    cnpj: "",
    endereco: "",
  })
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

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
            user_type: "empresa",
            nome: formData.nome,
          },
        },
      })

      if (authError) throw authError

      if (authData.user) {
        // Criar perfil de empresa
        const { error: profileError } = await supabase.from("empresas_parceiras").insert({
          id: authData.user.id,
          email: formData.email,
          nome: formData.nome,
          cnpj: formData.cnpj,
          endereco: formData.endereco,
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
      <div className="w-full max-w-xl">
        <div className="flex flex-col gap-6">
          <div className="flex justify-center mb-4">
            <div className="bg-primary/10 p-3 rounded-full">
              <Building2 className="h-10 w-10 text-primary" />
            </div>
          </div>
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">Cadastro de Empresa</CardTitle>
              <CardDescription>Cadastre sua empresa para oferecer vantagens aos alunos</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSignUp}>
                <div className="flex flex-col gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="nome">Nome da Empresa</Label>
                    <Input
                      id="nome"
                      required
                      value={formData.nome}
                      onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
                    />
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="grid gap-2">
                      <Label htmlFor="cnpj">CNPJ</Label>
                      <Input
                        id="cnpj"
                        required
                        placeholder="00.000.000/0000-00"
                        value={formData.cnpj}
                        onChange={(e) => setFormData({ ...formData, cnpj: e.target.value })}
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
                    {isLoading ? "Cadastrando..." : "Cadastrar Empresa"}
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
