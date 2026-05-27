import { useState, useEffect, useRef, useCallback, useLayoutEffect } from 'react'
import { createPortal } from 'react-dom'
import { Copy, Check } from 'lucide-react'

const SWATCHES = [
  '#ef4444','#f97316','#eab308','#22c55e','#0ea5e9','#8b5cf6','#ec4899',
  '#64748b','#0f172a','#ffffff',
]

function hslToHex(h: number, s: number, l: number): string {
  s /= 100; l /= 100
  const a = s * Math.min(l, 1 - l)
  const f = (n: number) => {
    const k = (n + h / 30) % 12
    const c = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1)
    return Math.round(255 * c).toString(16).padStart(2, '0')
  }
  return `#${f(0)}${f(8)}${f(4)}`
}

function hexToHsl(hex: string): [number, number, number] {
  const r = parseInt(hex.slice(1, 3), 16) / 255
  const g = parseInt(hex.slice(3, 5), 16) / 255
  const b = parseInt(hex.slice(5, 7), 16) / 255
  const max = Math.max(r, g, b), min = Math.min(r, g, b)
  const l = (max + min) / 2
  if (max === min) return [0, 0, Math.round(l * 100)]
  const d = max - min
  const s = l > 0.5 ? d / (2 - max - min) : d / (max + min)
  let h = 0
  if (max === r) h = (g - b) / d + (g < b ? 6 : 0)
  else if (max === g) h = (b - r) / d + 2
  else h = (r - g) / d + 4
  return [Math.round(h * 60), Math.round(s * 100), Math.round(l * 100)]
}

function SatLightSquare({ hue, sat, light, onChange }: {
  hue: number; sat: number; light: number
  onChange: (s: number, l: number) => void
}) {
  const ref = useRef<HTMLDivElement>(null)

  const pick = useCallback((e: PointerEvent | React.PointerEvent) => {
    if (!ref.current) return
    const rect = ref.current.getBoundingClientRect()
    const x = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width))
    const y = Math.max(0, Math.min(1, (e.clientY - rect.top) / rect.height))
    const s = Math.round(x * 100)
    const l = Math.round((1 - y) * 50 + (1 - x) * y * 50)
    onChange(s, Math.max(1, Math.min(99, l)))
  }, [onChange])

  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    e.currentTarget.setPointerCapture(e.pointerId)
    pick(e)
    const move = (ev: PointerEvent) => pick(ev)
    const up = () => { window.removeEventListener('pointermove', move); window.removeEventListener('pointerup', up) }
    window.addEventListener('pointermove', move)
    window.addEventListener('pointerup', up)
  }

  // Map HSL back to x/y in the square
  const x = sat / 100
  const y = 1 - (light - (1 - x) * 50) / 50

  return (
    <div ref={ref} onPointerDown={onPointerDown}
      className="w-full h-36 rounded-xl cursor-crosshair relative select-none overflow-hidden shadow-soft"
      style={{ background: `hsl(${hue}, 100%, 50%)` }}>
      <div className="absolute inset-0 rounded-xl" style={{ background: 'linear-gradient(to right, #fff, transparent)' }} />
      <div className="absolute inset-0 rounded-xl" style={{ background: 'linear-gradient(to bottom, transparent, #000)' }} />
      <div className="absolute w-4 h-4 rounded-full border-2 border-white shadow-clay -translate-x-1/2 -translate-y-1/2 pointer-events-none"
        style={{ left: `${x * 100}%`, top: `${Math.max(0, Math.min(100, y * 100))}%` }} />
    </div>
  )
}

function HueStrip({ hue, onChange }: { hue: number; onChange: (h: number) => void }) {
  const ref = useRef<HTMLDivElement>(null)
  const pick = useCallback((e: PointerEvent | React.PointerEvent) => {
    if (!ref.current) return
    const rect = ref.current.getBoundingClientRect()
    const x = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width))
    onChange(Math.round(x * 360))
  }, [onChange])

  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    e.currentTarget.setPointerCapture(e.pointerId)
    pick(e)
    const move = (ev: PointerEvent) => pick(ev)
    const up = () => { window.removeEventListener('pointermove', move); window.removeEventListener('pointerup', up) }
    window.addEventListener('pointermove', move)
    window.addEventListener('pointerup', up)
  }

  return (
    <div ref={ref} onPointerDown={onPointerDown}
      className="h-4 rounded-full cursor-pointer relative select-none shadow-soft"
      style={{ background: 'linear-gradient(to right, #f00,#ff0,#0f0,#0ff,#00f,#f0f,#f00)' }}>
      <div className="absolute top-1/2 w-5 h-5 rounded-full border-2 border-white shadow-clay -translate-x-1/2 -translate-y-1/2 pointer-events-none"
        style={{ left: `${(hue / 360) * 100}%`, background: `hsl(${hue},100%,50%)` }} />
    </div>
  )
}

