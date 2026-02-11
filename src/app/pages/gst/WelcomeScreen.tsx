import { useEffect } from 'react';
import { useNavigate } from 'react-router';
import { ArrowUp } from 'lucide-react';

export default function WelcomeScreen() {
  const navigate = useNavigate();

  useEffect(() => {
    // Auto-navigate after 2 seconds
    const timer = setTimeout(() => {
      navigate('/login');
    }, 2000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4 relative overflow-hidden">
      {/* Border Frame */}
      <div className="absolute inset-0 border-8 border-[#E53935] rounded-3xl m-2"></div>

      {/* Content */}
      <div className="relative z-10 text-center">
        {/* Upward Arrow */}
        <div className="mb-8 flex justify-center">
          <div className="w-16 h-16 bg-gradient-to-b from-[#FF6B35] to-[#E53935] rounded-full flex items-center justify-center shadow-2xl animate-bounce">
            <ArrowUp className="w-10 h-10 text-white" strokeWidth={3} />
          </div>
        </div>

        {/* Welcome Text */}
        <div className="mb-12">
          <h1 
            className="text-7xl font-black uppercase mb-2 animate-fade-in"
            style={{
              background: 'linear-gradient(135deg, #FFD700 0%, #FFA500 50%, #FF6B35 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              textShadow: '4px 4px 8px rgba(229, 57, 53, 0.3)',
              filter: 'drop-shadow(2px 2px 4px rgba(229, 57, 53, 0.2))',
            }}
          >
            WELCOME
          </h1>
        </div>

        {/* Logo */}
        <div className="animate-fade-in" style={{ animationDelay: '0.3s' }}>
          <h2 
            className="text-5xl font-black uppercase transform -rotate-2"
            style={{
              color: '#E53935',
              textShadow: '3px 3px 0px rgba(0, 0, 0, 0.1), 6px 6px 0px rgba(229, 57, 53, 0.2)',
              letterSpacing: '2px',
            }}
          >
            GST TODAY TV
          </h2>
        </div>

        {/* Animated Upward Arrow Below Logo */}
        <div className="mt-12 flex justify-center opacity-80">
          <div className="w-12 h-12 bg-gradient-to-t from-[#FF6B35] to-[#E53935] rounded-full flex items-center justify-center shadow-lg animate-pulse">
            <ArrowUp className="w-6 h-6 text-white" strokeWidth={3} />
          </div>
        </div>
      </div>

      {/* Loading indicator */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2">
        <div className="flex space-x-2">
          <div className="w-2 h-2 bg-[#E53935] rounded-full animate-bounce" style={{ animationDelay: '0s' }}></div>
          <div className="w-2 h-2 bg-[#E53935] rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
          <div className="w-2 h-2 bg-[#E53935] rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
        </div>
      </div>
    </div>
  );
}
