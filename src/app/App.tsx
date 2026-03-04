import { RouterProvider } from 'react-router';
import { router } from './routes';
import { AdminAuthProvider } from './contexts/AdminAuthContext';
import { Toaster } from 'sonner';

export default function App() {
  return (
    <AdminAuthProvider>
      <RouterProvider router={router} />
      <Toaster position="top-center" richColors />
    </AdminAuthProvider>
  );
}