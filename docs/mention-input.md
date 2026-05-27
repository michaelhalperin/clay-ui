# Mention Input

Textarea with `@` mention autocomplete and highlighted mentions in the text.

## Import

```tsx
import { MentionField, type MentionUser } from 'clay-ui'
```

## Basic usage

```tsx
import { MentionField, type MentionUser } from 'clay-ui'

const team: MentionUser[] = [
  { id: '1', name: 'Alex Kim', handle: 'alex', color: '#0ea5e9', initials: 'AK' },
]

function Example() {
  return <MentionField users={team} placeholder="Write a comment… use @ to mention" />
}
```

## Exports

- `MentionField`
- `MentionUser`

## MentionUser

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `id` | `string` | — | Unique user id (required) |
| `name` | `string` | — | Display name (required) |
| `handle` | `string` | — | Mention handle without @ (required) |
| `color` | `string` | — | Avatar accent color (required) |
| `initials` | `string` | — | Avatar initials (required) |
## MentionField props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `users` | `MentionUser[]` | — | Mentionable users (required) |
| `placeholder` | `string` | — | Textarea placeholder |
## Notes

Type `@` to open the user list. Arrow keys and Enter select a mention.
