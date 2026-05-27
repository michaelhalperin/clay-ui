# Alert

Inline alerts, compact banners, and a full-width top announcement bar with dismiss actions.

## Import

```tsx
import { Alert, InlineBanner, TopBanner } from 'clay-ui'
```

## Basic usage

```tsx
import { Alert } from 'clay-ui'

function Example() {
  return (
    <Alert
      type="success"
      title="Changes saved"
      description="Your profile was updated successfully."
      dismissible
      action={{ label: 'View profile', onClick: () => {} }}
    />
  )
}
```

## Exports

- `Alert`
- `InlineBanner`
- `TopBanner`

## Alert props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `type` | `'success' | 'error' | 'warning' | 'info'` | — | Visual variant (required) |
| `title` | `string` | — | Heading (required) |
| `description` | `string` | — | Body text |
| `dismissible` | `boolean` | — | Shows close button; hides alert on dismiss |
| `action` | `{ label: string; onClick: () => void }` | — | Optional text action with arrow |
## InlineBanner props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `type` | `AlertType` | — | Same variants as `Alert` (required) |
| `message` | `string` | — | Single-line message (required) |
## Examples

```tsx
<InlineBanner type="warning" message="Your trial ends in 3 days." />
<TopBanner />
```

