# Checkbox & Radio

Accessible checkbox, radio, and large card-style radio options with labels and descriptions.

## Import

```tsx
import { Checkbox, Radio, CardRadio } from 'clay-ui'
```

## Basic usage

```tsx
import { useState } from 'react'
import { Checkbox, Radio } from 'clay-ui'

function Example() {
  const [terms, setTerms] = useState(false)
  const [plan, setPlan] = useState('pro')
  return (
    <>
      <Checkbox checked={terms} onChange={setTerms} label="Accept terms" />
      <Radio value="pro" selected={plan} onChange={setPlan} label="Pro plan" />
    </>
  )
}
```

## Exports

- `Checkbox`
- `Radio`
- `CardRadio`

## Checkbox props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `checked` | `boolean` | — | Checked state (required) |
| `onChange` | `(v: boolean) => void` | — | Change handler (required) |
| `label` | `string` | — | Primary label |
| `description` | `string` | — | Helper text |
| `disabled` | `boolean` | — | Disables the control |
| `indeterminate` | `boolean` | — | Shows dash instead of check |
| `color` | `string` | '#0ea5e9' | Accent color when checked |
## Radio & CardRadio props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `value` | `string` | — | This option’s value (required) |
| `selected` | `string` | — | Currently selected value (required) |
| `onChange` | `(v: string) => void` | — | Called with `value` when selected (required) |
| `label` | `string` | — | Primary label |
| `description` | `string` | — | Helper text |
| `disabled` | `boolean` | — | Disables the control |
| `color` | `string` | '#0ea5e9' | Accent color |
| `icon` | `React.ReactNode` | — | CardRadio only — leading icon |
## Examples

```tsx
<Checkbox checked={v} onChange={setV} indeterminate label="Select all" />
<CardRadio value="team" selected={plan} onChange={setPlan} label="Team" description="Shared workspace" icon={<Users />} />
```

