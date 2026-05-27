import { TrendingUp, TrendingDown, Users, DollarSign, ShoppingCart, Activity, Eye, Star } from 'lucide-react'

export interface StatCardProps {
  label: string
  value: string
  change: number
  icon: React.ReactNode
  color: string
  bgColor: string
  prefix?: string
}

export function StatCard({ label, value, change, icon, color, bgColor, prefix }: StatCardProps) {
  const up = change >= 0

  return (
    <div className="clay-card p-5 flex flex-col gap-4 hover:-translate-y-1 hover:shadow-clay-lg transition-all duration-200 cursor-default">
      <div className="flex items-start justify-between">
        <div className={`w-11 h-11 rounded-xl flex items-center justify-center`} style={{ background: bgColor }}>
          <span style={{ color }}>{icon}</span>
        </div>
        <span className={`flex items-center gap-1 text-xs font-bold px-2 py-1 rounded-lg ${up ? 'bg-emerald-50 text-emerald-600' : 'bg-red-50 text-red-500'}`}>
          {up ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
          {Math.abs(change)}%
        </span>
      </div>
      <div>
        <p className="text-2xl font-heading font-bold text-slate-800">{prefix}{value}</p>
        <p className="text-sm text-slate-400 mt-0.5">{label}</p>
      </div>
    </div>
  )
}

export function MiniSparkCard({ label, value, data, color }: { label: string; value: string; data: number[]; color: string }) {
  const max = Math.max(...data)
  const min = Math.min(...data)
  const range = max - min || 1
  const h = 40
  const w = 100
  const pts = data.map((v, i) => `${(i / (data.length - 1)) * w},${h - ((v - min) / range) * h}`).join(' ')

  return (
    <div className="clay-card p-5 flex items-center justify-between gap-4 hover:-translate-y-0.5 hover:shadow-clay-lg transition-all duration-200 cursor-default">
      <div>
        <p className="text-xl font-heading font-bold text-slate-800">{value}</p>
        <p className="text-xs text-slate-400 mt-0.5">{label}</p>
      </div>
      <svg viewBox={`0 0 ${w} ${h}`} className="w-24 h-10 shrink-0">
        <polyline fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" points={pts} />
      </svg>
    </div>
  )
}

const sparkData = {
  views:   [30, 45, 38, 60, 55, 72, 68, 90, 85, 110],
  users:   [10, 14, 12, 18, 22, 19, 25, 28, 24, 32],
  revenue: [200, 240, 220, 280, 310, 290, 340, 370, 360, 420],
}

export function StatCardsShowcase() {
  return (
    <div className="space-y-8">
      <div>
        <p className="section-label">KPI Cards</p>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard label="Total Revenue"  value="48,290" change={12.4} prefix="$" icon={<DollarSign className="w-5 h-5" />}    color="#0ea5e9" bgColor="#e0f2fe" />
          <StatCard label="Active Users"   value="12,430" change={8.1}          icon={<Users className="w-5 h-5" />}            color="#8b5cf6" bgColor="#ede9fe" />
          <StatCard label="Orders"         value="3,842"  change={-2.3}         icon={<ShoppingCart className="w-5 h-5" />}     color="#f472b6" bgColor="#fce7f3" />
          <StatCard label="Uptime"         value="99.9%"  change={0.2}          icon={<Activity className="w-5 h-5" />}         color="#10b981" bgColor="#d1fae5" />
        </div>
      </div>

      <div>
        <p className="section-label">Sparkline Cards</p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <MiniSparkCard label="Page views"    value="84.2K"  data={sparkData.views}   color="#0ea5e9" />
          <MiniSparkCard label="New users"     value="2,341"  data={sparkData.users}   color="#8b5cf6" />
          <MiniSparkCard label="Revenue"       value="$42K"   data={sparkData.revenue} color="#10b981" />
        </div>
      </div>

      <div>
        <p className="section-label">Secondary Stats</p>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { label: 'Avg. Session',    value: '4m 32s', icon: <Activity className="w-4 h-4" />, color: '#0ea5e9', bg: '#e0f2fe' },
            { label: 'Bounce Rate',     value: '24.8%',  icon: <TrendingDown className="w-4 h-4" />, color: '#f472b6', bg: '#fce7f3' },
            { label: 'Page Views',      value: '128K',   icon: <Eye className="w-4 h-4" />, color: '#8b5cf6', bg: '#ede9fe' },
            { label: 'Avg. Rating',     value: '4.8',    icon: <Star className="w-4 h-4" />, color: '#facc15', bg: '#fef9c3' },
          ].map(s => (
            <div key={s.label} className="clay-card p-4 flex items-center gap-3 hover:-translate-y-0.5 hover:shadow-clay-lg transition-all duration-200 cursor-default">
              <div className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0" style={{ background: s.bg }}>
                <span style={{ color: s.color }}>{s.icon}</span>
              </div>
              <div>
                <p className="font-heading font-bold text-slate-800">{s.value}</p>
                <p className="text-xs text-slate-400">{s.label}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
