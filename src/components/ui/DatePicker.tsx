import { useState, useRef, useEffect } from 'react'
import { ChevronLeft, ChevronRight, Calendar, X } from 'lucide-react'

const DAYS = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa']
const MONTHS = ['January','February','March','April','May','June','July','August','September','October','November','December']

function isSameDay(a: Date, b: Date) {
  return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate()
}
function isBetween(d: Date, start: Date, end: Date) {
  const t = d.getTime()
  return t > Math.min(start.getTime(), end.getTime()) && t < Math.max(start.getTime(), end.getTime())
}
function fmt(d: Date) {
  return `${MONTHS[d.getMonth()].slice(0,3)} ${d.getDate()}, ${d.getFullYear()}`
}
function fmtShort(d: Date) {
  return `${d.getDate()} ${MONTHS[d.getMonth()].slice(0,3)} ${d.getFullYear()}`
}

/* ─── Shared calendar grid ─── */
interface CalendarProps {
  viewYear: number
  viewMonth: number
  onPrev: () => void
  onNext: () => void
  renderDay: (day: Date, idx: number) => React.ReactNode
  today: Date
}

function CalendarGrid({ viewYear, viewMonth, onPrev, onNext, renderDay }: CalendarProps) {
  const firstDay = new Date(viewYear, viewMonth, 1).getDay()
  const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate()
  const cells: (Date | null)[] = [
    ...Array(firstDay).fill(null),
    ...Array.from({ length: daysInMonth }, (_, i) => new Date(viewYear, viewMonth, i + 1)),
  ]
  while (cells.length % 7 !== 0) cells.push(null)

  return (
    <div>
      {/* Nav */}
      <div className="flex items-center justify-between mb-4">
        <button onClick={onPrev} className="w-8 h-8 flex items-center justify-center rounded-xl hover:bg-slate-100 cursor-pointer transition-colors text-slate-400 hover:text-slate-600">
          <ChevronLeft className="w-4 h-4" />
        </button>
        <span className="font-heading font-bold text-slate-800 text-sm">{MONTHS[viewMonth]} {viewYear}</span>
        <button onClick={onNext} className="w-8 h-8 flex items-center justify-center rounded-xl hover:bg-slate-100 cursor-pointer transition-colors text-slate-400 hover:text-slate-600">
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
      {/* Day headers */}
      <div className="grid grid-cols-7 mb-1">
        {DAYS.map(d => <div key={d} className="h-8 flex items-center justify-center text-xs font-bold text-slate-400">{d}</div>)}
      </div>
      {/* Days */}
      <div className="grid grid-cols-7 gap-y-0.5">
        {cells.map((day, i) => day ? renderDay(day, i) : <div key={`e-${i}`} />)}
      </div>
    </div>
  )
}

