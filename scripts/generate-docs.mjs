import { writeFileSync, existsSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'

const root = join(dirname(fileURLToPath(import.meta.url)), '..', 'docs')

const pages = [
  ['toggles', 'Toggle', 'Animated on/off switch with label, description, and icon.', 'Toggle', `import { Toggle } from 'clay-ui'`, `<Toggle checked={on} onChange={setOn} label="Dark mode" icon={<Moon />} />`, [
    ['checked', 'boolean', '—', 'Current state (required)'],
    ['onChange', '(v: boolean) => void', '—', 'Change handler (required)'],
    ['color', 'string', `'bg-sky-500'`, 'Track color when on'],
    ['label', 'string', '—', 'Primary label'],
    ['description', 'string', '—', 'Secondary text'],
    ['icon', 'React.ReactNode', '—', 'Leading icon'],
    ['disabled', 'boolean', '—', 'Disables interaction'],
  ]],
  ['sliders', 'Slider', 'Pointer-driven range slider with optional icon and value display.', 'Slider, RangeSlider', `import { Slider } from 'clay-ui'`, `<Slider value={vol} onChange={setVol} min={0} max={100} label="Volume" icon={<Volume2 />} />`, [
    ['value', 'number', '—', 'Current value (required)'],
    ['onChange', '(v: number) => void', '—', 'Change handler (required)'],
    ['min', 'number', '0', 'Minimum'],
    ['max', 'number', '100', 'Maximum'],
    ['step', 'number', '1', 'Step increment'],
    ['color', 'string', `'#0ea5e9'`, 'Fill color'],
    ['label', 'string', '—', 'Field label'],
    ['icon', 'React.ReactNode', '—', 'Leading icon'],
    ['showValue', 'boolean', 'true', 'Show numeric value'],
    ['formatValue', '(v: number) => string', '—', 'Custom value formatter'],
  ]],
  ['skeleton', 'Skeleton', 'Shimmer loading placeholders and pre-built layout skeletons.', 'Bone', `import { Bone } from 'clay-ui'`, `<Bone className="h-4 w-32" />`, [
    ['className', 'string', `''`, 'Tailwind classes for size/shape'],
    ['style', 'React.CSSProperties', '—', 'Inline dimensions'],
  ]],
  ['date-picker', 'Date Picker', 'Single date, range, and inline calendar pickers.', 'SinglePicker, RangePicker, InlineCalendar', `import { SinglePicker } from 'clay-ui'`, `<SinglePicker label="Start date" />`, [
    ['label', 'string', '—', 'Field label (`SinglePicker`, `RangePicker`)'],
  ]],
  ['alert', 'Alert', 'Inline alerts, banners, and dismissible notifications.', 'Alert, InlineBanner, TopBanner', `import { Alert } from 'clay-ui'`, `<Alert type="success" title="Saved" description="Changes applied." dismissible />`, [
    ['type', `'success' | 'error' | 'warning' | 'info'`, '—', 'Visual variant (required)'],
    ['title', 'string', '—', 'Heading (required)'],
    ['description', 'string', '—', 'Body text'],
    ['dismissible', 'boolean', '—', 'Shows close button'],
    ['action', 'React.ReactNode', '—', 'Optional action slot'],
  ]],
  ['progress', 'Progress', 'Linear, circular, indeterminate, and step progress indicators.', 'LinearProgress, CircularProgress, IndeterminateBar, StepProgress', `import { LinearProgress } from 'clay-ui'`, `<LinearProgress value={65} label="Upload" striped animated />`, [
    ['value', 'number', '—', 'Progress 0–max'],
    ['max', 'number', '100', 'Maximum value'],
    ['color', 'string', `'#0ea5e9'`, 'Bar color'],
    ['size', `'sm' | 'md' | 'lg'`, `'md'`, 'Bar height'],
    ['label', 'string', '—', 'Caption'],
    ['showValue', 'boolean', 'true', 'Show percentage'],
    ['striped', 'boolean', '—', 'Striped fill'],
    ['animated', 'boolean', '—', 'Animated stripes'],
  ]],
  ['checkbox-radio', 'Checkbox & Radio', 'Accessible checkbox, radio, and card-style radio controls.', 'Checkbox, Radio, CardRadio', `import { Checkbox, Radio } from 'clay-ui'`, `<Checkbox checked={v} onChange={setV} label="Accept terms" />`, [
    ['checked / selected', 'boolean', '—', 'Selection state'],
    ['onChange', 'function', '—', 'Change handler'],
    ['label', 'string', '—', 'Primary label'],
    ['description', 'string', '—', 'Helper text'],
    ['disabled', 'boolean', '—', 'Disables control'],
    ['color', 'string', `'#0ea5e9'`, 'Accent color'],
  ]],
  ['otp-input', 'OTP Input', 'Segmented one-time password input with paste support.', 'OTPField', `import { OTPField } from 'clay-ui'`, `<OTPField length={6} onComplete={(code) => verify(code)} />`, [
    ['length', 'number', '6', 'Number of digits'],
    ['onComplete', '(val: string) => void', '—', 'Called when all cells filled'],
  ]],
  ['tag-input', 'Tag Input', 'Chip input with suggestions and keyboard removal.', 'TagInput', `import { TagInput } from 'clay-ui'`, `<TagInput label="Tags" suggestions={['Design', 'Engineering']} />`, [
    ['label', 'string', '—', 'Field label'],
    ['placeholder', 'string', `'Add tag…'`, 'Input placeholder'],
    ['suggestions', 'string[]', '—', 'Autocomplete suggestions'],
  ]],
  ['popover', 'Popover', 'Click-triggered floating panel anchored to a trigger.', 'Popover', `import { Popover } from 'clay-ui'`, `<Popover trigger={<button>Open</button>} align="left">Content</Popover>`, [
    ['trigger', 'React.ReactNode', '—', 'Click target (required)'],
    ['children', 'React.ReactNode', '—', 'Panel content (required)'],
    ['align', `'left' | 'right' | 'center'`, `'left'`, 'Horizontal alignment'],
  ]],
  ['context-menu', 'Context Menu', 'Right-click context menu item types for file lists.', 'ContextMenuItem', `import { type ContextMenuItem } from 'clay-ui'`, `const items: ContextMenuItem[] = [{ icon, label, shortcut: '⌘C' }]`, [
    ['icon', 'React.ReactNode', '—', 'Row icon (required)'],
    ['label', 'string', '—', 'Action label (required)'],
    ['shortcut', 'string', '—', 'Keyboard hint'],
    ['danger', 'boolean', '—', 'Destructive styling'],
    ['dividerAfter', 'boolean', '—', 'Divider below item'],
  ]],
  ['color-picker', 'Color Picker', 'HSV panel, inline swatch, and popover color pickers.', 'ColorPickerPanel, InlineColorPicker, PopoverColorPicker', `import { ColorPickerPanel } from 'clay-ui'`, `<ColorPickerPanel hex={color} onChange={setColor} />`, [
    ['hex', 'string', '—', 'Current hex color (required)'],
    ['onChange', '(hex: string) => void', '—', 'Change handler (required)'],
  ]],
  ['rating', 'Rating', 'Interactive star rating and half-star display.', 'StarRating, HalfStarDisplay', `import { StarRating } from 'clay-ui'`, `<StarRating value={4} onChange={setRating} label="Quality" />`, [
    ['value', 'number', '—', 'Current rating'],
    ['onChange', '(v: number) => void', '—', 'Change handler'],
    ['max', 'number', '5', 'Star count'],
    ['size', `'sm' | 'md' | 'lg'`, `'md'`, 'Star size'],
    ['label', 'string', '—', 'Field label'],
    ['readonly', 'boolean', 'false', 'Display-only mode'],
  ]],
  ['pagination', 'Pagination', 'Page controls with size and style variants.', 'Pager', `import { Pager } from 'clay-ui'`, `<Pager page={page} totalPages={12} go={setPage} />`, [
    ['page', 'number', '—', 'Current page (required)'],
    ['totalPages', 'number', '—', 'Total pages (required)'],
    ['go', '(page: number) => void', '—', 'Page change handler (required)'],
    ['size', `'sm' | 'md' | 'lg'`, `'md'`, 'Control size'],
    ['variant', `'default' | 'rounded' | 'minimal'`, `'default'`, 'Visual style'],
  ]],
  ['chat', 'Chat', 'Messaging window and contact list layouts.', 'ChatWindow, ContactList, Message', `import { ChatWindow } from 'clay-ui'`, `<ChatWindow />`, [
    ['Message', 'interface', '—', 'Exported message shape: id, text, sender, time, avatar'],
  ]],
  ['code-block', 'Code Block', 'Syntax-highlighted code blocks with copy and collapse.', 'CodeBlock, InlineCode', `import { CodeBlock } from 'clay-ui'`, `<CodeBlock lang="tsx" code={source} label="App.tsx" collapsible />`, [
    ['lang', 'string', '—', 'Language id (required)'],
    ['code', 'string', '—', 'Source code (required)'],
    ['label', 'string', '—', 'Filename label'],
    ['collapsible', 'boolean', 'false', 'Collapsible panel'],
  ]],
  ['carousel', 'Carousel', 'Slide, card, and thumbnail carousels.', 'SlideCarousel, CardCarousel, ThumbnailCarousel', `import { SlideCarousel } from 'clay-ui'`, `<SlideCarousel />`, []],
  ['tree-view', 'Tree View', 'Expandable file tree with selection.', 'FileTree, TreeNode', `import { FileTree, type TreeNode } from 'clay-ui'`, `<FileTree />`, [
    ['TreeNode', 'interface', '—', 'id, label, icon?, children?'],
  ]],
  ['number-input', 'Number Input', 'Stepper input and quantity controls.', 'NumberInput, QuantityStepper', `import { NumberInput } from 'clay-ui'`, `<NumberInput value={n} onChange={setN} min={0} max={99} />`, [
    ['value', 'number', '—', 'Current value (required)'],
    ['onChange', '(v: number) => void', '—', 'Change handler (required)'],
    ['min', 'number', '—', 'Minimum'],
    ['max', 'number', '—', 'Maximum'],
    ['step', 'number', '1', 'Increment'],
    ['label', 'string', '—', 'Field label'],
  ]],
  ['sortable-list', 'Sortable List', 'Drag-to-reorder lists with `useDragSort` hook.', 'useDragSort, Item', `import { useDragSort, type Item } from 'clay-ui'`, `const { items, onDragStart, onDragOver, onDrop } = useDragSort(initial)`, [
    ['Item', 'interface', '—', 'Requires id: string'],
  ]],
  ['rich-text-editor', 'Rich Text Editor', 'Contenteditable editor with formatting toolbar (showcase).', 'RichTextEditorShowcase', `import { RichTextEditorShowcase } from 'clay-ui'`, `<RichTextEditorShowcase />`, []],
  ['phone-input', 'Phone Input', 'Country selector with national number field.', 'PhoneField, Country', `import { PhoneField, type Country } from 'clay-ui'`, `<PhoneField label="Mobile" placeholder="+1 (555) 000-0000" />`, [
    ['label', 'string', '—', 'Field label (required)'],
    ['placeholder', 'string', '—', 'Number placeholder'],
  ]],
  ['image-gallery', 'Image Gallery', 'Masonry, grid, and list image layouts.', 'GalleryImage, ViewMode', `import { type GalleryImage } from 'clay-ui'`, `const images: GalleryImage[] = [{ id, src, alt, caption }]`, [
    ['GalleryImage', 'interface', '—', 'id, src, alt, caption?, span?'],
    ['ViewMode', 'type', '—', `'masonry' | 'grid2' | 'grid3' | 'grid4' | 'list'`],
  ]],
  ['breadcrumb', 'Breadcrumb', 'Navigation trail with icons and separators.', 'BreadcrumbTrail, Crumb', `import { BreadcrumbTrail, type Crumb } from 'clay-ui'`, `<BreadcrumbTrail crumbs={crumbs} withIcons />`, [
    ['crumbs', 'Crumb[]', '—', 'Trail items: label, href?, icon? (required)'],
    ['separator', `'chevron' | 'slash'`, `'chevron'`, 'Separator style'],
    ['withIcons', 'boolean', 'false', 'Show crumb icons'],
  ]],
  ['keyboard-shortcuts', 'Keyboard Shortcuts', 'Shortcut reference list and live key capture UI.', 'Shortcut', `import { type Shortcut } from 'clay-ui'`, `const shortcuts: Shortcut[] = [{ action, keys, category }]`, [
    ['action', 'string', '—', 'Action name (required)'],
    ['keys', 'string[][]', '—', 'Key chords (required)'],
    ['category', 'string', '—', 'Group name (required)'],
    ['icon', 'React.ReactNode', '—', 'Optional icon'],
  ]],
  ['combobox', 'Combobox', 'Single and multi-select searchable comboboxes.', 'MultiCombobox, SingleCombobox, ComboboxOption', `import { MultiCombobox, type ComboboxOption } from 'clay-ui'`, `<MultiCombobox label="Stack" options={opts} />`, [
    ['label', 'string', '—', 'Field label (required)'],
    ['placeholder', 'string', `'Search…'`, 'Input placeholder (multi)'],
    ['options', 'ComboboxOption[]', '—', 'Choices: value, label, group? (required)'],
  ]],
  ['time-picker', 'Time Picker', 'Scrollable time selector with 12h/24h and seconds.', 'TimePickerWidget', `import { TimePickerWidget } from 'clay-ui'`, `<TimePickerWidget label="Start time" use12h />`, [
    ['label', 'string', '—', 'Field label'],
    ['showSeconds', 'boolean', 'false', 'Include seconds column'],
    ['use12h', 'boolean', 'false', '12-hour format with AM/PM'],
  ]],
  ['mention-input', 'Mention Input', 'Textarea with @mention autocomplete dropdown.', 'MentionField, MentionUser', `import { MentionField, type MentionUser } from 'clay-ui'`, `<MentionField users={team} placeholder="Comment…" />`, [
    ['users', 'MentionUser[]', '—', 'Mentionable users (required)'],
    ['placeholder', 'string', '—', 'Textarea placeholder'],
  ]],
  ['media-player', 'Media Player', 'Audio player UI with playlist (showcase).', 'MediaPlayerShowcase', `import { MediaPlayerShowcase } from 'clay-ui'`, `<MediaPlayerShowcase />`, []],
  ['tour', 'Tour', 'Spotlight onboarding tour with step tooltips (showcase).', 'TourShowcase', `import { TourShowcase } from 'clay-ui'`, `<TourShowcase />`, []],
  ['full-calendar', 'Full Calendar', 'Month calendar with events.', 'CalEvent', `import { type CalEvent } from 'clay-ui'`, `const events: CalEvent[] = [{ id, title, date, color }]`, [
    ['CalEvent', 'interface', '—', 'id, title, date, color?, time?'],
  ]],
  ['notification-center', 'Notification Center', 'Grouped notification inbox panel.', 'Notification', `import { type Notification } from 'clay-ui'`, `const notes: Notification[] = [{ id, type, title, body, time, group, read }]`, [
    ['Notification', 'interface', '—', 'id, type, title, body, time, group, read, avatar?'],
  ]],
  ['sparkline', 'Sparkline', 'Inline spark charts and metric cards.', 'Sparkline, MetricCard', `import { Sparkline, MetricCard } from 'clay-ui'`, `<Sparkline data={[1,4,3,8]} color="#0ea5e9" />`, [
    ['data', 'number[]', '—', 'Series values (required)'],
    ['width', 'number', '80', 'SVG width'],
    ['height', 'number', '32', 'SVG height'],
    ['color', 'string', `'#0ea5e9'`, 'Line color'],
    ['fill', 'boolean', 'true', 'Area fill under line'],
    ['type', `'line' | 'bar'`, `'line'`, 'Chart type'],
  ]],
  ['leaderboard', 'Leaderboard', 'Ranked list with scores and trends.', 'Player', `import { type Player } from 'clay-ui'`, `const players: Player[] = [{ rank, name, score, change }]`, [
    ['Player', 'interface', '—', 'rank, name, score, avatar?, change?'],
  ]],
  ['activity-feed', 'Activity Feed', 'Timeline-style activity stream.', 'FeedEvent, EventType', `import { type FeedEvent } from 'clay-ui'`, `const events: FeedEvent[] = [{ id, type, user, action, time }]`, [
    ['FeedEvent', 'interface', '—', 'id, type, user, action, time, meta?'],
    ['EventType', 'type', '—', 'commit | pr | comment | deploy | …'],
  ]],
  ['data-grid', 'Data Grid', 'Sortable, filterable data table with selection (showcase).', 'DataGridShowcase', `import { DataGridShowcase } from 'clay-ui'`, `<DataGridShowcase />`, []],
  ['stat-cards', 'Stat Cards', 'KPI stat cards with trend and sparkline mini charts.', 'StatCard, MiniSparkCard', `import { StatCard } from 'clay-ui'`, `<StatCard label="Revenue" value="$12.4k" change={+8} icon={<Zap />} color="#0ea5e9" bgColor="#f0f9ff" />`, [
    ['label', 'string', '—', 'Metric name (required)'],
    ['value', 'string', '—', 'Display value (required)'],
    ['change', 'number', '—', 'Percent change'],
    ['icon', 'React.ReactNode', '—', 'Leading icon'],
    ['color', 'string', '—', 'Accent color'],
    ['bgColor', 'string', '—', 'Icon background'],
    ['prefix', 'string', '—', 'Value prefix'],
  ]],
  ['charts', 'Charts', 'Recharts-based area, bar, pie, and radial charts (showcase).', 'ChartsShowcase', `import { ChartsShowcase } from 'clay-ui'`, `<ChartsShowcase />`, []],
  ['table', 'Table', 'Sortable data table with search and pagination (showcase).', 'TableShowcase', `import { TableShowcase } from 'clay-ui'`, `<TableShowcase />`, []],
  ['kanban', 'Kanban', 'Drag-and-drop kanban board types.', 'Card, Column, Priority', `import { type Card, type Column } from 'clay-ui'`, `const columns: Column[] = [{ id, title, cards }]`, [
    ['Card', 'interface', '—', 'id, title, description?, priority, tags, assignee?'],
    ['Column', 'interface', '—', 'id, title, cards'],
    ['Priority', 'type', '—', 'low | medium | high | critical'],
  ]],
  ['timeline', 'Timeline', 'Vertical and compact event timelines.', 'VerticalTimeline, CompactTimeline, TimelineEvent', `import { VerticalTimeline, type TimelineEvent } from 'clay-ui'`, `<VerticalTimeline events={events} />`, [
    ['TimelineEvent', 'interface', '—', 'id, title, time, description?, icon?, color?'],
  ]],
  ['empty-states', 'Empty States', 'Illustrated empty placeholders with actions.', 'EmptyState, IllustratedEmpty', `import { EmptyState } from 'clay-ui'`, `<EmptyState icon={<Inbox />} title="No messages" description="Inbox is empty." action={<Button>Compose</Button>} />`, [
    ['icon', 'React.ReactNode', '—', 'Hero icon'],
    ['title', 'string', '—', 'Heading (required)'],
    ['description', 'string', '—', 'Body copy'],
    ['action', 'React.ReactNode', '—', 'Primary CTA'],
    ['secondary', 'React.ReactNode', '—', 'Secondary action'],
    ['variant', `'default' | 'compact'`, `'default'`, 'Layout density'],
  ]],
  ['heatmap', 'Heatmap', 'Contribution, activity, and monthly heatmaps.', 'ContributionHeatmap, ActivityHeatmap, MonthlyHeatmap', `import { ContributionHeatmap } from 'clay-ui'`, `<ContributionHeatmap />`, []],
  ['navbar', 'Navbar', 'Responsive marketing navbar patterns (showcase).', 'NavbarShowcase', `import { NavbarShowcase } from 'clay-ui'`, `<NavbarShowcase />`, []],
  ['mega-menu', 'Mega Menu', 'Full-width dropdown mega navigation.', 'MegaDropdown, MegaMenuItem, MegaMenuGroup', `import { MegaDropdown, type MegaMenuGroup } from 'clay-ui'`, `<MegaDropdown label="Product" menu={groups} />`, [
    ['label', 'string', '—', 'Trigger label (required)'],
    ['menu', 'MegaMenuGroup[]', '—', 'Grouped menu content (required)'],
    ['MegaMenuItem', 'interface', '—', 'label, desc, icon, color, badge?'],
  ]],
  ['bottom-tab-bar', 'Bottom Tab Bar', 'Mobile bottom navigation tabs.', 'TabBar, BottomTab', `import { TabBar, type BottomTab } from 'clay-ui'`, `<TabBar tabs={tabs} active={id} onTab={setId} />`, [
    ['tabs', 'BottomTab[]', '—', 'Tab definitions (required)'],
    ['active', 'string', '—', 'Active tab id (required)'],
    ['onTab', '(id: string) => void', '—', 'Selection handler (required)'],
    ['variant', `'default' | 'floating'`, `'default'`, 'Bar style'],
  ]],
  ['collapsible-sidebar', 'Collapsible Sidebar', 'Expandable app sidebar navigation.', 'NavItem', `import { type NavItem } from 'clay-ui'`, `const nav: NavItem[] = [{ id, label, icon, badge?, children? }]`, [
    ['NavItem', 'interface', '—', 'id, label, icon, badge?, children?'],
  ]],
  ['cards', 'Cards', 'Product, profile, pricing, and testimonial cards.', 'ProductCard, ProfileCard, PricingCard, TestimonialCard', `import { ProductCard } from 'clay-ui'`, `<ProductCard name="Aurora" category="Audio" price={129} rating={4.5} reviews={84} color="#0ea5e9" />`, [
    ['name / plan / quote', 'string', '—', 'Primary text (varies by card)'],
    ['price / features', 'number | string[]', '—', 'Pricing card fields'],
    ['highlight', 'boolean', '—', 'Featured plan styling'],
  ]],
  ['auth-card', 'Auth Card', 'Sign-in and sign-up card layouts.', 'SignInCard, SignUpCard', `import { SignInCard, SignUpCard } from 'clay-ui'`, `<SignInCard />`, []],
]

function table(rows) {
  if (!rows.length) return '_See the live showcase for usage patterns._\n'
  const head = '| Prop | Type | Default | Description |\n|------|------|---------|-------------|\n'
  return head + rows.map((r) => `| \`${r[0]}\` | ${r[1]} | ${r[2]} | ${r[3]} |`).join('\n') + '\n'
}

for (const [slug, title, desc, exports, imp, example, props] of pages) {
  const file = join(root, `${slug}.md`)
  if (existsSync(file) && !process.argv.includes('--force')) continue
  const body = `# ${title}

${desc}

## Import

\`\`\`tsx
${imp}
\`\`\`

## Basic usage

\`\`\`tsx
${example}
\`\`\`

## Exports

${exports.split(', ').map((e) => `- \`${e.trim()}\``).join('\n')}

## Props

${table(props)}
`
  writeFileSync(file, body)
  console.log('wrote', slug)
}
