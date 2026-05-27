import { useState } from 'react'
import { ChevronLeft, ChevronRight, Plus, X } from 'lucide-react'

export interface CalEvent {
  id: string
  date: string // YYYY-MM-DD
  title: string
  color: string
  time?: string
}

const TODAY = new Date()
const PAD = (n: number) => String(n).padStart(2, '0')
const FMT = (d: Date) => `${d.getFullYear()}-${PAD(d.getMonth() + 1)}-${PAD(d.getDate())}`

const INITIAL_EVENTS: CalEvent[] = [
  { id: 'e1', date: FMT(new Date(TODAY.getFullYear(), TODAY.getMonth(), 3)),  title: 'Design review',   color: '#0ea5e9', time: '10:00' },
  { id: 'e2', date: FMT(new Date(TODAY.getFullYear(), TODAY.getMonth(), 3)),  title: 'Team standup',    color: '#8b5cf6', time: '09:00' },
  { id: 'e3', date: FMT(new Date(TODAY.getFullYear(), TODAY.getMonth(), 8)),  title: 'Ship v2.0',       color: '#10b981', time: '14:00' },
  { id: 'e4', date: FMT(new Date(TODAY.getFullYear(), TODAY.getMonth(), 12)), title: 'Client call',     color: '#f59e0b', time: '15:30' },
  { id: 'e5', date: FMT(new Date(TODAY.getFullYear(), TODAY.getMonth(), 15)), title: 'Sprint planning', color: '#ec4899', time: '11:00' },
  { id: 'e6', date: FMT(new Date(TODAY.getFullYear(), TODAY.getMonth(), 15)), title: 'Lunch w/ Sophie', color: '#f97316', time: '12:30' },
  { id: 'e7', date: FMT(TODAY), title: 'Today\'s focus', color: '#10b981', time: '09:00' },
  { id: 'e8', date: FMT(new Date(TODAY.getFullYear(), TODAY.getMonth(), 22)), title: 'Board meeting',   color: '#ef4444', time: '16:00' },
  { id: 'e9', date: FMT(new Date(TODAY.getFullYear(), TODAY.getMonth(), 28)), title: 'Month retro',     color: '#8b5cf6', time: '13:00' },
]

const MONTHS = ['January','February','March','April','May','June','July','August','September','October','November','December']
const DAYS = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat']

