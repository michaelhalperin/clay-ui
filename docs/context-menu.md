# Context Menu

Right-click context menu patterns. Export the `ContextMenuItem` shape to build menu data; see the showcase for a full implementation.

## Import

```tsx
import { type ContextMenuItem } from 'clay-ui'
```

## Basic usage

```tsx
import { type ContextMenuItem } from 'clay-ui'
import { Copy, Trash2 } from 'lucide-react'

const items: ContextMenuItem[] = [
  { icon: <Copy className="w-4 h-4" />, label: 'Copy', shortcut: '⌘C' },
  { icon: <Trash2 className="w-4 h-4" />, label: 'Delete', shortcut: '⌫', danger: true, dividerAfter: true },
]
```

## Exports

- `ContextMenuItem`

## ContextMenuItem

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `icon` | `React.ReactNode` | — | Row icon (required) |
| `label` | `string` | — | Action label (required) |
| `shortcut` | `string` | — | Keyboard hint, e.g. `⌘C` |
| `danger` | `boolean` | — | Destructive red styling |
| `dividerAfter` | `boolean` | — | Renders a divider below this item |
## Notes

Use `ContextMenuShowcase` in the live demo as a reference for positioning and open state.
