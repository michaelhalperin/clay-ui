import { useState, useEffect, useCallback, useRef } from 'react'
import { ChevronLeft, ChevronRight, Play, Pause } from 'lucide-react'

const SLIDES = [
  { id: 1, title: 'Clay Design System', desc: 'Soft shadows, pastel tones, and crisp typography.', gradient: 'from-sky-400 to-violet-500', accent: '#0ea5e9' },
  { id: 2, title: 'Recharts Integration', desc: 'Area, bar, pie — all styled with clay tokens.', gradient: 'from-emerald-400 to-sky-500', accent: '#10b981' },
  { id: 3, title: 'Motion & Animation', desc: 'Smooth 150–300ms micro-interactions throughout.', gradient: 'from-pink-400 to-orange-500', accent: '#ec4899' },
  { id: 4, title: 'Fully Typed', desc: 'React 18 + TypeScript — zero any, full inference.', gradient: 'from-violet-400 to-indigo-500', accent: '#8b5cf6' },
  { id: 5, title: 'Portal-Rendered', desc: 'Menus, modals and tooltips never get clipped.', gradient: 'from-amber-400 to-pink-500', accent: '#f59e0b' },
]

const CARDS = [
  { id: 1, label: 'Dashboard', users: '12.4k', trend: '+8%', color: '#0ea5e9' },
  { id: 2, label: 'Analytics', users: '8.1k',  trend: '+14%', color: '#8b5cf6' },
  { id: 3, label: 'Settings',  users: '3.7k',  trend: '+2%',  color: '#10b981' },
  { id: 4, label: 'Reports',   users: '5.9k',  trend: '+6%',  color: '#f59e0b' },
  { id: 5, label: 'Users',     users: '21.2k', trend: '+11%', color: '#ec4899' },
]

