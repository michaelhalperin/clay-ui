import { writeFileSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'

const root = join(dirname(fileURLToPath(import.meta.url)), '..', 'docs')
const force = process.argv.includes('--force')

function table(rows) {
  if (!rows?.length) return ''
  const head =
    '| Prop | Type | Default | Description |\n|------|------|---------|-------------|\n'
  return (
    head +
    rows
      .map((r) => `| \`${r[0]}\` | ${r[1]} | ${r[2]} | ${r[3]} |`)
      .join('\n') +
    '\n'
  )
}

function renderPage({
  title,
  desc,
  importLine,
  usage,
  exports: exportList,
  sections = [],
  examples,
  notes,
  showcase,
}) {
  let md = `# ${title}\n\n${desc}\n\n`

  if (showcase) {
    md += `> **Showcase component** — a pre-built demo layout with sample data. Use it for reference or copy patterns into your app. Open the [live showcase](/showcase/) to interact with it.\n\n`
  }

  md += `## Import\n\n\`\`\`tsx\n${importLine}\n\`\`\`\n\n`
  md += `## Basic usage\n\n\`\`\`tsx\n${usage}\n\`\`\`\n\n`

  if (exportList?.length) {
    md += `## Exports\n\n${exportList.map((e) => `- \`${e}\``).join('\n')}\n\n`
  }

  for (const { name, props } of sections) {
    if (props?.length) {
      md += `## ${name}\n\n${table(props)}`
    }
  }

  if (!sections.some((s) => s.props?.length) && !showcase) {
    md += `## Props\n\n_See component source for full typings._\n\n`
  }

  if (examples) {
    md += `## Examples\n\n\`\`\`tsx\n${examples}\n\`\`\`\n\n`
  }

  if (notes) {
    md += `## Notes\n\n${notes}\n`
  }

  return md
}

