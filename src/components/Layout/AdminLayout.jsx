import { useState } from 'react'
import Sidebar from './Sidebar'
import Header from './Header'

export default function AdminLayout({ onLogout, children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="flex min-h-screen bg-[#F8FAFC]">
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div className="flex-1 flex flex-col min-w-0">
        <Header onMenuOpen={() => setSidebarOpen(true)} onLogout={onLogout} />
        <main className="flex-1 p-4 lg:p-6 fade-in">{children}</main>
      </div>
    </div>
  )
}
