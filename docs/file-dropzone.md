# File Dropzone

Types and patterns for drag-and-drop file upload with progress queue.

## Import

```tsx
import { type UploadFile } from 'clay-ui'
```

## UploadFile interface

```tsx
interface UploadFile {
  id: string
  name: string
  size: number
  type: string
  progress: number
  status: 'uploading' | 'done' | 'error'
}
```

## Basic usage pattern

Clay UI exports the `UploadFile` type for upload queue state. Build a dropzone using native drag events and track files in state:

```tsx
import { useState, useRef } from 'react'
import { type UploadFile } from 'clay-ui'

function FileUpload() {
  const [files, setFiles] = useState<UploadFile[]>([])
  const [dragOver, setDragOver] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  const addFiles = (fileList: FileList | null) => {
    if (!fileList) return
    Array.from(fileList).forEach((f) => {
      const entry: UploadFile = {
        id: crypto.randomUUID(),
        name: f.name,
        size: f.size,
        type: f.type,
        progress: 0,
        status: 'uploading',
      }
      setFiles((prev) => [...prev, entry])
      // Wire to your upload API and update progress / status
    })
  }

  return (
    <div
      onDragOver={(e) => { e.preventDefault(); setDragOver(true) }}
      onDragLeave={() => setDragOver(false)}
      onDrop={(e) => { e.preventDefault(); setDragOver(false); addFiles(e.dataTransfer.files) }}
      onClick={() => inputRef.current?.click()}
    >
      Drop files here or click to browse
      <input ref={inputRef} type="file" multiple hidden onChange={(e) => addFiles(e.target.files)} />
    </div>
  )
}
```

## UploadFile fields

| Field | Type | Description |
|-------|------|-------------|
| `id` | `string` | Unique key for list rendering |
| `name` | `string` | File name |
| `size` | `number` | Size in bytes |
| `type` | `string` | MIME type |
| `progress` | `number` | Upload progress 0–100 |
| `status` | `'uploading' \| 'done' \| 'error'` | Current upload state |

## Reference showcase

The package includes `FileDropzoneShowcase` with a full dropzone, simulated upload progress, file-type icons, and a removable queue. Import it from `clay-ui` for a live demo, or copy the pattern from `src/components/ui/FileDropzone.tsx`.