const pages = [
  {
    slug: 'toggles',
    title: 'Toggle',
    desc: 'Animated on/off switch with optional label, description, and leading icon. Uses `role="switch"` for accessibility.',
    importLine: `import { Toggle } from 'clay-ui'`,
    usage: `import { useState } from 'react'
import { Toggle } from 'clay-ui'
import { Moon } from 'lucide-react'

function Example() {
  const [dark, setDark] = useState(false)
  return (
    <Toggle
      checked={dark}
      onChange={setDark}
      label="Dark mode"
      description="Use a darker color scheme"
      icon={<Moon className="w-4 h-4" />}
    />
  )
}`,
    exports: ['Toggle'],
    sections: [{ name: 'Props', props: [
      ['checked', '`boolean`', '—', 'Current on/off state (required)'],
      ['onChange', '`(v: boolean) => void`', '—', 'Called when toggled (required)'],
      ['color', '`string`', `'bg-sky-500'`, 'Tailwind background class when on'],
      ['label', '`string`', '—', 'Primary label'],
      ['description', '`string`', '—', 'Secondary helper text'],
      ['icon', '`React.ReactNode`', '—', 'Icon shown beside the label'],
      ['disabled', '`boolean`', '—', 'Disables interaction and dims the row'],
    ]}],
    examples: `<Toggle checked={on} onChange={setOn} color="bg-violet-500" label="Notifications" />
<Toggle checked={on} onChange={setOn} disabled label="Unavailable" />`,
  },
  {
    slug: 'sliders',
    title: 'Slider',
    desc: 'Pointer-driven range slider with label, optional icon, and formatted value display. Includes a dual-thumb range variant.',
    importLine: `import { Slider, RangeSlider } from 'clay-ui'`,
    usage: `import { useState } from 'react'
import { Slider } from 'clay-ui'
import { Volume2 } from 'lucide-react'

function Example() {
  const [vol, setVol] = useState(60)
  return (
    <Slider
      value={vol}
      onChange={setVol}
      min={0}
      max={100}
      label="Volume"
      icon={<Volume2 className="w-4 h-4" />}
    />
  )
}`,
    exports: ['Slider', 'RangeSlider'],
    sections: [
      { name: 'Slider props', props: [
        ['value', '`number`', '—', 'Current value (required)'],
        ['onChange', '`(v: number) => void`', '—', 'Change handler (required)'],
        ['min', '`number`', '`0`', 'Minimum value'],
        ['max', '`number`', '`100`', 'Maximum value'],
        ['step', '`number`', '`1`', 'Step increment'],
        ['color', '`string`', `'#0ea5e9'`, 'Fill color (hex)'],
        ['label', '`string`', '—', 'Field label'],
        ['icon', '`React.ReactNode`', '—', 'Leading icon'],
        ['showValue', '`boolean`', '`true`', 'Show numeric value beside the label'],
        ['formatValue', '`(v: number) => string`', '—', 'Custom value formatter'],
      ]},
      { name: 'RangeSlider props', props: [
        ['label', '`string`', '—', 'Field label (required)'],
      ]},
    ],
    examples: `<Slider value={n} onChange={setN} min={0} max={10} step={0.5} formatValue={(v) => \`\${v}x\`} />
<RangeSlider label="Price range" />`,
  },
  {
    slug: 'skeleton',
    title: 'Skeleton',
    desc: 'Shimmer loading placeholders. Use `Bone` for primitive shapes or compose layout skeletons in your own loading states.',
    importLine: `import { Bone } from 'clay-ui'`,
    usage: `import { Bone } from 'clay-ui'

function LoadingCard() {
  return (
    <div className="space-y-3 p-4">
      <Bone className="h-4 w-32" />
      <Bone className="h-3 w-full" />
      <Bone className="h-3 w-4/5" />
    </div>
  )
}`,
    exports: ['Bone'],
    sections: [{ name: 'Bone props', props: [
      ['className', '`string`', `''`, 'Tailwind classes for size and shape'],
      ['style', '`React.CSSProperties`', '—', 'Inline dimensions when needed'],
    ]}],
    notes: 'The live showcase includes pre-built layouts (profile, article, dashboard, table, feed). Copy those patterns or build your own with `Bone`.',
  },
  {
    slug: 'date-picker',
    title: 'Date Picker',
    desc: 'Calendar pickers for a single date, a date range, or an always-visible inline calendar.',
    importLine: `import { SinglePicker, RangePicker, InlineCalendar } from 'clay-ui'`,
    usage: `import { SinglePicker, RangePicker } from 'clay-ui'

function Example() {
  return (
    <>
      <SinglePicker label="Start date" />
      <RangePicker label="Trip dates" />
    </>
  )
}`,
    exports: ['SinglePicker', 'RangePicker', 'InlineCalendar'],
    sections: [
      { name: 'SinglePicker & RangePicker props', props: [
        ['label', '`string`', '—', 'Field label above the trigger'],
      ]},
    ],
    examples: `<InlineCalendar />`,
    notes: 'Pickers manage their own open state and selected dates internally. For full control, lift state by adapting the source component.',
  },
  {
    slug: 'alert',
    title: 'Alert',
    desc: 'Inline alerts, compact banners, and a full-width top announcement bar with dismiss actions.',
    importLine: `import { Alert, InlineBanner, TopBanner } from 'clay-ui'`,
    usage: `import { Alert } from 'clay-ui'

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
}`,
    exports: ['Alert', 'InlineBanner', 'TopBanner'],
    sections: [
      { name: 'Alert props', props: [
        ['type', '`\'success\' | \'error\' | \'warning\' | \'info\'`', '—', 'Visual variant (required)'],
        ['title', '`string`', '—', 'Heading (required)'],
        ['description', '`string`', '—', 'Body text'],
        ['dismissible', '`boolean`', '—', 'Shows close button; hides alert on dismiss'],
        ['action', '`{ label: string; onClick: () => void }`', '—', 'Optional text action with arrow'],
      ]},
      { name: 'InlineBanner props', props: [
        ['type', '`AlertType`', '—', 'Same variants as `Alert` (required)'],
        ['message', '`string`', '—', 'Single-line message (required)'],
      ]},
    ],
    examples: `<InlineBanner type="warning" message="Your trial ends in 3 days." />
<TopBanner />`,
  },
  {
    slug: 'progress',
    title: 'Progress',
    desc: 'Linear bars, indeterminate loaders, circular rings, and multi-step segmented progress.',
    importLine: `import { LinearProgress, CircularProgress, IndeterminateBar, StepProgress } from 'clay-ui'`,
    usage: `import { LinearProgress, StepProgress } from 'clay-ui'

function Example() {
  return (
    <>
      <LinearProgress value={65} label="Upload" striped animated />
      <StepProgress steps={['Cart', 'Shipping', 'Payment', 'Done']} current={1} />
    </>
  )
}`,
    exports: ['LinearProgress', 'CircularProgress', 'IndeterminateBar', 'StepProgress'],
    sections: [
      { name: 'LinearProgress props', props: [
        ['value', '`number`', '—', 'Current value (required)'],
        ['max', '`number`', '`100`', 'Maximum value'],
        ['color', '`string`', `'#0ea5e9'`, 'Bar fill color'],
        ['size', '`\'sm\' | \'md\' | \'lg\'`', `'md'`, 'Bar height'],
        ['label', '`string`', '—', 'Caption above the bar'],
        ['showValue', '`boolean`', '`true`', 'Show percentage'],
        ['striped', '`boolean`', '—', 'Diagonal stripe overlay'],
        ['animated', '`boolean`', '—', 'Animate stripes (use with `striped`)'],
      ]},
      { name: 'CircularProgress props', props: [
        ['value', '`number`', '—', '0–100 progress (required)'],
        ['size', '`number`', '`80`', 'SVG diameter in px'],
        ['stroke', '`number`', '`8`', 'Ring stroke width'],
        ['color', '`string`', `'#0ea5e9'`, 'Progress ring color'],
        ['trackColor', '`string`', `'#f1f5f9'`, 'Background ring color'],
        ['label', '`string`', '—', 'Caption below the ring'],
        ['children', '`React.ReactNode`', '—', 'Center content (defaults to percent text)'],
      ]},
      { name: 'StepProgress props', props: [
        ['steps', '`string[]`', '—', 'Step labels (required)'],
        ['current', '`number`', '—', 'Active step index, 0-based (required)'],
      ]},
    ],
    examples: `<IndeterminateBar label="Loading…" />
<CircularProgress value={72} label="Storage" />`,
  },
  {
    slug: 'checkbox-radio',
    title: 'Checkbox & Radio',
    desc: 'Accessible checkbox, radio, and large card-style radio options with labels and descriptions.',
    importLine: `import { Checkbox, Radio, CardRadio } from 'clay-ui'`,
    usage: `import { useState } from 'react'
import { Checkbox, Radio } from 'clay-ui'

function Example() {
  const [terms, setTerms] = useState(false)
  const [plan, setPlan] = useState('pro')
  return (
    <>
      <Checkbox checked={terms} onChange={setTerms} label="Accept terms" />
      <Radio value="pro" selected={plan} onChange={setPlan} label="Pro plan" />
    </>
  )
}`,
    exports: ['Checkbox', 'Radio', 'CardRadio'],
    sections: [
      { name: 'Checkbox props', props: [
        ['checked', '`boolean`', '—', 'Checked state (required)'],
        ['onChange', '`(v: boolean) => void`', '—', 'Change handler (required)'],
        ['label', '`string`', '—', 'Primary label'],
        ['description', '`string`', '—', 'Helper text'],
        ['disabled', '`boolean`', '—', 'Disables the control'],
        ['indeterminate', '`boolean`', '—', 'Shows dash instead of check'],
        ['color', '`string`', `'#0ea5e9'`, 'Accent color when checked'],
      ]},
      { name: 'Radio & CardRadio props', props: [
        ['value', '`string`', '—', 'This option’s value (required)'],
        ['selected', '`string`', '—', 'Currently selected value (required)'],
        ['onChange', '`(v: string) => void`', '—', 'Called with `value` when selected (required)'],
        ['label', '`string`', '—', 'Primary label'],
        ['description', '`string`', '—', 'Helper text'],
        ['disabled', '`boolean`', '—', 'Disables the control'],
        ['color', '`string`', `'#0ea5e9'`, 'Accent color'],
        ['icon', '`React.ReactNode`', '—', 'CardRadio only — leading icon'],
      ]},
    ],
    examples: `<Checkbox checked={v} onChange={setV} indeterminate label="Select all" />
<CardRadio value="team" selected={plan} onChange={setPlan} label="Team" description="Shared workspace" icon={<Users />} />`,
  },
  {
    slug: 'otp-input',
    title: 'OTP Input',
    desc: 'Segmented one-time password field with auto-advance, backspace navigation, and paste support.',
    importLine: `import { OTPField } from 'clay-ui'`,
    usage: `import { OTPField } from 'clay-ui'

function Verify() {
  return (
    <OTPField
      length={6}
      onComplete={(code) => console.log('Submitted:', code)}
    />
  )
}`,
    exports: ['OTPField'],
    sections: [{ name: 'Props', props: [
      ['length', '`number`', '`6`', 'Number of digit cells'],
      ['onComplete', '`(val: string) => void`', '—', 'Called when all cells are filled'],
    ]}],
    notes: 'Focus moves forward on input and backward on Backspace. Pasting a full code fills all cells at once.',
  },
  {
    slug: 'tag-input',
    title: 'Tag Input',
    desc: 'Chip input for tags with keyboard add/remove and optional autocomplete suggestions.',
    importLine: `import { TagInput } from 'clay-ui'`,
    usage: `import { TagInput } from 'clay-ui'

function Example() {
  return (
    <TagInput
      label="Skills"
      placeholder="Add a skill…"
      suggestions={['React', 'TypeScript', 'Tailwind', 'Design']}
    />
  )
}`,
    exports: ['TagInput'],
    sections: [{ name: 'Props', props: [
      ['label', '`string`', '—', 'Field label'],
      ['placeholder', '`string`', `'Add tag…'`, 'Input placeholder'],
      ['suggestions', '`string[]`', '—', 'Autocomplete list shown while typing'],
    ]}],
    notes: 'Press Enter or comma to add a tag. Click × on a chip or press Backspace in an empty input to remove.',
  },
  {
    slug: 'popover',
    title: 'Popover',
    desc: 'Click-triggered floating panel anchored to any trigger element.',
    importLine: `import { Popover } from 'clay-ui'`,
    usage: `import { Popover } from 'clay-ui'

function Example() {
  return (
    <Popover trigger={<button className="btn">Options</button>} align="left">
      <p className="text-sm text-slate-600 p-2">Popover content goes here.</p>
    </Popover>
  )
}`,
    exports: ['Popover'],
    sections: [{ name: 'Props', props: [
      ['trigger', '`React.ReactNode`', '—', 'Click target (required)'],
      ['children', '`React.ReactNode`', '—', 'Panel content (required)'],
      ['align', '`\'left\' | \'right\' | \'center\'`', `'left'`, 'Horizontal alignment relative to trigger'],
    ]}],
    notes: 'Click outside or press Escape to close. The panel is portaled so it is not clipped by overflow parents.',
  },
  {
    slug: 'context-menu',
    title: 'Context Menu',
    desc: 'Right-click context menu patterns. Export the `ContextMenuItem` shape to build menu data; see the showcase for a full implementation.',
    importLine: `import { type ContextMenuItem } from 'clay-ui'`,
    usage: `import { type ContextMenuItem } from 'clay-ui'
import { Copy, Trash2 } from 'lucide-react'

const items: ContextMenuItem[] = [
  { icon: <Copy className="w-4 h-4" />, label: 'Copy', shortcut: '⌘C' },
  { icon: <Trash2 className="w-4 h-4" />, label: 'Delete', shortcut: '⌫', danger: true, dividerAfter: true },
]`,
    exports: ['ContextMenuItem'],
    sections: [{ name: 'ContextMenuItem', props: [
      ['icon', '`React.ReactNode`', '—', 'Row icon (required)'],
      ['label', '`string`', '—', 'Action label (required)'],
      ['shortcut', '`string`', '—', 'Keyboard hint, e.g. `⌘C`'],
      ['danger', '`boolean`', '—', 'Destructive red styling'],
      ['dividerAfter', '`boolean`', '—', 'Renders a divider below this item'],
    ]}],
    notes: 'Use `ContextMenuShowcase` in the live demo as a reference for positioning and open state.',
  },
  {
    slug: 'color-picker',
    title: 'Color Picker',
    desc: 'HSV color panel with hex output, plus inline swatch and popover trigger variants.',
    importLine: `import { ColorPickerPanel, InlineColorPicker, PopoverColorPicker } from 'clay-ui'`,
    usage: `import { useState } from 'react'
import { ColorPickerPanel } from 'clay-ui'

function Example() {
  const [hex, setHex] = useState('#0ea5e9')
  return <ColorPickerPanel hex={hex} onChange={setHex} />
}`,
    exports: ['ColorPickerPanel', 'InlineColorPicker', 'PopoverColorPicker'],
    sections: [{ name: 'ColorPickerPanel props', props: [
      ['hex', '`string`', '—', 'Current hex color, e.g. `#0ea5e9` (required)'],
      ['onChange', '`(hex: string) => void`', '—', 'Called with updated hex (required)'],
    ]}],
    examples: `<InlineColorPicker />
<PopoverColorPicker />`,
  },
  {
    slug: 'rating',
    title: 'Rating',
    desc: 'Interactive star rating input and read-only half-star display with review count.',
    importLine: `import { StarRating, HalfStarDisplay } from 'clay-ui'`,
    usage: `import { useState } from 'react'
import { StarRating } from 'clay-ui'

function Example() {
  const [rating, setRating] = useState(4)
  return <StarRating value={rating} onChange={setRating} label="Quality" max={5} />
}`,
    exports: ['StarRating', 'HalfStarDisplay'],
    sections: [
      { name: 'StarRating props', props: [
        ['value', '`number`', '—', 'Current rating'],
        ['onChange', '`(v: number) => void`', '—', 'Called when user selects a star'],
        ['max', '`number`', '`5`', 'Number of stars'],
        ['size', '`\'sm\' | \'md\' | \'lg\'`', `'md'`, 'Star size'],
        ['label', '`string`', '—', 'Field label'],
        ['readonly', '`boolean`', '`false`', 'Display-only; no hover selection'],
      ]},
      { name: 'HalfStarDisplay props', props: [
        ['value', '`number`', '—', 'Rating value, supports halves (required)'],
        ['max', '`number`', '`5`', 'Star count'],
        ['reviews', '`number`', '—', 'Review count shown beside stars'],
      ]},
    ],
  },
  {
    slug: 'pagination',
    title: 'Pagination',
    desc: 'Page controls with ellipsis, first/last jumps, and visual variants.',
    importLine: `import { Pager } from 'clay-ui'`,
    usage: `import { useState } from 'react'
import { Pager } from 'clay-ui'

function Example() {
  const [page, setPage] = useState(1)
  return <Pager page={page} totalPages={12} go={setPage} variant="rounded" />
}`,
    exports: ['Pager'],
    sections: [{ name: 'Props', props: [
      ['page', '`number`', '—', 'Current page, 1-based (required)'],
      ['totalPages', '`number`', '—', 'Total page count (required)'],
      ['go', '`(page: number) => void`', '—', 'Called when user picks a page (required)'],
      ['size', '`\'sm\' | \'md\' | \'lg\'`', `'md'`, 'Control size'],
      ['variant', '`\'default\' | \'rounded\' | \'minimal\'`', `'default'`, 'Visual style'],
    ]}],
  },
  {
    slug: 'chat',
    title: 'Chat',
    desc: 'Messaging window and contact list layouts with sample conversations.',
    importLine: `import { ChatWindow, ContactList, type Message } from 'clay-ui'`,
    usage: `import { ChatWindow } from 'clay-ui'

function Example() {
  return <ChatWindow />
}`,
    exports: ['ChatWindow', 'ContactList', 'Message'],
    sections: [{ name: 'Message', props: [
      ['id', '`string`', '—', 'Unique id'],
      ['text', '`string`', '—', 'Message body'],
      ['sender', '`\'me\' | \'them\'`', '—', 'Bubble alignment'],
      ['time', '`string`', '—', 'Display timestamp'],
      ['avatar', '`string`', '—', 'Gradient classes for avatar circle'],
    ]}],
    notes: '`ChatWindow` and `ContactList` are self-contained demos. Use the `Message` type when wiring your own data.',
  },
  {
    slug: 'code-block',
    title: 'Code Block',
    desc: 'Syntax-highlighted code blocks with copy button and optional collapse, plus inline code spans.',
    importLine: `import { CodeBlock, InlineCode } from 'clay-ui'`,
    usage: `import { CodeBlock } from 'clay-ui'

const source = \`export function greet(name: string) {
  return \\\`Hello, \\\${name}!\\\`
}\`

function Example() {
  return <CodeBlock lang="tsx" code={source} label="greet.ts" collapsible />
}`,
    exports: ['CodeBlock', 'InlineCode'],
    sections: [{ name: 'CodeBlock props', props: [
      ['lang', '`string`', '—', 'Language id for highlighting (required)'],
      ['code', '`string`', '—', 'Source code (required)'],
      ['label', '`string`', '—', 'Filename shown in the header'],
      ['collapsible', '`boolean`', '`false`', 'Allow collapsing the block'],
    ]}],
    examples: `<InlineCode>npm install clay-ui</InlineCode>`,
  },
  {
    slug: 'carousel',
    title: 'Carousel',
    desc: 'Three carousel patterns: fullscreen slides, horizontal metric cards, and thumbnail strip navigation.',
    importLine: `import { SlideCarousel, CardCarousel, ThumbnailCarousel } from 'clay-ui'`,
    usage: `import { SlideCarousel } from 'clay-ui'

function Example() {
  return <SlideCarousel />
}`,
    exports: ['SlideCarousel', 'CardCarousel', 'ThumbnailCarousel'],
    notes: 'Each variant ships with demo content and autoplay. Fork the component to accept your own `slides` or `items` array.',
  },
  {
    slug: 'tree-view',
    title: 'Tree View',
    desc: 'Expandable file-tree with folder icons, selection, and nested children.',
    importLine: `import { FileTree, type TreeNode } from 'clay-ui'`,
    usage: `import { FileTree, type TreeNode } from 'clay-ui'

const nodes: TreeNode[] = [
  {
    id: 'src',
    label: 'src',
    children: [
      { id: 'app', label: 'App.tsx' },
      { id: 'main', label: 'main.tsx' },
    ],
  },
]

function Example() {
  return <FileTree />
}`,
    exports: ['FileTree', 'TreeNode'],
    sections: [{ name: 'TreeNode', props: [
      ['id', '`string`', '—', 'Unique node id (required)'],
      ['label', '`string`', '—', 'Display name (required)'],
      ['icon', '`React.ReactNode`', '—', 'Custom icon'],
      ['children', '`TreeNode[]`', '—', 'Nested nodes'],
    ]}],
    notes: '`FileTree` uses built-in sample data in the showcase. Pass your own tree by adapting the component.',
  },
  {
    slug: 'number-input',
    title: 'Number Input',
    desc: 'Stepper input with min/max and a compact quantity control for carts.',
    importLine: `import { NumberInput, QuantityStepper } from 'clay-ui'`,
    usage: `import { useState } from 'react'
import { NumberInput } from 'clay-ui'

function Example() {
  const [n, setN] = useState(1)
  return <NumberInput value={n} onChange={setN} min={0} max={99} label="Quantity" />
}`,
    exports: ['NumberInput', 'QuantityStepper'],
    sections: [
      { name: 'NumberInput props', props: [
        ['value', '`number`', '—', 'Current value (required)'],
        ['onChange', '`(v: number) => void`', '—', 'Change handler (required)'],
        ['min', '`number`', '—', 'Minimum allowed value'],
        ['max', '`number`', '—', 'Maximum allowed value'],
        ['step', '`number`', '`1`', 'Increment for +/- buttons'],
        ['label', '`string`', '—', 'Field label'],
      ]},
      { name: 'QuantityStepper props', props: [
        ['label', '`string`', '—', 'Field label (required)'],
        ['min', '`number`', '`0`', 'Minimum quantity'],
      ]},
    ],
  },
  {
    slug: 'sortable-list',
    title: 'Sortable List',
    desc: 'Drag-to-reorder lists powered by the `useDragSort` hook and pointer events.',
    importLine: `import { useDragSort, type Item } from 'clay-ui'`,
    usage: `import { useDragSort, type Item } from 'clay-ui'

type Task = Item & { title: string }

const initial: Task[] = [
  { id: '1', title: 'Design review' },
  { id: '2', title: 'Ship release' },
]

function TaskList() {
  const { items, onDragStart, onDragOver, onDrop, setItemRef } = useDragSort(initial)
  return (
    <ul>
      {items.map((task, i) => (
        <li
          key={task.id}
          ref={(el) => setItemRef(i, el)}
          onPointerDown={(e) => onDragStart(i, e)}
          onPointerOver={() => onDragOver(i)}
          onPointerUp={onDrop}
        >
          {task.title}
        </li>
      ))}
    </ul>
  )
}`,
    exports: ['useDragSort', 'Item'],
    sections: [{ name: 'Item', props: [
      ['id', '`string`', '—', 'Unique row id (required)'],
    ]}],
    notes: 'Extend `Item` with your own fields. See `SortableListShowcase` for grip handles, icons, and animations.',
  },
  {
    slug: 'rich-text-editor',
    title: 'Rich Text Editor',
    desc: 'Contenteditable editor with a formatting toolbar (bold, lists, links, etc.).',
    importLine: `import { RichTextEditorShowcase } from 'clay-ui'`,
    usage: `import { RichTextEditorShowcase } from 'clay-ui'

function Example() {
  return <RichTextEditorShowcase />
}`,
    exports: ['RichTextEditorShowcase'],
    showcase: true,
    notes: 'The showcase wraps a `contentEditable` region and toolbar. Copy the pattern for custom placeholder text or controlled HTML export.',
  },
  {
    slug: 'phone-input',
    title: 'Phone Input',
    desc: 'Country flag selector with searchable dial codes and national number field.',
    importLine: `import { PhoneField, type Country } from 'clay-ui'`,
    usage: `import { PhoneField } from 'clay-ui'

function Example() {
  return (
    <PhoneField label="Mobile number" placeholder="555 000 0000" />
  )
}`,
    exports: ['PhoneField', 'Country'],
    sections: [{ name: 'PhoneField props', props: [
      ['label', '`string`', '—', 'Field label (required)'],
      ['placeholder', '`string`', '—', 'National number placeholder'],
    ]}],
    notes: '`Country` includes `code`, `name`, `dial`, and `flag` for the built-in country list.',
  },
  {
    slug: 'image-gallery',
    title: 'Image Gallery',
    desc: 'Image layouts in masonry, grid, and list modes with lightbox-style selection.',
    importLine: `import { type GalleryImage, type ViewMode } from 'clay-ui'`,
    usage: `import { type GalleryImage } from 'clay-ui'

const images: GalleryImage[] = [
  { id: '1', src: '/photo.jpg', alt: 'Workspace', caption: 'Morning light' },
]

// See ImageGalleryShowcase for full layout demos`,
    exports: ['GalleryImage', 'ViewMode'],
    sections: [{ name: 'GalleryImage', props: [
      ['id', '`string`', '—', 'Unique id (required)'],
      ['src', '`string`', '—', 'Image URL (required)'],
      ['alt', '`string`', '—', 'Alt text (required)'],
      ['caption', '`string`', '—', 'Optional caption'],
      ['span', '`number`', '—', 'Masonry row span'],
    ]}],
    notes: '`ViewMode` is `\\`masonry\\`, `\\`grid2\\`, `\\`grid3\\`, `\\`grid4\\`, or `\\`list\\``. Use `ImageGalleryShowcase` to preview all layouts.',
  },
  {
    slug: 'breadcrumb',
    title: 'Breadcrumb',
    desc: 'Navigation trail with optional icons and chevron or slash separators.',
    importLine: `import { BreadcrumbTrail, type Crumb } from 'clay-ui'`,
    usage: `import { BreadcrumbTrail, type Crumb } from 'clay-ui'
import { Home, Folder } from 'lucide-react'

const crumbs: Crumb[] = [
  { label: 'Home', href: '/', icon: <Home className="w-3.5 h-3.5" /> },
  { label: 'Projects', href: '/projects', icon: <Folder className="w-3.5 h-3.5" /> },
  { label: 'Clay UI' },
]

function Example() {
  return <BreadcrumbTrail crumbs={crumbs} withIcons separator="chevron" />
}`,
    exports: ['BreadcrumbTrail', 'Crumb'],
    sections: [
      { name: 'Crumb', props: [
        ['label', '`string`', '—', 'Link or current page text (required)'],
        ['href', '`string`', '—', 'Makes the crumb a link; omit on the last item'],
        ['icon', '`React.ReactNode`', '—', 'Leading icon'],
      ]},
      { name: 'BreadcrumbTrail props', props: [
        ['crumbs', '`Crumb[]`', '—', 'Trail items in order (required)'],
        ['separator', '`\'chevron\' | \'slash\'`', `'chevron'`, 'Separator between crumbs'],
        ['withIcons', '`boolean`', '`false`', 'Show icons when provided on crumbs'],
      ]},
    ],
  },
  {
    slug: 'keyboard-shortcuts',
    title: 'Keyboard Shortcuts',
    desc: 'Shortcut reference panel and live key-capture UI. Pass your own shortcut definitions.',
    importLine: `import { type Shortcut } from 'clay-ui'`,
    usage: `import { type Shortcut } from 'clay-ui'

const shortcuts: Shortcut[] = [
  { action: 'Save', keys: [['⌘', 'S']], category: 'General' },
  { action: 'Search', keys: [['⌘', 'K']], category: 'Navigation' },
]`,
    exports: ['Shortcut'],
    sections: [{ name: 'Shortcut', props: [
      ['action', '`string`', '—', 'Human-readable action name (required)'],
      ['keys', '`string[][]`', '—', 'Key chords; each chord is an ordered list of key labels (required)'],
      ['category', '`string`', '—', 'Group heading in the list (required)'],
      ['icon', '`React.ReactNode`', '—', 'Optional row icon'],
    ]}],
    notes: 'See `KeyboardShortcutsShowcase` for the grouped list UI and recording mode.',
  },
  {
    slug: 'combobox',
    title: 'Combobox',
    desc: 'Searchable single- and multi-select comboboxes with grouped options.',
    importLine: `import { MultiCombobox, SingleCombobox, type ComboboxOption } from 'clay-ui'`,
    usage: `import { MultiCombobox, type ComboboxOption } from 'clay-ui'

const options: ComboboxOption[] = [
  { value: 'react', label: 'React' },
  { value: 'vue', label: 'Vue', group: 'Frameworks' },
]

function Example() {
  return <MultiCombobox label="Stack" options={options} placeholder="Search…" />
}`,
    exports: ['MultiCombobox', 'SingleCombobox', 'ComboboxOption'],
    sections: [
      { name: 'ComboboxOption', props: [
        ['value', '`string`', '—', 'Stored value (required)'],
        ['label', '`string`', '—', 'Display label (required)'],
        ['group', '`string`', '—', 'Optional group heading'],
      ]},
      { name: 'MultiCombobox props', props: [
        ['label', '`string`', '—', 'Field label (required)'],
        ['options', '`ComboboxOption[]`', '—', 'Choices (required)'],
        ['placeholder', '`string`', `'Search…'`, 'Filter input placeholder'],
      ]},
      { name: 'SingleCombobox props', props: [
        ['label', '`string`', '—', 'Field label (required)'],
        ['options', '`ComboboxOption[]`', '—', 'Choices (required)'],
      ]},
    ],
  },
  {
    slug: 'time-picker',
    title: 'Time Picker',
    desc: 'Scrollable hour/minute (and optional second) columns with 12h or 24h format.',
    importLine: `import { TimePickerWidget } from 'clay-ui'`,
    usage: `import { TimePickerWidget } from 'clay-ui'

function Example() {
  return <TimePickerWidget label="Start time" use12h showSeconds />
}`,
    exports: ['TimePickerWidget'],
    sections: [{ name: 'Props', props: [
      ['label', '`string`', '—', 'Field label'],
      ['showSeconds', '`boolean`', '`false`', 'Include seconds column'],
      ['use12h', '`boolean`', '`false`', '12-hour format with AM/PM toggle'],
    ]}],
  },
  {
    slug: 'mention-input',
    title: 'Mention Input',
    desc: 'Textarea with `@` mention autocomplete and highlighted mentions in the text.',
    importLine: `import { MentionField, type MentionUser } from 'clay-ui'`,
    usage: `import { MentionField, type MentionUser } from 'clay-ui'

const team: MentionUser[] = [
  { id: '1', name: 'Alex Kim', handle: 'alex', color: '#0ea5e9', initials: 'AK' },
]

function Example() {
  return <MentionField users={team} placeholder="Write a comment… use @ to mention" />
}`,
    exports: ['MentionField', 'MentionUser'],
    sections: [
      { name: 'MentionUser', props: [
        ['id', '`string`', '—', 'Unique user id (required)'],
        ['name', '`string`', '—', 'Display name (required)'],
        ['handle', '`string`', '—', 'Mention handle without @ (required)'],
        ['color', '`string`', '—', 'Avatar accent color (required)'],
        ['initials', '`string`', '—', 'Avatar initials (required)'],
      ]},
      { name: 'MentionField props', props: [
        ['users', '`MentionUser[]`', '—', 'Mentionable users (required)'],
        ['placeholder', '`string`', '—', 'Textarea placeholder'],
      ]},
    ],
    notes: 'Type `@` to open the user list. Arrow keys and Enter select a mention.',
  },
  {
    slug: 'tour',
    title: 'Tour',
    desc: 'Spotlight onboarding tour that dims the page and highlights sequential targets.',
    importLine: `import { TourShowcase } from 'clay-ui'`,
    usage: `import { TourShowcase } from 'clay-ui'

function Example() {
  return <TourShowcase />
}`,
    exports: ['TourShowcase'],
    showcase: true,
    notes: 'The showcase wires step targets, tooltips, and next/back actions. Adapt the step definitions for your own product tour.',
  },
  {
    slug: 'full-calendar',
    title: 'Full Calendar',
    desc: 'Month-view calendar with colored event chips and day selection.',
    importLine: `import { type CalEvent } from 'clay-ui'`,
    usage: `import { FullCalendarShowcase } from 'clay-ui'
import { type CalEvent } from 'clay-ui'

const events: CalEvent[] = [
  { id: '1', title: 'Standup', date: '2024-06-03', color: '#0ea5e9', time: '9:00 AM' },
]

function Example() {
  return <FullCalendarShowcase />
}`,
    exports: ['CalEvent', 'FullCalendarShowcase'],
    sections: [{ name: 'CalEvent', props: [
      ['id', '`string`', '—', 'Unique event id (required)'],
      ['title', '`string`', '—', 'Event title (required)'],
      ['date', '`string`', '—', 'ISO date string `YYYY-MM-DD` (required)'],
      ['color', '`string`', '—', 'Chip accent color'],
      ['time', '`string`', '—', 'Optional time label'],
    ]}],
    showcase: true,
  },
  {
    slug: 'notification-center',
    title: 'Notification Center',
    desc: 'Grouped notification inbox with read/unread state and filter tabs.',
    importLine: `import { type Notification } from 'clay-ui'`,
    usage: `import { NotificationCenterShowcase } from 'clay-ui'
import { type Notification } from 'clay-ui'

const notes: Notification[] = [
  {
    id: '1',
    type: 'comment',
    title: 'New comment',
    body: 'Alex replied to your thread.',
    time: '2m ago',
    group: 'Today',
    read: false,
  },
]

function Example() {
  return <NotificationCenterShowcase />
}`,
    exports: ['Notification', 'NotificationCenterShowcase'],
    sections: [{ name: 'Notification', props: [
      ['id', '`string`', '—', 'Unique id (required)'],
      ['type', '`string`', '—', 'Icon/category key (required)'],
      ['title', '`string`', '—', 'Heading (required)'],
      ['body', '`string`', '—', 'Message body (required)'],
      ['time', '`string`', '—', 'Relative time label (required)'],
      ['group', '`string`', '—', 'Section heading, e.g. `Today` (required)'],
      ['read', '`boolean`', '—', 'Read state (required)'],
      ['avatar', '`string`', '—', 'Optional avatar gradient classes'],
    ]}],
    showcase: true,
  },
  {
    slug: 'sparkline',
    title: 'Sparkline',
    desc: 'Inline SVG spark charts and KPI cards with embedded mini charts.',
    importLine: `import { Sparkline, MetricCard } from 'clay-ui'`,
    usage: `import { Sparkline, MetricCard } from 'clay-ui'

function Example() {
  return (
    <>
      <Sparkline data={[1, 4, 3, 8, 6, 9]} color="#0ea5e9" type="line" />
      <MetricCard
        label="Active users"
        value="2,481"
        data={[12, 18, 15, 22, 28, 24, 31]}
        color="#8b5cf6"
        trend="up"
        trendValue="+12%"
      />
    </>
  )
}`,
    exports: ['Sparkline', 'MetricCard'],
    sections: [
      { name: 'Sparkline props', props: [
        ['data', '`number[]`', '—', 'Series values (required)'],
        ['width', '`number`', '`80`', 'SVG width'],
        ['height', '`number`', '`32`', 'SVG height'],
        ['color', '`string`', `'#0ea5e9'`, 'Line/bar color'],
        ['fill', '`boolean`', '`true`', 'Area fill under line charts'],
        ['type', '`\'line\' | \'bar\'`', `'line'`, 'Chart style'],
      ]},
      { name: 'MetricCard props', props: [
        ['label', '`string`', '—', 'Metric name (required)'],
        ['value', '`string`', '—', 'Display value (required)'],
        ['data', '`number[]`', '—', 'Sparkline series (required)'],
        ['color', '`string`', '—', 'Accent color (required)'],
        ['subvalue', '`string`', '—', 'Secondary line below value'],
        ['trend', '`\'up\' | \'down\'`', '—', 'Trend direction badge'],
        ['trendValue', '`string`', '—', 'Trend label, e.g. `+8%`'],
        ['type', '`\'line\' | \'bar\'`', `'line'`, 'Embedded sparkline type'],
      ]},
    ],
  },
  {
    slug: 'data-grid',
    title: 'Data Grid',
    desc: 'Advanced data table with sorting, filtering, column resize, and row selection.',
    importLine: `import { DataGridShowcase } from 'clay-ui'`,
    usage: `import { DataGridShowcase } from 'clay-ui'

function Example() {
  return <DataGridShowcase />
}`,
    exports: ['DataGridShowcase'],
    showcase: true,
    notes: 'Study the showcase for column definitions, bulk actions, and filter chips. Extract the table markup for your own dataset.',
  },
  {
    slug: 'stat-cards',
    title: 'Stat Cards',
    desc: 'KPI stat cards with trend badges and compact sparkline metric cards.',
    importLine: `import { StatCard, MiniSparkCard } from 'clay-ui'`,
    usage: `import { StatCard, MiniSparkCard } from 'clay-ui'
import { Zap } from 'lucide-react'

function Example() {
  return (
    <>
      <StatCard
        label="Revenue"
        value="$12.4k"
        change={8}
        icon={<Zap className="w-5 h-5" />}
        color="#0ea5e9"
        bgColor="#f0f9ff"
      />
      <MiniSparkCard label="Sessions" value="8,204" data={[3, 5, 4, 7, 8, 6, 9]} color="#8b5cf6" />
    </>
  )
}`,
    exports: ['StatCard', 'MiniSparkCard'],
    sections: [
      { name: 'StatCard props', props: [
        ['label', '`string`', '—', 'Metric name (required)'],
        ['value', '`string`', '—', 'Display value (required)'],
        ['change', '`number`', '—', 'Percent change; positive shows green, negative red'],
        ['icon', '`React.ReactNode`', '—', 'Leading icon'],
        ['color', '`string`', '—', 'Accent color for trend text'],
        ['bgColor', '`string`', '—', 'Icon container background'],
        ['prefix', '`string`', '—', 'Prepended to value, e.g. currency symbol'],
      ]},
      { name: 'MiniSparkCard props', props: [
        ['label', '`string`', '—', 'Metric name (required)'],
        ['value', '`string`', '—', 'Display value (required)'],
        ['data', '`number[]`', '—', 'Sparkline data (required)'],
        ['color', '`string`', '—', 'Chart accent (required)'],
      ]},
    ],
  },
  {
    slug: 'charts',
    title: 'Charts',
    desc: 'Recharts-based dashboard charts: area, bar, pie, and radial — styled with Clay tokens.',
    importLine: `import { ChartsShowcase } from 'clay-ui'`,
    usage: `import { ChartsShowcase } from 'clay-ui'

function Example() {
  return <ChartsShowcase />
}`,
    exports: ['ChartsShowcase'],
    showcase: true,
    notes: 'Built on [Recharts](https://recharts.org/). The showcase is the best reference for `ResponsiveContainer`, custom tooltips, and clay card wrappers. Copy a chart and swap in your `data` array.',
  },
  {
    slug: 'table',
    title: 'Table',
    desc: 'Sortable data table with search, status badges, and pagination.',
    importLine: `import { TableShowcase } from 'clay-ui'`,
    usage: `import { TableShowcase } from 'clay-ui'

function Example() {
  return <TableShowcase />
}`,
    exports: ['TableShowcase'],
    showcase: true,
    notes: 'Includes client-side sort and filter demos. Use as a layout reference for admin tables.',
  },
  {
    slug: 'kanban',
    title: 'Kanban',
    desc: 'Kanban board types for columns, cards, priorities, and tags. See showcase for drag-and-drop UI.',
    importLine: `import { type Card, type Column, type Priority } from 'clay-ui'`,
    usage: `import { type Card, type Column } from 'clay-ui'

const columns: Column[] = [
  {
    id: 'todo',
    title: 'To do',
    cards: [
      {
        id: 'c1',
        title: 'Update docs',
        priority: 'medium',
        tags: [{ label: 'Docs', color: '#0ea5e9' }],
      },
    ],
  },
]`,
    exports: ['Card', 'Column', 'Priority'],
    sections: [
      { name: 'Card', props: [
        ['id', '`string`', '—', 'Unique card id (required)'],
        ['title', '`string`', '—', 'Card title (required)'],
        ['description', '`string`', '—', 'Body text'],
        ['priority', '`Priority`', '—', '`low` | `medium` | `high` | `critical` (required)'],
        ['tags', '`{ label: string; color: string }[]`', '—', 'Colored tag chips (required)'],
        ['assignee', '`{ name: string; color: string; initials: string }`', '—', 'Optional owner'],
      ]},
      { name: 'Column', props: [
        ['id', '`string`', '—', 'Column id (required)'],
        ['title', '`string`', '—', 'Column heading (required)'],
        ['cards', '`Card[]`', '—', 'Cards in this column (required)'],
      ]},
    ],
    notes: 'Open `KanbanShowcase` for the full board with drag between columns.',
  },
  {
    slug: 'timeline',
    title: 'Timeline',
    desc: 'Vertical and compact event timelines for activity logs and milestones.',
    importLine: `import { VerticalTimeline, CompactTimeline, type TimelineEvent } from 'clay-ui'`,
    usage: `import { VerticalTimeline, type TimelineEvent } from 'clay-ui'

const events: TimelineEvent[] = [
  {
    id: '1',
    title: 'Deployed v2.0',
    time: '2 hours ago',
    description: 'Production rollout completed.',
    color: '#10b981',
  },
]

function Example() {
  return <VerticalTimeline events={events} />
}`,
    exports: ['VerticalTimeline', 'CompactTimeline', 'TimelineEvent'],
    sections: [{ name: 'TimelineEvent', props: [
      ['id', '`string`', '—', 'Unique id (required)'],
      ['title', '`string`', '—', 'Event title (required)'],
      ['time', '`string`', '—', 'Timestamp label (required)'],
      ['description', '`string`', '—', 'Optional body text'],
      ['icon', '`React.ReactNode`', '—', 'Custom node icon'],
      ['color', '`string`', '—', 'Accent color for the dot and line'],
    ]}],
    examples: `<CompactTimeline events={events} />`,
  },
  {
    slug: 'empty-states',
    title: 'Empty States',
    desc: 'Illustrated placeholders with primary and secondary actions for empty views.',
    importLine: `import { EmptyState, IllustratedEmpty } from 'clay-ui'`,
    usage: `import { EmptyState } from 'clay-ui'
import { Inbox } from 'lucide-react'
import { Button } from 'clay-ui'

function Example() {
  return (
    <EmptyState
      icon={<Inbox className="w-10 h-10 text-slate-400" />}
      title="No messages yet"
      description="When someone writes you, it will show up here."
      action={<Button variant="primary">Compose</Button>}
      variant="default"
    />
  )
}`,
    exports: ['EmptyState', 'IllustratedEmpty'],
    sections: [
      { name: 'EmptyState props', props: [
        ['icon', '`React.ReactNode`', '—', 'Hero icon'],
        ['title', '`string`', '—', 'Heading (required)'],
        ['description', '`string`', '—', 'Body copy'],
        ['action', '`React.ReactNode`', '—', 'Primary CTA'],
        ['secondary', '`React.ReactNode`', '—', 'Secondary action'],
        ['variant', '`\'default\' | \'compact\'`', `'default'`, 'Layout density'],
      ]},
      { name: 'IllustratedEmpty props', props: [
        ['type', '`\'search\' | \'files\' | \'chart\'`', '—', 'Built-in illustration preset (required)'],
      ]},
    ],
  },
  {
    slug: 'heatmap',
    title: 'Heatmap',
    desc: 'GitHub-style contribution grid, hourly activity grid, and monthly calendar heatmap.',
    importLine: `import { ContributionHeatmap, ActivityHeatmap, MonthlyHeatmap } from 'clay-ui'`,
    usage: `import { ContributionHeatmap } from 'clay-ui'

function Example() {
  return <ContributionHeatmap />
}`,
    exports: ['ContributionHeatmap', 'ActivityHeatmap', 'MonthlyHeatmap'],
    notes: 'Each variant uses generated demo data and hover tooltips. Fork a variant to accept a `data` matrix prop.',
  },
  {
    slug: 'navbar',
    title: 'Navbar',
    desc: 'Responsive marketing navbar patterns: default, centered, and transparent over hero sections.',
    importLine: `import { NavbarShowcase } from 'clay-ui'`,
    usage: `import { NavbarShowcase } from 'clay-ui'

function Example() {
  return <NavbarShowcase />
}`,
    exports: ['NavbarShowcase'],
    showcase: true,
    notes: 'Includes mobile menu toggle and CTA buttons. Copy the layout markup for your own links array.',
  },
  {
    slug: 'cards',
    title: 'Cards',
    desc: 'Product, profile, pricing, and testimonial card layouts with Clay shadows and hover lift.',
    importLine: `import { ProductCard, ProfileCard, PricingCard, TestimonialCard } from 'clay-ui'`,
    usage: `import { ProductCard, PricingCard } from 'clay-ui'

function Example() {
  return (
    <div className="grid gap-6 md:grid-cols-2">
      <ProductCard
        name="Aurora Headphones"
        category="Audio"
        price={129}
        rating={4.5}
        reviews={84}
        badge="New"
        color="#0ea5e9"
      />
      <PricingCard
        plan="Pro"
        price={29}
        period="mo"
        description="For growing teams"
        features={['Unlimited projects', 'Priority support']}
        cta="Start trial"
        highlight
        color="#8b5cf6"
      />
    </div>
  )
}`,
    exports: ['ProductCard', 'ProfileCard', 'PricingCard', 'TestimonialCard'],
    sections: [
      { name: 'ProductCard props', props: [
        ['name', '`string`', '—', 'Product name (required)'],
        ['category', '`string`', '—', 'Category label (required)'],
        ['price', '`number`', '—', 'Price in dollars (required)'],
        ['rating', '`number`', '—', 'Star rating 0–5 (required)'],
        ['reviews', '`number`', '—', 'Review count (required)'],
        ['badge', '`string`', '—', 'Optional corner badge, e.g. `New`'],
        ['color', '`string`', '—', 'Hero area background hex (required)'],
      ]},
      { name: 'ProfileCard props', props: [
        ['name', '`string`', '—', 'Display name (required)'],
        ['role', '`string`', '—', 'Job title (required)'],
        ['location', '`string`', '—', 'Location label (required)'],
        ['followers', '`number`', '—', 'Follower count (required)'],
        ['following', '`number`', '—', 'Following count (required)'],
        ['posts', '`number`', '—', 'Post count (required)'],
        ['avatar', '`string`', '—', 'Avatar background CSS color (required)'],
      ]},
      { name: 'PricingCard props', props: [
        ['plan', '`string`', '—', 'Plan name (required)'],
        ['price', '`number`', '—', 'Price amount (required)'],
        ['period', '`string`', '—', 'Billing period, e.g. `mo` (required)'],
        ['description', '`string`', '—', 'Short subtitle (required)'],
        ['features', '`string[]`', '—', 'Feature bullet list (required)'],
        ['cta', '`string`', '—', 'Button label (required)'],
        ['highlight', '`boolean`', '—', 'Featured plan styling'],
        ['color', '`string`', '—', 'Accent hex (required)'],
      ]},
      { name: 'TestimonialCard props', props: [
        ['quote', '`string`', '—', 'Quote text (required)'],
        ['author', '`string`', '—', 'Author name (required)'],
        ['role', '`string`', '—', 'Author role (required)'],
        ['rating', '`number`', '—', 'Star count 0–5 (required)'],
        ['color', '`string`', '—', 'Avatar accent hex (required)'],
      ]},
    ],
  },
]

for (const page of pages) {
  const file = join(root, `${page.slug}.md`)
  if (!force) continue
  writeFileSync(file, renderPage(page))
  console.log('wrote', page.slug)
}

if (!force) {
  console.log('Pass --force to regenerate docs from scripts/generate-docs.mjs')
}
