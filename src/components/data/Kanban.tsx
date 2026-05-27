import { useState, useRef } from 'react'
import { Plus, MoreHorizontal, Paperclip, MessageSquare, X, Check } from 'lucide-react'

export type Priority = 'low' | 'medium' | 'high' | 'critical'
export type Tag = { label: string; color: string }

export interface Card {
  id: string
  title: string
  priority: Priority
  tags: Tag[]
  assignees: string[]
  comments: number
  attachments: number
  dueDate?: string
}

export interface Column {
  id: string
  title: string
  color: string
  accent: string
  cards: Card[]
}

const priorityConfig: Record<Priority, { label: string; color: string; dot: string }> = {
  low:      { label: 'Low',      color: 'bg-slate-100 text-slate-500',   dot: 'bg-slate-400' },
  medium:   { label: 'Medium',   color: 'bg-amber-100 text-amber-600',   dot: 'bg-amber-400' },
  high:     { label: 'High',     color: 'bg-orange-100 text-orange-600', dot: 'bg-orange-400' },
  critical: { label: 'Critical', color: 'bg-red-100 text-red-600',       dot: 'bg-red-500' },
}

const avatarColor = (s: string) => `hsl(${([...s].reduce((a,c) => a + c.charCodeAt(0), 0)) % 360}, 55%, 65%)`

const initialColumns: Column[] = [
  {
    id: 'backlog', title: 'Backlog', color: 'bg-slate-50', accent: 'bg-slate-300',
    cards: [
      { id: 'c1', title: 'Research competitor onboarding flows', priority: 'low',    tags: [{ label: 'Research', color: 'bg-violet-100 text-violet-600' }], assignees: ['S'], comments: 2, attachments: 0 },
      { id: 'c2', title: 'Set up error monitoring with Sentry',  priority: 'medium', tags: [{ label: 'Infra', color: 'bg-slate-100 text-slate-600' }],     assignees: ['M'], comments: 0, attachments: 1, dueDate: 'Jun 12' },
      { id: 'c3', title: 'Audit accessibility across all forms', priority: 'high',   tags: [{ label: 'A11y', color: 'bg-emerald-100 text-emerald-600' }],  assignees: ['A','S'], comments: 5, attachments: 0 },
    ],
  },
  {
    id: 'inprogress', title: 'In Progress', color: 'bg-sky-50/40', accent: 'bg-sky-400',
    cards: [
      { id: 'c4', title: 'Redesign dashboard stat cards',        priority: 'high',     tags: [{ label: 'Design', color: 'bg-sky-100 text-sky-600' }],      assignees: ['S'], comments: 4, attachments: 3, dueDate: 'May 28' },
      { id: 'c5', title: 'Implement command palette ⌘K',         priority: 'critical', tags: [{ label: 'Feature', color: 'bg-pink-100 text-pink-600' }],   assignees: ['M','J'], comments: 7, attachments: 1, dueDate: 'May 30' },
      { id: 'c6', title: 'Write unit tests for auth flow',       priority: 'medium',   tags: [{ label: 'Testing', color: 'bg-amber-100 text-amber-600' }], assignees: ['J'], comments: 1, attachments: 0 },
    ],
  },
  {
    id: 'review', title: 'Review', color: 'bg-violet-50/30', accent: 'bg-violet-400',
    cards: [
      { id: 'c7', title: 'Toast notification system',            priority: 'high',   tags: [{ label: 'Feature', color: 'bg-pink-100 text-pink-600' }],    assignees: ['M'], comments: 3, attachments: 2 },
      { id: 'c8', title: 'Mobile nav drawer component',          priority: 'medium', tags: [{ label: 'Design', color: 'bg-sky-100 text-sky-600' }],       assignees: ['S','A'], comments: 2, attachments: 1, dueDate: 'Jun 2' },
    ],
  },
  {
    id: 'done', title: 'Done', color: 'bg-emerald-50/30', accent: 'bg-emerald-400',
    cards: [
      { id: 'c9',  title: 'Set up Vite + Tailwind project',      priority: 'low',    tags: [{ label: 'Infra', color: 'bg-slate-100 text-slate-600' }],    assignees: ['M'], comments: 0, attachments: 0 },
      { id: 'c10', title: 'Button component library',            priority: 'medium', tags: [{ label: 'Design', color: 'bg-sky-100 text-sky-600' }],       assignees: ['S'], comments: 6, attachments: 4 },
      { id: 'c11', title: 'Recharts integration',                priority: 'medium', tags: [{ label: 'Feature', color: 'bg-pink-100 text-pink-600' }],    assignees: ['M','J'], comments: 2, attachments: 0 },
    ],
  },
]

