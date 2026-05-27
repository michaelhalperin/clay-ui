import { useState, useRef, useLayoutEffect } from 'react'
import { createPortal } from 'react-dom'
import { ChevronRight, Home, Folder, FileText, Settings, ChevronDown } from 'lucide-react'

export interface Crumb {
  label: string
  icon?: React.ReactNode
  href?: string
}

export function BreadcrumbTrail({ crumbs, separator = 'chevron', withIcons = false }: {
  crumbs: Crumb[]
  separator?: 'chevron' | 'slash' | 'dot'
  withIcons?: boolean
}) {
  const [collapsed, setCollapsed] = useState(true)
  const [menuPos, setMenuPos] = useState<{ top: number; left: number } | null>(null)
  const [menuReady, setMenuReady] = useState(false)
  const btnRef = useRef<HTMLButtonElement>(null)
  const menuRef = useRef<HTMLDivElement>(null)

  const SEP_MAP = {
    chevron: <ChevronRight className="w-3.5 h-3.5 text-slate-300 shrink-0" />,
    slash:   <span className="text-slate-300 text-sm mx-0.5 shrink-0">/</span>,
    dot:     <span className="w-1 h-1 rounded-full bg-slate-300 shrink-0" />,
  }

  const sep = SEP_MAP[separator]

  // Collapse middle items when > 4
  const showCollapse = collapsed && crumbs.length > 4
  const visibleCrumbs = showCollapse
    ? [crumbs[0], null, crumbs[crumbs.length - 2], crumbs[crumbs.length - 1]]
    : crumbs
  const hiddenCrumbs = showCollapse ? crumbs.slice(1, crumbs.length - 2) : []

  useLayoutEffect(() => {
    if (!menuPos || !menuRef.current || menuReady) return
    const pr = menuRef.current.getBoundingClientRect()
    const VH = window.innerHeight, VW = window.innerWidth
    const top = menuPos.top + pr.height > VH ? menuPos.top - pr.height - 4 : menuPos.top
    const left = Math.min(menuPos.left, VW - pr.width - 8)
    setMenuPos({ top, left })
    setMenuReady(true)
  }, [menuPos, menuReady])

  useLayoutEffect(() => {
    if (!menuPos) return
    const close = (e: MouseEvent) => {
      if (!btnRef.current?.contains(e.target as Node) && !menuRef.current?.contains(e.target as Node)) {
        setMenuPos(null); setMenuReady(false)
      }
    }
    document.addEventListener('mousedown', close)
    return () => document.removeEventListener('mousedown', close)
  }, [menuPos])

  const toggleMenu = () => {
    if (menuPos) { setMenuPos(null); setMenuReady(false); return }
    const rect = btnRef.current!.getBoundingClientRect()
    setMenuReady(false)
    setMenuPos({ top: rect.bottom + 4, left: rect.left })
  }

  return (
    <nav className="flex items-center gap-1 flex-wrap">
      {visibleCrumbs.map((crumb, i) => {
        const isLast = i === visibleCrumbs.length - 1

        if (crumb === null) {
          return (
            <div key="ellipsis" className="flex items-center gap-1">
              {sep}
              <button ref={btnRef} onClick={toggleMenu}
                className="flex items-center gap-0.5 px-2 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-500 text-xs font-semibold cursor-pointer transition-colors">
                •••
                <ChevronDown className="w-3 h-3" />
              </button>
            </div>
          )
        }

        return (
          <div key={i} className="flex items-center gap-1">
            {i > 0 && sep}
            <button
              className={`flex items-center gap-1.5 px-2 py-1 rounded-lg text-xs font-medium transition-colors cursor-pointer
                ${isLast
                  ? 'text-slate-800 font-semibold bg-slate-100 cursor-default'
                  : 'text-slate-500 hover:text-slate-700 hover:bg-slate-100'}`}>
              {withIcons && crumb.icon && (
                <span className="text-slate-400">{crumb.icon}</span>
              )}
              {crumb.label}
            </button>
          </div>
        )
      })}

      {menuPos && createPortal(
        <div ref={menuRef}
          className="fixed z-[200] bg-white border border-slate-100 rounded-xl shadow-clay-lg overflow-hidden py-1"
          style={{ top: menuPos.top, left: menuPos.left, minWidth: 160, opacity: menuReady ? 1 : 0,
            animation: menuReady ? 'slideDown 0.15s ease' : 'none' }}>
          {hiddenCrumbs.map((c, i) => (
            <button key={i}
              className="w-full flex items-center gap-2.5 px-3 py-2 text-xs font-medium text-slate-600 hover:bg-slate-50 cursor-pointer transition-colors text-left">
              <span className="text-slate-400">{c.icon ?? <Folder className="w-3.5 h-3.5" />}</span>
              {c.label}
            </button>
          ))}
        </div>,
        document.body
      )}
    </nav>
  )
}

const CRUMBS_SHORT: Crumb[] = [
  { label: 'Home',     icon: <Home className="w-3.5 h-3.5" /> },
  { label: 'Projects', icon: <Folder className="w-3.5 h-3.5" /> },
  { label: 'Clay UI',  icon: <FileText className="w-3.5 h-3.5" /> },
]

const CRUMBS_LONG: Crumb[] = [
  { label: 'Home',       icon: <Home className="w-3.5 h-3.5" /> },
  { label: 'Workspace',  icon: <Folder className="w-3.5 h-3.5" /> },
  { label: 'Projects',   icon: <Folder className="w-3.5 h-3.5" /> },
  { label: 'Design',     icon: <Folder className="w-3.5 h-3.5" /> },
  { label: 'Components', icon: <Folder className="w-3.5 h-3.5" /> },
  { label: 'Breadcrumb', icon: <FileText className="w-3.5 h-3.5" /> },
]

const CRUMBS_SETTINGS: Crumb[] = [
  { label: 'Dashboard', icon: <Home className="w-3.5 h-3.5" /> },
  { label: 'Settings',  icon: <Settings className="w-3.5 h-3.5" /> },
  { label: 'Security',  icon: <FileText className="w-3.5 h-3.5" /> },
]

export function BreadcrumbShowcase() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-5">
        <div>
          <p className="section-label">Chevron separator</p>
          <div className="clay-card p-4">
            <BreadcrumbTrail crumbs={CRUMBS_SHORT} separator="chevron" />
          </div>
        </div>
        <div>
          <p className="section-label">Slash separator</p>
          <div className="clay-card p-4">
            <BreadcrumbTrail crumbs={CRUMBS_SETTINGS} separator="slash" />
          </div>
        </div>
        <div>
          <p className="section-label">Dot separator</p>
          <div className="clay-card p-4">
            <BreadcrumbTrail crumbs={CRUMBS_SHORT} separator="dot" />
          </div>
        </div>
        <div>
          <p className="section-label">With icons</p>
          <div className="clay-card p-4">
            <BreadcrumbTrail crumbs={CRUMBS_SETTINGS} separator="chevron" withIcons />
          </div>
        </div>
        <div>
          <p className="section-label">Overflow collapse — click ••• to expand</p>
          <div className="clay-card p-4">
            <BreadcrumbTrail crumbs={CRUMBS_LONG} separator="chevron" withIcons />
          </div>
        </div>
      </div>
    </div>
  )
}
