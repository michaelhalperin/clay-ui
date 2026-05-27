import { useState } from 'react'
import { CheckCircle2, XCircle, AlertTriangle, Info, X, Zap, ArrowRight } from 'lucide-react'

export type AlertType = 'success' | 'error' | 'warning' | 'info'

const config: Record<AlertType, { icon: React.ReactNode; bg: string; border: string; title: string; text: string; btn: string }> = {
  success: { icon: <CheckCircle2 className="w-4 h-4" />, bg: 'bg-emerald-50', border: 'border-emerald-200', title: 'text-emerald-800', text: 'text-emerald-600', btn: 'text-emerald-700 hover:text-emerald-900' },
  error:   { icon: <XCircle      className="w-4 h-4" />, bg: 'bg-red-50',     border: 'border-red-200',     title: 'text-red-800',     text: 'text-red-600',     btn: 'text-red-700 hover:text-red-900' },
  warning: { icon: <AlertTriangle className="w-4 h-4"/>, bg: 'bg-amber-50',   border: 'border-amber-200',   title: 'text-amber-800',   text: 'text-amber-600',   btn: 'text-amber-700 hover:text-amber-900' },
  info:    { icon: <Info          className="w-4 h-4" />, bg: 'bg-sky-50',    border: 'border-sky-200',     title: 'text-sky-800',     text: 'text-sky-600',     btn: 'text-sky-700 hover:text-sky-900' },
}

export interface AlertProps {
  type: AlertType
  title: string
  description?: string
  dismissible?: boolean
  action?: { label: string; onClick: () => void }
}

export function Alert({ type, title, description, dismissible, action }: AlertProps) {
  const [visible, setVisible] = useState(true)
  const c = config[type]
  if (!visible) return null

  return (
    <div className={`flex items-start gap-3 p-4 rounded-clay border ${c.bg} ${c.border}`} style={{ animation: 'fadeIn 0.2s ease' }}>
      <span className={`shrink-0 mt-0.5 ${c.title}`}>{c.icon}</span>
      <div className="flex-1 min-w-0">
        <p className={`text-sm font-semibold ${c.title}`}>{title}</p>
        {description && <p className={`text-xs mt-0.5 leading-relaxed ${c.text}`}>{description}</p>}
        {action && (
          <button onClick={action.onClick}
            className={`flex items-center gap-1 mt-2 text-xs font-semibold cursor-pointer transition-colors ${c.btn}`}>
            {action.label} <ArrowRight className="w-3 h-3" />
          </button>
        )}
      </div>
      {dismissible && (
        <button onClick={() => setVisible(false)} className={`shrink-0 cursor-pointer transition-colors ${c.btn}`}>
          <X className="w-4 h-4" />
        </button>
      )}
    </div>
  )
}

export function InlineBanner({ type, message }: { type: AlertType; message: string }) {
  const [visible, setVisible] = useState(true)
  const c = config[type]
  if (!visible) return null
  return (
    <div className={`flex items-center gap-3 px-4 py-2.5 rounded-clay border ${c.bg} ${c.border}`}>
      <span className={c.title}>{c.icon}</span>
      <span className={`text-sm font-medium flex-1 ${c.title}`}>{message}</span>
      <button onClick={() => setVisible(false)} className={`cursor-pointer ${c.btn}`}><X className="w-3.5 h-3.5" /></button>
    </div>
  )
}

export function TopBanner() {
  const [visible, setVisible] = useState(true)
  if (!visible) return null
  return (
    <div className="flex items-center justify-between gap-3 bg-sky-500 text-white px-5 py-3 rounded-clay shadow-clay">
      <div className="flex items-center gap-2">
        <Zap className="w-4 h-4 shrink-0" />
        <span className="text-sm font-medium">Clay UI v2.0 is out — new components and performance improvements.</span>
      </div>
      <div className="flex items-center gap-3 shrink-0">
        <button className="text-xs font-bold bg-white/20 hover:bg-white/30 px-3 py-1 rounded-lg cursor-pointer transition-colors">Learn more</button>
        <button onClick={() => setVisible(false)} className="cursor-pointer text-white/70 hover:text-white transition-colors"><X className="w-4 h-4" /></button>
      </div>
    </div>
  )
}

export function AlertShowcase() {
  return (
    <div className="grid grid-cols-2 gap-8">
      <div className="space-y-3">
        <p className="section-label">Alert Variants</p>
        <Alert type="success" title="Deployment successful" description="aurora-prod is now live. 3 instances running." dismissible action={{ label: 'View deployment', onClick: () => {} }} />
        <Alert type="error"   title="Payment failed" description="Your card ending in 4242 was declined. Please update your payment method." dismissible />
        <Alert type="warning" title="Storage at 92%" description="You're running low on storage. Consider upgrading your plan." action={{ label: 'Upgrade now', onClick: () => {} }} />
        <Alert type="info"    title="Scheduled maintenance" description="The service will be unavailable on June 1st from 02:00–04:00 UTC." dismissible />
      </div>
      <div className="space-y-4">
        <div className="space-y-3">
          <p className="section-label">Inline Banners</p>
          <InlineBanner type="success" message="Your changes have been saved." />
          <InlineBanner type="warning" message="This action cannot be undone." />
          <InlineBanner type="error"   message="Failed to connect to the server." />
          <InlineBanner type="info"    message="New features are available in settings." />
        </div>
        <div className="space-y-3">
          <p className="section-label">Top Banner</p>
          <TopBanner />
        </div>
      </div>
    </div>
  )
}
