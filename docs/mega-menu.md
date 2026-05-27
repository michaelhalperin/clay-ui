# Mega Menu

Full-width dropdown mega navigation.

## Import

```tsx
import { MegaDropdown, type MegaMenuGroup } from 'clay-ui'
```

## Basic usage

```tsx
<MegaDropdown label="Product" menu={groups} />
```

## Exports

- `MegaDropdown`
- `MegaMenuItem`
- `MegaMenuGroup`

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `label` | string | — | Trigger label (required) |
| `menu` | MegaMenuGroup[] | — | Grouped menu content (required) |
| `MegaMenuItem` | interface | — | label, desc, icon, color, badge? |

