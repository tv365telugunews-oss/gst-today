import { useState } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import LoginPage from './pages/Login.jsx'
import Dashboard from './pages/Dashboard.jsx'
import './App.css'

function App() {
  const [user, setUser] = useState(() => localStorage.getItem('adminUser') || '')

  function handleLogin(username, password) {
    const isValid = username === 'admin' && password === 'gst123'
    if (isValid) {
      localStorage.setItem('adminUser', username)
      setUser(username)
    }
    return isValid
  }

  function handleLogout() {
    localStorage.removeItem('adminUser')
    setUser('')
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            user ? <Navigate to="/dashboard" replace /> : <LoginPage onLogin={handleLogin} />
          }
        />
        <Route
          path="/dashboard"
          element={user ? <Dashboard onLogout={handleLogout} /> : <Navigate to="/" replace />}
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
