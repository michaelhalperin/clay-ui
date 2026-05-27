import { useState } from 'react'
import { GitCommit, GitPullRequest, MessageSquare, Rocket, Star, UserPlus, Bug, Zap } from 'lucide-react'

export type EventType = 'commit' | 'pr' | 'comment' | 'deploy' | 'star' | 'join' | 'bug' | 'release'

export interface FeedEvent {
  id: string; type: EventType; actor: string; initials: string; color: string
  title: string; detail?: string; time: string; group: 'Today' | 'Yesterday' | 'Earlier'
  repo?: string; tags?: string[]
}

const EVENT_META: Record<EventType, { icon: React.ReactNode; bg: string; color: string }> = {
  commit:  { icon: <GitCommit className="w-3.5 h-3.5" />,    bg: 'bg-sky-100',     color: 'text-sky-600' },
  pr:      { icon: <GitPullRequest className="w-3.5 h-3.5" />,bg: 'bg-violet-100',  color: 'text-violet-600' },
  comment: { icon: <MessageSquare className="w-3.5 h-3.5" />, bg: 'bg-slate-100',   color: 'text-slate-600' },
  deploy:  { icon: <Rocket className="w-3.5 h-3.5" />,        bg: 'bg-emerald-100', color: 'text-emerald-600' },
  star:    { icon: <Star className="w-3.5 h-3.5" />,          bg: 'bg-amber-100',   color: 'text-amber-600' },
  join:    { icon: <UserPlus className="w-3.5 h-3.5" />,      bg: 'bg-pink-100',    color: 'text-pink-600' },
  bug:     { icon: <Bug className="w-3.5 h-3.5" />,           bg: 'bg-red-100',     color: 'text-red-500' },
  release: { icon: <Zap className="w-3.5 h-3.5" />,           bg: 'bg-indigo-100',  color: 'text-indigo-600' },
}

const EVENTS: FeedEvent[] = [
  { id: 'e1',  type: 'deploy',  actor: 'Sophie L.',  initials: 'SL', color: '#0ea5e9', title: 'Deployed to production', detail: 'v2.5.0 — 0 errors, 1.2s build', repo: 'clay-ui', time: '2m ago',   group: 'Today', tags: ['production'] },
  { id: 'e2',  type: 'pr',      actor: 'Marcus T.',  initials: 'MT', color: '#8b5cf6', title: 'Opened pull request #142', detail: 'feat: add resizable panel component', repo: 'clay-ui', time: '18m ago',  group: 'Today', tags: ['ready for review'] },
  { id: 'e3',  type: 'commit',  actor: 'Anya P.',    initials: 'AP', color: '#ec4899', title: 'Pushed 3 commits to main', detail: 'fix: pointer events on slider drag', repo: 'clay-ui', time: '1h ago',   group: 'Today' },
  { id: 'e4',  type: 'comment', actor: 'Leon K.',    initials: 'LK', color: '#f97316', title: 'Commented on PR #138', detail: '"Looks good! One nit about the z-index ordering."', repo: 'clay-ui', time: '2h ago',   group: 'Today' },
  { id: 'e5',  type: 'bug',     actor: 'Priya S.',   initials: 'PS', color: '#10b981', title: 'Filed issue #221', detail: 'Context menu clips in Safari overflow: hidden', repo: 'clay-ui', time: '4h ago',   group: 'Today', tags: ['bug', 'safari'] },
  { id: 'e6',  type: 'star',    actor: 'Yuki T.',    initials: 'YT', color: '#06b6d4', title: 'Starred the repository', repo: 'clay-ui', time: 'Yesterday', group: 'Yesterday' },
  { id: 'e7',  type: 'release', actor: 'Sophie L.',  initials: 'SL', color: '#0ea5e9', title: 'Published release v2.4.0', detail: '12 new components, 8 bug fixes', repo: 'clay-ui', time: 'Yesterday', group: 'Yesterday', tags: ['v2.4.0'] },
  { id: 'e8',  type: 'join',    actor: 'Carlos R.',  initials: 'CR', color: '#84cc16', title: 'Joined the team', detail: 'Welcomed as contributor', time: 'Yesterday', group: 'Yesterday' },
  { id: 'e9',  type: 'commit',  actor: 'Marcus T.',  initials: 'MT', color: '#8b5cf6', title: 'Pushed 7 commits to feat/datagrid', detail: 'wip: sortable columns, filter row', repo: 'clay-ui', time: '2d ago',   group: 'Earlier' },
  { id: 'e10', type: 'pr',      actor: 'Anya P.',    initials: 'AP', color: '#ec4899', title: 'Merged pull request #135', detail: 'chore: upgrade Tailwind to v4', repo: 'clay-ui', time: '3d ago',   group: 'Earlier', tags: ['merged'] },
]

const TAG_COLORS: Record<string, string> = {
  production:       'bg-emerald-100 text-emerald-700',
  'ready for review':'bg-sky-100 text-sky-700',
  bug:              'bg-red-100 text-red-600',
  safari:           'bg-orange-100 text-orange-600',
  merged:           'bg-violet-100 text-violet-700',
}

