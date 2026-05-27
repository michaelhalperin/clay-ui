import { useState } from 'react'
import { Bell, Moon, Wifi, Shield } from 'lucide-react'

export interface ToggleProps {
  checked: boolean
  onChange: (v: boolean) => void
  color?: string
  label?: string
  description?: string
  icon?: React.ReactNode
  disabled?: boolean
}

export function Toggle({ checked, onChange, color = 'bg-sky-500', label, description, icon, disabled }: ToggleProps) {
  return (
    <div className={`flex items-center gap-3 ${disabled ? 'opacity-40' : ''}`}>
      {icon && (
        <div className={`w-9 h-9 rounded-xl flex items-center justify-center transition-colors duration-200 ${checked ? color.replace('bg-', 'bg-').replace('500', '100').replace('400', '100') : 'bg-slate-100'}`}>
          <span className={`transition-colors duration-200 ${checked ? color.replace('bg-', 'text-') : 'text-slate-400'}`}>{icon}</span>
        </div>
      )}
      {(label || description) && (
        <div className="flex-1 min-w-0">
          {label && <p className="text-sm font-semibold text-slate-700">{label}</p>}
          {description && <p className="text-xs text-slate-400 mt-0.5">{description}</p>}
        </div>
      )}
      <button
        role="switch"
        aria-checked={checked}
        onClick={() => !disabled && onChange(!checked)}
        className={`relative inline-flex h-7 w-12 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-400 ${checked ? color : 'bg-slate-200'}`}
        style={{ boxShadow: checked ? '4px 4px 0 rgba(0,0,0,0.08)' : 'inset 2px 2px 4px rgba(0,0,0,0.06)' }}
      >
        <span
          className={`pointer-events-none inline-block h-6 w-6 transform rounded-full bg-white shadow-md ring-0 transition-transform duration-200 ${checked ? 'translate-x-5' : 'translate-x-0'}`}
          style={{ boxShadow: '2px 2px 6px rgba(0,0,0,0.15)' }}
        />
      </button>
    </div>
  )
}

export function TogglesShowcase() {
  const [states, setStates] = useState({ a: true, b: false, c: true, d: false, e: true, f: false })
  const set = (k: keyof typeof states) => (v: boolean) => setStates(s => ({ ...s, [k]: v }))

  return (
    <div className="grid grid-cols-2 gap-8">
      <div>
        <p className="section-label">Basic Toggles</p>
        <div className="flex flex-wrap gap-4">
          {(['bg-sky-500', 'bg-emerald-400', 'bg-violet-400', 'bg-pink-400'] as const).map((color, i) => {
            const key = ['a','b','c','d'][i] as keyof typeof states
            return (
              <Toggle key={color} checked={states[key]} onChange={set(key)} color={color} />
            )
          })}
        </div>
      </div>

      <div>
        <p className="section-label">With Labels</p>
        <div className="clay-card p-5 space-y-4">
          <Toggle
            checked={states.a} onChange={set('a')}
            icon={<Bell className="w-4 h-4" />}
            label="Push notifications" description="Get alerts for activity"
            color="bg-sky-500"
          />
          <div className="border-t border-slate-100" />
          <Toggle
            checked={states.b} onChange={set('b')}
            icon={<Moon className="w-4 h-4" />}
            label="Dark mode" description="Switch to dark theme"
            color="bg-violet-400"
          />
          <div className="border-t border-slate-100" />
          <Toggle
            checked={states.c} onChange={set('c')}
            icon={<Wifi className="w-4 h-4" />}
            label="Auto-connect Wi-Fi" description="Connect to known networks"
            color="bg-emerald-400"
          />
          <div className="border-t border-slate-100" />
          <Toggle
            checked={states.d} onChange={set('d')}
            icon={<Shield className="w-4 h-4" />}
            label="Two-factor auth" description="Extra login security"
            color="bg-pink-400"
            disabled
          />
        </div>
      </div>
    </div>
  )
}
