import { LayoutDashboard, BarChart3, Users, Settings, Database, Activity } from "lucide-react"
import { cn } from "@/lib/utils"

const menuItems = [
  { icon: LayoutDashboard, label: "Visão Geral", active: true },
  { icon: BarChart3, label: "Analytics", active: false },
  { icon: Users, label: "Usuários", active: false },
  { icon: Database, label: "Dados", active: false },
  { icon: Activity, label: "Monitoramento", active: false },
  { icon: Settings, label: "Configurações", active: false },
]

export function DashboardSidebar() {
  return (
    <aside className="w-64 border-r border-border bg-sidebar">
      <div className="p-6">
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
            <span className="text-lg font-bold text-primary-foreground">D</span>
          </div>
          <span className="text-lg font-semibold text-sidebar-foreground">Dashboard</span>
        </div>
      </div>

      <nav className="px-3 space-y-1">
        {menuItems.map((item) => (
          <button
            key={item.label}
            className={cn(
              "w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors",
              item.active
                ? "bg-sidebar-accent text-sidebar-accent-foreground"
                : "text-sidebar-foreground/60 hover:bg-sidebar-accent/50 hover:text-sidebar-foreground",
            )}
          >
            <item.icon className="h-5 w-5" />
            {item.label}
          </button>
        ))}
      </nav>
    </aside>
  )
}
