import { useState, useEffect } from 'react'
import { Zap, Upload, Download, Cpu } from 'lucide-react'

/* ─── Linear progress ─── */
export interface LinearProps {
  value: number
  max?: number
  color?: string
  size?: 'sm' | 'md' | 'lg'
  label?: string
  showValue?: boolean
  striped?: boolean
  animated?: boolean
}

export function LinearProgress({ value, max = 100, color = '#0ea5e9', size = 'md', label, showValue = true, striped, animated }: LinearProps) {
  const pct = Math.min(100, Math.max(0, (value / max) * 100))
  const heights = { sm: 'h-1.5', md: 'h-3', lg: 'h-4' }

  return (
    <div className="space-y-1.5">
      {(label || showValue) && (
        <div className="flex items-center justify-between">
          {label && <span className="text-xs font-semibold text-slate-600">{label}</span>}
          {showValue && <span className="text-xs font-bold text-slate-500 tabular-nums">{Math.round(pct)}%</span>}
        </div>
      )}
      <div className={`w-full ${heights[size]} bg-slate-100 rounded-full overflow-hidden shadow-clay-inset`}>
        <div
          className={`h-full rounded-full transition-all duration-700 ease-out relative overflow-hidden`}
          style={{ width: `${pct}%`, background: color }}
        >
          {striped && (
            <div className="absolute inset-0 opacity-20"
              style={{
                backgroundImage: 'repeating-linear-gradient(45deg,transparent,transparent 6px,rgba(255,255,255,0.8) 6px,rgba(255,255,255,0.8) 12px)',
                ...(animated ? { animation: 'shimmer 1s linear infinite', backgroundSize: '30px 100%' } : {})
              }}
            />
          )}
        </div>
      </div>
    </div>
  )
}

/* ─── Indeterminate / loading bar ─── */
export function IndeterminateBar({ color = '#0ea5e9', label }: { color?: string; label?: string }) {
  return (
    <div className="space-y-1.5">
      {label && <span className="text-xs font-semibold text-slate-600">{label}</span>}
      <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden shadow-clay-inset">
        <div className="h-full rounded-full animate-[indeterminate_1.4s_linear_infinite]"
          style={{ background: color, width: '40%' }} />
      </div>
    </div>
  )
}

/* ─── Circular progress ─── */
export interface CircularProps {
  value: number
  size?: number
  stroke?: number
  color?: string
  trackColor?: string
  label?: string
  children?: React.ReactNode
}

export function CircularProgress({ value, size = 80, stroke = 8, color = '#0ea5e9', trackColor = '#f1f5f9', label, children }: CircularProps) {
  const r = (size - stroke) / 2
  const circ = 2 * Math.PI * r
  const offset = circ - (Math.min(100, Math.max(0, value)) / 100) * circ

  return (
    <div className="flex flex-col items-center gap-2">
      <div className="relative" style={{ width: size, height: size }}>
        <svg width={size} height={size} className="-rotate-90">
          <circle cx={size/2} cy={size/2} r={r} fill="none" stroke={trackColor} strokeWidth={stroke} />
          <circle cx={size/2} cy={size/2} r={r} fill="none" stroke={color} strokeWidth={stroke}
            strokeLinecap="round" strokeDasharray={circ} strokeDashoffset={offset}
            style={{ transition: 'stroke-dashoffset 0.8s cubic-bezier(0.4,0,0.2,1)' }} />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          {children ?? <span className="text-sm font-bold text-slate-700">{Math.round(value)}%</span>}
        </div>
      </div>
      {label && <span className="text-xs font-medium text-slate-500">{label}</span>}
    </div>
  )
}

/* ─── Segmented / step progress ─── */
export function StepProgress({ steps, current }: { steps: string[]; current: number }) {
  return (
    <div className="space-y-2">
      <div className="flex gap-1.5">
        {steps.map((_, i) => (
          <div key={i} className="flex-1 h-2 rounded-full overflow-hidden bg-slate-100 shadow-clay-inset">
            <div className={`h-full rounded-full transition-all duration-500 ${i < current ? 'bg-sky-500 w-full' : i === current ? 'bg-sky-300 w-1/2' : 'w-0'}`} />
          </div>
        ))}
      </div>
      <div className="flex justify-between">
        {steps.map((s, i) => (
          <span key={s} className={`text-[10px] font-semibold ${i <= current ? 'text-sky-600' : 'text-slate-400'}`}>{s}</span>
        ))}
      </div>
    </div>
  )
}

