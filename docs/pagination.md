# Pagination

Page controls with size and style variants.

## Import

```tsx
import { Pager } from 'clay-ui'
```

## Basic usage

```tsx
<Pager page={page} totalPages={12} go={setPage} />
```

## Exports

- `Pager`

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `page` | number | — | Current page (required) |
| `totalPages` | number | — | Total pages (required) |
| `go` | (page: number) => void | — | Page change handler (required) |
| `size` | 'sm' | 'md' | 'lg' | 'md' | Control size |
| `variant` | 'default' | 'rounded' | 'minimal' | 'default' | Visual style |

