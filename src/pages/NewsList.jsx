import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { db } from '../firebase'
import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore'
import { useToast } from '../components/Toast'
import { useConfirm } from '../components/Confirm'
import { getRole } from '../auth'
import { Search, Plus, Edit2, Trash2, Filter, ChevronLeft, ChevronRight, Newspaper } from 'lucide-react'

const PAGE_SIZE = 10

export default function NewsList() {
  const { show } = useToast()
  const { showConfirm } = useConfirm()
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [query, setQuery] = useState('')
  const [filterCat, setFilterCat] = useState('')
  const [page, setPage] = useState(1)
  const [selected, setSelected] = useState([])

  const load = async () => {
    setLoading(true)
    try {
      const snap = await getDocs(collection(db, 'news'))
      setItems(snap.docs.map(d => ({ id: d.id, ...d.data() })).sort((a, b) => (b.createdAt?.seconds || 0) - (a.createdAt?.seconds || 0)))
    } catch { show('Failed to load news', { type: 'error' }) }
    setLoading(false)
  }

  useEffect(() => { load() }, [])

  const remove = async (id) => {
    if (!await showConfirm('Delete this news item? This cannot be undone.')) return
    await deleteDoc(doc(db, 'news', id))
    show('News deleted', { type: 'success' })
    load()
  }

  const filtered = items.filter(i =>
    (i.title || '').toLowerCase().includes(query.toLowerCase()) &&
    (!filterCat || i.category === filterCat)
  )
  const cats = [...new Set(items.map(i => i.category).filter(Boolean))]
  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE))
  const paged = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE)

  const toggleSelect = (id) => setSelected(s => s.includes(id) ? s.filter(x => x !== id) : [...s, id])
  const toggleAll = () => setSelected(s => s.length === paged.length ? [] : paged.map(i => i.id))

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">News List</h1>
          <p className="text-slate-500 text-sm">{items.length} articles total</p>
        </div>
        <Link to="/news/add" className="flex items-center gap-2 px-4 py-2.5 bg-[#E63946] hover:bg-[#c62c38] text-white text-sm font-semibold rounded-xl transition shadow">
          <Plus size={16} /> Add News
        </Link>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-4 flex flex-wrap gap-3">
        <div className="relative flex-1 min-w-[200px]">
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            value={query} onChange={e => { setQuery(e.target.value); setPage(1) }}
            placeholder="Search news…"
            className="w-full pl-9 pr-4 py-2 text-sm border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#E63946]/25 focus:border-[#E63946]"
          />
        </div>
        <div className="flex items-center gap-2">
          <Filter size={15} className="text-slate-400" />
          <select value={filterCat} onChange={e => { setFilterCat(e.target.value); setPage(1) }}
            className="py-2 px-3 text-sm border border-slate-200 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-[#E63946]/25">
            <option value="">All Categories</option>
            {cats.map(c => <option key={c}>{c}</option>)}
          </select>
        </div>
        {selected.length > 0 && getRole() === 'admin' && (
          <button className="px-3 py-2 bg-red-50 text-red-600 text-sm font-semibold rounded-xl hover:bg-red-100 transition">
            Delete {selected.length} selected
          </button>
        )}
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
        {loading ? (
          <div className="p-6 space-y-3">{Array.from({length:5}).map((_,i)=>(
            <div key={i} className="flex gap-4">
              <div className="skeleton h-12 w-16 rounded-lg" />
              <div className="flex-1 space-y-1.5 pt-1">
                <div className="skeleton h-4 w-3/4" />
                <div className="skeleton h-3 w-1/3" />
              </div>
            </div>
          ))}</div>
        ) : paged.length === 0 ? (
          <div className="py-16 text-center text-slate-400">
            <Newspaper size={40} className="mx-auto mb-2 opacity-30" />
            <p>No news found</p>
          </div>
        ) : (
          <table className="w-full text-sm">
            <thead className="bg-slate-50 text-slate-500 text-xs font-semibold uppercase tracking-wide">
              <tr>
                <th className="px-4 py-3"><input type="checkbox" checked={selected.length === paged.length} onChange={toggleAll} className="rounded" /></th>
                <th className="px-4 py-3 text-left">Thumbnail</th>
                <th className="px-4 py-3 text-left">Title</th>
                <th className="px-4 py-3 text-left hidden md:table-cell">Category</th>
                <th className="px-4 py-3 text-left hidden lg:table-cell">Date</th>
                <th className="px-4 py-3 text-left">Status</th>
                <th className="px-4 py-3 text-left hidden sm:table-cell">Views</th>
                <th className="px-4 py-3 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {paged.map(item => (
                <tr key={item.id} className={`hover:bg-slate-50 transition ${selected.includes(item.id) ? 'bg-red-50/30' : ''}`}>
                  <td className="px-4 py-3">
                    <input type="checkbox" checked={selected.includes(item.id)} onChange={() => toggleSelect(item.id)} className="rounded" />
                  </td>
                  <td className="px-4 py-3">
                    {item.imageUrl
                      ? <img src={item.imageUrl} alt="" className="w-14 h-10 rounded-lg object-cover" />
                      : <div className="w-14 h-10 rounded-lg bg-slate-100 flex items-center justify-center"><Newspaper size={14} className="text-slate-300" /></div>}
                  </td>
                  <td className="px-4 py-3 font-medium text-slate-800 max-w-[200px]">
                    <p className="truncate">{item.title || '—'}</p>
                    {item.breaking && <span className="text-[10px] font-bold text-orange-500">⚡ BREAKING</span>}
                  </td>
                  <td className="px-4 py-3 text-slate-500 capitalize hidden md:table-cell">{item.category || '—'}</td>
                  <td className="px-4 py-3 text-slate-500 hidden lg:table-cell">
                    {item.createdAt?.toDate ? item.createdAt.toDate().toLocaleDateString('en-IN') : '—'}
                  </td>
                  <td className="px-4 py-3">
                    {item.status === 'draft'
                      ? <span className="px-2 py-0.5 rounded-full bg-amber-100 text-amber-700 text-xs font-semibold">Draft</span>
                      : <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-700 text-xs font-semibold">Published</span>}
                  </td>
                  <td className="px-4 py-3 text-slate-500 hidden sm:table-cell">{item.views || 0}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-center gap-1.5">
                      <Link to={`/news/edit/${item.id}`}
                        className="p-1.5 rounded-lg text-slate-500 hover:bg-blue-50 hover:text-blue-600 transition">
                        <Edit2 size={15} />
                      </Link>
                      {getRole() === 'admin' && (
                        <button onClick={() => remove(item.id)}
                          className="p-1.5 rounded-lg text-slate-500 hover:bg-red-50 hover:text-red-600 transition">
                          <Trash2 size={15} />
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        {/* Pagination */}
        {!loading && filtered.length > PAGE_SIZE && (
          <div className="flex items-center justify-between px-5 py-3 border-t border-slate-100">
            <p className="text-sm text-slate-500">Showing {((page-1)*PAGE_SIZE)+1}–{Math.min(page*PAGE_SIZE, filtered.length)} of {filtered.length}</p>
            <div className="flex items-center gap-1">
              <button onClick={() => setPage(p => Math.max(1, p-1))} disabled={page===1}
                className="p-1.5 rounded-lg text-slate-500 hover:bg-slate-100 disabled:opacity-30 transition"><ChevronLeft size={16}/></button>
              {Array.from({length:totalPages},(_,i)=>i+1).filter(p=>Math.abs(p-page)<=2).map(p=>(
                <button key={p} onClick={()=>setPage(p)}
                  className={`w-8 h-8 rounded-lg text-sm font-semibold transition ${p===page?'bg-[#E63946] text-white':'text-slate-600 hover:bg-slate-100'}`}>{p}</button>
              ))}
              <button onClick={() => setPage(p => Math.min(totalPages, p+1))} disabled={page===totalPages}
                className="p-1.5 rounded-lg text-slate-500 hover:bg-slate-100 disabled:opacity-30 transition"><ChevronRight size={16}/></button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
