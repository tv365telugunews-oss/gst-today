import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router';
import { Tv, Newspaper, Calendar, Wrench, Bell, Video, ChevronRight, Gavel, FileText, Scale, LogOut } from 'lucide-react';

const categories = ['INDIA', 'GLOBAL', 'Business', 'Markets', 'SUCCESS', 'CHAMBER', 'AWARDS'];

const adBanners = [
  {
    id: 1,
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=400&fit=crop',
    title: 'GST Compliance Made Easy',
    subtitle: 'Get Expert Guidance Today',
    bgColor: 'from-blue-600 to-blue-800',
  },
  {
    id: 2,
    image: 'https://images.unsplash.com/photo-1554224311-beee460c201f?w=800&h=400&fit=crop',
    title: 'File Returns in Minutes',
    subtitle: 'Trusted by 10,000+ Businesses',
    bgColor: 'from-green-600 to-green-800',
  },
  {
    id: 3,
    image: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=800&h=400&fit=crop',
    title: 'GST Software Solutions',
    subtitle: 'Automate Your Tax Management',
    bgColor: 'from-purple-600 to-purple-800',
  },
  {
    id: 4,
    image: 'https://images.unsplash.com/photo-1551836022-deb4988cc6c0?w=800&h=400&fit=crop',
    title: 'E-Invoice Integration',
    subtitle: 'Seamless & Secure Platform',
    bgColor: 'from-red-600 to-red-800',
  },
];

