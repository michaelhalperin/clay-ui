# Skeleton

Shimmer loading placeholders. Use `Bone` for primitive shapes or compose layout skeletons in your own loading states.

## Import

```tsx
import { Bone } from 'clay-ui'
```

## Basic usage

```tsx
import { Bone } from 'clay-ui'

function LoadingCard() {
  return (
    <div className="space-y-3 p-4">
      <Bone className="h-4 w-32" />
      <Bone className="h-3 w-full" />
      <Bone className="h-3 w-4/5" />
    </div>
  )
}
```

## Exports

- `Bone`

## Bone props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `className` | `string` | '' | Tailwind classes for size and shape |
| `style` | `React.CSSProperties` | — | Inline dimensions when needed |
## Notes

The live showcase includes pre-built layouts (profile, article, dashboard, table, feed). Copy those patterns or build your own with `Bone`.
