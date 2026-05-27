import { useState, useEffect, useCallback } from 'react'
import { createPortal } from 'react-dom'
import { X, ChevronLeft, ChevronRight, ZoomIn, Download, Heart, LayoutGrid, List, Columns2, Columns3, Rows3 } from 'lucide-react'

export interface GalleryImage {
  id: number
  gradient: string
  label: string
  author: string
  liked: boolean
  height: string
}

const IMAGES: GalleryImage[] = [
  { id: 1, gradient: 'from-sky-400 to-violet-500',    label: 'Aurora Borealis',  author: 'Sophie L.',  liked: false, height: 'h-52' },
  { id: 2, gradient: 'from-emerald-400 to-sky-500',   label: 'Ocean Sunrise',    author: 'Michael H.', liked: true,  height: 'h-36' },
  { id: 3, gradient: 'from-pink-400 to-orange-500',   label: 'Desert Dusk',      author: 'Anya P.',    liked: false, height: 'h-44' },
  { id: 4, gradient: 'from-violet-500 to-indigo-600', label: 'Midnight Storm',   author: 'Marcus T.',  liked: false, height: 'h-36' },
  { id: 5, gradient: 'from-amber-400 to-pink-500',    label: 'Golden Hour',      author: 'Leon K.',    liked: true,  height: 'h-56' },
  { id: 6, gradient: 'from-teal-400 to-emerald-500',  label: 'Forest Mist',      author: 'Priya S.',   liked: false, height: 'h-40' },
  { id: 7, gradient: 'from-rose-400 to-pink-600',     label: 'Cherry Blossom',   author: 'Sophie L.',  liked: false, height: 'h-40' },
  { id: 8, gradient: 'from-blue-500 to-cyan-400',     label: 'Deep Ocean',       author: 'Michael H.', liked: true,  height: 'h-52' },
  { id: 9, gradient: 'from-yellow-400 to-orange-500', label: 'Lava Flow',        author: 'Anya P.',    liked: false, height: 'h-32' },
]

export type ViewMode = 'masonry' | 'grid2' | 'grid3' | 'grid4' | 'list'

const VIEW_OPTIONS: { mode: ViewMode; icon: React.ReactNode; label: string }[] = [
  { mode: 'masonry', icon: <Rows3 className="w-4 h-4" />,    label: 'Masonry' },
  { mode: 'grid2',   icon: <Columns2 className="w-4 h-4" />, label: '2 columns' },
  { mode: 'grid3',   icon: <LayoutGrid className="w-4 h-4" />,label: '3 columns' },
  { mode: 'grid4',   icon: <Columns3 className="w-4 h-4" />, label: '4 columns' },
  { mode: 'list',    icon: <List className="w-4 h-4" />,      label: 'List' },
]

/* ── Lightbox ─────────────────────────────────────────── */

function Lightbox({ images, index, onClose, onNav }: {
  images: GalleryImage[]
  index: number
  onClose: () => void
  onNav: (i: number) => void
}) {
  const img = images[index]

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowLeft')  onNav((index - 1 + images.length) % images.length)
      if (e.key === 'ArrowRight') onNav((index + 1) % images.length)
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [index, images.length, onClose, onNav])

  return createPortal(
    <div className="fixed inset-0 z-[300] flex items-center justify-center" style={{ animation: 'fadeIn 0.2s ease' }}>
      <div className="absolute inset-0 bg-slate-900/80 backdrop-blur-sm" onClick={onClose} />
      <div className="relative z-10 flex flex-col items-center gap-4 p-4 max-w-2xl w-full mx-4">
        <div key={index}
          className={`w-full aspect-video rounded-clay-lg bg-gradient-to-br ${img.gradient} shadow-clay-lg relative overflow-hidden`}
          style={{ animation: 'fadeIn 0.18s ease' }}>
          <div className="absolute inset-0 flex items-center justify-center">
            <p className="font-heading font-bold text-white text-3xl drop-shadow-lg">{img.label}</p>
          </div>
          <div className="absolute bottom-0 inset-x-0 h-16"
            style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.45), transparent)' }} />
          <div className="absolute bottom-3 left-4 text-white/80 text-xs">by {img.author}</div>
        </div>
        <div className="flex items-center gap-4">
          <button onClick={() => onNav((index - 1 + images.length) % images.length)}
            className="w-10 h-10 bg-white/10 hover:bg-white/20 text-white rounded-full flex items-center justify-center cursor-pointer transition-all backdrop-blur-sm">
            <ChevronLeft className="w-5 h-5" />
          </button>
          <div className="flex gap-1.5">
            {images.map((_, i) => (
              <button key={i} onClick={() => onNav(i)}
                className={`rounded-full transition-all cursor-pointer ${i === index ? 'bg-white w-5 h-1.5' : 'bg-white/40 w-1.5 h-1.5'}`} />
            ))}
          </div>
          <button onClick={() => onNav((index + 1) % images.length)}
            className="w-10 h-10 bg-white/10 hover:bg-white/20 text-white rounded-full flex items-center justify-center cursor-pointer transition-all backdrop-blur-sm">
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
      <button onClick={onClose}
        className="absolute top-4 right-4 w-9 h-9 bg-white/10 hover:bg-white/20 text-white rounded-full flex items-center justify-center cursor-pointer transition-all backdrop-blur-sm z-20">
        <X className="w-5 h-5" />
      </button>
      <div className="absolute top-4 left-4 z-20">
        <button className="w-9 h-9 bg-white/10 hover:bg-white/20 text-white rounded-full flex items-center justify-center cursor-pointer transition-all backdrop-blur-sm">
          <Download className="w-4 h-4" />
        </button>
      </div>
    </div>,
    document.body
  )
}

