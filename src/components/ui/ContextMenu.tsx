import { useState, useEffect, useLayoutEffect, useRef, useCallback } from 'react'
import { createPortal } from 'react-dom'
import { Copy, Scissors, Clipboard, Trash2, Share2, Edit2, Link2, Download, Star, EyeOff } from 'lucide-react'

export interface ContextMenuItem {
  icon: React.ReactNode
  label: string
  shortcut?: string
  danger?: boolean
  dividerAfter?: boolean
}

const menuGroups: ContextMenuItem[][] = [
  [
    { icon: <Edit2 className="w-4 h-4" />,    label: 'Rename',      shortcut: 'F2' },
    { icon: <Copy className="w-4 h-4" />,     label: 'Duplicate',   shortcut: '⌘D' },
    { icon: <Star className="w-4 h-4" />,     label: 'Add to starred' },
  ],
  [
    { icon: <Scissors className="w-4 h-4" />, label: 'Cut',         shortcut: '⌘X' },
    { icon: <Copy className="w-4 h-4" />,     label: 'Copy',        shortcut: '⌘C' },
    { icon: <Clipboard className="w-4 h-4" />,label: 'Paste',       shortcut: '⌘V' },
  ],
  [
    { icon: <Link2 className="w-4 h-4" />,    label: 'Copy link' },
    { icon: <Share2 className="w-4 h-4" />,   label: 'Share…' },
    { icon: <Download className="w-4 h-4" />, label: 'Download' },
    { icon: <EyeOff className="w-4 h-4" />,   label: 'Hide from view' },
  ],
  [
    { icon: <Trash2 className="w-4 h-4" />,   label: 'Move to trash', danger: true },
  ],
]

const files = [
  { name: 'clay-ui-design.fig',   size: '4.2 MB', type: 'Figma',      color: '#f472b6' },
  { name: 'components.tsx',       size: '18 KB',  type: 'TypeScript',  color: '#0ea5e9' },
  { name: 'brand-assets.zip',     size: '28 MB',  type: 'Archive',     color: '#f59e0b' },
  { name: 'analytics-q2.xlsx',    size: '940 KB', type: 'Spreadsheet', color: '#10b981' },
  { name: 'presentation.pdf',     size: '2.1 MB', type: 'PDF',         color: '#ef4444' },
]

export function ContextMenuShowcase() {
  const [menu, setMenu] = useState<{ x: number; y: number; file: string; ready: boolean } | null>(null)
  const menuRef = useRef<HTMLDivElement>(null)

  const close = useCallback(() => setMenu(null), [])

  // After the menu renders, measure its true size and flip/clamp so it never escapes the viewport
  useLayoutEffect(() => {
    if (!menu || menu.ready || !menuRef.current) return
    const { width, height } = menuRef.current.getBoundingClientRect()
    const GAP = 8
    const vw = window.innerWidth
    const vh = window.innerHeight
    // Flip horizontally if it would overflow the right edge
    const x = menu.x + width + GAP > vw
      ? Math.max(GAP, menu.x - width)
      : menu.x
    // Flip vertically if it would overflow the bottom edge
    const y = menu.y + height + GAP > vh
      ? Math.max(GAP, menu.y - height)
      : menu.y
    setMenu(m => m ? { ...m, x, y, ready: true } : null)
  }, [menu])

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) close()
    }
    window.addEventListener('mousedown', handler)
    window.addEventListener('scroll', close)
    return () => { window.removeEventListener('mousedown', handler); window.removeEventListener('scroll', close) }
  }, [close])

  useEffect(() => {
    const esc = (e: KeyboardEvent) => { if (e.key === 'Escape') close() }
    window.addEventListener('keydown', esc)
    return () => window.removeEventListener('keydown', esc)
  }, [close])

  const onContextMenu = (e: React.MouseEvent, fileName: string) => {
    e.preventDefault()
    setMenu({ x: e.clientX, y: e.clientY, file: fileName, ready: false })
  }

  return (
    <div className="space-y-4 w-full">
      <p className="section-label">Right-click Context Menu</p>
      <p className="text-xs text-slate-400 -mt-2">Right-click any file row to open the context menu.</p>

      <div className="clay-card overflow-hidden">
        <div className="px-4 py-3 bg-slate-50 border-b border-slate-100 flex items-center gap-3">
          <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">Name</span>
          <span className="ml-auto text-xs font-bold text-slate-500 uppercase tracking-widest">Size</span>
          <span className="text-xs font-bold text-slate-500 uppercase tracking-widest w-24 text-right">Type</span>
        </div>
        <div className="divide-y divide-slate-50">
          {files.map(f => (
            <div key={f.name}
              onContextMenu={e => onContextMenu(e, f.name)}
              className={`flex items-center gap-3 px-4 py-3 cursor-context-menu hover:bg-slate-50 transition-colors select-none
                ${menu?.file === f.name ? 'bg-sky-50/60' : ''}`}>
              <div className="w-8 h-8 rounded-lg flex items-center justify-center text-white text-[10px] font-bold shrink-0"
                style={{ background: f.color }}>
                {f.type.slice(0, 2).toUpperCase()}
              </div>
              <span className="text-sm font-medium text-slate-700 flex-1">{f.name}</span>
              <span className="text-xs text-slate-400 ml-auto">{f.size}</span>
              <span className="text-xs text-slate-400 w-24 text-right">{f.type}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Context menu — portaled to body so no parent overflow/transform can clip it */}
      {menu && createPortal(
        <div ref={menuRef}
          className="fixed z-[200] bg-white border border-slate-100 rounded-clay shadow-clay-lg py-1 w-52 overflow-hidden"
          style={{
            top: menu.y,
            left: menu.x,
            opacity: menu.ready ? 1 : 0,
            animation: menu.ready ? 'slideDown 0.12s ease' : 'none',
          }}>
          <div className="px-3 py-1.5 border-b border-slate-100">
            <p className="text-[10px] font-bold text-slate-400 truncate uppercase tracking-widest">{menu.file}</p>
          </div>
          {menuGroups.map((group, gi) => (
            <div key={gi}>
              {gi > 0 && <div className="my-1 border-t border-slate-100" />}
              {group.map(item => (
                <button key={item.label} onClick={close}
                  className={`w-full flex items-center gap-2.5 px-3 py-2 text-sm cursor-pointer transition-colors
                    ${item.danger ? 'text-red-500 hover:bg-red-50' : 'text-slate-600 hover:bg-slate-50'}`}>
                  <span className={item.danger ? 'text-red-400' : 'text-slate-400'}>{item.icon}</span>
                  <span className="flex-1 text-left">{item.label}</span>
                  {item.shortcut && <kbd className="text-[10px] text-slate-400 font-mono">{item.shortcut}</kbd>}
                </button>
              ))}
            </div>
          ))}
        </div>,
        document.body
      )}
    </div>
  )
}
