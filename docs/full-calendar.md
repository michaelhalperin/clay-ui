# Full Calendar

Month-view calendar with colored event chips and day selection.

> **Showcase component** — a pre-built demo layout with sample data. Use it for reference or copy patterns into your app. Open the [live showcase](/showcase/) to interact with it.

## Import

```tsx
import { type CalEvent } from 'clay-ui'
```

## Basic usage

```tsx
import { FullCalendarShowcase } from 'clay-ui'
import { type CalEvent } from 'clay-ui'

const events: CalEvent[] = [
  { id: '1', title: 'Standup', date: '2024-06-03', color: '#0ea5e9', time: '9:00 AM' },
]

function Example() {
  return <FullCalendarShowcase />
}
```

## Exports

- `CalEvent`
- `FullCalendarShowcase`

## CalEvent

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `id` | `string` | — | Unique event id (required) |
| `title` | `string` | — | Event title (required) |
| `date` | `string` | — | ISO date string `YYYY-MM-DD` (required) |
| `color` | `string` | — | Chip accent color |
| `time` | `string` | — | Optional time label |
