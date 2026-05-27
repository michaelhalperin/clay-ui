import { useState } from 'react'
import { Eye, EyeOff, Check, X, Github, Chrome, AlertCircle } from 'lucide-react'

function PasswordStrength({ password }: { password: string }) {
  const checks = [
    { label: 'At least 8 characters', pass: password.length >= 8 },
    { label: 'Contains uppercase',    pass: /[A-Z]/.test(password) },
    { label: 'Contains number',       pass: /\d/.test(password) },
    { label: 'Contains symbol',       pass: /[^A-Za-z0-9]/.test(password) },
  ]
  const score = checks.filter(c => c.pass).length
  const colors = ['bg-red-400', 'bg-orange-400', 'bg-amber-400', 'bg-emerald-400']
  const labels = ['Weak', 'Fair', 'Good', 'Strong']

  if (!password) return null
  return (
    <div className="space-y-2 mt-2">
      <div className="flex gap-1">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className={`h-1 flex-1 rounded-full transition-colors ${i < score ? colors[score - 1] : 'bg-slate-100'}`} />
        ))}
      </div>
      <p className={`text-[11px] font-semibold ${score > 0 ? colors[score - 1].replace('bg-', 'text-') : 'text-slate-400'}`}>
        {score > 0 ? labels[score - 1] : ''}
      </p>
      <div className="space-y-1">
        {checks.map(c => (
          <div key={c.label} className="flex items-center gap-1.5">
            {c.pass
              ? <Check className="w-3 h-3 text-emerald-500 shrink-0" />
              : <X className="w-3 h-3 text-slate-300 shrink-0" />}
            <span className={`text-[11px] ${c.pass ? 'text-slate-600' : 'text-slate-400'}`}>{c.label}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

function Input({ label, type = 'text', placeholder, value, onChange, error, showToggle }: {
  label: string; type?: string; placeholder?: string; value: string
  onChange: (v: string) => void; error?: string; showToggle?: boolean
}) {
  const [show, setShow] = useState(false)
  const inputType = showToggle ? (show ? 'text' : 'password') : type

  return (
    <div className="space-y-1.5">
      <label className="block text-sm font-semibold text-slate-700">{label}</label>
      <div className={`flex items-center border-2 rounded-xl bg-white transition-all h-11
        ${error ? 'border-red-400 ring-2 ring-red-100' : 'border-slate-200 focus-within:border-sky-400 focus-within:ring-2 focus-within:ring-sky-100'}`}>
        <input type={inputType} value={value} onChange={e => onChange(e.target.value)}
          placeholder={placeholder}
          className="flex-1 px-3 text-sm text-slate-700 bg-transparent focus:outline-none placeholder-slate-300" />
        {showToggle && (
          <button type="button" onClick={() => setShow(s => !s)}
            className="px-3 text-slate-400 hover:text-slate-600 cursor-pointer transition-colors">
            {show ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
          </button>
        )}
      </div>
      {error && (
        <div className="flex items-center gap-1 text-red-500">
          <AlertCircle className="w-3.5 h-3.5 shrink-0" />
          <span className="text-xs">{error}</span>
        </div>
      )}
    </div>
  )
}

export function SignInCard() {
  const [email, setEmail]       = useState('')
  const [password, setPassword] = useState('')
  const [error, setError]       = useState('')
  const [loading, setLoading]   = useState(false)
  const [success, setSuccess]   = useState(false)

  const submit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!email.includes('@')) { setError('Enter a valid email'); return }
    if (password.length < 6)  { setError('Password too short'); return }
    setError(''); setLoading(true)
    setTimeout(() => { setLoading(false); setSuccess(true) }, 1200)
  }

  if (success) return (
    <div className="flex flex-col items-center gap-3 py-6">
      <div className="w-14 h-14 bg-emerald-100 rounded-full flex items-center justify-center">
        <Check className="w-7 h-7 text-emerald-500" />
      </div>
      <p className="font-heading font-bold text-slate-800">Welcome back!</p>
      <p className="text-sm text-slate-400">Redirecting to dashboard…</p>
    </div>
  )

  return (
    <form onSubmit={submit} className="space-y-4">
      <Input label="Email" type="email" placeholder="you@example.com" value={email} onChange={setEmail} />
      <Input label="Password" placeholder="••••••••" value={password} onChange={setPassword} showToggle />

      {error && (
        <div className="flex items-center gap-2 bg-red-50 border border-red-100 text-red-600 text-xs font-medium px-3 py-2.5 rounded-xl">
          <AlertCircle className="w-3.5 h-3.5 shrink-0" />{error}
        </div>
      )}

      <div className="flex items-center justify-between">
        <label className="flex items-center gap-2 cursor-pointer">
          <input type="checkbox" className="w-4 h-4 rounded accent-sky-500" />
          <span className="text-xs text-slate-500">Remember me</span>
        </label>
        <button type="button" className="text-xs font-semibold text-sky-500 hover:text-sky-600 cursor-pointer">Forgot password?</button>
      </div>

      <button type="submit" disabled={loading}
        className="w-full h-11 bg-sky-500 hover:bg-sky-600 text-white font-semibold rounded-xl shadow-clay cursor-pointer transition-all disabled:opacity-70 flex items-center justify-center gap-2">
        {loading ? <><span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />Signing in…</> : 'Sign in'}
      </button>

      <div className="relative flex items-center gap-3">
        <div className="flex-1 h-px bg-slate-100" />
        <span className="text-xs text-slate-400 font-medium shrink-0">or continue with</span>
        <div className="flex-1 h-px bg-slate-100" />
      </div>

      <div className="grid grid-cols-2 gap-2">
        {[
          { icon: <Chrome className="w-4 h-4" />, label: 'Google' },
          { icon: <Github className="w-4 h-4" />, label: 'GitHub' },
        ].map(s => (
          <button key={s.label} type="button"
            className="flex items-center justify-center gap-2 h-10 border-2 border-slate-200 rounded-xl text-sm font-semibold text-slate-600 hover:border-slate-300 hover:bg-slate-50 cursor-pointer transition-all">
            {s.icon}{s.label}
          </button>
        ))}
      </div>
    </form>
  )
}

export function SignUpCard() {
  const [name, setName]         = useState('')
  const [email, setEmail]       = useState('')
  const [password, setPassword] = useState('')
  const [emailError, setEmailError] = useState('')

  const validateEmail = (v: string) => {
    setEmail(v)
    setEmailError(v && !v.includes('@') ? 'Enter a valid email address' : '')
  }

  return (
    <form className="space-y-4" onSubmit={e => e.preventDefault()}>
      <Input label="Full name" placeholder="Sophie Leblanc" value={name} onChange={setName} />
      <Input label="Email" type="email" placeholder="you@example.com" value={email} onChange={validateEmail} error={emailError} />
      <div>
        <Input label="Password" placeholder="Create a password" value={password} onChange={setPassword} showToggle />
        <PasswordStrength password={password} />
      </div>

      <label className="flex items-start gap-2 cursor-pointer">
        <input type="checkbox" className="w-4 h-4 rounded accent-sky-500 mt-0.5 shrink-0" />
        <span className="text-xs text-slate-500">
          I agree to the <span className="text-sky-500 font-semibold">Terms of Service</span> and <span className="text-sky-500 font-semibold">Privacy Policy</span>
        </span>
      </label>

      <button type="submit"
        className="w-full h-11 bg-gradient-to-r from-sky-500 to-violet-500 hover:from-sky-600 hover:to-violet-600 text-white font-semibold rounded-xl shadow-clay cursor-pointer transition-all">
        Create account
      </button>

      <div className="relative flex items-center gap-3">
        <div className="flex-1 h-px bg-slate-100" />
        <span className="text-xs text-slate-400 font-medium shrink-0">or</span>
        <div className="flex-1 h-px bg-slate-100" />
      </div>

      <div className="grid grid-cols-2 gap-2">
        {[
          { icon: <Chrome className="w-4 h-4" />, label: 'Google' },
          { icon: <Github className="w-4 h-4" />, label: 'GitHub' },
        ].map(s => (
          <button key={s.label} type="button"
            className="flex items-center justify-center gap-2 h-10 border-2 border-slate-200 rounded-xl text-sm font-semibold text-slate-600 hover:border-slate-300 hover:bg-slate-50 cursor-pointer transition-all">
            {s.icon}{s.label}
          </button>
        ))}
      </div>
    </form>
  )
}

export function AuthCardShowcase() {
  const [tab, setTab] = useState<'signin' | 'signup'>('signin')

  return (
    <div className="flex gap-8 justify-center">
      <div className="w-80 clay-card p-6">
        {/* Tabs */}
        <div className="flex gap-1 bg-slate-100 rounded-xl p-1 mb-5">
          {([['signin', 'Sign in'], ['signup', 'Sign up']] as const).map(([id, label]) => (
            <button key={id} onClick={() => setTab(id)}
              className={`flex-1 text-sm font-semibold py-1.5 rounded-lg cursor-pointer transition-all
                ${tab === id ? 'bg-white text-slate-800 shadow-soft' : 'text-slate-500 hover:text-slate-700'}`}>
              {label}
            </button>
          ))}
        </div>

        <div className="mb-4">
          <h2 className="font-heading font-bold text-xl text-slate-800">
            {tab === 'signin' ? 'Welcome back' : 'Create account'}
          </h2>
          <p className="text-sm text-slate-400 mt-0.5">
            {tab === 'signin' ? 'Sign in to continue to Clay UI' : 'Start building with Clay UI today'}
          </p>
        </div>

        {tab === 'signin' ? <SignInCard /> : <SignUpCard />}
      </div>
    </div>
  )
}
