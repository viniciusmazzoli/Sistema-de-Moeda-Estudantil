import { createClient } from "@/lib/supabase/server"
import type { Instituicao } from "@/lib/models/instituicao.model"

export class InstituicaoRepository {
  async findAll(): Promise<Instituicao[]> {
    const supabase = await createClient()
    const { data, error } = await supabase.from("instituicoes").select("*").order("nome", { ascending: true })

    if (error) {
      console.error("[v0] Error finding instituicoes:", error)
      return []
    }

    return data || []
  }

  async findById(id: string): Promise<Instituicao | null> {
    const supabase = await createClient()
    const { data, error } = await supabase.from("instituicoes").select("*").eq("id", id).single()

    if (error) {
      console.error("[v0] Error finding instituicao:", error)
      return null
    }

    return data
  }
}
