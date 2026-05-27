# Tree View

Expandable file-tree with folder icons, selection, and nested children.

## Import

```tsx
import { FileTree, type TreeNode } from 'clay-ui'
```

## Basic usage

```tsx
import { FileTree, type TreeNode } from 'clay-ui'

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
}
```

## Exports

- `FileTree`
- `TreeNode`

## TreeNode

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `id` | `string` | — | Unique node id (required) |
| `label` | `string` | — | Display name (required) |
| `icon` | `React.ReactNode` | — | Custom icon |
| `children` | `TreeNode[]` | — | Nested nodes |
## Notes

`FileTree` uses built-in sample data in the showcase. Pass your own tree by adapting the component.
