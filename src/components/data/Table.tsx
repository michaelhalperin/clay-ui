import { useState } from 'react'
import { ArrowUpDown, ArrowUp, ArrowDown, Search, ChevronLeft, ChevronRight } from 'lucide-react'

interface Row {
  id: number
  name: string
  email: string
  plan: 'Free' | 'Pro' | 'Enterprise'
  status: 'Active' | 'Inactive' | 'Pending'
  revenue: number
  joined: string
}

const data: Row[] = [
  { id: 1,  name: 'Sophie Lambert',  email: 'sophie@example.com',  plan: 'Pro',        status: 'Active',   revenue: 1240, joined: 'Jan 12, 2024' },
  { id: 2,  name: 'Marcus Chen',     email: 'marcus@example.com',  plan: 'Enterprise', status: 'Active',   revenue: 4800, joined: 'Feb 3, 2024'  },
  { id: 3,  name: 'Anya Patel',      email: 'anya@example.com',    plan: 'Free',       status: 'Pending',  revenue: 0,    joined: 'Mar 7, 2024'  },
  { id: 4,  name: 'Leon Dubois',     email: 'leon@example.com',    plan: 'Pro',        status: 'Active',   revenue: 890,  joined: 'Jan 28, 2024' },
  { id: 5,  name: 'Mia Torres',      email: 'mia@example.com',     plan: 'Enterprise', status: 'Active',   revenue: 6200, joined: 'Dec 14, 2023' },
  { id: 6,  name: 'Noah Kim',        email: 'noah@example.com',    plan: 'Free',       status: 'Inactive', revenue: 0,    joined: 'Apr 1, 2024'  },
  { id: 7,  name: 'Ella Müller',     email: 'ella@example.com',    plan: 'Pro',        status: 'Active',   revenue: 1580, joined: 'Feb 19, 2024' },
  { id: 8,  name: 'James Okafor',    email: 'james@example.com',   plan: 'Pro',        status: 'Pending',  revenue: 420,  joined: 'Mar 22, 2024' },
]

const planColors: Record<Row['plan'], string>     = { Free: 'bg-slate-100 text-slate-500', Pro: 'bg-sky-100 text-sky-600', Enterprise: 'bg-violet-100 text-violet-600' }
const statusColors: Record<Row['status'], string> = { Active: 'bg-emerald-100 text-emerald-600', Inactive: 'bg-red-100 text-red-500', Pending: 'bg-amber-100 text-amber-600' }

type SortKey = 'name' | 'revenue' | 'plan' | 'status'
type Dir = 'asc' | 'desc'

const PAGE_SIZE = 5

