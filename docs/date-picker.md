# Date Picker

Calendar pickers for a single date, a date range, or an always-visible inline calendar.

## Import

```tsx
import { SinglePicker, RangePicker, InlineCalendar } from 'clay-ui'
```

## Basic usage

```tsx
import { SinglePicker, RangePicker } from 'clay-ui'

function Example() {
  return (
    <>
      <SinglePicker label="Start date" />
      <RangePicker label="Trip dates" />
    </>
  )
}
```

## Exports

- `SinglePicker`
- `RangePicker`
- `InlineCalendar`

## SinglePicker & RangePicker props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `label` | `string` | — | Field label above the trigger |
## Examples

```tsx
<InlineCalendar />
```

## Notes

Pickers manage their own open state and selected dates internally. For full control, lift state by adapting the source component.
