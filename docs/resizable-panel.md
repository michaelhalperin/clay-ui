# Resizable Panel

Draggable split layout for horizontal or vertical two-pane views.

## Import

```tsx
import { ResizablePanel } from 'clay-ui'
```

## Basic usage

```tsx
import { ResizablePanel } from 'clay-ui'

function Example() {
  return (
    <ResizablePanel
      direction="horizontal"
      initialSplit={50}
      minPct={20}
      maxPct={80}
      leftLabel="Editor"
      rightLabel="Preview"
      leftContent={<pre>const x = 1</pre>}
      rightContent={<div>Preview output</div>}
    />
  )
}
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `direction` | `'horizontal' \| 'vertical'` | `'horizontal'` | Split axis |
| `initialSplit` | `number` | `50` | Starting size of the first panel (percent) |
| `minPct` | `number` | `20` | Minimum first-panel percentage |
| `maxPct` | `number` | `80` | Maximum first-panel percentage |
| `leftContent` | `React.ReactNode` | — | First panel body (required) |
| `rightContent` | `React.ReactNode` | — | Second panel body (required) |
| `leftLabel` | `string` | — | Optional header for the first panel |
| `rightLabel` | `string` | — | Optional header for the second panel |

## Vertical split

```tsx
<ResizablePanel
  direction="vertical"
  initialSplit={40}
  leftLabel="Top"
  rightLabel="Bottom"
  leftContent={<div>Top pane</div>}
  rightContent={<div>Bottom pane</div>}
/>
```

Drag the grip handle between panes to resize. Uses pointer capture for smooth dragging.
