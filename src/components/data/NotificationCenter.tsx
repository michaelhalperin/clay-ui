import { useState } from 'react'
import { Bell, MessageCircle, AlertTriangle, Zap, UserPlus, CheckCheck, X, Settings } from 'lucide-react'

export interface Notification {
  id: string
  type: 'message' | 'alert' | 'system' | 'social'
  title: string
  body: string
  time: string
  group: 'Today' | 'Yesterday' | 'Earlier'
  read: boolean
  avatar?: string
  avatarColor?: string
  initials?: string
}

const INITIAL: Notification[] = [
  { id: 'n1',  type: 'message', title: 'Sophie replied to your comment',    body: '"Looks great! Let\'s ship it tomorrow."',      time: '2m ago',   group: 'Today',     read: false, avatarColor: '#0ea5e9', initials: 'SL' },
  { id: 'n2',  type: 'alert',   title: 'Disk usage above 85%',              body: 'Server disk-01 is running low on space.',       time: '14m ago',  group: 'Today',     read: false },
  { id: 'n3',  type: 'social',  title: 'Marcus started following you',       body: 'You now have 128 followers.',                   time: '1h ago',   group: 'Today',     read: false, avatarColor: '#8b5cf6', initials: 'MT' },
  { id: 'n4',  type: 'system',  title: 'Deploy to production succeeded',     body: 'v2.4.1 is now live. 0 errors.',                 time: '3h ago',   group: 'Today',     read: true  },
  { id: 'n5',  type: 'message', title: 'Anya shared a file with you',        body: 'design-tokens-v3.fig',                         time: '5h ago',   group: 'Today',     read: true,  avatarColor: '#ec4899', initials: 'AP' },
  { id: 'n6',  type: 'alert',   title: 'Payment failed for Pro plan',        body: 'Update your billing details to continue.',      time: 'Yesterday', group: 'Yesterday', read: false },
  { id: 'n7',  type: 'social',  title: 'Leon commented on your post',        body: '"This is exactly what I was looking for!"',     time: 'Yesterday', group: 'Yesterday', read: true,  avatarColor: '#f97316', initials: 'LK' },
  { id: 'n8',  type: 'system',  title: 'New version available: 3.1.0',       body: 'Includes performance and security patches.',    time: '2d ago',   group: 'Earlier',   read: true  },
  { id: 'n9',  type: 'message', title: 'Priya sent you a direct message',    body: '"Can we sync on the API changes?"',             time: '3d ago',   group: 'Earlier',   read: true,  avatarColor: '#10b981', initials: 'PS' },
]

const TYPE_ICON: Record<string, { icon: React.ReactNode; bg: string; color: string }> = {
  message: { icon: <MessageCircle className="w-3.5 h-3.5" />, bg: 'bg-sky-100',    color: 'text-sky-600' },
  alert:   { icon: <AlertTriangle className="w-3.5 h-3.5" />, bg: 'bg-amber-100',  color: 'text-amber-600' },
  system:  { icon: <Zap className="w-3.5 h-3.5" />,           bg: 'bg-violet-100', color: 'text-violet-600' },
  social:  { icon: <UserPlus className="w-3.5 h-3.5" />,      bg: 'bg-emerald-100',color: 'text-emerald-600' },
}

