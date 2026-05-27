# Drawer

Slide-in sidebar panel with backdrop, navigation items, and user footer.

## Import

```tsx
import { Drawer } from 'clay-ui'
```

## Basic usage

```tsx
import { useState } from 'react'
import { Drawer } from 'clay-ui'

function Example() {
  const [open, setOpen] = useState(false)

  return (
    <>
      <button onClick={() => setOpen(true)}>Menu</button>
      <Drawer open={open} onClose={() => setOpen(false)} />
    </>
  )
}
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `open` | `boolean` | — | Controls slide-in visibility (required) |
| `onClose` | `() => void` | — | Called on backdrop click or close button (required) |

## Behavior

- Fixed left panel (288px wide) slides in with transform animation
- Semi-transparent backdrop with blur; clicking it calls `onClose`
- Built-in demo navigation, badges, help/sign-out actions, and user chip

The drawer includes internal demo nav state for showcase purposes. For production, compose your own nav inside a similar layout or extend the component locally.