/* ── Image card (shared across views) ─────────────────── */

function ImageCard({ img, index, onClick, onLike, mode }: {
  img: GalleryImage
  index: number
  onClick: () => void
  onLike: (e: React.MouseEvent) => void
  mode: ViewMode
}) {
  if (mode === 'list') {
    return (
      <div onClick={onClick}
        className="flex items-center gap-4 p-3 rounded-xl border border-slate-100 bg-white hover:bg-slate-50 hover:shadow-soft cursor-pointer transition-all group">
        <div className={`w-16 h-14 rounded-xl bg-gradient-to-br ${img.gradient} shrink-0 flex items-center justify-center relative overflow-hidden`}>
          <ZoomIn className="w-4 h-4 text-white opacity-0 group-hover:opacity-100 transition-opacity drop-shadow" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-semibold text-slate-800">{img.label}</p>
          <p className="text-xs text-slate-400 mt-0.5">by {img.author}</p>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          {img.liked && <Heart className="w-3.5 h-3.5 text-red-400 fill-red-400" />}
          <button onClick={onLike}
            className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center cursor-pointer transition-colors">
            <Heart className={`w-3.5 h-3.5 ${img.liked ? 'text-red-400 fill-red-400' : 'text-slate-400'}`} />
          </button>
        </div>
      </div>
    )
  }

  return (
    <div onClick={onClick}
      className="group relative rounded-clay overflow-hidden cursor-pointer shadow-soft hover:shadow-clay-lg transition-all hover:-translate-y-0.5 aspect-square">
      <div className={`w-full h-full bg-gradient-to-br ${img.gradient}`} />
      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/15 transition-colors" />
      <div className="absolute inset-0 flex flex-col justify-between p-3 opacity-0 group-hover:opacity-100 transition-opacity">
        <div className="flex justify-end">
          <button onClick={onLike}
            className="w-7 h-7 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center cursor-pointer transition-all hover:bg-white/30">
            <Heart className={`w-3.5 h-3.5 ${img.liked ? 'text-red-400 fill-red-400' : 'text-white'}`} />
          </button>
        </div>
        <div>
          <p className="text-white text-xs font-bold drop-shadow">{img.label}</p>
          <p className="text-white/70 text-[10px]">{img.author}</p>
        </div>
      </div>
      {img.liked && (
        <div className="absolute top-2 left-2 group-hover:opacity-0 transition-opacity">
          <Heart className="w-3.5 h-3.5 text-red-400 fill-red-400 drop-shadow" />
        </div>
      )}
      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
        <div className="w-9 h-9 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
          <ZoomIn className="w-4 h-4 text-white drop-shadow" />
        </div>
      </div>
    </div>
  )
}

/* ── Showcase ──────────────────────────────────────────── */

