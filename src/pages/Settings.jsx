import { useState, useEffect } from 'react'
import { getRole, setRole } from '../auth'
import { useToast } from '../components/Toast'
import { Settings2, Shield, Bell, Database, Newspaper } from 'lucide-react'

function Section({ icon: Icon, title, children }) {
  return (
    <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
      <div className="flex items-center gap-3 px-5 py-4 border-b border-slate-100">
        <Icon size={18} className="text-[#E63946]" />
        <h3 className="font-bold text-slate-800">{title}</h3>
      </div>
      <div className="p-5 space-y-4">{children}</div>
    </div>
  )
}

export default function Settings() {
  const { show } = useToast()
  const [role, setLocalRole] = useState(getRole())
  const [siteName, setSiteName] = useState('GST TODAY TV')
  const [siteTagline, setSiteTagline] = useState("India's Smart News Platform")

  useEffect(() => setLocalRole(getRole()), [])

  const save = () => { setRole(role); show('Settings saved!', { type: 'success' }) }

  const Row = ({ label, children }) => (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
      <label className="text-sm font-semibold text-slate-700 shrink-0 sm:w-44">{label}</label>
      {children}
    </div>
  )

  return (
    <div className="max-w-2xl mx-auto space-y-5">
      <div>
        <h1 className="text-2xl font-bold text-slate-800">Settings</h1>
        <p className="text-slate-500 text-sm">Manage your admin panel configuration</p>
      </div>

      <Section icon={Newspaper} title="Site Settings">
        <Row label="Site Name">
          <input value={siteName} onChange={e=>setSiteName(e.target.value)} className="flex-1 px-4 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#E63946]/25 focus:border-[#E63946]"/>
        </Row>
        <Row label="Tagline">
          <input value={siteTagline} onChange={e=>setSiteTagline(e.target.value)} className="flex-1 px-4 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#E63946]/25 focus:border-[#E63946]"/>
        </Row>
      </Section>

      <Section icon={Shield} title="Access Control">
        <Row label="Current Role">
          <select value={role} onChange={e=>setLocalRole(e.target.value)} className="flex-1 px-4 py-2.5 border border-slate-200 rounded-xl text-sm bg-white focus:outline-none focus:ring-2 focus:ring-[#E63946]/25">
            <option value="admin">Admin – full access</option>
            <option value="editor">Editor – add/edit only</option>
            <option value="viewer">Viewer – read only</option>
          </select>
        </Row>
        <p className="text-xs text-slate-400">Role controls which actions are visible in the panel. In production, enforce roles via Firebase Security Rules.</p>
      </Section>

      <Section icon={Database} title="Firebase">
        <p className="text-sm text-slate-500">Firebase credentials are set via Vite environment variables (<code className="bg-slate-100 px-1 rounded">VITE_FIREBASE_*</code>). Update your <code className="bg-slate-100 px-1 rounded">.env.local</code> file and redeploy.</p>
        <div className="rounded-xl bg-slate-50 p-3 text-xs font-mono text-slate-600 space-y-1">
          <p>VITE_FIREBASE_API_KEY=...</p>
          <p>VITE_FIREBASE_AUTH_DOMAIN=...</p>
          <p>VITE_FIREBASE_PROJECT_ID=...</p>
          <p>VITE_FIREBASE_STORAGE_BUCKET=...</p>
          <p>VITE_FIREBASE_MESSAGING_SENDER_ID=...</p>
          <p>VITE_FIREBASE_APP_ID=...</p>
        </div>
      </Section>

      <Section icon={Bell} title="Notifications">
        <Row label="Breaking News Alerts">
          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-400">Coming soon</span>
          </div>
        </Row>
      </Section>

      <button onClick={save} className="w-full py-3 bg-[#E63946] hover:bg-[#c62c38] text-white font-semibold rounded-xl transition shadow">
        Save Settings
      </button>
    </div>
  )
}
