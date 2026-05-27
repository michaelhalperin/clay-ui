# Code Block

Syntax-highlighted code blocks with copy and collapse.

## Import

```tsx
import { CodeBlock } from 'clay-ui'
```

## Basic usage

```tsx
<CodeBlock lang="tsx" code={source} label="App.tsx" collapsible />
```

## Exports

- `CodeBlock`
- `InlineCode`

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `lang` | string | — | Language id (required) |
| `code` | string | — | Source code (required) |
| `label` | string | — | Filename label |
| `collapsible` | boolean | false | Collapsible panel |

