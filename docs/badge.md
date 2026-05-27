# Badge

Pill badges, removable tags, notification count overlays, and presence status indicators.

## Import

```tsx
import { Badge, NotifDot, StatusBadge } from 'clay-ui'
```

## Basic usage

```tsx
import { Badge } from 'clay-ui'
import { Zap } from 'lucide-react'

function Example() {
  return (
    <Badge label="Pro" color="violet" variant="soft" icon={<Zap className="w-3 h-3" />} />
  )
}
```

## Badge props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `label` | `string` | — | Badge text (required) |
| `color` | `'sky' \| 'violet' \| 'emerald' \| 'pink' \| 'amber' \| 'slate' \| 'red'` | `'sky'` | Color theme |
| `variant` | `'solid' \| 'soft' \| 'outline'` | `'soft'` | Visual style |
| `icon` | `React.ReactNode` | — | Leading icon |
| `dot` | `boolean` | — | Shows a small status dot |
| `onRemove` | `() => void` | — | Renders a dismiss button when set |
| `size` | `'sm' \| 'md'` | `'md'` | Text and padding size |

## NotifDot props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `count` | `number` | — | Notification count; shows `99+` above 99 (required) |
| `children` | `React.ReactNode` | — | Element to wrap (required) |

## StatusBadge props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `status` | `'online' \| 'offline' \| 'busy' \| 'away'` | — | Presence state (required) |

## Examples

```tsx
<Badge label="Design" color="sky" variant="outline" onRemove={() => remove('Design')} />
<Badge label="Active" color="emerald" dot />

<NotifDot count={12}>
  <button>Notifications</button>
</NotifDot>

<StatusBadge status="online" />
```
