# Input & Textarea

Controlled text inputs with labels, icons, and validation feedback.

## Import

```tsx
import { Input, Textarea } from 'clay-ui'
```

## Basic usage

```tsx
import { useState } from 'react'
import { Input, Textarea } from 'clay-ui'
import { Mail } from 'lucide-react'

function Example() {
  const [email, setEmail] = useState('')
  const [bio, setBio] = useState('')

  return (
    <>
      <Input
        label="Email"
        placeholder="you@email.com"
        type="email"
        icon={<Mail className="w-4 h-4" />}
        value={email}
        onChange={setEmail}
        hint="We'll never share your email."
      />
      <Textarea
        label="Bio"
        placeholder="Tell us about yourself…"
        value={bio}
        onChange={setBio}
      />
    </>
  )
}
```

## Input props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `label` | `string` | — | Field label above the input |
| `placeholder` | `string` | — | Placeholder text |
| `type` | `string` | `'text'` | Native input `type` |
| `icon` | `React.ReactNode` | — | Left icon inside the field |
| `iconRight` | `React.ReactNode` | — | Right icon (e.g. password toggle) |
| `error` | `string` | — | Error message; applies red border |
| `success` | `string` | — | Success message; applies green border |
| `hint` | `string` | — | Helper text (hidden when error/success shown) |
| `disabled` | `boolean` | — | Disables the input |
| `value` | `string` | — | Controlled value (required) |
| `onChange` | `(v: string) => void` | — | Value change handler (required) |

## Textarea props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `label` | `string` | — | Field label |
| `placeholder` | `string` | — | Placeholder text |
| `hint` | `string` | — | Helper text below |
| `value` | `string` | — | Controlled value (required) |
| `onChange` | `(v: string) => void` | — | Value change handler (required) |

## Validation states

```tsx
<Input
  label="Email"
  value={email}
  onChange={setEmail}
  error="Please enter a valid email address."
/>

<Input
  label="Username"
  value={username}
  onChange={setUsername}
  success="Username is available!"
/>
```
