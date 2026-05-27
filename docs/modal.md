# Modal

Portal-based dialog with backdrop blur, escape-to-close, and optional header/footer slots.

## Import

```tsx
import { Modal } from 'clay-ui'
```

## Basic usage

```tsx
import { useState } from 'react'
import { Modal } from 'clay-ui'

function Example() {
  const [open, setOpen] = useState(false)

  return (
    <>
      <button onClick={() => setOpen(true)}>Open</button>
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        title="Welcome"
        description="Your workspace is ready."
        footer={
          <>
            <button onClick={() => setOpen(false)}>Cancel</button>
            <button onClick={() => setOpen(false)}>Confirm</button>
          </>
        }
      >
        <p>Modal body content goes here.</p>
      </Modal>
    </>
  )
}
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `open` | `boolean` | — | Controls visibility (required) |
| `onClose` | `() => void` | — | Called on Escape, backdrop click, or close button (required) |
| `size` | `'sm' \| 'md' \| 'lg' \| 'xl'` | `'md'` | Max width preset |
| `title` | `string` | — | Header title |
| `description` | `string` | — | Subtitle below the title |
| `children` | `React.ReactNode` | — | Scrollable body content |
| `footer` | `React.ReactNode` | — | Footer action row |

## Sizes

```tsx
<Modal open={open} onClose={onClose} size="sm" title="Confirm" />
<Modal open={open} onClose={onClose} size="xl" title="Terms of Service" />
```

Press `Esc` or click the backdrop to close. Body scroll is locked while open.
