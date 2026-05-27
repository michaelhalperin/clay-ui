import { useState } from 'react'
import { Menu, X, Zap, Bell, Search, ChevronDown } from 'lucide-react'

const links = ['Product', 'Features', 'Pricing', 'Docs']

export function NavbarShowcase() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [active, setActive] = useState('Product')

  return (
    <div className="space-y-6 w-full">
      {/* Floating navbar */}
      <div>
        <p className="section-label">Floating Navbar</p>
        <div className="relative bg-slate-100 rounded-clay-lg p-4 h-24 overflow-hidden">
          <nav className="flex items-center justify-between bg-white/90 backdrop-blur-sm border border-slate-200 rounded-clay px-4 py-3 shadow-clay">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-sky-500 rounded-xl flex items-center justify-center shadow-clay">
                <Zap className="w-4 h-4 text-white" />
              </div>
              <span className="font-heading font-bold text-slate-800 text-sm">Clay UI</span>
            </div>
            <div className="hidden sm:flex items-center gap-1">
              {links.map(l => (
                <button key={l} onClick={() => setActive(l)}
                  className={`px-3 py-1.5 text-sm rounded-xl font-medium cursor-pointer transition-all duration-200 ${active === l ? 'bg-sky-50 text-sky-600 shadow-soft' : 'text-slate-500 hover:text-slate-700 hover:bg-slate-50'}`}>
                  {l}
                </button>
              ))}
            </div>
            <div className="flex items-center gap-2">
              <button className="w-8 h-8 flex items-center justify-center rounded-xl text-slate-400 hover:bg-slate-100 cursor-pointer transition-colors"><Search className="w-4 h-4" /></button>
              <button className="w-8 h-8 flex items-center justify-center rounded-xl text-slate-400 hover:bg-slate-100 cursor-pointer transition-colors relative">
                <Bell className="w-4 h-4" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-pink-400 rounded-full border-2 border-white" />
              </button>
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-sky-400 to-violet-400 border-2 border-white shadow-soft cursor-pointer" />
              <button className="sm:hidden w-8 h-8 flex items-center justify-center rounded-xl text-slate-400 hover:bg-slate-100 cursor-pointer" onClick={() => setMobileOpen(o => !o)}>
                {mobileOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
              </button>
            </div>
          </nav>
        </div>
      </div>

      {/* Pill navbar */}
      <div>
        <p className="section-label">Pill Tabs Navbar</p>
        <div className="clay-card p-2 flex items-center gap-1 w-fit">
          {['Overview', 'Analytics', 'Reports', 'Settings'].map(l => (
            <button key={l} onClick={() => setActive(l)}
              className={`px-4 py-2 text-sm font-semibold rounded-xl cursor-pointer transition-all duration-200 ${active === l ? 'bg-sky-500 text-white shadow-clay' : 'text-slate-500 hover:bg-slate-50 hover:text-slate-700'}`}>
              {l}
            </button>
          ))}
        </div>
      </div>

      {/* Underline navbar */}
      <div>
        <p className="section-label">Underline Navbar</p>
        <div className="border-b border-slate-200 flex gap-1">
          {['All', 'Active', 'Pending', 'Archived'].map(l => (
            <button key={l} onClick={() => setActive(l)}
              className={`px-4 py-3 text-sm font-semibold cursor-pointer transition-all duration-200 border-b-2 -mb-px ${active === l ? 'border-sky-500 text-sky-600' : 'border-transparent text-slate-400 hover:text-slate-600 hover:border-slate-200'}`}>
              {l}
            </button>
          ))}
        </div>
      </div>

      {/* Breadcrumb */}
      <div>
        <p className="section-label">Breadcrumb</p>
        <div className="flex items-center gap-1 text-sm flex-wrap">
          {['Dashboard', 'Analytics', 'Revenue', 'Q4 Report'].map((item, i, arr) => (
            <span key={item} className="flex items-center gap-1">
              {i < arr.length - 1 ? (
                <button className="text-slate-400 hover:text-sky-500 cursor-pointer transition-colors font-medium">{item}</button>
              ) : (
                <span className="text-slate-700 font-semibold">{item}</span>
              )}
              {i < arr.length - 1 && <ChevronDown className="w-3.5 h-3.5 text-slate-300 -rotate-90" />}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}
