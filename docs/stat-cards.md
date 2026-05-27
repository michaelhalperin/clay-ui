# Stat Cards

KPI stat cards with trend badges and compact sparkline metric cards.

## Import

```tsx
import { StatCard, MiniSparkCard } from 'clay-ui'
```

## Basic usage

```tsx
import { StatCard, MiniSparkCard } from 'clay-ui'
import { Zap } from 'lucide-react'

function Example() {
  return (
    <>
      <StatCard
        label="Revenue"
        value="$12.4k"
        change={8}
        icon={<Zap className="w-5 h-5" />}
        color="#0ea5e9"
        bgColor="#f0f9ff"
      />
      <MiniSparkCard label="Sessions" value="8,204" data={[3, 5, 4, 7, 8, 6, 9]} color="#8b5cf6" />
    </>
  )
}
```

## Exports

- `StatCard`
- `MiniSparkCard`

## StatCard props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `label` | `string` | — | Metric name (required) |
| `value` | `string` | — | Display value (required) |
| `change` | `number` | — | Percent change; positive shows green, negative red |
| `icon` | `React.ReactNode` | — | Leading icon |
| `color` | `string` | — | Accent color for trend text |
| `bgColor` | `string` | — | Icon container background |
| `prefix` | `string` | — | Prepended to value, e.g. currency symbol |
## MiniSparkCard props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `label` | `string` | — | Metric name (required) |
| `value` | `string` | — | Display value (required) |
| `data` | `number[]` | — | Sparkline data (required) |
| `color` | `string` | — | Chart accent (required) |
