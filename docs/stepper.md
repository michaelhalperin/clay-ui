# Stepper

Horizontal and vertical step indicators for wizards and progress flows.

## Import

```tsx
import { HorizontalStepper, VerticalStepper, type Step } from 'clay-ui'
```

## Step interface

```tsx
interface Step {
  id: number
  label: string
  description?: string
  icon?: React.ReactNode
}
```

## Basic usage

```tsx
import { useState } from 'react'
import { HorizontalStepper, type Step } from 'clay-ui'

const steps: Step[] = [
  { id: 1, label: 'Details', description: 'Basic info' },
  { id: 2, label: 'Review', description: 'Check all' },
  { id: 3, label: 'Publish', description: 'Go live' },
]

function Example() {
  const [active, setActive] = useState(0)

  return <HorizontalStepper steps={steps} active={active} onStep={setActive} />
}
```

## HorizontalStepper props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `steps` | `Step[]` | — | Step definitions (required) |
| `active` | `number` | — | Zero-based index of the current step (required) |
| `onStep` | `(i: number) => void` | — | Called when a step circle is clicked (required) |

## VerticalStepper props

Same props as `HorizontalStepper`. Renders a vertical timeline with connector lines.

## Examples

```tsx
const [step, setStep] = useState(1)

<HorizontalStepper steps={steps} active={step} onStep={setStep} />
<VerticalStepper steps={steps} active={step} onStep={setStep} />
```

Steps before `active` show a checkmark; the current step is highlighted; future steps are muted. Click any step to jump via `onStep`.