export function TableShowcase() {
  const [query, setQuery]   = useState('')
  const [sort, setSort]     = useState<SortKey>('name')
  const [dir, setDir]       = useState<Dir>('asc')
  const [page, setPage]     = useState(0)
  const [selected, setSelected] = useState<Set<number>>(new Set())

  const toggleSort = (key: SortKey) => {
    if (sort === key) setDir(d => d === 'asc' ? 'desc' : 'asc')
    else { setSort(key); setDir('asc') }
    setPage(0)
  }

  const filtered = data
    .filter(r => `${r.name}${r.email}`.toLowerCase().includes(query.toLowerCase()))
    .sort((a, b) => {
      const mul = dir === 'asc' ? 1 : -1
      if (sort === 'revenue') return (a.revenue - b.revenue) * mul
      return a[sort].localeCompare(b[sort]) * mul
    })

  const pageData  = filtered.slice(page * PAGE_SIZE, (page + 1) * PAGE_SIZE)
  const pageCount = Math.ceil(filtered.length / PAGE_SIZE)

  const toggleRow = (id: number) => setSelected(s => { const n = new Set(s); n.has(id) ? n.delete(id) : n.add(id); return n })
  const allSelected = pageData.length > 0 && pageData.every(r => selected.has(r.id))
  const toggleAll = () => {
    const ids = pageData.map(r => r.id)
    setSelected(s => { const n = new Set(s); allSelected ? ids.forEach(id => n.delete(id)) : ids.forEach(id => n.add(id)); return n })
  }

  function SortIcon({ k }: { k: SortKey }) {
    if (sort !== k) return <ArrowUpDown className="w-3.5 h-3.5 text-slate-300" />
    return dir === 'asc' ? <ArrowUp className="w-3.5 h-3.5 text-sky-500" /> : <ArrowDown className="w-3.5 h-3.5 text-sky-500" />
  }

  return (
    <div className="clay-card overflow-hidden">
      {/* Toolbar */}
      <div className="p-4 border-b border-slate-100 flex items-center gap-3 flex-wrap">
        <div className="relative flex-1 min-w-48">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300" />
          <input
            value={query} onChange={e => { setQuery(e.target.value); setPage(0) }}
            placeholder="Search users…"
            className="w-full pl-9 pr-4 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-300 placeholder-slate-300"
          />
        </div>
        {selected.size > 0 && (
          <span className="text-xs font-semibold text-sky-600 bg-sky-50 px-3 py-1.5 rounded-lg">{selected.size} selected</span>
        )}
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-slate-50 border-b border-slate-100">
            <tr>
              <th className="pl-4 py-3 w-10">
                <input type="checkbox" checked={allSelected} onChange={toggleAll} className="w-4 h-4 rounded accent-sky-500 cursor-pointer" />
              </th>
              {([['name','User'], ['plan','Plan'], ['status','Status'], ['revenue','Revenue']] as [SortKey,string][]).map(([k, lbl]) => (
                <th key={k} className="px-4 py-3 text-left">
                  <button onClick={() => toggleSort(k)} className="flex items-center gap-1.5 font-semibold text-slate-500 hover:text-slate-700 cursor-pointer transition-colors">
                    {lbl}<SortIcon k={k} />
                  </button>
                </th>
              ))}
              <th className="px-4 py-3 text-left font-semibold text-slate-500">Joined</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {pageData.map(row => (
              <tr key={row.id} className={`group hover:bg-slate-50/60 transition-colors ${selected.has(row.id) ? 'bg-sky-50/40' : ''}`}>
                <td className="pl-4 py-3.5 w-10">
                  <input type="checkbox" checked={selected.has(row.id)} onChange={() => toggleRow(row.id)} className="w-4 h-4 rounded accent-sky-500 cursor-pointer" />
                </td>
                <td className="px-4 py-3.5">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white shrink-0"
                      style={{ background: `hsl(${(row.id * 47) % 360}, 60%, 65%)` }}>
                      {row.name.split(' ').map(p => p[0]).join('')}
                    </div>
                    <div>
                      <p className="font-semibold text-slate-800">{row.name}</p>
                      <p className="text-xs text-slate-400">{row.email}</p>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-3.5">
                  <span className={`text-xs font-semibold px-2.5 py-1 rounded-lg ${planColors[row.plan]}`}>{row.plan}</span>
                </td>
                <td className="px-4 py-3.5">
                  <div className="flex items-center gap-1.5">
                    <div className={`w-1.5 h-1.5 rounded-full ${row.status === 'Active' ? 'bg-emerald-400' : row.status === 'Pending' ? 'bg-amber-400' : 'bg-red-400'}`} />
                    <span className={`text-xs font-semibold px-2.5 py-1 rounded-lg ${statusColors[row.status]}`}>{row.status}</span>
                  </div>
                </td>
                <td className="px-4 py-3.5 font-semibold text-slate-800">
                  {row.revenue > 0 ? `$${row.revenue.toLocaleString()}` : <span className="text-slate-300">—</span>}
                </td>
                <td className="px-4 py-3.5 text-slate-400 text-xs">{row.joined}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="px-4 py-3 border-t border-slate-100 flex items-center justify-between gap-4">
        <p className="text-xs text-slate-400">Showing {Math.min(page * PAGE_SIZE + 1, filtered.length)}–{Math.min((page + 1) * PAGE_SIZE, filtered.length)} of {filtered.length} users</p>
        <div className="flex items-center gap-1">
          <button onClick={() => setPage(p => Math.max(0, p - 1))} disabled={page === 0}
            className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-slate-100 disabled:opacity-30 cursor-pointer disabled:cursor-default transition-colors">
            <ChevronLeft className="w-4 h-4 text-slate-500" />
          </button>
          {Array.from({ length: pageCount }, (_, i) => (
            <button key={i} onClick={() => setPage(i)}
              className={`w-8 h-8 flex items-center justify-center rounded-lg text-xs font-semibold cursor-pointer transition-colors ${page === i ? 'bg-sky-500 text-white shadow-clay' : 'hover:bg-slate-100 text-slate-500'}`}>
              {i + 1}
            </button>
          ))}
          <button onClick={() => setPage(p => Math.min(pageCount - 1, p + 1))} disabled={page === pageCount - 1}
            className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-slate-100 disabled:opacity-30 cursor-pointer disabled:cursor-default transition-colors">
            <ChevronRight className="w-4 h-4 text-slate-500" />
          </button>
        </div>
      </div>
    </div>
  )
}
