import { useState } from 'react'
import { Search, Mail, Eye, EyeOff, User, Lock, AlertCircle, CheckCircle2 } from 'lucide-react'

export interface InputProps {
  label?: string
  placeholder?: string
  type?: string
  icon?: React.ReactNode
  iconRight?: React.ReactNode
  error?: string
  success?: string
  hint?: string
  disabled?: boolean
  value: string
  onChange: (v: string) => void
}

export function Input({ label, placeholder, type = 'text', icon, iconRight, error, success, hint, disabled, value, onChange }: InputProps) {
  const borderColor = error ? 'border-red-300 focus:ring-red-300' : success ? 'border-emerald-300 focus:ring-emerald-300' : 'border-slate-200 focus:ring-sky-300'

  return (
    <div className="space-y-1.5">
      {label && <label className="block text-sm font-semibold text-slate-700">{label}</label>}
      <div className="relative">
        {icon && (
          <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400">{icon}</div>
        )}
        <input
          type={type}
          placeholder={placeholder}
          value={value}
          disabled={disabled}
          onChange={e => onChange(e.target.value)}
          className={`w-full rounded-clay border bg-white px-4 py-3 text-sm text-slate-700 placeholder-slate-300
            shadow-soft focus:outline-none focus:ring-2 focus:ring-offset-0 transition-all duration-200
            disabled:opacity-50 disabled:cursor-not-allowed
            ${icon ? 'pl-10' : ''} ${iconRight ? 'pr-10' : ''} ${borderColor}`}
        />
        {iconRight && (
          <div className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400">{iconRight}</div>
        )}
      </div>
      {error && <p className="flex items-center gap-1.5 text-xs text-red-500"><AlertCircle className="w-3.5 h-3.5" />{error}</p>}
      {success && <p className="flex items-center gap-1.5 text-xs text-emerald-500"><CheckCircle2 className="w-3.5 h-3.5" />{success}</p>}
      {hint && !error && !success && <p className="text-xs text-slate-400">{hint}</p>}
    </div>
  )
}

export function Textarea({ label, placeholder, hint, value, onChange }: { label?: string; placeholder?: string; hint?: string; value: string; onChange: (v: string) => void }) {
  return (
    <div className="space-y-1.5">
      {label && <label className="block text-sm font-semibold text-slate-700">{label}</label>}
      <textarea
        placeholder={placeholder}
        value={value}
        onChange={e => onChange(e.target.value)}
        rows={4}
        className="w-full rounded-clay border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 placeholder-slate-300
          shadow-soft focus:outline-none focus:ring-2 focus:ring-sky-300 focus:ring-offset-0 transition-all duration-200 resize-none"
      />
      {hint && <p className="text-xs text-slate-400">{hint}</p>}
    </div>
  )
}

export function InputsShowcase() {
  const [vals, setVals] = useState({ search: '', email: '', pass: '', user: '', bio: '', err: 'wrong@email', ok: 'Available!' })
  const [showPass, setShowPass] = useState(false)
  const set = (k: keyof typeof vals) => (v: string) => setVals(s => ({ ...s, [k]: v }))

  return (
    <div className="grid grid-cols-3 gap-8">
      <div>
        <p className="section-label">Text Inputs</p>
        <div className="space-y-4">
          <Input placeholder="Search anything…" icon={<Search className="w-4 h-4" />} value={vals.search} onChange={set('search')} />
          <Input label="Email address" placeholder="you@email.com" type="email" icon={<Mail className="w-4 h-4" />} value={vals.email} onChange={set('email')} hint="We'll never share your email." />
          <Input
            label="Password"
            placeholder="Min 8 characters"
            type={showPass ? 'text' : 'password'}
            icon={<Lock className="w-4 h-4" />}
            iconRight={
              <button onClick={() => setShowPass(s => !s)} className="cursor-pointer text-slate-400 hover:text-slate-600 transition-colors">
                {showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            }
            value={vals.pass}
            onChange={set('pass')}
          />
        </div>
      </div>

      <div>
        <p className="section-label">Validation States</p>
        <div className="space-y-4">
          <Input label="Email" placeholder="you@email.com" value={vals.err} onChange={set('err')} error="Please enter a valid email address." icon={<Mail className="w-4 h-4" />} />
          <Input label="Username" placeholder="@handle" value={vals.ok} onChange={set('ok')} success="Username is available!" icon={<User className="w-4 h-4" />} />
        </div>
      </div>

      <div>
        <p className="section-label">Textarea</p>
        <Textarea label="Bio" placeholder="Tell us about yourself…" value={vals.bio} onChange={set('bio')} hint={`${vals.bio.length}/200 characters`} />
      </div>
    </div>
  )
}
