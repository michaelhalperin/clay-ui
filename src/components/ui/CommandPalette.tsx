import { useEffect, useRef, useState, useMemo } from 'react'
import { createPortal } from 'react-dom'
import {
  Search, LayoutDashboard, Users, BarChart2, Settings, FileText,
  Zap, Moon, Bell, CreditCard, HelpCircle, ArrowRight, Clock, Hash,
  ChevronRight
} from 'lucide-react'

export interface Command {
  id: string
  label: string
  category: string
  icon: React.ReactNode
  shortcut?: string[]
  description?: string
}

const showcaseCommands: Command[] = [
  { id: 'dashboard',    label: 'Go to Dashboard',      category: 'Navigate',  icon: <LayoutDashboard className="w-4 h-4" />, shortcut: ['G', 'D'] },
  { id: 'analytics',   label: 'Go to Analytics',       category: 'Navigate',  icon: <BarChart2 className="w-4 h-4" />,       shortcut: ['G', 'A'] },
  { id: 'users',       label: 'Manage Users',           category: 'Navigate',  icon: <Users className="w-4 h-4" />,           shortcut: ['G', 'U'] },
  { id: 'settings',    label: 'Open Settings',          category: 'Navigate',  icon: <Settings className="w-4 h-4" />,        shortcut: ['G', 'S'] },
  { id: 'docs',        label: 'Documentation',          category: 'Navigate',  icon: <FileText className="w-4 h-4" /> },
  { id: 'upgrade',     label: 'Upgrade to Pro',         category: 'Account',   icon: <Zap className="w-4 h-4" />,             description: 'Unlock unlimited projects' },
  { id: 'billing',     label: 'Manage Billing',         category: 'Account',   icon: <CreditCard className="w-4 h-4" /> },
  { id: 'darkmode',    label: 'Toggle Dark Mode',       category: 'Appearance', icon: <Moon className="w-4 h-4" />,           shortcut: ['⌘', 'Shift', 'D'] },
  { id: 'notifs',      label: 'Notification Settings',  category: 'Appearance', icon: <Bell className="w-4 h-4" /> },
  { id: 'new-project', label: 'Create New Project',     category: 'Actions',   icon: <Hash className="w-4 h-4" />,           shortcut: ['⌘', 'N'] },
  { id: 'help',        label: 'Help & Support',         category: 'Help',      icon: <HelpCircle className="w-4 h-4" /> },
]


function score(cmd: Command, q: string): number {
  const s = q.toLowerCase()
  const l = cmd.label.toLowerCase()
  if (l.startsWith(s)) return 3
  if (l.includes(s)) return 2
  if (cmd.category.toLowerCase().includes(s)) return 1
  return 0
}

