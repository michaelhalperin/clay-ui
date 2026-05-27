# Tooltip

Hover and focus tooltips with four placements, optional delay, and a rich multi-line variant.

## Import

```tsx
import { Tooltip, RichTooltip } from 'clay-ui'
```

## Basic usage

```tsx
import { Tooltip } from 'clay-ui'

function Example() {
  return (
    <Tooltip content="Copy to clipboard" placement="top">
      <button>Copy</button>
    </Tooltip>
  )
}
```

## Tooltip props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `content` | `React.ReactNode` | — | Tooltip body (required) |
| `placement` | `'top' \| 'bottom' \| 'left' \| 'right'` | `'top'` | Position relative to trigger |
| `children` | `React.ReactElement` | — | Trigger element (required) |
| `delay` | `number` | `120` | Show delay in ms |

## RichTooltip props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `label` | `string` | — | Bold heading in the tooltip (required) |
| `children` | `React.ReactElement` | — | Trigger element (required) |

`RichTooltip` wraps `Tooltip` with a fixed multi-line description layout.

## Placements

```tsx
<Tooltip content="Top" placement="top"><button>Top</button></Tooltip>
<Tooltip content="Bottom" placement="bottom"><button>Bottom</button></Tooltip>
<Tooltip content="Left" placement="left"><button>Left</button></Tooltip>
<Tooltip content="Right" placement="right"><button>Right</button></Tooltip>
```

## Rich tooltip

```tsx
<RichTooltip label="Pro feature">
  <button>How does this work?</button>
</RichTooltip>
```

Tooltips render in a portal and support keyboard focus (`onFocus` / `onBlur`).
