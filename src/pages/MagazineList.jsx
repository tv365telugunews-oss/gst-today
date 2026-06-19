import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { db } from '../firebase'
import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore'
import { useToast } from '../components/Toast'
import { useConfirm } from '../components/Confirm'
import { getRole } from '../auth'
import { Plus, BookOpen, Edit2, Trash2, ExternalLink } from 'lucide-react'

export default function MagazineList() {
  const { show } = useToast()
  const { showConfirm } = useConfirm()
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)

  const load = async () => {
    setLoading(true)
    try {
      const snap = await getDocs(collection(db, 'magazines'))
      setItems(snap.docs.map(d=>({id:d.id,...d.data()})).sort((a,b)=>(b.createdAt?.seconds||0)-(a.createdAt?.seconds||0)))
    } catch { show('Failed to load', {type:'error'}) }
    setLoading(false)
  }
  useEffect(()=>{load()},[])

  const remove = async (id) => {
    if (!await showConfirm('Delete this magazine?')) return
    await deleteDoc(doc(db,'magazines',id))
    show('Magazine deleted',{type:'success'}); load()
  }

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Magazines</h1>
          <p className="text-slate-500 text-sm">{items.length} editions published</p>
        </div>
        <Link to="/magazine/upload" className="flex items-center gap-2 px-4 py-2.5 bg-[#E63946] hover:bg-[#c62c38] text-white text-sm font-semibold rounded-xl transition shadow">
          <Plus size={16}/> Upload Magazine
        </Link>
      </div>

      {loading ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {Array.from({length:4}).map((_,i)=>(
            <div key={i} className="bg-white rounded-2xl border border-slate-100 overflow-hidden">
              <div className="skeleton h-44" /><div className="p-3 space-y-2"><div className="skeleton h-4 w-3/4"/><div className="skeleton h-3 w-1/2"/></div>
            </div>
          ))}
        </div>
      ) : items.length === 0 ? (
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm py-16 text-center text-slate-400">
          <BookOpen size={40} className="mx-auto mb-2 opacity-30"/>
          <p>No magazines uploaded yet</p>
          <Link to="/magazine/upload" className="mt-2 inline-block text-sm text-[#E63946] font-semibold">Upload first edition →</Link>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {items.map(item=>(
            <div key={item.id} className="card-lift bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
              {item.coverUrl
                ? <img src={item.coverUrl} alt={item.title} className="w-full h-44 object-cover"/>
                : <div className="w-full h-44 bg-slate-100 flex items-center justify-center"><BookOpen size={32} className="text-slate-300"/></div>}
              <div className="p-4">
                <h3 className="font-bold text-slate-800 text-sm truncate">{item.title}</h3>
                {item.issueNo && <p className="text-xs text-slate-500 mt-0.5">{item.issueNo}</p>}
                {item.pubDate && <p className="text-xs text-slate-400 mt-0.5">{item.pubDate}</p>}
                <div className="flex items-center gap-2 mt-3">
                  {item.fileUrl && (
                    <a href={item.fileUrl} target="_blank" rel="noreferrer" className="flex items-center gap-1 text-xs text-[#E63946] font-semibold hover:underline">
                      <ExternalLink size={12}/> Open PDF
                    </a>
                  )}
                  <Link to={`/magazine/edit/${item.id}`} className="ml-auto p-1.5 rounded-lg text-slate-400 hover:bg-blue-50 hover:text-blue-600 transition"><Edit2 size={13}/></Link>
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
