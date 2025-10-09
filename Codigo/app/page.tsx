import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardSidebar } from "@/components/dashboard-sidebar"
import { MetricsGrid } from "@/components/metrics-grid"
import { DevelopmentBanner } from "@/components/development-banner"

export default function DashboardPage() {
  return (
    <div className="flex min-h-screen bg-background">
      <DashboardSidebar />
      <div className="flex-1 flex flex-col">
        <DashboardHeader />
        <main className="flex-1 p-6 lg:p-8">
          <DevelopmentBanner />
          <MetricsGrid />
        </main>
      </div>
    </div>
  )
}
