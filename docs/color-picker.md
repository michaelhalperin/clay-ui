# Color Picker

HSV color panel with hex output, plus inline swatch and popover trigger variants.

## Import

```tsx
import { ColorPickerPanel, InlineColorPicker, PopoverColorPicker } from 'clay-ui'
```

## Basic usage

```tsx
import { useState } from 'react'
import { ColorPickerPanel } from 'clay-ui'

function Example() {
  const [hex, setHex] = useState('#0ea5e9')
  return <ColorPickerPanel hex={hex} onChange={setHex} />
}
```

## Exports

- `ColorPickerPanel`
- `InlineColorPicker`
- `PopoverColorPicker`

## ColorPickerPanel props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `hex` | `string` | — | Current hex color, e.g. `#0ea5e9` (required) |
| `onChange` | `(hex: string) => void` | — | Called with updated hex (required) |
## Examples

```tsx
<InlineColorPicker />
<PopoverColorPicker />
```