const allArticles = [
  // INDIA Category
  {
    id: 1,
    title: 'GST Rate Changes Effective from April 2026',
    category: 'INDIA',
    image: 'https://images.unsplash.com/photo-1554224311-beee460c201f?w=400&h=300&fit=crop',
    date: 'Feb 10, 2026',
  },
  {
    id: 2,
    title: 'New E-Invoice Rules for Indian Businesses',
    category: 'INDIA',
    image: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=400&h=300&fit=crop',
    date: 'Feb 9, 2026',
  },
  {
    id: 3,
    title: 'Input Tax Credit Guidelines Updated by CBIC',
    category: 'INDIA',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=300&fit=crop',
    date: 'Feb 8, 2026',
  },
  // GLOBAL Category
  {
    id: 4,
    title: 'Global Tax Reform: OECD Updates Guidelines',
    category: 'GLOBAL',
    image: 'https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?w=400&h=300&fit=crop',
    date: 'Feb 10, 2026',
  },
  {
    id: 5,
    title: 'International VAT Compliance Standards 2026',
    category: 'GLOBAL',
    image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=400&h=300&fit=crop',
    date: 'Feb 9, 2026',
  },
  {
    id: 6,
    title: 'Cross-Border Tax Rules Simplified',
    category: 'GLOBAL',
    image: 'https://images.unsplash.com/photo-1569025690938-a00729c9e1f9?w=400&h=300&fit=crop',
    date: 'Feb 8, 2026',
  },
  // Business Category
  {
    id: 7,
    title: 'Small Business Tax Benefits Announced',
    category: 'Business',
    image: 'https://images.unsplash.com/photo-1556155092-490a1ba16284?w=400&h=300&fit=crop',
    date: 'Feb 10, 2026',
  },
  {
    id: 8,
    title: 'Startup GST Registration Made Easier',
    category: 'Business',
    image: 'https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=400&h=300&fit=crop',
    date: 'Feb 9, 2026',
  },
  {
    id: 9,
    title: 'Business Compliance Checklist 2026',
    category: 'Business',
    image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=400&h=300&fit=crop',
    date: 'Feb 8, 2026',
  },
  // Markets Category
  {
    id: 10,
    title: 'Stock Market Impact of New Tax Policies',
    category: 'Markets',
    image: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=400&h=300&fit=crop',
    date: 'Feb 10, 2026',
  },
  {
    id: 11,
    title: 'Trading Sector GST Updates',
    category: 'Markets',
    image: 'https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?w=400&h=300&fit=crop',
    date: 'Feb 9, 2026',
  },
  {
    id: 12,
    title: 'Commodity Markets Tax Implications',
    category: 'Markets',
    image: 'https://images.unsplash.com/photo-1535320903710-d993d3d77d29?w=400&h=300&fit=crop',
    date: 'Feb 8, 2026',
  },
  // SUCCESS Category
  {
    id: 13,
    title: 'Success Story: From Startup to GST Expert',
    category: 'SUCCESS',
    image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=300&fit=crop',
    date: 'Feb 10, 2026',
  },
  {
    id: 14,
    title: 'Entrepreneur Builds Million-Dollar Tax Firm',
    category: 'SUCCESS',
    image: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=400&h=300&fit=crop',
    date: 'Feb 9, 2026',
  },
  {
    id: 15,
    title: 'How CA Firm Scaled Using Technology',
    category: 'SUCCESS',
    image: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?w=400&h=300&fit=crop',
    date: 'Feb 8, 2026',
  },
  // CHAMBER Category
  {
    id: 16,
    title: 'Chamber of Commerce GST Summit 2026',
    category: 'CHAMBER',
    image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=400&h=300&fit=crop',
    date: 'Feb 10, 2026',
  },
  {
    id: 17,
    title: 'Industry Leaders Discuss Tax Reforms',
    category: 'CHAMBER',
    image: 'https://images.unsplash.com/photo-1511578314322-379afb476865?w=400&h=300&fit=crop',
    date: 'Feb 9, 2026',
  },
  {
    id: 18,
    title: 'Trade Association Proposes GST Amendments',
    category: 'CHAMBER',
    image: 'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=400&h=300&fit=crop',
    date: 'Feb 8, 2026',
  },
  // AWARDS Category
  {
    id: 19,
    title: 'Best GST Practitioner Awards 2026',
    category: 'AWARDS',
    image: 'https://images.unsplash.com/photo-1579952363873-27f3bade9f55?w=400&h=300&fit=crop',
    date: 'Feb 10, 2026',
  },
  {
    id: 20,
    title: 'Excellence in Tax Compliance Recognized',
    category: 'AWARDS',
    image: 'https://images.unsplash.com/photo-1567427017947-545c5f8d16ad?w=400&h=300&fit=crop',
    date: 'Feb 9, 2026',
  },
  {
    id: 21,
    title: 'National CA Awards Ceremony Highlights',
    category: 'AWARDS',
    image: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=400&h=300&fit=crop',
    date: 'Feb 8, 2026',
  },
];

