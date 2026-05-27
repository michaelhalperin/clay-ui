import { X, Zap, Shield, Star, Clock, CheckCircle2, AlertTriangle, Circle } from 'lucide-react'
import { useState } from 'react'

/* ─── Badge ─── */
export type BadgeVariant = 'solid' | 'soft' | 'outline'
export type BadgeColor = 'sky' | 'violet' | 'emerald' | 'pink' | 'amber' | 'slate' | 'red'

const colorMap: Record<BadgeColor, Record<BadgeVariant, string>> = {
  sky:     { solid: 'bg-sky-500 text-white',      soft: 'bg-sky-100 text-sky-700',      outline: 'border border-sky-300 text-sky-600' },
  violet:  { solid: 'bg-violet-500 text-white',   soft: 'bg-violet-100 text-violet-700', outline: 'border border-violet-300 text-violet-600' },
  emerald: { solid: 'bg-emerald-500 text-white',  soft: 'bg-emerald-100 text-emerald-700',outline:'border border-emerald-300 text-emerald-600' },
  pink:    { solid: 'bg-pink-500 text-white',     soft: 'bg-pink-100 text-pink-700',     outline: 'border border-pink-300 text-pink-600' },
  amber:   { solid: 'bg-amber-400 text-white',    soft: 'bg-amber-100 text-amber-700',   outline: 'border border-amber-300 text-amber-600' },
  slate:   { solid: 'bg-slate-500 text-white',    soft: 'bg-slate-100 text-slate-600',   outline: 'border border-slate-300 text-slate-500' },
  red:     { solid: 'bg-red-500 text-white',      soft: 'bg-red-100 text-red-700',       outline: 'border border-red-300 text-red-600' },
}

export interface BadgeProps {
  label: string
  color?: BadgeColor
  variant?: BadgeVariant
  icon?: React.ReactNode
  dot?: boolean
  onRemove?: () => void
  size?: 'sm' | 'md'
}

export function Badge({ label, color = 'sky', variant = 'soft', icon, dot, onRemove, size = 'md' }: BadgeProps) {
  return (
    <span className={`inline-flex items-center gap-1.5 font-semibold rounded-full ${colorMap[color][variant]}
      ${size === 'sm' ? 'text-[10px] px-2 py-0.5' : 'text-xs px-2.5 py-1'}`}>
      {dot && <span className="w-1.5 h-1.5 rounded-full bg-current opacity-70" />}
      {icon && <span className="opacity-80">{icon}</span>}
      {label}
      {onRemove && (
        <button onClick={onRemove} className="opacity-60 hover:opacity-100 cursor-pointer transition-opacity ml-0.5">
          <X className="w-3 h-3" />
        </button>
      )}
    </span>
  )
}

/* ─── Notification dot ─── */
export function NotifDot({ count, children }: { count: number; children: React.ReactNode }) {
  return (
    <div className="relative inline-flex">
      {children}
      <span className="absolute -top-1.5 -right-1.5 min-w-[18px] h-[18px] bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center px-1 shadow-soft border-2 border-white">
        {count > 99 ? '99+' : count}
      </span>
    </div>
  )
}

/* ─── Status indicator ─── */
export function StatusBadge({ status }: { status: 'online' | 'offline' | 'busy' | 'away' }) {
  const map = {
    online:  { dot: 'bg-emerald-400', label: 'Online',  text: 'text-emerald-700', bg: 'bg-emerald-50' },
    offline: { dot: 'bg-slate-400',   label: 'Offline', text: 'text-slate-600',   bg: 'bg-slate-100' },
    busy:    { dot: 'bg-red-400',     label: 'Busy',    text: 'text-red-700',     bg: 'bg-red-50' },
    away:    { dot: 'bg-amber-400',   label: 'Away',    text: 'text-amber-700',   bg: 'bg-amber-50' },
  }
  const s = map[status]
  return (
    <span className={`inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full ${s.bg} ${s.text}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${s.dot} ${status === 'online' ? 'animate-pulse' : ''}`} />
      {s.label}
    </span>
  )
}

