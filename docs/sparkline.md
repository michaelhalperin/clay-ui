# Sparkline

Inline spark charts and metric cards.

## Import

```tsx
import { Sparkline, MetricCard } from 'clay-ui'
```

## Basic usage

```tsx
<Sparkline data={[1,4,3,8]} color="#0ea5e9" />
```

## Exports

- `Sparkline`
- `MetricCard`

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `data` | number[] | — | Series values (required) |
| `width` | number | 80 | SVG width |
| `height` | number | 32 | SVG height |
| `color` | string | '#0ea5e9' | Line color |
| `fill` | boolean | true | Area fill under line |
| `type` | 'line' | 'bar' | 'line' | Chart type |

