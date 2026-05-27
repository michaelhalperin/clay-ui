import { useState } from 'react'
import { Folder, FolderOpen, FileText, File, Image, Archive, ChevronRight, Plus, Trash2 } from 'lucide-react'

export interface TreeNode {
  id: string
  name: string
  type: 'folder' | 'file'
  ext?: string
  children?: TreeNode[]
  badge?: string
}

const TREE: TreeNode[] = [
  {
    id: 'src', name: 'src', type: 'folder', children: [
      {
        id: 'components', name: 'components', type: 'folder', badge: '12', children: [
          {
            id: 'ui', name: 'ui', type: 'folder', children: [
              { id: 'button', name: 'Button.tsx', type: 'file', ext: 'tsx' },
              { id: 'modal', name: 'Modal.tsx', type: 'file', ext: 'tsx' },
              { id: 'toast', name: 'Toast.tsx', type: 'file', ext: 'tsx' },
              { id: 'slider', name: 'Sliders.tsx', type: 'file', ext: 'tsx' },
            ],
          },
          {
            id: 'data', name: 'data', type: 'folder', children: [
              { id: 'charts', name: 'Charts.tsx', type: 'file', ext: 'tsx' },
              { id: 'table', name: 'Table.tsx', type: 'file', ext: 'tsx' },
              { id: 'kanban', name: 'Kanban.tsx', type: 'file', ext: 'tsx' },
            ],
          },
        ],
      },
      { id: 'app', name: 'App.tsx', type: 'file', ext: 'tsx' },
      { id: 'main', name: 'main.tsx', type: 'file', ext: 'tsx' },
      { id: 'css', name: 'index.css', type: 'file', ext: 'css' },
    ],
  },
  {
    id: 'public', name: 'public', type: 'folder', children: [
      { id: 'favicon', name: 'favicon.svg', type: 'file', ext: 'svg' },
      { id: 'hero', name: 'hero.png', type: 'file', ext: 'png' },
    ],
  },
  { id: 'pkg', name: 'package.json', type: 'file', ext: 'json' },
  { id: 'vite', name: 'vite.config.ts', type: 'file', ext: 'ts' },
  { id: 'tsconfig', name: 'tsconfig.json', type: 'file', ext: 'json' },
  { id: 'readme', name: 'README.md', type: 'file', ext: 'md' },
]

const EXT_ICON: Record<string, { icon: typeof File; color: string }> = {
  tsx:  { icon: FileText, color: 'text-sky-500' },
  ts:   { icon: FileText, color: 'text-sky-400' },
  css:  { icon: FileText, color: 'text-pink-400' },
  json: { icon: FileText, color: 'text-amber-400' },
  svg:  { icon: Image,    color: 'text-emerald-400' },
  png:  { icon: Image,    color: 'text-pink-400' },
  md:   { icon: FileText, color: 'text-slate-400' },
  zip:  { icon: Archive,  color: 'text-violet-400' },
}

function FileIcon({ ext }: { ext?: string }) {
  if (!ext) return <File className="w-3.5 h-3.5 text-slate-400" />
  const { icon: Icon, color } = EXT_ICON[ext] ?? { icon: File, color: 'text-slate-400' }
  return <Icon className={`w-3.5 h-3.5 ${color}`} />
}

function TreeNodeRow({
  node, depth, selected, onSelect, defaultOpen,
}: {
  node: TreeNode; depth: number; selected: string | null; onSelect: (id: string) => void; defaultOpen?: boolean
}) {
  const [open, setOpen] = useState(defaultOpen ?? depth < 1)
  const isFolder = node.type === 'folder'
  const isSelected = selected === node.id

  return (
    <div>
      <div
        onClick={() => { onSelect(node.id); if (isFolder) setOpen(o => !o) }}
        style={{ paddingLeft: `${depth * 16 + 8}px` }}
        className={`flex items-center gap-1.5 py-1 pr-2 rounded-lg cursor-pointer transition-colors group
          ${isSelected ? 'bg-sky-50 text-sky-700' : 'hover:bg-slate-50 text-slate-700'}`}>
        {/* Expand arrow */}
        {isFolder
          ? <ChevronRight className={`w-3 h-3 shrink-0 transition-transform ${open ? 'rotate-90' : ''} ${isSelected ? 'text-sky-400' : 'text-slate-300'}`} />
          : <span className="w-3 shrink-0" />}

        {/* Icon */}
        {isFolder
          ? open
            ? <FolderOpen className={`w-3.5 h-3.5 shrink-0 ${isSelected ? 'text-sky-500' : 'text-amber-400'}`} />
            : <Folder className={`w-3.5 h-3.5 shrink-0 ${isSelected ? 'text-sky-500' : 'text-amber-400'}`} />
          : <FileIcon ext={node.ext} />}

        <span className={`text-xs flex-1 truncate font-${isSelected ? 'semibold' : 'medium'}`}>{node.name}</span>

        {node.badge && (
          <span className="text-[9px] font-bold bg-sky-100 text-sky-600 px-1.5 py-0.5 rounded-full shrink-0">{node.badge}</span>
        )}
      </div>

      {isFolder && open && node.children?.map(child => (
        <TreeNodeRow key={child.id} node={child} depth={depth + 1} selected={selected} onSelect={onSelect} />
      ))}
    </div>
  )
}

