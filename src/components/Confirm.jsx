import { createContext, useContext, useState } from 'react'
import { AlertTriangle } from 'lucide-react'

const ConfirmContext = createContext(null)

export function ConfirmProvider({ children }) {
  const [state, setState] = useState({ open: false, message: '', resolve: null })

  const showConfirm = (message) =>
    new Promise(res =>
      setState({ open: true, message, resolve: (val) => { res(val); setState({ open: false, message: '', resolve: null }) } })
    )

  const handle = (val) => { if (state.resolve) state.resolve(val) }

  return (
    <ConfirmContext.Provider value={{ showConfirm }}>
      {children}
      {state.open && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-[10000] p-4">
          <div className="bg-white rounded-2xl shadow-2xl p-6 max-w-sm w-full fade-in">
            <div className="flex items-start gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-red-100 flex items-center justify-center shrink-0">
                <AlertTriangle size={18} className="text-red-500" />
              </div>
              <div>
                <p className="font-bold text-slate-800">Confirm Action</p>
                <p className="text-sm text-slate-500 mt-1">{state.message}</p>
              </div>
            </div>
            <div className="flex gap-2 justify-end">
              <button onClick={() => handle(false)}
                className="px-4 py-2 rounded-xl border border-slate-200 text-sm font-semibold text-slate-600 hover:bg-slate-50 transition">
                Cancel
              </button>
              <button onClick={() => handle(true)}
                className="px-4 py-2 rounded-xl bg-[#E63946] text-white text-sm font-semibold hover:bg-[#c62c38] transition shadow">
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </ConfirmContext.Provider>
  )
}

export function useConfirm() {
  const ctx = useContext(ConfirmContext)
  if (!ctx) throw new Error('useConfirm must be inside ConfirmProvider')
  return ctx
}

export default ConfirmProvider
