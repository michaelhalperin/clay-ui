import { useState, useRef, useCallback } from 'react'
import { Upload, X, CheckCircle2, AlertCircle, File, Image, FileText, Archive } from 'lucide-react'

export interface UploadFile {
  id: string
  name: string
  size: number
  type: string
  progress: number
  status: 'uploading' | 'done' | 'error'
}

const fileIcon = (type: string) => {
  if (type.startsWith('image/')) return <Image className="w-4 h-4 text-pink-500" />
  if (type.includes('pdf') || type.includes('text')) return <FileText className="w-4 h-4 text-sky-500" />
  if (type.includes('zip') || type.includes('rar')) return <Archive className="w-4 h-4 text-amber-500" />
  return <File className="w-4 h-4 text-slate-400" />
}

const fmtSize = (bytes: number) => bytes < 1024 * 1024 ? `${(bytes / 1024).toFixed(1)} KB` : `${(bytes / 1024 / 1024).toFixed(1)} MB`

function simulateUpload(id: string, onProgress: (id: string, p: number) => void, onDone: (id: string, ok: boolean) => void) {
  let p = 0
  const interval = setInterval(() => {
    p += Math.random() * 18 + 5
    if (p >= 100) {
      clearInterval(interval)
      onProgress(id, 100)
      setTimeout(() => onDone(id, Math.random() > 0.15), 300)
    } else {
      onProgress(id, Math.round(p))
    }
  }, 150)
}

export function FileDropzoneShowcase() {
  const [files, setFiles] = useState<UploadFile[]>([])
  const [dragOver, setDragOver] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  const addFiles = useCallback((fileList: FileList | null) => {
    if (!fileList) return
    Array.from(fileList).forEach(f => {
      const id = Math.random().toString(36).slice(2)
      const entry: UploadFile = { id, name: f.name, size: f.size, type: f.type, progress: 0, status: 'uploading' }
      setFiles(fs => [...fs, entry])
      simulateUpload(
        id,
        (id, p) => setFiles(fs => fs.map(x => x.id === id ? { ...x, progress: p } : x)),
        (id, ok) => setFiles(fs => fs.map(x => x.id === id ? { ...x, status: ok ? 'done' : 'error' } : x))
      )
    })
  }, [])

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setDragOver(false)
    addFiles(e.dataTransfer.files)
  }

  const remove = (id: string) => setFiles(fs => fs.filter(f => f.id !== id))

  return (
    <div className="grid grid-cols-2 gap-8">
      <div className="space-y-4">
        <p className="section-label">Drop Zone</p>
        <div
          onDragOver={e => { e.preventDefault(); setDragOver(true) }}
          onDragLeave={() => setDragOver(false)}
          onDrop={onDrop}
          onClick={() => inputRef.current?.click()}
          className={`border-2 border-dashed rounded-clay-lg p-8 flex flex-col items-center gap-3 cursor-pointer transition-all duration-200
            ${dragOver
              ? 'border-sky-400 bg-sky-50 scale-[1.01]'
              : 'border-slate-200 bg-slate-50/50 hover:border-sky-300 hover:bg-sky-50/30'}`}
        >
          <div className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-all ${dragOver ? 'bg-sky-100' : 'bg-white shadow-clay'}`}>
            <Upload className={`w-6 h-6 transition-colors ${dragOver ? 'text-sky-500' : 'text-slate-400'}`} />
          </div>
          <div className="text-center">
            <p className="text-sm font-semibold text-slate-700">
              {dragOver ? 'Release to upload' : 'Drop files here or click to browse'}
            </p>
            <p className="text-xs text-slate-400 mt-1">PNG, JPG, PDF, ZIP up to 50 MB each</p>
          </div>
          <input ref={inputRef} type="file" multiple className="hidden" onChange={e => addFiles(e.target.files)} />
        </div>
      </div>

      <div className="space-y-4">
        <p className="section-label">Upload Queue</p>
        {files.length === 0 ? (
          <div className="h-32 flex items-center justify-center rounded-clay border-2 border-dashed border-slate-100 text-slate-300 text-sm">
            No files yet — drop something
          </div>
        ) : (
          <div className="space-y-2.5 max-h-80 overflow-y-auto pr-1">
            {files.map(f => (
              <div key={f.id} className="clay-card p-3.5" style={{ animation: 'fadeIn 0.2s ease' }}>
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-8 h-8 bg-slate-50 rounded-xl flex items-center justify-center shrink-0 shadow-soft">
                    {fileIcon(f.type)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-semibold text-slate-700 truncate">{f.name}</p>
                    <p className="text-[10px] text-slate-400">{fmtSize(f.size)}</p>
                  </div>
                  <div className="shrink-0 flex items-center gap-2">
                    {f.status === 'done'  && <CheckCircle2 className="w-4 h-4 text-emerald-500" />}
                    {f.status === 'error' && <AlertCircle  className="w-4 h-4 text-red-400" />}
                    <button onClick={() => remove(f.id)} className="text-slate-300 hover:text-slate-500 cursor-pointer transition-colors">
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                </div>
                {f.status === 'uploading' && (
                  <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
                    <div className="h-full bg-sky-400 rounded-full transition-all duration-150" style={{ width: `${f.progress}%` }} />
                  </div>
                )}
                {f.status === 'done'  && <div className="h-1.5 bg-emerald-400 rounded-full" />}
                {f.status === 'error' && (
                  <div className="flex items-center gap-1.5 mt-1">
                    <div className="h-1.5 bg-red-300 rounded-full flex-1" />
                    <span className="text-[10px] text-red-400 font-medium">Upload failed</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
        {files.length > 0 && (
          <button onClick={() => setFiles([])} className="text-xs text-slate-400 hover:text-slate-600 cursor-pointer transition-colors">
            Clear all
          </button>
        )}
      </div>
    </div>
  )
}
