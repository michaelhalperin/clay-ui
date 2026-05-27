# Toggle

Animated on/off switch with optional label, description, and leading icon. Uses `role="switch"` for accessibility.

## Import

```tsx
import { Toggle } from 'clay-ui'
```

## Basic usage

```tsx
import { useState } from 'react'
import { Toggle } from 'clay-ui'
import { Moon } from 'lucide-react'

function Example() {
  const [dark, setDark] = useState(false)
  return (
    <Toggle
      checked={dark}
      onChange={setDark}
      label="Dark mode"
      description="Use a darker color scheme"
      icon={<Moon className="w-4 h-4" />}
    />
  )
}
```

## Exports

- `Toggle`

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `checked` | `boolean` | — | Current on/off state (required) |
| `onChange` | `(v: boolean) => void` | — | Called when toggled (required) |
| `color` | `string` | 'bg-sky-500' | Tailwind background class when on |
| `label` | `string` | — | Primary label |
| `description` | `string` | — | Secondary helper text |
| `icon` | `React.ReactNode` | — | Icon shown beside the label |
| `disabled` | `boolean` | — | Disables interaction and dims the row |
## Examples

```tsx
<Toggle checked={on} onChange={setOn} color="bg-violet-500" label="Notifications" />
<Toggle checked={on} onChange={setOn} disabled label="Unavailable" />
```

