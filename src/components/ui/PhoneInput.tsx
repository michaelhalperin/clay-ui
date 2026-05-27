import { useState, useRef, useLayoutEffect } from 'react'
import { createPortal } from 'react-dom'
import { ChevronDown, Search, Check, Phone } from 'lucide-react'

export interface Country {
  code: string; name: string; dial: string; flag: string
}

const COUNTRIES: Country[] = [
  { code: 'US', name: 'United States',   dial: '+1',   flag: '🇺🇸' },
  { code: 'GB', name: 'United Kingdom',  dial: '+44',  flag: '🇬🇧' },
  { code: 'DE', name: 'Germany',         dial: '+49',  flag: '🇩🇪' },
  { code: 'FR', name: 'France',          dial: '+33',  flag: '🇫🇷' },
  { code: 'IL', name: 'Israel',          dial: '+972', flag: '🇮🇱' },
  { code: 'CA', name: 'Canada',          dial: '+1',   flag: '🇨🇦' },
  { code: 'AU', name: 'Australia',       dial: '+61',  flag: '🇦🇺' },
  { code: 'JP', name: 'Japan',           dial: '+81',  flag: '🇯🇵' },
  { code: 'IN', name: 'India',           dial: '+91',  flag: '🇮🇳' },
  { code: 'BR', name: 'Brazil',          dial: '+55',  flag: '🇧🇷' },
  { code: 'MX', name: 'Mexico',          dial: '+52',  flag: '🇲🇽' },
  { code: 'KR', name: 'South Korea',     dial: '+82',  flag: '🇰🇷' },
  { code: 'SG', name: 'Singapore',       dial: '+65',  flag: '🇸🇬' },
  { code: 'NL', name: 'Netherlands',     dial: '+31',  flag: '🇳🇱' },
  { code: 'SE', name: 'Sweden',          dial: '+46',  flag: '🇸🇪' },
  { code: 'ES', name: 'Spain',           dial: '+34',  flag: '🇪🇸' },
  { code: 'IT', name: 'Italy',           dial: '+39',  flag: '🇮🇹' },
  { code: 'PL', name: 'Poland',          dial: '+48',  flag: '🇵🇱' },
  { code: 'PT', name: 'Portugal',        dial: '+351', flag: '🇵🇹' },
  { code: 'CH', name: 'Switzerland',     dial: '+41',  flag: '🇨🇭' },
]

