# Accordion

Expandable sections with optional icons, badges, and single- or multi-open modes.

## Import

```tsx
import { AccordionGroup, type AccordionItem } from 'clay-ui'
```

## AccordionItem interface

```tsx
interface AccordionItem {
  id: string
  title: string
  content: string
  icon?: React.ReactNode
  badge?: string
}
```

## Basic usage

```tsx
import { AccordionGroup, type AccordionItem } from 'clay-ui'
import { Shield } from 'lucide-react'

const items: AccordionItem[] = [
  {
    id: 'security',
    title: 'Is my data secure?',
    icon: <Shield className="w-4 h-4" />,
    content: 'All data is encrypted in transit and at rest.',
  },
]

function Example() {
  return <AccordionGroup items={items} single />
}
```

## AccordionGroup props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `items` | `AccordionItem[]` | — | Sections to render (required) |
| `single` | `boolean` | `false` | When true, only one section open at a time |
| `variant` | `'default' \| 'flush'` | `'default'` | Card style vs. divider-only |

## Examples

```tsx
{/* FAQ — one open at a time */}
<AccordionGroup items={faqItems} single />

{/* Settings — multiple sections can be open */}
<AccordionGroup items={settingsItems} variant="flush" />
```

The first item is open by default on mount.
