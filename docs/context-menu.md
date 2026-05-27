# Context Menu

Right-click context menu item types for file lists.

## Import

```tsx
import { type ContextMenuItem } from 'clay-ui'
```

## Basic usage

```tsx
const items: ContextMenuItem[] = [{ icon, label, shortcut: '⌘C' }]
```

## Exports

- `ContextMenuItem`

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `icon` | React.ReactNode | — | Row icon (required) |
| `label` | string | — | Action label (required) |
| `shortcut` | string | — | Keyboard hint |
| `danger` | boolean | — | Destructive styling |
| `dividerAfter` | boolean | — | Divider below item |

