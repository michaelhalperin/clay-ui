# Cards

Product, profile, pricing, and testimonial cards.

## Import

```tsx
import { ProductCard } from 'clay-ui'
```

## Basic usage

```tsx
<ProductCard name="Aurora" category="Audio" price={129} rating={4.5} reviews={84} color="#0ea5e9" />
```

## Exports

- `ProductCard`
- `ProfileCard`
- `PricingCard`
- `TestimonialCard`

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `name / plan / quote` | string | — | Primary text (varies by card) |
| `price / features` | number | string[] | — | Pricing card fields |
| `highlight` | boolean | — | Featured plan styling |

