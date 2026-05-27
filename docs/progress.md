# Progress

Linear, circular, indeterminate, and step progress indicators.

## Import

```tsx
import { LinearProgress } from 'clay-ui'
```

## Basic usage

```tsx
<LinearProgress value={65} label="Upload" striped animated />
```

## Exports

- `LinearProgress`
- `CircularProgress`
- `IndeterminateBar`
- `StepProgress`

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `value` | number | — | Progress 0–max |
| `max` | number | 100 | Maximum value |
| `color` | string | '#0ea5e9' | Bar color |
| `size` | 'sm' | 'md' | 'lg' | 'md' | Bar height |
| `label` | string | — | Caption |
| `showValue` | boolean | true | Show percentage |
| `striped` | boolean | — | Striped fill |
| `animated` | boolean | — | Animated stripes |

