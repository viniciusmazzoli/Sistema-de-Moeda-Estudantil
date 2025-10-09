import { Construction, Code2, Sparkles } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

export function DevelopmentBanner() {
  return (
    <Alert className="mb-6 border-accent/50 bg-accent/10">
      <Construction className="h-5 w-5 text-accent" />
      <AlertTitle className="text-accent-foreground font-semibold">🚧 Dashboard em Desenvolvimento</AlertTitle>
      <AlertDescription className="text-muted-foreground">
        Esta interface está sendo construída. Novas funcionalidades e métricas serão adicionadas em breve.
        <div className="flex items-center gap-4 mt-3 text-xs">
          <span className="flex items-center gap-1.5">
            <Code2 className="h-3.5 w-3.5" />
            Componentes em progresso
          </span>
          <span className="flex items-center gap-1.5">
            <Sparkles className="h-3.5 w-3.5" />
            Dados simulados
          </span>
        </div>
      </AlertDescription>
    </Alert>
  )
}
