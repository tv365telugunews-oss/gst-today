import { createContext, useCallback, useContext, useState } from 'react'
import { CheckCircle, AlertTriangle, Info, X } from 'lucide-react'

const ToastContext = createContext(null)

const ICONS = { success: CheckCircle, error: AlertTriangle, info: Info }
const COLORS = {
  success: 'bg-emerald-600',
  error: 'bg-[#E63946]',
  info: 'bg-[#1D3557]',
}

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([])

  const show = useCallback((message, opts = {}) => {
    const id = Date.now() + Math.random()
    setToasts(t => [...t, { id, message, type: opts.type || 'info' }])
    if (!opts.stay) setTimeout(() => setToasts(t => t.filter(x => x.id !== id)), opts.duration || 3200)
  }, [])

  const remove = useCallback((id) => setToasts(t => t.filter(x => x.id !== id)), [])

  return (
    <ToastContext.Provider value={{ show }}>
      {children}
      <div className="fixed top-4 right-4 z-[9999] flex flex-col gap-2 w-72">
        {toasts.map(t => {
          const Icon = ICONS[t.type] || Info
          return (
            <div key={t.id} role="status"
              className={`toast-enter flex items-start gap-3 px-4 py-3 rounded-2xl shadow-lg text-white text-sm font-medium ${COLORS[t.type] || COLORS.info}`}
            >
              <Icon size={17} className="shrink-0 mt-0.5" />
              <span className="flex-1">{t.message}</span>
              <button onClick={() => remove(t.id)} className="shrink-0 opacity-70 hover:opacity-100 transition">
                <X size={15} />
              </button>
            </div>
          )
        })}
      </div>
    </ToastContext.Provider>
  )
}

export function useToast() {
  const ctx = useContext(ToastContext)
  if (!ctx) throw new Error('useToast must be inside ToastProvider')
  return ctx
}

export default ToastProvider