export function ImageGalleryShowcase() {
  const [lightboxIdx, setLightboxIdx] = useState<number | null>(null)
  const [images, setImages] = useState(IMAGES)
  const [view, setView] = useState<ViewMode>('masonry')
  const [showLiked, setShowLiked] = useState(false)

  const toggleLike = (e: React.MouseEvent, id: number) => {
    e.stopPropagation()
    setImages(prev => prev.map(img => img.id === id ? { ...img, liked: !img.liked } : img))
  }

  const nav = useCallback((i: number) => setLightboxIdx(i), [])

  const filtered = showLiked ? images.filter(img => img.liked) : images

  const GRID_COLS: Record<ViewMode, string> = {
    masonry: '',
    grid2: 'grid grid-cols-2 gap-3',
    grid3: 'grid grid-cols-3 gap-3',
    grid4: 'grid grid-cols-4 gap-3',
    list:  'flex flex-col gap-2',
  }

  return (
    <div className="space-y-4">
      {/* Toolbar */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1 bg-slate-100 rounded-xl p-1">
          {VIEW_OPTIONS.map(({ mode, icon, label }) => (
            <button key={mode} onClick={() => setView(mode)} title={label}
              className={`flex items-center justify-center w-8 h-8 rounded-lg cursor-pointer transition-all
                ${view === mode ? 'bg-white shadow-soft text-sky-600' : 'text-slate-400 hover:text-slate-600'}`}>
              {icon}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <button onClick={() => setShowLiked(v => !v)}
            className={`flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-xl border cursor-pointer transition-all
              ${showLiked
                ? 'bg-red-50 border-red-200 text-red-500'
                : 'bg-white border-slate-200 text-slate-500 hover:border-slate-300'}`}>
            <Heart className={`w-3.5 h-3.5 ${showLiked ? 'fill-red-400 text-red-400' : ''}`} />
            {showLiked ? `Liked (${images.filter(i => i.liked).length})` : 'Show liked'}
          </button>
          <p className="text-xs text-slate-400">{filtered.length} photos</p>
        </div>
      </div>

      {/* Gallery */}
      {view === 'masonry' ? (
        <div className="columns-3 gap-3">
          {filtered.map((img, i) => (
            <div key={img.id}
              onClick={() => setLightboxIdx(images.indexOf(img))}
              className={`break-inside-avoid mb-3 group relative rounded-clay overflow-hidden cursor-pointer
                shadow-soft hover:shadow-clay-lg transition-all hover:-translate-y-0.5 ${img.height}`}>
              <div className={`w-full h-full bg-gradient-to-br ${img.gradient}`} />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/15 transition-colors" />
              <div className="absolute inset-0 flex flex-col justify-between p-3 opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="flex justify-end">
                  <button onClick={e => toggleLike(e, img.id)}
                    className="w-7 h-7 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center cursor-pointer transition-all hover:bg-white/30">
                    <Heart className={`w-3.5 h-3.5 ${img.liked ? 'text-red-400 fill-red-400' : 'text-white'}`} />
                  </button>
                </div>
                <div>
                  <p className="text-white text-xs font-bold drop-shadow">{img.label}</p>
                  <p className="text-white/70 text-[10px]">{img.author}</p>
                </div>
              </div>
              {img.liked && (
                <div className="absolute top-2 left-2 group-hover:opacity-0 transition-opacity">
                  <Heart className="w-3.5 h-3.5 text-red-400 fill-red-400 drop-shadow" />
                </div>
              )}
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="w-9 h-9 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                  <ZoomIn className="w-4 h-4 text-white drop-shadow" />
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className={GRID_COLS[view]}>
          {filtered.map((img, i) => (
            <ImageCard
              key={img.id}
              img={img}
              index={i}
              mode={view}
              onClick={() => setLightboxIdx(images.indexOf(img))}
              onLike={e => toggleLike(e, img.id)}
            />
          ))}
        </div>
      )}

      {filtered.length === 0 && (
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <Heart className="w-8 h-8 text-slate-200 mb-3" />
          <p className="text-sm font-semibold text-slate-400">No liked photos yet</p>
          <p className="text-xs text-slate-300 mt-1">Hover an image and click the heart</p>
        </div>
      )}

      {lightboxIdx !== null && (
        <Lightbox images={images} index={lightboxIdx} onClose={() => setLightboxIdx(null)} onNav={nav} />
      )}
    </div>
  )
}
