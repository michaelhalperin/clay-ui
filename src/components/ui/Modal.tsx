import { useEffect, useRef, useState } from 'react'
import { X, AlertTriangle, CheckCircle2, Info, Trash2 } from 'lucide-react'
import { createPortal } from 'react-dom'

export interface ModalProps {
  open: boolean
  onClose: () => void
  size?: 'sm' | 'md' | 'lg' | 'xl'
  title?: string
  description?: string
  children?: React.ReactNode
  footer?: React.ReactNode
}

const sizes = { sm: 'max-w-sm', md: 'max-w-md', lg: 'max-w-lg', xl: 'max-w-2xl' }

export function Modal({ open, onClose, size = 'md', title, description, children, footer }: ModalProps) {
  const overlayRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!open) return
    const handler = (e: KeyboardEvent) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [open, onClose])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  if (!open) return null

  return createPortal(
    <div
      ref={overlayRef}
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ animation: 'fadeIn 0.15s ease' }}
    >
      <div className="absolute inset-0 bg-slate-900/30 backdrop-blur-sm" onClick={onClose} />
      <div
        className={`relative w-full ${sizes[size]} bg-white rounded-clay-lg shadow-clay-lg border border-slate-100 flex flex-col max-h-[90vh]`}
        style={{ animation: 'slideUp 0.2s cubic-bezier(0.34,1.56,0.64,1)' }}
      >
        {(title || description) && (
          <div className="px-6 pt-6 pb-4 border-b border-slate-100 shrink-0">
            {title && <h3 className="font-heading font-bold text-slate-800 text-lg">{title}</h3>}
            {description && <p className="text-sm text-slate-400 mt-1">{description}</p>}
          </div>
        )}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-xl text-slate-400 hover:bg-slate-100 hover:text-slate-600 cursor-pointer transition-colors"
          aria-label="Close modal"
        >
          <X className="w-4 h-4" />
        </button>
        {children && <div className="px-6 py-5 overflow-y-auto flex-1">{children}</div>}
        {footer && <div className="px-6 py-4 border-t border-slate-100 shrink-0 flex items-center justify-end gap-2">{footer}</div>}
      </div>
    </div>,
    document.body
  )
}

const btn = (variant: 'primary' | 'secondary' | 'danger') => {
  const map = {
    primary:   'bg-sky-500 text-white shadow-clay hover:bg-sky-600',
    secondary: 'bg-white text-slate-600 border border-slate-200 hover:border-slate-300 hover:bg-slate-50',
    danger:    'bg-red-500 text-white shadow-clay hover:bg-red-600',
  }
  return `px-4 py-2.5 text-sm font-semibold rounded-clay cursor-pointer transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 focus:outline-none focus:ring-2 focus:ring-offset-1 ${map[variant]}`
}