function KanbanCard({ card, onDragStart }: { card: Card; onDragStart: (e: React.DragEvent) => void }) {
  const p = priorityConfig[card.priority]
  return (
    <div
      draggable
      onDragStart={onDragStart}
      className="bg-white rounded-clay border border-slate-100 p-3.5 shadow-soft cursor-grab active:cursor-grabbing hover:-translate-y-0.5 hover:shadow-clay transition-all duration-150 select-none group"
    >
      {/* Tags */}
      {card.tags.length > 0 && (
        <div className="flex flex-wrap gap-1 mb-2.5">
          {card.tags.map(t => (
            <span key={t.label} className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${t.color}`}>{t.label}</span>
          ))}
        </div>
      )}

      {/* Title */}
      <p className="text-sm font-semibold text-slate-700 leading-snug">{card.title}</p>

      {/* Priority + Due */}
      <div className="flex items-center gap-2 mt-2.5">
        <span className={`flex items-center gap-1 text-[10px] font-bold px-1.5 py-0.5 rounded-md ${p.color}`}>
          <span className={`w-1.5 h-1.5 rounded-full ${p.dot}`} />
          {p.label}
        </span>
        {card.dueDate && <span className="text-[10px] text-slate-400 font-medium ml-auto">{card.dueDate}</span>}
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between mt-3 pt-2.5 border-t border-slate-50">
        {/* Assignees */}
        <div className="flex -space-x-1.5">
          {card.assignees.map(a => (
            <div key={a} className="w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold text-white border-2 border-white"
              style={{ background: avatarColor(a) }}>
              {a}
            </div>
          ))}
        </div>
        {/* Meta */}
        <div className="flex items-center gap-2.5 text-slate-400">
          {card.comments > 0 && (
            <span className="flex items-center gap-1 text-[10px]">
              <MessageSquare className="w-3 h-3" />{card.comments}
            </span>
          )}
          {card.attachments > 0 && (
            <span className="flex items-center gap-1 text-[10px]">
              <Paperclip className="w-3 h-3" />{card.attachments}
            </span>
          )}
        </div>
      </div>
    </div>
  )
}

function AddCardForm({ onAdd, onCancel }: { onAdd: (title: string) => void; onCancel: () => void }) {
  const [title, setTitle] = useState('')
  const submit = () => { if (title.trim()) { onAdd(title.trim()); setTitle('') } }
  return (
    <div className="space-y-2">
      <textarea
        autoFocus
        value={title}
        onChange={e => setTitle(e.target.value)}
        onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); submit() } if (e.key === 'Escape') onCancel() }}
        placeholder="Card title…"
        rows={2}
        className="w-full text-sm text-slate-700 placeholder-slate-300 bg-white border border-sky-300 ring-2 ring-sky-100 rounded-xl px-3 py-2 focus:outline-none resize-none shadow-soft"
      />
      <div className="flex items-center gap-2">
        <button onClick={submit} className="flex items-center gap-1 bg-sky-500 text-white text-xs font-bold px-3 py-1.5 rounded-lg cursor-pointer hover:bg-sky-600 shadow-clay transition-colors">
          <Check className="w-3.5 h-3.5" />Add
        </button>
        <button onClick={onCancel} className="w-6 h-6 flex items-center justify-center rounded-lg text-slate-400 hover:bg-slate-200 cursor-pointer transition-colors">
          <X className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  )
}

export function KanbanShowcase() {
  const [columns, setColumns] = useState<Column[]>(initialColumns)
  const [adding, setAdding] = useState<string | null>(null)
  const dragCard = useRef<{ cardId: string; fromCol: string } | null>(null)
  const [dragOverCol, setDragOverCol] = useState<string | null>(null)

  const onDragStart = (e: React.DragEvent, cardId: string, fromCol: string) => {
    dragCard.current = { cardId, fromCol }
    e.dataTransfer.effectAllowed = 'move'
  }

  const onDrop = (e: React.DragEvent, toColId: string) => {
    e.preventDefault()
    if (!dragCard.current) return
    const { cardId, fromCol } = dragCard.current
    if (fromCol === toColId) { setDragOverCol(null); return }

    setColumns(cols => {
      const from = cols.find(c => c.id === fromCol)!
      const to   = cols.find(c => c.id === toColId)!
      const card = from.cards.find(c => c.id === cardId)!
      return cols.map(col => {
        if (col.id === fromCol) return { ...col, cards: col.cards.filter(c => c.id !== cardId) }
        if (col.id === toColId) return { ...col, cards: [...col.cards, card] }
        return col
      })
    })
    dragCard.current = null
    setDragOverCol(null)
  }

  const addCard = (colId: string, title: string) => {
    const newCard: Card = {
      id: Math.random().toString(36).slice(2),
      title,
      priority: 'medium',
      tags: [],
      assignees: ['M'],
      comments: 0,
      attachments: 0,
    }
    setColumns(cols => cols.map(col => col.id === colId ? { ...col, cards: [...col.cards, newCard] } : col))
    setAdding(null)
  }

  return (
    <div className="space-y-4">
      <p className="section-label">Kanban Board</p>
      <p className="text-xs text-slate-400">Drag cards between columns. Click + to add a new card.</p>

      <div className="flex gap-4 overflow-x-auto pb-4">
        {columns.map(col => (
          <div key={col.id}
            onDragOver={e => { e.preventDefault(); setDragOverCol(col.id) }}
            onDragLeave={() => setDragOverCol(null)}
            onDrop={e => onDrop(e, col.id)}
            className={`flex-shrink-0 w-72 rounded-clay-lg border transition-all duration-150 ${dragOverCol === col.id ? 'border-sky-300 ring-2 ring-sky-100 bg-sky-50/30' : 'border-slate-100 bg-slate-50/60'}`}
          >
            {/* Column header */}
            <div className="px-4 pt-4 pb-3 flex items-center gap-2">
              <div className={`w-2.5 h-2.5 rounded-full ${col.accent}`} />
              <h4 className="font-heading font-bold text-slate-700 text-sm flex-1">{col.title}</h4>
              <span className="text-xs font-bold bg-white border border-slate-200 text-slate-500 w-5 h-5 flex items-center justify-center rounded-full shadow-soft">
                {col.cards.length}
              </span>
              <button className="w-6 h-6 flex items-center justify-center rounded-lg text-slate-300 hover:text-slate-500 hover:bg-white cursor-pointer transition-colors">
                <MoreHorizontal className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Cards */}
            <div className="px-3 space-y-2 min-h-[120px]">
              {col.cards.map(card => (
                <KanbanCard key={card.id} card={card}
                  onDragStart={e => onDragStart(e, card.id, col.id)}
                />
              ))}
              {col.cards.length === 0 && dragOverCol !== col.id && (
                <div className="h-20 rounded-xl border-2 border-dashed border-slate-200 flex items-center justify-center">
                  <p className="text-xs text-slate-300">Drop here</p>
                </div>
              )}
              {dragOverCol === col.id && (
                <div className="h-16 rounded-xl border-2 border-dashed border-sky-300 bg-sky-50/50 flex items-center justify-center">
                  <p className="text-xs text-sky-400 font-medium">Release to drop</p>
                </div>
              )}
            </div>

            {/* Add card */}
            <div className="px-3 pb-3 pt-2">
              {adding === col.id ? (
                <AddCardForm onAdd={t => addCard(col.id, t)} onCancel={() => setAdding(null)} />
              ) : (
                <button onClick={() => setAdding(col.id)}
                  className="w-full flex items-center gap-1.5 text-xs text-slate-400 hover:text-slate-600 hover:bg-white rounded-xl px-2 py-2 cursor-pointer transition-all duration-150 group">
                  <Plus className="w-3.5 h-3.5 group-hover:text-sky-500 transition-colors" />Add card
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
