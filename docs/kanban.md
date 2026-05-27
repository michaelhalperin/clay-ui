# Kanban

Kanban board types for columns, cards, priorities, and tags. See showcase for drag-and-drop UI.

## Import

```tsx
import { type Card, type Column, type Priority } from 'clay-ui'
```

## Basic usage

```tsx
import { type Card, type Column } from 'clay-ui'

const columns: Column[] = [
  {
    id: 'todo',
    title: 'To do',
    cards: [
      {
        id: 'c1',
        title: 'Update docs',
        priority: 'medium',
        tags: [{ label: 'Docs', color: '#0ea5e9' }],
      },
    ],
  },
]
```

## Exports

- `Card`
- `Column`
- `Priority`

## Card

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `id` | `string` | — | Unique card id (required) |
| `title` | `string` | — | Card title (required) |
| `description` | `string` | — | Body text |
| `priority` | `Priority` | — | `low` | `medium` | `high` | `critical` (required) |
| `tags` | `{ label: string; color: string }[]` | — | Colored tag chips (required) |
| `assignee` | `{ name: string; color: string; initials: string }` | — | Optional owner |
## Column

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `id` | `string` | — | Column id (required) |
| `title` | `string` | — | Column heading (required) |
| `cards` | `Card[]` | — | Cards in this column (required) |
## Notes

Open `KanbanShowcase` for the full board with drag between columns.
