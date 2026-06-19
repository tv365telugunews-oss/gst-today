import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { db } from '../firebase'
import { collection, getDocs } from 'firebase/firestore'
import {
  Newspaper, Video, BookOpen, Zap, Eye, Users,
  TrendingUp, PlusCircle, List, Upload, Play, ArrowUpRight
} from 'lucide-react'

function StatCard({ icon: Icon, label, value, sub, color, to }) {
  const El = to ? Link : 'div'
  return (
    <El to={to}
      className={`card-lift bg-white rounded-2xl p-5 border border-slate-100 shadow-sm flex items-start gap-4 ${to ? 'cursor-pointer' : ''}`}
    >
      <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${color}`}>
        <Icon size={22} className="text-white" />
      </div>
      <div className="min-w-0 flex-1">
        <p className="text-slate-500 text-sm">{label}</p>
        <p className="text-2xl font-bold text-slate-800 mt-0.5">{value}</p>
        {sub && <p className="text-xs text-emerald-500 font-medium mt-1">{sub}</p>}
      </div>
      {to && <ArrowUpRight size={16} className="text-slate-300 shrink-0 mt-1" />}
    </El>
  )
}

function Skeleton() {
  return (
    <div className="bg-white rounded-2xl p-5 border border-slate-100">
      <div className="flex gap-4">
        <div className="skeleton w-12 h-12 rounded-xl" />
        <div className="flex-1 space-y-2 pt-1">
          <div className="skeleton h-3 w-24" />
          <div className="skeleton h-6 w-16" />
        </div>
      </div>
    </div>
  )
}

function QuickAction({ icon: Icon, label, to, color }) {
  return (
    <Link to={to}
      className="card-lift flex flex-col items-center gap-2 p-4 bg-white rounded-2xl border border-slate-100 shadow-sm text-center"
    >
      <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${color}`}>
        <Icon size={18} className="text-white" />
      </div>
      <span className="text-xs font-semibold text-slate-700 leading-tight">{label}</span>
    </Link>
  )
}

