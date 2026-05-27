# Timeline

Vertical and compact event timelines for activity logs and milestones.

## Import

```tsx
import { VerticalTimeline, CompactTimeline, type TimelineEvent } from 'clay-ui'
```

## Basic usage

```tsx
import { VerticalTimeline, type TimelineEvent } from 'clay-ui'

const events: TimelineEvent[] = [
  {
    id: '1',
    title: 'Deployed v2.0',
    time: '2 hours ago',
    description: 'Production rollout completed.',
    color: '#10b981',
  },
]

function Example() {
  return <VerticalTimeline events={events} />
}
```

## Exports

- `VerticalTimeline`
- `CompactTimeline`
- `TimelineEvent`

## TimelineEvent

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `id` | `string` | — | Unique id (required) |
| `title` | `string` | — | Event title (required) |
| `time` | `string` | — | Timestamp label (required) |
| `description` | `string` | — | Optional body text |
| `icon` | `React.ReactNode` | — | Custom node icon |
| `color` | `string` | — | Accent color for the dot and line |
## Examples

```tsx
<CompactTimeline events={events} />
```

