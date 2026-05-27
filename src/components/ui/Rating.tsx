import { useState } from 'react'
import { Star, ThumbsUp, ThumbsDown, Heart } from 'lucide-react'

/* ── Star rating ── */
export function StarRating({ value, onChange, max = 5, size = 'md', label, readonly = false }: {
  value: number; onChange?: (v: number) => void; max?: number
  size?: 'sm' | 'md' | 'lg'; label?: string; readonly?: boolean
}) {
  const [hover, setHover] = useState(0)
  const sz = { sm: 'w-4 h-4', md: 'w-6 h-6', lg: 'w-8 h-8' }[size]
  const active = hover || value

  return (
    <div className="space-y-1.5">
      {label && <p className="text-sm font-semibold text-slate-700">{label}</p>}
      <div className="flex items-center gap-1">
        {Array.from({ length: max }, (_, i) => i + 1).map(i => (
          <button key={i}
            disabled={readonly}
            onClick={() => onChange?.(i)}
            onMouseEnter={() => !readonly && setHover(i)}
            onMouseLeave={() => !readonly && setHover(0)}
            className={`transition-transform ${!readonly ? 'cursor-pointer hover:scale-110' : 'cursor-default'}`}
          >
            <Star className={`${sz} transition-colors ${i <= active ? 'text-amber-400 fill-amber-400' : 'text-slate-200 fill-slate-200'}`} />
          </button>
        ))}
        {!readonly && value > 0 && (
          <span className="ml-2 text-sm font-semibold text-slate-500">{value}/{max}</span>
        )}
      </div>
    </div>
  )
}

/* ── Half-star display ── */
export function HalfStarDisplay({ value, max = 5, reviews }: { value: number; max?: number; reviews?: number }) {
  return (
    <div className="flex items-center gap-2">
      <div className="flex items-center">
        {Array.from({ length: max }, (_, i) => {
          const filled = value - i
          return (
            <div key={i} className="relative w-5 h-5">
              <Star className="absolute inset-0 w-5 h-5 text-slate-200 fill-slate-200" />
              {filled > 0 && (
                <div className="absolute inset-0 overflow-hidden" style={{ width: filled >= 1 ? '100%' : '50%' }}>
                  <Star className="w-5 h-5 text-amber-400 fill-amber-400" />
                </div>
              )}
            </div>
          )
        })}
      </div>
      <span className="text-sm font-bold text-slate-700">{value}</span>
      {reviews && <span className="text-xs text-slate-400">({reviews.toLocaleString()} reviews)</span>}
    </div>
  )
}

/* ── Thumbs up/down ── */
function ThumbsRating() {
  const [vote, setVote] = useState<'up' | 'down' | null>(null)
  const [counts, setCounts] = useState({ up: 142, down: 8 })

  const cast = (v: 'up' | 'down') => {
    if (vote === v) {
      setVote(null)
      setCounts(c => ({ ...c, [v]: c[v] - 1 }))
    } else {
      if (vote) setCounts(c => ({ ...c, [vote]: c[vote] - 1 }))
      setVote(v)
      setCounts(c => ({ ...c, [v]: c[v] + 1 }))
    }
  }

  return (
    <div className="flex items-center gap-3">
      <button onClick={() => cast('up')}
        className={`flex items-center gap-2 px-3 py-2 rounded-xl text-sm font-semibold cursor-pointer transition-all
          ${vote === 'up' ? 'bg-emerald-100 text-emerald-700 shadow-soft' : 'bg-slate-100 text-slate-500 hover:bg-emerald-50 hover:text-emerald-600'}`}>
        <ThumbsUp className="w-4 h-4" />
        {counts.up}
      </button>
      <button onClick={() => cast('down')}
        className={`flex items-center gap-2 px-3 py-2 rounded-xl text-sm font-semibold cursor-pointer transition-all
          ${vote === 'down' ? 'bg-red-100 text-red-600 shadow-soft' : 'bg-slate-100 text-slate-500 hover:bg-red-50 hover:text-red-500'}`}>
        <ThumbsDown className="w-4 h-4" />
        {counts.down}
      </button>
      {vote && (
        <span className="text-xs text-slate-400" style={{ animation: 'fadeIn 0.2s ease' }}>
          {vote === 'up' ? 'Thanks for the feedback!' : 'We\'ll work on it.'}
        </span>
      )}
    </div>
  )
}

