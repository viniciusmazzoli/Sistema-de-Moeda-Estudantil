
import { z } from "zod";
export const alunoSchema = z.object({ nome: z.string().min(2), email: z.string().email(), cpf: z.string().min(11), rg: z.string().min(5), endereco: z.string().min(3), curso: z.string().min(2), instituicaoId: z.string().uuid().optional().nullable() });
export const empresaSchema = z.object({ nome: z.string().min(2), email: z.string().email(), cnpj: z.string().min(14), endereco: z.string().min(3) });
export const vantagemSchema = z.object({ titulo: z.string().min(2), descricao: z.string().min(5), custoEmMoedas: z.number().int().min(1), fotoUrl: z.string().url().optional().nullable(), empresaParceiraId: z.string().uuid() });
export const grantSchema = z.object({ professorId: z.string().uuid(), alunoId: z.string().uuid(), amount: z.number().int().positive(), message: z.string().min(3) });
export const redeemSchema = z.object({ alunoId: z.string().uuid(), vantagemId: z.string().uuid() });
