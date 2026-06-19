import { useEffect, useState } from 'react'
import { db, storage } from '../firebase'
import { doc, getDoc, updateDoc } from 'firebase/firestore'
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage'
import { useNavigate, useParams } from 'react-router-dom'
import { useToast } from '../components/Toast'

export default function MagazineEdit() {
  const { id } = useParams(); const nav = useNavigate(); const { show } = useToast()
  const [title, setTitle] = useState(''); const [issueNo, setIssueNo] = useState(''); const [file, setFile] = useState(null)
  const [existingUrl, setExistingUrl] = useState(''); const [progress, setProgress] = useState(0); const [saving, setSaving] = useState(false)

  useEffect(()=>{ getDoc(doc(db,'magazines',id)).then(d=>{if(d.exists()){const data=d.data();setTitle(data.title||'');setIssueNo(data.issueNo||'');setExistingUrl(data.fileUrl||'')}}) },[id])

  const save = async () => {
    setSaving(true)
    try {
      let fileUrl = existingUrl
      if (file) {
        const r = ref(storage,`magazines/${Date.now()}_${file.name}`)
        const task = uploadBytesResumable(r,file)
        await new Promise((res,rej)=>task.on('state_changed',s=>setProgress(Math.round(s.bytesTransferred/s.totalBytes*100)),rej,async()=>{fileUrl=await getDownloadURL(task.snapshot.ref);res()}))
      }
      await updateDoc(doc(db,'magazines',id),{title,issueNo,fileUrl})
      show('Magazine updated',{type:'success'}); nav('/magazine/list')
    } catch(err){console.error(err);show('Failed to update',{type:'error'})}
    setSaving(false)
  }

  return (
    <div className="max-w-lg mx-auto space-y-5">
      <h1 className="text-2xl font-bold text-slate-800">Edit Magazine</h1>
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 space-y-4">
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-1.5">Title</label>
          <input value={title} onChange={e=>setTitle(e.target.value)} className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#E63946]/25 focus:border-[#E63946]"/>
        </div>
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-1.5">Issue Number</label>
          <input value={issueNo} onChange={e=>setIssueNo(e.target.value)} className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#E63946]/25 focus:border-[#E63946]"/>
        </div>
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-1.5">Replace PDF</label>
          {existingUrl && !file && <a href={existingUrl} target="_blank" rel="noreferrer" className="text-xs text-[#E63946] font-semibold hover:underline">Current PDF →</a>}
          <input type="file" accept="application/pdf" className="mt-2 text-sm" onChange={e=>setFile(e.target.files?.[0])}/>
          {progress>0&&progress<100&&<div className="mt-2 h-1.5 bg-slate-100 rounded-full"><div className="h-full bg-[#E63946] transition-all" style={{width:`${progress}%`}}/></div>}
        </div>
        <div className="flex gap-3 pt-2">
          <button onClick={save} disabled={saving} className="px-5 py-2.5 bg-[#E63946] hover:bg-[#c62c38] text-white font-semibold rounded-xl text-sm transition shadow">
            {saving?'Saving…':'Update'}
          </button>
          <button onClick={()=>nav('/magazine/list')} className="px-5 py-2.5 border border-slate-200 text-slate-600 font-semibold rounded-xl text-sm hover:bg-slate-50 transition">Cancel</button>
        </div>
      </div>
    </div>
  )
}
