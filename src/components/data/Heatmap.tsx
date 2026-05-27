import { useState } from 'react'

const DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
const HOURS = ['12am', '3am', '6am', '9am', '12pm', '3pm', '6pm', '9pm']
const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

function rand(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

/* Contribution heatmap (GitHub-style) — 52 weeks × 7 days */
const NUM_WEEKS = 52
const contributionData: number[][] = Array.from({ length: NUM_WEEKS }, (_, w) =>
  Array.from({ length: 7 }, (_, d) => {
    const weekday = d < 5
    const bias = weekday ? rand(0, 15) : rand(0, 5)
    // spike around weeks 20-35
    const spike = w >= 20 && w <= 35 ? rand(3, 12) : 0
    return Math.max(0, bias + spike)
  })
)

function contribColor(val: number) {
  if (val === 0) return 'bg-slate-100'
  if (val < 5)  return 'bg-emerald-200'
  if (val < 10) return 'bg-emerald-400'
  if (val < 15) return 'bg-emerald-500'
  return 'bg-emerald-600'
}

export function ContributionHeatmap() {
  const [hovered, setHovered] = useState<{ week: number; day: number } | null>(null)
  const total = contributionData.flat().reduce((a, b) => a + b, 0)

  const monthLabels: { label: string; col: number }[] = []
  MONTHS.forEach((m, mi) => {
    const col = Math.floor((mi / 12) * NUM_WEEKS)
    monthLabels.push({ label: m, col })
  })

  const hov = hovered ? contributionData[hovered.week][hovered.day] : null
  const hovLabel = hovered ? `${hov} contribution${hov !== 1 ? 's' : ''} · ${DAYS[hovered.day]}, Week ${hovered.week + 1}` : null

  return (
    <div>
      <div className="flex items-center justify-between mb-3">
        <p className="text-sm font-semibold text-slate-700">{total.toLocaleString()} contributions in the last year</p>
        <div className="flex items-center gap-1.5 text-[10px] text-slate-400">
          <span>Less</span>
          {['bg-slate-100','bg-emerald-200','bg-emerald-400','bg-emerald-500','bg-emerald-600'].map(c => (
            <span key={c} className={`w-3 h-3 rounded-sm ${c}`} />
          ))}
          <span>More</span>
        </div>
      </div>

      {/* Month labels */}
      <div className="relative mb-1 overflow-x-auto">
        <div style={{ display: 'grid', gridTemplateColumns: `repeat(${NUM_WEEKS}, 12px)`, gap: '3px', marginLeft: '28px' }}>
          {Array.from({ length: NUM_WEEKS }, (_, wi) => {
            const label = monthLabels.find(m => m.col === wi)
            return (
              <div key={wi} className="text-[9px] text-slate-400 h-3 flex items-end">
                {label?.label ?? ''}
              </div>
            )
          })}
        </div>

        <div className="flex gap-0.5 mt-1">
          {/* Day labels */}
          <div className="flex flex-col gap-0.5 mr-1 shrink-0">
            {DAYS.map((d, i) => (
              <div key={d} className={`h-3 text-[9px] text-slate-400 flex items-center ${i % 2 === 0 ? '' : 'opacity-0'}`} style={{ width: '24px' }}>
                {d.slice(0, 3)}
              </div>
            ))}
          </div>

          {/* Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: `repeat(${NUM_WEEKS}, 12px)`, gridTemplateRows: 'repeat(7, 12px)', gap: '3px' }}>
            {contributionData.map((week, wi) =>
              week.map((val, di) => (
                <div
                  key={`${wi}-${di}`}
                  onMouseEnter={() => setHovered({ week: wi, day: di })}
                  onMouseLeave={() => setHovered(null)}
                  className={`rounded-sm cursor-pointer transition-opacity hover:opacity-80 ${contribColor(val)}`}
                  style={{ gridColumn: wi + 1, gridRow: di + 1 }}
                />
              ))
            )}
          </div>
        </div>

        {hovLabel && (
          <p className="text-[10px] text-slate-400 mt-2">{hovLabel}</p>
        )}
      </div>
    </div>
  )
}

/* Activity heatmap — hour × day of week */
const activityData: number[][] = DAYS.map((_, d) =>
  HOURS.map(() => {
    const isWorkHour = true
    const isWorkDay = d < 5
    const base = isWorkDay && isWorkHour ? rand(0, 10) : rand(0, 3)
    return base
  })
)

function activityColor(val: number, palette: 'blue' | 'purple') {
  if (val === 0) return 'bg-slate-100'
  const scales = {
    blue:   ['bg-sky-100', 'bg-sky-300', 'bg-sky-500', 'bg-sky-700'],
    purple: ['bg-violet-100', 'bg-violet-300', 'bg-violet-500', 'bg-violet-700'],
  }
  const scale = scales[palette]
  if (val < 3)  return scale[0]
  if (val < 6)  return scale[1]
  if (val < 9)  return scale[2]
  return scale[3]
}

export function ActivityHeatmap() {
  const [hovered, setHovered] = useState<{ day: number; hour: number } | null>(null)
  const hovVal = hovered ? activityData[hovered.day][hovered.hour] : null

  return (
    <div>
      <div className="flex items-center justify-between mb-3">
        <p className="text-sm font-semibold text-slate-700">Activity by Hour</p>
        <div className="flex items-center gap-1.5 text-[10px] text-slate-400">
          <span>Low</span>
          {['bg-slate-100','bg-violet-100','bg-violet-300','bg-violet-500','bg-violet-700'].map(c => (
            <span key={c} className={`w-3 h-3 rounded-sm ${c}`} />
          ))}
          <span>High</span>
        </div>
      </div>

      {/* Hour headers */}
      <div className="flex gap-1 mb-1 ml-10">
        {HOURS.map(h => (
          <div key={h} className="flex-1 text-[9px] text-slate-400 text-center">{h}</div>
        ))}
      </div>

      {/* Grid */}
      <div className="space-y-1">
        {DAYS.map((day, di) => (
          <div key={day} className="flex items-center gap-1">
            <span className="w-9 text-[10px] text-slate-400 text-right shrink-0">{day}</span>
            {HOURS.map((_, hi) => (
              <div
                key={hi}
                onMouseEnter={() => setHovered({ day: di, hour: hi })}
                onMouseLeave={() => setHovered(null)}
                className={`flex-1 h-6 rounded cursor-pointer transition-opacity hover:opacity-75 ${activityColor(activityData[di][hi], 'purple')}`}
              />
            ))}
          </div>
        ))}
      </div>

      {hovered && hovVal !== null && (
        <p className="text-[10px] text-slate-400 mt-2">
          {DAYS[hovered.day]} at {HOURS[hovered.hour]} — activity score: {hovVal}
        </p>
      )}
    </div>
  )
}

/* Monthly metric heatmap (calendar-style) */
const monthlyData: number[] = Array.from({ length: 12 }, () => rand(0, 100))

function monthlyColor(val: number) {
  if (val < 20)  return { bg: 'bg-red-100',    text: 'text-red-600' }
  if (val < 40)  return { bg: 'bg-amber-100',   text: 'text-amber-600' }
  if (val < 60)  return { bg: 'bg-yellow-100',  text: 'text-yellow-600' }
  if (val < 80)  return { bg: 'bg-emerald-100', text: 'text-emerald-600' }
  return              { bg: 'bg-sky-100',      text: 'text-sky-600' }
}

export function MonthlyHeatmap() {
  return (
    <div>
      <p className="text-sm font-semibold text-slate-700 mb-3">Monthly Performance Score</p>
      <div className="grid grid-cols-6 gap-2">
        {MONTHS.map((m, i) => {
          const val = monthlyData[i]
          const c = monthlyColor(val)
          return (
            <div key={m} className={`${c.bg} rounded-xl p-3 text-center`}>
              <p className="text-[10px] font-bold text-slate-400 uppercase">{m}</p>
              <p className={`text-lg font-heading font-bold ${c.text} mt-0.5`}>{val}</p>
            </div>
          )
        })}
      </div>
      <div className="flex items-center gap-2 mt-3 text-[10px] text-slate-400">
        <span>Score:</span>
        {[
          { range: '0–19', bg: 'bg-red-100', text: 'text-red-600', label: 'Poor' },
          { range: '20–39', bg: 'bg-amber-100', text: 'text-amber-600', label: 'Fair' },
          { range: '40–59', bg: 'bg-yellow-100', text: 'text-yellow-600', label: 'OK' },
          { range: '60–79', bg: 'bg-emerald-100', text: 'text-emerald-600', label: 'Good' },
          { range: '80+', bg: 'bg-sky-100', text: 'text-sky-600', label: 'Great' },
        ].map(l => (
          <span key={l.label} className={`${l.bg} ${l.text} px-2 py-0.5 rounded-full font-semibold`}>{l.label}</span>
        ))}
      </div>
    </div>
  )
}

export function HeatmapShowcase() {
  return (
    <div className="space-y-8">
      <div>
        <p className="section-label">Contribution Heatmap</p>
        <ContributionHeatmap />
      </div>

      <div className="grid grid-cols-2 gap-8">
        <div>
          <p className="section-label">Hourly Activity Matrix</p>
          <ActivityHeatmap />
        </div>
        <div>
          <p className="section-label">Monthly Score Grid</p>
          <MonthlyHeatmap />
        </div>
      </div>
    </div>
  )
}
