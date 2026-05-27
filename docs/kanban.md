# Kanban

Drag-and-drop kanban board types.

## Import

```tsx
import { type Card, type Column } from 'clay-ui'
```

## Basic usage

```tsx
const columns: Column[] = [{ id, title, cards }]
```

## Exports

- `Card`
- `Column`
- `Priority`

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `Card` | interface | — | id, title, description?, priority, tags, assignee? |
| `Column` | interface | — | id, title, cards |
| `Priority` | type | — | low | medium | high | critical |

