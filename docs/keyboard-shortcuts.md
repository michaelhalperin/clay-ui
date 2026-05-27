# Keyboard Shortcuts

Shortcut reference list and live key capture UI.

## Import

```tsx
import { type Shortcut } from 'clay-ui'
```

## Basic usage

```tsx
const shortcuts: Shortcut[] = [{ action, keys, category }]
```

## Exports

- `Shortcut`

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `action` | string | — | Action name (required) |
| `keys` | string[][] | — | Key chords (required) |
| `category` | string | — | Group name (required) |
| `icon` | React.ReactNode | — | Optional icon |

