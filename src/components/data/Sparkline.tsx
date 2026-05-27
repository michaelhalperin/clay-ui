import { TrendingUp, TrendingDown, Minus } from 'lucide-react'

export interface SparklineProps {
  data: number[]
  width?: number
  height?: number
  color?: string
  fill?: boolean
  type?: 'line' | 'bar'
}

export function Sparkline({ data, width = 80, height = 32, color = '#0ea5e9', fill = true, type = 'line' }: SparklineProps) {
  const min = Math.min(...data)
  const max = Math.max(...data)
  const range = max - min || 1

  if (type === 'bar') {
    const barW = width / data.length
    const gap  = barW * 0.25
    const w    = barW - gap
    return (
      <svg width={width} height={height} className="overflow-visible">
        {data.map((v, i) => {
          const barH = ((v - min) / range) * (height - 2) + 2
          return (
            <rect key={i}
              x={i * barW + gap / 2}
              y={height - barH}
              width={w}
              height={barH}
              rx={2}
              fill={color}
              opacity={i === data.length - 1 ? 1 : 0.5}
            />
          )
        })}
      </svg>
    )
  }

  const pts = data.map((v, i) => ({
    x: (i / (data.length - 1)) * width,
    y: height - ((v - min) / range) * (height - 4) - 2,
  }))

  const polyline = pts.map(p => `${p.x},${p.y}`).join(' ')
  const area = `M${pts[0].x},${height} ` + pts.map(p => `L${p.x},${p.y}`).join(' ') + ` L${pts[pts.length - 1].x},${height} Z`

  return (
    <svg width={width} height={height} className="overflow-visible">
      {fill && <path d={area} fill={color} opacity={0.12} />}
      <polyline points={polyline} fill="none" stroke={color} strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
      {/* last point dot */}
      <circle cx={pts[pts.length - 1].x} cy={pts[pts.length - 1].y} r={2.5} fill={color} />
    </svg>
  )
}

export interface MetricCardProps {
  label: string
  value: string
  subvalue?: string
  data: number[]
  color: string
  trend: 'up' | 'down' | 'flat'
  trendValue: string
  type?: 'line' | 'bar'
}

export function MetricCard({ label, value, subvalue, data, color, trend, trendValue, type = 'line' }: MetricCardProps) {
  const TrendIcon = trend === 'up' ? TrendingUp : trend === 'down' ? TrendingDown : Minus
  const trendColor = trend === 'up' ? 'text-emerald-500' : trend === 'down' ? 'text-red-500' : 'text-slate-400'
  const trendBg   = trend === 'up' ? 'bg-emerald-50' : trend === 'down' ? 'bg-red-50' : 'bg-slate-50'

  return (
    <div className="clay-card p-4">
      <div className="flex items-start justify-between mb-3">
        <div>
          <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">{label}</p>
          <p className="font-heading font-bold text-2xl text-slate-800 mt-1 leading-none">{value}</p>
          {subvalue && <p className="text-xs text-slate-400 mt-0.5">{subvalue}</p>}
        </div>
        <span className={`flex items-center gap-1 text-[11px] font-bold px-2 py-1 rounded-lg ${trendBg} ${trendColor}`}>
          <TrendIcon className="w-3 h-3" />{trendValue}
        </span>
      </div>
      <Sparkline data={data} width={160} height={40} color={color} type={type} />
    </div>
  )
}

const RAND = (base: number, spread: number, n: number) =>
  Array.from({ length: n }, (_, i) => base + Math.sin(i * 0.7) * spread + (i / n) * spread * 0.5 + Math.random() * spread * 0.3)

export function SparklineShowcase() {
  const revenue  = [42, 48, 44, 52, 58, 54, 62, 68, 65, 72, 78, 82]
  const users    = [120, 132, 128, 145, 150, 142, 160, 175, 168, 182, 195, 210]
  const bounce   = [68, 65, 70, 63, 60, 58, 62, 55, 52, 49, 51, 48]
  const sessions = [800, 950, 880, 1020, 1100, 980, 1150, 1200, 1080, 1300, 1250, 1400]
  const errors   = [12, 8, 15, 6, 10, 18, 7, 5, 9, 4, 6, 3]
  const orders   = [30, 35, 28, 42, 38, 45, 40, 50, 46, 55, 52, 60]

  return (
    <div className="space-y-6">
      <div>
        <p className="section-label">Line Sparklines</p>
        <div className="grid grid-cols-3 gap-4">
          <MetricCard label="Revenue" value="$82.4K" subvalue="vs last month" data={revenue} color="#0ea5e9" trend="up" trendValue="+18%" />
          <MetricCard label="Active users" value="210" subvalue="unique this week" data={users} color="#8b5cf6" trend="up" trendValue="+12%" />
          <MetricCard label="Bounce rate" value="48%" subvalue="goal: below 50%" data={bounce} color="#10b981" trend="up" trendValue="-20pts" />
        </div>
      </div>
      <div>
        <p className="section-label">Bar Sparklines</p>
        <div className="grid grid-cols-3 gap-4">
          <MetricCard label="Sessions" value="1,400" subvalue="last 12 days" data={sessions} color="#f59e0b" trend="up" trendValue="+8%" type="bar" />
          <MetricCard label="Errors" value="3" subvalue="last 12 days" data={errors} color="#ef4444" trend="up" trendValue="-75%" type="bar" />
          <MetricCard label="Orders" value="60" subvalue="last 12 days" data={orders} color="#ec4899" trend="up" trendValue="+30%" type="bar" />
        </div>
      </div>

      {/* Inline sparkline in table */}
      <div>
        <p className="section-label">Inline in table</p>
        <div className="clay-card overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50">
                {['Channel', 'Visitors', 'Trend', 'Conversion', 'Revenue'].map(h => (
                  <th key={h} className="text-left px-4 py-2.5 text-[11px] font-bold text-slate-400 uppercase tracking-widest">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {[
                { channel: 'Organic search', visitors: '12,400', data: [60,65,70,68,75,80,78,85], conv: '3.2%', rev: '$8,200', color: '#0ea5e9' },
                { channel: 'Direct',         visitors: '6,800',  data: [40,42,38,45,43,46,44,48], conv: '4.8%', rev: '$5,100', color: '#8b5cf6' },
                { channel: 'Referral',       visitors: '4,200',  data: [20,25,22,30,28,32,29,35], conv: '2.1%', rev: '$2,800', color: '#10b981' },
                { channel: 'Social',         visitors: '3,100',  data: [18,15,20,17,22,19,24,21], conv: '1.5%', rev: '$1,400', color: '#f59e0b' },
              ].map(row => (
                <tr key={row.channel} className="hover:bg-slate-50 transition-colors">
                  <td className="px-4 py-3 font-medium text-slate-700">{row.channel}</td>
                  <td className="px-4 py-3 tabular-nums text-slate-600">{row.visitors}</td>
                  <td className="px-4 py-3">
                    <Sparkline data={row.data} width={64} height={24} color={row.color} />
                  </td>
                  <td className="px-4 py-3 tabular-nums text-slate-600">{row.conv}</td>
                  <td className="px-4 py-3 tabular-nums font-semibold text-slate-700">{row.rev}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
