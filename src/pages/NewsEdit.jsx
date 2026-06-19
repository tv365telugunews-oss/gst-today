import { useEffect, useState } from 'react'
import { db, storage } from '../firebase'
import { doc, getDoc, updateDoc } from 'firebase/firestore'
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage'
import { useNavigate, useParams } from 'react-router-dom'
import { useToast } from '../components/Toast'
import { Save, Send } from 'lucide-react'

const CATEGORIES = ['GST News','Tax','Business','Economy','Politics','Legal','Finance','International','State News','Technology']

export default function NewsEdit() {
  const { id } = useParams(); const nav = useNavigate(); const { show } = useToast()
  const [title, setTitle] = useState('')
  const [subtitle, setSubtitle] = useState('')
  const [category, setCategory] = useState('')
  const [breaking, setBreaking] = useState(false)
  const [file, setFile] = useState(null)
  const [existingImage, setExistingImage] = useState('')
  const [preview, setPreview] = useState('')
  const [progress, setProgress] = useState(0)
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    getDoc(doc(db, 'news', id)).then(d => {
      if (d.exists()) { const data = d.data(); setTitle(data.title||''); setSubtitle(data.subtitle||''); setCategory(data.category||''); setBreaking(data.breaking||false); setExistingImage(data.imageUrl||'') }
    })
  }, [id])

  const save = async () => {
    setSaving(true)
    try {
      let imageUrl = existingImage
      if (file) {
        const r = ref(storage, `news-images/${Date.now()}_${file.name}`)
        const task = uploadBytesResumable(r, file)
        await new Promise((res,rej) => task.on('state_changed', s=>setProgress(Math.round(s.bytesTransferred/s.totalBytes*100)),rej,async()=>{imageUrl=await getDownloadURL(task.snapshot.ref);res()}))
      }
      await updateDoc(doc(db, 'news', id), { title, subtitle, category, breaking, imageUrl })
      show('News updated', { type: 'success' }); nav('/news/list')
    } catch (err) { console.error(err); show('Failed to update', { type: 'error' }) }
    setSaving(false)
  }

  return (
    <div className="max-w-2xl mx-auto space-y-5">
      <h1 className="text-2xl font-bold text-slate-800">Edit News</h1>
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 space-y-4">
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-1.5">Title</label>
          <input value={title} onChange={e=>setTitle(e.target.value)} className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#E63946]/25 focus:border-[#E63946]" />
        </div>
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-1.5">Subtitle</label>
          <input value={subtitle} onChange={e=>setSubtitle(e.target.value)} className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#E63946]/25 focus:border-[#E63946]" />
        </div>
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-1.5">Category</label>
          <select value={category} onChange={e=>setCategory(e.target.value)} className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm bg-white focus:outline-none focus:ring-2 focus:ring-[#E63946]/25">
            <option value="">Select…</option>{CATEGORIES.map(c=><option key={c}>{c}</option>)}
          </select>
        </div>
        <label className="flex items-center gap-3 text-sm font-semibold text-slate-700 cursor-pointer">
          <input type="checkbox" checked={breaking} onChange={e=>setBreaking(e.target.checked)} className="rounded" />
          Breaking News
        </label>
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-1.5">Feature Image</label>
          {(preview||existingImage) && <img src={preview||existingImage} alt="" className="w-full h-36 object-cover rounded-xl mb-2" />}
          <input type="file" accept="image/*" onChange={e=>{const f=e.target.files?.[0];if(f){setFile(f);setPreview(URL.createObjectURL(f))}}} className="text-sm" />
          {progress>0&&progress<100&&<div className="mt-2 h-1.5 bg-slate-100 rounded-full"><div className="h-full bg-[#E63946] transition-all" style={{width:`${progress}%`}} /></div>}
        </div>
        <div className="flex gap-3 pt-2">
          <button onClick={save} disabled={saving} className="flex items-center gap-2 px-5 py-2.5 bg-[#E63946] hover:bg-[#c62c38] text-white font-semibold rounded-xl text-sm transition shadow">
            <Send size={15}/>{saving?'Saving…':'Update News'}
          </button>
          <button onClick={()=>nav('/news/list')} className="px-5 py-2.5 border border-slate-200 text-slate-600 font-semibold rounded-xl text-sm hover:bg-slate-50 transition">
            Cancel
          </button>
        </div>
      </div>
    </div>
  )
}
