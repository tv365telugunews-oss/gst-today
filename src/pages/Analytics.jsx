import { BarChart2, TrendingUp, Users, Eye } from 'lucide-react'

function StatTile({ icon: Icon, label, value, color }) {
  return (
    <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5 flex items-center gap-4">
      <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${color}`}>
        <Icon size={22} className="text-white" />
      </div>
      <div>
        <p className="text-slate-500 text-sm">{label}</p>
        <p className="text-2xl font-bold text-slate-800 mt-0.5">{value}</p>
      </div>
    </div>
  )
}

export default function Analytics() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-800">Analytics</h1>
        <p className="text-slate-500 text-sm">Connect Firebase Analytics to see real-time data</p>
      </div>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatTile icon={Eye} label="Total Views" value="—" color="bg-teal-500" />
        <StatTile icon={TrendingUp} label="Trending Posts" value="—" color="bg-orange-500" />
        <StatTile icon={Users} label="Active Users" value="—" color="bg-sky-500" />
        <StatTile icon={BarChart2} label="Avg. Session" value="—" color="bg-violet-600" />
      </div>
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-8 text-center text-slate-400">
        <BarChart2 size={44} className="mx-auto mb-3 opacity-30" />
        <p className="font-semibold text-slate-600">Analytics coming soon</p>
        <p className="text-sm mt-1">Enable Firebase Analytics in your Firebase Console to see live data here.</p>
      </div>
    </div>
  )
}
