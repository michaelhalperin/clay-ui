# Mention Input

Textarea with @mention autocomplete dropdown.

## Import

```tsx
import { MentionField, type MentionUser } from 'clay-ui'
```

## Basic usage

```tsx
<MentionField users={team} placeholder="Comment…" />
```

## Exports

- `MentionField`
- `MentionUser`

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `users` | MentionUser[] | — | Mentionable users (required) |
| `placeholder` | string | — | Textarea placeholder |

