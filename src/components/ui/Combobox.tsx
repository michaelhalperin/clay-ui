import { useState, useRef, useLayoutEffect, useCallback } from 'react'
import { createPortal } from 'react-dom'
import { X, ChevronDown, Check, Search } from 'lucide-react'

export interface ComboboxOption { value: string; label: string; group?: string }

const showcaseOptions: ComboboxOption[] = [
  { value: 'react',      label: 'React',       group: 'Frontend' },
  { value: 'vue',        label: 'Vue',          group: 'Frontend' },
  { value: 'svelte',     label: 'Svelte',       group: 'Frontend' },
  { value: 'angular',    label: 'Angular',      group: 'Frontend' },
  { value: 'nextjs',     label: 'Next.js',      group: 'Frontend' },
  { value: 'node',       label: 'Node.js',      group: 'Backend' },
  { value: 'python',     label: 'Python',       group: 'Backend' },
  { value: 'go',         label: 'Go',           group: 'Backend' },
  { value: 'rust',       label: 'Rust',         group: 'Backend' },
  { value: 'postgres',   label: 'PostgreSQL',   group: 'Database' },
  { value: 'mysql',      label: 'MySQL',        group: 'Database' },
  { value: 'mongodb',    label: 'MongoDB',      group: 'Database' },
  { value: 'redis',      label: 'Redis',        group: 'Database' },
  { value: 'tailwind',   label: 'Tailwind CSS', group: 'Styling' },
  { value: 'typescript', label: 'TypeScript',   group: 'Language' },
]

const CHIP_COLORS = ['bg-sky-100 text-sky-700', 'bg-violet-100 text-violet-700', 'bg-emerald-100 text-emerald-700',
  'bg-pink-100 text-pink-700', 'bg-amber-100 text-amber-700']

export function MultiCombobox({ label, placeholder = 'Search…', options }: { label: string; placeholder?: string; options: ComboboxOption[] }) {
  const [selected, setSelected] = useState<string[]>(['react', 'typescript'])
  const [query, setQuery] = useState('')
  const [open, setOpen] = useState(false)
  const [pos, setPos] = useState<{ top: number; left: number; width: number } | null>(null)
  const [ready, setReady] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const inputRef     = useRef<HTMLInputElement>(null)
  const panelRef     = useRef<HTMLDivElement>(null)

  const filtered = options.filter(o =>
    !selected.includes(o.value) &&
    o.label.toLowerCase().includes(query.toLowerCase())
  )

  const groups = Array.from(new Set(filtered.map(o => o.group)))

  useLayoutEffect(() => {
    if (!open || !containerRef.current || !panelRef.current || ready) return
    const cr = containerRef.current.getBoundingClientRect()
    const pr = panelRef.current.getBoundingClientRect()
    const top = cr.bottom + 4 + pr.height > window.innerHeight ? cr.top - 4 - pr.height : cr.bottom + 4
    setPos({ top, left: cr.left, width: cr.width })
    setReady(true)
  }, [open, ready])

  useLayoutEffect(() => {
    if (!open) return
    const close = (e: MouseEvent) => {
      // Element may have been removed from DOM by React's synchronous flush (e.g. picked option
      // gets filtered out). A detached node is never "inside" the panel even though it was —
      // skip the check entirely so the dropdown doesn't close on selection.
      if (!document.body.contains(e.target as Node)) return
      if (!containerRef.current?.contains(e.target as Node) && !panelRef.current?.contains(e.target as Node)) {
        setOpen(false); setReady(false); setQuery('')
      }
    }
    document.addEventListener('mousedown', close)
    return () => document.removeEventListener('mousedown', close)
  }, [open])

  const pick = (val: string) => {
    setSelected(prev => [...prev, val])
    setQuery('')
    inputRef.current?.focus()
  }
  const remove = (val: string) => setSelected(prev => prev.filter(v => v !== val))

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Backspace' && !query && selected.length) {
      setSelected(prev => prev.slice(0, -1))
    }
  }

  return (
    <div className="space-y-1.5">
      <label className="block text-sm font-semibold text-slate-700">{label}</label>
      <div ref={containerRef}
        onClick={() => { setOpen(true); setReady(false); inputRef.current?.focus() }}
        className={`flex flex-wrap gap-1.5 items-center min-h-11 px-2.5 py-1.5 border-2 rounded-clay bg-white cursor-text transition-all
          ${open ? 'border-sky-400 ring-2 ring-sky-100' : 'border-slate-200 hover:border-slate-300'}`}>
        {selected.map((val, i) => {
          const opt = options.find(o => o.value === val)
          return (
            <span key={val} className={`flex items-center gap-1 text-xs font-semibold px-2 py-0.5 rounded-lg ${CHIP_COLORS[i % CHIP_COLORS.length]}`}>
              {opt?.label}
              <button onMouseDown={e => { e.preventDefault(); remove(val) }} className="cursor-pointer hover:opacity-70">
                <X className="w-3 h-3" />
              </button>
            </span>
          )
        })}
        <input ref={inputRef} value={query} onChange={e => { setQuery(e.target.value); setOpen(true); setReady(false) }}
          onFocus={() => { setOpen(true); setReady(false) }}
          onKeyDown={onKeyDown}
          placeholder={selected.length === 0 ? placeholder : ''}
          className="flex-1 min-w-16 text-sm text-slate-700 bg-transparent focus:outline-none placeholder-slate-300" />
        <ChevronDown className={`w-4 h-4 text-slate-400 shrink-0 transition-transform ${open ? 'rotate-180' : ''}`} />
      </div>

      {open && createPortal(
        <div ref={panelRef}
          className="fixed z-[200] bg-white border border-slate-100 rounded-clay-lg shadow-clay-lg overflow-hidden"
          style={{ top: pos?.top ?? 0, left: pos?.left ?? 0, width: pos?.width ?? 320, maxHeight: 260,
            opacity: ready ? 1 : 0, animation: ready ? 'slideDown 0.15s ease' : 'none' }}>
          <div className="overflow-y-auto max-h-60">
            {groups.length === 0 && (
              <p className="text-xs text-slate-400 text-center py-6">No results</p>
            )}
            {groups.map(group => (
              <div key={group}>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-3 pt-2.5 pb-1">{group}</p>
                {filtered.filter(o => o.group === group).map(o => (
                  <button key={o.value} onMouseDown={e => { e.preventDefault(); pick(o.value) }}
                    className="w-full flex items-center gap-2 px-3 py-2 text-sm text-slate-700 hover:bg-slate-50 cursor-pointer transition-colors text-left">
                    {o.label}
                  </button>
                ))}
              </div>
            ))}
          </div>
        </div>,
        document.body
      )}
    </div>
  )
}

