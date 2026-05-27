import { useState } from 'react'
import { Plus, Check, Camera, Crown, Shield, Zap } from 'lucide-react'

const PEOPLE = [
  { name: 'Sophie L.',  color: 'from-sky-400 to-violet-400',    initials: 'SL', status: 'online',  role: 'Designer' },
  { name: 'Michael H.', color: 'from-emerald-400 to-sky-400',   initials: 'MH', status: 'online',  role: 'Engineer' },
  { name: 'Anya P.',    color: 'from-pink-400 to-orange-400',   initials: 'AP', status: 'busy',    role: 'PM' },
  { name: 'Marcus T.',  color: 'from-amber-400 to-pink-400',    initials: 'MT', status: 'away',    role: 'Designer' },
  { name: 'Leon K.',    color: 'from-indigo-400 to-violet-400', initials: 'LK', status: 'offline', role: 'Engineer' },
  { name: 'Priya S.',   color: 'from-teal-400 to-emerald-400',  initials: 'PS', status: 'online',  role: 'Data' },
]

const STATUS_COLORS: Record<string, string> = {
  online:  'bg-emerald-400',
  busy:    'bg-red-400',
  away:    'bg-amber-400',
  offline: 'bg-slate-300',
}

export type AvatarSize = 'sm' | 'md' | 'lg' | 'xl'

const SIZE: Record<AvatarSize, { wrap: string; text: string; badge: string; ring: string }> = {
  sm:  { wrap: 'w-8  h-8',  text: 'text-[11px]', badge: 'w-2   h-2   border',     ring: '-top-0.5 -right-0.5' },
  md:  { wrap: 'w-10 h-10', text: 'text-xs',     badge: 'w-2.5 h-2.5 border-2',  ring: '-top-0.5 -right-0.5' },
  lg:  { wrap: 'w-14 h-14', text: 'text-sm',     badge: 'w-3   h-3   border-2',  ring: 'top-0 right-0' },
  xl:  { wrap: 'w-20 h-20', text: 'text-lg',     badge: 'w-4   h-4   border-2',  ring: 'top-0.5 right-0.5' },
}

export function Avatar({
  name, color, initials, status, size = 'md', badge,
}: {
  name: string; color: string; initials: string; status?: string; size?: AvatarSize; badge?: React.ReactNode
}) {
  const s = SIZE[size]
  return (
    <div className="relative inline-block">
      <div className={`${s.wrap} rounded-full bg-gradient-to-br ${color} flex items-center justify-center shadow-soft shrink-0`} title={name}>
        <span className={`font-heading font-bold text-white ${s.text}`}>{initials}</span>
      </div>
      {status && (
        <span className={`absolute ${s.ring} ${s.badge} rounded-full ${STATUS_COLORS[status]} border-white`} />
      )}
      {badge && (
        <span className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-white shadow-soft flex items-center justify-center border border-slate-100">
          {badge}
        </span>
      )}
    </div>
  )
}

export function AvatarGroup({ people, max = 4 }: { people: typeof PEOPLE; max?: number }) {
  const shown = people.slice(0, max)
  const extra = people.length - max

  return (
    <div className="flex items-center">
      {shown.map((p, i) => (
        <div key={p.name} className="relative" style={{ marginLeft: i === 0 ? 0 : '-10px', zIndex: shown.length - i }}>
          <div className={`w-9 h-9 rounded-full bg-gradient-to-br ${p.color} flex items-center justify-center shadow-soft ring-2 ring-white`} title={p.name}>
            <span className="font-heading font-bold text-white text-[11px]">{p.initials}</span>
          </div>
        </div>
      ))}
      {extra > 0 && (
        <div className="w-9 h-9 rounded-full bg-slate-100 flex items-center justify-center ring-2 ring-white text-xs font-bold text-slate-500 shrink-0" style={{ marginLeft: '-10px' }}>
          +{extra}
        </div>
      )}
    </div>
  )
}

