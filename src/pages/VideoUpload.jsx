import { useState } from 'react'
import { db } from '../firebase'
import { collection, addDoc } from 'firebase/firestore'
import { useToast } from '../components/Toast'
import { useNavigate } from 'react-router-dom'
import { Video, Send } from 'lucide-react'

const CATEGORIES = ['GST News','Tax','Business','Economy','Politics','Technology','Entertainment']

function youtubeId(url) {
  const m = url.match(/(?:v=|youtu\.be\/|embed\/)([A-Za-z0-9_-]{11})/)
  return m ? m[1] : null
}

export default function VideoUpload() {
  const { show } = useToast()
  const nav = useNavigate()
  const [url, setUrl] = useState('')
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [category, setCategory] = useState('')
  const [saving, setSaving] = useState(false)

  const vid = youtubeId(url)
  const thumbnailUrl = vid ? `https://img.youtube.com/vi/${vid}/hqdefault.jpg` : ''

  const save = async () => {
    if (!url.trim()) { show('YouTube URL is required', { type: 'error' }); return }
    if (!vid) { show('Invalid YouTube URL', { type: 'error' }); return }
    setSaving(true)
    try {
      await addDoc(collection(db, 'videos'), { url, videoId: vid, thumbnailUrl, title, description, category, createdAt: new Date() })
      show('Video saved!', { type: 'success' })
      nav('/video/list')
    } catch (err) { console.error(err); show('Failed to save', { type: 'error' }) }
    setSaving(false)
  }

  return (
    <div className="max-w-2xl mx-auto space-y-5">
      <div>
        <h1 className="text-2xl font-bold text-slate-800">Add YouTube Video</h1>
        <p className="text-slate-500 text-sm">Paste a YouTube link to add video to the gallery</p>
      </div>
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 space-y-5">
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-1.5">YouTube URL <span className="text-red-500">*</span></label>
          <input value={url} onChange={e=>setUrl(e.target.value)} placeholder="https://www.youtube.com/watch?v=…" className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#E63946]/25 focus:border-[#E63946]"/>
        </div>

        {thumbnailUrl && (
          <div className="rounded-2xl overflow-hidden">
            <img src={thumbnailUrl} alt="thumbnail" className="w-full h-44 object-cover"/>
          </div>
        )}

        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-1.5">Video Title</label>
          <input value={title} onChange={e=>setTitle(e.target.value)} placeholder="Enter a title for this video" className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#E63946]/25 focus:border-[#E63946]"/>
        </div>
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-1.5">Description</label>
          <textarea value={description} onChange={e=>setDescription(e.target.value)} rows={3} placeholder="Short description…" className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#E63946]/25 focus:border-[#E63946] resize-none"/>
        </div>
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-1.5">Category</label>
          <select value={category} onChange={e=>setCategory(e.target.value)} className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm bg-white focus:outline-none focus:ring-2 focus:ring-[#E63946]/25">
            <option value="">Select category…</option>{CATEGORIES.map(c=><option key={c}>{c}</option>)}
          </select>
        </div>
        <div className="flex gap-3 pt-2">
          <button onClick={save} disabled={saving} className="flex items-center gap-2 px-5 py-2.5 bg-[#E63946] hover:bg-[#c62c38] text-white font-semibold rounded-xl text-sm transition shadow">
            <Send size={15}/>{saving?'Saving…':'Save Video'}
          </button>
          <button onClick={()=>nav('/video/list')} className="px-5 py-2.5 border border-slate-200 text-slate-600 font-semibold rounded-xl text-sm hover:bg-slate-50 transition">Cancel</button>
        </div>
      </div>
    </div>
  )
}
