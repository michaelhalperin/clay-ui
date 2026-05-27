import { useState, useEffect } from 'react'
import { Command, Search, Bold, Italic, Save, Copy, Scissors, Clipboard, Undo, Redo, ZoomIn, ZoomOut } from 'lucide-react'

export interface Shortcut {
  action: string
  keys: string[][]
  icon?: React.ReactNode
  category: string
}

const SHORTCUTS: Shortcut[] = [
  { category: 'General',    action: 'Command palette',  keys: [['⌘', 'K']],                icon: <Command className="w-3 h-3" /> },
  { category: 'General',    action: 'Quick search',     keys: [['⌘', 'P']],                icon: <Search className="w-3 h-3" /> },
  { category: 'General',    action: 'Save',             keys: [['⌘', 'S']],                icon: <Save className="w-3 h-3" /> },
  { category: 'General',    action: 'Undo',             keys: [['⌘', 'Z']],                icon: <Undo className="w-3 h-3" /> },
  { category: 'General',    action: 'Redo',             keys: [['⌘', '⇧', 'Z']],           icon: <Redo className="w-3 h-3" /> },
  { category: 'Editing',    action: 'Bold',             keys: [['⌘', 'B']],                icon: <Bold className="w-3 h-3" /> },
  { category: 'Editing',    action: 'Italic',           keys: [['⌘', 'I']],                icon: <Italic className="w-3 h-3" /> },
  { category: 'Editing',    action: 'Copy',             keys: [['⌘', 'C']],                icon: <Copy className="w-3 h-3" /> },
  { category: 'Editing',    action: 'Cut',              keys: [['⌘', 'X']],                icon: <Scissors className="w-3 h-3" /> },
  { category: 'Editing',    action: 'Paste',            keys: [['⌘', 'V']],                icon: <Clipboard className="w-3 h-3" /> },
  { category: 'Navigation', action: 'Go to line',      keys: [['⌃', 'G']],                icon: null },
  { category: 'Navigation', action: 'Jump to top',     keys: [['⌘', '↑']],                icon: null },
  { category: 'Navigation', action: 'Jump to bottom',  keys: [['⌘', '↓']],                icon: null },
  { category: 'Navigation', action: 'Switch tab',      keys: [['⌘', '⇧', '['], ['⌘', '⇧', ']']], icon: null },
  { category: 'View',       action: 'Zoom in',         keys: [['⌘', '+']],                icon: <ZoomIn className="w-3 h-3" /> },
  { category: 'View',       action: 'Zoom out',        keys: [['⌘', '-']],                icon: <ZoomOut className="w-3 h-3" /> },
  { category: 'View',       action: 'Toggle sidebar',  keys: [['⌘', '\\']],               icon: null },
  { category: 'View',       action: 'Full screen',     keys: [['⌘', '⌃', 'F']],           icon: null },
]

function Key({ k }: { k: string }) {
  const isSymbol = k.length === 1 && ['⌘','⌃','⌥','⇧','↑','↓','←','→'].includes(k)
  return (
    <kbd className={`inline-flex items-center justify-center rounded-md border border-slate-200 bg-white text-slate-700 font-mono font-semibold shadow-[0_2px_0_0_#e2e8f0] select-none
      ${isSymbol ? 'w-7 h-7 text-sm' : 'min-w-[28px] h-7 px-2 text-xs'}`}>
      {k}
    </kbd>
  )
}

function Chord({ keys }: { keys: string[] }) {
  return (
    <div className="flex items-center gap-1">
      {keys.map((k, i) => (
        <span key={i} className="flex items-center gap-1">
          {i > 0 && <span className="text-slate-300 text-xs">+</span>}
          <Key k={k} />
        </span>
      ))}
    </div>
  )
}

