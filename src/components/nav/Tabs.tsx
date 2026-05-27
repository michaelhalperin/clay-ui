import { useState } from 'react'
import { BarChart2, Users, Settings, FileText, Bell, Shield } from 'lucide-react'

export interface Tab { id: string; label: string; icon?: React.ReactNode; badge?: number }

export function CardTabs({ tabs, content }: { tabs: Tab[]; content: Record<string, React.ReactNode> }) {
  const [active, setActive] = useState(tabs[0].id)
  return (
    <div className="clay-card overflow-hidden">
      <div className="flex border-b border-slate-100 bg-slate-50/60 px-2 pt-2 gap-1">
        {tabs.map(t => (
          <button key={t.id} onClick={() => setActive(t.id)}
            className={`flex items-center gap-2 px-4 py-2.5 text-sm font-semibold rounded-t-xl cursor-pointer transition-all duration-200 border border-b-0 ${
              active === t.id
                ? 'bg-white text-slate-800 border-slate-200 shadow-[0_-2px_8px_rgba(0,0,0,0.04)]'
                : 'bg-transparent text-slate-400 border-transparent hover:text-slate-600'
            }`}>
            {t.icon}
            {t.label}
            {t.badge != null && (
              <span className={`text-xs px-1.5 py-0.5 rounded-full font-bold ${active === t.id ? 'bg-sky-100 text-sky-600' : 'bg-slate-200 text-slate-500'}`}>{t.badge}</span>
            )}
          </button>
        ))}
      </div>
      <div className="p-5">{content[active]}</div>
    </div>
  )
}

export function PillTabs({ tabs }: { tabs: Tab[] }) {
  const [active, setActive] = useState(tabs[0].id)
  return (
    <div className="space-y-4">
      <div className="bg-slate-100 rounded-clay p-1 flex gap-1 w-fit">
        {tabs.map(t => (
          <button key={t.id} onClick={() => setActive(t.id)}
            className={`flex items-center gap-2 px-4 py-2 text-sm font-semibold rounded-xl cursor-pointer transition-all duration-200 ${active === t.id ? 'bg-white text-slate-800 shadow-clay' : 'text-slate-400 hover:text-slate-600'}`}>
            {t.icon}{t.label}
          </button>
        ))}
      </div>
      <div className="clay-card p-4 text-sm text-slate-500">
        Showing content for <strong className="text-slate-700">{tabs.find(t => t.id === active)?.label}</strong>.
      </div>
    </div>
  )
}

const mainTabs: Tab[] = [
  { id: 'overview',  label: 'Overview',  icon: <BarChart2 className="w-4 h-4" /> },
  { id: 'users',     label: 'Users',     icon: <Users className="w-4 h-4" />, badge: 12 },
  { id: 'docs',      label: 'Docs',      icon: <FileText className="w-4 h-4" /> },
  { id: 'settings',  label: 'Settings',  icon: <Settings className="w-4 h-4" /> },
]

const settingsTabs: Tab[] = [
  { id: 'general',   label: 'General',   icon: <Settings className="w-4 h-4" /> },
  { id: 'notifs',    label: 'Notifications', icon: <Bell className="w-4 h-4" /> },
  { id: 'security',  label: 'Security',  icon: <Shield className="w-4 h-4" /> },
]

export function TabsShowcase() {
  return (
    <div className="space-y-8">
      <div>
        <p className="section-label">Card Tabs</p>
        <CardTabs
          tabs={mainTabs}
          content={{
            overview:  <p className="text-sm text-slate-500">Overview content — charts, KPIs, summaries go here.</p>,
            users:     <p className="text-sm text-slate-500">User management — table, filters, invite flow.</p>,
            docs:      <p className="text-sm text-slate-500">Documentation — markdown renderer, search, sidebar nav.</p>,
            settings:  <p className="text-sm text-slate-500">Settings — account, integrations, billing preferences.</p>,
          }}
        />
      </div>
      <div>
        <p className="section-label">Pill Tabs</p>
        <PillTabs tabs={settingsTabs} />
      </div>
    </div>
  )
}
