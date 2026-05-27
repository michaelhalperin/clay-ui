# Empty States

Illustrated placeholders with primary and secondary actions for empty views.

## Import

```tsx
import { EmptyState, IllustratedEmpty } from 'clay-ui'
```

## Basic usage

```tsx
import { EmptyState } from 'clay-ui'
import { Inbox } from 'lucide-react'
import { Button } from 'clay-ui'

function Example() {
  return (
    <EmptyState
      icon={<Inbox className="w-10 h-10 text-slate-400" />}
      title="No messages yet"
      description="When someone writes you, it will show up here."
      action={<Button variant="primary">Compose</Button>}
      variant="default"
    />
  )
}
```

## Exports

- `EmptyState`
- `IllustratedEmpty`

## EmptyState props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `icon` | `React.ReactNode` | — | Hero icon |
| `title` | `string` | — | Heading (required) |
| `description` | `string` | — | Body copy |
| `action` | `React.ReactNode` | — | Primary CTA |
| `secondary` | `React.ReactNode` | — | Secondary action |
| `variant` | `'default' | 'compact'` | 'default' | Layout density |
## IllustratedEmpty props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `type` | `'search' | 'files' | 'chart'` | — | Built-in illustration preset (required) |
