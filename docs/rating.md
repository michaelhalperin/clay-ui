# Rating

Interactive star rating and half-star display.

## Import

```tsx
import { StarRating } from 'clay-ui'
```

## Basic usage

```tsx
<StarRating value={4} onChange={setRating} label="Quality" />
```

## Exports

- `StarRating`
- `HalfStarDisplay`

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `value` | number | — | Current rating |
| `onChange` | (v: number) => void | — | Change handler |
| `max` | number | 5 | Star count |
| `size` | 'sm' | 'md' | 'lg' | 'md' | Star size |
| `label` | string | — | Field label |
| `readonly` | boolean | false | Display-only mode |

