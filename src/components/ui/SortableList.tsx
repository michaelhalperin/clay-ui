import { useState, useRef, useCallback } from 'react'
import { GripVertical, Plus, Trash2, Check, Bell, Shield, Zap, Users, Globe, Star } from 'lucide-react'

export interface Item { id: string; [key: string]: unknown }

export function useDragSort<T extends Item>(init: T[]) {
  const [items, setItems] = useState(init)
  const [dragIndex, setDragIndex] = useState<number | null>(null)
  const itemRefs = useRef<(HTMLElement | null)[]>([])
  const curDrag = useRef<number | null>(null)

  const startDrag = useCallback((index: number, e: React.PointerEvent) => {
    e.preventDefault()
    curDrag.current = index
    setDragIndex(index)

    const onMove = (ev: PointerEvent) => {
      const from = curDrag.current
      if (from === null) return

      // Find which slot the cursor is over by checking midpoints
      for (let i = 0; i < itemRefs.current.length; i++) {
        if (i === from) continue
        const rect = itemRefs.current[i]?.getBoundingClientRect()
        if (!rect) continue
        const mid = rect.top + rect.height / 2
        // Moving up: cursor above midpoint of item above
        // Moving down: cursor below midpoint of item below
        if ((i < from && ev.clientY < mid) || (i > from && ev.clientY > mid)) {
          setItems(prev => {
            const arr = [...prev]
            const [moved] = arr.splice(from, 1)
            arr.splice(i, 0, moved)
            return arr
          })
          curDrag.current = i
          setDragIndex(i)
          break
        }
      }
    }

    const onUp = () => {
      setDragIndex(null)
      curDrag.current = null
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('pointerup', onUp)
    }

    window.addEventListener('pointermove', onMove)
    window.addEventListener('pointerup', onUp)
  }, [])

  return { items, setItems, dragIndex, startDrag, itemRefs }
}

/* ── Sidebar sorter ─────────────────────────────────── */

interface SidebarItem extends Item {
  label: string; icon: React.ReactNode; color: string; enabled: boolean
}

const INITIAL: SidebarItem[] = [
  { id: '1', label: 'Notifications', icon: <Bell className="w-3.5 h-3.5" />,   color: '#0ea5e9', enabled: true },
  { id: '2', label: 'Security',      icon: <Shield className="w-3.5 h-3.5" />, color: '#8b5cf6', enabled: true },
  { id: '3', label: 'Performance',   icon: <Zap className="w-3.5 h-3.5" />,    color: '#f59e0b', enabled: false },
  { id: '4', label: 'Team access',   icon: <Users className="w-3.5 h-3.5" />,  color: '#10b981', enabled: true },
  { id: '5', label: 'Integrations',  icon: <Globe className="w-3.5 h-3.5" />,  color: '#ec4899', enabled: true },
  { id: '6', label: 'Starred items', icon: <Star className="w-3.5 h-3.5" />,   color: '#f97316', enabled: false },
]

