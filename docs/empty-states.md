# Empty States

Illustrated empty placeholders with actions.

## Import

```tsx
import { EmptyState } from 'clay-ui'
```

## Basic usage

```tsx
<EmptyState icon={<Inbox />} title="No messages" description="Inbox is empty." action={<Button>Compose</Button>} />
```

## Exports

- `EmptyState`
- `IllustratedEmpty`

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `icon` | React.ReactNode | — | Hero icon |
| `title` | string | — | Heading (required) |
| `description` | string | — | Body copy |
| `action` | React.ReactNode | — | Primary CTA |
| `secondary` | React.ReactNode | — | Secondary action |
| `variant` | 'default' | 'compact' | 'default' | Layout density |

