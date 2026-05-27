# Slider

Pointer-driven range slider with optional icon and value display.

## Import

```tsx
import { Slider } from 'clay-ui'
```

## Basic usage

```tsx
<Slider value={vol} onChange={setVol} min={0} max={100} label="Volume" icon={<Volume2 />} />
```

## Exports

- `Slider`
- `RangeSlider`

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `value` | number | — | Current value (required) |
| `onChange` | (v: number) => void | — | Change handler (required) |
| `min` | number | 0 | Minimum |
| `max` | number | 100 | Maximum |
| `step` | number | 1 | Step increment |
| `color` | string | '#0ea5e9' | Fill color |
| `label` | string | — | Field label |
| `icon` | React.ReactNode | — | Leading icon |
| `showValue` | boolean | true | Show numeric value |
| `formatValue` | (v: number) => string | — | Custom value formatter |

