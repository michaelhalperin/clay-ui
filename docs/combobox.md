# Combobox

Single and multi-select searchable comboboxes.

## Import

```tsx
import { MultiCombobox, type ComboboxOption } from 'clay-ui'
```

## Basic usage

```tsx
<MultiCombobox label="Stack" options={opts} />
```

## Exports

- `MultiCombobox`
- `SingleCombobox`
- `ComboboxOption`

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `label` | string | — | Field label (required) |
| `placeholder` | string | 'Search…' | Input placeholder (multi) |
| `options` | ComboboxOption[] | — | Choices: value, label, group? (required) |

