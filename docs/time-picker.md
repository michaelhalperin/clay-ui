# Time Picker

Scrollable time selector with 12h/24h and seconds.

## Import

```tsx
import { TimePickerWidget } from 'clay-ui'
```

## Basic usage

```tsx
<TimePickerWidget label="Start time" use12h />
```

## Exports

- `TimePickerWidget`

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `label` | string | — | Field label |
| `showSeconds` | boolean | false | Include seconds column |
| `use12h` | boolean | false | 12-hour format with AM/PM |