export function CommandPalette({ open, onClose, commands }: { open: boolean; onClose: () => void; commands: Command[] }) {
  const recent = commands.slice(0, 3)
  const [query, setQuery] = useState('')
  const [idx, setIdx] = useState(0)
  const inputRef = useRef<HTMLInputElement>(null)
  const listRef = useRef<HTMLDivElement>(null)

  const results = useMemo(() => {
    if (!query.trim()) return null
    return commands.filter(c => score(c, query) > 0).sort((a, b) => score(b, query) - score(a, query))
  }, [query, commands])

  const displayed = results ?? recent
  const grouped = displayed.reduce<Record<string, Command[]>>((acc, cmd) => {
    const cat = results ? cmd.category : 'Recent'
    acc[cat] = [...(acc[cat] ?? []), cmd]
    return acc
  }, {})

  const flat = Object.values(grouped).flat()

  useEffect(() => { setIdx(0) }, [query])

  useEffect(() => {
    if (open) { setQuery(''); setTimeout(() => inputRef.current?.focus(), 50) }
  }, [open])

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (!open) return
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowDown') { e.preventDefault(); setIdx(i => (i + 1) % flat.length) }
      if (e.key === 'ArrowUp')   { e.preventDefault(); setIdx(i => (i - 1 + flat.length) % flat.length) }
      if (e.key === 'Enter' && flat[idx]) { onClose() }
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [open, flat, idx, onClose])

  // Scroll active item into view
  useEffect(() => {
    const el = listRef.current?.querySelector(`[data-idx="${idx}"]`) as HTMLElement | null
    el?.scrollIntoView({ block: 'nearest' })
  }, [idx])

  if (!open) return null

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-24 px-4"
      style={{ animation: 'fadeIn 0.1s ease' }}
      onClick={e => { if (e.target === e.currentTarget) onClose() }}>
      <div className="absolute inset-0 bg-slate-900/25 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full max-w-xl bg-white rounded-clay-lg border border-slate-100 shadow-clay-lg overflow-hidden flex flex-col"
        style={{ animation: 'slideUp 0.18s cubic-bezier(0.34,1.4,0.64,1)', maxHeight: '70vh' }}>

        {/* Search input */}
        <div className="flex items-center gap-3 px-4 py-3.5 border-b border-slate-100">
          <Search className="w-4 h-4 text-slate-400 shrink-0" />
          <input ref={inputRef} value={query} onChange={e => setQuery(e.target.value)}
            placeholder="Search commands, pages, actions…"
            className="flex-1 bg-transparent text-sm text-slate-800 placeholder-slate-300 focus:outline-none"
          />
          {query && (
            <button onClick={() => setQuery('')} className="text-xs text-slate-300 hover:text-slate-500 cursor-pointer px-1.5 py-0.5 rounded-lg hover:bg-slate-100 transition-colors">Clear</button>
          )}
          <kbd className="hidden sm:flex text-xs bg-slate-100 text-slate-400 px-1.5 py-0.5 rounded-lg font-mono">Esc</kbd>
        </div>

        {/* Results */}
        <div ref={listRef} className="overflow-y-auto py-2">
          {flat.length === 0 ? (
            <div className="py-10 text-center text-slate-400 text-sm">No results for "{query}"</div>
          ) : (
            Object.entries(grouped).map(([cat, items]) => {
              return (
                <div key={cat}>
                  <div className="px-4 py-1.5">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-slate-300">{cat}</span>
                  </div>
                  {items.map(cmd => {
                    const i = flat.indexOf(cmd)
                    const active = i === idx
                    return (
                      <button key={cmd.id} data-idx={i}
                        onMouseEnter={() => setIdx(i)}
                        onClick={onClose}
                        className={`w-full flex items-center gap-3 px-4 py-2.5 cursor-pointer transition-colors text-left ${active ? 'bg-sky-50' : 'hover:bg-slate-50'}`}>
                        <div className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 transition-colors ${active ? 'bg-sky-100 text-sky-600' : 'bg-slate-100 text-slate-400'}`}>
                          {cmd.icon}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className={`text-sm font-medium ${active ? 'text-sky-700' : 'text-slate-700'}`}>{cmd.label}</p>
                          {cmd.description && <p className="text-xs text-slate-400 truncate">{cmd.description}</p>}
                        </div>
                        {cmd.shortcut && (
                          <div className="hidden sm:flex items-center gap-0.5 shrink-0">
                            {cmd.shortcut.map(k => (
                              <kbd key={k} className="text-xs bg-slate-100 text-slate-400 px-1.5 py-0.5 rounded font-mono">{k}</kbd>
                            ))}
                          </div>
                        )}
                        {active && <ChevronRight className="w-3.5 h-3.5 text-sky-400 shrink-0" />}
                      </button>
                    )
                  })}
                </div>
              )
            })
          )}
        </div>

        {/* Footer */}
        <div className="border-t border-slate-100 px-4 py-2 flex items-center gap-4 text-xs text-slate-400">
          <span className="flex items-center gap-1"><kbd className="font-mono bg-slate-100 px-1 rounded">↑↓</kbd> navigate</span>
          <span className="flex items-center gap-1"><kbd className="font-mono bg-slate-100 px-1 rounded">↵</kbd> select</span>
          <span className="flex items-center gap-1"><kbd className="font-mono bg-slate-100 px-1 rounded">Esc</kbd> close</span>
          <span className="ml-auto flex items-center gap-1"><Clock className="w-3 h-3" /> Recent shown when empty</span>
        </div>
      </div>
    </div>,
    document.body
  )
}

export function CommandPaletteShowcase() {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') { e.preventDefault(); setOpen(o => !o) }
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [])

  return (
    <div className="space-y-4 w-full">
      <p className="section-label">Command Palette</p>
      <div className="clay-card p-6 space-y-4 w-full">
        <p className="text-sm text-slate-500">Full keyboard-driven command palette with fuzzy search, grouped results, arrow-key navigation, and recent commands when idle.</p>
        <div className="flex items-center gap-3 flex-wrap">
          <button onClick={() => setOpen(true)}
            className="flex items-center gap-2 bg-slate-100 hover:bg-slate-200 text-slate-600 text-sm font-medium px-4 py-2.5 rounded-clay cursor-pointer transition-all duration-200 border border-slate-200 shadow-soft">
            <Search className="w-4 h-4 text-slate-400" />
            <span className="text-slate-400">Search commands…</span>
            <div className="flex items-center gap-0.5 ml-4">
              <kbd className="text-xs bg-white border border-slate-200 text-slate-500 px-1.5 py-0.5 rounded font-mono">⌘</kbd>
              <kbd className="text-xs bg-white border border-slate-200 text-slate-500 px-1.5 py-0.5 rounded font-mono">K</kbd>
            </div>
          </button>
          <span className="text-xs text-slate-400">or press <kbd className="font-mono bg-slate-100 px-1.5 py-0.5 rounded text-slate-500">⌘K</kbd> anywhere</span>
        </div>
      </div>
      <CommandPalette open={open} onClose={() => setOpen(false)} commands={showcaseCommands} />
    </div>
  )
}
