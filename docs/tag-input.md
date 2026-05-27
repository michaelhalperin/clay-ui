# Tag Input

Chip input for tags with keyboard add/remove and optional autocomplete suggestions.

## Import

```tsx
import { TagInput } from 'clay-ui'
```

## Basic usage

```tsx
import { TagInput } from 'clay-ui'

function Example() {
  return (
    <TagInput
      label="Skills"
      placeholder="Add a skill…"
      suggestions={['React', 'TypeScript', 'Tailwind', 'Design']}
    />
  )
}
```

## Exports

- `TagInput`

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `label` | `string` | — | Field label |
| `placeholder` | `string` | 'Add tag…' | Input placeholder |
| `suggestions` | `string[]` | — | Autocomplete list shown while typing |
## Notes

Press Enter or comma to add a tag. Click × on a chip or press Backspace in an empty input to remove.
