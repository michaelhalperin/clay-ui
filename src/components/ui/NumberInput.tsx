import { useState, useRef, useCallback } from 'react'
import { Plus, Minus, DollarSign, Percent, Users, Package } from 'lucide-react'

export interface NumInputProps {
  value: number
  onChange: (v: number) => void
  min?: number
  max?: number
  step?: number
  prefix?: React.ReactNode
  suffix?: string
  label?: string
  description?: string
  format?: (v: number) => string
  disabled?: boolean
}

export function NumberInput({
  value, onChange, min = 0, max = Infinity, step = 1,
  prefix, suffix, label, description, format, disabled = false,
}: NumInputProps) {
  const [focused, setFocused] = useState(false)
  const [raw, setRaw] = useState(String(value))
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)

  const clamp = (v: number) => Math.max(min, Math.min(max, v))

  const commit = (v: number) => {
    const clamped = clamp(v)
    onChange(clamped)
    setRaw(String(clamped))
  }

  const startRepeat = (delta: number) => {
    commit(value + delta)
    intervalRef.current = setInterval(() => commit(value + delta), 120)
  }
  const stopRepeat = () => {
    if (intervalRef.current) clearInterval(intervalRef.current)
  }

  const onKey = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowUp') { e.preventDefault(); commit(value + step) }
    if (e.key === 'ArrowDown') { e.preventDefault(); commit(value - step) }
  }

  const display = focused ? raw : (format ? format(value) : String(value))

  return (
    <div className={`space-y-1 ${disabled ? 'opacity-50' : ''}`}>
      {label && <label className="block text-sm font-semibold text-slate-700">{label}</label>}
      <div className={`flex items-center border-2 rounded-clay shadow-soft bg-white transition-all duration-150
        ${disabled ? 'cursor-not-allowed' : ''}
        ${focused ? 'border-sky-300 ring-2 ring-sky-100' : 'border-slate-200 hover:border-slate-300'}`}>
        {prefix && (
          <div className="pl-3 text-slate-400 shrink-0 flex items-center">{prefix}</div>
        )}
        <input
          type="text"
          inputMode="numeric"
          value={display}
          disabled={disabled}
          onFocus={() => { setFocused(true); setRaw(String(value)) }}
          onBlur={() => {
            setFocused(false)
            const n = parseFloat(raw.replace(/[^0-9.-]/g, ''))
            commit(isNaN(n) ? value : n)
          }}
          onChange={e => setRaw(e.target.value)}
          onKeyDown={onKey}
          className="flex-1 min-w-0 px-3 py-2.5 text-sm font-semibold text-slate-800 bg-transparent focus:outline-none text-center tabular-nums"
        />
        {suffix && (
          <div className="pr-2.5 text-slate-400 text-xs font-semibold shrink-0">{suffix}</div>
        )}
        {/* Stepper buttons */}
        <div className="flex flex-col border-l border-slate-200 shrink-0">
          <button
            disabled={disabled || value >= max}
            onPointerDown={() => startRepeat(step)}
            onPointerUp={stopRepeat}
            onPointerLeave={stopRepeat}
            className="px-2.5 py-1 text-slate-400 hover:text-sky-600 hover:bg-sky-50 disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer transition-colors border-b border-slate-200 rounded-tr-clay">
            <Plus className="w-3 h-3" />
          </button>
          <button
            disabled={disabled || value <= min}
            onPointerDown={() => startRepeat(-step)}
            onPointerUp={stopRepeat}
            onPointerLeave={stopRepeat}
            className="px-2.5 py-1 text-slate-400 hover:text-red-500 hover:bg-red-50 disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer transition-colors rounded-br-clay">
            <Minus className="w-3 h-3" />
          </button>
        </div>
      </div>
      {description && <p className="text-xs text-slate-400">{description}</p>}
    </div>
  )
}

