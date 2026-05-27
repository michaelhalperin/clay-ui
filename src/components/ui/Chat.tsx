import { useState, useRef, useEffect } from 'react'
import { Send, Paperclip, Smile, MoreHorizontal, Check, CheckCheck } from 'lucide-react'

export interface Message {
  id: string
  text: string
  sender: 'me' | 'them'
  time: string
  status?: 'sent' | 'delivered' | 'read'
  reactions?: string[]
}

const INITIAL: Message[] = [
  { id: '1', text: 'Hey! Just pushed the new design tokens to the repo 🎨', sender: 'them', time: '9:41 AM' },
  { id: '2', text: 'Oh nice, let me pull that down', sender: 'me', time: '9:42 AM', status: 'read' },
  { id: '3', text: 'The clay shadows look incredible by the way. Really nailed that soft depth.', sender: 'them', time: '9:42 AM', reactions: ['🔥', '❤️'] },
  { id: '4', text: 'Thanks! Took a while to get the blur radius just right 😅', sender: 'me', time: '9:43 AM', status: 'read' },
  { id: '5', text: 'Are we still doing the design review at 3pm?', sender: 'them', time: '9:45 AM' },
  { id: '6', text: 'Yes! I\'ll share my screen. Can you also invite Marcus?', sender: 'me', time: '9:46 AM', status: 'delivered' },
]

const THEM = { name: 'Sophie L.', color: 'from-sky-400 to-violet-400', initials: 'SL' }

function Bubble({ msg }: { msg: Message }) {
  const isMe = msg.sender === 'me'
  return (
    <div className={`flex items-end gap-2 ${isMe ? 'flex-row-reverse' : 'flex-row'}`} style={{ animation: 'fadeIn 0.2s ease' }}>
      {!isMe && (
        <div className={`w-7 h-7 rounded-full bg-gradient-to-br ${THEM.color} flex items-center justify-center shrink-0 mb-4`}>
          <span className="text-[10px] font-bold text-white">{THEM.initials}</span>
        </div>
      )}
      <div className={`max-w-[70%] space-y-1 ${isMe ? 'items-end' : 'items-start'} flex flex-col`}>
        <div className={`px-3.5 py-2.5 rounded-2xl text-sm leading-relaxed
          ${isMe
            ? 'bg-sky-500 text-white rounded-br-sm'
            : 'bg-slate-100 text-slate-800 rounded-bl-sm'}`}>
          {msg.text}
        </div>
        {msg.reactions && msg.reactions.length > 0 && (
          <div className={`flex gap-0.5 ${isMe ? 'justify-end' : 'justify-start'}`}>
            <div className="flex items-center gap-0.5 bg-white border border-slate-200 rounded-full px-2 py-0.5 shadow-soft text-xs">
              {msg.reactions.join(' ')}
            </div>
          </div>
        )}
        <div className={`flex items-center gap-1 ${isMe ? 'flex-row-reverse' : 'flex-row'}`}>
          <span className="text-[10px] text-slate-400">{msg.time}</span>
          {isMe && msg.status === 'read'      && <CheckCheck className="w-3 h-3 text-sky-400" />}
          {isMe && msg.status === 'delivered' && <CheckCheck className="w-3 h-3 text-slate-400" />}
          {isMe && msg.status === 'sent'      && <Check className="w-3 h-3 text-slate-400" />}
        </div>
      </div>
    </div>
  )
}

function TypingIndicator() {
  return (
    <div className="flex items-end gap-2">
      <div className={`w-7 h-7 rounded-full bg-gradient-to-br ${THEM.color} flex items-center justify-center shrink-0`}>
        <span className="text-[10px] font-bold text-white">{THEM.initials}</span>
      </div>
      <div className="bg-slate-100 rounded-2xl rounded-bl-sm px-4 py-3 flex items-center gap-1">
        {[0, 1, 2].map(i => (
          <div key={i} className="w-1.5 h-1.5 rounded-full bg-slate-400"
            style={{ animation: `bounce 1.2s ${i * 0.2}s infinite ease-in-out` }} />
        ))}
      </div>
    </div>
  )
}

