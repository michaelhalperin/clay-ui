# Code Block

Syntax-highlighted code blocks with copy button and optional collapse, plus inline code spans.

## Import

```tsx
import { CodeBlock, InlineCode } from 'clay-ui'
```

## Basic usage

```tsx
import { CodeBlock } from 'clay-ui'

const source = `export function greet(name: string) {
  return \`Hello, \${name}!\`
}`

function Example() {
  return <CodeBlock lang="tsx" code={source} label="greet.ts" collapsible />
}
```

## Exports

- `CodeBlock`
- `InlineCode`

## CodeBlock props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `lang` | `string` | — | Language id for highlighting (required) |
| `code` | `string` | — | Source code (required) |
| `label` | `string` | — | Filename shown in the header |
| `collapsible` | `boolean` | `false` | Allow collapsing the block |
## Examples

```tsx
<InlineCode>npm install clay-ui</InlineCode>
```

