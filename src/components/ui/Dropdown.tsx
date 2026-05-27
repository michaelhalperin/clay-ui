import { useState, useRef, useEffect, useCallback } from 'react'
import { ChevronDown, Search, Check, X, Globe, Lock, Users, Eye } from 'lucide-react'

/* ─── Generic popover anchor ─── */
function useDropdown() {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const handler = (e: MouseEvent) => { if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false) }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])
  return { open, setOpen, ref }
}

/* ─── Basic Select ─── */
export interface Option { value: string; label: string; icon?: React.ReactNode; description?: string; disabled?: boolean }

export function Select({ options, placeholder = 'Select option', label }: { options: Option[]; placeholder?: string; label?: string }) {
  const [value, setValue] = useState<string | null>(null)
  const { open, setOpen, ref } = useDropdown()
  const selected = options.find(o => o.value === value)

  return (
    <div className="space-y-1.5" ref={ref}>
      {label && <label className="block text-sm font-semibold text-slate-700">{label}</label>}
      <div className="relative">
        <button onClick={() => setOpen(o => !o)}
          className={`w-full flex items-center gap-2 px-4 py-3 rounded-clay border bg-white text-sm shadow-soft cursor-pointer transition-all duration-200 ${open ? 'border-sky-300 ring-2 ring-sky-200' : 'border-slate-200 hover:border-slate-300'}`}>
          {selected?.icon && <span className="text-slate-500 shrink-0">{selected.icon}</span>}
          <span className={`flex-1 text-left truncate ${selected ? 'text-slate-800 font-medium' : 'text-slate-400'}`}>
            {selected?.label ?? placeholder}
          </span>
          <ChevronDown className={`w-4 h-4 text-slate-400 shrink-0 transition-transform duration-200 ${open ? 'rotate-180' : ''}`} />
        </button>

        {open && (
          <div className="absolute z-20 top-full mt-1.5 w-full bg-white border border-slate-100 rounded-clay shadow-clay-lg overflow-hidden"
            style={{ animation: 'slideDown 0.15s ease' }}>
            {options.map(opt => (
              <button key={opt.value} disabled={opt.disabled}
                onClick={() => { setValue(opt.value); setOpen(false) }}
                className={`w-full flex items-center gap-3 px-4 py-2.5 text-sm cursor-pointer transition-colors text-left disabled:opacity-40 disabled:cursor-not-allowed
                  ${value === opt.value ? 'bg-sky-50 text-sky-600' : 'text-slate-700 hover:bg-slate-50'}`}>
                {opt.icon && <span className={`shrink-0 ${value === opt.value ? 'text-sky-500' : 'text-slate-400'}`}>{opt.icon}</span>}
                <div className="flex-1 min-w-0">
                  <p className="font-medium">{opt.label}</p>
                  {opt.description && <p className="text-xs text-slate-400 truncate">{opt.description}</p>}
                </div>
                {value === opt.value && <Check className="w-4 h-4 text-sky-500 shrink-0" />}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

/* ─── Searchable Select ─── */
export function SearchableSelect({ options, label, placeholder = 'Search or select…' }: { options: Option[]; label?: string; placeholder?: string }) {
  const [value, setValue] = useState<string | null>(null)
  const [query, setQuery] = useState('')
  const { open, setOpen, ref } = useDropdown()
  const inputRef = useRef<HTMLInputElement>(null)
  const selected = options.find(o => o.value === value)

  const filtered = options.filter(o => o.label.toLowerCase().includes(query.toLowerCase()))

  const handleOpen = () => { setOpen(true); setTimeout(() => inputRef.current?.focus(), 10) }

  return (
    <div className="space-y-1.5" ref={ref}>
      {label && <label className="block text-sm font-semibold text-slate-700">{label}</label>}
      <div className="relative">
        <button onClick={handleOpen}
          className={`w-full flex items-center gap-2 px-4 py-3 rounded-clay border bg-white text-sm shadow-soft cursor-pointer transition-all duration-200 ${open ? 'border-sky-300 ring-2 ring-sky-200' : 'border-slate-200 hover:border-slate-300'}`}>
          <span className={`flex-1 text-left ${selected ? 'text-slate-800 font-medium' : 'text-slate-400'}`}>
            {selected?.label ?? placeholder}
          </span>
          {selected && (
            <button onClick={e => { e.stopPropagation(); setValue(null) }} className="text-slate-300 hover:text-slate-500 transition-colors cursor-pointer">
              <X className="w-3.5 h-3.5" />
            </button>
          )}
          <ChevronDown className={`w-4 h-4 text-slate-400 shrink-0 transition-transform duration-200 ${open ? 'rotate-180' : ''}`} />
        </button>

        {open && (
          <div className="absolute z-20 top-full mt-1.5 w-full bg-white border border-slate-100 rounded-clay shadow-clay-lg overflow-hidden flex flex-col"
            style={{ animation: 'slideDown 0.15s ease', maxHeight: '240px' }}>
            <div className="flex items-center gap-2 px-3 py-2 border-b border-slate-100">
              <Search className="w-3.5 h-3.5 text-slate-400 shrink-0" />
              <input ref={inputRef} value={query} onChange={e => setQuery(e.target.value)}
                placeholder="Search…" className="flex-1 text-sm focus:outline-none placeholder-slate-300 text-slate-700" />
            </div>
            <div className="overflow-y-auto">
              {filtered.length === 0 ? (
                <p className="text-center text-sm text-slate-400 py-6">No results</p>
              ) : filtered.map(opt => (
                <button key={opt.value} onClick={() => { setValue(opt.value); setQuery(''); setOpen(false) }}
                  className={`w-full flex items-center gap-2 px-4 py-2.5 text-sm cursor-pointer transition-colors text-left ${value === opt.value ? 'bg-sky-50 text-sky-600' : 'text-slate-700 hover:bg-slate-50'}`}>
                  <span className="flex-1">{opt.label}</span>
                  {value === opt.value && <Check className="w-4 h-4 text-sky-500 shrink-0" />}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

/* ─── Multi-select ─── */
export function MultiSelect({ options, label, placeholder = 'Select multiple…' }: { options: Option[]; label?: string; placeholder?: string }) {
  const [values, setValues] = useState<Set<string>>(new Set())
  const [query, setQuery] = useState('')
  const { open, setOpen, ref } = useDropdown()
  const inputRef = useRef<HTMLInputElement>(null)
  const toggle = useCallback((v: string) => setValues(s => { const n = new Set(s); n.has(v) ? n.delete(v) : n.add(v); return n }), [])
  const filtered = options.filter(o => o.label.toLowerCase().includes(query.toLowerCase()))

  return (
    <div className="space-y-1.5" ref={ref}>
      {label && <label className="block text-sm font-semibold text-slate-700">{label}</label>}
      <div className="relative">
        <button onClick={() => { setOpen(o => !o); setTimeout(() => inputRef.current?.focus(), 10) }}
          className={`w-full min-h-[48px] flex flex-wrap items-center gap-1.5 px-3 py-2 rounded-clay border bg-white text-sm shadow-soft cursor-pointer transition-all duration-200 text-left ${open ? 'border-sky-300 ring-2 ring-sky-200' : 'border-slate-200 hover:border-slate-300'}`}>
          {values.size === 0 && <span className="text-slate-400 text-sm flex-1">{placeholder}</span>}
          {[...values].map(v => (
            <span key={v} className="flex items-center gap-1 bg-sky-100 text-sky-700 text-xs font-semibold px-2 py-1 rounded-lg">
              {options.find(o => o.value === v)?.label}
              <button onClick={e => { e.stopPropagation(); toggle(v) }} className="cursor-pointer hover:text-sky-900 transition-colors">
                <X className="w-3 h-3" />
              </button>
            </span>
          ))}
          <ChevronDown className={`w-4 h-4 text-slate-400 ml-auto shrink-0 transition-transform duration-200 ${open ? 'rotate-180' : ''}`} />
        </button>

        {open && (
          <div className="absolute z-20 top-full mt-1.5 w-full bg-white border border-slate-100 rounded-clay shadow-clay-lg overflow-hidden flex flex-col"
            style={{ animation: 'slideDown 0.15s ease', maxHeight: '220px' }}>
            <div className="flex items-center gap-2 px-3 py-2 border-b border-slate-100">
              <Search className="w-3.5 h-3.5 text-slate-400 shrink-0" />
              <input ref={inputRef} value={query} onChange={e => setQuery(e.target.value)}
                placeholder="Filter…" className="flex-1 text-sm focus:outline-none placeholder-slate-300 text-slate-700" />
              {values.size > 0 && <button onClick={() => setValues(new Set())} className="text-xs text-slate-400 hover:text-slate-600 cursor-pointer transition-colors">Clear all</button>}
            </div>
            <div className="overflow-y-auto">
              {filtered.map(opt => {
                const checked = values.has(opt.value)
                return (
                  <button key={opt.value} onClick={() => toggle(opt.value)}
                    className={`w-full flex items-center gap-3 px-4 py-2.5 text-sm cursor-pointer transition-colors text-left ${checked ? 'bg-sky-50' : 'hover:bg-slate-50'}`}>
                    <div className={`w-4 h-4 rounded-md border-2 flex items-center justify-center shrink-0 transition-colors ${checked ? 'bg-sky-500 border-sky-500' : 'border-slate-300'}`}>
                      {checked && <Check className="w-3 h-3 text-white" />}
                    </div>
                    <span className={`flex-1 ${checked ? 'text-sky-700 font-medium' : 'text-slate-700'}`}>{opt.label}</span>
                  </button>
                )
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

/* ─── Context Menu ─── */
function ContextMenuDropdown() {
  const { open, setOpen, ref } = useDropdown()
  const groups = [
    { items: [{ icon: <Eye className="w-4 h-4" />, label: 'View details' }, { icon: <Globe className="w-4 h-4" />, label: 'Open in browser' }] },
    { items: [{ icon: <Users className="w-4 h-4" />, label: 'Share' }, { icon: <Lock className="w-4 h-4" />, label: 'Restrict access' }] },
    { items: [{ icon: <X className="w-4 h-4" />, label: 'Delete', danger: true }] },
  ]

  return (
    <div className="relative" ref={ref}>
      <button onClick={() => setOpen(o => !o)}
        className="flex items-center gap-2 bg-white border border-slate-200 text-slate-600 text-sm font-medium px-4 py-2.5 rounded-clay shadow-soft cursor-pointer hover:border-slate-300 hover:bg-slate-50 transition-all duration-200">
        Actions
        <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform duration-200 ${open ? 'rotate-180' : ''}`} />
      </button>
      {open && (
        <div className="absolute z-20 top-full mt-1.5 w-44 bg-white border border-slate-100 rounded-clay shadow-clay-lg overflow-hidden py-1"
          style={{ animation: 'slideDown 0.15s ease' }}>
          {groups.map((grp, gi) => (
            <div key={gi}>
              {gi > 0 && <div className="my-1 border-t border-slate-100" />}
              {grp.items.map(item => (
                <button key={item.label} onClick={() => setOpen(false)}
                  className={`w-full flex items-center gap-2.5 px-3 py-2 text-sm cursor-pointer transition-colors ${(item as any).danger ? 'text-red-500 hover:bg-red-50' : 'text-slate-600 hover:bg-slate-50'}`}>
                  <span className="opacity-60">{item.icon}</span>{item.label}
                </button>
              ))}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

const visibilityOptions: Option[] = [
  { value: 'public',   label: 'Public',       icon: <Globe className="w-4 h-4" />,  description: 'Anyone can view this' },
  { value: 'team',     label: 'Team only',    icon: <Users className="w-4 h-4" />,  description: 'Only workspace members' },
  { value: 'private',  label: 'Private',      icon: <Lock className="w-4 h-4" />,   description: 'Only you' },
]

const countries = ['Albania','Australia','Austria','Belgium','Brazil','Canada','Chile','China','Colombia','Croatia','Czech Republic','Denmark','Egypt','Finland','France','Germany','Greece','Hungary','India','Indonesia','Ireland','Israel','Italy','Japan','Kenya','Malaysia','Mexico','Netherlands','New Zealand','Nigeria','Norway','Pakistan','Philippines','Poland','Portugal','Romania','Russia','Saudi Arabia','Singapore','South Africa','South Korea','Spain','Sweden','Switzerland','Thailand','Turkey','Ukraine','United Kingdom','United States','Vietnam'].map(c => ({ value: c.toLowerCase().replace(/\s/g, '-'), label: c }))

const tagOptions: Option[] = ['Design','Engineering','Marketing','Sales','Product','Analytics','Legal','Finance','Operations','HR','Support','Security'].map(t => ({ value: t.toLowerCase(), label: t }))

export function DropdownShowcase() {
  return (
    <div className="grid grid-cols-2 gap-8">
      <div>
        <p className="section-label">Dropdown Variants</p>
        <div className="space-y-5">
          <Select options={visibilityOptions} label="Visibility" placeholder="Choose visibility…" />
          <SearchableSelect options={countries} label="Country" placeholder="Search country…" />
          <MultiSelect options={tagOptions} label="Tags" placeholder="Select tags…" />
        </div>
      </div>
      <div>
        <p className="section-label">Context Menu</p>
        <div className="clay-card p-4 flex items-center justify-between">
          <p className="text-sm text-slate-600 font-medium">aurora-prod.vercel.app</p>
          <ContextMenuDropdown />
        </div>
      </div>
    </div>
  )
}
