import { useState, useRef, useLayoutEffect } from 'react'
import { createPortal } from 'react-dom'
import { ChevronDown, LayoutGrid, Palette, Code2, Zap, BarChart2, Shield, Globe, BookOpen, Users, Bell, Settings, ChevronRight, Star } from 'lucide-react'

export interface MegaMenuItem { label: string; desc: string; icon: React.ReactNode; color: string; badge?: string }
export interface MegaMenuGroup { title: string; items: MegaMenuItem[] }

const MENUS: Record<string, { groups: MegaMenuGroup[]; featured?: { label: string; desc: string; color: string } }> = {
  Products: {
    groups: [
      {
        title: 'Build',
        items: [
          { label: 'Components',  desc: 'UI building blocks',       icon: <LayoutGrid className="w-4 h-4" />, color: '#0ea5e9' },
          { label: 'Design Tokens', desc: 'Colors, spacing, type', icon: <Palette className="w-4 h-4" />,    color: '#8b5cf6' },
          { label: 'Code Editor', desc: 'In-browser IDE',           icon: <Code2 className="w-4 h-4" />,     color: '#10b981', badge: 'Beta' },
        ],
      },
      {
        title: 'Scale',
        items: [
          { label: 'Analytics',   desc: 'Usage & performance',      icon: <BarChart2 className="w-4 h-4" />, color: '#f59e0b' },
          { label: 'Edge Deploy', desc: 'Global CDN delivery',      icon: <Globe className="w-4 h-4" />,     color: '#ec4899' },
          { label: 'Automation',  desc: 'CI/CD pipelines',          icon: <Zap className="w-4 h-4" />,       color: '#f97316', badge: 'New' },
        ],
      },
    ],
    featured: { label: 'Clay UI 3.0', desc: '14 new components — out now', color: '#0ea5e9' },
  },
  Resources: {
    groups: [
      {
        title: 'Learn',
        items: [
          { label: 'Documentation', desc: 'Guides & API reference',   icon: <BookOpen className="w-4 h-4" />, color: '#0ea5e9' },
          { label: 'Tutorials',     desc: 'Step-by-step projects',    icon: <Star className="w-4 h-4" />,     color: '#f59e0b' },
        ],
      },
      {
        title: 'Community',
        items: [
          { label: 'Discord',   desc: '12k+ members',    icon: <Users className="w-4 h-4" />,  color: '#8b5cf6' },
          { label: 'Blog',      desc: 'News & updates',  icon: <Globe className="w-4 h-4" />,  color: '#10b981' },
        ],
      },
    ],
  },
  Company: {
    groups: [
      {
        title: 'About',
        items: [
          { label: 'Security',  desc: 'SOC 2 & GDPR compliant', icon: <Shield className="w-4 h-4" />, color: '#10b981' },
          { label: 'Changelog', desc: 'What\'s new',             icon: <Bell className="w-4 h-4" />,   color: '#f59e0b' },
          { label: 'Settings',  desc: 'Account & billing',       icon: <Settings className="w-4 h-4" />,color: '#94a3b8' },
        ],
      },
    ],
  },
}

