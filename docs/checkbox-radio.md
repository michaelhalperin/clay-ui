# Checkbox & Radio

Accessible checkbox, radio, and card-style radio controls.

## Import

```tsx
import { Checkbox, Radio } from 'clay-ui'
```

## Basic usage

```tsx
<Checkbox checked={v} onChange={setV} label="Accept terms" />
```

## Exports

- `Checkbox`
- `Radio`
- `CardRadio`

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `checked / selected` | boolean | — | Selection state |
| `onChange` | function | — | Change handler |
| `label` | string | — | Primary label |
| `description` | string | — | Helper text |
| `disabled` | boolean | — | Disables control |
| `color` | string | '#0ea5e9' | Accent color |