export function ChatWindow() {
  const [messages, setMessages] = useState<Message[]>(INITIAL)
  const [input, setInput] = useState('')
  const [typing, setTyping] = useState(false)
  const messagesRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = messagesRef.current
    if (el) el.scrollTop = el.scrollHeight
  }, [messages, typing])

  const send = () => {
    const text = input.trim()
    if (!text) return
    const id = Date.now().toString()
    setMessages(m => [...m, { id, text, sender: 'me', time: 'now', status: 'sent' }])
    setInput('')

    // Simulate reply
    setTyping(true)
    setTimeout(() => {
      setTyping(false)
      const replies = [
        'Got it, thanks!', 'Sure, sounds good 👍', 'On it!',
        'Let me check and get back to you', 'Perfect, see you then!',
      ]
      setMessages(m => [...m, {
        id: Date.now().toString(),
        text: replies[Math.floor(Math.random() * replies.length)],
        sender: 'them',
        time: 'now',
      }])
    }, 1500 + Math.random() * 1000)
  }

  return (
    <div className="flex flex-col h-96 clay-card overflow-hidden">
      {/* Header */}
      <div className="flex items-center gap-3 px-4 py-3 border-b border-slate-100 shrink-0">
        <div className="relative">
          <div className={`w-9 h-9 rounded-full bg-gradient-to-br ${THEM.color} flex items-center justify-center shadow-soft`}>
            <span className="text-xs font-bold text-white">{THEM.initials}</span>
          </div>
          <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-400 rounded-full border-2 border-white" />
        </div>
        <div className="flex-1">
          <p className="text-sm font-semibold text-slate-800">{THEM.name}</p>
          <p className="text-xs text-emerald-500 font-medium">Online</p>
        </div>
        <button className="text-slate-400 hover:text-slate-600 cursor-pointer transition-colors"><MoreHorizontal className="w-5 h-5" /></button>
      </div>

      {/* Messages */}
      <div ref={messagesRef} className="flex-1 overflow-y-auto px-4 py-4 space-y-3">
        {messages.map(m => <Bubble key={m.id} msg={m} />)}
        {typing && <TypingIndicator />}
      </div>

      {/* Input */}
      <div className="px-3 py-3 border-t border-slate-100 flex items-center gap-2 shrink-0">
        <button className="text-slate-400 hover:text-slate-600 cursor-pointer transition-colors shrink-0"><Paperclip className="w-4 h-4" /></button>
        <input
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); send() } }}
          placeholder="Type a message…"
          className="flex-1 text-sm bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 focus:outline-none focus:border-sky-400 transition-colors"
        />
        <button className="text-slate-400 hover:text-slate-600 cursor-pointer transition-colors shrink-0"><Smile className="w-4 h-4" /></button>
        <button onClick={send} disabled={!input.trim()}
          className="w-8 h-8 bg-sky-500 hover:bg-sky-600 disabled:opacity-30 disabled:cursor-not-allowed text-white rounded-xl flex items-center justify-center cursor-pointer transition-all shadow-clay shrink-0">
          <Send className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  )
}

/* ── Message list (contact list style) ── */
const CONTACTS = [
  { name: 'Sophie L.',  color: 'from-sky-400 to-violet-400',    initials: 'SL', preview: 'The clay shadows look incredible', time: '9:42', unread: 2 },
  { name: 'Michael H.', color: 'from-emerald-400 to-sky-400',   initials: 'MH', preview: 'On it! See you at standup', time: '8:30', unread: 0 },
  { name: 'Anya P.',    color: 'from-pink-400 to-orange-400',   initials: 'AP', preview: 'Can you review the PR?', time: 'Yesterday', unread: 1 },
  { name: 'Marcus T.',  color: 'from-amber-400 to-pink-400',    initials: 'MT', preview: 'Shipped! Build #482 succeeded ✅', time: 'Yesterday', unread: 0 },
]

export function ContactList() {
  const [active, setActive] = useState('Sophie L.')
  return (
    <div className="clay-card overflow-hidden divide-y divide-slate-50">
      {CONTACTS.map(c => (
        <div key={c.name} onClick={() => setActive(c.name)}
          className={`flex items-center gap-3 px-4 py-3 cursor-pointer transition-colors ${active === c.name ? 'bg-sky-50' : 'hover:bg-slate-50'}`}>
          <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${c.color} flex items-center justify-center shrink-0 shadow-soft`}>
            <span className="text-xs font-bold text-white">{c.initials}</span>
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between">
              <p className="text-sm font-semibold text-slate-800">{c.name}</p>
              <span className="text-[10px] text-slate-400 shrink-0">{c.time}</span>
            </div>
            <p className="text-xs text-slate-400 truncate">{c.preview}</p>
          </div>
          {c.unread > 0 && (
            <span className="w-5 h-5 bg-sky-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center shrink-0">{c.unread}</span>
          )}
        </div>
      ))}
    </div>
  )
}

export function ChatShowcase() {
  return (
    <div className="grid grid-cols-2 gap-8">
      <div>
        <p className="section-label">Chat Window</p>
        <ChatWindow />
      </div>
      <div>
        <p className="section-label">Contact List</p>
        <ContactList />
      </div>
    </div>
  )
}