export function FullCalendarShowcase() {
  const [year,  setYear]  = useState(TODAY.getFullYear())
  const [month, setMonth] = useState(TODAY.getMonth())
  const [events, setEvents] = useState(INITIAL_EVENTS)
  const [selected, setSelected] = useState<string | null>(FMT(TODAY))
  const [adding, setAdding] = useState(false)
  const [newTitle, setNewTitle] = useState('')

  const prev = () => { if (month === 0) { setMonth(11); setYear(y => y - 1) } else setMonth(m => m - 1) }
  const next = () => { if (month === 11) { setMonth(0);  setYear(y => y + 1) } else setMonth(m => m + 1) }

  const firstDay = new Date(year, month, 1).getDay()
  const daysInMonth = new Date(year, month + 1, 0).getDate()
  const cells = Array.from({ length: firstDay + daysInMonth }, (_, i) => i < firstDay ? null : i - firstDay + 1)
  while (cells.length % 7 !== 0) cells.push(null)

  const eventsForDay = (day: number) => {
    const key = `${year}-${PAD(month + 1)}-${PAD(day)}`
    return events.filter(e => e.date === key)
  }

  const selectedEvents = selected ? events.filter(e => e.date === selected) : []

  const addEvent = () => {
    if (!selected || !newTitle.trim()) return
    setEvents(prev => [...prev, {
      id: Date.now().toString(),
      date: selected,
      title: newTitle.trim(),
      color: ['#0ea5e9','#8b5cf6','#10b981','#f59e0b','#ec4899'][Math.floor(Math.random() * 5)],
      time: '10:00',
    }])
    setNewTitle('')
    setAdding(false)
  }

  return (
    <div className="grid grid-cols-3 gap-6">
      {/* Calendar grid — takes 2 cols */}
      <div className="col-span-2 clay-card overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100">
          <h3 className="font-heading font-bold text-slate-800">{MONTHS[month]} {year}</h3>
          <div className="flex gap-1">
            <button onClick={prev} className="w-8 h-8 flex items-center justify-center rounded-xl hover:bg-slate-100 cursor-pointer transition-colors text-slate-500">
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button onClick={() => { setYear(TODAY.getFullYear()); setMonth(TODAY.getMonth()); setSelected(FMT(TODAY)) }}
              className="text-xs font-bold px-3 py-1.5 rounded-xl hover:bg-slate-100 cursor-pointer transition-colors text-slate-500">
              Today
            </button>
            <button onClick={next} className="w-8 h-8 flex items-center justify-center rounded-xl hover:bg-slate-100 cursor-pointer transition-colors text-slate-500">
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Day headers */}
        <div className="grid grid-cols-7 border-b border-slate-100">
          {DAYS.map(d => (
            <div key={d} className="py-2 text-center text-[11px] font-bold text-slate-400 uppercase tracking-widest">
              {d}
            </div>
          ))}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-7">
          {cells.map((day, i) => {
            if (!day) return <div key={i} className="border-b border-r border-slate-50 h-20" />
            const key = `${year}-${PAD(month + 1)}-${PAD(day)}`
            const isToday = key === FMT(TODAY)
            const isSelected = key === selected
            const dayEvents = eventsForDay(day)
            const isWeekend = (i % 7 === 0 || i % 7 === 6)

            return (
              <div key={i} onClick={() => setSelected(key)}
                className={`border-b border-r border-slate-50 h-20 p-1.5 cursor-pointer transition-colors
                  ${isSelected ? 'bg-sky-50' : isWeekend ? 'bg-slate-50/40 hover:bg-slate-50' : 'hover:bg-slate-50'}`}>
                <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold mb-1 transition-colors
                  ${isToday ? 'bg-sky-500 text-white shadow-clay' : isSelected ? 'text-sky-600' : 'text-slate-600'}`}>
                  {day}
                </div>
                <div className="space-y-0.5">
                  {dayEvents.slice(0, 2).map(ev => (
                    <div key={ev.id} className="text-[9px] font-semibold px-1.5 py-0.5 rounded-md truncate text-white leading-tight"
                      style={{ background: ev.color }}>
                      {ev.title}
                    </div>
                  ))}
                  {dayEvents.length > 2 && (
                    <div className="text-[9px] text-slate-400 font-medium px-1">+{dayEvents.length - 2}</div>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Sidebar — 1 col */}
      <div className="flex flex-col gap-3">
        <div className="clay-card p-4 flex-1">
          <div className="flex items-center justify-between mb-3">
            <div>
              <p className="text-sm font-bold text-slate-800">
                {selected ? new Date(selected + 'T00:00').toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' }) : 'No date selected'}
              </p>
              <p className="text-xs text-slate-400">{selectedEvents.length} event{selectedEvents.length !== 1 ? 's' : ''}</p>
            </div>
            <button onClick={() => setAdding(true)}
              className="w-7 h-7 bg-sky-500 hover:bg-sky-600 text-white rounded-xl flex items-center justify-center shadow-clay cursor-pointer transition-colors">
              <Plus className="w-3.5 h-3.5" />
            </button>
          </div>

          {adding && (
            <div className="flex gap-2 mb-3" style={{ animation: 'fadeIn 0.15s ease' }}>
              <input autoFocus value={newTitle} onChange={e => setNewTitle(e.target.value)}
                onKeyDown={e => { if (e.key === 'Enter') addEvent(); if (e.key === 'Escape') setAdding(false) }}
                placeholder="Event name…"
                className="flex-1 text-xs border-2 border-slate-200 rounded-xl px-2.5 py-1.5 focus:border-sky-400 focus:outline-none transition-colors" />
              <button onClick={addEvent} className="text-xs font-bold bg-sky-500 text-white px-2.5 py-1.5 rounded-xl cursor-pointer hover:bg-sky-600 transition-colors">Add</button>
              <button onClick={() => setAdding(false)} className="text-slate-400 hover:text-slate-600 cursor-pointer">
                <X className="w-4 h-4" />
              </button>
            </div>
          )}

          <div className="space-y-2">
            {selectedEvents.length === 0 && (
              <p className="text-xs text-slate-400 text-center py-6">No events — click + to add one</p>
            )}
            {selectedEvents.map(ev => (
              <div key={ev.id} className="flex items-center gap-2.5 p-2.5 rounded-xl bg-slate-50 group">
                <div className="w-2 h-8 rounded-full shrink-0" style={{ background: ev.color }} />
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-semibold text-slate-800 truncate">{ev.title}</p>
                  {ev.time && <p className="text-[10px] text-slate-400">{ev.time}</p>}
                </div>
                <button onClick={() => setEvents(prev => prev.filter(e => e.id !== ev.id))}
                  className="opacity-0 group-hover:opacity-100 text-slate-300 hover:text-red-400 cursor-pointer transition-all">
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Mini legend */}
        <div className="clay-card p-3">
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">This month</p>
          <p className="text-2xl font-heading font-bold text-slate-800">{events.filter(e => e.date.startsWith(`${year}-${PAD(month + 1)}`)).length}</p>
          <p className="text-xs text-slate-400">events scheduled</p>
        </div>
      </div>
    </div>
  )
}