/* ── Quantity stepper (pill style) ── */
export function QuantityStepper({ label, min = 0 }: { label: string; min?: number }) {
  const [qty, setQty] = useState(1)
  return (
    <div className="flex items-center gap-3">
      <span className="text-sm font-medium text-slate-700 flex-1">{label}</span>
      <div className="flex items-center gap-2 bg-slate-100 rounded-full p-1">
        <button onClick={() => setQty(q => Math.max(min, q - 1))} disabled={qty <= min}
          className="w-7 h-7 rounded-full bg-white shadow-soft flex items-center justify-center text-slate-600 cursor-pointer hover:shadow-clay transition-all disabled:opacity-30 disabled:cursor-not-allowed">
          <Minus className="w-3 h-3" />
        </button>
        <span className="w-8 text-center text-sm font-bold text-slate-800 tabular-nums">{qty}</span>
        <button onClick={() => setQty(q => q + 1)}
          className="w-7 h-7 rounded-full bg-sky-500 shadow-clay flex items-center justify-center text-white cursor-pointer hover:bg-sky-600 transition-all">
          <Plus className="w-3 h-3" />
        </button>
      </div>
    </div>
  )
}

/* ── Cart-style quantity ── */
function CartItem({ name, price }: { name: string; price: number }) {
  const [qty, setQty] = useState(1)
  return (
    <div className="flex items-center gap-3 py-3 border-b border-slate-100 last:border-0">
      <div className="w-10 h-10 bg-sky-100 rounded-xl flex items-center justify-center shrink-0">
        <Package className="w-5 h-5 text-sky-500" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-semibold text-slate-800">{name}</p>
        <p className="text-xs text-slate-400">${price.toFixed(2)} each</p>
      </div>
      <div className="flex items-center border border-slate-200 rounded-xl overflow-hidden shrink-0">
        <button onClick={() => setQty(q => Math.max(1, q - 1))}
          className="w-8 h-8 flex items-center justify-center text-slate-500 hover:bg-slate-100 cursor-pointer transition-colors border-r border-slate-200">
          <Minus className="w-3 h-3" />
        </button>
        <span className="w-8 text-center text-sm font-bold text-slate-800 tabular-nums">{qty}</span>
        <button onClick={() => setQty(q => q + 1)}
          className="w-8 h-8 flex items-center justify-center text-slate-500 hover:bg-slate-100 cursor-pointer transition-colors border-l border-slate-200">
          <Plus className="w-3 h-3" />
        </button>
      </div>
      <p className="text-sm font-bold text-slate-800 w-14 text-right">${(qty * price).toFixed(2)}</p>
    </div>
  )
}

export function NumberInputShowcase() {
  const [budget, setBudget]   = useState(5000)
  const [rate, setRate]       = useState(12.5)
  const [seats, setSeats]     = useState(5)
  const [qty, setQty]         = useState(100)

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-2 gap-8">
        <div className="space-y-4">
          <p className="section-label">Number Inputs</p>
          <NumberInput value={budget} onChange={setBudget} min={0} max={100000} step={100}
            prefix={<DollarSign className="w-4 h-4" />}
            label="Monthly budget" description="Increment by $100 or type a value"
            format={v => v.toLocaleString()} />
          <NumberInput value={rate} onChange={setRate} min={0} max={100} step={0.5}
            suffix="%" label="Interest rate"
            format={v => v.toFixed(1)} />
          <NumberInput value={seats} onChange={setSeats} min={1} max={50} step={1}
            prefix={<Users className="w-4 h-4" />}
            label="Team seats" description="1–50 users" />
          <NumberInput value={qty} onChange={setQty} min={0} step={10}
            label="Quantity" disabled />
        </div>

        <div className="space-y-5">
          <div>
            <p className="section-label">Pill Steppers</p>
            <div className="clay-card p-4 space-y-3">
              <QuantityStepper label="Notifications per day" />
              <QuantityStepper label="Max retries" min={1} />
              <QuantityStepper label="Cache TTL (hours)" />
            </div>
          </div>
          <div>
            <p className="section-label">Cart Quantities</p>
            <div className="clay-card px-4">
              <CartItem name="Pro subscription" price={29} />
              <CartItem name="Extra storage (50 GB)" price={9} />
              <CartItem name="Priority support" price={19} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
