# Dropdown (Select)

Single-select, searchable select, and multi-select dropdowns with grouped options.

## Import

```tsx
import { Select, SearchableSelect, MultiSelect, type Option } from 'clay-ui'
```

## Option interface

```tsx
interface Option {
  value: string
  label: string
  icon?: React.ReactNode
  description?: string
  disabled?: boolean
}
```

## Basic usage

```tsx
import { Select, type Option } from 'clay-ui'
import { Globe } from 'lucide-react'

const options: Option[] = [
  { value: 'public', label: 'Public', icon: <Globe className="w-4 h-4" />, description: 'Anyone can view' },
  { value: 'private', label: 'Private', description: 'Only you' },
]

function Example() {
  return <Select options={options} label="Visibility" placeholder="Choose visibility…" />
}
```

## Select props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `options` | `Option[]` | — | List of choices (required) |
| `placeholder` | `string` | `'Select option'` | Text when nothing selected |
| `label` | `string` | — | Field label |

## SearchableSelect props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `options` | `Option[]` | — | List of choices (required) |
| `label` | `string` | — | Field label |
| `placeholder` | `string` | `'Search or select…'` | Trigger placeholder |

Includes an inline search field to filter options by label.

## MultiSelect props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `options` | `Option[]` | — | List of choices (required) |
| `label` | `string` | — | Field label |
| `placeholder` | `string` | `'Select multiple…'` | Text when nothing selected |

Selected values render as removable chips. Supports filter input and “Clear all”.

## Searchable select example

```tsx
<SearchableSelect
  options={countries}
  label="Country"
  placeholder="Search country…"
/>
```
