import { useState, useRef, useEffect } from 'react'
import { Bell, Search, Menu, ChevronDown, LogOut, Settings, User } from 'lucide-react'
import { getRole } from '../../auth'

export default function Header({ onMenuOpen, onLogout }) {
  const [profileOpen, setProfileOpen] = useState(false)
  const profileRef = useRef(null)
  const role = getRole()

  useEffect(() => {
    const handler = (e) => {
      if (profileRef.current && !profileRef.current.contains(e.target)) setProfileOpen(false)
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  return (
    <header className="sticky top-0 z-20 flex items-center gap-3 px-4 py-3 bg-white border-b border-slate-200 shadow-sm">
      {/* Mobile hamburger */}
      <button
        onClick={onMenuOpen}
        className="lg:hidden p-2 rounded-lg text-slate-500 hover:bg-slate-100"
      >
        <Menu size={20} />
      </button>

      {/* Search */}
      <div className="flex-1 max-w-sm relative">
        <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
        <input
          placeholder="Search news, magazines…"
          className="w-full pl-9 pr-4 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#E63946]/30 focus:border-[#E63946] transition"
        />
      </div>

      <div className="flex items-center gap-2 ml-auto">
        {/* Notification bell */}
        <button className="relative p-2 rounded-xl text-slate-500 hover:bg-slate-100 transition">
          <Bell size={20} />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-[#E63946]" />
        </button>

        {/* Profile dropdown */}
        <div className="relative" ref={profileRef}>
          <button
            onClick={() => setProfileOpen(o => !o)}
            className="flex items-center gap-2 pl-2 pr-3 py-1.5 rounded-xl hover:bg-slate-100 transition"
          >
            <div className="w-8 h-8 rounded-full bg-[#E63946] flex items-center justify-center text-white font-bold text-sm">
              A
            </div>
            <div className="hidden sm:block text-left">
              <p className="text-sm font-semibold text-slate-800 leading-tight">Admin</p>
              <p className="text-xs text-slate-400 capitalize">{role}</p>
            </div>
            <ChevronDown size={14} className="text-slate-400" />
          </button>

          {profileOpen && (
            <div className="absolute right-0 top-full mt-2 w-44 bg-white rounded-xl shadow-lg border border-slate-100 py-1 z-50 fade-in">
              <button className="flex items-center gap-2 w-full px-4 py-2.5 text-sm text-slate-700 hover:bg-slate-50">
                <User size={15} /> Profile
              </button>
              <button className="flex items-center gap-2 w-full px-4 py-2.5 text-sm text-slate-700 hover:bg-slate-50">
                <Settings size={15} /> Settings
              </button>
              <div className="my-1 border-t border-slate-100" />
              <button
                onClick={onLogout}
                className="flex items-center gap-2 w-full px-4 py-2.5 text-sm text-red-500 hover:bg-red-50"
              >
                <LogOut size={15} /> Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}
