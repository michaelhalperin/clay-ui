# Cards

Product, profile, pricing, and testimonial card layouts with Clay shadows and hover lift.

## Import

```tsx
import { ProductCard, ProfileCard, PricingCard, TestimonialCard } from 'clay-ui'
```

## Basic usage

```tsx
import { ProductCard, PricingCard } from 'clay-ui'

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
}
```

## Exports

- `ProductCard`
- `ProfileCard`
- `PricingCard`
- `TestimonialCard`

## ProductCard props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `name` | `string` | — | Product name (required) |
| `category` | `string` | — | Category label (required) |
| `price` | `number` | — | Price in dollars (required) |
| `rating` | `number` | — | Star rating 0–5 (required) |
| `reviews` | `number` | — | Review count (required) |
| `badge` | `string` | — | Optional corner badge, e.g. `New` |
| `color` | `string` | — | Hero area background hex (required) |
## ProfileCard props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `name` | `string` | — | Display name (required) |
| `role` | `string` | — | Job title (required) |
| `location` | `string` | — | Location label (required) |
| `followers` | `number` | — | Follower count (required) |
| `following` | `number` | — | Following count (required) |
| `posts` | `number` | — | Post count (required) |
| `avatar` | `string` | — | Avatar background CSS color (required) |
## PricingCard props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `plan` | `string` | — | Plan name (required) |
| `price` | `number` | — | Price amount (required) |
| `period` | `string` | — | Billing period, e.g. `mo` (required) |
| `description` | `string` | — | Short subtitle (required) |
| `features` | `string[]` | — | Feature bullet list (required) |
| `cta` | `string` | — | Button label (required) |
| `highlight` | `boolean` | — | Featured plan styling |
| `color` | `string` | — | Accent hex (required) |
## TestimonialCard props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `quote` | `string` | — | Quote text (required) |
| `author` | `string` | — | Author name (required) |
| `role` | `string` | — | Author role (required) |
| `rating` | `number` | — | Star count 0–5 (required) |
| `color` | `string` | — | Avatar accent hex (required) |
