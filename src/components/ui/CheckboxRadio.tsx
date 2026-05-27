import { useState } from 'react'
import { Check, Circle } from 'lucide-react'

/* ─── Checkbox ─── */
export interface CheckboxProps {
  checked: boolean
  onChange: (v: boolean) => void
  label?: string
  description?: string
  disabled?: boolean
  indeterminate?: boolean
  color?: string
}

export function Checkbox({ checked, onChange, label, description, disabled, indeterminate, color = '#0ea5e9' }: CheckboxProps) {
  return (
    <label className={`flex items-start gap-3 cursor-pointer group ${disabled ? 'opacity-40 pointer-events-none' : ''}`}>
      <div className="relative shrink-0 mt-0.5">
        <input type="checkbox" className="sr-only" checked={checked} onChange={e => onChange(e.target.checked)} disabled={disabled} />
        <div
          className={`w-5 h-5 rounded-md border-2 flex items-center justify-center transition-all duration-150 cursor-pointer shadow-soft
            ${checked || indeterminate ? 'border-transparent' : 'border-slate-300 bg-white group-hover:border-slate-400'}`}
          style={checked || indeterminate ? { background: color, borderColor: color } : {}}
        >
          {checked && <Check className="w-3 h-3 text-white" strokeWidth={3} />}
          {indeterminate && !checked && <div className="w-2.5 h-0.5 bg-white rounded-full" />}
        </div>
      </div>
      {(label || description) && (
        <div>
          {label && <p className={`text-sm font-medium ${checked ? 'text-slate-800' : 'text-slate-600'} transition-colors`}>{label}</p>}
          {description && <p className="text-xs text-slate-400 mt-0.5">{description}</p>}
        </div>
      )}
    </label>
  )
}

/* ─── Radio ─── */
export interface RadioProps {
  value: string
  selected: string
  onChange: (v: string) => void
  label?: string
  description?: string
  disabled?: boolean
  color?: string
}

export function Radio({ value, selected, onChange, label, description, disabled, color = '#0ea5e9' }: RadioProps) {
  const isSelected = value === selected
  return (
    <label className={`flex items-start gap-3 cursor-pointer group ${disabled ? 'opacity-40 pointer-events-none' : ''}`}>
      <div className="relative shrink-0 mt-0.5"
        onClick={() => !disabled && onChange(value)}>
        <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all duration-150 cursor-pointer shadow-soft
          ${isSelected ? 'border-transparent' : 'border-slate-300 bg-white group-hover:border-slate-400'}`}
          style={isSelected ? { borderColor: color } : {}}>
          {isSelected && <div className="w-2.5 h-2.5 rounded-full" style={{ background: color }} />}
        </div>
      </div>
      {(label || description) && (
        <div>
          {label && <p className={`text-sm font-medium ${isSelected ? 'text-slate-800' : 'text-slate-600'} transition-colors`}>{label}</p>}
          {description && <p className="text-xs text-slate-400 mt-0.5">{description}</p>}
        </div>
      )}
    </label>
  )
}

/* ─── Card radio (big clickable card) ─── */
export function CardRadio({ value, selected, onChange, label, description, icon }: RadioProps & { icon: React.ReactNode }) {
  const isSelected = value === selected
  return (
    <div onClick={() => onChange(value)}
      className={`clay-card p-4 cursor-pointer transition-all duration-150 hover:-translate-y-0.5
        ${isSelected ? 'border-sky-300 ring-2 ring-sky-100' : 'hover:border-slate-300'}`}>
      <div className="flex items-start gap-3">
        <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${isSelected ? 'bg-sky-100 text-sky-600' : 'bg-slate-100 text-slate-400'}`}>
          {icon}
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-semibold text-slate-800">{label}</p>
          <p className="text-xs text-slate-400 mt-0.5">{description}</p>
        </div>
        <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center shrink-0 mt-0.5 transition-all
          ${isSelected ? 'border-sky-500' : 'border-slate-300'}`}>
          {isSelected && <div className="w-2 h-2 rounded-full bg-sky-500" />}
        </div>
      </div>
    </div>
  )
}

export function CheckboxRadioShowcase() {
  const [checks, setChecks] = useState({ a: true, b: false, c: true, d: false })
  const toggleCheck = (k: keyof typeof checks) => setChecks(s => ({ ...s, [k]: !s[k] }))
  const allChecked = Object.values(checks).every(Boolean)
  const someChecked = Object.values(checks).some(Boolean) && !allChecked

  const [plan, setPlan] = useState('pro')
  const [notif, setNotif] = useState('all')

  const plans = [
    { value: 'free', label: 'Free', description: 'Up to 3 projects, 5 GB storage' },
    { value: 'pro',  label: 'Pro',  description: 'Unlimited projects, 50 GB, priority support' },
    { value: 'team', label: 'Team', description: 'Everything in Pro plus team workspaces' },
  ]

  const notifOpts = [
    { value: 'all',       label: 'All notifications',  description: 'Receive every alert in real time' },
    { value: 'important', label: 'Important only',     description: 'Only critical alerts and mentions' },
    { value: 'none',      label: 'None',               description: 'No notifications, check manually' },
  ]

  return (
    <div className="grid grid-cols-2 gap-8">
      <div className="space-y-6">
        <div>
          <p className="section-label">Checkbox Group</p>
          <div className="clay-card p-4 space-y-3">
            <Checkbox
              checked={allChecked} indeterminate={someChecked}
              onChange={v => setChecks({ a: v, b: v, c: v, d: v })}
              label="Select all" description="Toggle all options below"
            />
            <div className="border-t border-slate-100 pt-3 pl-4 space-y-3">
              <Checkbox checked={checks.a} onChange={() => toggleCheck('a')} label="Push notifications" description="Browser and mobile alerts" />
              <Checkbox checked={checks.b} onChange={() => toggleCheck('b')} label="Email digest" description="Weekly summary every Monday" />
              <Checkbox checked={checks.c} onChange={() => toggleCheck('c')} label="SMS alerts" description="For critical incidents only" />
              <Checkbox checked={checks.d} onChange={() => toggleCheck('d')} label="API webhooks" description="POST to your endpoint" disabled />
            </div>
          </div>
        </div>

        <div>
          <p className="section-label">Radio Group</p>
          <div className="clay-card p-4 space-y-3">
            {notifOpts.map(o => (
              <Radio key={o.value} value={o.value} selected={notif} onChange={setNotif}
                label={o.label} description={o.description} />
            ))}
          </div>
        </div>
      </div>

      <div>
        <p className="section-label">Card Radio — Plan Selector</p>
        <div className="space-y-3">
          {plans.map(p => (
            <CardRadio key={p.value} value={p.value} selected={plan} onChange={setPlan}
              label={p.label} description={p.description}
              icon={<Circle className="w-4 h-4" />}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
