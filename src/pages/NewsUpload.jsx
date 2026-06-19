import { useState, useRef } from 'react'
import { db, storage } from '../firebase'
import { collection, addDoc } from 'firebase/firestore'
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage'
import { useToast } from '../components/Toast'
import { useNavigate } from 'react-router-dom'
import { Image, X, Upload, Bold, Italic, List, Link2, Zap, TrendingUp, Save, Eye, Send } from 'lucide-react'

const CATEGORIES = ['GST News','Tax','Business','Economy','Politics','Legal','Finance','International','State News','Technology']
const STATES = ['All India','Andhra Pradesh','Delhi','Gujarat','Karnataka','Maharashtra','Tamil Nadu','Uttar Pradesh','West Bengal']
const DISTRICTS = { Maharashtra: ['Mumbai','Pune','Nagpur','Nashik'], Delhi: ['Central Delhi','New Delhi','South Delhi'], Gujarat: ['Ahmedabad','Surat','Vadodara'], Karnataka: ['Bengaluru','Mysuru','Hubli'], 'All India': ['—'] }

function FieldLabel({ children, required }) {
  return (
    <label className="block text-sm font-semibold text-slate-700 mb-1.5">
      {children}{required && <span className="text-red-500 ml-0.5">*</span>}
    </label>
  )
}
function Input({ ...props }) {
  return <input {...props} className={`w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#E63946]/25 focus:border-[#E63946] text-sm transition ${props.className || ''}`} />
}
function Select({ children, ...props }) {
  return <select {...props} className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#E63946]/25 focus:border-[#E63946] text-sm bg-white transition">{children}</select>
}

function ImageUploadBox({ label, value, onFile }) {
  const inputRef = useRef()
  return (
    <div>
      <FieldLabel>{label}</FieldLabel>
      <div
        onClick={() => inputRef.current.click()}
        className="relative border-2 border-dashed border-slate-200 rounded-2xl overflow-hidden cursor-pointer hover:border-[#E63946]/50 transition group"
        style={{ minHeight: 140 }}
      >
        {value ? (
          <img src={value} alt="preview" className="w-full h-36 object-cover" />
        ) : (
          <div className="flex flex-col items-center justify-center h-36 gap-2 text-slate-400 group-hover:text-[#E63946] transition">
            <Upload size={28} />
            <p className="text-xs font-medium">Click to upload image</p>
          </div>
        )}
        <input ref={inputRef} type="file" accept="image/*" className="hidden" onChange={onFile} />
      </div>
    </div>
  )
}

function TagInput({ tags, onChange }) {
  const [input, setInput] = useState('')
  const add = (e) => {
    if ((e.key === 'Enter' || e.key === ',') && input.trim()) {
      e.preventDefault()
      if (!tags.includes(input.trim())) onChange([...tags, input.trim()])
      setInput('')
    }
  }
  return (
    <div className="flex flex-wrap gap-2 p-3 rounded-xl border border-slate-200 min-h-[44px] focus-within:ring-2 focus-within:ring-[#E63946]/25 focus-within:border-[#E63946]">
      {tags.map(t => (
        <span key={t} className="flex items-center gap-1 bg-[#E63946]/10 text-[#E63946] text-xs font-semibold px-2 py-1 rounded-full">
          {t}
          <button type="button" onClick={() => onChange(tags.filter(x => x !== t))}><X size={11} /></button>
        </span>
      ))}
      <input
        value={input} onChange={e => setInput(e.target.value)} onKeyDown={add}
        placeholder={tags.length === 0 ? 'Type tag and press Enter' : ''}
        className="flex-1 min-w-[100px] outline-none text-sm bg-transparent"
      />
    </div>
  )
}

