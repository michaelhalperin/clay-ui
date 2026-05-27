# Avatar

Gradient circle avatars with optional status ring, role badge, and stacked groups.

## Import

```tsx
import { Avatar, AvatarGroup } from 'clay-ui'
```

## Basic usage

```tsx
import { Avatar } from 'clay-ui'

function Example() {
  return (
    <Avatar
      name="Sophie L."
      color="from-sky-400 to-violet-400"
      initials="SL"
      status="online"
      size="md"
    />
  )
}
```

## Avatar props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `name` | `string` | — | Accessible title / tooltip (required) |
| `color` | `string` | — | Tailwind gradient classes, e.g. `from-sky-400 to-violet-400` (required) |
| `initials` | `string` | — | Text shown inside the circle (required) |
| `status` | `string` | — | Presence ring: `online`, `busy`, `away`, `offline` |
| `size` | `'sm' \| 'md' \| 'lg' \| 'xl'` | `'md'` | Diameter preset |
| `badge` | `React.ReactNode` | — | Small icon badge at bottom-right |

## AvatarGroup props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `people` | `Array<{ name, color, initials, status?, role? }>` | — | People to display (required) |
| `max` | `number` | `4` | Max avatars before `+N` overflow |

## Examples

```tsx
<Avatar name="Michael H." color="from-emerald-400 to-sky-400" initials="MH" size="lg" status="busy" />

<AvatarGroup people={team} max={4} />
```

Avatars use CSS gradients rather than image `src`; pass Tailwind `from-*` / `to-*` classes for `color`.
