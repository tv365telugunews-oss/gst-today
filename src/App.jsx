import { useState } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { ToastProvider } from './components/Toast'
import { ConfirmProvider } from './components/Confirm'
import AdminLayout from './components/Layout/AdminLayout'
import LoginPage from './pages/Login.jsx'
import Dashboard from './pages/Dashboard.jsx'
import NewsUpload from './pages/NewsUpload.jsx'
import NewsList from './pages/NewsList.jsx'
import NewsEdit from './pages/NewsEdit.jsx'
import MagazineUpload from './pages/MagazineUpload.jsx'
import MagazineList from './pages/MagazineList.jsx'
import MagazineEdit from './pages/MagazineEdit.jsx'
import VideoUpload from './pages/VideoUpload.jsx'
import VideoList from './pages/VideoList.jsx'
import VideoEdit from './pages/VideoEdit.jsx'
import MediaLibrary from './pages/MediaLibrary.jsx'
import Analytics from './pages/Analytics.jsx'
import Settings from './pages/Settings.jsx'
import './App.css'

// Stub pages for sidebar links not fully built yet
function ComingSoon({ label }) {
  return (
    <div className="flex flex-col items-center justify-center h-64 text-slate-400">
      <p className="text-4xl mb-3">🚧</p>
      <p className="font-semibold text-slate-600">{label}</p>
      <p className="text-sm mt-1">Coming soon</p>
    </div>
  )
}

function Protected({ user, children }) {
  return user ? children : <Navigate to="/" replace />
}

function AdminWrapped({ user, onLogout, children }) {
  if (!user) return <Navigate to="/" replace />
  return <AdminLayout onLogout={onLogout}>{children}</AdminLayout>
}

function App() {
  const [user, setUser] = useState(() => localStorage.getItem('adminUser') || '')

  function handleLogin(username, password) {
    const ok = username === 'admin' && password === 'gst123'
    if (ok) { localStorage.setItem('adminUser', username); setUser(username) }
    return ok
  }

  function handleLogout() {
    localStorage.removeItem('adminUser')
    setUser('')
  }

  const wrap = (el) => <AdminWrapped user={user} onLogout={handleLogout}>{el}</AdminWrapped>

  return (
    <ToastProvider>
      <ConfirmProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={user ? <Navigate to="/dashboard" replace /> : <LoginPage onLogin={handleLogin} />} />

            {/* Dashboard */}
            <Route path="/dashboard" element={wrap(<Dashboard />)} />

            {/* News */}
            <Route path="/news/add"            element={wrap(<NewsUpload />)} />
            <Route path="/news/list"           element={wrap(<NewsList />)} />
            <Route path="/news/edit/:id"       element={wrap(<NewsEdit />)} />
            <Route path="/news/categories"     element={wrap(<ComingSoon label="Categories" />)} />
            <Route path="/news/breaking"       element={wrap(<ComingSoon label="Breaking News" />)} />
            <Route path="/news/scheduled"      element={wrap(<ComingSoon label="Scheduled Posts" />)} />

            {/* Magazine */}
            <Route path="/magazine/upload"     element={wrap(<MagazineUpload />)} />
            <Route path="/magazine/list"       element={wrap(<MagazineList />)} />
            <Route path="/magazine/edit/:id"   element={wrap(<MagazineEdit />)} />

            {/* Video */}
            <Route path="/video/add"           element={wrap(<VideoUpload />)} />
            <Route path="/video/list"          element={wrap(<VideoList />)} />
            <Route path="/video/edit/:id"      element={wrap(<VideoEdit />)} />

            {/* Media */}
            <Route path="/media/images"        element={wrap(<MediaLibrary />)} />
            <Route path="/media/documents"     element={wrap(<MediaLibrary />)} />
            <Route path="/media/upload"        element={wrap(<MediaLibrary />)} />

            {/* Analytics */}
            <Route path="/analytics"           element={wrap(<Analytics />)} />
            <Route path="/analytics/trending"  element={wrap(<ComingSoon label="Trending News" />)} />
            <Route path="/analytics/users"     element={wrap(<ComingSoon label="User Statistics" />)} />

            {/* Settings */}
            <Route path="/settings"            element={wrap(<Settings />)} />

            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </BrowserRouter>
      </ConfirmProvider>
    </ToastProvider>
  )
}

export default App