function CountryDropdown({ selected, onSelect }: { selected: Country; onSelect: (c: Country) => void }) {
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [pos, setPos] = useState<{ top: number; left: number; width: number } | null>(null)
  const [ready, setReady] = useState(false)
  const triggerRef = useRef<HTMLButtonElement>(null)
  const panelRef   = useRef<HTMLDivElement>(null)

  const filtered = COUNTRIES.filter(c =>
    c.name.toLowerCase().includes(query.toLowerCase()) ||
    c.dial.includes(query) ||
    c.code.toLowerCase().includes(query.toLowerCase())
  )

  useLayoutEffect(() => {
    if (!open || !triggerRef.current || !panelRef.current) return
    const tr = triggerRef.current.getBoundingClientRect()
    const pr = panelRef.current.getBoundingClientRect()
    const GAP = 4, VH = window.innerHeight
    const top = tr.bottom + GAP + pr.height > VH ? tr.top - GAP - pr.height : tr.bottom + GAP
    setPos({ top, left: tr.left, width: Math.max(tr.width, 240) })
    setReady(true)
  }, [open])

  useLayoutEffect(() => {
    if (!open) return
    const handler = (e: MouseEvent) => {
      if (!triggerRef.current?.contains(e.target as Node) && !panelRef.current?.contains(e.target as Node)) {
        setOpen(false); setQuery('')
      }
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [open])

  const pick = (c: Country) => { onSelect(c); setOpen(false); setQuery(''); setReady(false) }

  return (
    <>
      <button ref={triggerRef} onClick={() => { setReady(false); setOpen(o => !o) }}
        className="flex items-center gap-1.5 px-3 h-full border-r border-slate-200 hover:bg-slate-50 cursor-pointer transition-colors rounded-l-clay shrink-0">
        <span className="text-lg leading-none">{selected.flag}</span>
        <span className="text-sm font-semibold text-slate-600 tabular-nums">{selected.dial}</span>
        <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
      </button>

      {open && createPortal(
        <div ref={panelRef} className="fixed z-[200] bg-white border border-slate-100 rounded-clay-lg shadow-clay-lg overflow-hidden"
          style={{ top: pos?.top ?? 0, left: pos?.left ?? 0, width: pos?.width ?? 240, opacity: ready ? 1 : 0, animation: ready ? 'slideDown 0.15s ease' : 'none' }}>
          <div className="p-2 border-b border-slate-100">
            <div className="flex items-center gap-2 bg-slate-50 rounded-xl px-3 py-1.5">
              <Search className="w-3.5 h-3.5 text-slate-400 shrink-0" />
              <input autoFocus value={query} onChange={e => setQuery(e.target.value)}
                placeholder="Search country…"
                className="flex-1 text-sm bg-transparent focus:outline-none text-slate-700 placeholder-slate-400" />
            </div>
          </div>
          <div className="max-h-52 overflow-y-auto py-1">
            {filtered.map(c => (
              <button key={c.code} onClick={() => pick(c)}
                className="w-full flex items-center gap-3 px-3 py-2 text-sm cursor-pointer hover:bg-slate-50 transition-colors">
                <span className="text-base leading-none">{c.flag}</span>
                <span className="flex-1 text-left text-slate-700 font-medium">{c.name}</span>
                <span className="text-slate-400 tabular-nums text-xs">{c.dial}</span>
                {c.code === selected.code && <Check className="w-3.5 h-3.5 text-sky-500 shrink-0" />}
              </button>
            ))}
            {filtered.length === 0 && <p className="text-center text-xs text-slate-400 py-4">No results</p>}
          </div>
        </div>,
        document.body
      )}
    </>
  )
}

export function PhoneField({ label, placeholder }: { label: string; placeholder?: string }) {
  const [country, setCountry] = useState(COUNTRIES[0])
  const [number, setNumber] = useState('')
  const [focused, setFocused] = useState(false)

  const fmt = (v: string) => {
    const digits = v.replace(/\D/g, '').slice(0, 10)
    if (digits.length <= 3) return digits
    if (digits.length <= 6) return `(${digits.slice(0,3)}) ${digits.slice(3)}`
    return `(${digits.slice(0,3)}) ${digits.slice(3,6)}-${digits.slice(6)}`
  }

  return (
    <div className="space-y-1.5">
      <label className="block text-sm font-semibold text-slate-700">{label}</label>
      <div className={`flex items-stretch border-2 rounded-clay bg-white transition-all duration-150 h-11
        ${focused ? 'border-sky-400 ring-2 ring-sky-100' : 'border-slate-200 hover:border-slate-300'}`}>
        <CountryDropdown selected={country} onSelect={setCountry} />
        <input
          value={number}
          onChange={e => setNumber(fmt(e.target.value))}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          placeholder={placeholder ?? '(555) 000-0000'}
          className="flex-1 min-w-0 px-3 text-sm text-slate-700 bg-transparent focus:outline-none placeholder-slate-300"
        />
      </div>
    </div>
  )
}

export function PhoneInputShowcase() {
  return (
    <div className="grid grid-cols-2 gap-8">
      <div className="space-y-5">
        <p className="section-label">Phone Input</p>
        <PhoneField label="Mobile number" placeholder="(555) 000-0000" />
        <PhoneField label="Work phone" placeholder="(555) 000-0000" />
        <PhoneField label="WhatsApp number" placeholder="(555) 000-0000" />
      </div>
      <div>
        <p className="section-label">Contact Form</p>
        <div className="clay-card p-5 space-y-4">
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1.5">Full name</label>
            <input placeholder="Sophie Leblanc" className="w-full border-2 border-slate-200 rounded-xl px-3 py-2 text-sm focus:border-sky-400 focus:outline-none transition-colors" />
          </div>
          <PhoneField label="Phone number" />
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1.5">Email</label>
            <input type="email" placeholder="sophie@example.com" className="w-full border-2 border-slate-200 rounded-xl px-3 py-2 text-sm focus:border-sky-400 focus:outline-none transition-colors" />
          </div>
          <button className="w-full bg-sky-500 hover:bg-sky-600 text-white text-sm font-semibold py-2.5 rounded-xl shadow-clay cursor-pointer transition-colors">
            <Phone className="w-4 h-4 inline mr-2" />Save contact
          </button>
        </div>
      </div>
    </div>
  )
}
