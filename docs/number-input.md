# Number Input

Stepper input and quantity controls.

## Import

```tsx
import { NumberInput } from 'clay-ui'
```

## Basic usage

```tsx
<NumberInput value={n} onChange={setN} min={0} max={99} />
```

## Exports

- `NumberInput`
- `QuantityStepper`

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `value` | number | — | Current value (required) |
| `onChange` | (v: number) => void | — | Change handler (required) |
| `min` | number | — | Minimum |
| `max` | number | — | Maximum |
| `step` | number | 1 | Increment |
| `label` | string | — | Field label |

