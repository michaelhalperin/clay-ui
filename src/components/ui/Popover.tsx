import { useState, useRef, useEffect, useLayoutEffect } from 'react'
import { createPortal } from 'react-dom'
import { Info, Settings, Bell, User, LogOut, ChevronDown, Palette, Monitor, Moon } from 'lucide-react'

/* ─── Generic popover wrapper ─── */
export function Popover({ trigger, children, align = 'left' }: {
  trigger: React.ReactNode
  children: React.ReactNode
  align?: 'left' | 'right' | 'center'
}) {
  const [open, setOpen] = useState(false)
  const [pos, setPos] = useState<{ top: number; left: number } | null>(null)
  const [ready, setReady] = useState(false)

  const triggerRef = useRef<HTMLDivElement>(null)
  const popoverRef = useRef<HTMLDivElement>(null)
  const wrapperRef = useRef<HTMLDivElement>(null)

  // Close on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (
        wrapperRef.current && !wrapperRef.current.contains(e.target as Node) &&
        popoverRef.current && !popoverRef.current.contains(e.target as Node)
      ) setOpen(false)
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  // Calculate position after the popover renders, then flip if needed
  useLayoutEffect(() => {
    if (!open || !triggerRef.current || !popoverRef.current) return
    const GAP = 6
    const VW = window.innerWidth
    const VH = window.innerHeight
    const tr = triggerRef.current.getBoundingClientRect()
    const pr = popoverRef.current.getBoundingClientRect()

    // Vertical: prefer below, flip above if not enough room
    const top = tr.bottom + GAP + pr.height > VH
      ? Math.max(GAP, tr.top - GAP - pr.height)
      : tr.bottom + GAP

    // Horizontal: apply align preference, then clamp inside viewport
    let left: number
    if (align === 'right')       left = tr.right  - pr.width
    else if (align === 'center') left = tr.left + tr.width / 2 - pr.width / 2
    else                         left = tr.left

    left = Math.max(GAP, Math.min(left, VW - pr.width - GAP))

    setPos({ top, left })
    setReady(true)
  }, [open, align])

  const toggle = () => {
    setReady(false)
    setPos(null)
    setOpen(o => !o)
  }

  return (
    <div ref={wrapperRef} className="relative inline-block">
      <div ref={triggerRef} onClick={toggle} className="cursor-pointer">{trigger}</div>
      {open && createPortal(
        <div
          ref={popoverRef}
          className="fixed z-[200]"
          style={{
            top:     pos?.top  ?? 0,
            left:    pos?.left ?? 0,
            opacity: ready ? 1 : 0,
            animation: ready ? 'slideDown 0.15s ease' : 'none',
          }}
        >
          {children}
        </div>,
        document.body
      )}
    </div>
  )
}

/* ─── Info popover ─── */
function InfoPopover() {
  return (
    <Popover
      trigger={
        <button className="flex items-center gap-1.5 text-sm text-slate-500 hover:text-slate-700 cursor-pointer transition-colors px-3 py-2 rounded-xl hover:bg-slate-100">
          <Info className="w-4 h-4" /> What is this?
        </button>
      }
    >
      <div className="w-72 bg-white border border-slate-100 rounded-clay-lg shadow-clay-lg p-4">
        <h4 className="font-heading font-bold text-slate-800 text-sm mb-1.5">Clay UI Sandbox</h4>
        <p className="text-xs text-slate-500 leading-relaxed">A living showcase of hand-crafted React + TypeScript components. Built with Tailwind CSS and a custom clay design system blending minimalism with depth.</p>
        <div className="mt-3 pt-3 border-t border-slate-100 flex items-center gap-2">
          <span className="text-xs text-slate-400">React + TS + Tailwind</span>
          <span className="ml-auto text-[10px] font-bold bg-sky-100 text-sky-600 px-2 py-0.5 rounded-full">v1.0</span>
        </div>
      </div>
    </Popover>
  )
}

/* ─── Profile popover ─── */
function ProfilePopover() {
  return (
    <Popover align="right" trigger={
      <button className="flex items-center gap-2 cursor-pointer group">
        <div className="w-9 h-9 rounded-full bg-gradient-to-br from-sky-400 to-violet-400 shadow-soft group-hover:shadow-clay transition-all" />
        <ChevronDown className="w-4 h-4 text-slate-400 group-hover:text-slate-600 transition-colors" />
      </button>
    }>
      <div className="w-56 bg-white border border-slate-100 rounded-clay-lg shadow-clay-lg overflow-hidden">
        <div className="px-4 py-3 border-b border-slate-100">
          <p className="font-semibold text-slate-800 text-sm">Michael H.</p>
          <p className="text-xs text-slate-400">michael@example.com</p>
          <span className="inline-block mt-1.5 text-[10px] font-bold bg-violet-100 text-violet-600 px-2 py-0.5 rounded-full">Pro plan</span>
        </div>
        <div className="py-1">
          {[
            { icon: <User className="w-4 h-4" />, label: 'Profile' },
            { icon: <Settings className="w-4 h-4" />, label: 'Settings' },
            { icon: <Bell className="w-4 h-4" />, label: 'Notifications' },
          ].map(item => (
            <button key={item.label} className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-slate-600 hover:bg-slate-50 cursor-pointer transition-colors">
              <span className="text-slate-400">{item.icon}</span>{item.label}
            </button>
          ))}
        </div>
        <div className="py-1 border-t border-slate-100">
          <button className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-red-500 hover:bg-red-50 cursor-pointer transition-colors">
            <LogOut className="w-4 h-4" />Sign out
          </button>
        </div>
      </div>
    </Popover>
  )
}