export function BadgeShowcase() {
  const [tags, setTags] = useState<string[]>(['Design', 'Engineering', 'Marketing', 'Analytics', 'Legal'])
  const removeTag = (t: string) => setTags(ts => ts.filter(x => x !== t))

  return (
    <div className="grid grid-cols-2 gap-8">
      <div className="space-y-6">
        <div>
          <p className="section-label">Solid</p>
          <div className="flex flex-wrap gap-2">
            {(['sky','violet','emerald','pink','amber','red','slate'] as BadgeColor[]).map(c => (
              <Badge key={c} label={c.charAt(0).toUpperCase()+c.slice(1)} color={c} variant="solid" />
            ))}
          </div>
        </div>
        <div>
          <p className="section-label">Soft</p>
          <div className="flex flex-wrap gap-2">
            {(['sky','violet','emerald','pink','amber','red','slate'] as BadgeColor[]).map(c => (
              <Badge key={c} label={c.charAt(0).toUpperCase()+c.slice(1)} color={c} variant="soft" />
            ))}
          </div>
        </div>
        <div>
          <p className="section-label">Outline</p>
          <div className="flex flex-wrap gap-2">
            {(['sky','violet','emerald','pink','amber'] as BadgeColor[]).map(c => (
              <Badge key={c} label={c.charAt(0).toUpperCase()+c.slice(1)} color={c} variant="outline" />
            ))}
          </div>
        </div>
        <div>
          <p className="section-label">With Icons &amp; Dot</p>
          <div className="flex flex-wrap gap-2">
            <Badge label="Pro"       color="violet" icon={<Zap className="w-3 h-3" />} />
            <Badge label="Verified"  color="sky"    icon={<CheckCircle2 className="w-3 h-3" />} />
            <Badge label="Premium"   color="amber"  icon={<Star className="w-3 h-3" />} />
            <Badge label="Secure"    color="emerald" icon={<Shield className="w-3 h-3" />} />
            <Badge label="Pending"   color="amber"  dot />
            <Badge label="Active"    color="emerald" dot />
            <Badge label="Expired"   color="red"    icon={<Clock className="w-3 h-3" />} />
          </div>
        </div>
      </div>

      <div className="space-y-6">
        <div>
          <p className="section-label">Removable Tags</p>
          <div className="flex flex-wrap gap-2">
            {tags.map(t => (
              <Badge key={t} label={t} color="sky" variant="soft" onRemove={() => removeTag(t)} />
            ))}
          </div>
        </div>

        <div>
          <p className="section-label">Status Indicators</p>
          <div className="flex flex-wrap gap-2">
            <StatusBadge status="online" />
            <StatusBadge status="busy" />
            <StatusBadge status="away" />
            <StatusBadge status="offline" />
          </div>
        </div>

        <div>
          <p className="section-label">Notification Dots</p>
          <div className="flex items-center gap-6">
            <NotifDot count={3}>
              <div className="w-10 h-10 bg-slate-100 rounded-xl flex items-center justify-center text-slate-500 cursor-pointer hover:bg-slate-200 transition-colors">
                <AlertTriangle className="w-5 h-5" />
              </div>
            </NotifDot>
            <NotifDot count={12}>
              <div className="w-10 h-10 bg-slate-100 rounded-xl flex items-center justify-center text-slate-500 cursor-pointer hover:bg-slate-200 transition-colors">
                <Circle className="w-5 h-5" />
              </div>
            </NotifDot>
            <NotifDot count={128}>
              <div className="w-10 h-10 bg-sky-500 rounded-xl flex items-center justify-center text-white cursor-pointer hover:bg-sky-600 transition-colors shadow-clay">
                <Zap className="w-5 h-5" />
              </div>
            </NotifDot>
          </div>
        </div>
      </div>
    </div>
  )
}
