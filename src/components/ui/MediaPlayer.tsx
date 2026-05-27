import { useState, useEffect, useRef, useCallback } from 'react'
import { Play, Pause, SkipBack, SkipForward, Volume2, VolumeX, Shuffle, Repeat, Heart, ListMusic } from 'lucide-react'

interface Track { id: string; title: string; artist: string; duration: number; color: string; liked: boolean }

const TRACKS: Track[] = [
  { id: 't1', title: 'Aurora Dreams',    artist: 'Sophie L.',  duration: 214, color: 'from-sky-400 to-violet-500',    liked: true  },
  { id: 't2', title: 'Golden Hour',      artist: 'Leon K.',    duration: 187, color: 'from-amber-400 to-pink-500',    liked: false },
  { id: 't3', title: 'Midnight Bloom',   artist: 'Anya P.',    duration: 243, color: 'from-violet-500 to-indigo-600', liked: true  },
  { id: 't4', title: 'Ocean Static',     artist: 'Marcus T.',  duration: 198, color: 'from-emerald-400 to-sky-500',   liked: false },
  { id: 't5', title: 'Cherry Smoke',     artist: 'Priya S.',   duration: 221, color: 'from-rose-400 to-pink-600',     liked: false },
]

const fmt = (s: number) => `${Math.floor(s / 60)}:${String(Math.floor(s % 60)).padStart(2, '0')}`

function WaveBar({ active, height }: { active: boolean; height: number }) {
  return (
    <div className="w-0.5 rounded-full transition-all duration-100"
      style={{ height, background: active ? '#0ea5e9' : '#e2e8f0' }} />
  )
}

