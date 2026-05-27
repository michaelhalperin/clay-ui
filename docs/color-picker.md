# Color Picker

HSV panel, inline swatch, and popover color pickers.

## Import

```tsx
import { ColorPickerPanel } from 'clay-ui'
```

## Basic usage

```tsx
<ColorPickerPanel hex={color} onChange={setColor} />
```

## Exports

- `ColorPickerPanel`
- `InlineColorPicker`
- `PopoverColorPicker`

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `hex` | string | — | Current hex color (required) |
| `onChange` | (hex: string) => void | — | Change handler (required) |

