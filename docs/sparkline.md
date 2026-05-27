# Sparkline

Inline SVG spark charts and KPI cards with embedded mini charts.

## Import

```tsx
import { Sparkline, MetricCard } from 'clay-ui'
```

## Basic usage

```tsx
import { Sparkline, MetricCard } from 'clay-ui'

function Example() {
  return (
    <>
      <Sparkline data={[1, 4, 3, 8, 6, 9]} color="#0ea5e9" type="line" />
      <MetricCard
        label="Active users"
        value="2,481"
        data={[12, 18, 15, 22, 28, 24, 31]}
        color="#8b5cf6"
        trend="up"
        trendValue="+12%"
      />
    </>
  )
}
```

## Exports

- `Sparkline`
- `MetricCard`

## Sparkline props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `data` | `number[]` | — | Series values (required) |
| `width` | `number` | `80` | SVG width |
| `height` | `number` | `32` | SVG height |
| `color` | `string` | '#0ea5e9' | Line/bar color |
| `fill` | `boolean` | `true` | Area fill under line charts |
| `type` | `'line' | 'bar'` | 'line' | Chart style |
## MetricCard props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `label` | `string` | — | Metric name (required) |
| `value` | `string` | — | Display value (required) |
| `data` | `number[]` | — | Sparkline series (required) |
| `color` | `string` | — | Accent color (required) |
| `subvalue` | `string` | — | Secondary line below value |
| `trend` | `'up' | 'down'` | — | Trend direction badge |
| `trendValue` | `string` | — | Trend label, e.g. `+8%` |
| `type` | `'line' | 'bar'` | 'line' | Embedded sparkline type |