/* ─── Theme picker popover ─── */
function ThemePopover() {
  const [theme, setTheme] = useState('system')
  const opts = [
    { id: 'light', icon: <Monitor className="w-4 h-4" />, label: 'Light' },
    { id: 'dark',  icon: <Moon className="w-4 h-4" />,    label: 'Dark' },
    { id: 'system',icon: <Palette className="w-4 h-4" />, label: 'System' },
  ]
  return (
    <Popover trigger={
      <button className="flex items-center gap-2 text-sm font-medium text-slate-600 bg-white border border-slate-200 px-3.5 py-2 rounded-xl shadow-soft hover:border-slate-300 cursor-pointer transition-all">
        <Palette className="w-4 h-4 text-slate-400" />
        Theme
        <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
      </button>
    }>
      <div className="w-40 bg-white border border-slate-100 rounded-clay-lg shadow-clay-lg p-1.5 space-y-0.5">
        {opts.map(o => (
          <button key={o.id} onClick={() => setTheme(o.id)}
            className={`w-full flex items-center gap-2.5 px-3 py-2 text-sm rounded-xl cursor-pointer transition-colors
              ${theme === o.id ? 'bg-sky-50 text-sky-700 font-semibold' : 'text-slate-600 hover:bg-slate-50'}`}>
            <span className={theme === o.id ? 'text-sky-500' : 'text-slate-400'}>{o.icon}</span>
            {o.label}
          </button>
        ))}
      </div>
    </Popover>
  )
}

/* ─── Notification popover ─── */
function NotifPopover() {
  const notifs = [
    { id: 1, title: 'Sophie commented', desc: '"Looks great, let\'s ship it."', time: '2m', read: false },
    { id: 2, title: 'Deploy succeeded', desc: 'aurora-prod is live', time: '14m', read: false },
    { id: 3, title: 'New user signed up', desc: 'marcus@company.com', time: '1h', read: true },
    { id: 4, title: 'Storage at 92%', desc: 'Consider upgrading your plan', time: '3h', read: true },
  ]
  const unread = notifs.filter(n => !n.read).length

  return (
    <Popover align="right" trigger={
      <button className="relative w-9 h-9 flex items-center justify-center bg-white border border-slate-200 rounded-xl shadow-soft hover:border-slate-300 cursor-pointer transition-all">
        <Bell className="w-4 h-4 text-slate-500" />
        {unread > 0 && (
          <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-[9px] font-bold rounded-full flex items-center justify-center border-2 border-white">{unread}</span>
        )}
      </button>
    }>
      <div className="w-80 bg-white border border-slate-100 rounded-clay-lg shadow-clay-lg overflow-hidden">
        <div className="px-4 py-3 border-b border-slate-100 flex items-center justify-between">
          <h4 className="font-heading font-bold text-slate-800 text-sm">Notifications</h4>
          <button className="text-xs font-semibold text-sky-500 hover:text-sky-700 cursor-pointer">Mark all read</button>
        </div>
        <div className="divide-y divide-slate-50 max-h-64 overflow-y-auto">
          {notifs.map(n => (
            <div key={n.id} className={`flex items-start gap-3 px-4 py-3 cursor-pointer hover:bg-slate-50 transition-colors ${!n.read ? 'bg-sky-50/40' : ''}`}>
              <div className={`w-2 h-2 rounded-full mt-1.5 shrink-0 ${!n.read ? 'bg-sky-400' : 'bg-transparent'}`} />
              <div className="flex-1 min-w-0">
                <p className="text-xs font-semibold text-slate-800">{n.title}</p>
                <p className="text-xs text-slate-400 truncate">{n.desc}</p>
              </div>
              <span className="text-[10px] text-slate-400 shrink-0">{n.time} ago</span>
            </div>
          ))}
        </div>
        <div className="px-4 py-2.5 border-t border-slate-100 text-center">
          <button className="text-xs font-semibold text-slate-500 hover:text-slate-700 cursor-pointer">View all notifications</button>
        </div>
      </div>
    </Popover>
  )
}

export function PopoverShowcase() {
  return (
    <div className="grid grid-cols-2 gap-8">
      <div className="space-y-6">
        <div>
          <p className="section-label">Info Popover</p>
          <InfoPopover />
        </div>
        <div>
          <p className="section-label">Theme Picker</p>
          <ThemePopover />
        </div>
      </div>
      <div className="space-y-6">
        <div>
          <p className="section-label">Notification Popover</p>
          <NotifPopover />
        </div>
        <div>
          <p className="section-label">Profile Popover</p>
          <ProfilePopover />
        </div>
      </div>
    </div>
  )
}