export default function NewsUpload() {
  const { show } = useToast()
  const nav = useNavigate()

  const [title, setTitle] = useState('')
  const [subtitle, setSubtitle] = useState('')
  const [body, setBody] = useState('')
  const [category, setCategory] = useState('')
  const [state, setState] = useState('')
  const [district, setDistrict] = useState('')
  const [tags, setTags] = useState([])
  const [breaking, setBreaking] = useState(false)
  const [trending, setTrending] = useState(false)
  const [featuredFile, setFeaturedFile] = useState(null)
  const [featuredPreview, setFeaturedPreview] = useState('')
  const [progress, setProgress] = useState(0)
  const [saving, setSaving] = useState(false)

  const handleFeaturedFile = (e) => {
    const f = e.target.files?.[0]
    if (f) {
      setFeaturedFile(f)
      setFeaturedPreview(URL.createObjectURL(f))
    }
  }

  const uploadImage = async (file, path) => {
    const storageRef = ref(storage, path)
    const task = uploadBytesResumable(storageRef, file)
    return new Promise((resolve, reject) => {
      task.on('state_changed', s => setProgress(Math.round((s.bytesTransferred / s.totalBytes) * 100)), reject, async () => resolve(await getDownloadURL(task.snapshot.ref)))
    })
  }

  const publish = async (draft = false) => {
    if (!title.trim()) { show('News title is required', { type: 'error' }); return }
    setSaving(true)
    try {
      let imageUrl = ''
      if (featuredFile) imageUrl = await uploadImage(featuredFile, `news-images/${Date.now()}_${featuredFile.name}`)
      await addDoc(collection(db, 'news'), { title, subtitle, body, category, state, district, tags, breaking, trending, imageUrl, status: draft ? 'draft' : 'published', createdAt: new Date() })
      show(draft ? 'Draft saved!' : 'News published!', { type: 'success' })
      nav('/news/list')
    } catch (err) {
      console.error(err)
      show('Failed to save. Check Firebase connection.', { type: 'error' })
    }
    setSaving(false)
  }

  const districtOptions = DISTRICTS[state] || []

  return (
    <div className="max-w-5xl mx-auto space-y-5">
      {/* Top bar */}
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Add News</h1>
          <p className="text-sm text-slate-500">Create and publish a new news article</p>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={() => show('Preview coming soon')} className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-slate-200 text-sm font-semibold text-slate-600 hover:bg-slate-50 transition">
            <Eye size={15} /> Preview
          </button>
          <button onClick={() => publish(true)} disabled={saving} className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-slate-200 text-sm font-semibold text-slate-600 hover:bg-slate-50 transition">
            <Save size={15} /> Save Draft
          </button>
          <button onClick={() => publish(false)} disabled={saving} className="flex items-center gap-2 px-4 py-2.5 bg-[#E63946] hover:bg-[#c62c38] text-white text-sm font-semibold rounded-xl transition shadow">
            <Send size={15} /> {saving ? 'Publishing…' : 'Publish'}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Main editor */}
        <div className="lg:col-span-2 space-y-4">
          {/* Title */}
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5">
            <FieldLabel required>News Title</FieldLabel>
            <Input value={title} onChange={e => setTitle(e.target.value)} placeholder="Enter headline here…" className="text-lg font-semibold" />
            <div className="mt-3">
              <FieldLabel>Subtitle / Short Description</FieldLabel>
              <Input value={subtitle} onChange={e => setSubtitle(e.target.value)} placeholder="Brief description or sub-headline…" />
            </div>
          </div>

          {/* Rich text editor (contenteditable) */}
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
            <div className="flex items-center gap-1 px-4 py-2.5 border-b border-slate-100 bg-slate-50">
              {[
                [Bold, 'bold'], [Italic, 'italic'], [List, 'insertUnorderedList'], [Link2, 'createLink']
              ].map(([Icon, cmd]) => (
                <button key={cmd} type="button" onMouseDown={e => { e.preventDefault(); document.execCommand(cmd, false, cmd === 'createLink' ? prompt('URL:') : undefined) }}
                  className="p-2 rounded-lg text-slate-500 hover:bg-slate-200 hover:text-slate-800 transition">
                  <Icon size={15} />
                </button>
              ))}
            </div>
            <div
              contentEditable suppressContentEditableWarning
              data-placeholder="Write your news story here…"
              onInput={e => setBody(e.currentTarget.innerHTML)}
              className="min-h-[240px] px-5 py-4 text-sm text-slate-700 leading-relaxed focus:outline-none"
            />
          </div>

          {/* Featured image */}
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5">
            <ImageUploadBox label="Featured Image" value={featuredPreview} onFile={handleFeaturedFile} />
            {progress > 0 && progress < 100 && (
              <div className="mt-3">
                <div className="flex justify-between text-xs text-slate-500 mb-1"><span>Uploading…</span><span>{progress}%</span></div>
                <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full bg-[#E63946] transition-all" style={{ width: `${progress}%` }} />
                </div>
              </div>
            )}
          </div>

          {/* Tags */}
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5">
            <FieldLabel>Tags</FieldLabel>
            <TagInput tags={tags} onChange={setTags} />
            <p className="text-xs text-slate-400 mt-1.5">Press Enter or comma to add a tag</p>
          </div>
        </div>

        {/* Right sidebar */}
        <div className="space-y-4">
          {/* Publish box */}
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5">
            <h3 className="font-bold text-slate-800 mb-4">Publish</h3>
            <div className="space-y-3">
              <label className="flex items-center justify-between">
                <span className="flex items-center gap-2 text-sm font-semibold text-slate-700"><Zap size={15} className="text-orange-500" /> Breaking News</span>
                <button type="button" onClick={() => setBreaking(b => !b)}
                  className={`relative w-10 h-5.5 rounded-full transition-colors ${breaking ? 'bg-orange-500' : 'bg-slate-200'}`}
                >
                  <span className={`absolute top-0.5 left-0.5 w-4 h-4 rounded-full bg-white shadow transition-transform ${breaking ? 'translate-x-5' : ''}`} />
                </button>
              </label>
              <label className="flex items-center justify-between">
                <span className="flex items-center gap-2 text-sm font-semibold text-slate-700"><TrendingUp size={15} className="text-[#E63946]" /> Trending</span>
                <button type="button" onClick={() => setTrending(t => !t)}
                  className={`relative w-10 h-5.5 rounded-full transition-colors ${trending ? 'bg-[#E63946]' : 'bg-slate-200'}`}
                >
                  <span className={`absolute top-0.5 left-0.5 w-4 h-4 rounded-full bg-white shadow transition-transform ${trending ? 'translate-x-5' : ''}`} />
                </button>
              </label>
            </div>
            <div className="mt-4 pt-4 border-t border-slate-100 space-y-2">
              <button onClick={() => publish(false)} disabled={saving}
                className="w-full py-2.5 bg-[#E63946] hover:bg-[#c62c38] text-white font-semibold rounded-xl text-sm transition shadow">
                {saving ? 'Publishing…' : '🚀 Publish Now'}
              </button>
              <button onClick={() => publish(true)} disabled={saving}
                className="w-full py-2.5 border border-slate-200 text-slate-600 font-semibold rounded-xl text-sm hover:bg-slate-50 transition">
                Save Draft
              </button>
            </div>
          </div>

          {/* Category / Location */}
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5 space-y-3">
            <h3 className="font-bold text-slate-800">Category & Location</h3>
            <div>
              <FieldLabel>Category</FieldLabel>
              <Select value={category} onChange={e => setCategory(e.target.value)}>
                <option value="">Select category…</option>
                {CATEGORIES.map(c => <option key={c}>{c}</option>)}
              </Select>
            </div>
            <div>
              <FieldLabel>State</FieldLabel>
              <Select value={state} onChange={e => { setState(e.target.value); setDistrict('') }}>
                <option value="">Select state…</option>
                {STATES.map(s => <option key={s}>{s}</option>)}
              </Select>
            </div>
            {state && districtOptions.length > 0 && (
              <div>
                <FieldLabel>District</FieldLabel>
                <Select value={district} onChange={e => setDistrict(e.target.value)}>
                  <option value="">Select district…</option>
                  {districtOptions.map(d => <option key={d}>{d}</option>)}
                </Select>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
