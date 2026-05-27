# Progress

Linear bars, indeterminate loaders, circular rings, and multi-step segmented progress.

## Import

```tsx
import { LinearProgress, CircularProgress, IndeterminateBar, StepProgress } from 'clay-ui'
```

## Basic usage

```tsx
import { LinearProgress, StepProgress } from 'clay-ui'

function Example() {
  return (
    <>
      <LinearProgress value={65} label="Upload" striped animated />
      <StepProgress steps={['Cart', 'Shipping', 'Payment', 'Done']} current={1} />
    </>
  )
}
```

## Exports

- `LinearProgress`
- `CircularProgress`
- `IndeterminateBar`
- `StepProgress`

## LinearProgress props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `value` | `number` | — | Current value (required) |
| `max` | `number` | `100` | Maximum value |
| `color` | `string` | '#0ea5e9' | Bar fill color |
| `size` | `'sm' | 'md' | 'lg'` | 'md' | Bar height |
| `label` | `string` | — | Caption above the bar |
| `showValue` | `boolean` | `true` | Show percentage |
| `striped` | `boolean` | — | Diagonal stripe overlay |
| `animated` | `boolean` | — | Animate stripes (use with `striped`) |
## CircularProgress props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `value` | `number` | — | 0–100 progress (required) |
| `size` | `number` | `80` | SVG diameter in px |
| `stroke` | `number` | `8` | Ring stroke width |
| `color` | `string` | '#0ea5e9' | Progress ring color |
| `trackColor` | `string` | '#f1f5f9' | Background ring color |
| `label` | `string` | — | Caption below the ring |
| `children` | `React.ReactNode` | — | Center content (defaults to percent text) |
## StepProgress props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `steps` | `string[]` | — | Step labels (required) |
| `current` | `number` | — | Active step index, 0-based (required) |
## Examples

```tsx
<IndeterminateBar label="Loading…" />
<CircularProgress value={72} label="Storage" />
```

