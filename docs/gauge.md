# Gauge

SVG arc gauge for single metrics and a multi-ring gauge with legend.

## Import

```tsx
import { Gauge, MultiArcGauge, type GaugeProps } from 'clay-ui'
```

## Basic usage

```tsx
import { Gauge } from 'clay-ui'
import { Zap } from 'lucide-react'

function Example() {
  return (
    <Gauge
      value={73}
      max={100}
      color="#0ea5e9"
      label="CPU"
      unit="%"
      icon={<Zap className="w-3.5 h-3.5" />}
      size={130}
    />
  )
}
```

## Gauge props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `value` | `number` | — | Current value (required) |
| `max` | `number` | `100` | Maximum value for the arc |
| `size` | `number` | `120` | SVG width and height in px |
| `strokeWidth` | `number` | `10` | Arc stroke thickness |
| `color` | `string` | `'#0ea5e9'` | Value arc stroke color |
| `trackColor` | `string` | `'#f1f5f9'` | Background track color |
| `label` | `string` | — | Caption below the gauge |
| `unit` | `string` | `'%'` | Unit suffix next to the value |
| `icon` | `React.ReactNode` | — | Icon above the value in the center |

## MultiArcGauge props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `metrics` | `{ label: string; value: number; color: string }[]` | — | Concentric rings, outermost first (required) |

Each metric `value` is treated as 0–100 for arc length. The center shows the average percentage.

## Examples

```tsx
<Gauge value={45} max={200} unit="ms" color="#8b5cf6" label="Load time" />

<MultiArcGauge
  metrics={[
    { label: 'Performance', value: 87, color: '#0ea5e9' },
    { label: 'Accessibility', value: 94, color: '#10b981' },
    { label: 'SEO', value: 72, color: '#f59e0b' },
  ]}
/>
```
