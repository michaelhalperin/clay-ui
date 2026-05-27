# Popover

Click-triggered floating panel anchored to any trigger element.

## Import

```tsx
import { Popover } from 'clay-ui'
```

## Basic usage

```tsx
import { Popover } from 'clay-ui'

function Example() {
  return (
    <Popover trigger={<button className="btn">Options</button>} align="left">
      <p className="text-sm text-slate-600 p-2">Popover content goes here.</p>
    </Popover>
  )
}
```

## Exports

- `Popover`

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `trigger` | `React.ReactNode` | — | Click target (required) |
| `children` | `React.ReactNode` | — | Panel content (required) |
| `align` | `'left' | 'right' | 'center'` | 'left' | Horizontal alignment relative to trigger |
## Notes

Click outside or press Escape to close. The panel is portaled so it is not clipped by overflow parents.
