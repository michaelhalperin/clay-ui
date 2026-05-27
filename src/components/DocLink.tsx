import { BookOpen, ExternalLink } from 'lucide-react'
import { getSectionDocUrl } from '../lib/docs'

type DocLinkProps = {
  sectionId: string
  label?: string
  /** Compact icon-only control for the sidebar */
  compact?: boolean
  className?: string
}

export function SectionDocLink({ sectionId, label, compact, className = '' }: DocLinkProps) {
  const href = getSectionDocUrl(sectionId)
  if (!href) return null

  const aria = label ? `${label} documentation` : 'Open documentation'

  if (compact) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        title={aria}
        aria-label={aria}
        onClick={(e) => e.stopPropagation()}
        className={`w-7 h-7 flex items-center justify-center rounded-lg text-slate-400 hover:text-sky-600 hover:bg-sky-50 transition-colors shrink-0 ${className}`}
      >
        <BookOpen className="w-3.5 h-3.5" />
      </a>
    )
  }

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      title="Open documentation"
      className={`inline-flex items-center gap-1.5 text-xs font-semibold text-sky-600 hover:text-sky-700 bg-sky-50 hover:bg-sky-100 border border-sky-100 px-2.5 py-1 rounded-lg transition-colors shrink-0 ${className}`}
    >
      <BookOpen className="w-3.5 h-3.5" />
      Docs
      <ExternalLink className="w-3 h-3 opacity-50" />
    </a>
  )
}
