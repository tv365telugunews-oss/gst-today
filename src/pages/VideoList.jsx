import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { db } from '../firebase'
import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore'
import { useToast } from '../components/Toast'
import { useConfirm } from '../components/Confirm'
import { getRole } from '../auth'
import { Plus, Play, Edit2, Trash2, ExternalLink } from 'lucide-react'

export default function VideoList() {
  const { show } = useToast()
  const { showConfirm } = useConfirm()
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)

  const load = async () => {
    setLoading(true)
    try {
      const snap = await getDocs(collection(db,'videos'))
      setItems(snap.docs.map(d=>({id:d.id,...d.data()})).sort((a,b)=>(b.createdAt?.seconds||0)-(a.createdAt?.seconds||0)))
    } catch { show('Failed to load',{type:'error'}) }
    setLoading(false)
  }
  useEffect(()=>{load()},[])

  const remove = async (id) => {
    if (!await showConfirm('Delete this video?')) return
    await deleteDoc(doc(db,'videos',id))
    show('Video deleted',{type:'success'}); load()
  }

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Video Gallery</h1>
          <p className="text-slate-500 text-sm">{items.length} videos</p>
        </div>
        <Link to="/video/add" className="flex items-center gap-2 px-4 py-2.5 bg-[#E63946] hover:bg-[#c62c38] text-white text-sm font-semibold rounded-xl transition shadow">
          <Plus size={16}/> Add Video
        </Link>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {Array.from({length:3}).map((_,i)=>(
            <div key={i} className="bg-white rounded-2xl border border-slate-100 overflow-hidden">
              <div className="skeleton h-40"/><div className="p-3 space-y-2"><div className="skeleton h-4 w-3/4"/><div className="skeleton h-3 w-1/2"/></div>
            </div>
          ))}
        </div>
      ) : items.length === 0 ? (
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm py-16 text-center text-slate-400">
          <Play size={40} className="mx-auto mb-2 opacity-30"/>
          <p>No videos added yet</p>
          <Link to="/video/add" className="mt-2 inline-block text-sm text-[#E63946] font-semibold">Add first video →</Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {items.map(item => (
            <div key={item.id} className="card-lift bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
              <div className="relative">
                {item.thumbnailUrl
                  ? <img src={item.thumbnailUrl} alt={item.title} className="w-full h-40 object-cover"/>
                  : <div className="w-full h-40 bg-slate-100 flex items-center justify-center"><Play size={28} className="text-slate-300"/></div>}
                <a href={item.url} target="_blank" rel="noreferrer"
                  className="absolute inset-0 flex items-center justify-center bg-black/20 opacity-0 hover:opacity-100 transition">
                  <div className="w-12 h-12 rounded-full bg-white/90 flex items-center justify-center shadow">
                    <Play size={20} className="text-[#E63946] ml-0.5"/>
                  </div>
                </a>
              </div>
              <div className="p-4">
                <h3 className="font-bold text-slate-800 text-sm truncate">{item.title || item.url}</h3>
                {item.category && <span className="mt-1 inline-block text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-500 uppercase">{item.category}</span>}
                {item.description && <p className="text-xs text-slate-500 mt-1.5 line-clamp-2">{item.description}</p>}
                <div className="flex items-center gap-2 mt-3">
                  <a href={item.url} target="_blank" rel="noreferrer" className="flex items-center gap-1 text-xs text-[#E63946] font-semibold hover:underline">
                    <ExternalLink size={12}/> Watch
                  </a>
                  <Link to={`/video/edit/${item.id}`} className="ml-auto p-1.5 rounded-lg text-slate-400 hover:bg-blue-50 hover:text-blue-600 transition"><Edit2 size={13}/></Link>
                  {getRole()==='admin' && <button onClick={()=>remove(item.id)} className="p-1.5 rounded-lg text-slate-400 hover:bg-red-50 hover:text-red-600 transition"><Trash2 size={13}/></button>}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
