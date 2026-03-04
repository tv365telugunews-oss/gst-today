import { useNavigate } from 'react-router';
import { Home, ArrowLeft, Search } from 'lucide-react';

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#E53935] via-[#C62828] to-[#B71C1C] flex items-center justify-center p-4">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
          backgroundSize: '40px 40px'
        }} />
      </div>

      <div className="relative text-center max-w-md w-full">
        {/* 404 Icon */}
        <div className="mb-8">
          <div className="inline-flex items-center justify-center w-32 h-32 bg-white rounded-full shadow-2xl mb-6">
            <Search className="w-16 h-16 text-[#E53935]" />
          </div>
          
          <h1 className="text-8xl font-black text-white mb-4" style={{
            textShadow: '0 4px 20px rgba(0, 0, 0, 0.3)'
          }}>
            404
          </h1>
          
          <h2 className="text-3xl font-bold text-white mb-3">
            Page Not Found
          </h2>
          
          <p className="text-white/90 text-lg mb-8">
            Oops! The page you're looking for doesn't exist or has been moved.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3">
          <button
            onClick={() => navigate('/app')}
            className="w-full bg-white text-[#E53935] py-4 px-6 rounded-xl font-bold text-lg hover:bg-gray-100 transition-colors shadow-xl flex items-center justify-center space-x-3"
          >
            <Home className="w-6 h-6" />
            <span>Go to Home</span>
          </button>

          <button
            onClick={() => navigate(-1)}
            className="w-full bg-white/20 backdrop-blur-sm text-white py-4 px-6 rounded-xl font-semibold text-lg hover:bg-white/30 transition-colors border-2 border-white/30 flex items-center justify-center space-x-3"
          >
            <ArrowLeft className="w-6 h-6" />
            <span>Go Back</span>
          </button>
        </div>

        {/* Footer */}
        <div className="mt-8">
          <p className="text-white/70 text-sm">
            GST TODAY TV - Your trusted GST news partner
          </p>
        </div>
      </div>
    </div>
  );
}
