# OTP Input

Segmented one-time password field with auto-advance, backspace navigation, and paste support.

## Import

```tsx
import { OTPField } from 'clay-ui'
```

## Basic usage

```tsx
import { OTPField } from 'clay-ui'

function Verify() {
  return (
    <OTPField
      length={6}
      onComplete={(code) => console.log('Submitted:', code)}
    />
  )
}
```

## Exports

- `OTPField`

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `length` | `number` | `6` | Number of digit cells |
| `onComplete` | `(val: string) => void` | — | Called when all cells are filled |
## Notes

Focus moves forward on input and backward on Backspace. Pasting a full code fills all cells at once.