export default function Dashboard() {
  const [stats, setStats] = useState({ news: '—', videos: '—', magazines: '—', breaking: '—' })
  const [loading, setLoading] = useState(true)
  const [recent, setRecent] = useState([])

  useEffect(() => {
    const load = async () => {
      try {
        const [newsSnap, vidSnap, magSnap] = await Promise.all([
          getDocs(collection(db, 'news')),
          getDocs(collection(db, 'videos')),
          getDocs(collection(db, 'magazines')),
        ])
        const newsDocs = newsSnap.docs.map(d => ({ id: d.id, ...d.data() }))
        const breaking = newsDocs.filter(n => n.breaking).length
        setStats({ news: newsSnap.size, videos: vidSnap.size, magazines: magSnap.size, breaking })
        setRecent(newsDocs.sort((a, b) => (b.createdAt?.seconds || 0) - (a.createdAt?.seconds || 0)).slice(0, 6))
      } catch {/* ignore */}
      setLoading(false)
    }
    load()
  }, [])

  const today = new Date().toLocaleDateString('en-IN', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Dashboard</h1>
          <p className="text-slate-500 text-sm mt-0.5">{today}</p>
        </div>
        <Link to="/news/add"
          className="flex items-center gap-2 px-4 py-2.5 bg-[#E63946] hover:bg-[#c62c38] text-white text-sm font-semibold rounded-xl transition shadow"
        >
          <PlusCircle size={16} /> Add News
        </Link>
      </div>

      {/* Primary stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {loading ? Array.from({ length: 4 }).map((_, i) => <Skeleton key={i} />) : (
          <>
            <StatCard icon={Newspaper} label="Total News" value={stats.news} sub="All published" color="bg-[#E63946]" to="/news/list" />
            <StatCard icon={Zap}       label="Breaking"   value={stats.breaking} color="bg-orange-500" to="/news/breaking" />
            <StatCard icon={Video}     label="Videos"     value={stats.videos}   color="bg-violet-600" to="/video/list" />
            <StatCard icon={BookOpen}  label="Magazines"  value={stats.magazines} color="bg-[#1D3557]" to="/magazine/list" />
          </>
        )}
      </div>

      {/* Secondary stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard icon={Eye}         label="Total Views"    value="—" sub="Link Firebase Analytics" color="bg-teal-500" />
        <StatCard icon={Users}       label="Active Users"   value="—" color="bg-sky-500" />
        <StatCard icon={TrendingUp}  label="Trending Posts" value="—" color="bg-amber-500" />
        <StatCard icon={Newspaper}   label="Today's News"   value="—" color="bg-pink-500" />
      </div>

      {/* Quick actions */}
      <div>
        <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">Quick Actions</p>
        <div className="grid grid-cols-4 sm:grid-cols-6 lg:grid-cols-8 gap-3">
          <QuickAction icon={PlusCircle} label="Add News"     to="/news/add"       color="bg-[#E63946]" />
          <QuickAction icon={List}       label="News List"    to="/news/list"      color="bg-[#1D3557]" />
          <QuickAction icon={Zap}        label="Breaking"     to="/news/breaking"  color="bg-orange-500" />
          <QuickAction icon={Upload}     label="Upload Mag"   to="/magazine/upload" color="bg-teal-600" />
          <QuickAction icon={BookOpen}   label="Magazines"    to="/magazine/list"  color="bg-indigo-600" />
          <QuickAction icon={Play}       label="Add Video"    to="/video/add"      color="bg-violet-600" />
          <QuickAction icon={Play}       label="Videos"       to="/video/list"     color="bg-pink-600" />
          <QuickAction icon={Upload}     label="Media"        to="/media/upload"   color="bg-amber-500" />
        </div>
      </div>

      {/* Recent news */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
        <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100">
          <h2 className="font-bold text-slate-800">Recent News</h2>
          <Link to="/news/list" className="text-sm text-[#E63946] font-semibold hover:underline flex items-center gap-1">
            View all <ArrowUpRight size={14} />
          </Link>
        </div>
        {loading ? (
          <div className="p-5 space-y-3">{Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="flex gap-3">
              <div className="skeleton h-4 w-3/4" />
              <div className="skeleton h-4 w-1/4" />
            </div>
          ))}</div>
        ) : recent.length === 0 ? (
          <div className="py-14 text-center text-slate-400">
            <Newspaper size={38} className="mx-auto mb-2 opacity-30" />
            <p className="mb-2">No news published yet</p>
            <Link to="/news/add" className="text-sm text-[#E63946] font-semibold">Add your first story →</Link>
          </div>
        ) : (
          <table className="w-full text-sm">
            <thead className="bg-slate-50 text-slate-500 text-xs font-semibold uppercase tracking-wide">
              <tr>
                <th className="px-5 py-3 text-left">Title</th>
                <th className="px-5 py-3 text-left hidden md:table-cell">Category</th>
                <th className="px-5 py-3 text-left hidden sm:table-cell">Date</th>
                <th className="px-5 py-3 text-left">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {recent.map(item => (
                <tr key={item.id} className="hover:bg-slate-50 transition">
                  <td className="px-5 py-3.5 font-medium text-slate-800 max-w-xs truncate">{item.title || '—'}</td>
                  <td className="px-5 py-3.5 text-slate-500 hidden md:table-cell capitalize">{item.category || '—'}</td>
                  <td className="px-5 py-3.5 text-slate-500 hidden sm:table-cell">
                    {item.createdAt?.toDate ? item.createdAt.toDate().toLocaleDateString('en-IN') : '—'}
                  </td>
                  <td className="px-5 py-3.5">
                    {item.breaking
                      ? <span className="px-2 py-0.5 rounded-full bg-red-100 text-red-600 text-xs font-semibold">Breaking</span>
                      : <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-700 text-xs font-semibold">Published</span>}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  )
}
