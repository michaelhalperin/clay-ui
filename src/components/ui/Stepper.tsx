import { useState } from 'react'
import { Check, User, CreditCard, Package, Rocket, ChevronRight } from 'lucide-react'

/* ── Generic Stepper ── */
export interface Step {
  id: number
  label: string
  description?: string
  icon?: React.ReactNode
}

export function HorizontalStepper({ steps, active, onStep }: { steps: Step[]; active: number; onStep: (i: number) => void }) {
  return (
    <div className="flex items-start w-full">
      {steps.map((step, i) => {
        const done = active > i
        const current = active === i
        return (
          <div key={step.id} className="flex-1 flex flex-col items-center relative">
            {/* Connector line */}
            {i < steps.length - 1 && (
              <div className={`absolute top-4 left-1/2 w-full h-0.5 transition-colors duration-500
                ${done ? 'bg-sky-400' : 'bg-slate-200'}`} />
            )}
            {/* Circle */}
            <button
              onClick={() => onStep(i)}
              className={`relative z-10 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-300 cursor-pointer border-2
                ${done    ? 'bg-sky-500 border-sky-500 text-white shadow-clay'
                : current ? 'bg-white border-sky-400 text-sky-600 shadow-clay'
                :           'bg-white border-slate-200 text-slate-400'}`}>
              {done ? <Check className="w-4 h-4" /> : <span>{i + 1}</span>}
            </button>
            <p className={`mt-2 text-[11px] font-semibold text-center transition-colors ${current ? 'text-sky-600' : done ? 'text-slate-600' : 'text-slate-400'}`}>
              {step.label}
            </p>
            {step.description && (
              <p className="text-[10px] text-slate-400 text-center mt-0.5 hidden sm:block">{step.description}</p>
            )}
          </div>
        )
      })}
    </div>
  )
}