export function MegaDropdown({ label, menu }: { label: string; menu: typeof MENUS[string] }) {
  const [open, setOpen] = useState(false)
  const [pos, setPos]   = useState<{ top: number; left: number } | null>(null)
  const [ready, setReady] = useState(false)
  const triggerRef = useRef<HTMLButtonElement>(null)
  const panelRef   = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    if (!open || !triggerRef.current || !panelRef.current || ready) return
    const tr = triggerRef.current.getBoundingClientRect()
    const pr = panelRef.current.getBoundingClientRect()
    const left = Math.max(8, Math.min(tr.left, window.innerWidth - pr.width - 8))
    setPos({ top: tr.bottom + 8, left })
    setReady(true)
  }, [open, ready])

  useLayoutEffect(() => {
    if (!open) return
    const close = (e: MouseEvent) => {
      if (!triggerRef.current?.contains(e.target as Node) && !panelRef.current?.contains(e.target as Node)) {
        setOpen(false); setReady(false)
      }
    }
    document.addEventListener('mousedown', close)
    return () => document.removeEventListener('mousedown', close)
  }, [open])

  return (
    <>
      <button ref={triggerRef}
        onClick={() => { setOpen(o => !o); setReady(false) }}
        className={`flex items-center gap-1 px-3 py-2 rounded-xl text-sm font-medium cursor-pointer transition-all
          ${open ? 'bg-slate-100 text-slate-800' : 'text-slate-600 hover:bg-slate-100 hover:text-slate-800'}`}>
        {label}
        <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${open ? 'rotate-180' : ''}`} />
      </button>

      {open && createPortal(
        <div ref={panelRef}
          className="fixed z-[200] bg-white border border-slate-100 rounded-clay-lg shadow-clay-lg overflow-hidden"
          style={{ top: pos?.top ?? 0, left: pos?.left ?? 0, width: 500,
            opacity: ready ? 1 : 0, animation: ready ? 'slideDown 0.15s ease' : 'none' }}>
          <div className="flex">
            {/* Groups */}
            <div className="flex-1 p-4 grid gap-x-6" style={{ gridTemplateColumns: `repeat(${menu.groups.length}, 1fr)` }}>
              {menu.groups.map(g => (
                <div key={g.title}>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">{g.title}</p>
                  <div className="space-y-0.5">
                    {g.items.map(item => (
                      <button key={item.label}
                        className="w-full flex items-start gap-3 p-2.5 rounded-xl hover:bg-slate-50 cursor-pointer transition-colors text-left group">
                        <div className="w-8 h-8 rounded-xl flex items-center justify-center shrink-0 text-white"
                          style={{ background: item.color }}>
                          {item.icon}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-1.5">
                            <span className="text-sm font-semibold text-slate-700 group-hover:text-slate-900">{item.label}</span>
                            {item.badge && (
                              <span className="text-[9px] font-bold bg-sky-100 text-sky-600 px-1.5 py-0.5 rounded-full">{item.badge}</span>
                            )}
                          </div>
                          <p className="text-[11px] text-slate-400 mt-0.5">{item.desc}</p>
                        </div>
                        <ChevronRight className="w-3.5 h-3.5 text-slate-300 opacity-0 group-hover:opacity-100 transition-opacity mt-0.5 shrink-0" />
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Featured */}
            {menu.featured && (
              <div className="w-44 shrink-0 border-l border-slate-100 p-4 flex flex-col justify-between"
                style={{ background: menu.featured.color + '08' }}>
                <div>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Featured</p>
                  <div className="w-full aspect-video rounded-xl mb-3 flex items-center justify-center"
                    style={{ background: `linear-gradient(135deg, ${menu.featured.color}40, ${menu.featured.color}20)` }}>
                    <Star className="w-6 h-6" style={{ color: menu.featured.color }} />
                  </div>
                  <p className="text-sm font-bold text-slate-800">{menu.featured.label}</p>
                  <p className="text-[11px] text-slate-400 mt-0.5">{menu.featured.desc}</p>
                </div>
                <button className="mt-3 w-full text-xs font-semibold py-1.5 rounded-xl text-white cursor-pointer transition-colors"
                  style={{ background: menu.featured.color }}>
                  Learn more
                </button>
              </div>
            )}
          </div>
        </div>,
        document.body
      )}
    </>
  )
}

export function MegaMenuShowcase() {
  return (
    <div className="space-y-6">
      <p className="section-label">Click a nav item to open the mega menu</p>

      {/* Simulated navbar */}
      <div className="clay-card overflow-visible">
        <div className="flex items-center gap-1 px-4 py-3 border-b border-slate-100">
          {/* Logo */}
          <div className="flex items-center gap-2 mr-4">
            <div className="w-7 h-7 bg-sky-500 rounded-xl flex items-center justify-center shadow-clay">
              <span className="text-white text-[11px] font-heading font-bold">C</span>
            </div>
            <span className="font-heading font-bold text-slate-800 text-sm">Clay UI</span>
          </div>

          {/* Nav items */}
          {Object.entries(MENUS).map(([label, menu]) => (
            <MegaDropdown key={label} label={label} menu={menu} />
          ))}
          <button className="text-sm font-medium text-slate-600 hover:text-slate-800 px-3 py-2 rounded-xl hover:bg-slate-100 cursor-pointer transition-colors">
            Pricing
          </button>

          <div className="ml-auto flex items-center gap-2">
            <button className="text-sm font-semibold text-slate-600 hover:text-slate-800 px-3 py-2 cursor-pointer transition-colors">
              Sign in
            </button>
            <button className="text-sm font-semibold bg-sky-500 hover:bg-sky-600 text-white px-4 py-2 rounded-xl shadow-clay cursor-pointer transition-colors">
              Get started
            </button>
          </div>
        </div>

        {/* Placeholder content */}
        <div className="px-8 py-12 text-center">
          <div className="w-12 h-12 bg-sky-100 rounded-2xl flex items-center justify-center mx-auto mb-3">
            <LayoutGrid className="w-6 h-6 text-sky-500" />
          </div>
          <p className="text-sm font-semibold text-slate-600">Page content area</p>
          <p className="text-xs text-slate-400 mt-1">Open a menu above to see the mega dropdown</p>
        </div>
      </div>
    </div>
  )
}
