import { useState } from 'react'
import { Copy, Check, ChevronDown, ChevronUp, Terminal } from 'lucide-react'

type Token = { text: string; color: string }

function tokenize(code: string, lang: string): Token[][] {
  const lines = code.split('\n')

  if (lang === 'tsx' || lang === 'ts' || lang === 'js') {
    return lines.map(line => {
      const tokens: Token[] = []
      let rest = line

      const rules: [RegExp, string][] = [
        [/^(import|export|from|const|let|function|return|type|interface|extends|default|async|await|=>)\b/, '#93c5fd'],
        [/^(useState|useEffect|useRef|useCallback|createPortal|useLayoutEffect)\b/, '#c4b5fd'],
        [/^(true|false|null|undefined)\b/, '#f97316'],
        [/^"[^"]*"|^'[^']*'|^`[^`]*`/, '#86efac'],
        [/^\/\/.*/, '#94a3b8'],
        [/^<\/?[A-Z][a-zA-Z]*/, '#f9a8d4'],
        [/^<\/?[a-z][a-zA-Z]*/, '#7dd3fc'],
        [/^[A-Z][a-zA-Z]*(?=\()/, '#fde68a'],
        [/^[a-zA-Z_$][a-zA-Z0-9_$]*(?=\()/, '#7dd3fc'],
        [/^\d+/, '#fb923c'],
        [/^[{}()[\]<>/.,;:=+\-*&|!?]/, '#94a3b8'],
      ]

      while (rest.length > 0) {
        let matched = false
        for (const [rx, color] of rules) {
          const m = rest.match(rx)
          if (m) {
            tokens.push({ text: m[0], color })
            rest = rest.slice(m[0].length)
            matched = true
            break
          }
        }
        if (!matched) {
          const char = rest[0]
          const last = tokens[tokens.length - 1]
          if (last && last.color === '#e2e8f0') {
            last.text += char
          } else {
            tokens.push({ text: char, color: '#e2e8f0' })
          }
          rest = rest.slice(1)
        }
      }
      return tokens
    })
  }

  if (lang === 'bash' || lang === 'sh') {
    return lines.map(line => {
      if (line.startsWith('#')) return [{ text: line, color: '#94a3b8' }]
      if (line.startsWith('$') || line.startsWith('npm') || line.startsWith('npx')) {
        const [cmd, ...rest] = line.split(' ')
        return [
          { text: cmd, color: '#86efac' },
          { text: ' ' + rest.join(' '), color: '#e2e8f0' },
        ]
      }
      return [{ text: line, color: '#e2e8f0' }]
    })
  }

  if (lang === 'json') {
    return lines.map(line => {
      const tokens: Token[] = []
      let rest = line
      while (rest.length > 0) {
        const keyM = rest.match(/^"[^"]+"\s*:/)
        if (keyM) { tokens.push({ text: keyM[0], color: '#93c5fd' }); rest = rest.slice(keyM[0].length); continue }
        const strM = rest.match(/^"[^"]*"/)
        if (strM) { tokens.push({ text: strM[0], color: '#86efac' }); rest = rest.slice(strM[0].length); continue }
        const numM = rest.match(/^\d+(\.\d+)?/)
        if (numM) { tokens.push({ text: numM[0], color: '#fb923c' }); rest = rest.slice(numM[0].length); continue }
        const boolM = rest.match(/^(true|false|null)/)
        if (boolM) { tokens.push({ text: boolM[0], color: '#f97316' }); rest = rest.slice(boolM[0].length); continue }
        tokens.push({ text: rest[0], color: '#94a3b8' }); rest = rest.slice(1)
      }
      return tokens
    })
  }

  return lines.map(line => [{ text: line, color: '#e2e8f0' }])
}

const SAMPLES: Record<string, { lang: string; label: string; code: string }> = {
  tsx: {
    lang: 'tsx', label: 'TSX',
    code: `import { useState, useEffect } from 'react'
import { createPortal } from 'react-dom'

interface ToastProps {
  message: string
  type: 'success' | 'error'
}

export function Toast({ message, type }: ToastProps) {
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => setVisible(false), 3000)
    return () => clearTimeout(timer)
  }, [])

  if (!visible) return null

  return createPortal(
    <div className="fixed bottom-4 right-4 clay-card p-4">
      {message}
    </div>,
    document.body
  )
}`,
  },
  bash: {
    lang: 'bash', label: 'Bash',
    code: `# Install dependencies
npm install

# Start dev server
npm run dev

# Build for production
npm run build

npx tsc --noEmit`,
  },
  json: {
    lang: 'json', label: 'JSON',
    code: `{
  "name": "clay-ui-sandbox",
  "version": "1.0.0",
  "private": true,
  "scripts": {
    "dev": "vite",
    "build": "tsc && vite build",
    "preview": "vite preview"
  },
  "dependencies": {
    "react": "^18.2.0",
    "recharts": "^2.10.0",
    "lucide-react": "^0.344.0"
  }
}`,
  },
}

export function CodeBlock({ lang, code, label, collapsible = false }: {
  lang: string; code: string; label: string; collapsible?: boolean
}) {
  const [copied, setCopied] = useState(false)
  const [collapsed, setCollapsed] = useState(false)
  const tokens = tokenize(code, lang)

  const copy = () => {
    navigator.clipboard?.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 1500)
  }

  return (
    <div className="rounded-clay overflow-hidden shadow-clay border border-slate-700">
      {/* Toolbar */}
      <div className="flex items-center gap-2 px-4 py-2.5 bg-slate-800 border-b border-slate-700">
        <Terminal className="w-3.5 h-3.5 text-slate-500" />
        <span className="text-xs font-bold text-slate-400 uppercase tracking-widest flex-1">{label}</span>
        {collapsible && (
          <button onClick={() => setCollapsed(c => !c)}
            className="text-slate-500 hover:text-slate-300 cursor-pointer transition-colors">
            {collapsed ? <ChevronDown className="w-4 h-4" /> : <ChevronUp className="w-4 h-4" />}
          </button>
        )}
        <button onClick={copy}
          className="flex items-center gap-1.5 text-[11px] font-semibold text-slate-400 hover:text-white cursor-pointer transition-colors px-2 py-1 rounded-lg hover:bg-slate-700">
          {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
          {copied ? 'Copied!' : 'Copy'}
        </button>
      </div>

      {/* Code */}
      {!collapsed && (
        <div className="bg-slate-900 overflow-x-auto">
          <table className="w-full text-xs leading-6 font-mono">
            <tbody>
              {tokens.map((line, li) => (
                <tr key={li} className="hover:bg-slate-800/50 transition-colors">
                  <td className="select-none text-right pr-4 pl-4 text-slate-600 w-8 shrink-0">{li + 1}</td>
                  <td className="pr-4 whitespace-pre">
                    {line.map((tok, ti) => (
                      <span key={ti} style={{ color: tok.color }}>{tok.text}</span>
                    ))}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}

export function InlineCode({ children }: { children: string }) {
  return (
    <code className="font-mono text-xs bg-slate-100 text-sky-600 px-1.5 py-0.5 rounded-md border border-slate-200">{children}</code>
  )
}

export function CodeBlockShowcase() {
  const [active, setActive] = useState<keyof typeof SAMPLES>('tsx')
  const sample = SAMPLES[active]

  return (
    <div className="space-y-6">
      <div>
        <p className="section-label">Syntax Highlighted</p>
        <div className="flex gap-2 mb-3">
          {Object.keys(SAMPLES).map(k => (
            <button key={k} onClick={() => setActive(k as keyof typeof SAMPLES)}
              className={`text-xs font-bold px-3 py-1.5 rounded-xl cursor-pointer transition-all
                ${active === k ? 'bg-slate-800 text-white shadow-clay' : 'bg-slate-100 text-slate-500 hover:bg-slate-200'}`}>
              {SAMPLES[k].label}
            </button>
          ))}
        </div>
        <CodeBlock lang={sample.lang} code={sample.code} label={`${sample.label} · example.${sample.lang}`} collapsible />
      </div>

      <div>
        <p className="section-label">Inline Code</p>
        <div className="clay-card p-4 text-sm text-slate-600 leading-loose">
          Run <InlineCode>npm install</InlineCode> to install dependencies, then <InlineCode>npm run dev</InlineCode> to start the development server on <InlineCode>http://localhost:5173</InlineCode>.
        </div>
      </div>
    </div>
  )
}
