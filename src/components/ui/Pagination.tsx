import { useState } from 'react'
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from 'lucide-react'

function usePagination(total: number, perPage: number) {
  const [page, setPage] = useState(1)
  const totalPages = Math.ceil(total / perPage)
  const go = (p: number) => setPage(Math.max(1, Math.min(totalPages, p)))
  return { page, totalPages, go }
}

function pages(current: number, total: number): (number | '…')[] {
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1)
  if (current <= 4) return [1, 2, 3, 4, 5, '…', total]
  if (current >= total - 3) return [1, '…', total - 4, total - 3, total - 2, total - 1, total]
  return [1, '…', current - 1, current, current + 1, '…', total]
}

export interface PagerProps {
  page: number; totalPages: number; go: (p: number) => void
  size?: 'sm' | 'md'
  variant?: 'default' | 'rounded' | 'minimal'
}

export function Pager({ page, totalPages, go, size = 'md', variant = 'default' }: PagerProps) {
  const btns = pages(page, totalPages)
  const base = size === 'sm' ? 'w-7 h-7 text-xs' : 'w-9 h-9 text-sm'

  if (variant === 'minimal') {
    return (
      <div className="flex items-center gap-3">
        <button onClick={() => go(page - 1)} disabled={page === 1}
          className="flex items-center gap-1 text-sm font-semibold text-slate-500 hover:text-slate-800 disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer transition-colors">
          <ChevronLeft className="w-4 h-4" /> Prev
        </button>
        <span className="text-sm text-slate-500">Page <span className="font-bold text-slate-800">{page}</span> of {totalPages}</span>
        <button onClick={() => go(page + 1)} disabled={page === totalPages}
          className="flex items-center gap-1 text-sm font-semibold text-slate-500 hover:text-slate-800 disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer transition-colors">
          Next <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    )
  }

  const btnClass = (active: boolean) =>
    `${base} flex items-center justify-center font-semibold transition-all cursor-pointer
    ${variant === 'rounded' ? 'rounded-full' : 'rounded-xl'}
    ${active
      ? 'bg-sky-500 text-white shadow-clay'
      : 'text-slate-500 hover:bg-slate-100 hover:text-slate-800'}`

  return (
    <div className="flex items-center gap-1">
      <button onClick={() => go(1)} disabled={page === 1}
        className={`${base} flex items-center justify-center rounded-xl text-slate-400 hover:bg-slate-100 disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer transition-colors`}>
        <ChevronsLeft className="w-4 h-4" />
      </button>
      <button onClick={() => go(page - 1)} disabled={page === 1}
        className={`${base} flex items-center justify-center rounded-xl text-slate-400 hover:bg-slate-100 disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer transition-colors`}>
        <ChevronLeft className="w-4 h-4" />
      </button>

      {btns.map((b, i) =>
        b === '…'
          ? <span key={`e${i}`} className={`${base} flex items-center justify-center text-slate-400 select-none`}>…</span>
          : <button key={b} onClick={() => go(b as number)} className={btnClass(b === page)}>{b}</button>
      )}

      <button onClick={() => go(page + 1)} disabled={page === totalPages}
        className={`${base} flex items-center justify-center rounded-xl text-slate-400 hover:bg-slate-100 disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer transition-colors`}>
        <ChevronRight className="w-4 h-4" />
      </button>
      <button onClick={() => go(totalPages)} disabled={page === totalPages}
        className={`${base} flex items-center justify-center rounded-xl text-slate-400 hover:bg-slate-100 disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer transition-colors`}>
        <ChevronsRight className="w-4 h-4" />
      </button>
    </div>
  )
}

function JumpToPager({ page, totalPages, go }: PagerProps) {
  const [input, setInput] = useState('')
  const submit = (e: React.FormEvent) => {
    e.preventDefault()
    const n = parseInt(input)
    if (!isNaN(n)) { go(n); setInput('') }
  }
  return (
    <div className="flex items-center gap-3 flex-wrap">
      <Pager page={page} totalPages={totalPages} go={go} size="sm" />
      <form onSubmit={submit} className="flex items-center gap-2 ml-2">
        <span className="text-xs text-slate-400">Go to</span>
        <input value={input} onChange={e => setInput(e.target.value)}
          className="w-14 border-2 border-slate-200 rounded-xl px-2 py-1 text-sm text-center focus:border-sky-400 focus:outline-none transition-colors"
          placeholder="…" />
        <button type="submit" className="text-xs font-semibold px-3 py-1.5 bg-slate-100 hover:bg-slate-200 rounded-xl cursor-pointer transition-colors text-slate-600">Go</button>
      </form>
    </div>
  )
}

/* ── Paginated list demo ── */
const ITEMS = Array.from({ length: 47 }, (_, i) => ({
  id: i + 1,
  name: ['Aurora', 'Nova', 'Nexus', 'Pulse', 'Echo', 'Flux', 'Orbit', 'Spark'][i % 8] + ` ${String.fromCharCode(65 + (i % 26))}`,
  status: ['Active', 'Pending', 'Archived'][i % 3],
  date: `May ${(i % 28) + 1}, 2026`,
}))

const STATUS_COLOR: Record<string, string> = {
  Active: 'bg-emerald-100 text-emerald-700',
  Pending: 'bg-amber-100 text-amber-700',
  Archived: 'bg-slate-100 text-slate-500',
}

function PaginatedList() {
  const PER_PAGE = 6
  const { page, totalPages, go } = usePagination(ITEMS.length, PER_PAGE)
  const slice = ITEMS.slice((page - 1) * PER_PAGE, page * PER_PAGE)

  return (
    <div className="space-y-3">
      <div className="divide-y divide-slate-50">
        {slice.map(item => (
          <div key={item.id} className="flex items-center gap-3 py-2.5">
            <div className="w-7 h-7 rounded-full bg-sky-100 text-sky-600 text-xs font-bold flex items-center justify-center shrink-0">{item.id}</div>
            <span className="flex-1 text-sm font-medium text-slate-700">{item.name}</span>
            <span className={`text-[11px] font-bold px-2 py-0.5 rounded-full ${STATUS_COLOR[item.status]}`}>{item.status}</span>
            <span className="text-xs text-slate-400 shrink-0">{item.date}</span>
          </div>
        ))}
      </div>
      <div className="flex items-center justify-between pt-2 border-t border-slate-100">
        <span className="text-xs text-slate-400">{ITEMS.length} items · Page {page} of {totalPages}</span>
        <Pager page={page} totalPages={totalPages} go={go} size="sm" />
      </div>
    </div>
  )
}

export function PaginationShowcase() {
  const p1 = usePagination(230, 10)
  const p2 = usePagination(150, 10)
  const p3 = usePagination(89, 10)

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-2 gap-8">
        <div className="space-y-6">
          <div>
            <p className="section-label">Default</p>
            <Pager {...p1} />
          </div>
          <div>
            <p className="section-label">Rounded Pills</p>
            <Pager {...p2} variant="rounded" />
          </div>
          <div>
            <p className="section-label">Minimal</p>
            <Pager {...p3} variant="minimal" />
          </div>
          <div>
            <p className="section-label">With Jump-to</p>
            <JumpToPager {...p1} />
          </div>
        </div>
        <div>
          <p className="section-label">Paginated List</p>
          <PaginatedList />
        </div>
      </div>
    </div>
  )
}
