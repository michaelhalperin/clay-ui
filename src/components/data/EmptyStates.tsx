import { Inbox, Search, FolderOpen, Users, FileText, BarChart2, Plus, RefreshCw, Upload } from 'lucide-react'

export interface EmptyStateProps {
  icon: React.ReactNode
  title: string
  description: string
  action?: { label: string; icon?: React.ReactNode }
  secondary?: string
  variant?: 'default' | 'subtle'
}

export function EmptyState({ icon, title, description, action, secondary, variant = 'default' }: EmptyStateProps) {
  return (
    <div className={`flex flex-col items-center justify-center text-center py-12 px-6 rounded-clay-lg
      ${variant === 'subtle' ? 'bg-slate-50 border-2 border-dashed border-slate-200' : 'bg-white border border-slate-100 shadow-soft'}`}>
      <div className="w-16 h-16 rounded-2xl bg-slate-100 flex items-center justify-center mb-4 shadow-soft">
        <span className="text-slate-400">{icon}</span>
      </div>
      <h3 className="font-heading font-bold text-slate-700 text-base mb-1.5">{title}</h3>
      <p className="text-sm text-slate-400 leading-relaxed max-w-[220px]">{description}</p>
      {action && (
        <button className="mt-5 flex items-center gap-2 bg-sky-500 hover:bg-sky-600 text-white text-sm font-semibold px-4 py-2 rounded-xl shadow-clay cursor-pointer transition-colors">
          {action.icon}
          {action.label}
        </button>
      )}
      {secondary && (
        <button className="mt-2 text-xs text-slate-400 hover:text-slate-600 cursor-pointer transition-colors">{secondary}</button>
      )}
    </div>
  )
}

export function IllustratedEmpty({ type }: { type: 'search' | 'files' | 'chart' }) {
  const config = {
    search: {
      bg: 'from-sky-50 to-violet-50',
      circles: ['bg-sky-200', 'bg-violet-200', 'bg-sky-100'],
      icon: <Search className="w-8 h-8 text-sky-400" />,
      title: 'No results found',
      desc: 'Try different keywords or adjust your filters.',
      action: 'Clear filters',
    },
    files: {
      bg: 'from-emerald-50 to-sky-50',
      circles: ['bg-emerald-200', 'bg-sky-200', 'bg-emerald-100'],
      icon: <FolderOpen className="w-8 h-8 text-emerald-400" />,
      title: 'No files yet',
      desc: 'Upload your first file to get started.',
      action: 'Upload file',
    },
    chart: {
      bg: 'from-violet-50 to-pink-50',
      circles: ['bg-violet-200', 'bg-pink-200', 'bg-violet-100'],
      icon: <BarChart2 className="w-8 h-8 text-violet-400" />,
      title: 'No data available',
      desc: 'Connect a data source to see your analytics.',
      action: 'Connect data',
    },
  }
  const c = config[type]

  return (
    <div className={`flex flex-col items-center justify-center text-center py-10 px-6 rounded-clay-lg bg-gradient-to-br ${c.bg} border border-white/80 shadow-soft relative overflow-hidden`}>
      {/* decorative circles */}
      <div className={`absolute -top-6 -right-6 w-20 h-20 rounded-full ${c.circles[0]} opacity-40`} />
      <div className={`absolute -bottom-4 -left-4 w-14 h-14 rounded-full ${c.circles[1]} opacity-30`} />
      <div className={`absolute top-1/2 left-4 w-6 h-6 rounded-full ${c.circles[2]} opacity-50`} />

      <div className="w-16 h-16 rounded-2xl bg-white flex items-center justify-center mb-4 shadow-clay z-10">
        {c.icon}
      </div>
      <h3 className="font-heading font-bold text-slate-700 text-base mb-1 z-10">{c.title}</h3>
      <p className="text-sm text-slate-500 max-w-[200px] leading-relaxed z-10">{c.desc}</p>
      <button className="mt-4 text-sm font-semibold text-slate-500 hover:text-slate-700 bg-white/70 hover:bg-white px-4 py-1.5 rounded-xl cursor-pointer transition-all z-10 shadow-soft">
        {c.action}
      </button>
    </div>
  )
}

export function EmptyStatesShowcase() {
  return (
    <div className="space-y-8">
      <div className="grid grid-cols-3 gap-6">
        <EmptyState
          icon={<Inbox className="w-7 h-7" />}
          title="Your inbox is empty"
          description="When you receive messages, they'll appear here."
          action={{ label: 'Compose', icon: <Plus className="w-4 h-4" /> }}
        />
        <EmptyState
          icon={<Users className="w-7 h-7" />}
          title="No team members"
          description="Invite your teammates to collaborate on this project."
          action={{ label: 'Invite people', icon: <Plus className="w-4 h-4" /> }}
          secondary="Learn more about teams"
        />
        <EmptyState
          icon={<FileText className="w-7 h-7" />}
          title="No documents"
          description="Create your first document to get started."
          variant="subtle"
          action={{ label: 'New document', icon: <Plus className="w-4 h-4" /> }}
        />
      </div>

      <div>
        <p className="section-label">Illustrated States</p>
        <div className="grid grid-cols-3 gap-6">
          <IllustratedEmpty type="search" />
          <IllustratedEmpty type="files" />
          <IllustratedEmpty type="chart" />
        </div>
      </div>

      <div>
        <p className="section-label">Inline / Compact</p>
        <div className="grid grid-cols-2 gap-6">
          <div className="h-28 flex items-center justify-center gap-3 rounded-clay border-2 border-dashed border-slate-200 text-slate-400 text-sm cursor-pointer hover:border-sky-300 hover:bg-sky-50/30 transition-all group">
            <Upload className="w-4 h-4 group-hover:text-sky-400 transition-colors" />
            <span className="group-hover:text-slate-500 transition-colors">Drop files to upload</span>
          </div>
          <div className="h-28 flex flex-col items-center justify-center gap-2 rounded-clay border-2 border-dashed border-slate-200 text-slate-400 cursor-pointer hover:border-violet-300 hover:bg-violet-50/20 transition-all group">
            <RefreshCw className="w-4 h-4 group-hover:text-violet-400 transition-colors" />
            <span className="text-sm group-hover:text-slate-500 transition-colors">No activity yet</span>
          </div>
        </div>
      </div>
    </div>
  )
}
