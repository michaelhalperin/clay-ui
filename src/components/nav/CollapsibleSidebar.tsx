import { useState } from 'react'
import { LayoutDashboard, BarChart2, Users, Settings, Bell, FileText, ChevronRight, ChevronLeft, Folder, Star, Inbox, Zap } from 'lucide-react'

export interface NavItem {
  id: string; label: string; icon: React.ReactNode; badge?: number | string
  children?: { id: string; label: string }[]
}

const NAV: NavItem[] = [
  { id: 'dashboard', label: 'Dashboard',    icon: <LayoutDashboard className="w-4 h-4" /> },
  { id: 'analytics', label: 'Analytics',    icon: <BarChart2 className="w-4 h-4" />, badge: 'New' },
  { id: 'inbox',     label: 'Inbox',        icon: <Inbox className="w-4 h-4" />, badge: 5 },
  {
    id: 'projects', label: 'Projects', icon: <Folder className="w-4 h-4" />,
    children: [
      { id: 'clay-ui',  label: 'Clay UI' },
      { id: 'nexus',    label: 'Nexus' },
      { id: 'forge',    label: 'Forge' },
    ],
  },
  { id: 'team',      label: 'Team',         icon: <Users className="w-4 h-4" /> },
  { id: 'docs',      label: 'Documentation',icon: <FileText className="w-4 h-4" /> },
  { id: 'starred',   label: 'Starred',      icon: <Star className="w-4 h-4" /> },
  { id: 'automation',label: 'Automation',   icon: <Zap className="w-4 h-4" />, badge: 'Beta' },
]

const BOTTOM: NavItem[] = [
  { id: 'notifications', label: 'Notifications', icon: <Bell className="w-4 h-4" />, badge: 3 },
  { id: 'settings',      label: 'Settings',       icon: <Settings className="w-4 h-4" /> },
]

function Tooltip({ label, children }: { label: string; children: React.ReactNode }) {
  const [show, setShow] = useState(false)
  return (
    <div className="relative" onMouseEnter={() => setShow(true)} onMouseLeave={() => setShow(false)}>
      {children}
      {show && (
        <div className="absolute left-full top-1/2 -translate-y-1/2 ml-2 z-50 pointer-events-none"
          style={{ animation: 'fadeIn 0.1s ease' }}>
          <div className="bg-slate-800 text-white text-xs font-semibold px-2.5 py-1.5 rounded-lg whitespace-nowrap shadow-clay">
            {label}
          </div>
        </div>
      )}
    </div>
  )
}

