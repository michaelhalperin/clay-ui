import { useState, useMemo } from 'react'
import { ChevronUp, ChevronDown, ChevronsUpDown, Search, ChevronLeft, ChevronRight } from 'lucide-react'

interface Row {
  id: number; name: string; role: string; status: 'Active' | 'Inactive' | 'Pending'
  team: string; joined: string; score: number
}

const RAW: Row[] = [
  { id: 1,  name: 'Sophie Leblanc',  role: 'Design Lead',       status: 'Active',   team: 'Product',   joined: '2022-03-14', score: 98 },
  { id: 2,  name: 'Marcus Trent',    role: 'Senior Engineer',    status: 'Active',   team: 'Platform',  joined: '2021-07-22', score: 91 },
  { id: 3,  name: 'Anya Petrov',     role: 'Product Manager',    status: 'Active',   team: 'Product',   joined: '2023-01-05', score: 87 },
  { id: 4,  name: 'Leon Kim',        role: 'Frontend Engineer',  status: 'Inactive', team: 'Platform',  joined: '2020-11-30', score: 74 },
  { id: 5,  name: 'Priya Sharma',    role: 'Data Scientist',     status: 'Active',   team: 'Analytics', joined: '2022-09-18', score: 95 },
  { id: 6,  name: 'Michael Hale',    role: 'Backend Engineer',   status: 'Active',   team: 'Platform',  joined: '2021-04-11', score: 82 },
  { id: 7,  name: 'Yuki Tanaka',     role: 'UX Researcher',      status: 'Pending',  team: 'Product',   joined: '2024-02-01', score: 79 },
  { id: 8,  name: 'Carlos Reyes',    role: 'DevOps Engineer',    status: 'Active',   team: 'Infra',     joined: '2022-06-27', score: 88 },
  { id: 9,  name: 'Emma Wilson',     role: 'iOS Engineer',       status: 'Active',   team: 'Mobile',    joined: '2023-08-14', score: 85 },
  { id: 10, name: 'Liam Parker',     role: 'Security Engineer',  status: 'Inactive', team: 'Infra',     joined: '2019-12-03', score: 71 },
  { id: 11, name: 'Nina Rossi',      role: 'Android Engineer',   status: 'Active',   team: 'Mobile',    joined: '2023-11-20', score: 80 },
  { id: 12, name: 'Omar Hassan',     role: 'ML Engineer',        status: 'Active',   team: 'Analytics', joined: '2022-05-08', score: 93 },
]

type SortDir = 'asc' | 'desc' | null
type Col = keyof Row

const STATUS_STYLES: Record<string, string> = {
  Active:   'bg-emerald-50 text-emerald-700 border border-emerald-100',
  Inactive: 'bg-slate-100 text-slate-500 border border-slate-200',
  Pending:  'bg-amber-50 text-amber-700 border border-amber-100',
}

const TEAM_COLORS: Record<string, string> = {
  Product:   '#0ea5e9', Platform: '#8b5cf6', Analytics: '#10b981',
  Infra: '#f59e0b', Mobile: '#ec4899',
}

