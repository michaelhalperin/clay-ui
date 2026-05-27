# Activity Feed

Timeline-style activity stream.

## Import

```tsx
import { type FeedEvent } from 'clay-ui'
```

## Basic usage

```tsx
const events: FeedEvent[] = [{ id, type, user, action, time }]
```

## Exports

- `FeedEvent`
- `EventType`

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `FeedEvent` | interface | — | id, type, user, action, time, meta? |
| `EventType` | type | — | commit | pr | comment | deploy | … |

