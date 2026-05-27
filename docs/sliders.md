# Slider

Pointer-driven range slider with label, optional icon, and formatted value display. Includes a dual-thumb range variant.

## Import

```tsx
import { Slider, RangeSlider } from 'clay-ui'
```

## Basic usage

```tsx
import { useState } from 'react'
import { Slider } from 'clay-ui'
import { Volume2 } from 'lucide-react'

function Example() {
  const [vol, setVol] = useState(60)
  return (
    <Slider
      value={vol}
      onChange={setVol}
      min={0}
      max={100}
      label="Volume"
      icon={<Volume2 className="w-4 h-4" />}
    />
  )
}
```

## Exports

- `Slider`
- `RangeSlider`

## Slider props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `value` | `number` | — | Current value (required) |
| `onChange` | `(v: number) => void` | — | Change handler (required) |
| `min` | `number` | `0` | Minimum value |
| `max` | `number` | `100` | Maximum value |
| `step` | `number` | `1` | Step increment |
| `color` | `string` | '#0ea5e9' | Fill color (hex) |
| `label` | `string` | — | Field label |
| `icon` | `React.ReactNode` | — | Leading icon |
| `showValue` | `boolean` | `true` | Show numeric value beside the label |
| `formatValue` | `(v: number) => string` | — | Custom value formatter |
## RangeSlider props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `label` | `string` | — | Field label (required) |
## Examples

```tsx
<Slider value={n} onChange={setN} min={0} max={10} step={0.5} formatValue={(v) => `${v}x`} />
<RangeSlider label="Price range" />
```