function SidebarSorter() {
  const { items, setItems, dragIndex, startDrag, itemRefs } = useDragSort(INITIAL)

  const toggle = (id: string) =>
    setItems(prev => prev.map(x => x.id === id ? { ...x, enabled: !x.enabled } : x))

  return (
    <div className="clay-card overflow-hidden">
      <div className="px-4 py-3 bg-slate-50 border-b border-slate-100">
        <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">Sidebar items — drag to reorder</p>
      </div>
      <div className="divide-y divide-slate-50">
        {items.map((item, i) => (
          <div
            key={item.id}
            ref={el => { itemRefs.current[i] = el }}
            className={`flex items-center gap-3 px-4 py-3 transition-colors select-none
              ${dragIndex === i ? 'bg-sky-50 opacity-70' : 'bg-white'}`}
          >
            <div
              onPointerDown={e => startDrag(i, e)}
              className="cursor-grab active:cursor-grabbing touch-none shrink-0 text-slate-300 hover:text-slate-400 transition-colors"
            >
              <GripVertical className="w-4 h-4" />
            </div>
            <div className="w-7 h-7 rounded-lg flex items-center justify-center text-white shrink-0 shadow-soft"
              style={{ background: item.color }}>
              {item.icon}
            </div>
            <span className={`flex-1 text-sm font-medium ${item.enabled ? 'text-slate-700' : 'text-slate-400'}`}>
              {item.label}
            </span>
            <button onClick={() => toggle(item.id)}
              className={`w-8 h-4 rounded-full transition-all cursor-pointer relative shrink-0
                ${item.enabled ? 'bg-sky-500' : 'bg-slate-200'}`}>
              <div className={`absolute top-0.5 w-3 h-3 bg-white rounded-full shadow-soft transition-all
                ${item.enabled ? 'left-4' : 'left-0.5'}`} />
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}

/* ── Task list ──────────────────────────────────────── */

interface TaskItem extends Item { text: string; done: boolean }

const TASKS_INIT: TaskItem[] = [
  { id: 't1', text: 'Review design tokens',    done: false },
  { id: 't2', text: 'Ship command palette',    done: true },
  { id: 't3', text: 'Write component docs',    done: false },
  { id: 't4', text: 'Add dark mode support',   done: false },
  { id: 't5', text: 'Performance audit',       done: true },
]

function TaskList() {
  const { items, setItems, dragIndex, startDrag, itemRefs } = useDragSort(TASKS_INIT)
  const [newText, setNewText] = useState('')

  const toggle = (id: string) =>
    setItems(prev => prev.map(x => x.id === id ? { ...x, done: !x.done } : x))

  const remove = (id: string) =>
    setItems(prev => prev.filter(x => x.id !== id))

  const add = () => {
    if (!newText.trim()) return
    setItems(prev => [...prev, { id: Date.now().toString(), text: newText.trim(), done: false }])
    setNewText('')
  }

  return (
    <div className="space-y-2">
      {items.map((item, i) => (
        <div
          key={item.id}
          ref={el => { itemRefs.current[i] = el }}
          className={`flex items-center gap-3 clay-card px-3 py-2.5 transition-all select-none group
            ${dragIndex === i ? 'opacity-50 bg-sky-50 shadow-none' : ''}`}
        >
          <div
            onPointerDown={e => startDrag(i, e)}
            className="cursor-grab active:cursor-grabbing touch-none shrink-0 text-slate-300 hover:text-slate-400 transition-colors"
          >
            <GripVertical className="w-4 h-4" />
          </div>
          <button onClick={() => toggle(item.id)}
            className={`w-5 h-5 rounded-md border-2 flex items-center justify-center shrink-0 cursor-pointer transition-all
              ${item.done ? 'bg-emerald-500 border-emerald-500' : 'border-slate-300 hover:border-emerald-400'}`}>
            {item.done && <Check className="w-3 h-3 text-white" strokeWidth={3} />}
          </button>
          <span className={`flex-1 text-sm transition-colors ${item.done ? 'line-through text-slate-400' : 'text-slate-700'}`}>
            {item.text}
          </span>
          <button onClick={() => remove(item.id)}
            className="opacity-0 group-hover:opacity-100 text-slate-300 hover:text-red-400 cursor-pointer transition-all">
            <Trash2 className="w-3.5 h-3.5" />
          </button>
        </div>
      ))}
      <div className="flex gap-2">
        <input value={newText} onChange={e => setNewText(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && add()}
          placeholder="Add a task…"
          className="flex-1 border-2 border-slate-200 rounded-xl px-3 py-2 text-sm focus:border-sky-400 focus:outline-none transition-colors" />
        <button onClick={add}
          className="w-9 h-9 bg-sky-500 hover:bg-sky-600 text-white rounded-xl flex items-center justify-center shadow-clay cursor-pointer transition-colors">
          <Plus className="w-4 h-4" />
        </button>
      </div>
    </div>
  )
}

export function SortableListShowcase() {
  return (
    <div className="grid grid-cols-2 gap-8">
      <div>
        <p className="section-label">Drag to Reorder — Sidebar Items</p>
        <SidebarSorter />
      </div>
      <div>
        <p className="section-label">Sortable Task List</p>
        <TaskList />
      </div>
    </div>
  )
}