export function VerticalStepper({ steps, active, onStep }: { steps: Step[]; active: number; onStep: (i: number) => void }) {
  return (
    <div className="space-y-0">
      {steps.map((step, i) => {
        const done = active > i
        const current = active === i
        return (
          <div key={step.id} className="flex gap-4">
            <div className="flex flex-col items-center">
              <button
                onClick={() => onStep(i)}
                className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-300 cursor-pointer shrink-0 border-2
                  ${done    ? 'bg-sky-500 border-sky-500 text-white shadow-clay'
                  : current ? 'bg-white border-sky-400 text-sky-600 shadow-clay ring-4 ring-sky-100'
                  :           'bg-white border-slate-200 text-slate-400'}`}>
                {done ? <Check className="w-4 h-4" /> : step.icon ?? <span>{i + 1}</span>}
              </button>
              {i < steps.length - 1 && (
                <div className={`w-0.5 h-10 my-1 transition-colors duration-500 ${done ? 'bg-sky-300' : 'bg-slate-200'}`} />
              )}
            </div>
            <div className="pb-8 pt-1.5">
              <p className={`text-sm font-semibold transition-colors ${current ? 'text-slate-800' : done ? 'text-slate-600' : 'text-slate-400'}`}>
                {step.label}
              </p>
              {step.description && (
                <p className="text-xs text-slate-400 mt-0.5">{step.description}</p>
              )}
            </div>
          </div>
        )
      })}
    </div>
  )
}

/* ── Onboarding Wizard ── */
const WIZARD_STEPS = [
  { id: 1, label: 'Account',  icon: <User className="w-4 h-4" /> },
  { id: 2, label: 'Plan',     icon: <Package className="w-4 h-4" /> },
  { id: 3, label: 'Payment',  icon: <CreditCard className="w-4 h-4" /> },
  { id: 4, label: 'Launch',   icon: <Rocket className="w-4 h-4" /> },
]

const WIZARD_CONTENT = [
  {
    title: 'Create your account',
    fields: (
      <div className="space-y-3">
        <div>
          <label className="block text-xs font-semibold text-slate-600 mb-1">Full name</label>
          <input className="w-full border-2 border-slate-200 rounded-xl px-3 py-2 text-sm focus:border-sky-400 focus:outline-none transition-colors" placeholder="Sophie Leblanc" />
        </div>
        <div>
          <label className="block text-xs font-semibold text-slate-600 mb-1">Work email</label>
          <input type="email" className="w-full border-2 border-slate-200 rounded-xl px-3 py-2 text-sm focus:border-sky-400 focus:outline-none transition-colors" placeholder="sophie@company.com" />
        </div>
      </div>
    ),
  },
  {
    title: 'Choose your plan',
    fields: (
      <div className="grid grid-cols-3 gap-2">
        {[
          { name: 'Starter', price: 'Free', color: 'border-slate-200' },
          { name: 'Pro', price: '$29/mo', color: 'border-sky-400 bg-sky-50 ring-2 ring-sky-100' },
          { name: 'Team', price: '$79/mo', color: 'border-slate-200' },
        ].map(p => (
          <div key={p.name} className={`border-2 rounded-xl p-3 cursor-pointer text-center ${p.color}`}>
            <p className="text-xs font-bold text-slate-700">{p.name}</p>
            <p className="text-sm font-heading font-bold text-sky-600 mt-1">{p.price}</p>
          </div>
        ))}
      </div>
    ),
  },
  {
    title: 'Payment details',
    fields: (
      <div className="space-y-3">
        <div>
          <label className="block text-xs font-semibold text-slate-600 mb-1">Card number</label>
          <input className="w-full border-2 border-slate-200 rounded-xl px-3 py-2 text-sm focus:border-sky-400 focus:outline-none transition-colors font-mono" placeholder="4242 4242 4242 4242" />
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1">Expiry</label>
            <input className="w-full border-2 border-slate-200 rounded-xl px-3 py-2 text-sm focus:border-sky-400 focus:outline-none transition-colors font-mono" placeholder="MM / YY" />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1">CVC</label>
            <input className="w-full border-2 border-slate-200 rounded-xl px-3 py-2 text-sm focus:border-sky-400 focus:outline-none transition-colors font-mono" placeholder="123" />
          </div>
        </div>
      </div>
    ),
  },
  {
    title: 'You\'re all set!',
    fields: (
      <div className="flex flex-col items-center py-4 gap-3">
        <div className="w-16 h-16 rounded-2xl bg-emerald-100 flex items-center justify-center shadow-soft">
          <Check className="w-8 h-8 text-emerald-500" />
        </div>
        <p className="text-sm text-slate-500 text-center">Your account is ready. Click Launch to get started.</p>
      </div>
    ),
  },
]

function OnboardingWizard() {
  const [step, setStep] = useState(0)
  const isLast = step === WIZARD_STEPS.length - 1

  return (
    <div className="clay-card p-6">
      <HorizontalStepper steps={WIZARD_STEPS} active={step} onStep={i => i <= step && setStep(i)} />
      <div className="mt-8" style={{ animation: 'fadeIn 0.2s ease' }} key={step}>
        <h3 className="font-heading font-bold text-slate-800 text-base mb-4">{WIZARD_CONTENT[step].title}</h3>
        {WIZARD_CONTENT[step].fields}
      </div>
      <div className="flex items-center justify-between mt-6 pt-4 border-t border-slate-100">
        <button
          onClick={() => setStep(s => Math.max(0, s - 1))}
          disabled={step === 0}
          className="text-sm font-semibold text-slate-400 hover:text-slate-600 disabled:opacity-30 cursor-pointer transition-colors disabled:cursor-not-allowed">
          Back
        </button>
        <button
          onClick={() => setStep(s => Math.min(WIZARD_STEPS.length - 1, s + 1))}
          className={`flex items-center gap-2 text-sm font-semibold px-5 py-2 rounded-xl shadow-clay cursor-pointer transition-all
            ${isLast ? 'bg-emerald-500 hover:bg-emerald-600 text-white' : 'bg-sky-500 hover:bg-sky-600 text-white'}`}>
          {isLast ? 'Launch' : 'Continue'}
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  )
}

const V_STEPS: Step[] = [
  { id: 1, label: 'Project created',    description: 'Repository initialized', icon: <Check className="w-4 h-4" /> },
  { id: 2, label: 'CI/CD configured',   description: 'Pipeline set up with GitHub Actions' },
  { id: 3, label: 'Staging deployed',   description: 'Preview URL generated', icon: <Rocket className="w-4 h-4" /> },
  { id: 4, label: 'Review in progress', description: 'Awaiting team sign-off' },
  { id: 5, label: 'Production',         description: 'Not started yet' },
]

export function StepperShowcase() {
  const [hStep, setHStep] = useState(1)
  const [vStep, setVStep] = useState(2)

  const H_STEPS: Step[] = [
    { id: 1, label: 'Details',  description: 'Basic info' },
    { id: 2, label: 'Settings', description: 'Configure' },
    { id: 3, label: 'Review',   description: 'Check all' },
    { id: 4, label: 'Publish',  description: 'Go live' },
  ]

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-2 gap-8">
        <div>
          <p className="section-label">Horizontal Stepper</p>
          <HorizontalStepper steps={H_STEPS} active={hStep} onStep={setHStep} />
          <div className="flex gap-2 mt-6">
            <button onClick={() => setHStep(s => Math.max(0, s - 1))} className="text-xs font-semibold px-3 py-1.5 bg-white border border-slate-200 rounded-lg cursor-pointer hover:bg-slate-50 transition-colors text-slate-600">Back</button>
            <button onClick={() => setHStep(s => Math.min(H_STEPS.length - 1, s + 1))} className="text-xs font-semibold px-3 py-1.5 bg-sky-500 text-white rounded-lg cursor-pointer hover:bg-sky-600 transition-colors shadow-clay">Next</button>
          </div>
        </div>
        <div>
          <p className="section-label">Vertical Stepper</p>
          <VerticalStepper steps={V_STEPS} active={vStep} onStep={setVStep} />
        </div>
      </div>

      <div>
        <p className="section-label">Onboarding Wizard</p>
        <OnboardingWizard />
      </div>
    </div>
  )
}