export function FileTree() {
  const [selected, setSelected] = useState<string | null>('app')
  return (
    <div className="clay-card overflow-hidden">
      {/* Toolbar */}
      <div className="flex items-center gap-2 px-3 py-2.5 border-b border-slate-100 bg-slate-50">
        <span className="text-xs font-bold text-slate-500 flex-1 uppercase tracking-widest">Explorer</span>
        <button className="text-slate-400 hover:text-slate-700 cursor-pointer transition-colors"><Plus className="w-3.5 h-3.5" /></button>
        <button className="text-slate-400 hover:text-red-400 cursor-pointer transition-colors"><Trash2 className="w-3.5 h-3.5" /></button>
      </div>
      <div className="py-2 px-1 max-h-80 overflow-y-auto">
        {TREE.map(node => (
          <TreeNodeRow key={node.id} node={node} depth={0} selected={selected} onSelect={setSelected} defaultOpen />
        ))}
      </div>
    </div>
  )
}

/* ── Org chart / nested structure ── */
interface OrgNode {
  name: string; role: string; color: string; initials: string
  reports?: OrgNode[]
}

const ORG: OrgNode = {
  name: 'Sophie L.', role: 'CEO', color: 'from-sky-400 to-violet-400', initials: 'SL',
  reports: [
    {
      name: 'Michael H.', role: 'CTO', color: 'from-emerald-400 to-sky-400', initials: 'MH',
      reports: [
        { name: 'Anya P.', role: 'Frontend Lead', color: 'from-pink-400 to-orange-400', initials: 'AP' },
        { name: 'Leon K.', role: 'Backend Lead',  color: 'from-indigo-400 to-violet-400', initials: 'LK' },
      ],
    },
    {
      name: 'Marcus T.', role: 'CPO', color: 'from-amber-400 to-pink-400', initials: 'MT',
      reports: [
        { name: 'Priya S.', role: 'Product Manager', color: 'from-teal-400 to-emerald-400', initials: 'PS' },
      ],
    },
  ],
}

function OrgNodeEl({ node, depth }: { node: OrgNode; depth: number }) {
  const [open, setOpen] = useState(true)
  return (
    <div style={{ paddingLeft: depth > 0 ? '24px' : '0' }}>
      <div className="relative flex items-center gap-2 py-1">
        {depth > 0 && <div className="absolute left-0 top-1/2 w-4 h-px bg-slate-200 -translate-x-4" />}
        <button onClick={() => setOpen(o => !o)} className="flex items-center gap-2 clay-card px-3 py-2 cursor-pointer hover:shadow-clay-lg transition-all">
          <div className={`w-7 h-7 rounded-full bg-gradient-to-br ${node.color} flex items-center justify-center shrink-0`}>
            <span className="text-[10px] font-bold text-white">{node.initials}</span>
          </div>
          <div className="text-left">
            <p className="text-xs font-bold text-slate-800">{node.name}</p>
            <p className="text-[10px] text-slate-400">{node.role}</p>
          </div>
          {node.reports && (
            <ChevronRight className={`w-3 h-3 text-slate-300 transition-transform ml-1 ${open ? 'rotate-90' : ''}`} />
          )}
        </button>
      </div>
      {node.reports && open && (
        <div className="relative ml-3 border-l border-slate-200 pl-0">
          {node.reports.map(r => <OrgNodeEl key={r.name} node={r} depth={depth + 1} />)}
        </div>
      )}
    </div>
  )
}

export function TreeViewShowcase() {
  return (
    <div className="grid grid-cols-2 gap-8">
      <div>
        <p className="section-label">File Explorer</p>
        <FileTree />
      </div>
      <div>
        <p className="section-label">Org Chart Tree</p>
        <OrgNodeEl node={ORG} depth={0} />
      </div>
    </div>
  )
}
