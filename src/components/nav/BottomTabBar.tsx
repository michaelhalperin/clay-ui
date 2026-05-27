import { useState } from 'react'
import { Home, Search, Bell, User, Bookmark, PlusCircle, MessageCircle, TrendingUp, Settings, Heart } from 'lucide-react'

export interface BottomTab { id: string; label: string; icon: React.ReactNode; badge?: number }

function PhoneFrame({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative mx-auto" style={{ width: 280 }}>
      <div className="bg-slate-900 rounded-[2.5rem] p-3 shadow-clay-lg">
        {/* Notch */}
        <div className="flex justify-center mb-2">
          <div className="w-20 h-1.5 bg-slate-700 rounded-full" />
        </div>
        <div className="bg-slate-50 rounded-[2rem] overflow-hidden" style={{ height: 480 }}>
          {children}
        </div>
      </div>
    </div>
  )
}

export function TabBar({ tabs, active, onTab, variant = 'default' }: {
  tabs: BottomTab[]; active: string; onTab: (id: string) => void; variant?: 'default' | 'floating' | 'pill'
}) {
  if (variant === 'floating') {
    return (
      <div className="absolute bottom-4 left-4 right-4">
        <div className="flex items-center justify-around bg-slate-900/90 backdrop-blur-md rounded-2xl px-2 py-2 shadow-clay-lg">
          {tabs.map(tab => {
            const isActive = tab.id === active
            return (
              <button key={tab.id} onClick={() => onTab(tab.id)}
                className={`relative flex flex-col items-center gap-0.5 px-3 py-1.5 rounded-xl cursor-pointer transition-all
                  ${isActive ? 'bg-white/15' : 'hover:bg-white/10'}`}>
                <span className={isActive ? 'text-white' : 'text-slate-400'}>{tab.icon}</span>
                {isActive && <span className="text-[9px] font-bold text-white">{tab.label}</span>}
                {tab.badge && (
                  <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-red-500 text-white text-[8px] font-bold rounded-full flex items-center justify-center">
                    {tab.badge}
                  </span>
                )}
              </button>
            )
          })}
        </div>
      </div>
    )
  }

  if (variant === 'pill') {
    return (
      <div className="absolute bottom-0 left-0 right-0 bg-white border-t border-slate-100 px-4 pb-4 pt-2">
        <div className="flex items-center justify-around">
          {tabs.map(tab => {
            const isActive = tab.id === active
            return (
              <button key={tab.id} onClick={() => onTab(tab.id)}
                className={`relative flex flex-col items-center gap-0.5 cursor-pointer transition-all`}>
                <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full transition-all
                  ${isActive ? 'bg-sky-100' : ''}`}>
                  <span className={isActive ? 'text-sky-600' : 'text-slate-400'}>{tab.icon}</span>
                  {isActive && <span className="text-xs font-bold text-sky-600">{tab.label}</span>}
                </div>
                {tab.badge && (
                  <span className="absolute -top-0.5 right-0 w-4 h-4 bg-red-500 text-white text-[8px] font-bold rounded-full flex items-center justify-center">
                    {tab.badge}
                  </span>
                )}
              </button>
            )
          })}
        </div>
      </div>
    )
  }

  // Default
  return (
    <div className="absolute bottom-0 left-0 right-0 bg-white border-t border-slate-100 px-2 pb-4 pt-1">
      <div className="flex items-center justify-around">
        {tabs.map(tab => {
          const isActive = tab.id === active
          return (
            <button key={tab.id} onClick={() => onTab(tab.id)}
              className="relative flex flex-col items-center gap-1 px-3 py-1 cursor-pointer transition-all">
              <span className={`transition-colors ${isActive ? 'text-sky-500' : 'text-slate-400'}`}>
                {tab.icon}
              </span>
              <span className={`text-[9px] font-semibold transition-colors ${isActive ? 'text-sky-500' : 'text-slate-400'}`}>
                {tab.label}
              </span>
              {isActive && <span className="absolute -top-1 left-1/2 -translate-x-1/2 w-4 h-0.5 bg-sky-500 rounded-full" />}
              {tab.badge && (
                <span className="absolute top-0 right-1 w-4 h-4 bg-red-500 text-white text-[8px] font-bold rounded-full flex items-center justify-center">
                  {tab.badge}
                </span>
              )}
            </button>
          )
        })}
      </div>
    </div>
  )
}

const PAGE_CONTENT: Record<string, React.ReactNode> = {
  home: (
    <div className="p-4 space-y-3">
      <p className="text-sm font-bold text-slate-800">For You</p>
      {['Design tips for 2025', 'Building with clay morph...', 'Top components ranked'].map((t, i) => (
        <div key={i} className="flex gap-3 items-start">
          <div className="w-16 h-12 rounded-xl flex-shrink-0" style={{ background: ['#e0f2fe','#ede9fe','#d1fae5'][i] }} />
          <div>
            <p className="text-xs font-semibold text-slate-700 leading-snug">{t}</p>
            <p className="text-[10px] text-slate-400 mt-0.5">2 min read</p>
          </div>
        </div>
      ))}
    </div>
  ),
  search: (
    <div className="p-4">
      <div className="flex items-center gap-2 bg-slate-100 rounded-xl px-3 py-2 mb-4">
        <Search className="w-3.5 h-3.5 text-slate-400" />
        <span className="text-xs text-slate-400">Search…</span>
      </div>
      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Trending</p>
      {['#claymorphism', '#react', '#tailwind', '#design'].map((t, i) => (
        <div key={i} className="py-2 border-b border-slate-100 text-xs font-medium text-sky-500">{t}</div>
      ))}
    </div>
  ),
  notifications: (
    <div className="p-4 space-y-2">
      <p className="text-sm font-bold text-slate-800 mb-3">Notifications</p>
      {['Sophie liked your post', 'Marcus started following', '3 new comments'].map((n, i) => (
        <div key={i} className={`flex items-center gap-2.5 p-2.5 rounded-xl ${i === 0 ? 'bg-sky-50' : 'bg-white'}`}>
          <div className="w-7 h-7 rounded-full flex items-center justify-center text-white text-[9px] font-bold"
            style={{ background: ['#0ea5e9','#8b5cf6','#ec4899'][i] }}>
            {['SL','MT','AP'][i]}
          </div>
          <p className="text-[11px] text-slate-700 flex-1">{n}</p>
        </div>
      ))}
    </div>
  ),
  profile: (
    <div className="p-4 flex flex-col items-center text-center pt-8">
      <div className="w-16 h-16 rounded-full bg-sky-500 flex items-center justify-center text-white font-bold text-lg mb-2">MH</div>
      <p className="font-bold text-slate-800">Michael Hale</p>
      <p className="text-xs text-slate-400 mb-4">@michael</p>
      <div className="flex gap-6">
        {[['128','Following'],['2.4k','Followers'],['48','Posts']].map(([v,l]) => (
          <div key={l}><p className="font-bold text-slate-800 text-sm">{v}</p><p className="text-[10px] text-slate-400">{l}</p></div>
        ))}
      </div>
    </div>
  ),
}

const TABS_DEFAULT: BottomTab[] = [
  { id: 'home',          label: 'Home',   icon: <Home className="w-5 h-5" /> },
  { id: 'search',        label: 'Search', icon: <Search className="w-5 h-5" /> },
  { id: 'notifications', label: 'Alerts', icon: <Bell className="w-5 h-5" />, badge: 3 },
  { id: 'profile',       label: 'Profile',icon: <User className="w-5 h-5" /> },
]

function Demo({ variant }: { variant: 'default' | 'floating' | 'pill' }) {
  const [active, setActive] = useState('home')
  return (
    <PhoneFrame>
      <div className="relative h-full bg-slate-50">
        <div className="overflow-y-auto h-full pb-20">
          {PAGE_CONTENT[active] ?? <div className="p-4 text-xs text-slate-400">No content</div>}
        </div>
        <TabBar tabs={TABS_DEFAULT} active={active} onTab={setActive} variant={variant} />
      </div>
    </PhoneFrame>
  )
}

export function BottomTabBarShowcase() {
  return (
    <div className="space-y-4">
      <p className="section-label">Three styles — tap the tabs to switch screens</p>
      <div className="grid grid-cols-3 gap-8">
        <div className="space-y-3">
          <p className="text-center text-xs font-bold text-slate-500 uppercase tracking-widest">Default</p>
          <Demo variant="default" />
        </div>
        <div className="space-y-3">
          <p className="text-center text-xs font-bold text-slate-500 uppercase tracking-widest">Pill</p>
          <Demo variant="pill" />
        </div>
        <div className="space-y-3">
          <p className="text-center text-xs font-bold text-slate-500 uppercase tracking-widest">Floating</p>
          <Demo variant="floating" />
        </div>
      </div>
    </div>
  )
}
