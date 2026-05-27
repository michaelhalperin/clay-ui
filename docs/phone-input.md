# Phone Input

Country flag selector with searchable dial codes and national number field.

## Import

```tsx
import { PhoneField, type Country } from 'clay-ui'
```

## Basic usage

```tsx
import { PhoneField } from 'clay-ui'

function Example() {
  return (
    <PhoneField label="Mobile number" placeholder="555 000 0000" />
  )
}
```

## Exports

- `PhoneField`
- `Country`

## PhoneField props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `label` | `string` | — | Field label (required) |
| `placeholder` | `string` | — | National number placeholder |
## Notes

`Country` includes `code`, `name`, `dial`, and `flag` for the built-in country list.
