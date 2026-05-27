# Number Input

Stepper input with min/max and a compact quantity control for carts.

## Import

```tsx
import { NumberInput, QuantityStepper } from 'clay-ui'
```

## Basic usage

```tsx
import { useState } from 'react'
import { NumberInput } from 'clay-ui'

function Example() {
  const [n, setN] = useState(1)
  return <NumberInput value={n} onChange={setN} min={0} max={99} label="Quantity" />
}
```

## Exports

- `NumberInput`
- `QuantityStepper`

## NumberInput props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `value` | `number` | — | Current value (required) |
| `onChange` | `(v: number) => void` | — | Change handler (required) |
| `min` | `number` | — | Minimum allowed value |
| `max` | `number` | — | Maximum allowed value |
| `step` | `number` | `1` | Increment for +/- buttons |
| `label` | `string` | — | Field label |
## QuantityStepper props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `label` | `string` | — | Field label (required) |
| `min` | `number` | `0` | Minimum quantity |
