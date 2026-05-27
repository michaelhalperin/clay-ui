# Pagination

Page controls with ellipsis, first/last jumps, and visual variants.

## Import

```tsx
import { Pager } from 'clay-ui'
```

## Basic usage

```tsx
import { useState } from 'react'
import { Pager } from 'clay-ui'

function Example() {
  const [page, setPage] = useState(1)
  return <Pager page={page} totalPages={12} go={setPage} variant="rounded" />
}
```

## Exports

- `Pager`

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `page` | `number` | — | Current page, 1-based (required) |
| `totalPages` | `number` | — | Total page count (required) |
| `go` | `(page: number) => void` | — | Called when user picks a page (required) |
| `size` | `'sm' | 'md' | 'lg'` | 'md' | Control size |
| `variant` | `'default' | 'rounded' | 'minimal'` | 'default' | Visual style |
