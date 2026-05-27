import { useState, useRef, useCallback } from 'react'
import {
  Bold, Italic, Underline, Strikethrough, AlignLeft, AlignCenter, AlignRight,
  List, ListOrdered, Link2, Image, Quote, Code, Undo, Redo, Type
} from 'lucide-react'

type FormatCmd = 'bold' | 'italic' | 'underline' | 'strikeThrough' |
  'insertUnorderedList' | 'insertOrderedList' | 'justifyLeft' | 'justifyCenter' | 'justifyRight' |
  'formatBlock' | 'insertHTML' | 'undo' | 'redo'

function ToolbarBtn({ icon, title, onClick, active }: {
  icon: React.ReactNode; title: string; onClick: () => void; active?: boolean
}) {
  return (
    <button
      onMouseDown={e => { e.preventDefault(); onClick() }}
      title={title}
      className={`w-7 h-7 flex items-center justify-center rounded-lg cursor-pointer transition-all
        ${active ? 'bg-sky-100 text-sky-700' : 'text-slate-500 hover:bg-slate-100 hover:text-slate-700'}`}>
      {icon}
    </button>
  )
}

function Divider() {
  return <div className="w-px h-5 bg-slate-200 mx-0.5 shrink-0" />
}

function useActiveFormats(editorRef: React.RefObject<HTMLDivElement | null>) {
  const [active, setActive] = useState<Set<string>>(new Set())

  const refresh = useCallback(() => {
    const cmds = ['bold','italic','underline','strikeThrough','insertUnorderedList','insertOrderedList']
    const next = new Set<string>()
    cmds.forEach(cmd => { try { if (document.queryCommandState(cmd)) next.add(cmd) } catch {} })
    setActive(next)
  }, [])

  return { active, refresh }
}

function exec(cmd: FormatCmd, value?: string) {
  document.execCommand(cmd, false, value)
}

const INITIAL_HTML = `<p><strong>Welcome to the editor</strong> — select text and use the toolbar to format it.</p>
<p>You can write <em>italic</em>, <u>underlined</u>, or <s>strikethrough</s> text. Try the lists:</p>
<ul><li>Drag-and-drop components</li><li>Portal-rendered overlays</li><li>Custom pointer-event sliders</li></ul>
<blockquote style="border-left:3px solid #0ea5e9;margin:8px 0;padding:4px 12px;color:#64748b;font-style:italic">"Design is not just what it looks like — it's how it works."</blockquote>`