export function CollapsibleSidebarShowcase() {
  const [collapsed, setCollapsed] = useState(false)
  const [active, setActive]     = useState('dashboard')
  const [expanded, setExpanded] = useState<Set<string>>(new Set(['projects']))

  const toggleExpanded = (id: string) =>
    setExpanded(s => { const n = new Set(s); n.has(id) ? n.delete(id) : n.add(id); return n })

  const BADGE_STYLE = (b: number | string) =>
    typeof b === 'number'
      ? 'bg-sky-500 text-white'
      : b === 'New' ? 'bg-emerald-500 text-white' : 'bg-violet-500 text-white'

  const renderItem = (item: NavItem) => {
    const isActive   = active === item.id || item.children?.some(c => c.id === active)
    const isExpanded = expanded.has(item.id)

    if (collapsed) {
      return (
        <Tooltip key={item.id} label={item.label}>
          <button onClick={() => setActive(item.id)}
            className={`w-full flex items-center justify-center p-2.5 rounded-xl cursor-pointer transition-all relative
              ${isActive ? 'bg-sky-100 text-sky-600' : 'text-slate-500 hover:bg-slate-100 hover:text-slate-700'}`}>
            {item.icon}
            {item.badge && (
              <span className={`absolute -top-0.5 -right-0.5 min-w-[14px] h-3.5 px-0.5 text-[8px] font-bold rounded-full flex items-center justify-center ${BADGE_STYLE(item.badge)}`}>
                {typeof item.badge === 'number' ? item.badge : ''}
              </span>
            )}
          </button>
        </Tooltip>
      )
    }

    return (
      <div key={item.id}>
        <button
          onClick={() => { item.children ? toggleExpanded(item.id) : setActive(item.id) }}
          className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl cursor-pointer transition-all text-left
            ${isActive ? 'bg-sky-50 text-sky-700' : 'text-slate-500 hover:bg-slate-100 hover:text-slate-700'}`}>
          <span className="shrink-0">{item.icon}</span>
          <span className="flex-1 text-sm font-medium truncate">{item.label}</span>
          {item.badge && (
            <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded-full shrink-0 ${BADGE_STYLE(item.badge)}`}>
              {item.badge}
            </span>
          )}
          {item.children && (
            <ChevronRight className={`w-3.5 h-3.5 text-slate-300 transition-transform shrink-0 ${isExpanded ? 'rotate-90' : ''}`} />
          )}
        </button>
        {item.children && isExpanded && (
          <div className="ml-6 mt-0.5 space-y-0.5 border-l-2 border-slate-100 pl-3">
            {item.children.map(child => (
              <button key={child.id} onClick={() => setActive(child.id)}
                className={`w-full text-left text-sm px-2 py-1.5 rounded-xl cursor-pointer transition-colors
                  ${active === child.id ? 'text-sky-600 font-semibold' : 'text-slate-500 hover:text-slate-700'}`}>
                {child.label}
              </button>
            ))}
          </div>
        )}
      </div>
    )
  }

  return (
    <div className="flex gap-6 items-start">
      {/* Sidebar */}
      <div className={`clay-card flex flex-col transition-all duration-200 shrink-0 overflow-hidden
        ${collapsed ? 'w-14' : 'w-52'}`} style={{ height: 480 }}>

        {/* Header */}
        <div className={`flex items-center border-b border-slate-100 ${collapsed ? 'justify-center px-2 py-4' : 'justify-between px-4 py-4'}`}>
          {!collapsed && (
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 bg-sky-500 rounded-lg flex items-center justify-center shadow-clay shrink-0">
                <span className="text-white text-[10px] font-bold">C</span>
              </div>
              <span className="font-heading font-bold text-slate-800 text-sm">Clay UI</span>
            </div>
          )}
          <button onClick={() => setCollapsed(c => !c)}
            className="w-6 h-6 flex items-center justify-center rounded-lg hover:bg-slate-100 cursor-pointer transition-colors text-slate-400 shrink-0">
            {collapsed ? <ChevronRight className="w-3.5 h-3.5" /> : <ChevronLeft className="w-3.5 h-3.5" />}
          </button>
        </div>

        {/* Nav */}
        <nav className={`flex-1 overflow-y-auto py-3 space-y-0.5 ${collapsed ? 'px-1.5' : 'px-2'}`}>
          {!collapsed && <p className="text-[9px] font-bold text-slate-300 uppercase tracking-widest px-3 pb-1">Main</p>}
          {NAV.map(item => renderItem(item))}
        </nav>

        {/* Bottom */}
        <div className={`border-t border-slate-100 py-3 space-y-0.5 ${collapsed ? 'px-1.5' : 'px-2'}`}>
          {BOTTOM.map(item => renderItem(item))}
          {/* Avatar */}
          <div className={`flex items-center gap-2.5 px-3 py-2 mt-1 rounded-xl hover:bg-slate-50 cursor-pointer transition-colors
            ${collapsed ? 'justify-center' : ''}`}>
            <div className="w-7 h-7 rounded-full bg-sky-500 flex items-center justify-center text-white text-[10px] font-bold shrink-0">MH</div>
            {!collapsed && (
              <div className="flex-1 min-w-0">
                <p className="text-xs font-semibold text-slate-700 truncate">Michael Hale</p>
                <p className="text-[10px] text-slate-400 truncate">Pro plan</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Content preview */}
      <div className="flex-1 clay-card p-5 space-y-3" style={{ minHeight: 480 }}>
        <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Current page</p>
        <h2 className="font-heading font-bold text-xl text-slate-800 capitalize">{active.replace('-', ' ')}</h2>
        <div className="space-y-2">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="h-3 bg-slate-100 rounded-full" style={{ width: `${[80, 95, 65, 75][i]}%` }} />
          ))}
        </div>
      </div>
    </div>
  )
}