function LiveCapture() {
  const [pressed, setPressed] = useState<string[]>([])
  const [last, setLast] = useState<string[]>([])

  const KEY_DISPLAY: Record<string, string> = {
    Meta: '⌘', Control: '⌃', Alt: '⌥', Shift: '⇧',
    ArrowUp: '↑', ArrowDown: '↓', ArrowLeft: '←', ArrowRight: '→',
    Enter: '↵', Escape: 'Esc', Backspace: '⌫', Tab: '⇥',
    ' ': 'Space',
  }
  const display = (k: string) => KEY_DISPLAY[k] ?? (k.length === 1 ? k.toUpperCase() : k)

  useEffect(() => {
    const held = new Set<string>()
    const onDown = (e: KeyboardEvent) => {
      const tag = (e.target as HTMLElement).tagName
      if (tag === 'INPUT' || tag === 'TEXTAREA' || (e.target as HTMLElement).isContentEditable) return
      e.preventDefault()
      held.add(e.key)
      const arr = Array.from(held)
      setPressed(arr)
      setLast(arr)
    }
    const onUp = (e: KeyboardEvent) => {
      const tag = (e.target as HTMLElement).tagName
      if (tag === 'INPUT' || tag === 'TEXTAREA' || (e.target as HTMLElement).isContentEditable) return
      held.delete(e.key)
      setPressed(Array.from(held))
    }
    window.addEventListener('keydown', onDown)
    window.addEventListener('keyup', onUp)
    return () => {
      window.removeEventListener('keydown', onDown)
      window.removeEventListener('keyup', onUp)
    }
  }, [])

  const activeKeys = pressed.length > 0 ? pressed : last

  return (
    <div className="clay-card p-5 flex flex-col items-center gap-3 bg-gradient-to-br from-slate-50 to-white">
      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Press any key combination</p>
      <div className="flex items-center justify-center gap-2 min-h-[44px]">
        {activeKeys.length === 0 ? (
          <p className="text-sm text-slate-300 font-medium">Waiting for input…</p>
        ) : (
          activeKeys.map((k, i) => (
            <span key={i} className="flex items-center gap-1.5">
              {i > 0 && <span className="text-slate-300 text-xs font-semibold">+</span>}
              <Key k={display(k)} />
            </span>
          ))
        )}
      </div>
      {last.length > 0 && pressed.length === 0 && (
        <p className="text-[10px] text-slate-300">Last combination</p>
      )}
    </div>
  )
}

const CATEGORIES = Array.from(new Set(SHORTCUTS.map(s => s.category)))
const CAT_COLORS: Record<string, string> = {
  General:    'text-sky-600 bg-sky-50 border-sky-100',
  Editing:    'text-violet-600 bg-violet-50 border-violet-100',
  Navigation: 'text-emerald-600 bg-emerald-50 border-emerald-100',
  View:       'text-amber-600 bg-amber-50 border-amber-100',
}

export function KeyboardShortcutsShowcase() {
  const [activeCategory, setActiveCategory] = useState<string>('All')

  const filtered = activeCategory === 'All'
    ? SHORTCUTS
    : SHORTCUTS.filter(s => s.category === activeCategory)

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-6">
        {/* Live capture */}
        <div className="space-y-3">
          <p className="section-label">Live Key Capture</p>
          <LiveCapture />

          {/* Sample chords */}
          <p className="section-label">Chord Examples</p>
          <div className="clay-card p-4 space-y-3">
            {[
              { label: 'Single key',    keys: ['⌘'] },
              { label: 'Two-key combo', keys: ['⌘', 'K'] },
              { label: 'Three-key',     keys: ['⌘', '⇧', 'P'] },
              { label: 'Modifier only', keys: ['⌃', 'G'] },
            ].map(({ label, keys }) => (
              <div key={label} className="flex items-center justify-between">
                <span className="text-xs text-slate-500">{label}</span>
                <Chord keys={keys} />
              </div>
            ))}
          </div>
        </div>

        {/* Shortcut reference */}
        <div className="space-y-3">
          <p className="section-label">Shortcut Reference</p>
          {/* Category filter */}
          <div className="flex flex-wrap gap-1.5">
            {['All', ...CATEGORIES].map(cat => (
              <button key={cat} onClick={() => setActiveCategory(cat)}
                className={`text-[10px] font-bold uppercase tracking-wide px-2.5 py-1 rounded-lg border cursor-pointer transition-all
                  ${activeCategory === cat
                    ? (CAT_COLORS[cat] ?? 'text-slate-600 bg-slate-100 border-slate-200')
                    : 'text-slate-400 bg-white border-slate-200 hover:border-slate-300 hover:text-slate-500'}`}>
                {cat}
              </button>
            ))}
          </div>

          <div className="clay-card overflow-hidden divide-y divide-slate-50">
            {filtered.map((s, i) => (
              <div key={i} className="flex items-center justify-between px-4 py-2.5 hover:bg-slate-50 transition-colors group">
                <div className="flex items-center gap-2">
                  {s.icon && (
                    <span className="text-slate-400 group-hover:text-slate-600 transition-colors">{s.icon}</span>
                  )}
                  <span className="text-xs text-slate-600 font-medium">{s.action}</span>
                  <span className={`text-[9px] font-bold uppercase px-1.5 py-0.5 rounded border
                    ${CAT_COLORS[s.category] ?? 'text-slate-400 bg-slate-50 border-slate-100'}`}>
                    {s.category}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  {s.keys.map((chord, ci) => (
                    <span key={ci} className="flex items-center gap-1">
                      {ci > 0 && <span className="text-slate-300 text-[10px]">or</span>}
                      <Chord keys={chord} />
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
