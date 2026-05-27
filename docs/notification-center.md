# Notification Center

Grouped notification inbox with read/unread state and filter tabs.

> **Showcase component** — a pre-built demo layout with sample data. Use it for reference or copy patterns into your app. Open the [live showcase](/showcase/) to interact with it.

## Import

```tsx
import { type Notification } from 'clay-ui'
```

## Basic usage

```tsx
import { NotificationCenterShowcase } from 'clay-ui'
import { type Notification } from 'clay-ui'

const notes: Notification[] = [
  {
    id: '1',
    type: 'comment',
    title: 'New comment',
    body: 'Alex replied to your thread.',
    time: '2m ago',
    group: 'Today',
    read: false,
  },
]

function Example() {
  return <NotificationCenterShowcase />
}
```

## Exports

- `Notification`
- `NotificationCenterShowcase`

## Notification

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `id` | `string` | — | Unique id (required) |
| `type` | `string` | — | Icon/category key (required) |
| `title` | `string` | — | Heading (required) |
| `body` | `string` | — | Message body (required) |
| `time` | `string` | — | Relative time label (required) |
| `group` | `string` | — | Section heading, e.g. `Today` (required) |
| `read` | `boolean` | — | Read state (required) |
| `avatar` | `string` | — | Optional avatar gradient classes |