export function ActivityFeedShowcase() {
  const [filter, setFilter] = useState<EventType | 'all'>('all')

  const groups = (['Today', 'Yesterday', 'Earlier'] as const)
  const visible = EVENTS.filter(e => filter === 'all' || e.type === filter)

  return (
    <div className="grid grid-cols-3 gap-6">
      {/* Feed */}
      <div className="col-span-2 space-y-1">
        {/* Filter bar */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          <button onClick={() => setFilter('all')}
            className={`text-[10px] font-bold uppercase tracking-wide px-2.5 py-1 rounded-lg border cursor-pointer transition-all
              ${filter === 'all' ? 'bg-slate-800 text-white border-slate-800' : 'bg-white text-slate-400 border-slate-200 hover:border-slate-300'}`}>
            All
          </button>
          {(Object.keys(EVENT_META) as EventType[]).map(t => {
            const m = EVENT_META[t]
            return (
              <button key={t} onClick={() => setFilter(t)}
                className={`flex items-center gap-1 text-[10px] font-bold uppercase tracking-wide px-2.5 py-1 rounded-lg border cursor-pointer transition-all capitalize
                  ${filter === t ? `${m.bg} ${m.color} border-transparent` : 'bg-white text-slate-400 border-slate-200 hover:border-slate-300'}`}>
                {m.icon}{t}
              </button>
            )
          })}
        </div>

        {groups.map(group => {
          const items = visible.filter(e => e.group === group)
          if (!items.length) return null
          return (
            <div key={group}>
              <div className="flex items-center gap-3 mb-2">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest shrink-0">{group}</p>
                <div className="flex-1 h-px bg-slate-100" />
              </div>
              <div className="space-y-1">
                {items.map(ev => {
                  const m = EVENT_META[ev.type]
                  return (
                    <div key={ev.id}
                      className="flex gap-3 p-3 rounded-xl hover:bg-slate-50 transition-colors group cursor-default">
                      {/* Actor avatar */}
                      <div className="shrink-0 relative">
                        <div className="w-8 h-8 rounded-full flex items-center justify-center text-white text-[10px] font-bold"
                          style={{ background: ev.color }}>
                          {ev.initials}
                        </div>
                        <div className={`absolute -bottom-0.5 -right-0.5 w-4 h-4 rounded-full flex items-center justify-center ${m.bg} ${m.color}`}>
                          {m.icon}
                        </div>
                      </div>

                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-baseline gap-2 flex-wrap">
                          <span className="text-xs font-bold text-slate-800">{ev.actor}</span>
                          <span className="text-xs text-slate-600">{ev.title}</span>
                          {ev.repo && (
                            <span className="text-[10px] font-semibold text-sky-500 bg-sky-50 px-1.5 py-0.5 rounded shrink-0">{ev.repo}</span>
                          )}
                        </div>
                        {ev.detail && (
                          <p className="text-[11px] text-slate-400 mt-0.5 truncate italic">"{ev.detail}"</p>
                        )}
                        {ev.tags && (
                          <div className="flex gap-1 mt-1 flex-wrap">
                            {ev.tags.map(tag => (
                              <span key={tag} className={`text-[9px] font-bold px-1.5 py-0.5 rounded-full ${TAG_COLORS[tag] ?? 'bg-slate-100 text-slate-500'}`}>
                                {tag}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>

                      <span className="text-[10px] text-slate-300 shrink-0 mt-0.5">{ev.time}</span>
                    </div>
                  )
                })}
              </div>
            </div>
          )
        })}

        {visible.length === 0 && (
          <div className="text-center py-10 text-sm text-slate-300">No events of this type</div>
        )}
      </div>

      {/* Sidebar stats */}
      <div className="space-y-4">
        <div className="clay-card p-4">
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3">Activity by type</p>
          <div className="space-y-2">
            {(Object.entries(EVENT_META) as [EventType, typeof EVENT_META[EventType]][]).map(([type, meta]) => {
              const count = EVENTS.filter(e => e.type === type).length
              if (!count) return null
              return (
                <div key={type} className="flex items-center gap-2">
                  <span className={`${meta.bg} ${meta.color} w-5 h-5 rounded-md flex items-center justify-center shrink-0`}>
                    {meta.icon}
                  </span>
                  <span className="text-xs text-slate-600 flex-1 capitalize">{type}</span>
                  <span className="text-xs font-bold text-slate-700">{count}</span>
                  <div className="w-12 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                    <div className="h-full bg-slate-300 rounded-full" style={{ width: `${(count / EVENTS.length) * 100}%` }} />
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        <div className="clay-card p-4">
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3">Top contributors</p>
          {['Sophie L.', 'Marcus T.', 'Anya P.'].map((name, i) => {
            const count = EVENTS.filter(e => e.actor === name).length
            const colors = ['#0ea5e9', '#8b5cf6', '#ec4899']
            return (
              <div key={name} className="flex items-center gap-2 mb-2">
                <div className="w-6 h-6 rounded-full flex items-center justify-center text-white text-[9px] font-bold shrink-0"
                  style={{ background: colors[i] }}>
                  {name.split(' ').map(n => n[0]).join('')}
                </div>
                <span className="text-xs text-slate-600 flex-1">{name}</span>
                <span className="text-xs font-bold text-slate-700">{count} events</span>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
