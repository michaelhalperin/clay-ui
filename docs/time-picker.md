# Time Picker

Scrollable hour/minute (and optional second) columns with 12h or 24h format.

## Import

```tsx
import { TimePickerWidget } from 'clay-ui'
```

## Basic usage

```tsx
import { TimePickerWidget } from 'clay-ui'

function Example() {
  return <TimePickerWidget label="Start time" use12h showSeconds />
}
```

## Exports

- `TimePickerWidget`

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `label` | `string` | — | Field label |
| `showSeconds` | `boolean` | `false` | Include seconds column |
| `use12h` | `boolean` | `false` | 12-hour format with AM/PM toggle |