export function SingleCombobox({ label, options }: { label: string; options: ComboboxOption[] }) {
  const [selected, setSelected] = useState<ComboboxOption | null>(null)
  const [query, setQuery] = useState('')
  const [open, setOpen] = useState(false)
  const [pos, setPos] = useState<{ top: number; left: number; width: number } | null>(null)
  const [ready, setReady] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const panelRef = useRef<HTMLDivElement>(null)

  const filtered = options.filter(o => o.label.toLowerCase().includes(query.toLowerCase()))

  useLayoutEffect(() => {
    if (!open || !containerRef.current || !panelRef.current || ready) return
    const cr = containerRef.current.getBoundingClientRect()
    const pr = panelRef.current.getBoundingClientRect()
    const top = cr.bottom + 4 + pr.height > window.innerHeight ? cr.top - 4 - pr.height : cr.bottom + 4
    setPos({ top, left: cr.left, width: cr.width })
    setReady(true)
  }, [open, ready])

  useLayoutEffect(() => {
    if (!open) return
    const close = (e: MouseEvent) => {
      if (!containerRef.current?.contains(e.target as Node) && !panelRef.current?.contains(e.target as Node)) {
        setOpen(false); setReady(false)
        if (!selected) setQuery('')
        else setQuery(selected.label)
      }
    }
    document.addEventListener('mousedown', close)
    return () => document.removeEventListener('mousedown', close)
  }, [open, selected])

  const pick = (o: ComboboxOption) => { setSelected(o); setQuery(o.label); setOpen(false); setReady(false) }
  const clear = (e: React.MouseEvent) => { e.stopPropagation(); setSelected(null); setQuery('') }

  return (
    <div className="space-y-1.5">
      <label className="block text-sm font-semibold text-slate-700">{label}</label>
      <div ref={containerRef}
        onClick={() => { setOpen(true); setReady(false) }}
        className={`flex items-center gap-2 h-11 px-3 border-2 rounded-clay bg-white cursor-text transition-all
          ${open ? 'border-sky-400 ring-2 ring-sky-100' : 'border-slate-200 hover:border-slate-300'}`}>
        <Search className="w-3.5 h-3.5 text-slate-400 shrink-0" />
        <input value={query} onChange={e => { setQuery(e.target.value); setOpen(true); setReady(false) }}
          placeholder="Select framework…"
          className="flex-1 text-sm text-slate-700 bg-transparent focus:outline-none placeholder-slate-300" />
        {selected && (
          <button onMouseDown={clear} className="cursor-pointer text-slate-300 hover:text-slate-500">
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {open && createPortal(
        <div ref={panelRef}
          className="fixed z-[200] bg-white border border-slate-100 rounded-clay-lg shadow-clay-lg overflow-hidden"
          style={{ top: pos?.top ?? 0, left: pos?.left ?? 0, width: pos?.width ?? 280, maxHeight: 240,
            opacity: ready ? 1 : 0, animation: ready ? 'slideDown 0.15s ease' : 'none' }}>
          <div className="overflow-y-auto max-h-56 py-1">
            {filtered.map(o => (
              <button key={o.value} onMouseDown={() => pick(o)}
                className="w-full flex items-center justify-between gap-2 px-3 py-2 text-sm text-slate-700 hover:bg-slate-50 cursor-pointer transition-colors text-left">
                <span>{o.label}</span>
                {selected?.value === o.value && <Check className="w-3.5 h-3.5 text-sky-500 shrink-0" />}
              </button>
            ))}
            {filtered.length === 0 && <p className="text-xs text-slate-400 text-center py-4">No results</p>}
          </div>
        </div>,
        document.body
      )}
    </div>
  )
}

export function ComboboxShowcase() {
  return (
    <div className="grid grid-cols-2 gap-8">
      <div className="space-y-5">
        <p className="section-label">Multi-select Combobox</p>
        <MultiCombobox label="Tech stack" placeholder="Search technologies…" options={showcaseOptions} />
        <MultiCombobox label="Team members" placeholder="Add people…" options={showcaseOptions} />
      </div>
      <div className="space-y-5">
        <p className="section-label">Single Combobox</p>
        <SingleCombobox label="Primary framework" options={showcaseOptions} />
        <SingleCombobox label="Database" options={showcaseOptions} />
      </div>
    </div>
  )
}
