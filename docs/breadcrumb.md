# Breadcrumb

Navigation trail with icons and separators.

## Import

```tsx
import { BreadcrumbTrail, type Crumb } from 'clay-ui'
```

## Basic usage

```tsx
<BreadcrumbTrail crumbs={crumbs} withIcons />
```

## Exports

- `BreadcrumbTrail`
- `Crumb`

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `crumbs` | Crumb[] | — | Trail items: label, href?, icon? (required) |
| `separator` | 'chevron' | 'slash' | 'chevron' | Separator style |
| `withIcons` | boolean | false | Show crumb icons |

