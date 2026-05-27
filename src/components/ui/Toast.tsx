import { createContext, useCallback, useContext, useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { X, CheckCircle2, AlertTriangle, Info, XCircle, Bell } from 'lucide-react'

export type ToastType = 'success' | 'error' | 'warning' | 'info'

export interface Toast {
  id: string
  type: ToastType
  title: string
  description?: string
  duration?: number
}

interface ToastContextValue {
  toast: (opts: Omit<Toast, 'id'>) => void
}

const ToastContext = createContext<ToastContextValue | null>(null)

const config: Record<ToastType, { icon: React.ReactNode; bar: string; bg: string; border: string; title: string }> = {
  success: { icon: <CheckCircle2 className="w-4 h-4" />, bar: 'bg-emerald-400', bg: 'bg-emerald-50',  border: 'border-emerald-100', title: 'text-emerald-700' },
  error:   { icon: <XCircle      className="w-4 h-4" />, bar: 'bg-red-400',     bg: 'bg-red-50',      border: 'border-red-100',     title: 'text-red-700' },
  warning: { icon: <AlertTriangle className="w-4 h-4"/>, bar: 'bg-amber-400',   bg: 'bg-amber-50',    border: 'border-amber-100',   title: 'text-amber-700' },
  info:    { icon: <Info          className="w-4 h-4" />, bar: 'bg-sky-400',    bg: 'bg-sky-50',      border: 'border-sky-100',     title: 'text-sky-700' },
}

function ToastItem({ toast, onDismiss }: { toast: Toast; onDismiss: (id: string) => void }) {
  const [visible, setVisible] = useState(false)
  const [progress, setProgress] = useState(100)
  const dur = toast.duration ?? 4000
  const startRef = useRef<number | null>(null)
  const rafRef = useRef<number | null>(null)
  const c = config[toast.type]

  useEffect(() => {
    requestAnimationFrame(() => setVisible(true))
    startRef.current = performance.now()

    const tick = (now: number) => {
      const elapsed = now - (startRef.current ?? now)
      const pct = Math.max(0, 100 - (elapsed / dur) * 100)
      setProgress(pct)
      if (pct > 0) rafRef.current = requestAnimationFrame(tick)
      else dismiss()
    }
    rafRef.current = requestAnimationFrame(tick)
    return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current) }
  }, [])

  const dismiss = useCallback(() => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current)
    setVisible(false)
    setTimeout(() => onDismiss(toast.id), 300)
  }, [toast.id, onDismiss])

  return (
    <div
      className={`relative flex items-start gap-3 w-80 bg-white rounded-clay border shadow-clay-lg overflow-hidden transition-all duration-300 ${c.border} ${visible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4'}`}
    >
      {/* Progress bar */}
      <div className={`absolute bottom-0 left-0 h-0.5 ${c.bar} transition-all`} style={{ width: `${progress}%` }} />

      {/* Icon */}
      <div className={`mt-3 ml-3 shrink-0 w-8 h-8 rounded-xl flex items-center justify-center ${c.bg} ${c.title}`}>
        {c.icon}
      </div>

      {/* Content */}
      <div className="flex-1 py-3 pr-8 min-w-0">
        <p className={`text-sm font-bold ${c.title}`}>{toast.title}</p>
        {toast.description && <p className="text-xs text-slate-500 mt-0.5 leading-snug">{toast.description}</p>}
      </div>

      {/* Dismiss */}
      <button onClick={dismiss} className="absolute top-3 right-3 w-6 h-6 flex items-center justify-center rounded-lg text-slate-300 hover:text-slate-500 hover:bg-slate-100 cursor-pointer transition-colors">
        <X className="w-3.5 h-3.5" />
      </button>
    </div>
  )
}

function ToastContainer({ toasts, dismiss }: { toasts: Toast[]; dismiss: (id: string) => void }) {
  return createPortal(
    <div className="fixed top-4 right-4 z-[100] flex flex-col gap-2" role="status" aria-live="polite">
      {toasts.map(t => <ToastItem key={t.id} toast={t} onDismiss={dismiss} />)}
    </div>,
    document.body
  )
}

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([])

  const toast = useCallback((opts: Omit<Toast, 'id'>) => {
    const id = Math.random().toString(36).slice(2)
    setToasts(ts => [...ts.slice(-4), { ...opts, id }])
  }, [])

  const dismiss = useCallback((id: string) => {
    setToasts(ts => ts.filter(t => t.id !== id))
  }, [])

  return (
    <ToastContext.Provider value={{ toast }}>
      {children}
      <ToastContainer toasts={toasts} dismiss={dismiss} />
    </ToastContext.Provider>
  )
}

export function useToast() {
  const ctx = useContext(ToastContext)
  if (!ctx) throw new Error('useToast must be used inside ToastProvider')
  return ctx
}

const examples: Array<Omit<Toast, 'id'>> = [
  { type: 'success', title: 'Changes saved',         description: 'Your profile has been updated successfully.' },
  { type: 'error',   title: 'Upload failed',          description: 'The file exceeds the 10 MB size limit.' },
  { type: 'warning', title: 'Storage almost full',    description: 'You have used 92% of your 50 GB storage.' },
  { type: 'info',    title: 'New version available',  description: 'Clay UI v2.0 is out. See what changed.' },
]

export function ToastShowcase() {
  const { toast } = useToast()

  const colors: Record<ToastType, string> = {
    success: 'bg-emerald-400 hover:bg-emerald-500',
    error:   'bg-red-400 hover:bg-red-500',
    warning: 'bg-amber-400 hover:bg-amber-500',
    info:    'bg-sky-500 hover:bg-sky-600',
  }

  return (
    <div className="space-y-6 w-full">
      <p className="section-label">Toast / Notification System</p>
      <div className="clay-card p-6 space-y-5 w-full">
        <p className="text-sm text-slate-500">Click any button to fire a toast. Multiple toasts stack in the top-right corner with an animated progress bar and auto-dismiss.</p>
        <div className="flex flex-wrap gap-3">
          {examples.map(ex => (
            <button key={ex.type} onClick={() => toast(ex)}
              className={`${colors[ex.type]} text-white text-sm font-semibold px-4 py-2.5 rounded-clay shadow-clay cursor-pointer transition-all duration-200 hover:-translate-y-0.5 hover:shadow-clay-lg active:translate-y-0 capitalize`}>
              {ex.type} toast
            </button>
          ))}
          <button
            onClick={() => {
              toast({ type: 'success', title: 'Deployment started', description: 'Building production bundle…', duration: 8000 })
              setTimeout(() => toast({ type: 'info', title: 'Build complete', description: 'Deploy live in ~30 seconds.', duration: 6000 }), 2500)
              setTimeout(() => toast({ type: 'success', title: 'Deployed!', description: 'aurora-prod is now live.', duration: 5000 }), 5000)
            }}
            className="bg-violet-500 hover:bg-violet-600 text-white text-sm font-semibold px-4 py-2.5 rounded-clay shadow-clay cursor-pointer transition-all duration-200 hover:-translate-y-0.5 hover:shadow-clay-lg active:translate-y-0 flex items-center gap-2"
          >
            <Bell className="w-4 h-4" /> Deploy sequence
          </button>
        </div>
      </div>
    </div>
  )
}
