# Button

Clay-styled button with color variants, size presets, loading spinner, and optional icons.

## Import

```tsx
import { Button } from 'clay-ui'
```

## Basic usage

```tsx
import { Button } from 'clay-ui'
import { ArrowRight } from 'lucide-react'

function Example() {
  return (
    <Button variant="primary" size="md" onClick={() => console.log('clicked')}>
      Continue
    </Button>
  )
}
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `'primary' \| 'secondary' \| 'mint' \| 'peach' \| 'lavender' \| 'ghost' \| 'danger'` | `'primary'` | Visual style preset |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Padding and font size |
| `loading` | `boolean` | — | Shows spinner and disables interaction |
| `disabled` | `boolean` | — | Disables the button |
| `icon` | `React.ReactNode` | — | Icon before the label |
| `iconRight` | `React.ReactNode` | — | Icon after the label |
| `children` | `React.ReactNode` | — | Button label (required) |
| `onClick` | `() => void` | — | Click handler |

## Variants

```tsx
<Button variant="primary">Primary</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="mint">Mint</Button>
<Button variant="danger">Danger</Button>
<Button variant="ghost">Ghost</Button>
```

## With icons and loading

```tsx
import { Heart, ArrowRight } from 'lucide-react'

<Button icon={<Heart className="w-4 h-4" />} variant="peach">Like</Button>
<Button iconRight={<ArrowRight className="w-4 h-4" />}>Continue</Button>
<Button loading>Saving…</Button>
```