export function ModalShowcase() {
  const [which, setWhich] = useState<null | 'basic' | 'confirm' | 'form' | 'lg'>(null)
  const [form, setForm] = useState({ name: '', email: '', msg: '' })

  return (
    <div className="space-y-6">
      <p className="section-label">Modal Variants</p>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {([
          { id: 'basic',   label: 'Basic Modal',    color: 'bg-sky-500' },
          { id: 'confirm', label: 'Confirm Dialog',  color: 'bg-red-400' },
          { id: 'form',    label: 'Form Modal',      color: 'bg-violet-500' },
          { id: 'lg',      label: 'Large Modal',     color: 'bg-emerald-500' },
        ] as const).map(({ id, label, color }) => (
          <button key={id} onClick={() => setWhich(id)}
            className={`${color} text-white font-semibold text-sm px-4 py-3 rounded-clay shadow-clay hover:-translate-y-0.5 hover:shadow-clay-lg active:translate-y-0 cursor-pointer transition-all duration-200`}>
            {label}
          </button>
        ))}
      </div>

      {/* Basic */}
      <Modal open={which === 'basic'} onClose={() => setWhich(null)} title="Welcome to Clay UI" description="Your component sandbox is ready to use." size="md"
        footer={<>
          <button className={btn('secondary')} onClick={() => setWhich(null)}>Cancel</button>
          <button className={btn('primary')}   onClick={() => setWhich(null)}>Got it</button>
        </>}>
        <div className="flex flex-col items-center gap-4 py-2 text-center">
          <div className="w-14 h-14 bg-sky-100 rounded-2xl flex items-center justify-center">
            <Info className="w-7 h-7 text-sky-500" />
          </div>
          <p className="text-sm text-slate-500 leading-relaxed max-w-xs">
            This is a basic modal with a title, description, body content, and a footer with action buttons.
            Press <kbd className="px-1.5 py-0.5 bg-slate-100 rounded text-xs font-mono">Esc</kbd> or click outside to close.
          </p>
        </div>
      </Modal>

      {/* Confirm / Destructive */}
      <Modal open={which === 'confirm'} onClose={() => setWhich(null)} size="sm"
        footer={<>
          <button className={btn('secondary')} onClick={() => setWhich(null)}>Cancel</button>
          <button className={btn('danger')}    onClick={() => setWhich(null)}>Delete</button>
        </>}>
        <div className="flex flex-col items-center gap-4 py-2 text-center">
          <div className="w-14 h-14 bg-red-50 rounded-2xl flex items-center justify-center">
            <AlertTriangle className="w-7 h-7 text-red-400" />
          </div>
          <div>
            <h3 className="font-heading font-bold text-slate-800">Delete project?</h3>
            <p className="text-sm text-slate-400 mt-1.5 leading-relaxed">This will permanently delete <strong className="text-slate-600">Aurora Pro</strong> and all its data. This action cannot be undone.</p>
          </div>
        </div>
      </Modal>

      {/* Form modal */}
      <Modal open={which === 'form'} onClose={() => setWhich(null)} title="Send a message" description="We'll get back to you within 24 hours." size="md"
        footer={<>
          <button className={btn('secondary')} onClick={() => setWhich(null)}>Cancel</button>
          <button className={btn('primary')}   onClick={() => setWhich(null)}>Send message</button>
        </>}>
        <div className="space-y-4">
          {[
            { label: 'Full name',       key: 'name',  type: 'text',  placeholder: 'Sophie Lambert' },
            { label: 'Email address',   key: 'email', type: 'email', placeholder: 'sophie@email.com' },
          ].map(f => (
            <div key={f.key} className="space-y-1.5">
              <label className="block text-sm font-semibold text-slate-700">{f.label}</label>
              <input type={f.type} placeholder={f.placeholder} value={form[f.key as 'name' | 'email']}
                onChange={e => setForm(p => ({ ...p, [f.key]: e.target.value }))}
                className="w-full rounded-clay border border-slate-200 bg-white px-4 py-2.5 text-sm placeholder-slate-300 shadow-soft focus:outline-none focus:ring-2 focus:ring-sky-300 transition-all" />
            </div>
          ))}
          <div className="space-y-1.5">
            <label className="block text-sm font-semibold text-slate-700">Message</label>
            <textarea rows={3} placeholder="How can we help?" value={form.msg}
              onChange={e => setForm(p => ({ ...p, msg: e.target.value }))}
              className="w-full rounded-clay border border-slate-200 bg-white px-4 py-2.5 text-sm placeholder-slate-300 shadow-soft focus:outline-none focus:ring-2 focus:ring-sky-300 transition-all resize-none" />
          </div>
        </div>
      </Modal>

      {/* Large / scrollable */}
      <Modal open={which === 'lg'} onClose={() => setWhich(null)} title="Terms of Service" description="Please read carefully before continuing." size="xl"
        footer={<>
          <button className={btn('secondary')} onClick={() => setWhich(null)}>Decline</button>
          <button className={btn('primary')}   onClick={() => setWhich(null)}>Accept & continue</button>
        </>}>
        <div className="space-y-4 text-sm text-slate-500 leading-relaxed">
          {Array.from({ length: 6 }, (_, i) => (
            <div key={i}>
              <h4 className="font-semibold text-slate-700 mb-1">{i + 1}. {['Acceptance of Terms', 'Use of Service', 'Privacy Policy', 'Intellectual Property', 'Limitation of Liability', 'Governing Law'][i]}</h4>
              <p>By accessing and using Clay UI, you accept and agree to be bound by the terms and provisions of this agreement. This section covers {['the general rules and conditions', 'how you may interact with our services', 'how we handle your data', 'ownership of all created assets', 'our liability scope and limitations', 'the jurisdiction for disputes'][i]}.</p>
            </div>
          ))}
          <div className="flex items-center gap-2 p-3 bg-emerald-50 border border-emerald-100 rounded-xl">
            <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
            <p className="text-xs text-emerald-600 font-medium">You have read and understood all terms.</p>
          </div>
        </div>
      </Modal>
    </div>
  )
}