export function ColorPickerPanel({ hex, onChange }: { hex: string; onChange: (hex: string) => void }) {
  const [hsl, setHsl] = useState<[number, number, number]>(() => hexToHsl(hex))
  const [copied, setCopied] = useState(false)
  const [inputHex, setInputHex] = useState(hex)
  const [h, s, l] = hsl

  useEffect(() => {
    setInputHex(hex)
    setHsl(hexToHsl(hex))
  }, [hex])

  const updateFromHsl = (nh: number, ns: number, nl: number) => {
    const newHex = hslToHex(nh, ns, nl)
    setHsl([nh, ns, nl])
    setInputHex(newHex)
    onChange(newHex)
  }

  const copy = () => {
    navigator.clipboard?.writeText(hex)
    setCopied(true)
    setTimeout(() => setCopied(false), 1500)
  }

  return (
    <div className="bg-white border border-slate-100 rounded-clay-lg shadow-clay-lg p-4 space-y-3">
      <SatLightSquare hue={h} sat={s} light={l} onChange={(ns, nl) => updateFromHsl(h, ns, nl)} />
      <HueStrip hue={h} onChange={nh => updateFromHsl(nh, s, l)} />

      {/* Hex input — copy icon lives inside the field, no overflow */}
      <div className="flex items-center gap-2 border-2 border-slate-200 rounded-xl px-2.5 py-1.5 focus-within:border-sky-400 transition-colors bg-white">
        <div className="w-5 h-5 rounded-md shrink-0 border border-slate-200 shadow-soft" style={{ background: hex }} />
        <input
          value={inputHex}
          onChange={e => {
            const v = e.target.value
            setInputHex(v)
            if (/^#[0-9a-fA-F]{6}$/.test(v)) {
              setHsl(hexToHsl(v))
              onChange(v)
            }
          }}
          className="flex-1 min-w-0 font-mono text-sm text-slate-700 bg-transparent focus:outline-none uppercase"
        />
        <button onClick={copy} className="shrink-0 text-slate-400 hover:text-slate-700 cursor-pointer transition-colors">
          {copied
            ? <Check className="w-3.5 h-3.5 text-emerald-500" />
            : <Copy className="w-3.5 h-3.5" />}
        </button>
      </div>

      {/* Swatches */}
      <div className="flex flex-wrap gap-1.5 pt-0.5">
        {SWATCHES.map(sw => (
          <button key={sw} onClick={() => { const newHsl = hexToHsl(sw); setHsl(newHsl); setInputHex(sw); onChange(sw) }}
            className={`w-6 h-6 rounded-lg cursor-pointer transition-all hover:scale-110 border shadow-soft
              ${hex.toLowerCase() === sw.toLowerCase() ? 'ring-2 ring-sky-400 ring-offset-1 scale-110 border-transparent' : 'border-slate-200'}`}
            style={{ background: sw }} />
        ))}
      </div>
    </div>
  )
}

export function InlineColorPicker() {
  const [color, setColor] = useState('#0ea5e9')
  return (
    <div className="space-y-3">
      {/* Preview bar */}
      <div className="h-14 rounded-xl shadow-clay relative overflow-hidden transition-colors duration-300 flex items-end"
        style={{ background: color }}>
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.25), transparent)' }} />
        <span className="relative font-mono text-xs font-bold text-white/90 uppercase px-3 pb-2 drop-shadow">{color}</span>
      </div>
      <ColorPickerPanel hex={color} onChange={setColor} />
    </div>
  )
}

export function PopoverColorPicker() {
  const [color, setColor] = useState('#8b5cf6')
  const [open, setOpen] = useState(false)
  const [pos, setPos] = useState<{ top: number; left: number } | null>(null)
  const [ready, setReady] = useState(false)
  const triggerRef = useRef<HTMLButtonElement>(null)
  const panelRef = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    if (!open || !triggerRef.current || !panelRef.current) return
    const tr = triggerRef.current.getBoundingClientRect()
    const pr = panelRef.current.getBoundingClientRect()
    const GAP = 6, VW = window.innerWidth, VH = window.innerHeight
    const top = tr.bottom + GAP + pr.height > VH ? Math.max(GAP, tr.top - GAP - pr.height) : tr.bottom + GAP
    const left = Math.max(GAP, Math.min(tr.left, VW - pr.width - GAP))
    setPos({ top, left })
    setReady(true)
  }, [open])

  useLayoutEffect(() => {
    if (!open) { setReady(false); setPos(null) }
  }, [open])

  useLayoutEffect(() => {
    if (!open) return
    const handler = (e: MouseEvent) => {
      if (!triggerRef.current?.contains(e.target as Node) && !panelRef.current?.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [open])

  return (
    <div className="space-y-3">
      <p className="text-xs text-slate-400">Click the swatch to open picker</p>
      <div className="flex items-center gap-3">
        <button ref={triggerRef} onClick={() => setOpen(o => !o)}
          className="w-10 h-10 rounded-xl shadow-clay border-2 border-white ring-2 ring-slate-200 cursor-pointer hover:ring-slate-300 transition-all"
          style={{ background: color }} />
        <div className="flex gap-1.5 flex-wrap">
          {SWATCHES.slice(0, 7).map(sw => (
            <button key={sw} onClick={() => setColor(sw)}
              className="w-5 h-5 rounded-md shadow-soft border border-slate-200 cursor-pointer hover:scale-110 transition-transform"
              style={{ background: sw }} />
          ))}
        </div>
      </div>
      <div className="text-xs font-mono text-slate-400 uppercase">{color}</div>

      {open && createPortal(
        <div ref={panelRef} className="fixed z-[200]"
          style={{ top: pos?.top ?? 0, left: pos?.left ?? 0, opacity: ready ? 1 : 0, animation: ready ? 'slideDown 0.15s ease' : 'none' }}>
          <ColorPickerPanel hex={color} onChange={setColor} />
        </div>,
        document.body
      )}
    </div>
  )
}

export function ColorPickerShowcase() {
  return (
    <div className="grid grid-cols-2 gap-8">
      <div>
        <p className="section-label">Inline Color Picker</p>
        <InlineColorPicker />
      </div>
      <div>
        <p className="section-label">Popover Color Picker</p>
        <PopoverColorPicker />
      </div>
    </div>
  )
}
