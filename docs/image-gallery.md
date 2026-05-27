# Image Gallery

Image layouts in masonry, grid, and list modes with lightbox-style selection.

## Import

```tsx
import { type GalleryImage, type ViewMode } from 'clay-ui'
```

## Basic usage

```tsx
import { type GalleryImage } from 'clay-ui'

const images: GalleryImage[] = [
  { id: '1', src: '/photo.jpg', alt: 'Workspace', caption: 'Morning light' },
]

// See ImageGalleryShowcase for full layout demos
```

## Exports

- `GalleryImage`
- `ViewMode`

## GalleryImage

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `id` | `string` | — | Unique id (required) |
| `src` | `string` | — | Image URL (required) |
| `alt` | `string` | — | Alt text (required) |
| `caption` | `string` | — | Optional caption |
| `span` | `number` | — | Masonry row span |
## Notes

`ViewMode` is `\`masonry\`, `\`grid2\`, `\`grid3\`, `\`grid4\`, or `\`list\``. Use `ImageGalleryShowcase` to preview all layouts.
