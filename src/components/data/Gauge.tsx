import { useState, useEffect } from 'react'
import { TrendingUp, Zap, Server, Wifi } from 'lucide-react'

export interface GaugeProps {
  value: number
  max?: number
  size?: number
  strokeWidth?: number
  color?: string
  trackColor?: string
  label?: string
  unit?: string
  icon?: React.ReactNode
}

export function Gauge({ value, max = 100, size = 120, strokeWidth = 10, color = '#0ea5e9', trackColor = '#f1f5f9', label, unit = '%', icon }: GaugeProps) {
  const pct = Math.max(0, Math.min(1, value / max))
  const r = (size - strokeWidth) / 2
  const cx = size / 2
  const cy = size / 2

  // Arc spans 240° starting from 150° (bottom-left)
  const startAngle = 150
  const sweep = 240
  const endAngle = startAngle + sweep * pct

  const toRad = (deg: number) => (deg * Math.PI) / 180
  const arcPath = (start: number, end: number, color: string) => {
    const s = { x: cx + r * Math.cos(toRad(start)), y: cy + r * Math.sin(toRad(start)) }
    const e = { x: cx + r * Math.cos(toRad(end)),   y: cy + r * Math.sin(toRad(end)) }
    const large = (end - start) > 180 ? 1 : 0
    return `M ${s.x} ${s.y} A ${r} ${r} 0 ${large} 1 ${e.x} ${e.y}`
  }

  const trackEnd = startAngle + sweep

  return (
    <div className="flex flex-col items-center gap-1">
      <div className="relative" style={{ width: size, height: size }}>
        <svg width={size} height={size}>
          {/* Track */}
          <path d={arcPath(startAngle, trackEnd, trackColor)}
            fill="none" stroke={trackColor} strokeWidth={strokeWidth} strokeLinecap="round" />
          {/* Value arc */}
          {pct > 0 && (
            <path d={arcPath(startAngle, endAngle, color)}
              fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round"
              style={{ transition: 'stroke-dasharray 0.6s ease' }} />
          )}
        </svg>
        {/* Center content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          {icon && <span style={{ color }} className="mb-0.5">{icon}</span>}
          <span className="font-heading font-bold text-slate-800" style={{ fontSize: size * 0.2 }}>
            {Math.round(value)}<span style={{ fontSize: size * 0.12 }} className="text-slate-400 font-normal">{unit}</span>
          </span>
        </div>
      </div>
      {label && <p className="text-xs font-semibold text-slate-500 text-center">{label}</p>}
    </div>
  )
}

export function MultiArcGauge({ metrics }: { metrics: { label: string; value: number; color: string }[] }) {
  const size    = 200
  const strokeW = 14
  const gap     = 8
  const cx = size / 2, cy = size / 2
  const toRad = (deg: number) => (deg * Math.PI) / 180
  const startAngle = 150
  const sweep  = 240

  // Build radii from outside → inside so the first metric gets the biggest ring
  const outerR = cx - strokeW / 2 - 4
  const step   = strokeW + gap

  const arc = (r: number, start: number, end: number) => {
    const s = { x: cx + r * Math.cos(toRad(start)), y: cy + r * Math.sin(toRad(start)) }
    const e = { x: cx + r * Math.cos(toRad(end)),   y: cy + r * Math.sin(toRad(end)) }
    const large = (end - start) > 180 ? 1 : 0
    return `M ${s.x} ${s.y} A ${r} ${r} 0 ${large} 1 ${e.x} ${e.y}`
  }

  const overall = Math.round(metrics.reduce((a, m) => a + m.value, 0) / metrics.length)

  return (
    <div className="flex items-center gap-6">
      {/* Arc SVG */}
      <div className="relative shrink-0" style={{ width: size, height: size }}>
        <svg width={size} height={size}>
          {metrics.map((m, i) => {
            const r        = outerR - i * step
            const pct      = m.value / 100
            const trackEnd = startAngle + sweep
            const valueEnd = startAngle + sweep * pct
            return (
              <g key={m.label}>
                <path d={arc(r, startAngle, trackEnd)}
                  fill="none" stroke="#f1f5f9" strokeWidth={strokeW} strokeLinecap="round" />
                {pct > 0 && (
                  <path d={arc(r, startAngle, valueEnd)}
                    fill="none" stroke={m.color} strokeWidth={strokeW} strokeLinecap="round" />
                )}
              </g>
            )
          })}
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-0.5">
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Overall</p>
          <p className="font-heading font-bold text-slate-800" style={{ fontSize: 32 }}>{overall}%</p>
        </div>
      </div>

      {/* Legend */}
      <div className="flex flex-col gap-4 flex-1">
        {metrics.map((m, i) => {
          const r = outerR - i * step
          return (
            <div key={m.label} className="space-y-1.5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full shrink-0" style={{ background: m.color }} />
                  <span className="text-sm font-medium text-slate-700">{m.label}</span>
                </div>
                <span className="text-sm font-bold tabular-nums" style={{ color: m.color }}>{m.value}%</span>
              </div>
              {/* Mini track bar */}
              <div className="h-1.5 rounded-full bg-slate-100 overflow-hidden">
                <div className="h-full rounded-full transition-all duration-700"
                  style={{ width: `${m.value}%`, background: m.color }} />
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

function LiveGauge() {
  const [cpu, setCpu]  = useState(42)
  const [mem, setMem]  = useState(67)
  const [net, setNet]  = useState(28)
  const [disk, setDisk] = useState(81)

  useEffect(() => {
    const id = setInterval(() => {
      setCpu(v  => Math.max(5,  Math.min(95, v + (Math.random() - 0.5) * 12)))
      setMem(v  => Math.max(40, Math.min(90, v + (Math.random() - 0.5) * 5)))
      setNet(v  => Math.max(2,  Math.min(80, v + (Math.random() - 0.5) * 18)))
      setDisk(v => Math.max(70, Math.min(95, v + (Math.random() - 0.5) * 2)))
    }, 1500)
    return () => clearInterval(id)
  }, [])

  const cpuColor  = cpu  > 80 ? '#ef4444' : cpu  > 60 ? '#f59e0b' : '#10b981'
  const memColor  = mem  > 80 ? '#ef4444' : mem  > 60 ? '#f59e0b' : '#0ea5e9'
  const netColor  = '#8b5cf6'
  const diskColor = disk > 85 ? '#ef4444' : '#f59e0b'

  return (
    <div className="grid grid-cols-4 gap-4">
      <Gauge value={cpu}  color={cpuColor}  label="CPU"    icon={<Zap className="w-3.5 h-3.5" />} />
      <Gauge value={mem}  color={memColor}  label="Memory" icon={<Server className="w-3.5 h-3.5" />} />
      <Gauge value={net}  color={netColor}  label="Network" unit="Mb" max={100} icon={<Wifi className="w-3.5 h-3.5" />} />
      <Gauge value={disk} color={diskColor} label="Disk"   icon={<TrendingUp className="w-3.5 h-3.5" />} />
    </div>
  )
}

export function GaugeShowcase() {
  const MULTI = [
    { label: 'Performance', value: 87, color: '#0ea5e9' },
    { label: 'Accessibility', value: 94, color: '#10b981' },
    { label: 'SEO', value: 72, color: '#f59e0b' },
  ]

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-2 gap-8">
        <div>
          <p className="section-label">Single Gauges</p>
          <div className="flex flex-wrap gap-8 items-start">
            <Gauge value={73} color="#0ea5e9"  label="Satisfaction" size={130} />
            <Gauge value={45} color="#8b5cf6"  label="Load speed" unit="ms" max={200} size={130} />
            <Gauge value={91} color="#10b981"  label="Uptime" size={130} />
          </div>
        </div>
        <div>
          <p className="section-label">Multi-Arc Gauge</p>
          <MultiArcGauge metrics={MULTI} />
        </div>
      </div>
      <div>
        <p className="section-label">Live System Monitor</p>
        <LiveGauge />
      </div>
    </div>
  )
}
