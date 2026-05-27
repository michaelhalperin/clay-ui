import { useRef, useState, KeyboardEvent, ClipboardEvent } from 'react'
import { CheckCircle2, RefreshCw } from 'lucide-react'

const CORRECT = '482916'

export function OTPField({ length = 6, onComplete }: { length?: number; onComplete?: (val: string) => void }) {
  const [vals, setVals] = useState<string[]>(Array(length).fill(''))
  const refs = useRef<(HTMLInputElement | null)[]>([])
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle')

  const focus = (i: number) => refs.current[i]?.focus()

  const update = (i: number, char: string) => {
    const next = [...vals]
    next[i] = char.slice(-1)
    setVals(next)
    setStatus('idle')
    if (char && i < length - 1) focus(i + 1)
    const code = next.join('')
    if (code.length === length && onComplete) {
      onComplete(code)
      setStatus(code === CORRECT ? 'success' : 'error')
    }
  }

  const onKey = (e: KeyboardEvent<HTMLInputElement>, i: number) => {
    if (e.key === 'Backspace') {
      if (vals[i]) { update(i, '') }
      else if (i > 0) { update(i - 1, ''); focus(i - 1) }
    }
    if (e.key === 'ArrowLeft'  && i > 0)          focus(i - 1)
    if (e.key === 'ArrowRight' && i < length - 1) focus(i + 1)
  }

  const onPaste = (e: ClipboardEvent) => {
    e.preventDefault()
    const text = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, length)
    const next = [...vals]
    text.split('').forEach((c, i) => { next[i] = c })
    setVals(next)
    focus(Math.min(text.length, length - 1))
    if (text.length === length && onComplete) {
      onComplete(text)
      setStatus(text === CORRECT ? 'success' : 'error')
    }
  }

  const reset = () => { setVals(Array(length).fill('')); setStatus('idle'); focus(0) }

  const borderColor = status === 'success' ? 'border-emerald-400 ring-2 ring-emerald-100' : status === 'error' ? 'border-red-400 ring-2 ring-red-100' : 'border-slate-200 focus:border-sky-400 focus:ring-2 focus:ring-sky-100'

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        {vals.map((v, i) => (
          <input
            key={i}
            ref={el => { refs.current[i] = el }}
            type="text" inputMode="numeric" maxLength={1} value={v}
            onChange={e => update(i, e.target.value.replace(/\D/g,''))}
            onKeyDown={e => onKey(e, i)}
            onPaste={onPaste}
            onFocus={e => e.target.select()}
            className={`w-12 h-14 text-center text-xl font-bold text-slate-800 bg-white border-2 rounded-clay shadow-soft
              transition-all duration-150 focus:outline-none ${borderColor}
              ${status === 'success' ? 'bg-emerald-50 text-emerald-700' : status === 'error' ? 'bg-red-50 text-red-600' : ''}`}
          />
        ))}
      </div>
      {status === 'success' && (
        <p className="flex items-center gap-2 text-sm text-emerald-600 font-medium" style={{ animation: 'fadeIn 0.2s ease' }}>
          <CheckCircle2 className="w-4 h-4" /> Code verified successfully!
        </p>
      )}
      {status === 'error' && (
        <p className="text-sm text-red-500 font-medium" style={{ animation: 'fadeIn 0.2s ease' }}>
          Incorrect code. Try <strong>{CORRECT}</strong> or{' '}
          <button onClick={reset} className="underline cursor-pointer hover:text-red-700">reset</button>.
        </p>
      )}
    </div>
  )
}

export function OTPShowcase() {
  const [sent, setSent] = useState(false)

  return (
    <div className="grid grid-cols-2 gap-8">
      <div>
        <p className="section-label">6-Digit OTP</p>
        <div className="clay-card p-6 space-y-5">
          <div>
            <h4 className="font-heading font-bold text-slate-800">Verify your identity</h4>
            <p className="text-sm text-slate-400 mt-1">Enter the 6-digit code sent to <strong className="text-slate-600">m***@email.com</strong>. Try <code className="bg-slate-100 px-1.5 py-0.5 rounded text-slate-700 text-xs">{CORRECT}</code>.</p>
          </div>
          <OTPField length={6} />
          <div className="flex items-center gap-2 pt-1">
            <span className="text-xs text-slate-400">Didn't receive a code?</span>
            <button onClick={() => setSent(true)} className="text-xs font-semibold text-sky-500 hover:text-sky-700 cursor-pointer flex items-center gap-1 transition-colors">
              <RefreshCw className={`w-3 h-3 ${sent ? 'animate-spin' : ''}`} />
              Resend
            </button>
          </div>
        </div>
      </div>

      <div>
        <p className="section-label">4-Digit PIN</p>
        <div className="clay-card p-6 space-y-5">
          <div>
            <h4 className="font-heading font-bold text-slate-800">Enter your PIN</h4>
            <p className="text-sm text-slate-400 mt-1">4-digit access code. Supports paste and keyboard navigation.</p>
          </div>
          <OTPField length={4} />
        </div>
      </div>
    </div>
  )
}
