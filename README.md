# Clay UI

Soft, pastel React 18 component library built with TypeScript and Tailwind CSS.

[![npm version](https://img.shields.io/npm/v/@michael1010/clay-ui.svg)](https://www.npmjs.com/package/@michael1010/clay-ui)

**Live site:** [https://clay-ui.vercel.app](https://clay-ui.vercel.app) · **Showcase:** [https://clay-ui.vercel.app/showcase/](https://clay-ui.vercel.app/showcase/)

**Local:** `npm run docs:dev` → [http://localhost:5177](http://localhost:5177) · `npm run dev` → [http://localhost:5173](http://localhost:5173)

---

## Install

```bash
npm install @michael1010/clay-ui
```

On install, a **postinstall** script tries to add missing peers (`react`, `react-dom`, `lucide-react`, `recharts`) and Tailwind (`tailwindcss`, `postcss`, `autoprefixer`). It can also scaffold `tailwind.config.js` and `postcss.config.js` if they don’t exist.

Skip auto-setup:

```bash
CLAY_UI_SKIP_POSTINSTALL=1 npm install @michael1010/clay-ui
```

Run setup manually:

```bash
npx clay-ui-setup
```

---

## Quick start

### 1. Import styles

In your app entry (`main.tsx` / `App.tsx`):

```tsx
import '@michael1010/clay-ui/styles.css'
```

### 2. Configure Tailwind

If setup didn’t create a config, add the Clay preset:

```js
// tailwind.config.js (ESM)
import clayPreset from '@michael1010/clay-ui/preset'

export default {
  presets: [clayPreset],
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
    './node_modules/@michael1010/clay-ui/dist/**/*.js',
  ],
}
```

```js
// postcss.config.js
export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}
```

### 3. Fonts (recommended)

Add to `index.html`:

```html
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link
  href="https://fonts.googleapis.com/css2?family=Nunito+Sans:wght@400;600;700&family=Varela+Round&display=swap"
  rel="stylesheet"
/>
```

### 4. Use components

```tsx
import { Button, Modal, ToastProvider, useToast } from '@michael1010/clay-ui'
import { useState } from 'react'

function App() {
  const [open, setOpen] = useState(false)
  const { toast } = useToast()

  return (
    <ToastProvider>
      <Button variant="primary" onClick={() => setOpen(true)}>
        Open modal
      </Button>

      <Modal
        open={open}
        onClose={() => setOpen(false)}
        title="Hello"
        description="Clay UI is ready."
      >
        <p className="text-sm text-slate-500">Your content here.</p>
      </Modal>

      <Button
        variant="mint"
        onClick={() => toast({ type: 'success', title: 'Saved!' })}
      >
        Show toast
      </Button>
    </ToastProvider>
  )
}
```

---

## Requirements

| Package | Notes |
|---------|--------|
| `react` ^18 | Peer dependency |
| `react-dom` ^18 | Peer dependency |
| `lucide-react` | Icons in examples and many components |
| `recharts` | Chart / data visualization components |
| `tailwindcss` ^3 | Required for styling (installed by setup script) |

---

## Package exports

| Import | Purpose |
|--------|---------|
| `@michael1010/clay-ui` | All components and types |
| `@michael1010/clay-ui/preset` | Tailwind theme preset |
| `@michael1010/clay-ui/styles.css` | Base styles, utilities, animations |

---

## Component overview

### UI

`Button`, `Toggle`, `Input`, `Textarea`, `Slider`, `Select`, `SearchableSelect`, `MultiSelect`, `MultiCombobox`, `SingleCombobox`, `Modal`, `ToastProvider`, `useToast`, `CommandPalette`, `Tooltip`, `Badge`, `Alert`, `Accordion`, `Stepper`, `DatePicker`, `TimePicker`, `OTPField`, `TagInput`, `MentionField`, `Rating`, `Pagination`, `Popover`, `Skeleton`, `Progress`, `Checkbox`, `Radio`, and more.

### Data

`Avatar`, `AvatarGroup`, `Gauge`, `Sparkline`, `StatCard`, `EmptyState`, `Timeline`, `Kanban` types, chart showcases, tables, heatmaps, etc.

### Navigation

`CardTabs`, `PillTabs`, `Drawer`, `Navbar`.

### Cards

`ProductCard`, `ProfileCard`, `PricingCard`.

See the [docs](./docs/) folder or `npm run docs:dev` for per-component props and examples.

---

## Data-driven components

Some components expect props you provide:

```tsx
import { CommandPalette, type Command } from '@michael1010/clay-ui'
import { MentionField, type MentionUser } from '@michael1010/clay-ui'
import { MultiCombobox, type ComboboxOption } from '@michael1010/clay-ui'

const commands: Command[] = [
  { id: '1', label: 'Settings', category: 'Nav', icon: <Settings className="w-4 h-4" /> },
]

const users: MentionUser[] = [
  { id: 'u1', name: 'Alex', handle: 'alex', color: '#0ea5e9', initials: 'AL' },
]

const options: ComboboxOption[] = [
  { value: 'react', label: 'React', group: 'Frontend' },
]
```

---

## Development (this repo)

```bash
npm install
npm run dev          # component showcase
npm run docs:dev     # documentation site
npm run build        # build dist/ for publishing
npm publish --access public
```

---

## License

MIT
