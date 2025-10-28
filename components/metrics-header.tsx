import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export function MetricsHeader() {
  return (
    <div className="flex items-center justify-between">
      <h2 className="text-2xl font-semibold text-slate-800">My Metrics</h2>

      <div className="flex items-center space-x-4">
        {/* <Select defaultValue="agents">
          <SelectTrigger className="w-32">
            <SelectValue placeholder="Agents" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="agents">Agents</SelectItem>
            <SelectItem value="all">All</SelectItem>
          </SelectContent>
        </Select>

        <Select defaultValue="primary">
          <SelectTrigger className="w-32">
            <SelectValue placeholder="Primary" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="primary">Primary</SelectItem>
            <SelectItem value="secondary">Secondary</SelectItem>
          </SelectContent>
        </Select> */}

        <div className="flex items-center space-x-2">
          {/* <Button variant="ghost" size="sm" className="text-slate-600">
            3 h
          </Button>
          <Button variant="ghost" size="sm" className="text-slate-600">
            12 h
          </Button>
          <Button variant="ghost" size="sm" className="text-slate-600">
            1 d
          </Button>
          <Button variant="ghost" size="sm" className="text-slate-600">
            1 w
          </Button>
          <Button variant="ghost" size="sm" className="text-slate-600">
            1 m
          </Button>
          <Button variant="default" size="sm" className="bg-yellow-500 hover:bg-yellow-600 text-white">
            Custom (4w)
          </Button> */}
        </div>
      </div>
    </div>
  )
}
