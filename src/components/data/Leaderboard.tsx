import { useState } from 'react'
import { TrendingUp, TrendingDown, Minus, Trophy, Medal, Award } from 'lucide-react'

export interface Player {
  id: string; name: string; handle: string; score: number
  delta: number; color: string; initials: string; badge?: string
}

const DATA: Player[] = [
  { id: 'p1', name: 'Sophie Leblanc',  handle: '@sophie',  score: 9840, delta:  +3, color: '#0ea5e9', initials: 'SL' },
  { id: 'p2', name: 'Marcus Trent',    handle: '@marcus',  score: 8720, delta:  -1, color: '#8b5cf6', initials: 'MT', badge: 'Hot 🔥' },
  { id: 'p3', name: 'Anya Petrov',     handle: '@anya',    score: 7650, delta:  +5, color: '#ec4899', initials: 'AP' },
  { id: 'p4', name: 'Leon Kim',        handle: '@leon',    score: 6510, delta:   0, color: '#f97316', initials: 'LK' },
  { id: 'p5', name: 'Priya Sharma',    handle: '@priya',   score: 5880, delta:  -2, color: '#10b981', initials: 'PS' },
  { id: 'p6', name: 'Michael Hale',    handle: '@michael', score: 4920, delta:  +1, color: '#ef4444', initials: 'MH' },
  { id: 'p7', name: 'Yuki Tanaka',     handle: '@yuki',    score: 3740, delta:  +7, color: '#06b6d4', initials: 'YT', badge: 'Rising ⚡' },
  { id: 'p8', name: 'Carlos Reyes',    handle: '@carlos',  score: 2680, delta:  -3, color: '#84cc16', initials: 'CR' },
]

const RANK_STYLE: Record<number, { icon: React.ReactNode; ring: string; bg: string }> = {
  1: { icon: <Trophy className="w-4 h-4 text-amber-500" />,  ring: 'ring-2 ring-amber-400',  bg: 'bg-amber-50' },
  2: { icon: <Medal  className="w-4 h-4 text-slate-400" />,  ring: 'ring-2 ring-slate-300',  bg: 'bg-slate-50' },
  3: { icon: <Award  className="w-4 h-4 text-orange-400" />, ring: 'ring-2 ring-orange-300', bg: 'bg-orange-50' },
}

function DeltaBadge({ delta }: { delta: number }) {
  if (delta === 0) return (
    <span className="flex items-center gap-0.5 text-[10px] font-bold text-slate-400 bg-slate-100 px-1.5 py-0.5 rounded-full">
      <Minus className="w-2.5 h-2.5" />—
    </span>
  )
  const up = delta > 0
  return (
    <span className={`flex items-center gap-0.5 text-[10px] font-bold px-1.5 py-0.5 rounded-full
      ${up ? 'text-emerald-600 bg-emerald-50' : 'text-red-500 bg-red-50'}`}>
      {up ? <TrendingUp className="w-2.5 h-2.5" /> : <TrendingDown className="w-2.5 h-2.5" />}
      {up ? '+' : ''}{delta}
    </span>
  )
}

function ScoreBar({ score, max }: { score: number; max: number }) {
  return (
    <div className="w-24 h-1.5 bg-slate-100 rounded-full overflow-hidden">
      <div className="h-full rounded-full bg-gradient-to-r from-sky-400 to-violet-500 transition-all"
        style={{ width: `${(score / max) * 100}%` }} />
    </div>
  )
}

type Period = 'week' | 'month' | 'all'

