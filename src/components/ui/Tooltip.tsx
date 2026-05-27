import { useState, useRef, useEffect } from 'react'
import { createPortal } from 'react-dom'
import { Info, HelpCircle, Zap, Star } from 'lucide-react'

export type Placement = 'top' | 'bottom' | 'left' | 'right'

export interface TooltipProps {
  content: React.ReactNode
  placement?: Placement
  children: React.ReactElement
  delay?: number
}

export function Tooltip({ content, placement = 'top', children, delay = 120 }: TooltipProps) {
  const [visible, setVisible] = useState(false)
  const [pos, setPos] = useState({ top: 0, left: 0 })
  const triggerRef = useRef<HTMLDivElement>(null)
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const tooltipRef = useRef<HTMLDivElement>(null)

  const show = () => {
    timerRef.current = setTimeout(() => {
      if (!triggerRef.current) return
      const r = triggerRef.current.getBoundingClientRect()
      const gap = 10
      let top = 0, left = 0
      if (placement === 'top')    { top = r.top - gap;           left = r.left + r.width / 2 }
      if (placement === 'bottom') { top = r.bottom + gap;        left = r.left + r.width / 2 }
      if (placement === 'left')   { top = r.top + r.height / 2;  left = r.left - gap }
      if (placement === 'right')  { top = r.top + r.height / 2;  left = r.right + gap }
      setPos({ top, left })
      setVisible(true)
    }, delay)
  }
  const hide = () => {
    if (timerRef.current) clearTimeout(timerRef.current)
    setVisible(false)
  }

  useEffect(() => () => { if (timerRef.current) clearTimeout(timerRef.current) }, [])

  const transformMap: Record<Placement, string> = {
    top:    'translate(-50%, -100%)',
    bottom: 'translate(-50%, 0)',
    left:   'translate(-100%, -50%)',
    right:  'translate(0, -50%)',
  }
  const arrowMap: Record<Placement, string> = {
    top:    'bottom-[-4px] left-1/2 -translate-x-1/2 border-t-slate-800 border-l-transparent border-r-transparent border-b-transparent border-4',
    bottom: 'top-[-4px]  left-1/2 -translate-x-1/2 border-b-slate-800 border-l-transparent border-r-transparent border-t-transparent border-4',
    left:   'right-[-4px] top-1/2 -translate-y-1/2 border-l-slate-800 border-t-transparent border-b-transparent border-r-transparent border-4',
    right:  'left-[-4px] top-1/2 -translate-y-1/2  border-r-slate-800 border-t-transparent border-b-transparent border-l-transparent border-4',
  }

  return (
    <>
      <div ref={triggerRef} onMouseEnter={show} onMouseLeave={hide} onFocus={show} onBlur={hide} className="inline-flex">
        {children}
      </div>
      {visible && createPortal(
        <div ref={tooltipRef} role="tooltip"
          className="fixed z-[200] pointer-events-none"
          style={{ top: pos.top, left: pos.left, transform: transformMap[placement], animation: 'fadeIn 0.1s ease' }}>
          <div className="relative bg-slate-800 text-white text-xs font-medium px-3 py-1.5 rounded-xl shadow-clay-lg max-w-xs whitespace-nowrap">
            {content}
            <span className={`absolute ${arrowMap[placement]}`} />
          </div>
        </div>,
        document.body
      )}
    </>
  )
}

export function RichTooltip({ label, children }: { label: string; children: React.ReactElement }) {
  return (
    <Tooltip placement="top" content={
      <div className="text-left whitespace-normal w-52">
        <p className="font-bold mb-1">{label}</p>
        <p className="text-slate-300 text-[11px] leading-snug">This is a richer tooltip with multi-line content and formatted text. Use it for hints that need more explanation.</p>
      </div>
    }>
      {children}
    </Tooltip>
  )
}

export function TooltipShowcase() {
  return (
    <div className="grid grid-cols-2 gap-10">
      <div>
        <p className="section-label">Placements</p>
        <div className="flex flex-wrap gap-3 mt-2">
          {(['top','bottom','left','right'] as Placement[]).map(p => (
            <Tooltip key={p} placement={p} content={`Tooltip on ${p}`}>
              <button className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-sm font-medium rounded-xl cursor-pointer transition-colors capitalize">
                {p}
              </button>
            </Tooltip>
          ))}
        </div>
      </div>

      <div>
        <p className="section-label">With Icons &amp; Rich Content</p>
        <div className="flex flex-wrap gap-3 mt-2">
          <Tooltip content="Boost your workflow" placement="top">
            <button className="w-9 h-9 bg-sky-100 text-sky-600 rounded-xl flex items-center justify-center cursor-pointer hover:bg-sky-200 transition-colors">
              <Zap className="w-4 h-4" />
            </button>
          </Tooltip>
          <Tooltip content="Starred item" placement="top">
            <button className="w-9 h-9 bg-amber-100 text-amber-500 rounded-xl flex items-center justify-center cursor-pointer hover:bg-amber-200 transition-colors">
              <Star className="w-4 h-4" />
            </button>
          </Tooltip>
          <RichTooltip label="Pro feature">
            <button className="flex items-center gap-1.5 text-sm text-slate-500 hover:text-slate-700 cursor-pointer transition-colors">
              <HelpCircle className="w-4 h-4" /> How does this work?
            </button>
          </RichTooltip>
          <Tooltip content="More information about this field" placement="right">
            <span className="inline-flex items-center gap-1 text-sm text-slate-500 cursor-default">
              Field label <Info className="w-3.5 h-3.5 text-slate-400" />
            </span>
          </Tooltip>
        </div>
      </div>
    </div>
  )
}
