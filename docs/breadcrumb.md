# Breadcrumb

Navigation trail with optional icons and chevron or slash separators.

## Import

```tsx
import { BreadcrumbTrail, type Crumb } from 'clay-ui'
```

## Basic usage

```tsx
import { BreadcrumbTrail, type Crumb } from 'clay-ui'
import { Home, Folder } from 'lucide-react'

const crumbs: Crumb[] = [
  { label: 'Home', href: '/', icon: <Home className="w-3.5 h-3.5" /> },
  { label: 'Projects', href: '/projects', icon: <Folder className="w-3.5 h-3.5" /> },
  { label: 'Clay UI' },
]

function Example() {
  return <BreadcrumbTrail crumbs={crumbs} withIcons separator="chevron" />
}
```

## Exports

- `BreadcrumbTrail`
- `Crumb`

## Crumb

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `label` | `string` | — | Link or current page text (required) |
| `href` | `string` | — | Makes the crumb a link; omit on the last item |
| `icon` | `React.ReactNode` | — | Leading icon |
## BreadcrumbTrail props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `crumbs` | `Crumb[]` | — | Trail items in order (required) |
| `separator` | `'chevron' | 'slash'` | 'chevron' | Separator between crumbs |
| `withIcons` | `boolean` | `false` | Show icons when provided on crumbs |