export function LeaderboardShowcase() {
  const [period, setPeriod] = useState<Period>('week')
  const [hovered, setHovered] = useState<string | null>(null)

  // Shuffle scores slightly per period for demo variety
  const displayData = DATA.map((p, i) => ({
    ...p,
    score: period === 'all' ? p.score : period === 'month' ? Math.round(p.score * 0.4) : Math.round(p.score * 0.1),
  })).sort((a, b) => b.score - a.score)

  const maxScore = displayData[0]?.score ?? 1

  return (
    <div className="grid grid-cols-2 gap-8">
      {/* Full leaderboard */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <p className="section-label">Top performers</p>
          <div className="flex items-center gap-1 bg-slate-100 rounded-xl p-1">
            {(['week', 'month', 'all'] as Period[]).map(p => (
              <button key={p} onClick={() => setPeriod(p)}
                className={`text-[10px] font-bold uppercase tracking-wide px-2.5 py-1 rounded-lg cursor-pointer transition-all capitalize
                  ${period === p ? 'bg-white text-sky-600 shadow-soft' : 'text-slate-400 hover:text-slate-600'}`}>
                {p === 'all' ? 'All time' : `This ${p}`}
              </button>
            ))}
          </div>
        </div>

        <div className="clay-card overflow-hidden divide-y divide-slate-50">
          {displayData.map((player, i) => {
            const rank = i + 1
            const rs = RANK_STYLE[rank]
            return (
              <div key={player.id}
                onMouseEnter={() => setHovered(player.id)}
                onMouseLeave={() => setHovered(null)}
                className={`flex items-center gap-3 px-4 py-3 transition-colors
                  ${hovered === player.id ? 'bg-slate-50' : ''}`}>
                {/* Rank */}
                <div className={`w-7 text-center text-xs font-bold ${rank <= 3 ? 'text-slate-600' : 'text-slate-300'}`}>
                  {rank <= 3 ? rs.icon : <span>#{rank}</span>}
                </div>

                {/* Avatar */}
                <div className={`w-9 h-9 rounded-full flex items-center justify-center text-white text-xs font-bold shrink-0
                  ${rs?.ring ?? ''} ${rs?.bg ? '' : ''}`}
                  style={{ background: player.color }}>
                  {player.initials}
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5">
                    <p className="text-sm font-semibold text-slate-800 truncate">{player.name}</p>
                    {player.badge && (
                      <span className="text-[9px] font-bold bg-amber-100 text-amber-600 px-1.5 py-0.5 rounded-full shrink-0">
                        {player.badge}
                      </span>
                    )}
                  </div>
                  <p className="text-[11px] text-slate-400">{player.handle}</p>
                </div>

                {/* Score + bar */}
                <div className="flex flex-col items-end gap-1">
                  <span className="text-sm font-bold tabular-nums text-slate-800">{player.score.toLocaleString()}</span>
                  <div className="flex items-center gap-2">
                    <ScoreBar score={player.score} max={maxScore} />
                    <DeltaBadge delta={player.delta} />
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Podium + mini stats */}
      <div className="space-y-4">
        <p className="section-label">Podium</p>

        {/* Top 3 podium */}
        <div className="flex items-end justify-center gap-3 py-4">
          {[1, 0, 2].map(idx => {
            const p = displayData[idx]
            if (!p) return null
            const rank = idx + 1
            const heights = [28, 36, 20]
            return (
              <div key={p.id} className="flex flex-col items-center gap-2">
                <div className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-sm shadow-clay"
                  style={{ background: p.color }}>
                  {p.initials}
                </div>
                <p className="text-xs font-semibold text-slate-700 text-center max-w-[80px] truncate">{p.name.split(' ')[0]}</p>
                <p className="text-[11px] font-bold text-slate-800 tabular-nums">{p.score.toLocaleString()}</p>
                <div className={`w-20 rounded-t-xl flex items-center justify-center font-heading font-bold text-white text-sm shadow-clay`}
                  style={{ height: heights[idx] * 2.5, background: ['#f59e0b','#94a3b8','#ea7c4c'][idx] }}>
                  #{rank}
                </div>
              </div>
            )
          })}
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-3">
          {[
            { label: 'Total players', value: DATA.length },
            { label: 'Top score', value: maxScore.toLocaleString() },
            { label: 'Avg score', value: Math.round(displayData.reduce((a, p) => a + p.score, 0) / displayData.length).toLocaleString() },
            { label: 'Rising stars', value: displayData.filter(p => p.delta > 3).length },
          ].map(s => (
            <div key={s.label} className="clay-card p-3 text-center">
              <p className="font-heading font-bold text-xl text-slate-800">{s.value}</p>
              <p className="text-[10px] text-slate-400 font-semibold uppercase tracking-widest mt-0.5">{s.label}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
