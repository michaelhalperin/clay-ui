import { useState } from 'react'
import { X, LayoutDashboard, Users, BarChart2, Settings, HelpCircle, LogOut, ChevronRight, Bell } from 'lucide-react'

const navItems = [
  { icon: <LayoutDashboard className="w-4 h-4" />, label: 'Dashboard', badge: null },
  { icon: <BarChart2 className="w-4 h-4" />,       label: 'Analytics',  badge: null },
  { icon: <Users className="w-4 h-4" />,           label: 'Users',      badge: 12 },
  { icon: <Bell className="w-4 h-4" />,            label: 'Notifications', badge: 3 },
  { icon: <Settings className="w-4 h-4" />,        label: 'Settings',   badge: null },
]

export function Drawer({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [active, setActive] = useState('Dashboard')

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 bg-slate-900/20 backdrop-blur-sm z-40 transition-opacity duration-300 ${open ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={onClose}
      />
      {/* Panel */}
      <div
        className={`fixed top-0 left-0 h-full w-72 bg-white shadow-clay-lg z-50 flex flex-col transition-transform duration-300 ease-out ${open ? 'translate-x-0' : '-translate-x-full'}`}
      >
        {/* Header */}
        <div className="p-5 flex items-center justify-between border-b border-slate-100">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 bg-sky-500 rounded-xl flex items-center justify-center shadow-clay">
              <LayoutDashboard className="w-4 h-4 text-white" />
            </div>
            <div>
              <p className="font-heading font-bold text-slate-800 leading-none">Clay UI</p>
              <p className="text-xs text-slate-400 mt-0.5">Workspace</p>
            </div>
          </div>
          <button onClick={onClose} className="w-8 h-8 flex items-center justify-center rounded-xl hover:bg-slate-100 text-slate-400 cursor-pointer transition-colors">
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Nav */}
        <nav className="flex-1 overflow-y-auto p-3 space-y-0.5">
          <p className="text-xs font-semibold text-slate-300 uppercase tracking-widest px-3 py-2">Main</p>
          {navItems.map(item => (
            <button
              key={item.label}
              onClick={() => setActive(item.label)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium cursor-pointer transition-all duration-200 group ${
                active === item.label
                  ? 'bg-sky-50 text-sky-600 shadow-soft'
                  : 'text-slate-500 hover:bg-slate-50 hover:text-slate-700'
              }`}
            >
              <span className={`transition-colors ${active === item.label ? 'text-sky-500' : 'text-slate-400 group-hover:text-slate-500'}`}>{item.icon}</span>
              <span className="flex-1 text-left">{item.label}</span>
              {item.badge != null && (
                <span className={`text-xs px-1.5 py-0.5 rounded-full font-bold ${active === item.label ? 'bg-sky-100 text-sky-600' : 'bg-slate-100 text-slate-400'}`}>{item.badge}</span>
              )}
              {active === item.label && <ChevronRight className="w-3.5 h-3.5 text-sky-400" />}
            </button>
          ))}
        </nav>

        {/* Footer */}
        <div className="p-3 border-t border-slate-100 space-y-0.5">
          <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-slate-400 hover:bg-slate-50 hover:text-slate-600 cursor-pointer transition-colors">
            <HelpCircle className="w-4 h-4" />Help & Support
          </button>
          <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-red-400 hover:bg-red-50 cursor-pointer transition-colors">
            <LogOut className="w-4 h-4" />Sign out
          </button>
          {/* User chip */}
          <div className="mt-2 flex items-center gap-3 px-3 py-2.5 rounded-xl bg-slate-50">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-sky-400 to-violet-400 shrink-0" />
            <div className="min-w-0">
              <p className="text-sm font-semibold text-slate-800 truncate">Michael H.</p>
              <p className="text-xs text-slate-400 truncate">Pro plan</p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export function DrawerShowcase() {
  const [open, setOpen] = useState(false)

  return (
    <div className="space-y-4">
      <p className="section-label">Sidebar Drawer</p>
      <div className="clay-card p-6 bg-slate-50/40 flex flex-col items-center gap-4">
        <p className="text-sm text-slate-500 text-center">Click to open a full sidebar drawer with navigation, badges, and user profile.</p>
        <button
          onClick={() => setOpen(true)}
          className="inline-flex items-center gap-2 bg-sky-500 text-white font-semibold px-5 py-2.5 rounded-clay shadow-clay hover:bg-sky-600 hover:-translate-y-0.5 hover:shadow-clay-lg active:translate-y-0 cursor-pointer transition-all duration-200"
        >
          Open Drawer
        </button>
      </div>
      <Drawer open={open} onClose={() => setOpen(false)} />
    </div>
  )
}
