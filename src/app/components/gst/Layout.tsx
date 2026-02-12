import { Outlet, useLocation, useNavigate } from 'react-router';
import { Home, Tv, FileText, BookOpen, User } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';

export default function Layout() {
  const location = useLocation();
  const navigate = useNavigate();
  const [showExitToast, setShowExitToast] = useState(false);
  const lastBackPress = useRef<number>(0);

  const navItems = [
    { path: '/app', icon: Home, label: 'Home' },
    { path: '/app/short', icon: FileText, label: 'Short' },
    { path: '/app/gst-tv', icon: Tv, label: 'TV' },
    { path: '/app/magazine', icon: BookOpen, label: 'Magazine' },
    { path: '/app/profile', icon: User, label: 'Profile' },
  ];

  const isActive = (path: string) => {
    if (path === '/app') {
      return location.pathname === '/app';
    }
    return location.pathname.startsWith(path);
  };

  // Handle double-click/tap to exit
  useEffect(() => {
    const handleBackButton = (e: PopStateEvent) => {
      // Only on home page
      if (location.pathname === '/app') {
        const currentTime = new Date().getTime();
        const timeDiff = currentTime - lastBackPress.current;

        if (timeDiff < 2000) {
          // Double back press within 2 seconds - exit app
          if (window.confirm('Do you want to exit the app?')) {
            window.close();
            // Fallback for browsers that don't allow window.close()
            window.location.href = 'about:blank';
          }
        } else {
          // First back press
          lastBackPress.current = currentTime;
          setShowExitToast(true);
          setTimeout(() => setShowExitToast(false), 2000);
          
          // Prevent navigation
          window.history.pushState(null, '', window.location.pathname);
        }
      }
    };

    window.addEventListener('popstate', handleBackButton);
    
    // Push initial state
    window.history.pushState(null, '', window.location.pathname);

    return () => {
      window.removeEventListener('popstate', handleBackButton);
    };
  }, [location.pathname]);

  return (
    <div className="flex flex-col h-screen bg-white">
      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        <Outlet />
      </main>

      {/* Exit Toast */}
      {showExitToast && (
        <div className="fixed bottom-20 left-1/2 -translate-x-1/2 z-50 animate-fade-in">
          <div className="bg-gray-900 text-white px-6 py-3 rounded-full shadow-lg">
            <p className="text-sm font-medium">Press back again to exit</p>
          </div>
        </div>
      )}

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-[#E5E7EB] shadow-lg safe-area-bottom z-50">
        <div className="flex items-center justify-around h-16 max-w-md mx-auto px-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.path);
            
            return (
              <button
                key={item.path}
                onClick={() => navigate(item.path)}
                className="flex flex-col items-center justify-center flex-1 h-full space-y-1 transition-all active:scale-95"
              >
                <Icon
                  className={`w-6 h-6 transition-colors ${
                    active ? 'text-[#E53935]' : 'text-[#6B7280]'
                  }`}
                />
                <span
                  className={`text-xs font-medium transition-colors ${
                    active ? 'text-[#E53935]' : 'text-[#6B7280]'
                  }`}
                >
                  {item.label}
                </span>
              </button>
            );
          })}
        </div>
      </nav>
    </div>
  );
}