# Command Palette

Full-screen command search overlay with fuzzy matching, keyboard navigation, and grouped results.

## Import

```tsx
import { CommandPalette, type Command } from 'clay-ui'
```

## Command interface

```tsx
interface Command {
  id: string
  label: string
  category: string
  icon: React.ReactNode
  shortcut?: string[]
  description?: string
}
```

## Basic usage

```tsx
import { useState } from 'react'
import { CommandPalette, type Command } from 'clay-ui'
import { Settings } from 'lucide-react'

const commands: Command[] = [
  {
    id: 'settings',
    label: 'Open Settings',
    category: 'Navigate',
    icon: <Settings className="w-4 h-4" />,
    shortcut: ['G', 'S'],
  },
]

function Example() {
  const [open, setOpen] = useState(false)

  return (
    <>
      <button onClick={() => setOpen(true)}>Search…</button>
      <CommandPalette open={open} onClose={() => setOpen(false)} commands={commands} />
    </>
  )
}
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `open` | `boolean` | — | Controls visibility (required) |
| `onClose` | `() => void` | — | Called on Escape, backdrop click, or selection (required) |
| `commands` | `Command[]` | — | Command list to search and display (required) |

## Behavior

- Empty query shows the first three commands as “Recent”
- Typing filters by label and category with fuzzy scoring
- `↑` / `↓` navigate; `Enter` selects; `Esc` closes
- Renders in a portal at the viewport center

Provide your own `commands` array with React icon nodes for each entry.
