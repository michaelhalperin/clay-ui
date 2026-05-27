import { useState } from 'react'
import { ChevronDown, Shield, Zap, CreditCard, LifeBuoy, Settings, Bell } from 'lucide-react'

export interface AccordionItem {
  id: string
  title: string
  content: string
  icon?: React.ReactNode
  badge?: string
}

const faqItems: AccordionItem[] = [
  { id: 'a1', title: 'How does the free plan work?', icon: <Zap className="w-4 h-4" />,
    content: 'The free plan gives you access to 3 projects, 5 GB of storage, and basic analytics. No credit card required. You can upgrade at any time to unlock unlimited projects and advanced features.' },
  { id: 'a2', title: 'Can I change my plan later?', icon: <CreditCard className="w-4 h-4" />,
    content: "Absolutely. You can upgrade, downgrade, or cancel your plan at any time from your account settings. Changes take effect at the start of your next billing cycle." },
  { id: 'a3', title: 'Is my data secure?', icon: <Shield className="w-4 h-4" />,
    content: 'We take security seriously. All data is encrypted in transit and at rest using AES-256. We are SOC 2 Type II certified and GDPR compliant. Your data is never sold or shared.' },
  { id: 'a4', title: 'How do I get support?', icon: <LifeBuoy className="w-4 h-4" />, badge: 'Help',
    content: 'Pro and Enterprise customers get priority email and chat support. Free plan users can access our extensive documentation and community forum. Average response time is under 4 hours.' },
]

const settingsItems: AccordionItem[] = [
  { id: 's1', title: 'General', icon: <Settings className="w-4 h-4" />,
    content: 'Configure your workspace name, timezone, language preference, and default project settings.' },
  { id: 's2', title: 'Notifications', icon: <Bell className="w-4 h-4" />,
    content: 'Control which events trigger emails or push notifications: new comments, mentions, deployments, and billing alerts.' },
  { id: 's3', title: 'Security', icon: <Shield className="w-4 h-4" />,
    content: 'Manage two-factor authentication, active sessions, API keys, and OAuth app permissions.' },
]

export function AccordionGroup({ items, single = false, variant = 'default' }: {
  items: AccordionItem[]
  single?: boolean
  variant?: 'default' | 'flush'
}) {
  const [open, setOpen] = useState<Set<string>>(new Set([items[0].id]))

  const toggle = (id: string) => {
    if (single) {
      setOpen(s => s.has(id) ? new Set() : new Set([id]))
    } else {
      setOpen(s => { const n = new Set(s); n.has(id) ? n.delete(id) : n.add(id); return n })
    }
  }

  return (
    <div className={variant === 'flush' ? 'divide-y divide-slate-100' : 'space-y-2'}>
      {items.map(item => {
        const isOpen = open.has(item.id)
        return (
          <div key={item.id}
            className={variant === 'default' ? `clay-card overflow-hidden` : ''}>
            <button
              onClick={() => toggle(item.id)}
              className={`w-full flex items-center gap-3 text-left cursor-pointer transition-colors duration-150
                ${variant === 'default'
                  ? `px-5 py-4 ${isOpen ? 'bg-slate-50/60' : 'hover:bg-slate-50/40'}`
                  : `px-1 py-4 hover:text-slate-900`}`}
            >
              {item.icon && (
                <span className={`shrink-0 transition-colors ${isOpen ? 'text-sky-500' : 'text-slate-400'}`}>
                  {item.icon}
                </span>
              )}
              <span className={`flex-1 text-sm font-semibold ${isOpen ? 'text-slate-800' : 'text-slate-600'}`}>
                {item.title}
              </span>
              {item.badge && (
                <span className="text-[10px] font-bold bg-sky-100 text-sky-600 px-2 py-0.5 rounded-full shrink-0">{item.badge}</span>
              )}
              <ChevronDown className={`w-4 h-4 text-slate-400 shrink-0 transition-transform duration-250 ${isOpen ? 'rotate-180' : ''}`} />
            </button>

            <div className={`overflow-hidden transition-all duration-300 ${isOpen ? 'max-h-48' : 'max-h-0'}`}>
              <p className={`text-sm text-slate-500 leading-relaxed
                ${variant === 'default' ? 'px-5 pb-4' : 'px-1 pb-4'}
                ${item.icon ? 'pl-12' : ''}`}>
                {item.content}
              </p>
            </div>
          </div>
        )
      })}
    </div>
  )
}

export function AccordionShowcase() {
  return (
    <div className="grid grid-cols-2 gap-8">
      <div>
        <p className="section-label">FAQ — Single open</p>
        <AccordionGroup items={faqItems} single />
      </div>
      <div>
        <p className="section-label">Settings — Flush, multi-open</p>
        <AccordionGroup items={settingsItems} variant="flush" />
      </div>
    </div>
  )
}
