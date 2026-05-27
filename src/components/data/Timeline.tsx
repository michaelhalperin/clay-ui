import { GitCommit, Rocket, Shield, Users, CreditCard, MessageSquare, AlertTriangle, CheckCircle2 } from 'lucide-react'

export interface TimelineEvent {
  id: string
  icon: React.ReactNode
  iconBg: string
  title: string
  description?: string
  user?: string
  userColor?: string
  time: string
  tag?: { label: string; color: string }
  actions?: string[]
}

const events: TimelineEvent[] = [
  {
    id: 'e1', icon: <Rocket className="w-3.5 h-3.5" />, iconBg: 'bg-emerald-500',
    title: 'aurora-prod deployed', description: 'Build #482 succeeded — 3 instances running in us-east.',
    time: '2 min ago', tag: { label: 'Deploy', color: 'bg-emerald-100 text-emerald-700' },
  },
  {
    id: 'e2', icon: <MessageSquare className="w-3.5 h-3.5" />, iconBg: 'bg-sky-500',
    title: 'Sophie commented on Dashboard PR', description: '"Love the new stat cards — the shadow depth is perfect. Let\'s ship it."',
    user: 'Sophie L.', userColor: 'from-sky-400 to-violet-400', time: '14 min ago',
  },
  {
    id: 'e3', icon: <Users className="w-3.5 h-3.5" />, iconBg: 'bg-violet-500',
    title: '3 new team members invited', description: 'marcus@co.com, anya@co.com and leon@co.com joined the workspace.',
    time: '1 hr ago', tag: { label: 'Team', color: 'bg-violet-100 text-violet-700' },
  },
  {
    id: 'e4', icon: <AlertTriangle className="w-3.5 h-3.5" />, iconBg: 'bg-amber-500',
    title: 'Storage at 92%', description: 'You are approaching your 50 GB limit. Upgrade to avoid service disruption.',
    time: '3 hrs ago', tag: { label: 'Warning', color: 'bg-amber-100 text-amber-700' },
    actions: ['Upgrade plan', 'Dismiss'],
  },
  {
    id: 'e5', icon: <GitCommit className="w-3.5 h-3.5" />, iconBg: 'bg-slate-500',
    title: 'feat: add command palette', description: '⌘K shortcut, fuzzy search, grouped results. 12 files changed.',
    user: 'Michael H.', userColor: 'from-emerald-400 to-sky-400', time: '5 hrs ago',
  },
  {
    id: 'e6', icon: <CreditCard className="w-3.5 h-3.5" />, iconBg: 'bg-pink-500',
    title: 'Invoice paid — $29.00', description: 'Pro plan renewed for June 2026. Receipt sent to billing@co.com.',
    time: 'Yesterday', tag: { label: 'Billing', color: 'bg-pink-100 text-pink-700' },
  },
  {
    id: 'e7', icon: <Shield className="w-3.5 h-3.5" />, iconBg: 'bg-indigo-500',
    title: 'Two-factor auth enabled', description: 'Account security strengthened. Recovery codes generated.',
    user: 'Anya P.', userColor: 'from-pink-400 to-orange-400', time: '2 days ago', tag: { label: 'Security', color: 'bg-indigo-100 text-indigo-700' },
  },
]

export function VerticalTimeline() {
  return (
    <div className="space-y-0">
      {events.map((ev, i) => (
        <div key={ev.id} className="flex gap-4 group">
          {/* Icon + line */}
          <div className="flex flex-col items-center">
            <div className={`w-7 h-7 rounded-full flex items-center justify-center text-white shrink-0 shadow-clay z-10 ${ev.iconBg}`}>
              {ev.icon}
            </div>
            {i < events.length - 1 && <div className="w-px flex-1 bg-slate-100 my-1" />}
          </div>

          {/* Content */}
          <div className={`pb-6 flex-1 min-w-0 ${i === events.length - 1 ? 'pb-0' : ''}`}>
            <div className="flex items-start gap-2 flex-wrap">
              <p className="text-sm font-semibold text-slate-800 flex-1">{ev.title}</p>
              {ev.tag && (
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full shrink-0 ${ev.tag.color}`}>{ev.tag.label}</span>
              )}
            </div>
            {ev.description && <p className="text-xs text-slate-400 mt-0.5 leading-relaxed">{ev.description}</p>}
            <div className="flex items-center gap-3 mt-1.5">
              {ev.user && (
                <div className="flex items-center gap-1.5">
                  <div className={`w-4 h-4 rounded-full bg-gradient-to-br ${ev.userColor} shrink-0`} />
                  <span className="text-[11px] text-slate-500 font-medium">{ev.user}</span>
                </div>
              )}
              <span className="text-[11px] text-slate-400">{ev.time}</span>
            </div>
            {ev.actions && (
              <div className="flex gap-2 mt-2">
                {ev.actions.map((a, i) => (
                  <button key={a} className={`text-xs font-semibold px-3 py-1 rounded-lg cursor-pointer transition-colors
                    ${i === 0 ? 'bg-sky-500 text-white hover:bg-sky-600 shadow-clay' : 'text-slate-500 hover:bg-slate-100'}`}>
                    {a}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  )
}

export function CompactTimeline() {
  const compact = [
    { date: 'Jun 2026',  items: ['Aurora Pro v2.0 released', 'New team dashboard shipped'] },
    { date: 'May 2026',  items: ['Command palette added', 'Kanban board launched', 'Recharts integrated'] },
    { date: 'Apr 2026',  items: ['Design system tokens established', 'Clay UI Sandbox created'] },
    { date: 'Mar 2026',  items: ['Project kickoff', 'Initial tech stack decided'] },
  ]
  return (
    <div className="relative">
      <div className="absolute left-[7px] top-2 bottom-2 w-px bg-slate-100" />
      <div className="space-y-6">
        {compact.map(group => (
          <div key={group.date} className="flex gap-4">
            <div className="w-3.5 h-3.5 rounded-full bg-sky-400 border-2 border-white shadow-soft shrink-0 mt-0.5 z-10" />
            <div>
              <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-1.5">{group.date}</p>
              <div className="space-y-1.5">
                {group.items.map(item => (
                  <div key={item} className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <p className="text-sm text-slate-600">{item}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export function TimelineShowcase() {
  return (
    <div className="grid grid-cols-2 gap-8">
      <div>
        <p className="section-label">Activity Feed</p>
        <VerticalTimeline />
      </div>
      <div>
        <p className="section-label">Changelog Timeline</p>
        <CompactTimeline />
      </div>
    </div>
  )
}
