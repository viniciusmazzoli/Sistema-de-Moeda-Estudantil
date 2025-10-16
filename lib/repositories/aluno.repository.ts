import { createClient } from "@/lib/supabase/server"
import type { Aluno, CreateAlunoDTO, UpdateAlunoDTO } from "@/lib/models/aluno.model"

export class AlunoRepository {
  async findById(id: string): Promise<Aluno | null> {
    const supabase = await createClient()
    const { data, error } = await supabase.from("alunos").select("*").eq("id", id).single()

    if (error) {
      console.error("[v0] Error finding aluno:", error)
      return null
    }

    return data
  }

  async findByEmail(email: string): Promise<Aluno | null> {
    const supabase = await createClient()
    const { data, error } = await supabase.from("alunos").select("*").eq("email", email).single()

    if (error) {
      console.error("[v0] Error finding aluno by email:", error)
      return null
    }

    return data
  }

  async findAll(): Promise<Aluno[]> {
    const supabase = await createClient()
    const { data, error } = await supabase.from("alunos").select("*").order("created_at", { ascending: false })

    if (error) {
      console.error("[v0] Error finding all alunos:", error)
      return []
    }

    return data || []
  }

  async create(userId: string, dto: Omit<CreateAlunoDTO, "email" | "password">): Promise<Aluno | null> {
    const supabase = await createClient()

    const { data: user } = await supabase.auth.getUser()
    if (!user.user) {
      console.error("[v0] No authenticated user")
      return null
    }

    const { data, error } = await supabase
      .from("alunos")
      .insert({
        id: userId,
        email: user.user.email!,
        ...dto,
      })
      .select()
      .single()

    if (error) {
      console.error("[v0] Error creating aluno:", error)
      return null
    }

    return data
  }

  async update(id: string, dto: UpdateAlunoDTO): Promise<Aluno | null> {
    const supabase = await createClient()
    const { data, error } = await supabase.from("alunos").update(dto).eq("id", id).select().single()

    if (error) {
      console.error("[v0] Error updating aluno:", error)
      return null
    }

    return data
  }

  async delete(id: string): Promise<boolean> {
    const supabase = await createClient()
    const { error } = await supabase.from("alunos").delete().eq("id", id)

    if (error) {
      console.error("[v0] Error deleting aluno:", error)
      return false
    }

    return true
  }
}
