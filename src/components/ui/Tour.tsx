import { useState, useRef, useLayoutEffect } from 'react'
import { createPortal } from 'react-dom'
import { X, ChevronRight, ChevronLeft, Zap } from 'lucide-react'

interface Step {
  target: string
  title: string
  body: string
  placement: 'top' | 'bottom' | 'left' | 'right'
}

const STEPS: Step[] = [
  { target: 'tour-logo',   title: 'Welcome to Clay UI',      body: 'This is your design system hub. Every component lives here, organized by category.',                placement: 'bottom' },
  { target: 'tour-search', title: 'Quick search',             body: 'Press ⌘K to open the command palette and jump to any component instantly.',                         placement: 'bottom' },
  { target: 'tour-stats',  title: 'Live metrics',             body: 'Your key numbers update in real time. Click any card to drill down into the detailed chart view.',   placement: 'right'  },
  { target: 'tour-chart',  title: 'Interactive charts',       body: 'Hover to inspect data points. Click the legend to toggle series on and off.',                        placement: 'top'    },
  { target: 'tour-action', title: 'You\'re all set!',         body: 'Explore the sidebar to discover all 50+ components. Happy building!',                                placement: 'top'    },
]

function TourTooltip({ step, index, total, onPrev, onNext, onSkip, targetRect }: {
  step: Step; index: number; total: number
  onPrev: () => void; onNext: () => void; onSkip: () => void
  targetRect: DOMRect | null
}) {
  const tooltipRef = useRef<HTMLDivElement>(null)
  const [pos, setPos] = useState({ top: 0, left: 0 })
  const [ready, setReady] = useState(false)
  const ARROW = 10
  const GAP   = 12

  useLayoutEffect(() => {
    if (!targetRect || !tooltipRef.current) return
    const tr = tooltipRef.current.getBoundingClientRect()
    const VW = window.innerWidth, VH = window.innerHeight
    let top = 0, left = 0

    if (step.placement === 'bottom') {
      top  = targetRect.bottom + GAP
      left = targetRect.left + targetRect.width / 2 - tr.width / 2
    } else if (step.placement === 'top') {
      top  = targetRect.top - tr.height - GAP
      left = targetRect.left + targetRect.width / 2 - tr.width / 2
    } else if (step.placement === 'right') {
      top  = targetRect.top + targetRect.height / 2 - tr.height / 2
      left = targetRect.right + GAP
    } else {
      top  = targetRect.top + targetRect.height / 2 - tr.height / 2
      left = targetRect.left - tr.width - GAP
    }

    top  = Math.max(8, Math.min(top,  VH - tr.height - 8))
    left = Math.max(8, Math.min(left, VW - tr.width  - 8))
    setPos({ top, left })
    setReady(true)
  }, [step, targetRect])

  return createPortal(
    <div ref={tooltipRef}
      className="fixed z-[500] w-72 clay-card p-4 shadow-clay-lg"
      style={{ top: pos.top, left: pos.left, opacity: ready ? 1 : 0, animation: ready ? 'slideDown 0.15s ease' : 'none' }}>
      {/* Progress dots */}
      <div className="flex items-center gap-1 mb-3">
        {Array.from({ length: total }).map((_, i) => (
          <div key={i} className={`h-1 rounded-full transition-all ${i === index ? 'bg-sky-500 w-5' : 'bg-slate-200 w-1.5'}`} />
        ))}
        <button onClick={onSkip} className="ml-auto text-slate-300 hover:text-slate-500 cursor-pointer transition-colors">
          <X className="w-3.5 h-3.5" />
        </button>
      </div>

      <p className="font-heading font-bold text-slate-800 mb-1">{step.title}</p>
      <p className="text-sm text-slate-500 leading-relaxed mb-4">{step.body}</p>

      <div className="flex items-center justify-between">
        <span className="text-xs text-slate-400">{index + 1} of {total}</span>
        <div className="flex gap-2">
          {index > 0 && (
            <button onClick={onPrev}
              className="flex items-center gap-1 text-xs font-semibold text-slate-500 hover:text-slate-700 px-2.5 py-1.5 rounded-xl hover:bg-slate-100 cursor-pointer transition-all">
              <ChevronLeft className="w-3.5 h-3.5" />Back
            </button>
          )}
          <button onClick={onNext}
            className="flex items-center gap-1 text-xs font-semibold bg-sky-500 hover:bg-sky-600 text-white px-3 py-1.5 rounded-xl shadow-clay cursor-pointer transition-colors">
            {index === total - 1 ? 'Finish' : 'Next'}<ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>,
    document.body
  )
}

function TourOverlay({ targetRect, onClose }: { targetRect: DOMRect | null; onClose: () => void }) {
  if (!targetRect) return createPortal(
    <div className="fixed inset-0 z-[400] bg-slate-900/50 backdrop-blur-[1px]" onClick={onClose} />,
    document.body
  )

  const PAD = 6
  const { top, left, width, height } = targetRect

  return createPortal(
    <svg className="fixed inset-0 z-[400] pointer-events-none" style={{ width: '100vw', height: '100vh' }}>
      <defs>
        <mask id="tour-mask">
          <rect width="100%" height="100%" fill="white" />
          <rect x={left - PAD} y={top - PAD} width={width + PAD * 2} height={height + PAD * 2} rx={12} fill="black" />
        </mask>
      </defs>
      <rect width="100%" height="100%" fill="rgba(15,23,42,0.55)" mask="url(#tour-mask)" />
      <rect x={left - PAD} y={top - PAD} width={width + PAD * 2} height={height + PAD * 2} rx={12}
        fill="none" stroke="#0ea5e9" strokeWidth={2} strokeDasharray="6 3" />
    </svg>,
    document.body
  )
}

