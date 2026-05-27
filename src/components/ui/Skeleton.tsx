import { useState, useEffect } from 'react'

/* ─── Base shimmer element ─── */
export function Bone({ className = '', style }: { className?: string; style?: React.CSSProperties }) {
  return (
    <div className={`bg-slate-200 rounded-lg overflow-hidden relative ${className}`} style={style}>
      <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.6s_infinite] bg-gradient-to-r from-transparent via-white/60 to-transparent" />
    </div>
  )
}

/* ─── Skeleton variants ─── */
function ProfileCardSkeleton() {
  return (
    <div className="clay-card overflow-hidden">
      <Bone className="h-20 rounded-none rounded-t-clay" />
      <div className="px-5 pb-5 pt-2 space-y-3">
        <Bone className="w-16 h-16 rounded-2xl -mt-8 border-4 border-white" />
        <div className="space-y-2">
          <Bone className="h-4 w-32" />
          <Bone className="h-3 w-24" />
          <Bone className="h-3 w-20" />
        </div>
        <div className="flex gap-2 pt-1">
          <Bone className="h-8 flex-1 rounded-xl" />
          <Bone className="h-8 flex-1 rounded-xl" />
        </div>
        <div className="flex border-t border-slate-100 pt-3 gap-2">
          {[1,2,3].map(i => (
            <div key={i} className="flex-1 space-y-1.5 text-center">
              <Bone className="h-4 w-8 mx-auto" />
              <Bone className="h-3 w-12 mx-auto" />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function ArticleSkeleton() {
  return (
    <div className="clay-card p-5 space-y-4">
      <Bone className="h-40 rounded-xl" />
      <div className="flex items-center gap-2">
        <Bone className="w-6 h-6 rounded-full" />
        <Bone className="h-3 w-24" />
        <Bone className="h-3 w-16 ml-auto" />
      </div>
      <div className="space-y-2">
        <Bone className="h-5 w-4/5" />
        <Bone className="h-5 w-3/5" />
      </div>
      <div className="space-y-1.5">
        <Bone className="h-3 w-full" />
        <Bone className="h-3 w-full" />
        <Bone className="h-3 w-2/3" />
      </div>
      <div className="flex gap-2 pt-1">
        <Bone className="h-6 w-16 rounded-full" />
        <Bone className="h-6 w-20 rounded-full" />
        <Bone className="h-6 w-14 rounded-full" />
      </div>
    </div>
  )
}

function DashboardSkeleton() {
  return (
    <div className="space-y-4">
      {/* Stat row */}
      <div className="grid grid-cols-4 gap-3">
        {[1,2,3,4].map(i => (
          <div key={i} className="clay-card p-4 space-y-3">
            <div className="flex items-center justify-between">
              <Bone className="w-9 h-9 rounded-xl" />
              <Bone className="h-5 w-12 rounded-lg" />
            </div>
            <Bone className="h-6 w-20" />
            <Bone className="h-3 w-16" />
          </div>
        ))}
      </div>
      {/* Chart area */}
      <div className="clay-card p-5 space-y-3">
        <div className="flex items-center justify-between">
          <div className="space-y-1.5">
            <Bone className="h-4 w-32" />
            <Bone className="h-3 w-20" />
          </div>
          <Bone className="h-8 w-24 rounded-xl" />
        </div>
        <div className="flex items-end gap-1.5 h-32 pt-2">
          {[60, 85, 45, 90, 70, 95, 55, 80].map((h, i) => (
            <Bone key={i} className="flex-1 rounded-t-lg" style={{ height: `${h}%` }} />
          ))}
        </div>
        <div className="flex justify-between">
          {['Mon','Tue','Wed','Thu','Fri','Sat','Sun','Aug'].map(d => (
            <Bone key={d} className="h-2.5 w-6" />
          ))}
        </div>
      </div>
    </div>
  )
}

function TableSkeleton() {
  return (
    <div className="clay-card overflow-hidden">
      <div className="px-4 py-3 border-b border-slate-100 flex gap-3">
        <Bone className="h-9 w-52 rounded-xl" />
        <Bone className="h-9 w-24 rounded-xl ml-auto" />
      </div>
      <div className="divide-y divide-slate-50">
        {/* Header */}
        <div className="flex items-center gap-4 px-4 py-3 bg-slate-50">
          <Bone className="w-4 h-4 rounded" />
          {['w-36','w-24','w-20','w-28','w-16'].map((w,i) => <Bone key={i} className={`h-3 ${w}`} />)}
        </div>
        {/* Rows */}
        {[1,2,3,4,5].map(i => (
          <div key={i} className="flex items-center gap-4 px-4 py-3.5">
            <Bone className="w-4 h-4 rounded" />
            <div className="flex items-center gap-2">
              <Bone className="w-8 h-8 rounded-full" />
              <div className="space-y-1.5">
                <Bone className="h-3 w-24" />
                <Bone className="h-2.5 w-32" />
              </div>
            </div>
            <Bone className="h-6 w-14 rounded-lg ml-auto" />
            <Bone className="h-6 w-16 rounded-lg" />
            <Bone className="h-3 w-20" />
          </div>
        ))}
      </div>
      <div className="px-4 py-3 border-t border-slate-100 flex items-center justify-between">
        <Bone className="h-3 w-40" />
        <div className="flex gap-1">
          {[1,2,3,4].map(i => <Bone key={i} className="w-8 h-8 rounded-lg" />)}
        </div>
      </div>
    </div>
  )
}

function FeedSkeleton() {
  return (
    <div className="clay-card p-5 space-y-5">
      {[1,2,3].map(i => (
        <div key={i} className="flex gap-3">
          <Bone className="w-9 h-9 rounded-full shrink-0 mt-0.5" />
          <div className="flex-1 space-y-2">
            <div className="flex items-center gap-2">
              <Bone className="h-3 w-20" />
              <Bone className="h-3 w-12" />
            </div>
            <Bone className="h-3 w-full" />
            <Bone className="h-3 w-4/5" />
            {i === 1 && <Bone className="h-24 rounded-xl mt-1" />}
            <div className="flex gap-3 pt-0.5">
              <Bone className="h-3 w-10" />
              <Bone className="h-3 w-10" />
              <Bone className="h-3 w-10" />
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

/* ─── Live toggle demo ─── */
type SkeletonVariant = 'profile' | 'article' | 'dashboard' | 'table' | 'feed'

const variants: { id: SkeletonVariant; label: string; component: React.ReactNode }[] = [
  { id: 'profile',   label: 'Profile Card', component: <ProfileCardSkeleton /> },
  { id: 'article',   label: 'Article',      component: <ArticleSkeleton /> },
  { id: 'dashboard', label: 'Dashboard',    component: <DashboardSkeleton /> },
  { id: 'table',     label: 'Table',        component: <TableSkeleton /> },
  { id: 'feed',      label: 'Feed',         component: <FeedSkeleton /> },
]

export function SkeletonShowcase() {
  const [loaded, setLoaded] = useState(false)
  const [active, setActive] = useState<SkeletonVariant>('dashboard')
  const current = variants.find(v => v.id === active)!

  // Auto-reset when switching
  useEffect(() => { setLoaded(false) }, [active])

  const fakeContent: Record<SkeletonVariant, React.ReactNode> = {
    profile: (
      <div className="clay-card overflow-hidden" style={{ animation: 'fadeIn 0.3s ease' }}>
        <div className="h-20 bg-gradient-to-r from-sky-400 via-violet-400 to-pink-400" />
        <div className="px-5 pb-5 pt-2">
          <div className="w-16 h-16 rounded-2xl border-4 border-white shadow-clay bg-gradient-to-br from-sky-400 to-violet-400 -mt-8 flex items-center justify-center text-white font-bold text-xl">S</div>
          <p className="font-heading font-bold text-slate-800 mt-2">Sophie Lambert</p>
          <p className="text-sm text-slate-400">Product Designer</p>
          <p className="text-xs text-slate-400 mt-0.5">Paris, France</p>
          <div className="flex gap-2 mt-3">
            <button className="flex-1 py-2 text-xs font-bold bg-sky-500 text-white rounded-xl shadow-clay cursor-pointer">Follow</button>
            <button className="flex-1 py-2 text-xs font-bold border border-slate-200 text-slate-600 rounded-xl cursor-pointer">Message</button>
          </div>
          <div className="flex border-t border-slate-100 mt-4 pt-3 gap-2">
            {[['128','Posts'],['8.2K','Followers'],['340','Following']].map(([v,l]) => (
              <div key={l} className="flex-1 text-center">
                <p className="font-bold text-slate-800 text-sm">{v}</p>
                <p className="text-xs text-slate-400">{l}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    ),
    article: (
      <div className="clay-card p-5 space-y-4" style={{ animation: 'fadeIn 0.3s ease' }}>
        <div className="h-40 rounded-xl bg-gradient-to-br from-sky-100 to-violet-100 flex items-center justify-center">
          <p className="text-slate-400 text-sm font-medium">Article cover image</p>
        </div>
        <div className="flex items-center gap-2 text-xs text-slate-400">
          <div className="w-6 h-6 rounded-full bg-sky-400" />
          <span className="font-medium text-slate-600">Sophie Lambert</span>
          <span className="ml-auto">May 25, 2026</span>
        </div>
        <h4 className="font-heading font-bold text-slate-800">The Future of Minimal Design Systems</h4>
        <p className="text-sm text-slate-500 leading-relaxed">Design systems have evolved beyond simple component libraries. Today's best systems balance visual clarity with deep functionality…</p>
        <div className="flex gap-2">
          {['Design','Systems','UI'].map(t => <span key={t} className="text-xs bg-sky-50 text-sky-600 font-semibold px-2.5 py-1 rounded-full">{t}</span>)}
        </div>
      </div>
    ),
    dashboard: <div className="text-sm text-slate-500 clay-card p-6 text-center" style={{ animation: 'fadeIn 0.3s ease' }}>Dashboard loaded — data hydrated successfully.</div>,
    table:     <div className="text-sm text-slate-500 clay-card p-6 text-center" style={{ animation: 'fadeIn 0.3s ease' }}>Table loaded — 8 users fetched.</div>,
    feed:      <div className="text-sm text-slate-500 clay-card p-6 text-center" style={{ animation: 'fadeIn 0.3s ease' }}>Feed loaded — 3 recent posts.</div>,
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center gap-3">
        <div className="flex gap-1 bg-slate-100 rounded-xl p-1">
          {variants.map(v => (
            <button key={v.id} onClick={() => setActive(v.id)}
              className={`px-3 py-1.5 text-xs font-bold rounded-lg cursor-pointer transition-all duration-200 whitespace-nowrap ${active === v.id ? 'bg-white text-slate-800 shadow-soft' : 'text-slate-400 hover:text-slate-600'}`}>
              {v.label}
            </button>
          ))}
        </div>
        <button onClick={() => setLoaded(l => !l)}
          className={`px-4 py-2 text-xs font-bold rounded-xl cursor-pointer transition-all duration-200 shadow-soft ${loaded ? 'bg-slate-200 text-slate-600 hover:bg-slate-300' : 'bg-sky-500 text-white shadow-clay hover:bg-sky-600'}`}>
          {loaded ? 'Show skeleton' : 'Simulate load'}
        </button>
      </div>

      <div className="w-full">
        {loaded ? fakeContent[active] : current.component}
      </div>
    </div>
  )
}