export function MediaPlayerShowcase() {
  const [trackIdx, setTrackIdx]   = useState(0)
  const [playing, setPlaying]     = useState(false)
  const [progress, setProgress]   = useState(0)
  const [volume, setVolume]       = useState(80)
  const [muted, setMuted]         = useState(false)
  const [shuffle, setShuffle]     = useState(false)
  const [repeat, setRepeat]       = useState(false)
  const [showQueue, setShowQueue] = useState(false)
  const [tracks, setTracks]       = useState(TRACKS)

  const track     = tracks[trackIdx]
  const elapsed   = Math.floor((progress / 100) * track.duration)
  const remaining = track.duration - elapsed

  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)

  useEffect(() => {
    if (playing) {
      intervalRef.current = setInterval(() => {
        setProgress(p => {
          if (p >= 100) {
            // next track
            setTrackIdx(i => (i + 1) % tracks.length)
            return 0
          }
          return p + 100 / track.duration * 0.5
        })
      }, 500)
    } else {
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
    return () => { if (intervalRef.current) clearInterval(intervalRef.current) }
  }, [playing, track.duration, tracks.length])

  // Reset progress on track change
  useEffect(() => { setProgress(0) }, [trackIdx])

  const prev = () => { setTrackIdx(i => (i - 1 + tracks.length) % tracks.length) }
  const next = () => {
    if (shuffle) setTrackIdx(Math.floor(Math.random() * tracks.length))
    else setTrackIdx(i => (i + 1) % tracks.length)
  }

  const seekPointerDown = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    const seek = (ev: PointerEvent | React.PointerEvent) => {
      const rect = (e.currentTarget as HTMLDivElement).getBoundingClientRect()
      const pct  = Math.max(0, Math.min(1, (ev.clientX - rect.left) / rect.width))
      setProgress(pct * 100)
    }
    seek(e)
    e.currentTarget.setPointerCapture(e.pointerId)
    const onMove = (ev: PointerEvent) => seek(ev)
    const onUp   = () => { window.removeEventListener('pointermove', onMove); window.removeEventListener('pointerup', onUp) }
    window.addEventListener('pointermove', onMove)
    window.addEventListener('pointerup', onUp)
  }, [])

  const volPointerDown = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    const set = (ev: PointerEvent | React.PointerEvent) => {
      const rect = (e.currentTarget as HTMLDivElement).getBoundingClientRect()
      setVolume(Math.round(Math.max(0, Math.min(1, (ev.clientX - rect.left) / rect.width)) * 100))
    }
    set(e)
    e.currentTarget.setPointerCapture(e.pointerId)
    const onMove = (ev: PointerEvent) => set(ev)
    const onUp   = () => { window.removeEventListener('pointermove', onMove); window.removeEventListener('pointerup', onUp) }
    window.addEventListener('pointermove', onMove)
    window.addEventListener('pointerup', onUp)
  }, [])

  const toggleLike = (id: string) => setTracks(t => t.map(x => x.id === id ? { ...x, liked: !x.liked } : x))

  // Fake waveform heights
  const WAVE = Array.from({ length: 40 }, (_, i) => 6 + Math.abs(Math.sin(i * 0.7 + trackIdx)) * 18 + Math.abs(Math.sin(i * 0.3)) * 8)
  const activeBar = Math.floor((progress / 100) * WAVE.length)

  return (
    <div className="grid grid-cols-2 gap-8">
      {/* Player */}
      <div className="clay-card p-5 space-y-4">
        {/* Album art */}
        <div className={`w-full aspect-square rounded-clay-lg bg-gradient-to-br ${track.color} flex items-center justify-center relative overflow-hidden shadow-clay-lg`}>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className={`w-20 h-20 rounded-full bg-white/10 flex items-center justify-center transition-all duration-300 ${playing ? 'scale-110' : 'scale-100'}`}>
              <ListMusic className="w-8 h-8 text-white/70" />
            </div>
          </div>
          <button onClick={() => toggleLike(track.id)}
            className="absolute top-3 right-3 w-8 h-8 bg-black/20 backdrop-blur-sm rounded-full flex items-center justify-center cursor-pointer hover:bg-black/30 transition-colors">
            <Heart className={`w-4 h-4 ${track.liked ? 'fill-red-400 text-red-400' : 'text-white'}`} />
          </button>
        </div>

        {/* Info */}
        <div className="flex items-center justify-between">
          <div>
            <p className="font-heading font-bold text-slate-800">{track.title}</p>
            <p className="text-sm text-slate-400">{track.artist}</p>
          </div>
          <button onClick={() => setShowQueue(q => !q)}
            className={`w-8 h-8 flex items-center justify-center rounded-xl cursor-pointer transition-all
              ${showQueue ? 'bg-sky-100 text-sky-600' : 'text-slate-400 hover:bg-slate-100'}`}>
            <ListMusic className="w-4 h-4" />
          </button>
        </div>

        {/* Waveform */}
        <div className="flex items-center gap-0.5 h-8">
          {WAVE.map((h, i) => <WaveBar key={i} active={i < activeBar} height={h} />)}
        </div>

        {/* Seek bar */}
        <div className="space-y-1">
          <div onPointerDown={seekPointerDown}
            className="h-1.5 bg-slate-100 rounded-full cursor-pointer relative overflow-hidden group">
            <div className="h-full bg-sky-500 rounded-full transition-none" style={{ width: `${progress}%` }} />
            <div className="absolute top-1/2 -translate-y-1/2 w-3 h-3 bg-sky-500 rounded-full shadow-clay opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
              style={{ left: `calc(${progress}% - 6px)` }} />
          </div>
          <div className="flex justify-between text-[10px] text-slate-400 tabular-nums">
            <span>{fmt(elapsed)}</span>
            <span>-{fmt(remaining)}</span>
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center justify-between">
          <button onClick={() => setShuffle(s => !s)}
            className={`w-8 h-8 flex items-center justify-center rounded-xl cursor-pointer transition-all ${shuffle ? 'text-sky-500' : 'text-slate-300 hover:text-slate-500'}`}>
            <Shuffle className="w-4 h-4" />
          </button>
          <button onClick={prev}
            className="w-10 h-10 flex items-center justify-center rounded-xl hover:bg-slate-100 cursor-pointer transition-colors text-slate-600">
            <SkipBack className="w-5 h-5" />
          </button>
          <button onClick={() => setPlaying(p => !p)}
            className="w-14 h-14 bg-sky-500 hover:bg-sky-600 text-white rounded-2xl flex items-center justify-center shadow-clay cursor-pointer transition-all hover:scale-105 active:scale-95">
            {playing ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6 ml-0.5" />}
          </button>
          <button onClick={next}
            className="w-10 h-10 flex items-center justify-center rounded-xl hover:bg-slate-100 cursor-pointer transition-colors text-slate-600">
            <SkipForward className="w-5 h-5" />
          </button>
          <button onClick={() => setRepeat(r => !r)}
            className={`w-8 h-8 flex items-center justify-center rounded-xl cursor-pointer transition-all ${repeat ? 'text-sky-500' : 'text-slate-300 hover:text-slate-500'}`}>
            <Repeat className="w-4 h-4" />
          </button>
        </div>

        {/* Volume */}
        <div className="flex items-center gap-2">
          <button onClick={() => setMuted(m => !m)} className="text-slate-400 hover:text-slate-600 cursor-pointer transition-colors">
            {muted || volume === 0 ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
          </button>
          <div onPointerDown={volPointerDown}
            className="flex-1 h-1.5 bg-slate-100 rounded-full cursor-pointer relative overflow-hidden">
            <div className="h-full bg-slate-400 rounded-full" style={{ width: `${muted ? 0 : volume}%` }} />
          </div>
          <span className="text-[10px] text-slate-400 tabular-nums w-6 text-right">{muted ? 0 : volume}</span>
        </div>
      </div>

      {/* Queue */}
      <div className="space-y-3">
        <p className="section-label">Queue</p>
        <div className="clay-card overflow-hidden divide-y divide-slate-50">
          {tracks.map((t, i) => (
            <button key={t.id} onClick={() => { setTrackIdx(i); setPlaying(true) }}
              className={`w-full flex items-center gap-3 px-4 py-3 cursor-pointer transition-colors text-left
                ${trackIdx === i ? 'bg-sky-50' : 'hover:bg-slate-50'}`}>
              {/* Mini art */}
              <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${t.color} flex items-center justify-center shrink-0 relative`}>
                {trackIdx === i && playing && (
                  <div className="absolute inset-0 flex items-end justify-center gap-0.5 pb-1.5 px-1.5">
                    {[1,2,3].map(b => (
                      <div key={b} className="w-1 bg-white rounded-full animate-[bounce_0.8s_ease-in-out_infinite]"
                        style={{ height: 8, animationDelay: `${b * 0.15}s` }} />
                    ))}
                  </div>
                )}
              </div>
              <div className="flex-1 min-w-0">
                <p className={`text-sm font-semibold truncate ${trackIdx === i ? 'text-sky-600' : 'text-slate-800'}`}>{t.title}</p>
                <p className="text-xs text-slate-400">{t.artist}</p>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <button onClick={e => { e.stopPropagation(); toggleLike(t.id) }}
                  className="cursor-pointer transition-colors">
                  <Heart className={`w-3.5 h-3.5 ${t.liked ? 'fill-red-400 text-red-400' : 'text-slate-300 hover:text-red-400'}`} />
                </button>
                <span className="text-xs text-slate-400 tabular-nums">{fmt(t.duration)}</span>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