/* ── Emoji reactions ── */
const REACTIONS = [
  { emoji: '❤️', label: 'Love' },
  { emoji: '😂', label: 'Haha' },
  { emoji: '😮', label: 'Wow' },
  { emoji: '😢', label: 'Sad' },
  { emoji: '👏', label: 'Clap' },
  { emoji: '🔥', label: 'Fire' },
]

function EmojiReactions() {
  const [counts, setCounts] = useState<Record<string, number>>({ '❤️': 24, '😂': 8, '🔥': 15 })
  const [mine, setMine] = useState<Set<string>>(new Set())

  const toggle = (emoji: string) => {
    const next = new Set(mine)
    if (next.has(emoji)) {
      next.delete(emoji)
      setCounts(c => ({ ...c, [emoji]: (c[emoji] ?? 1) - 1 }))
    } else {
      next.add(emoji)
      setCounts(c => ({ ...c, [emoji]: (c[emoji] ?? 0) + 1 }))
    }
    setMine(next)
  }

  return (
    <div className="flex flex-wrap gap-2">
      {REACTIONS.map(r => {
        const count = counts[r.emoji] ?? 0
        const active = mine.has(r.emoji)
        return (
          <button key={r.emoji} onClick={() => toggle(r.emoji)}
            className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl text-sm cursor-pointer transition-all border
              ${active
                ? 'bg-sky-50 border-sky-300 text-sky-700 shadow-soft'
                : 'bg-slate-50 border-slate-200 text-slate-600 hover:border-sky-200 hover:bg-sky-50/50'}`}>
            <span className="text-base leading-none">{r.emoji}</span>
            {count > 0 && <span className="font-semibold text-xs tabular-nums">{count}</span>}
          </button>
        )
      })}
    </div>
  )
}

/* ── Review card ── */
function ReviewCard() {
  const [rating, setRating] = useState(0)
  const [submitted, setSubmitted] = useState(false)

  if (submitted) return (
    <div className="clay-card p-5 flex flex-col items-center gap-3 text-center" style={{ animation: 'fadeIn 0.3s ease' }}>
      <Heart className="w-8 h-8 text-pink-400 fill-pink-400" />
      <p className="font-heading font-bold text-slate-800">Thanks for your review!</p>
      <HalfStarDisplay value={rating} />
      <button onClick={() => { setRating(0); setSubmitted(false) }} className="text-xs text-slate-400 hover:text-slate-600 cursor-pointer transition-colors">Edit review</button>
    </div>
  )

  return (
    <div className="clay-card p-5 space-y-3">
      <p className="text-sm font-semibold text-slate-700">How would you rate this?</p>
      <StarRating value={rating} onChange={setRating} size="lg" />
      {rating > 0 && (
        <p className="text-xs text-slate-400" style={{ animation: 'fadeIn 0.15s ease' }}>
          {['','Terrible','Poor','Okay','Good','Excellent!'][rating]}
        </p>
      )}
      <button
        disabled={rating === 0}
        onClick={() => setSubmitted(true)}
        className="mt-1 w-full py-2 rounded-xl text-sm font-semibold cursor-pointer transition-all
          bg-sky-500 text-white shadow-clay hover:bg-sky-600 disabled:opacity-30 disabled:cursor-not-allowed">
        Submit review
      </button>
    </div>
  )
}

export function RatingShowcase() {
  const [s1, setS1] = useState(3)
  const [s2, setS2] = useState(0)

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-2 gap-8">
        <div className="space-y-5">
          <p className="section-label">Star Rating</p>
          <StarRating value={s1} onChange={setS1} label="Overall quality" />
          <StarRating value={s2} onChange={setS2} label="Ease of use" size="lg" />
          <StarRating value={4} readonly label="Design (read-only)" />
        </div>
        <div className="space-y-5">
          <p className="section-label">Half-star Display</p>
          <HalfStarDisplay value={4.5} max={5} reviews={2841} />
          <HalfStarDisplay value={3.7} max={5} reviews={519} />
          <HalfStarDisplay value={4.2} max={5} reviews={12043} />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-8">
        <div className="space-y-4">
          <p className="section-label">Thumbs Up / Down</p>
          <ThumbsRating />
          <p className="section-label">Emoji Reactions</p>
          <EmojiReactions />
        </div>
        <div>
          <p className="section-label">Review Card</p>
          <ReviewCard />
        </div>
      </div>
    </div>
  )
}