export function RichTextEditorShowcase() {
  const editorRef = useRef<HTMLDivElement>(null)
  const { active, refresh } = useActiveFormats(editorRef)
  const [wordCount, setWordCount] = useState(0)

  const updateCount = () => {
    const text = editorRef.current?.innerText ?? ''
    setWordCount(text.trim() ? text.trim().split(/\s+/).length : 0)
  }

  const insertLink = () => {
    const url = window.prompt('Enter URL:', 'https://')
    if (url) exec('insertHTML', `<a href="${url}" style="color:#0ea5e9;text-decoration:underline">${url}</a>`)
  }

  const insertQuote = () => {
    exec('insertHTML', '<blockquote style="border-left:3px solid #0ea5e9;margin:8px 0;padding:4px 12px;color:#64748b;font-style:italic">Quote text here</blockquote>')
  }

  const insertCode = () => {
    exec('insertHTML', '<code style="background:#f1f5f9;color:#0ea5e9;padding:2px 6px;border-radius:4px;font-family:monospace;font-size:13px">code</code>')
  }

  return (
    <div className="space-y-4">
      <div className="clay-card overflow-hidden">
        {/* Toolbar */}
        <div className="flex items-center flex-wrap gap-0.5 px-3 py-2.5 border-b border-slate-100 bg-slate-50">
          <ToolbarBtn icon={<Undo className="w-3.5 h-3.5" />}         title="Undo"         onClick={() => exec('undo')} />
          <ToolbarBtn icon={<Redo className="w-3.5 h-3.5" />}         title="Redo"         onClick={() => exec('redo')} />
          <Divider />
          <ToolbarBtn icon={<Bold className="w-3.5 h-3.5" />}         title="Bold"         onClick={() => { exec('bold');          refresh() }} active={active.has('bold')} />
          <ToolbarBtn icon={<Italic className="w-3.5 h-3.5" />}       title="Italic"       onClick={() => { exec('italic');        refresh() }} active={active.has('italic')} />
          <ToolbarBtn icon={<Underline className="w-3.5 h-3.5" />}    title="Underline"    onClick={() => { exec('underline');     refresh() }} active={active.has('underline')} />
          <ToolbarBtn icon={<Strikethrough className="w-3.5 h-3.5" />}title="Strikethrough"onClick={() => { exec('strikeThrough'); refresh() }} active={active.has('strikeThrough')} />
          <Divider />
          <ToolbarBtn icon={<AlignLeft className="w-3.5 h-3.5" />}    title="Align left"   onClick={() => exec('justifyLeft')} />
          <ToolbarBtn icon={<AlignCenter className="w-3.5 h-3.5" />}  title="Align center" onClick={() => exec('justifyCenter')} />
          <ToolbarBtn icon={<AlignRight className="w-3.5 h-3.5" />}   title="Align right"  onClick={() => exec('justifyRight')} />
          <Divider />
          <ToolbarBtn icon={<List className="w-3.5 h-3.5" />}         title="Bullet list"  onClick={() => { exec('insertUnorderedList'); refresh() }} active={active.has('insertUnorderedList')} />
          <ToolbarBtn icon={<ListOrdered className="w-3.5 h-3.5" />}  title="Ordered list" onClick={() => { exec('insertOrderedList');  refresh() }} active={active.has('insertOrderedList')} />
          <Divider />
          <ToolbarBtn icon={<Quote className="w-3.5 h-3.5" />}        title="Blockquote"   onClick={insertQuote} />
          <ToolbarBtn icon={<Code className="w-3.5 h-3.5" />}         title="Inline code"  onClick={insertCode} />
          <ToolbarBtn icon={<Link2 className="w-3.5 h-3.5" />}        title="Insert link"  onClick={insertLink} />
          <Divider />
          <select
            onMouseDown={e => e.stopPropagation()}
            onChange={e => { exec('formatBlock', e.target.value); e.target.value = 'p' }}
            defaultValue="p"
            className="text-xs text-slate-600 border border-slate-200 rounded-lg px-2 py-1 bg-white cursor-pointer focus:outline-none focus:border-sky-400 ml-0.5">
            <option value="p">Paragraph</option>
            <option value="h1">Heading 1</option>
            <option value="h2">Heading 2</option>
            <option value="h3">Heading 3</option>
          </select>
        </div>

        {/* Editable area */}
        <div
          ref={editorRef}
          contentEditable
          suppressContentEditableWarning
          onKeyUp={() => { refresh(); updateCount() }}
          onMouseUp={refresh}
          dangerouslySetInnerHTML={{ __html: INITIAL_HTML }}
          className="min-h-48 px-5 py-4 text-sm text-slate-700 leading-relaxed focus:outline-none
            [&_strong]:font-bold [&_em]:italic [&_u]:underline [&_s]:line-through
            [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:my-1
            [&_ol]:list-decimal [&_ol]:pl-5 [&_ol]:my-1
            [&_li]:my-0.5
            [&_h1]:text-2xl [&_h1]:font-heading [&_h1]:font-bold [&_h1]:text-slate-900 [&_h1]:my-2
            [&_h2]:text-xl  [&_h2]:font-heading [&_h2]:font-bold [&_h2]:text-slate-800 [&_h2]:my-1.5
            [&_h3]:text-lg  [&_h3]:font-heading [&_h3]:font-bold [&_h3]:text-slate-700 [&_h3]:my-1"
        />

        {/* Footer */}
        <div className="px-5 py-2 border-t border-slate-100 bg-slate-50 flex items-center justify-between">
          <span className="text-[11px] text-slate-400">Select text to apply formatting</span>
          <span className="text-[11px] text-slate-400">{wordCount} words</span>
        </div>
      </div>
    </div>
  )
}
