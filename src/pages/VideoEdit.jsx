import { useEffect, useState } from 'react'
import { db } from '../firebase'
import { doc, getDoc, updateDoc } from 'firebase/firestore'
import { useNavigate, useParams } from 'react-router-dom'
import { useToast } from '../components/Toast'

const CATEGORIES = ['GST News','Tax','Business','Economy','Politics','Technology','Entertainment']

function youtubeId(url) {
  const m = url.match(/(?:v=|youtu\.be\/|embed\/)([A-Za-z0-9_-]{11})/)
  return m ? m[1] : null
}

export default function VideoEdit() {
  const { id } = useParams(); const nav = useNavigate(); const { show } = useToast()
  const [url, setUrl] = useState(''); const [title, setTitle] = useState(''); const [description, setDescription] = useState(''); const [category, setCategory] = useState(''); const [saving, setSaving] = useState(false)

  useEffect(()=>{ getDoc(doc(db,'videos',id)).then(d=>{if(d.exists()){const data=d.data();setUrl(data.url||'');setTitle(data.title||'');setDescription(data.description||'');setCategory(data.category||'')}}) },[id])

  const vid = youtubeId(url)
  const thumb = vid ? `https://img.youtube.com/vi/${vid}/hqdefault.jpg` : ''

  const save = async () => {
    if (!url) { show('URL required',{type:'error'}); return }
    setSaving(true)
    try {
      await updateDoc(doc(db,'videos',id),{url,videoId:vid||'',thumbnailUrl:thumb,title,description,category})
      show('Video updated',{type:'success'}); nav('/video/list')
    } catch(err){console.error(err);show('Failed to update',{type:'error'})}
    setSaving(false)
  }

  return (
    <div className="max-w-lg mx-auto space-y-5">
      <h1 className="text-2xl font-bold text-slate-800">Edit Video</h1>
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 space-y-4">
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-1.5">YouTube URL</label>
          <input value={url} onChange={e=>setUrl(e.target.value)} className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#E63946]/25 focus:border-[#E63946]"/>
        </div>
        {thumb && <img src={thumb} alt="" className="w-full h-36 object-cover rounded-xl"/>}
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-1.5">Title</label>
          <input value={title} onChange={e=>setTitle(e.target.value)} className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#E63946]/25 focus:border-[#E63946]"/>
        </div>
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-1.5">Description</label>
          <textarea value={description} onChange={e=>setDescription(e.target.value)} rows={3} className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#E63946]/25 focus:border-[#E63946] resize-none"/>
        </div>
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-1.5">Category</label>
          <select value={category} onChange={e=>setCategory(e.target.value)} className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm bg-white focus:outline-none focus:ring-2 focus:ring-[#E63946]/25">
            <option value="">Select…</option>{CATEGORIES.map(c=><option key={c}>{c}</option>)}
          </select>
        </div>
        <div className="flex gap-3 pt-2">
          <button onClick={save} disabled={saving} className="px-5 py-2.5 bg-[#E63946] hover:bg-[#c62c38] text-white font-semibold rounded-xl text-sm transition shadow">{saving?'Saving…':'Update'}</button>
          <button onClick={()=>nav('/video/list')} className="px-5 py-2.5 border border-slate-200 text-slate-600 font-semibold rounded-xl text-sm hover:bg-slate-50 transition">Cancel</button>
        </div>
      </div>
    </div>
  )
}
