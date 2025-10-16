import { createClient } from "@/lib/supabase/server"
import type { EmpresaParceira, CreateEmpresaDTO, UpdateEmpresaDTO } from "@/lib/models/empresa.model"

export class EmpresaRepository {
  async findById(id: string): Promise<EmpresaParceira | null> {
    const supabase = await createClient()
    const { data, error } = await supabase.from("empresas_parceiras").select("*").eq("id", id).single()

    if (error) {
      console.error("[v0] Error finding empresa:", error)
      return null
    }

    return data
  }

  async findByEmail(email: string): Promise<EmpresaParceira | null> {
    const supabase = await createClient()
    const { data, error } = await supabase.from("empresas_parceiras").select("*").eq("email", email).single()

    if (error) {
      console.error("[v0] Error finding empresa by email:", error)
      return null
    }

    return data
  }

  async findAll(): Promise<EmpresaParceira[]> {
    const supabase = await createClient()
    const { data, error } = await supabase
      .from("empresas_parceiras")
      .select("*")
      .order("created_at", { ascending: false })

    if (error) {
      console.error("[v0] Error finding all empresas:", error)
      return []
    }

    return data || []
  }

  async create(userId: string, dto: Omit<CreateEmpresaDTO, "email" | "password">): Promise<EmpresaParceira | null> {
    const supabase = await createClient()

    const { data: user } = await supabase.auth.getUser()
    if (!user.user) {
      console.error("[v0] No authenticated user")
      return null
    }

    const { data, error } = await supabase
      .from("empresas_parceiras")
      .insert({
        id: userId,
        email: user.user.email!,
        ...dto,
      })
      .select()
      .single()

    if (error) {
      console.error("[v0] Error creating empresa:", error)
      return null
    }

    return data
  }

  async update(id: string, dto: UpdateEmpresaDTO): Promise<EmpresaParceira | null> {
    const supabase = await createClient()
    const { data, error } = await supabase.from("empresas_parceiras").update(dto).eq("id", id).select().single()

    if (error) {
      console.error("[v0] Error updating empresa:", error)
      return null
    }

    return data
  }

  async delete(id: string): Promise<boolean> {
    const supabase = await createClient()
    const { error } = await supabase.from("empresas_parceiras").delete().eq("id", id)

    if (error) {
      console.error("[v0] Error deleting empresa:", error)
      return false
    }

    return true
  }
}
