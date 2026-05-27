import { useState, useRef, useLayoutEffect, useEffect } from 'react'
import { createPortal } from 'react-dom'
import { AtSign } from 'lucide-react'

export interface MentionUser { id: string; name: string; handle: string; color: string; initials: string }

const USERS: MentionUser[] = [
  { id: 'u1', name: 'Sophie Leblanc',  handle: 'sophie',   color: '#0ea5e9', initials: 'SL' },
  { id: 'u2', name: 'Marcus Trent',    handle: 'marcus',   color: '#8b5cf6', initials: 'MT' },
  { id: 'u3', name: 'Anya Petrov',     handle: 'anya',     color: '#ec4899', initials: 'AP' },
  { id: 'u4', name: 'Leon Kim',        handle: 'leon',     color: '#f97316', initials: 'LK' },
  { id: 'u5', name: 'Priya Sharma',    handle: 'priya',    color: '#10b981', initials: 'PS' },
  { id: 'u6', name: 'Michael Hale',    handle: 'michael',  color: '#ef4444', initials: 'MH' },
]

function Avatar({ user, size = 28 }: { user: MentionUser; size?: number }) {
  return (
    <div className="rounded-full flex items-center justify-center text-white font-bold shrink-0"
      style={{ width: size, height: size, background: user.color, fontSize: size * 0.35 }}>
      {user.initials}
    </div>
  )
}

