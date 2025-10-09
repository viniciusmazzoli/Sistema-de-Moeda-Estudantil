import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { TrendingUp, Users, Activity, DollarSign, ArrowUpRight, ArrowDownRight } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"

const metrics = [
  {
    title: "Total de Usuários",
    value: "---",
    change: "+---%",
    trend: "up",
    icon: Users,
    loading: true,
  },
  {
    title: "Receita",
    value: "R$ ---",
    change: "+---%",
    trend: "up",
    icon: DollarSign,
    loading: true,
  },
  {
    title: "Taxa de Conversão",
    value: "---%",
    change: "--%",
    trend: "down",
    icon: TrendingUp,
    loading: true,
  },
  {
    title: "Atividade",
    value: "--- eventos",
    change: "+---%",
    trend: "up",
    icon: Activity,
    loading: true,
  },
]

export function MetricsGrid() {
  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {metrics.map((metric) => (
          <Card key={metric.title} className="bg-card border-border">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">{metric.title}</CardTitle>
              <metric.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {metric.loading ? (
                  <Skeleton className="h-8 w-24 bg-muted" />
                ) : (
                  <div className="text-2xl font-bold text-foreground">{metric.value}</div>
                )}
                <div className="flex items-center gap-2">
                  {metric.loading ? (
                    <Skeleton className="h-5 w-16 bg-muted" />
                  ) : (
                    <Badge
                      variant="secondary"
                      className={
                        metric.trend === "up"
                          ? "bg-primary/20 text-primary hover:bg-primary/30"
                          : "bg-destructive/20 text-destructive hover:bg-destructive/30"
                      }
                    >
                      {metric.trend === "up" ? (
                        <ArrowUpRight className="h-3 w-3 mr-1" />
                      ) : (
                        <ArrowDownRight className="h-3 w-3 mr-1" />
                      )}
                      {metric.change}
                    </Badge>
                  )}
                  <span className="text-xs text-muted-foreground">vs. mês anterior</span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="text-foreground">Requisições</CardTitle>
            <CardDescription className="text-muted-foreground">Últimas 12 horas</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[200px] flex items-center justify-center border border-dashed border-border rounded-lg">
              <div className="text-center space-y-2">
                <Activity className="h-8 w-8 text-muted-foreground mx-auto" />
                <p className="text-sm text-muted-foreground">Gráfico em desenvolvimento</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="text-foreground">Transferência de Dados</CardTitle>
            <CardDescription className="text-muted-foreground">Entrada e saída</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[200px] flex items-center justify-center border border-dashed border-border rounded-lg">
              <div className="text-center space-y-2">
                <TrendingUp className="h-8 w-8 text-muted-foreground mx-auto" />
                <p className="text-sm text-muted-foreground">Gráfico em desenvolvimento</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle className="text-foreground">Atividades Recentes</CardTitle>
          <CardDescription className="text-muted-foreground">Últimas ações no sistema</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex items-center gap-4 p-3 rounded-lg bg-muted/30">
                <Skeleton className="h-10 w-10 rounded-full bg-muted" />
                <div className="flex-1 space-y-2">
                  <Skeleton className="h-4 w-3/4 bg-muted" />
                  <Skeleton className="h-3 w-1/2 bg-muted" />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
