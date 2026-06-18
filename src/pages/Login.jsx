import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function LoginPage({ onLogin }) {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()

  function handleSubmit(event) {
    event.preventDefault()
    setError('')

    if (onLogin(username.trim(), password.trim())) {
      navigate('/dashboard')
      return
    }

    setError('Invalid username or password')
  }

  return (
    <div className="page-layout login-page">
      <div className="login-card">
        <div className="brand">
          <span>GST</span>
          <strong>Admin Panel</strong>
        </div>
        <h1>Administrator Login</h1>
        <p>Use the credentials below to access the admin dashboard.</p>
        <form onSubmit={handleSubmit}>
          <label>
            Username
            <input
              type="text"
              value={username}
              onChange={(event) => setUsername(event.target.value)}
              placeholder="admin"
              required
            />
          </label>
          <label>
            Password
            <input
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder="••••••••"
              required
            />
          </label>
          {error && <div className="alert">{error}</div>}
          <button type="submit">Sign in</button>
        </form>
        <div className="hint">
          <strong>Hint:</strong> admin / gst123
        </div>
      </div>
    </div>
  )
}

export default LoginPage
