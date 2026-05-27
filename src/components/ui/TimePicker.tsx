import { useState, useRef } from 'react'
import { Clock, ChevronUp, ChevronDown } from 'lucide-react'

function Spinner({ value, min, max, label, format = (v: number) => String(v).padStart(2, '0'), onChange }: {
  value: number; min: number; max: number; label: string
  format?: (v: number) => string
  onChange: (v: number) => void
}) {
  const wrap = (v: number) => v < min ? max : v > max ? min : v
  const startY = useRef(0)
  const startVal = useRef(0)

  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    e.currentTarget.setPointerCapture(e.pointerId)
    startY.current = e.clientY
    startVal.current = value
    const onMove = (ev: PointerEvent) => {
      const delta = Math.round((startY.current - ev.clientY) / 28)
      onChange(wrap(startVal.current + delta))
    }
    const onUp = () => {
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('pointerup', onUp)
    }
    window.addEventListener('pointermove', onMove)
    window.addEventListener('pointerup', onUp)
  }

  const prev = format(wrap(value - 1))
  const curr = format(value)
  const next = format(wrap(value + 1))

  return (
    <div className="flex flex-col items-center gap-1">
      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{label}</span>
      <div className="flex flex-col items-center select-none">
        <button onClick={() => onChange(wrap(value + 1))}
          className="w-9 h-7 flex items-center justify-center rounded-xl hover:bg-slate-100 cursor-pointer transition-colors text-slate-400 hover:text-slate-600">
          <ChevronUp className="w-4 h-4" />
        </button>

        <div onPointerDown={onPointerDown}
          className="flex flex-col items-center cursor-ns-resize touch-none py-1 gap-0.5">
          <span className="text-slate-300 font-heading font-bold text-lg leading-none">{prev}</span>
          <span className="text-slate-800 font-heading font-bold text-3xl leading-none tabular-nums">{curr}</span>
          <span className="text-slate-300 font-heading font-bold text-lg leading-none">{next}</span>
        </div>

        <button onClick={() => onChange(wrap(value - 1))}
          className="w-9 h-7 flex items-center justify-center rounded-xl hover:bg-slate-100 cursor-pointer transition-colors text-slate-400 hover:text-slate-600">
          <ChevronDown className="w-4 h-4" />
        </button>
      </div>
    </div>
  )
}

export function TimePickerWidget({ label, showSeconds = false, use12h = false }: {
  label: string; showSeconds?: boolean; use12h?: boolean
}) {
  const [hour, setHour]   = useState(10)
  const [min, setMin]     = useState(30)
  const [sec, setSec]     = useState(0)
  const [ampm, setAmpm]   = useState<'AM' | 'PM'>('AM')

  const display12 = use12h ? (hour === 0 ? 12 : hour > 12 ? hour - 12 : hour) : hour
  const maxH = use12h ? 12 : 23
  const minH = use12h ? 1  : 0

  const timeStr = use12h
    ? `${String(display12).padStart(2, '0')}:${String(min).padStart(2, '0')}${showSeconds ? `:${String(sec).padStart(2, '0')}` : ''} ${ampm}`
    : `${String(hour).padStart(2, '0')}:${String(min).padStart(2, '0')}${showSeconds ? `:${String(sec).padStart(2, '0')}` : ''}`

  return (
    <div className="space-y-2">
      <p className="text-sm font-semibold text-slate-700">{label}</p>
      <div className="clay-card p-5 inline-flex flex-col gap-4">
        <div className="flex items-center gap-3">
          <Spinner value={display12} min={minH} max={maxH} label="Hour" onChange={v => setHour(use12h ? (ampm === 'PM' && v !== 12 ? v + 12 : v === 12 && ampm === 'AM' ? 0 : v) : v)} />
          <span className="font-heading font-bold text-3xl text-slate-300 mt-4 select-none">:</span>
          <Spinner value={min} min={0} max={59} label="Min" onChange={setMin} />
          {showSeconds && <>
            <span className="font-heading font-bold text-3xl text-slate-300 mt-4 select-none">:</span>
            <Spinner value={sec} min={0} max={59} label="Sec" onChange={setSec} />
          </>}
          {use12h && (
            <div className="flex flex-col gap-1 mt-4">
              {(['AM', 'PM'] as const).map(p => (
                <button key={p} onClick={() => setAmpm(p)}
                  className={`text-xs font-bold px-2.5 py-1 rounded-lg cursor-pointer transition-all
                    ${ampm === p ? 'bg-sky-500 text-white shadow-clay' : 'text-slate-400 hover:bg-slate-100'}`}>
                  {p}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Selected time display */}
        <div className="flex items-center gap-2 px-3 py-2 bg-slate-50 rounded-xl">
          <Clock className="w-3.5 h-3.5 text-sky-500 shrink-0" />
          <span className="text-sm font-semibold text-slate-700 tabular-nums">{timeStr}</span>
        </div>
      </div>
    </div>
  )
}

export function TimePickerShowcase() {
  return (
    <div className="flex flex-wrap gap-8">
      <TimePickerWidget label="24-hour" />
      <TimePickerWidget label="12-hour (AM/PM)" use12h />
      <TimePickerWidget label="With seconds" showSeconds />
    </div>
  )
}
