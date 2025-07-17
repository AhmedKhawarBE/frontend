import { MetricsGrid } from "@/components/metrics-grid"
import { KPICards } from "@/components/kpi-cards"
import { MetricsHeader } from "@/components/metrics-header"

export default function DashboardPage() {
  return (
    <div className="p-6 space-y-6">
      <MetricsHeader />
      <div className="flex gap-6">
        <div className="flex-1">
          <MetricsGrid />
        </div>
        <div className="w-80">
          <KPICards />
        </div>
      </div>
    </div>
  )
}
