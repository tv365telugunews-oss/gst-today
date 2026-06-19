import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Newspaper, Lock, User } from 'lucide-react'

function LoginPage({ onLogin }) {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()

  function handleSubmit(e) {
    e.preventDefault()
    setError('')
    if (onLogin(username.trim(), password.trim())) {
      navigate('/dashboard')
    } else {
      setError('Invalid username or password')
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1D3557] to-[#0f1e30] flex items-center justify-center p-4">
      <div className="w-full max-w-sm">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 rounded-2xl bg-[#E63946] flex items-center justify-center mx-auto mb-4 shadow-lg">
            <Newspaper size={30} className="text-white" />
          </div>
          <h1 className="text-2xl font-extrabold text-white tracking-tight">GST TODAY TV</h1>
          <p className="text-slate-400 text-sm mt-1">India's Smart News Platform</p>
        </div>

        {/* Card */}
        <div className="bg-white rounded-3xl shadow-2xl p-8">
          <h2 className="text-xl font-bold text-slate-800 mb-1">Welcome back</h2>
          <p className="text-slate-400 text-sm mb-6">Sign in to access your CMS</p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1.5">Username</label>
              <div className="relative">
                <User size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text" value={username} onChange={e => setUsername(e.target.value)}
                  placeholder="admin" required
                  className="w-full pl-9 pr-4 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#E63946]/25 focus:border-[#E63946] transition"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1.5">Password</label>
              <div className="relative">
                <Lock size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="password" value={password} onChange={e => setPassword(e.target.value)}
                  placeholder="••••••••" required
                  className="w-full pl-9 pr-4 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#E63946]/25 focus:border-[#E63946] transition"
                />
              </div>
            </div>
            {error && (
              <div className="px-4 py-3 bg-red-50 border border-red-100 text-red-600 text-sm rounded-xl">{error}</div>
            )}
            <button type="submit"
              className="w-full py-3 bg-[#E63946] hover:bg-[#c62c38] text-white font-bold rounded-xl transition shadow mt-2">
              Sign in
            </button>
          </form>

          <p className="text-center text-xs text-slate-400 mt-5">
            <strong>Demo:</strong> admin / gst123
          </p>
        </div>
      </div>
    </div>
  )
}

export default LoginPage
