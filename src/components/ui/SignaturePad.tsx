import { useRef, useState, useEffect } from 'react'
import { Trash2, Download, Pen } from 'lucide-react'

interface Point { x: number; y: number }

export function SignatureCanvas({ width = 400, height = 180, color = '#1e293b', strokeWidth = 2.5 }: {
  width?: number; height?: number; color?: string; strokeWidth?: number
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const drawing   = useRef(false)
  const lastPoint = useRef<Point | null>(null)
  const [isEmpty, setIsEmpty] = useState(true)

  const getCtx = () => canvasRef.current?.getContext('2d') ?? null

  useEffect(() => {
    const ctx = getCtx()
    if (!ctx) return
    ctx.strokeStyle = color
    ctx.lineWidth   = strokeWidth
    ctx.lineCap     = 'round'
    ctx.lineJoin    = 'round'
  }, [color, strokeWidth])

  const toCanvas = (e: PointerEvent | React.PointerEvent): Point => {
    const rect = canvasRef.current!.getBoundingClientRect()
    const scaleX = canvasRef.current!.width  / rect.width
    const scaleY = canvasRef.current!.height / rect.height
    return { x: (e.clientX - rect.left) * scaleX, y: (e.clientY - rect.top) * scaleY }
  }

  const onPointerDown = (e: React.PointerEvent<HTMLCanvasElement>) => {
    e.currentTarget.setPointerCapture(e.pointerId)
    drawing.current = true
    lastPoint.current = toCanvas(e)
    setIsEmpty(false)

    const ctx = getCtx()
    if (!ctx) return
    ctx.beginPath()
    ctx.arc(lastPoint.current.x, lastPoint.current.y, strokeWidth / 2, 0, Math.PI * 2)
    ctx.fillStyle = color
    ctx.fill()

    const onMove = (ev: PointerEvent) => {
      if (!drawing.current || !lastPoint.current || !ctx) return
      const pt = toCanvas(ev)
      ctx.beginPath()
      ctx.moveTo(lastPoint.current.x, lastPoint.current.y)
      ctx.lineTo(pt.x, pt.y)
      ctx.stroke()
      lastPoint.current = pt
    }
    const onUp = () => {
      drawing.current = false
      lastPoint.current = null
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('pointerup', onUp)
    }
    window.addEventListener('pointermove', onMove)
    window.addEventListener('pointerup', onUp)
  }

  const clear = () => {
    const ctx = getCtx()
    if (ctx) ctx.clearRect(0, 0, width, height)
    setIsEmpty(true)
  }

  const download = () => {
    const canvas = canvasRef.current
    if (!canvas || isEmpty) return
    const link = document.createElement('a')
    link.download = 'signature.png'
    link.href = canvas.toDataURL('image/png')
    link.click()
  }

  return (
    <div className="space-y-2">
      <div className="relative rounded-clay border-2 border-dashed border-slate-200 bg-white overflow-hidden"
        style={{ width: '100%', aspectRatio: `${width}/${height}` }}>
        <canvas
          ref={canvasRef}
          width={width}
          height={height}
          onPointerDown={onPointerDown}
          className="w-full h-full cursor-crosshair touch-none"
        />
        {isEmpty && (
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
            <Pen className="w-5 h-5 text-slate-300 mb-1.5" />
            <p className="text-xs text-slate-300 font-medium">Sign here</p>
          </div>
        )}
        {/* baseline */}
        <div className="absolute bottom-10 left-8 right-8 border-b border-slate-200 pointer-events-none" />
      </div>
      <div className="flex gap-2">
        <button onClick={clear} disabled={isEmpty}
          className="flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 border-2 border-slate-200 rounded-xl text-slate-500 hover:border-slate-300 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer transition-all">
          <Trash2 className="w-3.5 h-3.5" />Clear
        </button>
        <button onClick={download} disabled={isEmpty}
          className="flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 bg-sky-500 hover:bg-sky-600 text-white rounded-xl shadow-clay disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer transition-colors">
          <Download className="w-3.5 h-3.5" />Save PNG
        </button>
        {!isEmpty && (
          <span className="ml-auto text-xs text-emerald-500 font-semibold flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block" />Signed
          </span>
        )}
      </div>
    </div>
  )
}

export function SignaturePadShowcase() {
  return (
    <div className="grid grid-cols-2 gap-8">
      <div className="space-y-3">
        <p className="section-label">Default</p>
        <SignatureCanvas />
      </div>
      <div className="space-y-3">
        <p className="section-label">Agreement form</p>
        <div className="clay-card p-5 space-y-4">
          <p className="text-sm text-slate-600 leading-relaxed">
            By signing below, you agree to our <span className="text-sky-500 font-semibold">Terms of Service</span> and <span className="text-sky-500 font-semibold">Privacy Policy</span>.
          </p>
          <SignatureCanvas color="#0ea5e9" strokeWidth={3} />
          <div className="flex items-center gap-3">
            <input type="text" placeholder="Full legal name" className="flex-1 border-2 border-slate-200 rounded-xl px-3 py-2 text-sm focus:border-sky-400 focus:outline-none transition-colors" />
          </div>
          <button className="w-full bg-sky-500 hover:bg-sky-600 text-white text-sm font-semibold py-2.5 rounded-xl shadow-clay cursor-pointer transition-colors">
            Submit Agreement
          </button>
        </div>
      </div>
    </div>
  )
}
