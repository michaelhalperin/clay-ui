# Sortable List

Drag-to-reorder lists powered by the `useDragSort` hook and pointer events.

## Import

```tsx
import { useDragSort, type Item } from 'clay-ui'
```

## Basic usage

```tsx
import { useDragSort, type Item } from 'clay-ui'

type Task = Item & { title: string }

const initial: Task[] = [
  { id: '1', title: 'Design review' },
  { id: '2', title: 'Ship release' },
]

function TaskList() {
  const { items, onDragStart, onDragOver, onDrop, setItemRef } = useDragSort(initial)
  return (
    <ul>
      {items.map((task, i) => (
        <li
          key={task.id}
          ref={(el) => setItemRef(i, el)}
          onPointerDown={(e) => onDragStart(i, e)}
          onPointerOver={() => onDragOver(i)}
          onPointerUp={onDrop}
        >
          {task.title}
        </li>
      ))}
    </ul>
  )
}
```

## Exports

- `useDragSort`
- `Item`

## Item

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `id` | `string` | — | Unique row id (required) |
## Notes

Extend `Item` with your own fields. See `SortableListShowcase` for grip handles, icons, and animations.