export function NotificationCenterShowcase() {
  const [notes, setNotes] = useState(INITIAL)
  const [tab, setTab] = useState<'all' | 'unread'>('all')

  const unreadCount = notes.filter(n => !n.read).length

  const markRead = (id: string) =>
    setNotes(prev => prev.map(n => n.id === id ? { ...n, read: true } : n))

  const dismiss = (id: string) =>
    setNotes(prev => prev.filter(n => n.id !== id))

  const markAll = () =>
    setNotes(prev => prev.map(n => ({ ...n, read: true })))

  const visible = tab === 'unread' ? notes.filter(n => !n.read) : notes
  const groups = (['Today', 'Yesterday', 'Earlier'] as const).filter(g => visible.some(n => n.group === g))

  return (
    <div className="max-w-md mx-auto">
      <div className="clay-card overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3.5 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <Bell className="w-4 h-4 text-slate-600" />
            <span className="font-heading font-bold text-slate-800 text-sm">Notifications</span>
            {unreadCount > 0 && (
              <span className="text-[10px] font-bold bg-sky-500 text-white w-5 h-5 rounded-full flex items-center justify-center leading-none">
                {unreadCount}
              </span>
            )}
          </div>
          <div className="flex items-center gap-1">
            {unreadCount > 0 && (
              <button onClick={markAll}
                className="text-[11px] font-semibold text-sky-500 hover:text-sky-600 px-2 py-1 rounded-lg hover:bg-sky-50 cursor-pointer transition-colors flex items-center gap-1">
                <CheckCheck className="w-3 h-3" />Mark all read
              </button>
            )}
            <button className="w-7 h-7 flex items-center justify-center rounded-lg hover:bg-slate-100 cursor-pointer transition-colors text-slate-400">
              <Settings className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-slate-100 px-4">
          {(['all', 'unread'] as const).map(t => (
            <button key={t} onClick={() => setTab(t)}
              className={`relative text-[11px] font-bold uppercase tracking-widest py-2.5 px-3 mr-1 cursor-pointer transition-colors capitalize
                ${tab === t ? 'text-sky-600' : 'text-slate-400 hover:text-slate-600'}`}>
              {t === 'unread' ? `Unread${unreadCount ? ` (${unreadCount})` : ''}` : 'All'}
              {tab === t && <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-sky-500 rounded-full" />}
            </button>
          ))}
        </div>

        {/* List */}
        <div className="max-h-[420px] overflow-y-auto">
          {groups.length === 0 && (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <Bell className="w-8 h-8 text-slate-200 mb-3" />
              <p className="text-sm font-semibold text-slate-400">No notifications</p>
              <p className="text-xs text-slate-300 mt-1">You're all caught up!</p>
            </div>
          )}
          {groups.map(group => (
            <div key={group}>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-4 py-2 bg-slate-50/60 sticky top-0">
                {group}
              </p>
              {visible.filter(n => n.group === group).map(n => {
                const meta = TYPE_ICON[n.type]
                return (
                  <div key={n.id}
                    onClick={() => markRead(n.id)}
                    className={`group flex items-start gap-3 px-4 py-3 cursor-pointer transition-colors hover:bg-slate-50
                      ${!n.read ? 'bg-sky-50/40' : ''}`}>
                    {/* Avatar or icon */}
                    <div className="relative shrink-0 mt-0.5">
                      {n.initials ? (
                        <div className="w-9 h-9 rounded-full flex items-center justify-center text-white text-xs font-bold shadow-soft"
                          style={{ background: n.avatarColor }}>
                          {n.initials}
                        </div>
                      ) : (
                        <div className={`w-9 h-9 rounded-full flex items-center justify-center ${meta.bg} ${meta.color}`}>
                          {meta.icon}
                        </div>
                      )}
                      {n.initials && (
                        <div className={`absolute -bottom-0.5 -right-0.5 w-4 h-4 rounded-full flex items-center justify-center ${meta.bg} ${meta.color}`}
                          style={{ fontSize: 9 }}>
                          {meta.icon}
                        </div>
                      )}
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <p className={`text-xs leading-snug ${!n.read ? 'font-semibold text-slate-800' : 'font-medium text-slate-600'}`}>
                        {n.title}
                      </p>
                      <p className="text-[11px] text-slate-400 mt-0.5 truncate">{n.body}</p>
                      <p className="text-[10px] text-slate-300 mt-1">{n.time}</p>
                    </div>

                    {/* Right side */}
                    <div className="flex items-center gap-1.5 shrink-0">
                      {!n.read && (
                        <span className="w-2 h-2 rounded-full bg-sky-500 shrink-0 group-hover:hidden" />
                      )}
                      <button onClick={e => { e.stopPropagation(); dismiss(n.id) }}
                        className="opacity-0 group-hover:opacity-100 w-6 h-6 flex items-center justify-center rounded-lg hover:bg-slate-200 cursor-pointer transition-all text-slate-400">
                        <X className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                )
              })}
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="border-t border-slate-100 px-4 py-2.5 text-center">
          <button className="text-xs font-semibold text-sky-500 hover:text-sky-600 cursor-pointer transition-colors">
            View all notifications
          </button>
        </div>
      </div>
    </div>
  )
}
