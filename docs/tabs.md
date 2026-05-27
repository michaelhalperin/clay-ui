# Tabs

Card-style tab bar and pill-style segmented control.

## Import

```tsx
import { CardTabs, PillTabs, type Tab } from 'clay-ui'
```

## Tab interface

```tsx
interface Tab {
  id: string
  label: string
  icon?: React.ReactNode
  badge?: number
}
```

## Basic usage

```tsx
import { CardTabs, type Tab } from 'clay-ui'
import { BarChart2 } from 'lucide-react'

const tabs: Tab[] = [
  { id: 'overview', label: 'Overview', icon: <BarChart2 className="w-4 h-4" /> },
  { id: 'users', label: 'Users', badge: 12 },
]

const content = {
  overview: <p>Overview panel</p>,
  users: <p>Users panel</p>,
}

function Example() {
  return <CardTabs tabs={tabs} content={content} />
}
```

## CardTabs props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `tabs` | `Tab[]` | — | Tab definitions (required) |
| `content` | `Record<string, React.ReactNode>` | — | Panel content keyed by tab `id` (required) |

## PillTabs props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `tabs` | `Tab[]` | — | Tab definitions (required) |

`PillTabs` manages its own active state and shows a placeholder content card for the selected tab.

## Pill tabs example

```tsx
<PillTabs tabs={settingsTabs} />
```

`CardTabs` uses the first tab as the initial selection. Optional `badge` renders a count chip on the tab label.
