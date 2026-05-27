# Chat

Messaging window and contact list layouts with sample conversations.

## Import

```tsx
import { ChatWindow, ContactList, type Message } from 'clay-ui'
```

## Basic usage

```tsx
import { ChatWindow } from 'clay-ui'

function Example() {
  return <ChatWindow />
}
```

## Exports

- `ChatWindow`
- `ContactList`
- `Message`

## Message

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `id` | `string` | — | Unique id |
| `text` | `string` | — | Message body |
| `sender` | `'me' | 'them'` | — | Bubble alignment |
| `time` | `string` | — | Display timestamp |
| `avatar` | `string` | — | Gradient classes for avatar circle |
## Notes

`ChatWindow` and `ContactList` are self-contained demos. Use the `Message` type when wiring your own data.
