import { useState } from 'react'
import { db, storage } from '../firebase'
import { collection, addDoc } from 'firebase/firestore'
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage'
import { useToast } from '../components/Toast'
import { useNavigate } from 'react-router-dom'
import { Upload, BookOpen, Send } from 'lucide-react'

export default function MagazineUpload() {
  const { show } = useToast()
  const nav = useNavigate()
  const [title, setTitle] = useState('')
  const [issueNo, setIssueNo] = useState('')
  const [pubDate, setPubDate] = useState('')
  const [coverFile, setCoverFile] = useState(null)
  const [coverPreview, setCoverPreview] = useState('')
  const [pdfFile, setPdfFile] = useState(null)
  const [progress, setProgress] = useState(0)
  const [saving, setSaving] = useState(false)

  const uploadFile = (file, path) => {
    const r = ref(storage, path)
    const task = uploadBytesResumable(r, file)
    return new Promise((res, rej) => task.on('state_changed', s => setProgress(Math.round(s.bytesTransferred/s.totalBytes*100)), rej, async () => res(await getDownloadURL(task.snapshot.ref))))
  }

  const publish = async () => {
    if (!title || !pdfFile) { show('Title and PDF are required', { type: 'error' }); return }
    setSaving(true)
    try {
      let coverUrl = '', fileUrl = ''
      if (coverFile) coverUrl = await uploadFile(coverFile, `magazine-covers/${Date.now()}_${coverFile.name}`)
      fileUrl = await uploadFile(pdfFile, `magazines/${Date.now()}_${pdfFile.name}`)
      await addDoc(collection(db, 'magazines'), { title, issueNo, pubDate, coverUrl, fileUrl, createdAt: new Date() })
      show('Magazine published!', { type: 'success' })
      nav('/magazine/list')
    } catch (err) { console.error(err); show('Upload failed', { type: 'error' }) }
    setSaving(false)
  }

  return (
    <div className="max-w-2xl mx-auto space-y-5">
      <div>
        <h1 className="text-2xl font-bold text-slate-800">Upload Magazine</h1>
        <p className="text-slate-500 text-sm">Upload a new magazine edition as PDF</p>
      </div>

      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 space-y-5">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1.5">Magazine Title <span className="text-red-500">*</span></label>
            <input value={title} onChange={e=>setTitle(e.target.value)} placeholder="GST Today – June 2026" className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#E63946]/25 focus:border-[#E63946]" />
          </div>
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1.5">Issue Number</label>
            <input value={issueNo} onChange={e=>setIssueNo(e.target.value)} placeholder="Vol. 12 | Issue 06" className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#E63946]/25 focus:border-[#E63946]" />
          </div>
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1.5">Publication Date</label>
            <input type="date" value={pubDate} onChange={e=>setPubDate(e.target.value)} className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#E63946]/25 focus:border-[#E63946]" />
          </div>
        </div>

        {/* Cover image */}
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-1.5">Cover Image</label>
          <div
            onClick={() => document.getElementById('coverInput').click()}
            className="border-2 border-dashed border-slate-200 rounded-2xl overflow-hidden cursor-pointer hover:border-[#E63946]/50 transition"
          >
            {coverPreview
              ? <img src={coverPreview} alt="cover" className="w-full h-44 object-cover" />
              : <div className="flex flex-col items-center justify-center h-44 gap-2 text-slate-400 hover:text-[#E63946] transition">
                  <BookOpen size={30} /><p className="text-xs font-medium">Click to upload cover image</p>
                </div>}
          </div>
          <input id="coverInput" type="file" accept="image/*" className="hidden" onChange={e=>{const f=e.target.files?.[0];if(f){setCoverFile(f);setCoverPreview(URL.createObjectURL(f))}}} />
        </div>

        {/* PDF upload */}
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-1.5">PDF File <span className="text-red-500">*</span></label>
          <div
            onClick={() => document.getElementById('pdfInput').click()}
            className="border-2 border-dashed border-slate-200 rounded-2xl p-6 cursor-pointer hover:border-[#E63946]/50 transition flex flex-col items-center gap-2 text-slate-400 hover:text-[#E63946]"
          >
            <Upload size={26} />
            <p className="text-sm font-medium">{pdfFile ? pdfFile.name : 'Click to upload PDF'}</p>
            <p className="text-xs">Max 50MB</p>
          </div>
          <input id="pdfInput" type="file" accept="application/pdf" className="hidden" onChange={e=>setPdfFile(e.target.files?.[0])} />
        </div>

        {progress > 0 && progress < 100 && (
          <div>
            <div className="flex justify-between text-xs text-slate-500 mb-1"><span>Uploading…</span><span>{progress}%</span></div>
            <div className="h-1.5 bg-slate-100 rounded-full"><div className="h-full bg-[#E63946] transition-all" style={{width:`${progress}%`}} /></div>
          </div>
        )}

        <div className="flex gap-3 pt-2">
          <button onClick={publish} disabled={saving} className="flex items-center gap-2 px-5 py-2.5 bg-[#E63946] hover:bg-[#c62c38] text-white font-semibold rounded-xl text-sm transition shadow">
            <Send size={15}/>{saving?'Uploading…':'Publish Magazine'}
          </button>
          <button onClick={()=>nav('/magazine/list')} className="px-5 py-2.5 border border-slate-200 text-slate-600 font-semibold rounded-xl text-sm hover:bg-slate-50 transition">
            Cancel
          </button>
        </div>
      </div>
    </div>
  )
}
