# Toast

Stacked toast notifications with auto-dismiss, progress bar, and type-specific styling.

## Import

```tsx
import { ToastProvider, useToast } from 'clay-ui'
```

## Basic usage

Wrap your app (or subtree) with `ToastProvider`, then call `toast()` from any child:

```tsx
import { ToastProvider, useToast } from 'clay-ui'

function NotifyButton() {
  const { toast } = useToast()

  return (
    <button
      onClick={() =>
        toast({
          type: 'success',
          title: 'Changes saved',
          description: 'Your profile has been updated.',
        })
      }
    >
      Show toast
    </button>
  )
}

function App() {
  return (
    <ToastProvider>
      <NotifyButton />
    </ToastProvider>
  )
}
```

## ToastProvider

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | `React.ReactNode` | — | App content (required) |

## useToast

Returns `{ toast: (opts) => void }`. Must be used inside `ToastProvider`.

### `toast()` options

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `type` | `'success' \| 'error' \| 'warning' \| 'info'` | — | Visual variant (required) |
| `title` | `string` | — | Primary message (required) |
| `description` | `string` | — | Secondary detail text |
| `duration` | `number` | `4000` | Auto-dismiss time in ms |

## Examples

```tsx
const { toast } = useToast()

toast({ type: 'error', title: 'Upload failed', description: 'File exceeds 10 MB.' })
toast({ type: 'info', title: 'Deploying…', duration: 8000 })
```

Up to five toasts stack in the top-right corner. Each shows an animated progress bar and a dismiss button.