/* ─── Live demo ─── */
export function ProgressShowcase() {
  const [vals, setVals] = useState({ upload: 0, cpu: 45, storage: 72, battery: 88 })
  const [step, setStep] = useState(1)

  useEffect(() => {
    const t = setInterval(() => {
      setVals(v => ({
        ...v,
        upload: v.upload >= 100 ? 0 : v.upload + 2,
        cpu: Math.max(20, Math.min(95, v.cpu + (Math.random() - 0.5) * 8)),
      }))
    }, 200)
    return () => clearInterval(t)
  }, [])

  return (
    <div className="grid grid-cols-2 gap-8">
      <div className="space-y-6">
        <div>
          <p className="section-label">Linear — Sizes &amp; Colors</p>
          <div className="space-y-4">
            <LinearProgress value={vals.upload} label="Upload" color="#0ea5e9" size="sm" />
            <LinearProgress value={vals.storage} label="Storage" color="#8b5cf6" size="md" />
            <LinearProgress value={vals.battery} label="Battery" color="#10b981" size="lg" />
            <LinearProgress value={62} label="Striped" color="#f472b6" striped />
            <LinearProgress value={75} label="Animated stripes" color="#f59e0b" striped animated />
          </div>
        </div>
        <div>
          <p className="section-label">Indeterminate</p>
          <div className="space-y-4">
            <IndeterminateBar color="#0ea5e9" label="Loading data…" />
            <IndeterminateBar color="#8b5cf6" label="Syncing…" />
          </div>
        </div>
        <div>
          <p className="section-label">Step Progress</p>
          <div className="space-y-3">
            <StepProgress steps={['Details','Payment','Review','Done']} current={step} />
            <div className="flex gap-2">
              <button onClick={() => setStep(s => Math.max(0, s-1))} className="px-3 py-1.5 text-xs font-semibold bg-slate-100 text-slate-600 rounded-lg cursor-pointer hover:bg-slate-200 transition-colors">Back</button>
              <button onClick={() => setStep(s => Math.min(3, s+1))} className="px-3 py-1.5 text-xs font-semibold bg-sky-500 text-white rounded-lg cursor-pointer hover:bg-sky-600 transition-colors shadow-clay">Next</button>
            </div>
          </div>
        </div>
      </div>

      <div>
        <p className="section-label">Circular — System Metrics</p>
        <div className="grid grid-cols-2 gap-6">
          <CircularProgress value={vals.cpu} color="#0ea5e9" label="CPU">
            <div className="flex flex-col items-center">
              <Cpu className="w-4 h-4 text-sky-500" />
              <span className="text-[11px] font-bold text-slate-700">{Math.round(vals.cpu)}%</span>
            </div>
          </CircularProgress>
          <CircularProgress value={vals.storage} color="#8b5cf6" label="Storage">
            <div className="flex flex-col items-center">
              <Download className="w-4 h-4 text-violet-500" />
              <span className="text-[11px] font-bold text-slate-700">{vals.storage}%</span>
            </div>
          </CircularProgress>
          <CircularProgress value={vals.battery} color="#10b981" label="Battery">
            <div className="flex flex-col items-center">
              <Zap className="w-4 h-4 text-emerald-500" />
              <span className="text-[11px] font-bold text-slate-700">{vals.battery}%</span>
            </div>
          </CircularProgress>
          <CircularProgress value={vals.upload} color="#f59e0b" label="Upload">
            <div className="flex flex-col items-center">
              <Upload className="w-4 h-4 text-amber-500" />
              <span className="text-[11px] font-bold text-slate-700">{Math.round(vals.upload)}%</span>
            </div>
          </CircularProgress>
        </div>
      </div>
    </div>
  )
}
