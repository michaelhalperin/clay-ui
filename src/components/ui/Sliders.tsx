import { useState, useRef, useCallback } from 'react'
import { Volume2, Sun, Zap, Palette } from 'lucide-react'

export interface SliderProps {
  value: number
  onChange: (v: number) => void
  min?: number
  max?: number
  step?: number
  color?: string
  label?: string
  icon?: React.ReactNode
  showValue?: boolean
  formatValue?: (v: number) => string
}

export function Slider({ value, onChange, min = 0, max = 100, step = 1, color = '#0ea5e9', label, icon, showValue = true, formatValue }: SliderProps) {
  const trackRef = useRef<HTMLDivElement>(null)
  const pct = ((value - min) / (max - min)) * 100

  const pctToVal = useCallback((clientX: number) => {
    const rect = trackRef.current!.getBoundingClientRect()
    const raw = ((clientX - rect.left) / rect.width) * (max - min) + min
    const stepped = Math.round(raw / step) * step
    return Math.max(min, Math.min(max, stepped))
  }, [min, max, step])

  const onPointerDown = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    const onMove = (ev: PointerEvent) => onChange(pctToVal(ev.clientX))
    const onUp = () => {
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('pointerup', onUp)
    }
    window.addEventListener('pointermove', onMove)
    window.addEventListener('pointerup', onUp)
    e.currentTarget.setPointerCapture(e.pointerId)
    onChange(pctToVal(e.clientX))
  }, [onChange, pctToVal])

  return (
    <div className="space-y-2.5">
      {(label || icon || showValue) && (
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {icon && <span style={{ color }}>{icon}</span>}
            {label && <span className="text-sm font-semibold text-slate-700">{label}</span>}
          </div>
          {showValue && (
            <span className="text-sm font-bold tabular-nums px-2.5 py-0.5 rounded-lg bg-slate-100 text-slate-600">
              {formatValue ? formatValue(value) : value}
            </span>
          )}
        </div>
      )}
      <div
        ref={trackRef}
        onPointerDown={onPointerDown}
        className="relative h-7 flex items-center cursor-pointer select-none"
      >
        <div className="absolute inset-x-0 h-3 rounded-full bg-slate-100 shadow-clay-inset overflow-hidden">
          <div className="h-full rounded-full" style={{ width: `${pct}%`, background: color }} />
        </div>
        <div
          className="absolute w-6 h-6 rounded-full bg-white border-2 shadow-clay -translate-x-1/2 pointer-events-none"
          style={{ left: `${pct}%`, borderColor: color }}
        />
      </div>
    </div>
  )
}

export function RangeSlider({ label }: { label: string }) {
  const [range, setRange] = useState([25, 75])
  const trackRef = useRef<HTMLDivElement>(null)
  const dragging = useRef<'low' | 'high' | null>(null)

  const pctToVal = useCallback((clientX: number) => {
    const rect = trackRef.current!.getBoundingClientRect()
    return Math.round(Math.max(0, Math.min(100, ((clientX - rect.left) / rect.width) * 100)))
  }, [])

  const onPointerDown = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    const val = pctToVal(e.clientX)
    const distLow  = Math.abs(val - range[0])
    const distHigh = Math.abs(val - range[1])
    dragging.current = distLow <= distHigh ? 'low' : 'high'

    const onMove = (ev: PointerEvent) => {
      const v = pctToVal(ev.clientX)
      if (dragging.current === 'low') {
        setRange(([, h]) => [Math.min(v, h - 5), h])
      } else {
        setRange(([l]) => [l, Math.max(v, l + 5)])
      }
    }
    const onUp = () => {
      dragging.current = null
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('pointerup', onUp)
    }
    window.addEventListener('pointermove', onMove)
    window.addEventListener('pointerup', onUp)
    e.currentTarget.setPointerCapture(e.pointerId)
    onMove(e.nativeEvent as PointerEvent)
  }, [range, pctToVal])

  const pctLow  = range[0]
  const pctHigh = range[1]

  return (
    <div className="space-y-2.5">
      <div className="flex items-center justify-between">
        <span className="text-sm font-semibold text-slate-700">{label}</span>
        <span className="text-sm font-bold tabular-nums px-2.5 py-0.5 rounded-lg bg-slate-100 text-slate-600">${range[0]} – ${range[1]}</span>
      </div>
      <div
        ref={trackRef}
        onPointerDown={onPointerDown}
        className="relative h-7 flex items-center cursor-pointer select-none"
      >
        <div className="absolute inset-x-0 h-3 rounded-full bg-slate-100 shadow-clay-inset" />
        <div
          className="absolute h-3 rounded-full bg-violet-400 pointer-events-none"
          style={{ left: `${pctLow}%`, width: `${pctHigh - pctLow}%` }}
        />
        {/* Low thumb */}
        <div
          className="absolute w-6 h-6 rounded-full bg-white border-2 border-violet-400 shadow-clay pointer-events-none -translate-x-1/2"
          style={{ left: `${pctLow}%` }}
        />
        {/* High thumb */}
        <div
          className="absolute w-6 h-6 rounded-full bg-white border-2 border-violet-400 shadow-clay pointer-events-none -translate-x-1/2"
          style={{ left: `${pctHigh}%` }}
        />
      </div>
    </div>
  )
}

export function SlidersShowcase() {
  const [vol, setVol]   = useState(65)
  const [bright, setBright] = useState(80)
  const [speed, setSpeed]   = useState(3)
  const [hue, setHue]       = useState(200)

  return (
    <div className="grid grid-cols-2 gap-8">
      <div>
        <p className="section-label">Single Sliders</p>
        <div className="clay-card p-6 space-y-7">
          <Slider value={vol}    onChange={setVol}    label="Volume"      icon={<Volume2 className="w-4 h-4" />} color="#0ea5e9" formatValue={v => `${v}%`} />
          <Slider value={bright} onChange={setBright} label="Brightness"  icon={<Sun className="w-4 h-4" />}    color="#facc15" formatValue={v => `${v}%`} />
          <Slider value={speed}  onChange={setSpeed}  label="Speed"       icon={<Zap className="w-4 h-4" />}    color="#34d399" min={1} max={5} step={1} />
          <Slider value={hue}    onChange={setHue}    label="Hue"         icon={<Palette className="w-4 h-4" />} color={`hsl(${hue},80%,55%)`} min={0} max={360} formatValue={v => `${v}°`} />
        </div>
      </div>

      <div>
        <p className="section-label">Range Slider</p>
        <div className="clay-card p-6">
          <RangeSlider label="Price range" />
        </div>
      </div>
    </div>
  )
}
