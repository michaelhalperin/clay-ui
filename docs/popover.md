# Popover

Click-triggered floating panel anchored to a trigger.

## Import

```tsx
import { Popover } from 'clay-ui'
```

## Basic usage

```tsx
<Popover trigger={<button>Open</button>} align="left">Content</Popover>
```

## Exports

- `Popover`

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `trigger` | React.ReactNode | — | Click target (required) |
| `children` | React.ReactNode | — | Panel content (required) |
| `align` | 'left' | 'right' | 'center' | 'left' | Horizontal alignment |