/* ─── Single date picker ─── */
export function SinglePicker({ label }: { label?: string }) {
  const today = new Date()
  const [selected, setSelected] = useState<Date | null>(null)
  const [open, setOpen] = useState(false)
  const [viewYear, setViewYear] = useState(today.getFullYear())
  const [viewMonth, setViewMonth] = useState(today.getMonth())
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handler = (e: MouseEvent) => { if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false) }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  const prev = () => { if (viewMonth === 0) { setViewYear(y => y - 1); setViewMonth(11) } else setViewMonth(m => m - 1) }
  const next = () => { if (viewMonth === 11) { setViewYear(y => y + 1); setViewMonth(0) } else setViewMonth(m => m + 1) }

  return (
    <div className="space-y-1.5" ref={ref}>
      {label && <label className="block text-sm font-semibold text-slate-700">{label}</label>}
      <div className="relative">
        <button onClick={() => setOpen(o => !o)}
          className={`w-full flex items-center gap-2 px-4 py-3 rounded-clay border bg-white text-sm shadow-soft cursor-pointer transition-all duration-200 ${open ? 'border-sky-300 ring-2 ring-sky-200' : 'border-slate-200 hover:border-slate-300'}`}>
          <Calendar className="w-4 h-4 text-slate-400 shrink-0" />
          <span className={`flex-1 text-left ${selected ? 'text-slate-800 font-medium' : 'text-slate-400'}`}>
            {selected ? fmt(selected) : 'Pick a date'}
          </span>
          {selected && (
            <button onClick={e => { e.stopPropagation(); setSelected(null) }} className="text-slate-300 hover:text-slate-500 transition-colors cursor-pointer">
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </button>

        {open && (
          <div className="absolute z-20 top-full mt-1.5 bg-white border border-slate-100 rounded-clay-lg shadow-clay-lg p-4 w-72"
            style={{ animation: 'slideDown 0.15s ease' }}>
            <CalendarGrid viewYear={viewYear} viewMonth={viewMonth} onPrev={prev} onNext={next} today={today}
              renderDay={(day, i) => {
                const isToday    = isSameDay(day, today)
                const isSelected = selected ? isSameDay(day, selected) : false
                return (
                  <button key={i} onClick={() => { setSelected(day); setOpen(false) }}
                    className={`h-8 w-full flex items-center justify-center text-xs font-medium rounded-xl cursor-pointer transition-all duration-150
                      ${isSelected ? 'bg-sky-500 text-white shadow-clay font-bold' : isToday ? 'bg-sky-50 text-sky-600 font-bold' : 'text-slate-700 hover:bg-slate-100'}`}>
                    {day.getDate()}
                  </button>
                )
              }}
            />
          </div>
        )}
      </div>
    </div>
  )
}

/* ─── Range picker ─── */
export function RangePicker({ label }: { label?: string }) {
  const today = new Date()
  const [range, setRange] = useState<{ start: Date | null; end: Date | null }>({ start: null, end: null })
  const [hover, setHover] = useState<Date | null>(null)
  const [open, setOpen] = useState(false)
  const [viewYear, setViewYear] = useState(today.getFullYear())
  const [viewMonth, setViewMonth] = useState(today.getMonth())
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handler = (e: MouseEvent) => { if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false) }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  const prev = () => { if (viewMonth === 0) { setViewYear(y => y - 1); setViewMonth(11) } else setViewMonth(m => m - 1) }
  const next = () => { if (viewMonth === 11) { setViewYear(y => y + 1); setViewMonth(0) } else setViewMonth(m => m + 1) }

  const handleDay = (day: Date) => {
    if (!range.start || (range.start && range.end)) {
      setRange({ start: day, end: null })
    } else {
      const end = day < range.start ? range.start : day
      const start = day < range.start ? day : range.start
      setRange({ start, end })
    }
  }

  const selecting = range.start && !range.end
  const hoverEnd = selecting && hover ? (hover < range.start! ? range.start! : hover) : null
  const hoverStart = selecting && hover ? (hover < range.start! ? hover : range.start!) : null

  const displayValue = range.start && range.end
    ? `${fmtShort(range.start)} → ${fmtShort(range.end)}`
    : range.start ? `${fmtShort(range.start)} → …` : 'Select date range'

  return (
    <div className="space-y-1.5" ref={ref}>
      {label && <label className="block text-sm font-semibold text-slate-700">{label}</label>}
      <div className="relative">
        <button onClick={() => setOpen(o => !o)}
          className={`w-full flex items-center gap-2 px-4 py-3 rounded-clay border bg-white text-sm shadow-soft cursor-pointer transition-all duration-200 ${open ? 'border-sky-300 ring-2 ring-sky-200' : 'border-slate-200 hover:border-slate-300'}`}>
          <Calendar className="w-4 h-4 text-slate-400 shrink-0" />
          <span className={`flex-1 text-left ${range.start ? 'text-slate-800 font-medium' : 'text-slate-400'}`}>{displayValue}</span>
          {range.start && (
            <button onClick={e => { e.stopPropagation(); setRange({ start: null, end: null }) }} className="text-slate-300 hover:text-slate-500 cursor-pointer transition-colors">
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </button>

        {open && (
          <div className="absolute z-20 top-full mt-1.5 bg-white border border-slate-100 rounded-clay-lg shadow-clay-lg p-4 w-72"
            style={{ animation: 'slideDown 0.15s ease' }}>
            <CalendarGrid viewYear={viewYear} viewMonth={viewMonth} onPrev={prev} onNext={next} today={today}
              renderDay={(day, i) => {
                const isStart    = range.start ? isSameDay(day, range.start) : false
                const isEnd      = range.end   ? isSameDay(day, range.end)   : false
                const inRange    = range.start && range.end ? isBetween(day, range.start, range.end) : false
                const inHover    = hoverStart && hoverEnd   ? isBetween(day, hoverStart, hoverEnd) || isSameDay(day, hoverStart) || isSameDay(day, hoverEnd) : false
                const isToday    = isSameDay(day, today)
                const isEdge     = isStart || isEnd

                return (
                  <button key={i}
                    onClick={() => handleDay(day)}
                    onMouseEnter={() => setHover(day)}
                    onMouseLeave={() => setHover(null)}
                    className={`h-8 w-full flex items-center justify-center text-xs font-medium cursor-pointer transition-all duration-100
                      ${isEdge ? 'bg-sky-500 text-white font-bold rounded-xl shadow-soft z-10 relative' :
                        inRange || inHover ? 'bg-sky-100 text-sky-700 rounded-none' :
                        isToday ? 'text-sky-600 font-bold rounded-xl hover:bg-sky-50' :
                        'text-slate-700 hover:bg-slate-100 rounded-xl'}`}>
                    {day.getDate()}
                  </button>
                )
              }}
            />
            {range.start && !range.end && (
              <p className="text-center text-xs text-slate-400 mt-3">Now click an end date</p>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

/* ─── Inline calendar ─── */
export function InlineCalendar() {
  const today = new Date()
  const [selected, setSelected] = useState<Date>(today)
  const [viewYear, setViewYear] = useState(today.getFullYear())
  const [viewMonth, setViewMonth] = useState(today.getMonth())

  const prev = () => { if (viewMonth === 0) { setViewYear(y => y - 1); setViewMonth(11) } else setViewMonth(m => m - 1) }
  const next = () => { if (viewMonth === 11) { setViewYear(y => y + 1); setViewMonth(0) } else setViewMonth(m => m + 1) }

  const events: Record<number, string> = { 3: 'bg-pink-400', 9: 'bg-emerald-400', 17: 'bg-sky-400', 22: 'bg-violet-400', 28: 'bg-amber-400' }

  return (
    <div className="clay-card p-5 w-72">
      <CalendarGrid viewYear={viewYear} viewMonth={viewMonth} onPrev={prev} onNext={next} today={today}
        renderDay={(day, i) => {
          const isToday    = isSameDay(day, today)
          const isSelected = isSameDay(day, selected)
          const dot        = events[day.getDate()]
          return (
            <button key={i} onClick={() => setSelected(day)}
              className={`h-8 w-full flex flex-col items-center justify-center text-xs font-medium rounded-xl cursor-pointer transition-all duration-150 relative
                ${isSelected ? 'bg-sky-500 text-white shadow-clay font-bold' : isToday ? 'bg-sky-50 text-sky-600 font-bold' : 'text-slate-700 hover:bg-slate-100'}`}>
              {day.getDate()}
              {dot && !isSelected && <span className={`absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full ${dot}`} />}
            </button>
          )
        }}
      />
      <div className="mt-4 pt-3 border-t border-slate-100">
        <p className="text-xs text-slate-400 text-center">
          Selected: <span className="font-semibold text-slate-700">{fmt(selected)}</span>
        </p>
      </div>
    </div>
  )
}

export function DatePickerShowcase() {
  return (
    <div className="grid grid-cols-3 gap-8">
      <div>
        <p className="section-label">Single Date</p>
        <SinglePicker label="Date of birth" />
      </div>
      <div>
        <p className="section-label">Date Range</p>
        <RangePicker label="Booking period" />
      </div>
      <div>
        <p className="section-label">Inline Calendar</p>
        <InlineCalendar />
      </div>
    </div>
  )
}
