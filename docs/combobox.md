# Combobox

Searchable single- and multi-select comboboxes with grouped options.

## Import

```tsx
import { MultiCombobox, SingleCombobox, type ComboboxOption } from 'clay-ui'
```

## Basic usage

```tsx
import { MultiCombobox, type ComboboxOption } from 'clay-ui'

const options: ComboboxOption[] = [
  { value: 'react', label: 'React' },
  { value: 'vue', label: 'Vue', group: 'Frameworks' },
]

function Example() {
  return <MultiCombobox label="Stack" options={options} placeholder="Search…" />
}
```

## Exports

- `MultiCombobox`
- `SingleCombobox`
- `ComboboxOption`

## ComboboxOption

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `value` | `string` | — | Stored value (required) |
| `label` | `string` | — | Display label (required) |
| `group` | `string` | — | Optional group heading |
## MultiCombobox props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `label` | `string` | — | Field label (required) |
| `options` | `ComboboxOption[]` | — | Choices (required) |
| `placeholder` | `string` | 'Search…' | Filter input placeholder |
## SingleCombobox props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `label` | `string` | — | Field label (required) |
| `options` | `ComboboxOption[]` | — | Choices (required) |
