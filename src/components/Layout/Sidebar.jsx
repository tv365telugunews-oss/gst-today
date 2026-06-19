import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import {
  LayoutDashboard, Newspaper, PlusCircle, List, Tag, Zap, Clock,
  BookOpen, Upload, Edit3, Video, Play, Image, FileText, HardDrive,
  BarChart2, TrendingUp, Users, Settings, LogOut, ChevronDown, ChevronRight, X
} from 'lucide-react'

const groups = [
  {
    label: 'MAIN',
    items: [
      { to: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    ],
  },
  {
    label: 'NEWS MANAGEMENT',
    items: [
      { to: '/news/add', icon: PlusCircle, label: 'Add News' },
      { to: '/news/list', icon: List, label: 'News List' },
      { to: '/news/categories', icon: Tag, label: 'Categories' },
      { to: '/news/breaking', icon: Zap, label: 'Breaking News' },
      { to: '/news/scheduled', icon: Clock, label: 'Scheduled Posts' },
    ],
  },
  {
    label: 'MAGAZINE',
    items: [
      { to: '/magazine/upload', icon: Upload, label: 'Upload Magazine' },
      { to: '/magazine/list', icon: BookOpen, label: 'Magazine List' },
    ],
  },
  {
    label: 'VIDEO',
    items: [
      { to: '/video/add', icon: PlusCircle, label: 'Add YouTube Video' },
      { to: '/video/list', icon: Play, label: 'Video Gallery' },
    ],
  },
  {
    label: 'MEDIA LIBRARY',
    items: [
      { to: '/media/images', icon: Image, label: 'Images' },
      { to: '/media/documents', icon: FileText, label: 'Documents' },
      { to: '/media/upload', icon: HardDrive, label: 'Upload Center' },
    ],
  },
  {
    label: 'ANALYTICS',
    items: [
      { to: '/analytics', icon: BarChart2, label: 'Overview' },
      { to: '/analytics/trending', icon: TrendingUp, label: 'Trending News' },
      { to: '/analytics/users', icon: Users, label: 'User Statistics' },
    ],
  },
  {
    label: 'SETTINGS',
    items: [
      { to: '/settings', icon: Settings, label: 'App Settings' },
    ],
  },
]

function NavGroup({ group, collapsed }) {
  const [open, setOpen] = useState(true)
  return (
    <div className="mb-1">
      {!collapsed && (
        <button
          onClick={() => setOpen(o => !o)}
          className="flex items-center justify-between w-full px-3 py-1.5 text-xs font-bold tracking-widest text-slate-400 hover:text-slate-300 transition-colors"
        >
          <span>{group.label}</span>
          {open ? <ChevronDown size={12} /> : <ChevronRight size={12} />}
        </button>
      )}
      {(open || collapsed) && (
        <ul className="space-y-0.5">
          {group.items.map(({ to, icon: Icon, label }) => (
            <li key={to}>
              <NavLink
                to={to}
                className={({ isActive }) =>
                  `sidebar-link flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-150 ${
                    isActive
                      ? 'active'
                      : 'text-slate-300 hover:bg-white/10 hover:text-white'
                  }`
                }
              >
                <Icon size={17} className="shrink-0" />
                {!collapsed && <span>{label}</span>}
              </NavLink>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default function Sidebar({ open, onClose }) {
  const [collapsed, setCollapsed] = useState(false)

  return (
    <>
      {/* Mobile overlay */}
      {open && (
        <div
          className="fixed inset-0 bg-black/50 z-30 lg:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={`
          fixed top-0 left-0 h-screen z-40 flex flex-col
          bg-gradient-to-b from-[#1D3557] to-[#0f1e30]
          shadow-2xl transition-all duration-300 ease-in-out
          ${collapsed ? 'w-[64px]' : 'w-[240px]'}
          ${open ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        `}
      >
        {/* Logo */}
        <div className="flex items-center justify-between px-4 py-4 border-b border-white/10 shrink-0">
          {!collapsed && (
            <div className="flex items-center gap-2 min-w-0">
              <div className="w-8 h-8 rounded-lg bg-[#E63946] flex items-center justify-center shrink-0">
                <Newspaper size={16} className="text-white" />
              </div>
              <div className="min-w-0">
                <p className="text-white font-bold text-sm leading-tight truncate">GST TODAY TV</p>
                <p className="text-slate-400 text-[10px] truncate">India's Smart News Platform</p>
              </div>
            </div>
          )}
          {collapsed && (
            <div className="w-8 h-8 rounded-lg bg-[#E63946] flex items-center justify-center mx-auto">
              <Newspaper size={16} className="text-white" />
            </div>
          )}
          <button
            onClick={onClose}
            className="lg:hidden text-slate-400 hover:text-white ml-2"
          >
            <X size={18} />
          </button>
        </div>

        {/* Nav */}
        <nav className="flex-1 overflow-y-auto px-2 py-3 space-y-1">
          {groups.map(g => (
            <NavGroup key={g.label} group={g} collapsed={collapsed} />
          ))}
        </nav>

        {/* Collapse toggle (desktop) */}
        <button
          onClick={() => setCollapsed(c => !c)}
          className="hidden lg:flex items-center justify-center h-10 border-t border-white/10 text-slate-400 hover:text-white text-xs gap-1 shrink-0"
        >
          {collapsed ? <ChevronRight size={14} /> : <ChevronDown size={14} />}
          {!collapsed && <span>Collapse</span>}
        </button>
      </aside>

      {/* Spacer so main doesn't go under sidebar */}
      <div
        className={`hidden lg:block shrink-0 transition-all duration-300 ${collapsed ? 'w-[64px]' : 'w-[240px]'}`}
      />
    </>
  )
}
