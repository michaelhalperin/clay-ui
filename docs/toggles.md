# Toggle

Animated on/off switch with label, description, and icon.

## Import

```tsx
import { Toggle } from 'clay-ui'
```

## Basic usage

```tsx
<Toggle checked={on} onChange={setOn} label="Dark mode" icon={<Moon />} />
```

## Exports

- `Toggle`

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `checked` | boolean | — | Current state (required) |
| `onChange` | (v: boolean) => void | — | Change handler (required) |
| `color` | string | 'bg-sky-500' | Track color when on |
| `label` | string | — | Primary label |
| `description` | string | — | Secondary text |
| `icon` | React.ReactNode | — | Leading icon |
| `disabled` | boolean | — | Disables interaction |