/* ── Fullscreen slide carousel ── */
export function SlideCarousel() {
  const [index, setIndex] = useState(0)
  const [playing, setPlaying] = useState(true)
  const [dir, setDir] = useState<'left' | 'right'>('right')

  const go = useCallback((next: number, direction: 'left' | 'right') => {
    setDir(direction)
    setIndex((next + SLIDES.length) % SLIDES.length)
  }, [])

  useEffect(() => {
    if (!playing) return
    const id = setInterval(() => go(index + 1, 'right'), 3500)
    return () => clearInterval(id)
  }, [playing, index, go])

  const slide = SLIDES[index]

  return (
    <div className={`relative overflow-hidden rounded-clay-lg bg-gradient-to-br ${slide.gradient} h-48 shadow-clay`}
      style={{ transition: 'background 0.6s ease' }}>
      {/* Content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center p-6"
        key={index} style={{ animation: `${dir === 'right' ? 'slideInRight' : 'slideInLeft'} 0.35s ease` }}>
        <p className="font-heading font-bold text-2xl mb-1 drop-shadow">{slide.title}</p>
        <p className="text-sm opacity-85 max-w-xs">{slide.desc}</p>
      </div>

      {/* Arrows */}
      <button onClick={() => go(index - 1, 'left')}
        className="absolute left-3 top-1/2 -translate-y-1/2 w-8 h-8 bg-white/20 hover:bg-white/35 backdrop-blur-sm rounded-full flex items-center justify-center cursor-pointer transition-all text-white">
        <ChevronLeft className="w-4 h-4" />
      </button>
      <button onClick={() => go(index + 1, 'right')}
        className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 bg-white/20 hover:bg-white/35 backdrop-blur-sm rounded-full flex items-center justify-center cursor-pointer transition-all text-white">
        <ChevronRight className="w-4 h-4" />
      </button>

      {/* Controls */}
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-3">
        <button onClick={() => setPlaying(p => !p)}
          className="text-white/70 hover:text-white cursor-pointer transition-colors">
          {playing ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
        </button>
        <div className="flex gap-1.5">
          {SLIDES.map((_, i) => (
            <button key={i} onClick={() => go(i, i > index ? 'right' : 'left')}
              className={`rounded-full transition-all cursor-pointer ${i === index ? 'bg-white w-5 h-1.5' : 'bg-white/40 w-1.5 h-1.5'}`} />
          ))}
        </div>
      </div>
    </div>
  )
}

/* ── Scrollable card carousel ── */
export function CardCarousel() {
  const [offset, setOffset] = useState(0)
  const VISIBLE = 3
  const max = CARDS.length - VISIBLE

  const go = (d: number) => setOffset(o => Math.max(0, Math.min(max, o + d)))

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <p className="text-xs font-semibold text-slate-500">Feature Cards</p>
        <div className="flex gap-1">
          <button onClick={() => go(-1)} disabled={offset === 0}
            className="w-7 h-7 rounded-xl bg-slate-100 hover:bg-slate-200 disabled:opacity-30 disabled:cursor-not-allowed flex items-center justify-center cursor-pointer transition-colors">
            <ChevronLeft className="w-4 h-4 text-slate-600" />
          </button>
          <button onClick={() => go(1)} disabled={offset >= max}
            className="w-7 h-7 rounded-xl bg-slate-100 hover:bg-slate-200 disabled:opacity-30 disabled:cursor-not-allowed flex items-center justify-center cursor-pointer transition-colors">
            <ChevronRight className="w-4 h-4 text-slate-600" />
          </button>
        </div>
      </div>

      <div className="overflow-hidden">
        <div className="flex gap-3 transition-transform duration-400 ease-out"
          style={{ transform: `translateX(calc(-${offset} * (100% / ${VISIBLE} + 4px)))` }}>
          {CARDS.map(card => (
            <div key={card.id} className="clay-card p-4 shrink-0 flex flex-col gap-2" style={{ width: `calc(${100 / VISIBLE}% - 8px)` }}>
              <div className="w-10 h-10 rounded-xl flex items-center justify-center shadow-soft" style={{ background: card.color + '22' }}>
                <div className="w-4 h-4 rounded-md" style={{ background: card.color }} />
              </div>
              <p className="text-sm font-bold text-slate-800">{card.label}</p>
              <div className="flex items-center justify-between">
                <p className="text-lg font-heading font-bold text-slate-900">{card.users}</p>
                <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-lg">{card.trend}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Dot indicators */}
      <div className="flex justify-center gap-1.5">
        {Array.from({ length: max + 1 }, (_, i) => (
          <button key={i} onClick={() => setOffset(i)}
            className={`rounded-full transition-all cursor-pointer ${i === offset ? 'bg-sky-500 w-4 h-1.5' : 'bg-slate-300 w-1.5 h-1.5'}`} />
        ))}
      </div>
    </div>
  )
}

/* ── Thumbnail strip ── */
export function ThumbnailCarousel() {
  const [active, setActive] = useState(0)
  return (
    <div className="space-y-3">
      {/* Main view */}
      <div className={`h-32 rounded-clay-lg bg-gradient-to-br ${SLIDES[active].gradient} shadow-clay flex items-center justify-center transition-all duration-400`}
        key={active} style={{ animation: 'fadeIn 0.3s ease' }}>
        <p className="font-heading font-bold text-white text-xl drop-shadow">{SLIDES[active].title}</p>
      </div>
      {/* Thumbnails */}
      <div className="flex gap-2">
        {SLIDES.map((s, i) => (
          <button key={s.id} onClick={() => setActive(i)}
            className={`flex-1 h-10 rounded-xl bg-gradient-to-br ${s.gradient} cursor-pointer transition-all
              ${i === active ? 'ring-2 ring-sky-400 ring-offset-2 scale-105' : 'opacity-50 hover:opacity-80'}`} />
        ))}
      </div>
    </div>
  )
}

export function CarouselShowcase() {
  return (
    <div className="space-y-8">
      <div className="grid grid-cols-2 gap-8">
        <div>
          <p className="section-label">Slide Carousel</p>
          <SlideCarousel />
        </div>
        <div>
          <p className="section-label">Thumbnail Strip</p>
          <ThumbnailCarousel />
        </div>
      </div>
      <div>
        <p className="section-label">Scrollable Card Carousel</p>
        <CardCarousel />
      </div>
    </div>
  )
}
