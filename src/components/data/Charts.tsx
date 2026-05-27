import {
  AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell,
  RadialBarChart, RadialBar, LineChart, Line,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend
} from 'recharts'

const areaData = [
  { month: 'Jan', revenue: 4200, users: 1200 },
  { month: 'Feb', revenue: 5800, users: 1800 },
  { month: 'Mar', revenue: 5200, users: 1500 },
  { month: 'Apr', revenue: 7100, users: 2200 },
  { month: 'May', revenue: 6800, users: 2000 },
  { month: 'Jun', revenue: 9200, users: 2800 },
  { month: 'Jul', revenue: 8600, users: 2600 },
  { month: 'Aug', revenue: 11000, users: 3400 },
]

const barData = [
  { day: 'Mon', sales: 320, returns: 40 },
  { day: 'Tue', sales: 480, returns: 60 },
  { day: 'Wed', sales: 420, returns: 30 },
  { day: 'Thu', sales: 560, returns: 80 },
  { day: 'Fri', sales: 720, returns: 50 },
  { day: 'Sat', sales: 840, returns: 90 },
  { day: 'Sun', sales: 680, returns: 45 },
]

const pieData = [
  { name: 'Organic', value: 38, color: '#0ea5e9' },
  { name: 'Referral', value: 26, color: '#8b5cf6' },
  { name: 'Social',   value: 20, color: '#f472b6' },
  { name: 'Direct',   value: 16, color: '#34d399' },
]

const radialData = [
  { name: 'Conversion', value: 72, fill: '#0ea5e9' },
  { name: 'Retention',  value: 58, fill: '#8b5cf6' },
  { name: 'Engagement', value: 85, fill: '#34d399' },
  { name: 'Satisfaction', value: 91, fill: '#f472b6' },
]

const tooltipStyle = {
  borderRadius: '1rem',
  border: '1px solid #f1f5f9',
  boxShadow: '6px 6px 0 rgba(0,0,0,0.06)',
  fontFamily: 'Nunito Sans, sans-serif',
  fontSize: 13,
}

function ChartCard({ title, subtitle, children }: { title: string; subtitle?: string; children: React.ReactNode }) {
  return (
    <div className="clay-card p-5">
      <div className="mb-4">
        <h4 className="font-heading font-bold text-slate-800">{title}</h4>
        {subtitle && <p className="text-xs text-slate-400 mt-0.5">{subtitle}</p>}
      </div>
      {children}
    </div>
  )
}

export function ChartsShowcase() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        {/* Area chart */}
        <ChartCard title="Revenue & Users" subtitle="Jan – Aug 2024">
          <ResponsiveContainer width="100%" height={220}>
            <AreaChart data={areaData} margin={{ top: 4, right: 4, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="revGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%"  stopColor="#0ea5e9" stopOpacity={0.25} />
                  <stop offset="95%" stopColor="#0ea5e9" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="userGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%"  stopColor="#8b5cf6" stopOpacity={0.25} />
                  <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="month" tick={{ fontSize: 12, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 12, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={tooltipStyle} cursor={{ stroke: '#e2e8f0' }} />
              <Area type="monotone" dataKey="revenue" stroke="#0ea5e9" strokeWidth={2.5} fill="url(#revGrad)" dot={false} name="Revenue ($)" />
              <Area type="monotone" dataKey="users"   stroke="#8b5cf6" strokeWidth={2.5} fill="url(#userGrad)" dot={false} name="Users" />
            </AreaChart>
          </ResponsiveContainer>
        </ChartCard>

        {/* Bar chart */}
        <ChartCard title="Weekly Sales" subtitle="This week vs returns">
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={barData} margin={{ top: 4, right: 4, left: -20, bottom: 0 }} barGap={4}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
              <XAxis dataKey="day" tick={{ fontSize: 12, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 12, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={tooltipStyle} cursor={{ fill: '#f8fafc' }} />
              <Bar dataKey="sales"   fill="#0ea5e9" radius={[8, 8, 0, 0]} name="Sales" />
              <Bar dataKey="returns" fill="#f472b6" radius={[8, 8, 0, 0]} name="Returns" />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>

        {/* Pie chart */}
        <ChartCard title="Traffic Sources" subtitle="Last 30 days">
          <div className="flex items-center gap-6">
            <ResponsiveContainer width="100%" height={180}>
              <PieChart>
                <Pie data={pieData} cx="50%" cy="50%" innerRadius={55} outerRadius={80} paddingAngle={4} dataKey="value">
                  {pieData.map(entry => (
                    <Cell key={entry.name} fill={entry.color} stroke="none" />
                  ))}
                </Pie>
                <Tooltip contentStyle={tooltipStyle} formatter={(v: number) => `${v}%`} />
              </PieChart>
            </ResponsiveContainer>
            <div className="space-y-2.5 shrink-0">
              {pieData.map(d => (
                <div key={d.name} className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full shrink-0" style={{ background: d.color }} />
                  <span className="text-xs text-slate-600 font-medium">{d.name}</span>
                  <span className="text-xs font-bold text-slate-800 ml-auto pl-3">{d.value}%</span>
                </div>
              ))}
            </div>
          </div>
        </ChartCard>

        {/* Radial bar chart */}
        <ChartCard title="Performance Metrics" subtitle="Current quarter">
          <div className="flex items-center gap-4">
            <ResponsiveContainer width="100%" height={180}>
              <RadialBarChart cx="50%" cy="50%" innerRadius={20} outerRadius={85} barSize={10} data={radialData} startAngle={90} endAngle={-270}>
                <RadialBar dataKey="value" cornerRadius={6} background={{ fill: '#f1f5f9' }} />
                <Tooltip contentStyle={tooltipStyle} formatter={(v: number) => `${v}%`} />
              </RadialBarChart>
            </ResponsiveContainer>
            <div className="space-y-2.5 shrink-0">
              {radialData.map(d => (
                <div key={d.name} className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full shrink-0" style={{ background: d.fill }} />
                  <span className="text-xs text-slate-600 font-medium">{d.name}</span>
                  <span className="text-xs font-bold text-slate-800 ml-auto pl-3">{d.value}%</span>
                </div>
              ))}
            </div>
          </div>
        </ChartCard>
      </div>

      {/* Line chart full width */}
      <ChartCard title="Multi-line Trend" subtitle="6-month comparison across channels">
        <ResponsiveContainer width="100%" height={200}>
          <LineChart data={areaData} margin={{ top: 4, right: 4, left: -20, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
            <XAxis dataKey="month" tick={{ fontSize: 12, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fontSize: 12, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
            <Tooltip contentStyle={tooltipStyle} />
            <Legend wrapperStyle={{ fontSize: 12, paddingTop: 12 }} />
            <Line type="monotone" dataKey="revenue" stroke="#0ea5e9" strokeWidth={2.5} dot={{ fill: '#0ea5e9', r: 4 }} activeDot={{ r: 6 }} name="Revenue" />
            <Line type="monotone" dataKey="users"   stroke="#8b5cf6" strokeWidth={2.5} dot={{ fill: '#8b5cf6', r: 4 }} activeDot={{ r: 6 }} name="Users" />
          </LineChart>
        </ResponsiveContainer>
      </ChartCard>
    </div>
  )
}