export default function HomePage() {
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState('INDIA');
  const [currentAdIndex, setCurrentAdIndex] = useState(0);
  const [showExitToast, setShowExitToast] = useState(false);
  const lastBackPress = useRef<number>(0);
  const exitToastTimer = useRef<NodeJS.Timeout | null>(null);
  const adRef = useRef<HTMLDivElement>(null);

  // Auto-rotate ads every 4 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentAdIndex((prev) => (prev + 1) % adBanners.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  // Double tap to exit functionality
  useEffect(() => {
    const handleBackButton = (e: KeyboardEvent) => {
      // Detect back button or Escape key
      if (e.key === 'Escape' || e.key === 'Backspace') {
        e.preventDefault();
        handleBackPress();
      }
    };

    const handlePopState = () => {
      handleBackPress();
    };

    window.addEventListener('keydown', handleBackButton);
    window.addEventListener('popstate', handlePopState);

    return () => {
      window.removeEventListener('keydown', handleBackButton);
      window.removeEventListener('popstate', handlePopState);
      if (exitToastTimer.current) {
        clearTimeout(exitToastTimer.current);
      }
    };
  }, []);

  const handleBackPress = () => {
    const currentTime = Date.now();
    const timeDifference = currentTime - lastBackPress.current;

    if (timeDifference < 2000) {
      // Second press within 2 seconds - exit app
      if (exitToastTimer.current) {
        clearTimeout(exitToastTimer.current);
      }
      // Navigate to welcome screen (app exit simulation)
      navigate('/');
    } else {
      // First press - show toast
      lastBackPress.current = currentTime;
      setShowExitToast(true);

      // Hide toast after 2 seconds
      if (exitToastTimer.current) {
        clearTimeout(exitToastTimer.current);
      }
      exitToastTimer.current = setTimeout(() => {
        setShowExitToast(false);
      }, 2000);
    }
  };

  return (
    <div className="bg-[#F3F4F6] min-h-screen pb-20">
      {/* Header */}
      <header className="bg-[#E53935] text-white p-4 sticky top-0 z-10 shadow-md">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold">GST TODAY TV</h1>
            <p className="text-xs text-white/90">Your Daily GST Update</p>
          </div>
          <button 
            onClick={() => navigate('/app/notifications')}
            className="p-2 hover:bg-white/20 rounded-full transition-colors relative"
          >
            <Bell className="w-6 h-6" />
            {/* Notification Badge */}
            <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-yellow-400 rounded-full border-2 border-[#E53935]"></span>
          </button>
        </div>
      </header>

      {/* Category Tabs */}
      <section className="bg-white border-b border-[#E5E7EB] sticky top-[72px] z-10">
        <div className="overflow-x-auto scrollbar-hide" style={{ WebkitOverflowScrolling: 'touch' }}>
          <div className="flex space-x-2 p-3 min-w-max">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-4 py-2 rounded-full text-sm font-semibold whitespace-nowrap transition-all ${
                  activeCategory === category
                    ? 'bg-[#1976D2] text-white'
                    : 'bg-white border border-[#E5E7EB] text-[#6B7280] hover:border-[#1976D2]'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Advertisement Banner */}
      <section className="p-4">
        <div className="relative rounded-xl h-48 overflow-hidden shadow-lg">
          <img
            src={adBanners[currentAdIndex].image}
            alt="Advertisement"
            className="w-full h-full object-cover"
          />
          <div 
            className={`absolute inset-0 bg-gradient-to-r ${adBanners[currentAdIndex].bgColor} opacity-80`}
          ></div>
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6">
            <h3 className="text-white text-2xl font-bold mb-2">
              {adBanners[currentAdIndex].title}
            </h3>
            <p className="text-white/90 text-sm">
              {adBanners[currentAdIndex].subtitle}
            </p>
          </div>
          
          {/* Ad Indicator Dots */}
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex space-x-2">
            {adBanners.map((_, index) => (
              <div
                key={index}
                className={`w-2 h-2 rounded-full transition-all ${
                  index === currentAdIndex ? 'bg-white w-6' : 'bg-white/50'
                }`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Today's GST Video */}
      <section className="px-4 pb-4">
        <div
          onClick={() => navigate('/app/gst-tv/featured')}
          className="bg-gradient-to-br from-[#1976D2] to-[#1565C0] rounded-xl p-5 text-white shadow-lg cursor-pointer hover:shadow-xl transition-all active:scale-98"
        >
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
                <Video className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-base font-bold">Today's GST Video</h2>
                <p className="text-xs text-white/80">5 mins ago</p>
              </div>
            </div>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
            <h3 className="font-bold text-sm mb-1">
              GSTR-9 Annual Return Filing: Step by Step Guide
            </h3>
            <p className="text-xs text-white/80 line-clamp-2">
              Complete walkthrough of GSTR-9 filing process with practical examples and tips.
            </p>
            <div className="flex items-center justify-between mt-3">
              <span className="text-xs font-semibold">12:45 mins</span>
              <ChevronRight className="w-5 h-5" />
            </div>
          </div>
        </div>
      </section>

      {/* Quick Access */}
      <section className="px-4 pb-4">
        <h2 className="text-lg font-bold text-black mb-3">Quick Access</h2>
        <div className="grid grid-cols-4 gap-3">
          {/* Case Laws */}
          <button 
            onClick={() => navigate('/app/news')}
            className="flex flex-col items-center space-y-2 p-3 bg-white rounded-xl shadow-sm hover:shadow-md transition-all active:scale-95"
          >
            <div className="w-14 h-14 bg-[#14B8A6] rounded-full flex items-center justify-center">
              <Gavel className="w-7 h-7 text-white" />
            </div>
            <span className="text-xs font-semibold text-black text-center">CASE LAWS</span>
          </button>

          {/* Circulars */}
          <button 
            onClick={() => navigate('/app/news')}
            className="flex flex-col items-center space-y-2 p-3 bg-white rounded-xl shadow-sm hover:shadow-md transition-all active:scale-95"
          >
            <div className="w-14 h-14 bg-[#FFD700] rounded-full flex items-center justify-center">
              <FileText className="w-7 h-7 text-white" />
            </div>
            <span className="text-xs font-semibold text-black text-center">CIRCULARS</span>
          </button>

          {/* Due Dates */}
          <button 
            onClick={() => navigate('/app/due-dates')}
            className="flex flex-col items-center space-y-2 p-3 bg-white rounded-xl shadow-sm hover:shadow-md transition-all active:scale-95"
          >
            <div className="w-14 h-14 bg-[#F59E0B] rounded-full flex items-center justify-center">
              <Calendar className="w-7 h-7 text-white" />
            </div>
            <span className="text-xs font-semibold text-black text-center">Due Dates</span>
          </button>

          {/* Tools */}
          <button 
            onClick={() => navigate('/app/tools')}
            className="flex flex-col items-center space-y-2 p-3 bg-white rounded-xl shadow-sm hover:shadow-md transition-all active:scale-95"
          >
            <div className="w-14 h-14 bg-[#10B981] rounded-full flex items-center justify-center">
              <Wrench className="w-7 h-7 text-white" />
            </div>
            <span className="text-xs font-semibold text-black text-center">Tools</span>
          </button>
        </div>
      </section>

      {/* Latest Articles */}
      <section className="px-4 pb-4">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-lg font-bold text-black">
            Latest Articles - <span className="text-[#1976D2]">{activeCategory}</span>
          </h2>
          <button 
            onClick={() => navigate('/app/news')}
            className="text-[#E53935] text-sm font-semibold hover:underline"
          >
            View All →
          </button>
        </div>
        
        {/* Category Content */}
        {allArticles.filter((article) => article.category === activeCategory).length > 0 ? (
          <div className="overflow-x-auto scrollbar-hide -mx-4 px-4">
            <div className="flex space-x-3">
              {allArticles
                .filter((article) => article.category === activeCategory)
                .map((article) => (
                  <div
                    key={article.id}
                    onClick={() => navigate(`/app/news/${article.id}`)}
                    className="flex-shrink-0 w-64 bg-white rounded-xl shadow-sm hover:shadow-md transition-all cursor-pointer overflow-hidden"
                  >
                    <img
                      src={article.image}
                      alt={article.title}
                      className="w-full h-40 object-cover"
                    />
                    <div className="p-4">
                      <h3 className="font-bold text-sm text-black mb-2 line-clamp-2">
                        {article.title}
                      </h3>
                      <p className="text-xs text-[#6B7280]">{article.date}</p>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-xl p-8 text-center shadow-sm">
            <div className="text-gray-400 mb-2">
              <Newspaper className="w-12 h-12 mx-auto mb-3" />
            </div>
            <p className="text-gray-600 font-semibold">No articles in this category yet</p>
            <p className="text-gray-400 text-sm mt-1">Check back soon for updates!</p>
          </div>
        )}
      </section>

      {/* Exit Toast */}
      {showExitToast && (
        <div className="fixed bottom-5 left-1/2 -translate-x-1/2 bg-black/70 text-white px-4 py-2 rounded-full shadow-lg z-50">
          Press back again to exit
        </div>
      )}
    </div>
  );
}