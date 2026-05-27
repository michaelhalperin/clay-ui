# Signature Pad

Pointer-driven canvas for capturing signatures with clear and PNG export.

## Import

```tsx
import { SignatureCanvas } from 'clay-ui'
```

## Basic usage

```tsx
import { SignatureCanvas } from 'clay-ui'

function Example() {
  return (
    <SignatureCanvas
      width={400}
      height={180}
      color="#0ea5e9"
      strokeWidth={3}
    />
  )
}
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `width` | `number` | `400` | Canvas pixel width |
| `height` | `number` | `180` | Canvas pixel height |
| `color` | `string` | `'#1e293b'` | Stroke and dot color |
| `strokeWidth` | `number` | `2.5` | Line thickness |

## Behavior

- Draw with mouse or touch (`pointer` events)
- **Clear** resets the canvas
- **Save PNG** downloads `signature.png` when the canvas is non-empty
- Empty state shows a “Sign here” placeholder and baseline guide

## Custom styling

```tsx
<SignatureCanvas color="#0ea5e9" strokeWidth={3} />
```

The canvas scales to its container width while preserving aspect ratio via `aspectRatio`.