export function TourShowcase() {
  const [active, setActive]   = useState(false)
  const [stepIdx, setStepIdx] = useState(0)
  const [rects, setRects]     = useState<Record<string, DOMRect>>({})
  const containerRef = useRef<HTMLDivElement>(null)

  const startTour = () => {
    // Measure all target elements
    const measured: Record<string, DOMRect> = {}
    STEPS.forEach(s => {
      const el = containerRef.current?.querySelector(`[data-tour="${s.target}"]`)
      if (el) measured[s.target] = el.getBoundingClientRect()
    })
    setRects(measured)
    setStepIdx(0)
    setActive(true)
  }

  const currentStep = STEPS[stepIdx]
  const currentRect = active ? (rects[currentStep?.target] ?? null) : null

  const next = () => {
    if (stepIdx < STEPS.length - 1) setStepIdx(i => i + 1)
    else setActive(false)
  }
  const prev = () => setStepIdx(i => Math.max(0, i - 1))
  const skip = () => setActive(false)

  return (
    <div className="space-y-4">
      {/* Mock UI that the tour highlights */}
      <div ref={containerRef} className="clay-card p-5 space-y-4">
        {/* Fake navbar */}
        <div className="flex items-center gap-3 pb-3 border-b border-slate-100">
          <div data-tour="tour-logo" className="flex items-center gap-2">
            <div className="w-7 h-7 bg-sky-500 rounded-xl flex items-center justify-center shadow-clay">
              <span className="text-white text-[11px] font-bold">C</span>
            </div>
            <span className="font-heading font-bold text-slate-800">Clay UI</span>
          </div>
          <div data-tour="tour-search"
            className="flex items-center gap-2 bg-slate-100 rounded-xl px-3 py-1.5 text-sm text-slate-400 cursor-pointer hover:bg-slate-200 transition-colors">
            <span>Search…</span>
            <kbd className="text-[10px] bg-white border border-slate-200 rounded px-1 font-mono">⌘K</kbd>
          </div>
          <div className="ml-auto flex gap-2">
            <div className="w-8 h-8 bg-slate-100 rounded-xl" />
            <div className="w-8 h-8 bg-sky-500 rounded-xl shadow-clay" />
          </div>
        </div>

        {/* Fake stat cards */}
        <div data-tour="tour-stats" className="grid grid-cols-3 gap-3">
          {[['Revenue','$84.2K','↑12%','#0ea5e9'],['Users','2,410','↑8%','#8b5cf6'],['Uptime','99.9%','→','#10b981']].map(([l,v,d,c]) => (
            <div key={l} className="bg-slate-50 rounded-xl p-3">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{l}</p>
              <p className="font-heading font-bold text-lg text-slate-800 mt-0.5">{v}</p>
              <p className="text-xs font-semibold mt-0.5" style={{ color: c }}>{d}</p>
            </div>
          ))}
        </div>

        {/* Fake chart */}
        <div data-tour="tour-chart" className="bg-slate-50 rounded-xl p-4 h-28 flex items-end gap-1">
          {[40,55,35,65,80,60,75,90,70,85,95,88].map((h, i) => (
            <div key={i} className="flex-1 rounded-t-sm transition-all" style={{ height: `${h}%`, background: '#0ea5e9', opacity: 0.5 + (i / 24) }} />
          ))}
        </div>

        {/* CTA */}
        <div data-tour="tour-action" className="flex items-center justify-between">
          <p className="text-sm text-slate-500">Ready to explore?</p>
          <button
            onClick={startTour}
            className="flex items-center gap-2 bg-sky-500 hover:bg-sky-600 text-white text-sm font-semibold px-4 py-2 rounded-xl shadow-clay cursor-pointer transition-colors">
            <Zap className="w-4 h-4" />
            {active ? 'Restart tour' : 'Start tour'}
          </button>
        </div>
      </div>

      {/* Step list preview */}
      <div className="grid grid-cols-5 gap-2">
        {STEPS.map((s, i) => (
          <div key={i} className={`p-2.5 rounded-xl border text-center transition-all
            ${active && stepIdx === i ? 'border-sky-400 bg-sky-50' : 'border-slate-100 bg-white'}`}>
            <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold mx-auto mb-1
              ${active && stepIdx === i ? 'bg-sky-500 text-white' : active && stepIdx > i ? 'bg-emerald-500 text-white' : 'bg-slate-100 text-slate-400'}`}>
              {i + 1}
            </div>
            <p className="text-[10px] font-semibold text-slate-500 leading-tight">{s.title.split(' ').slice(0, 2).join(' ')}</p>
          </div>
        ))}
      </div>

      {/* Tour overlay + tooltip */}
      {active && currentStep && (
        <>
          <TourOverlay targetRect={currentRect} onClose={skip} />
          <TourTooltip
            step={currentStep} index={stepIdx} total={STEPS.length}
            targetRect={currentRect} onPrev={prev} onNext={next} onSkip={skip}
          />
        </>
      )}
    </div>
  )
}
