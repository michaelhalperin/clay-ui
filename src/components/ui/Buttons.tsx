import { Loader2, ArrowRight, Heart, Download } from 'lucide-react'
import { useState } from 'react'

const base = 'inline-flex items-center gap-2 font-semibold rounded-clay cursor-pointer transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 select-none'

const variants = {
  primary:   `${base} bg-sky-500 text-white shadow-clay hover:bg-sky-600 hover:-translate-y-0.5 hover:shadow-clay-lg active:translate-y-0 focus:ring-sky-400`,
  secondary: `${base} bg-white text-slate-700 border border-slate-200 shadow-soft hover:border-sky-300 hover:text-sky-600 hover:-translate-y-0.5 hover:shadow-clay active:translate-y-0 focus:ring-sky-300`,
  mint:      `${base} bg-emerald-400 text-white shadow-clay hover:bg-emerald-500 hover:-translate-y-0.5 hover:shadow-clay-lg active:translate-y-0 focus:ring-emerald-300`,
  peach:     `${base} bg-pink-400 text-white shadow-clay hover:bg-pink-500 hover:-translate-y-0.5 hover:shadow-clay-lg active:translate-y-0 focus:ring-pink-300`,
  lavender:  `${base} bg-violet-400 text-white shadow-clay hover:bg-violet-500 hover:-translate-y-0.5 hover:shadow-clay-lg active:translate-y-0 focus:ring-violet-300`,
  ghost:     `${base} bg-transparent text-slate-600 hover:bg-slate-100 hover:text-slate-800 focus:ring-slate-300`,
  danger:    `${base} bg-red-400 text-white shadow-clay hover:bg-red-500 hover:-translate-y-0.5 hover:shadow-clay-lg active:translate-y-0 focus:ring-red-300`,
}

const sizes = {
  sm:  'px-3 py-1.5 text-sm',
  md:  'px-5 py-2.5 text-sm',
  lg:  'px-7 py-3.5 text-base',
}

export type ButtonVariant = keyof typeof variants
export type ButtonSize = keyof typeof sizes

export interface ButtonProps {
  /** Visual style. Defaults to `'primary'`. */
  variant?: ButtonVariant
  /** Size preset. Defaults to `'md'`. */
  size?: ButtonSize
  /** Shows a spinner and disables the button while true. */
  loading?: boolean
  disabled?: boolean
  /** Icon rendered before the label. */
  icon?: React.ReactNode
  /** Icon rendered after the label. */
  iconRight?: React.ReactNode
  children: React.ReactNode
  onClick?: () => void
}

export function Button({ variant = 'primary', size = 'md', loading, disabled, icon, iconRight, children, onClick }: ButtonProps) {
  return (
    <button
      className={`${variants[variant]} ${sizes[size]} ${(disabled || loading) ? 'opacity-50 pointer-events-none' : ''}`}
      disabled={disabled || loading}
      onClick={onClick}
      aria-busy={loading}
    >
      {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : icon}
      {children}
      {!loading && iconRight}
    </button>
  )
}

export function ButtonsShowcase() {
  const [loading, setLoading] = useState(false)

  const handleLoad = () => {
    setLoading(true)
    setTimeout(() => setLoading(false), 2000)
  }

  return (
    <div className="grid grid-cols-2 gap-8">
      {/* Variants */}
      <div>
        <p className="section-label">Variants</p>
        <div className="flex flex-wrap gap-3">
          <Button variant="primary">Primary</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="mint">Mint</Button>
          <Button variant="peach">Peach</Button>
          <Button variant="lavender">Lavender</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="danger">Danger</Button>
        </div>
      </div>

      {/* Sizes */}
      <div>
        <p className="section-label">Sizes</p>
        <div className="flex flex-wrap items-center gap-3">
          <Button size="sm">Small</Button>
          <Button size="md">Medium</Button>
          <Button size="lg">Large</Button>
        </div>
      </div>

      {/* With Icons */}
      <div>
        <p className="section-label">With Icons</p>
        <div className="flex flex-wrap gap-3">
          <Button icon={<Heart className="w-4 h-4" />} variant="peach">Like</Button>
          <Button iconRight={<ArrowRight className="w-4 h-4" />} variant="primary">Continue</Button>
          <Button icon={<Download className="w-4 h-4" />} variant="secondary">Download</Button>
        </div>
      </div>

      {/* States */}
      <div>
        <p className="section-label">States</p>
        <div className="flex flex-wrap gap-3">
          <Button loading={loading} onClick={handleLoad} variant="primary">
            {loading ? 'Loading…' : 'Click to load'}
          </Button>
          <Button disabled variant="secondary">Disabled</Button>
        </div>
      </div>
    </div>
  )
}
