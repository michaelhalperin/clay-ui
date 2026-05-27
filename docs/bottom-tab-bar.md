# Bottom Tab Bar

Mobile bottom navigation tabs.

## Import

```tsx
import { TabBar, type BottomTab } from 'clay-ui'
```

## Basic usage

```tsx
<TabBar tabs={tabs} active={id} onTab={setId} />
```

## Exports

- `TabBar`
- `BottomTab`

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `tabs` | BottomTab[] | — | Tab definitions (required) |
| `active` | string | — | Active tab id (required) |
| `onTab` | (id: string) => void | — | Selection handler (required) |
| `variant` | 'default' | 'floating' | 'default' | Bar style |

