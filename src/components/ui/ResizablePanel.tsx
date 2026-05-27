import { useState, useRef, useCallback, useEffect } from 'react'
import { GripVertical, GripHorizontal, Code2, FileText, MessageSquare, Settings } from 'lucide-react'

export interface PanelProps {
  direction: 'horizontal' | 'vertical'
  initialSplit?: number
  minPct?: number
  maxPct?: number
  leftContent: React.ReactNode
  rightContent: React.ReactNode
  leftLabel?: string
  rightLabel?: string
}

export function ResizablePanel({
  direction = 'horizontal',
  initialSplit = 50,
  minPct = 20,
  maxPct = 80,
  leftContent,
  rightContent,
  leftLabel,
  rightLabel,
}: PanelProps) {
  const [split, setSplit] = useState(initialSplit)
  const [dragging, setDragging] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  const onPointerDown = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    e.currentTarget.setPointerCapture(e.pointerId)
    setDragging(true)

    const onMove = (ev: PointerEvent) => {
      const rect = containerRef.current?.getBoundingClientRect()
      if (!rect) return
      const pct = direction === 'horizontal'
        ? ((ev.clientX - rect.left) / rect.width) * 100
        : ((ev.clientY - rect.top) / rect.height) * 100
      setSplit(Math.max(minPct, Math.min(maxPct, pct)))
    }
    const onUp = () => {
      setDragging(false)
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('pointerup', onUp)
    }
    window.addEventListener('pointermove', onMove)
    window.addEventListener('pointerup', onUp)
  }, [direction, minPct, maxPct])

  const isH = direction === 'horizontal'

  return (
    <div ref={containerRef}
      className={`flex ${isH ? 'flex-row' : 'flex-col'} rounded-clay overflow-hidden border border-slate-200 bg-white h-56 relative`}
      style={{ cursor: dragging ? (isH ? 'col-resize' : 'row-resize') : undefined }}>
      {/* Panel A */}
      <div className="overflow-auto" style={{ [isH ? 'width' : 'height']: `${split}%`, flexShrink: 0 }}>
        {leftLabel && (
          <div className="px-3 py-2 border-b border-slate-100 bg-slate-50 flex items-center justify-between">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{leftLabel}</span>
            <span className="text-[10px] text-slate-300">{Math.round(split)}%</span>
          </div>
        )}
        <div className="p-3">{leftContent}</div>
      </div>

      {/* Divider */}
      <div onPointerDown={onPointerDown}
        className={`flex items-center justify-center shrink-0 select-none z-10
          ${isH ? 'w-1.5 cursor-col-resize' : 'h-1.5 cursor-row-resize'}
          ${dragging ? 'bg-sky-400' : 'bg-slate-200 hover:bg-sky-300'} transition-colors`}>
        <div className={`flex items-center justify-center rounded-full bg-white border border-slate-200 shadow-soft
          ${isH ? 'w-4 h-8' : 'w-8 h-4'} ${dragging ? 'border-sky-400' : ''}`}>
          {isH
            ? <GripVertical className="w-3 h-3 text-slate-400" />
            : <GripHorizontal className="w-3 h-3 text-slate-400" />}
        </div>
      </div>

      {/* Panel B */}
      <div className="overflow-auto flex-1">
        {rightLabel && (
          <div className="px-3 py-2 border-b border-slate-100 bg-slate-50 flex items-center justify-between">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{rightLabel}</span>
            <span className="text-[10px] text-slate-300">{Math.round(100 - split)}%</span>
          </div>
        )}
        <div className="p-3">{rightContent}</div>
      </div>
    </div>
  )
}

const CodePane = () => (
  <div className="font-mono text-[11px] leading-relaxed text-slate-600 space-y-0.5">
    <p><span className="text-violet-500">const</span> <span className="text-sky-600">greet</span> = <span className="text-amber-600">(name)</span> =&gt; {'{'}</p>
    <p className="pl-4"><span className="text-slate-400">// Say hello</span></p>
    <p className="pl-4"><span className="text-violet-500">return</span> <span className="text-emerald-600">`Hello, {'${name}'}!`</span></p>
    <p>{'}'}</p>
    <p className="mt-2"><span className="text-sky-600">greet</span>(<span className="text-emerald-600">'World'</span>)</p>
  </div>
)

const PreviewPane = () => (
  <div className="space-y-2">
    <div className="h-3 bg-slate-100 rounded-full w-3/4" />
    <div className="h-3 bg-slate-100 rounded-full w-full" />
    <div className="h-3 bg-slate-100 rounded-full w-5/6" />
    <div className="h-3 bg-slate-100 rounded-full w-2/3" />
    <div className="mt-3 h-8 bg-sky-100 rounded-xl flex items-center px-3">
      <span className="text-xs text-sky-600 font-semibold">Hello, World!</span>
    </div>
  </div>
)

const NotesPane = () => (
  <div className="space-y-1.5">
    {['Implement drag handle', 'Add snap points', 'Test on mobile'].map((t, i) => (
      <div key={i} className="flex items-center gap-2 text-xs text-slate-600">
        <div className={`w-1.5 h-1.5 rounded-full ${i === 0 ? 'bg-sky-400' : i === 1 ? 'bg-amber-400' : 'bg-slate-200'}`} />
        {t}
      </div>
    ))}
  </div>
)

const ChatPane = () => (
  <div className="space-y-2">
    {[
      { me: false, text: 'Drag the divider!' },
      { me: true,  text: 'Smooth resize 🎉' },
    ].map((m, i) => (
      <div key={i} className={`flex ${m.me ? 'justify-end' : ''}`}>
        <div className={`text-[11px] px-2.5 py-1.5 rounded-xl max-w-[80%]
          ${m.me ? 'bg-sky-500 text-white' : 'bg-slate-100 text-slate-700'}`}>
          {m.text}
        </div>
      </div>
    ))}
  </div>
)

export function ResizablePanelShowcase() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-6">
        <div>
          <p className="section-label">Horizontal split — Code / Preview</p>
          <ResizablePanel
            direction="horizontal"
            initialSplit={45}
            leftLabel="Code"
            rightLabel="Preview"
            leftContent={<CodePane />}
            rightContent={<PreviewPane />}
          />
        </div>
        <div>
          <p className="section-label">Horizontal split — Notes / Chat</p>
          <ResizablePanel
            direction="horizontal"
            initialSplit={55}
            leftLabel="Notes"
            rightLabel="Chat"
            leftContent={<NotesPane />}
            rightContent={<ChatPane />}
          />
        </div>
      </div>
      <div>
        <p className="section-label">Vertical split</p>
        <ResizablePanel
          direction="vertical"
          initialSplit={40}
          leftLabel="Top panel"
          rightLabel="Bottom panel"
          leftContent={<CodePane />}
          rightContent={<PreviewPane />}
        />
      </div>
    </div>
  )
}
