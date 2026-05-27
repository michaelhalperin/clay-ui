# Keyboard Shortcuts

Shortcut reference panel and live key-capture UI. Pass your own shortcut definitions.

## Import

```tsx
import { type Shortcut } from 'clay-ui'
```

## Basic usage

```tsx
import { type Shortcut } from 'clay-ui'

const shortcuts: Shortcut[] = [
  { action: 'Save', keys: [['⌘', 'S']], category: 'General' },
  { action: 'Search', keys: [['⌘', 'K']], category: 'Navigation' },
]
```

## Exports

- `Shortcut`

## Shortcut

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `action` | `string` | — | Human-readable action name (required) |
| `keys` | `string[][]` | — | Key chords; each chord is an ordered list of key labels (required) |
| `category` | `string` | — | Group heading in the list (required) |
| `icon` | `React.ReactNode` | — | Optional row icon |
## Notes

See `KeyboardShortcutsShowcase` for the grouped list UI and recording mode.
