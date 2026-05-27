# OTP Input

Segmented one-time password input with paste support.

## Import

```tsx
import { OTPField } from 'clay-ui'
```

## Basic usage

```tsx
<OTPField length={6} onComplete={(code) => verify(code)} />
```

## Exports

- `OTPField`

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `length` | number | 6 | Number of digits |
| `onComplete` | (val: string) => void | — | Called when all cells filled |

