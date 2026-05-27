# Rating

Interactive star rating input and read-only half-star display with review count.

## Import

```tsx
import { StarRating, HalfStarDisplay } from 'clay-ui'
```

## Basic usage

```tsx
import { useState } from 'react'
import { StarRating } from 'clay-ui'

function Example() {
  const [rating, setRating] = useState(4)
  return <StarRating value={rating} onChange={setRating} label="Quality" max={5} />
}
```

## Exports

- `StarRating`
- `HalfStarDisplay`

## StarRating props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `value` | `number` | — | Current rating |
| `onChange` | `(v: number) => void` | — | Called when user selects a star |
| `max` | `number` | `5` | Number of stars |
| `size` | `'sm' | 'md' | 'lg'` | 'md' | Star size |
| `label` | `string` | — | Field label |
| `readonly` | `boolean` | `false` | Display-only; no hover selection |
## HalfStarDisplay props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `value` | `number` | — | Rating value, supports halves (required) |
| `max` | `number` | `5` | Star count |
| `reviews` | `number` | — | Review count shown beside stars |