function ProfileCard({ person }: { person: typeof PEOPLE[0] }) {
  const [following, setFollowing] = useState(false)
  return (
    <div className="clay-card p-4 flex items-center gap-3">
      <Avatar name={person.name} color={person.color} initials={person.initials} status={person.status} size="lg" />
      <div className="flex-1 min-w-0">
        <p className="font-semibold text-slate-800 text-sm">{person.name}</p>
        <p className="text-xs text-slate-400">{person.role}</p>
        <div className="flex items-center gap-1 mt-0.5">
          <span className={`w-1.5 h-1.5 rounded-full ${STATUS_COLORS[person.status]}`} />
          <span className="text-[11px] text-slate-400 capitalize">{person.status}</span>
        </div>
      </div>
      <button
        onClick={() => setFollowing(f => !f)}
        className={`flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg cursor-pointer transition-all
          ${following ? 'bg-emerald-50 text-emerald-600 border border-emerald-200' : 'bg-sky-500 text-white shadow-clay hover:bg-sky-600'}`}>
        {following ? <><Check className="w-3 h-3" /> Following</> : <><Plus className="w-3 h-3" /> Follow</>}
      </button>
    </div>
  )
}

function UploadableAvatar() {
  return (
    <div className="flex flex-col items-center gap-3">
      <div className="relative group cursor-pointer">
        <div className="w-20 h-20 rounded-full bg-gradient-to-br from-sky-400 to-violet-400 flex items-center justify-center shadow-clay">
          <span className="font-heading font-bold text-white text-lg">MH</span>
        </div>
        <div className="absolute inset-0 rounded-full bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
          <Camera className="w-5 h-5 text-white" />
        </div>
        <span className="absolute -bottom-1 -right-1 w-6 h-6 bg-sky-500 rounded-full flex items-center justify-center shadow-clay border-2 border-white">
          <Camera className="w-3 h-3 text-white" />
        </span>
      </div>
      <p className="text-xs text-slate-400">Click to change photo</p>
    </div>
  )
}

export function AvatarShowcase() {
  return (
    <div className="space-y-8">
      <div className="grid grid-cols-2 gap-8">
        <div>
          <p className="section-label">Sizes</p>
          <div className="flex items-end gap-4 flex-wrap">
            {(['sm', 'md', 'lg', 'xl'] as AvatarSize[]).map(size => (
              <div key={size} className="flex flex-col items-center gap-2">
                <Avatar name="Sophie L." color="from-sky-400 to-violet-400" initials="SL" status="online" size={size} />
                <span className="text-[10px] text-slate-400 uppercase font-bold">{size}</span>
              </div>
            ))}
          </div>
        </div>
        <div>
          <p className="section-label">Status Indicators</p>
          <div className="flex items-center gap-5 flex-wrap">
            {PEOPLE.slice(0, 4).map(p => (
              <div key={p.name} className="flex flex-col items-center gap-2">
                <Avatar {...p} size="md" />
                <span className="text-[10px] text-slate-400 capitalize">{p.status}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-8">
        <div>
          <p className="section-label">Avatar Groups</p>
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <AvatarGroup people={PEOPLE} max={4} />
              <span className="text-sm text-slate-500">{PEOPLE.length} contributors</span>
            </div>
            <div className="flex items-center gap-4">
              <AvatarGroup people={PEOPLE.slice(0, 3)} max={3} />
              <span className="text-sm text-slate-500">3 reviewers</span>
            </div>
          </div>
        </div>
        <div>
          <p className="section-label">Badges / Roles</p>
          <div className="flex items-end gap-5">
            <div className="flex flex-col items-center gap-2">
              <Avatar name="Sophie L." color="from-sky-400 to-violet-400" initials="SL" size="lg"
                badge={<Crown className="w-3 h-3 text-amber-500" />} />
              <span className="text-[10px] text-slate-400">Owner</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <Avatar name="Michael H." color="from-emerald-400 to-sky-400" initials="MH" size="lg"
                badge={<Shield className="w-3 h-3 text-sky-500" />} />
              <span className="text-[10px] text-slate-400">Admin</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <Avatar name="Anya P." color="from-pink-400 to-orange-400" initials="AP" size="lg"
                badge={<Zap className="w-3 h-3 text-violet-500" />} />
              <span className="text-[10px] text-slate-400">Pro</span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-8">
        <div>
          <p className="section-label">Profile Cards</p>
          <div className="space-y-2.5">
            {PEOPLE.slice(0, 3).map(p => <ProfileCard key={p.name} person={p} />)}
          </div>
        </div>
        <div>
          <p className="section-label">Editable / Upload</p>
          <UploadableAvatar />
        </div>
      </div>
    </div>
  )
}
