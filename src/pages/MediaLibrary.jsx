import { useRef, useState, useCallback } from 'react'
import { storage } from '../firebase'
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage'
import { useToast } from '../components/Toast'
import { Upload, Trash2, Copy, Check, Image as ImageIcon } from 'lucide-react'

export default function MediaLibrary() {
  const { show } = useToast()
  const [items, setItems] = useState([])
  const [dragging, setDragging] = useState(false)
  const [copiedId, setCopiedId] = useState(null)
  const [query, setQuery] = useState('')
  const inputRef = useRef()

  const upload = useCallback(async (files) => {
    for (const file of files) {
      if (!file.type.startsWith('image/')) continue
      const storageRef = ref(storage, `media/${Date.now()}_${file.name}`)
      const task = uploadBytesResumable(storageRef, file)
      const id = Date.now() + Math.random()
      setItems(prev => [...prev, { id, name: file.name, url: URL.createObjectURL(file), uploading: true }])
      task.on('state_changed', null, () => show('Upload failed', { type: 'error' }), async () => {
        const url = await getDownloadURL(task.snapshot.ref)
        setItems(prev => prev.map(it => it.id === id ? { ...it, url, uploading: false } : it))
        show('Image uploaded!', { type: 'success' })
      })
    }
  }, [show])

  const onDrop = (e) => { e.preventDefault(); setDragging(false); upload(Array.from(e.dataTransfer.files)) }
  const onDragOver = (e) => { e.preventDefault(); setDragging(true) }

  const copyUrl = (item) => {
    navigator.clipboard.writeText(item.url).catch(() => {})
    setCopiedId(item.id)
    setTimeout(() => setCopiedId(null), 1800)
    show('URL copied!', { type: 'success' })
  }

  const remove = (id) => setItems(prev => prev.filter(i => i.id !== id))
  const filtered = items.filter(i => i.name.toLowerCase().includes(query.toLowerCase()))

  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-2xl font-bold text-slate-800">Media Library</h1>
        <p className="text-slate-500 text-sm">{items.length} files</p>
      </div>

      {/* Drop zone */}
      <div
        onDrop={onDrop} onDragOver={onDragOver} onDragLeave={() => setDragging(false)}
        onClick={() => inputRef.current.click()}
        className={`border-2 border-dashed rounded-2xl p-10 flex flex-col items-center gap-3 cursor-pointer transition ${dragging ? 'border-[#E63946] bg-red-50' : 'border-slate-200 hover:border-[#E63946]/50 bg-white'}`}
      >
        <Upload size={30} className={dragging ? 'text-[#E63946]' : 'text-slate-400'} />
        <p className="font-semibold text-slate-700">Drag & drop images here</p>
        <p className="text-sm text-slate-400">or click to browse files</p>
        <input ref={inputRef} type="file" accept="image/*" multiple className="hidden" onChange={e => upload(Array.from(e.target.files))} />
      </div>

      {/* Search */}
      {items.length > 0 && (
        <div className="flex gap-3">
          <input value={query} onChange={e => setQuery(e.target.value)} placeholder="Search by filename…"
            className="flex-1 px-4 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#E63946]/25 focus:border-[#E63946]" />
        </div>
      )}

      {/* Gallery */}
      {filtered.length === 0 && items.length > 0 ? (
        <p className="text-slate-400 text-sm text-center py-8">No matching files</p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {filtered.map(item => (
            <div key={item.id} className="group relative bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden card-lift">
              {item.uploading ? (
                <div className="w-full h-32 flex items-center justify-center bg-slate-50">
                  <div className="skeleton w-full h-full absolute inset-0" />
                  <p className="relative text-xs text-slate-500">Uploading…</p>
                </div>
              ) : (
                <img src={item.url} alt={item.name} className="w-full h-32 object-cover" />
              )}
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition flex items-center justify-center gap-2">
                <button onClick={(e) => { e.stopPropagation(); copyUrl(item) }}
                  className="p-2 rounded-lg bg-white/90 text-slate-700 hover:bg-white transition">
                  {copiedId === item.id ? <Check size={14} /> : <Copy size={14} />}
                </button>
                <button onClick={(e) => { e.stopPropagation(); remove(item.id) }}
                  className="p-2 rounded-lg bg-white/90 text-red-500 hover:bg-white transition">
                  <Trash2 size={14} />
                </button>
              </div>
              <div className="p-2">
                <p className="text-xs text-slate-600 truncate">{item.name}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      {items.length === 0 && (
        <div className="text-center py-6 text-slate-400">
          <ImageIcon size={36} className="mx-auto mb-2 opacity-30" />
          <p className="text-sm">Upload your first image above</p>
        </div>
      )}
    </div>
  )
}
