# Image Gallery

Masonry, grid, and list image layouts.

## Import

```tsx
import { type GalleryImage } from 'clay-ui'
```

## Basic usage

```tsx
const images: GalleryImage[] = [{ id, src, alt, caption }]
```

## Exports

- `GalleryImage`
- `ViewMode`

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `GalleryImage` | interface | — | id, src, alt, caption?, span? |
| `ViewMode` | type | — | 'masonry' | 'grid2' | 'grid3' | 'grid4' | 'list' |