export function DataGridShowcase() {
  const [query, setQuery]       = useState('')
  const [sortCol, setSortCol]   = useState<Col>('name')
  const [sortDir, setSortDir]   = useState<SortDir>('asc')
  const [selected, setSelected] = useState<Set<number>>(new Set())
  const [page, setPage]         = useState(1)
  const [pageSize]              = useState(5)

  const handleSort = (col: Col) => {
    if (sortCol === col) setSortDir(d => d === 'asc' ? 'desc' : d === 'desc' ? null : 'asc')
    else { setSortCol(col); setSortDir('asc') }
  }

  const filtered = useMemo(() => {
    let rows = RAW.filter(r =>
      r.name.toLowerCase().includes(query.toLowerCase()) ||
      r.role.toLowerCase().includes(query.toLowerCase()) ||
      r.team.toLowerCase().includes(query.toLowerCase())
    )
    if (sortDir) {
      rows = [...rows].sort((a, b) => {
        const av = a[sortCol], bv = b[sortCol]
        const cmp = typeof av === 'number' ? (av as number) - (bv as number) : String(av).localeCompare(String(bv))
        return sortDir === 'asc' ? cmp : -cmp
      })
    }
    return rows
  }, [query, sortCol, sortDir])

  const pageCount = Math.ceil(filtered.length / pageSize)
  const paged = filtered.slice((page - 1) * pageSize, page * pageSize)

  const toggleAll = () => {
    if (paged.every(r => selected.has(r.id))) setSelected(s => { const n = new Set(s); paged.forEach(r => n.delete(r.id)); return n })
    else setSelected(s => { const n = new Set(s); paged.forEach(r => n.add(r.id)); return n })
  }

  const SortIcon = ({ col }: { col: Col }) => {
    if (sortCol !== col || !sortDir) return <ChevronsUpDown className="w-3 h-3 text-slate-300" />
    return sortDir === 'asc' ? <ChevronUp className="w-3 h-3 text-sky-500" /> : <ChevronDown className="w-3 h-3 text-sky-500" />
  }

  const ColHeader = ({ col, label, className = '' }: { col: Col; label: string; className?: string }) => (
    <th className={`px-4 py-3 text-left ${className}`}>
      <button onClick={() => handleSort(col)}
        className="flex items-center gap-1 text-[11px] font-bold text-slate-400 uppercase tracking-widest hover:text-slate-600 cursor-pointer transition-colors">
        {label}<SortIcon col={col} />
      </button>
    </th>
  )

  return (
    <div className="space-y-3">
      {/* Toolbar */}
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-2 bg-white border-2 border-slate-200 rounded-xl px-3 h-9 flex-1 max-w-xs focus-within:border-sky-400 transition-colors">
          <Search className="w-3.5 h-3.5 text-slate-400 shrink-0" />
          <input value={query} onChange={e => { setQuery(e.target.value); setPage(1) }}
            placeholder="Search name, role, team…"
            className="flex-1 text-sm bg-transparent focus:outline-none text-slate-700 placeholder-slate-300" />
        </div>
        <div className="flex items-center gap-2 text-xs text-slate-500">
          {selected.size > 0 && (
            <span className="bg-sky-100 text-sky-700 font-semibold px-2.5 py-1 rounded-lg">
              {selected.size} selected
            </span>
          )}
          <span>{filtered.length} rows</span>
        </div>
      </div>

      {/* Table */}
      <div className="clay-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="border-b border-slate-100 bg-slate-50/80">
              <tr>
                <th className="px-4 py-3 w-10">
                  <input type="checkbox"
                    checked={paged.length > 0 && paged.every(r => selected.has(r.id))}
                    onChange={toggleAll}
                    className="w-4 h-4 rounded border-slate-300 cursor-pointer accent-sky-500" />
                </th>
                <ColHeader col="name"   label="Name" />
                <ColHeader col="role"   label="Role" />
                <ColHeader col="team"   label="Team" />
                <ColHeader col="status" label="Status" />
                <ColHeader col="score"  label="Score" className="text-right" />
                <ColHeader col="joined" label="Joined" />
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {paged.map(row => (
                <tr key={row.id}
                  onClick={() => setSelected(s => { const n = new Set(s); n.has(row.id) ? n.delete(row.id) : n.add(row.id); return n })}
                  className={`cursor-pointer transition-colors ${selected.has(row.id) ? 'bg-sky-50' : 'hover:bg-slate-50'}`}>
                  <td className="px-4 py-3">
                    <input type="checkbox" checked={selected.has(row.id)} onChange={() => {}}
                      className="w-4 h-4 rounded border-slate-300 cursor-pointer accent-sky-500" />
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2.5">
                      <div className="w-7 h-7 rounded-full flex items-center justify-center text-white text-[10px] font-bold shrink-0"
                        style={{ background: TEAM_COLORS[row.team] ?? '#94a3b8' }}>
                        {row.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <span className="font-medium text-slate-800 whitespace-nowrap">{row.name}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-slate-500 whitespace-nowrap">{row.role}</td>
                  <td className="px-4 py-3">
                    <span className="text-xs font-semibold px-2 py-0.5 rounded-full"
                      style={{ background: (TEAM_COLORS[row.team] ?? '#94a3b8') + '20', color: TEAM_COLORS[row.team] ?? '#94a3b8' }}>
                      {row.team}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <span className={`text-[11px] font-semibold px-2 py-0.5 rounded-full ${STATUS_STYLES[row.status]}`}>
                      {row.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <div className="w-12 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                        <div className="h-full rounded-full" style={{ width: `${row.score}%`, background: row.score > 90 ? '#10b981' : row.score > 75 ? '#0ea5e9' : '#f59e0b' }} />
                      </div>
                      <span className="font-semibold tabular-nums text-slate-700 text-xs w-6 text-right">{row.score}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-slate-400 text-xs whitespace-nowrap">{row.joined}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between px-4 py-3 border-t border-slate-100 bg-slate-50/50">
          <span className="text-xs text-slate-400">
            {(page - 1) * pageSize + 1}–{Math.min(page * pageSize, filtered.length)} of {filtered.length}
          </span>
          <div className="flex items-center gap-1">
            <button onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1}
              className="w-7 h-7 flex items-center justify-center rounded-lg hover:bg-slate-200 disabled:opacity-30 cursor-pointer disabled:cursor-default transition-colors text-slate-500">
              <ChevronLeft className="w-4 h-4" />
            </button>
            {Array.from({ length: pageCount }, (_, i) => i + 1).map(p => (
              <button key={p} onClick={() => setPage(p)}
                className={`w-7 h-7 text-xs font-semibold rounded-lg cursor-pointer transition-all
                  ${p === page ? 'bg-sky-500 text-white shadow-clay' : 'hover:bg-slate-200 text-slate-500'}`}>
                {p}
              </button>
            ))}
            <button onClick={() => setPage(p => Math.min(pageCount, p + 1))} disabled={page === pageCount}
              className="w-7 h-7 flex items-center justify-center rounded-lg hover:bg-slate-200 disabled:opacity-30 cursor-pointer disabled:cursor-default transition-colors text-slate-500">
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
