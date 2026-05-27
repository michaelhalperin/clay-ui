# Stat Cards

KPI stat cards with trend and sparkline mini charts.

## Import

```tsx
import { StatCard } from 'clay-ui'
```

## Basic usage

```tsx
<StatCard label="Revenue" value="$12.4k" change={+8} icon={<Zap />} color="#0ea5e9" bgColor="#f0f9ff" />
```

## Exports

- `StatCard`
- `MiniSparkCard`

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `label` | string | — | Metric name (required) |
| `value` | string | — | Display value (required) |
| `change` | number | — | Percent change |
| `icon` | React.ReactNode | — | Leading icon |
| `color` | string | — | Accent color |
| `bgColor` | string | — | Icon background |
| `prefix` | string | — | Value prefix |

