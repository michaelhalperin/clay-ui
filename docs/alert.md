# Alert

Inline alerts, banners, and dismissible notifications.

## Import

```tsx
import { Alert } from 'clay-ui'
```

## Basic usage

```tsx
<Alert type="success" title="Saved" description="Changes applied." dismissible />
```

## Exports

- `Alert`
- `InlineBanner`
- `TopBanner`

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `type` | 'success' | 'error' | 'warning' | 'info' | — | Visual variant (required) |
| `title` | string | — | Heading (required) |
| `description` | string | — | Body text |
| `dismissible` | boolean | — | Shows close button |
| `action` | React.ReactNode | — | Optional action slot |

