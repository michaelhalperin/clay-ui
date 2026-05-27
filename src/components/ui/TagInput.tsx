import { useState, useRef, KeyboardEvent } from 'react'
import { X, Hash } from 'lucide-react'

const SUGGESTIONS = ['Design','React','TypeScript','Tailwind','UI/UX','Frontend','Animation','Dashboard','Analytics','API','Mobile','Testing']

export function TagInput({ label, placeholder = 'Add tag…', suggestions }: { label?: string; placeholder?: string; suggestions?: string[] }) {
  const [tags, setTags] = useState<string[]>(['React', 'TypeScript', 'Tailwind'])
  const [input, setInput] = useState('')
  const [focused, setFocused] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  const filtered = suggestions?.filter(s => s.toLowerCase().includes(input.toLowerCase()) && !tags.includes(s)) ?? []

  const addTag = (tag: string) => {
    const t = tag.trim()
    if (t && !tags.includes(t)) setTags(ts => [...ts, t])
    setInput('')
    inputRef.current?.focus()
  }

  const removeTag = (tag: string) => setTags(ts => ts.filter(t => t !== tag))

  const onKey = (e: KeyboardEvent<HTMLInputElement>) => {
    if ((e.key === 'Enter' || e.key === ',') && input.trim()) {
      e.preventDefault()
      addTag(input.replace(',',''))
    }
    if (e.key === 'Backspace' && !input && tags.length) {
      removeTag(tags[tags.length - 1])
    }
  }

  return (
    <div className="space-y-1.5">
      {label && <label className="block text-sm font-semibold text-slate-700">{label}</label>}
      <div
        onClick={() => inputRef.current?.focus()}
        className={`min-h-[48px] w-full flex flex-wrap gap-1.5 p-2.5 bg-white border-2 rounded-clay shadow-soft cursor-text transition-all duration-200
          ${focused ? 'border-sky-300 ring-2 ring-sky-100' : 'border-slate-200 hover:border-slate-300'}`}
      >
        {tags.map(tag => (
          <span key={tag} className="inline-flex items-center gap-1 bg-sky-100 text-sky-700 text-xs font-semibold px-2.5 py-1 rounded-lg" style={{ animation: 'fadeIn 0.15s ease' }}>
            <Hash className="w-3 h-3 opacity-60" />
            {tag}
            <button onClick={e => { e.stopPropagation(); removeTag(tag) }} className="text-sky-500 hover:text-sky-800 cursor-pointer transition-colors ml-0.5">
              <X className="w-3 h-3" />
            </button>
          </span>
        ))}
        <input
          ref={inputRef}
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={onKey}
          onFocus={() => setFocused(true)}
          onBlur={() => { setFocused(false); if (input.trim()) addTag(input) }}
          placeholder={tags.length === 0 ? placeholder : ''}
          className="flex-1 min-w-[80px] text-sm text-slate-700 placeholder-slate-300 bg-transparent focus:outline-none py-0.5"
        />
      </div>

      {/* Suggestions */}
      {focused && filtered.length > 0 && (
        <div className="flex flex-wrap gap-1.5 pt-1" style={{ animation: 'fadeIn 0.15s ease' }}>
          {filtered.slice(0, 8).map(s => (
            <button key={s} onMouseDown={e => { e.preventDefault(); addTag(s) }}
              className="text-xs font-medium bg-slate-100 hover:bg-sky-100 hover:text-sky-700 text-slate-500 px-2.5 py-1 rounded-lg cursor-pointer transition-colors">
              + {s}
            </button>
          ))}
        </div>
      )}
      <p className="text-xs text-slate-400">Press <kbd className="font-mono bg-slate-100 px-1 rounded">Enter</kbd> or <kbd className="font-mono bg-slate-100 px-1 rounded">,</kbd> to add. <kbd className="font-mono bg-slate-100 px-1 rounded">Backspace</kbd> to remove last.</p>
    </div>
  )
}

function ColorTagInput() {
  const colors = ['#f472b6','#0ea5e9','#10b981','#f59e0b','#8b5cf6','#ef4444']
  const [tags, setTags] = useState([{ label: 'Design', color: '#0ea5e9' }, { label: 'Dev', color: '#8b5cf6' }])
  const [input, setInput] = useState('')
  const [colorIdx, setColorIdx] = useState(2)
  const inputRef = useRef<HTMLInputElement>(null)

  const add = () => {
    if (input.trim() && !tags.find(t => t.label === input.trim())) {
      setTags(ts => [...ts, { label: input.trim(), color: colors[colorIdx % colors.length] }])
      setColorIdx(i => i + 1)
      setInput('')
    }
  }

  return (
    <div className="space-y-1.5">
      <label className="block text-sm font-semibold text-slate-700">Coloured tags</label>
      <div onClick={() => inputRef.current?.focus()}
        className="min-h-[48px] w-full flex flex-wrap gap-1.5 p-2.5 bg-white border-2 border-slate-200 hover:border-slate-300 rounded-clay shadow-soft cursor-text transition-all">
        {tags.map(t => (
          <span key={t.label} className="inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-lg text-white" style={{ background: t.color, animation: 'fadeIn 0.15s ease' }}>
            {t.label}
            <button onClick={e => { e.stopPropagation(); setTags(ts => ts.filter(x => x.label !== t.label)) }} className="opacity-70 hover:opacity-100 cursor-pointer">
              <X className="w-3 h-3" />
            </button>
          </span>
        ))}
        <input ref={inputRef} value={input} onChange={e => setInput(e.target.value)}
          onKeyDown={e => { if (e.key === 'Enter' && input.trim()) { e.preventDefault(); add() } }}
          placeholder="Add label…"
          className="flex-1 min-w-[80px] text-sm text-slate-700 placeholder-slate-300 bg-transparent focus:outline-none py-0.5" />
      </div>
    </div>
  )
}

export function TagInputShowcase() {
  return (
    <div className="grid grid-cols-2 gap-8">
      <div>
        <p className="section-label">Tag Input with Suggestions</p>
        <TagInput label="Topics" suggestions={SUGGESTIONS} />
      </div>
      <div>
        <p className="section-label">Coloured Tag Input</p>
        <ColorTagInput />
      </div>
    </div>
  )
}