export function MentionField({ placeholder = "Write a comment… use @ to mention someone", users }: { placeholder?: string; users: MentionUser[] }) {
  const [text, setText] = useState('')
  const [query, setQuery] = useState<string | null>(null)   // null = dropdown closed
  const [dropPos, setDropPos] = useState<{ top: number; left: number } | null>(null)
  const [dropReady, setDropReady] = useState(false)
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const panelRef    = useRef<HTMLDivElement>(null)

  const filteredUsers = query !== null
    ? users.filter(u =>
        u.handle.toLowerCase().startsWith(query.toLowerCase()) ||
        u.name.toLowerCase().includes(query.toLowerCase()))
    : []

  // Position panel once when it first opens
  useLayoutEffect(() => {
    if (query === null || !panelRef.current || dropReady) return
    const pr  = panelRef.current.getBoundingClientRect()
    const pos = dropPos
    if (!pos) return
    const VH = window.innerHeight, VW = window.innerWidth
    setDropPos({
      top:  pos.top + pr.height > VH ? Math.max(4, pos.top - pr.height - 4) : pos.top,
      left: Math.min(pos.left, VW - pr.width - 8),
    })
    setDropReady(true)
  }, [query, dropPos, dropReady])

  // Close panel on outside click
  useEffect(() => {
    if (query === null) return
    const handler = (e: MouseEvent) => {
      if (!textareaRef.current?.contains(e.target as Node) &&
          !panelRef.current?.contains(e.target as Node)) {
        setQuery(null); setDropPos(null); setDropReady(false)
      }
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [query])

  const onChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const val    = e.target.value
    const cursor = e.target.selectionStart ?? val.length
    setText(val)

    const before = val.slice(0, cursor)
    const match  = before.match(/@(\w*)$/)

    if (match) {
      const newQuery = match[1]
      if (query === null) {
        // First time opening — set position and let useLayoutEffect flip if needed
        const rect = textareaRef.current!.getBoundingClientRect()
        setDropPos({ top: rect.bottom + 4, left: rect.left })
        setDropReady(false)
      }
      setQuery(newQuery)
    } else {
      setQuery(null)
      setDropPos(null)
      setDropReady(false)
    }
  }

  const pickUser = (user: MentionUser) => {
    const cursor = textareaRef.current!.selectionStart ?? text.length
    const before = text.slice(0, cursor)
    const after  = text.slice(cursor)
    const replaced = before.replace(/@(\w*)$/, `@${user.handle} `)
    setText(replaced + after)
    setQuery(null)
    setDropPos(null)
    setDropReady(false)
    // Restore focus and move cursor after inserted mention
    setTimeout(() => {
      const ta = textareaRef.current
      if (!ta) return
      ta.focus()
      ta.setSelectionRange(replaced.length, replaced.length)
    }, 0)
  }

  // Parse text to highlight mentions in preview
  const renderPreview = () => {
    const parts = text.split(/(@\w+)/g)
    return parts.map((part, i) => {
      if (part.startsWith('@')) {
        const user = users.find(u => u.handle === part.slice(1))
        return user
          ? <span key={i} className="font-semibold px-1 rounded" style={{ color: user.color, background: user.color + '20' }}>{part}</span>
          : <span key={i} className="text-slate-400">{part}</span>
      }
      return <span key={i}>{part}</span>
    })
  }

  const mentions = Array.from(new Set(Array.from(text.matchAll(/@(\w+)/g)).map(m => m[1])))
    .map(h => users.find(u => u.handle === h)).filter(Boolean) as MentionUser[]

  return (
    <div className="space-y-2">
      <div className={`border-2 rounded-clay bg-white transition-all
        ${query !== null ? 'border-sky-400 ring-2 ring-sky-100' : 'border-slate-200'}`}>
        <textarea
          ref={textareaRef}
          value={text}
          onChange={onChange}
          placeholder={placeholder}
          rows={3}
          className="w-full px-3 py-2.5 text-sm text-slate-700 bg-transparent resize-none focus:outline-none placeholder-slate-300"
        />
        {text && (
          <div className="px-3 pb-2.5 text-sm leading-relaxed text-slate-700 border-t border-slate-100 pt-2 bg-slate-50/50">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-1">Preview</span>
            {renderPreview()}
          </div>
        )}
        <div className="flex items-center gap-2 px-3 py-2 border-t border-slate-100">
          <AtSign className="w-3.5 h-3.5 text-slate-400" />
          <span className="text-xs text-slate-400">Type @ to mention a teammate</span>
          <div className="flex gap-1 ml-auto">
            {mentions.map(u => <Avatar key={u.id} user={u} size={20} />)}
          </div>
        </div>
      </div>

      {/* Mention dropdown */}
      {query !== null && dropPos && createPortal(
        <div ref={panelRef}
          className="fixed z-[200] bg-white border border-slate-100 rounded-clay-lg shadow-clay-lg overflow-hidden py-1"
          style={{
            top: dropPos.top, left: dropPos.left, minWidth: 220,
            opacity: dropReady ? 1 : 0,
            pointerEvents: dropReady ? 'auto' : 'none',
            animation: dropReady ? 'slideDown 0.12s ease' : 'none',
          }}>
          {filteredUsers.length === 0 && (
            <p className="text-xs text-slate-400 text-center py-3">No users found</p>
          )}
          {filteredUsers.map(user => (
            <button key={user.id}
              onMouseDown={e => { e.preventDefault(); pickUser(user) }}
              className="w-full flex items-center gap-2.5 px-3 py-2 hover:bg-slate-50 cursor-pointer transition-colors text-left">
              <Avatar user={user} size={28} />
              <div>
                <p className="text-sm font-semibold text-slate-700 leading-none">{user.name}</p>
                <p className="text-xs text-slate-400 mt-0.5">@{user.handle}</p>
              </div>
            </button>
          ))}
        </div>,
        document.body
      )}
    </div>
  )
}

export function MentionInputShowcase() {
  return (
    <div className="grid grid-cols-2 gap-8">
      <div className="space-y-3">
        <p className="section-label">Comment with @mention</p>
        <MentionField users={USERS} />
      </div>
      <div className="space-y-3">
        <p className="section-label">Team members</p>
        <div className="clay-card p-4 space-y-3">
          <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Available to mention</p>
          {USERS.map(u => (
            <div key={u.id} className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-full flex items-center justify-center text-white text-[10px] font-bold"
                style={{ background: u.color }}>
                {u.initials}
              </div>
              <div>
                <p className="text-xs font-semibold text-slate-700">{u.name}</p>
                <p className="text-[10px] text-slate-400">@{u.handle}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
