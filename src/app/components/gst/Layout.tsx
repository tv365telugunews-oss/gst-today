import { Outlet, useLocation, useNavigate } from 'react-router';
import { Home, Tv, FileText, BookOpen, User } from 'lucide-react';

export default function Layout() {
  const location = useLocation();
  const navigate = useNavigate();

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

  return (
    <div className="flex flex-col h-screen bg-white">
      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        <Outlet />
      </main>

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
