import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { Tv, Newspaper, Calendar, Wrench, Bell, Video, ChevronRight, Gavel, FileText, Scale } from 'lucide-react';

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

const latestArticles = [
  {
    id: 1,
    title: 'GST Rate Changes Effective from April 2026',
    image: 'https://images.unsplash.com/photo-1554224311-beee460c201f?w=400&h=300&fit=crop',
    date: 'Feb 10, 2026',
  },
  {
    id: 2,
    title: 'New E-Invoice Rules for Businesses',
    image: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=400&h=300&fit=crop',
    date: 'Feb 9, 2026',
  },
  {
    id: 3,
    title: 'Input Tax Credit Guidelines Updated',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=300&fit=crop',
    date: 'Feb 8, 2026',
  },
];

export default function HomePage() {
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState('INDIA');
  const [currentAdIndex, setCurrentAdIndex] = useState(0);

  // Auto-rotate ads every 4 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentAdIndex((prev) => (prev + 1) % adBanners.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-[#F3F4F6] min-h-screen pb-20">
      {/* Header */}
      <header className="bg-[#E53935] text-white p-4 sticky top-0 z-10 shadow-md">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold">GST TODAY TV</h1>
            <p className="text-xs text-white/90">Your Daily GST Update</p>
          </div>
          <button className="p-2 hover:bg-white/20 rounded-full transition-colors">
            <Bell className="w-6 h-6" />
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
          <h2 className="text-lg font-bold text-black">Latest Articles</h2>
          <button 
            onClick={() => navigate('/app/news')}
            className="text-[#E53935] text-sm font-semibold hover:underline"
          >
            View All →
          </button>
        </div>
        <div className="overflow-x-auto scrollbar-hide -mx-4 px-4">
          <div className="flex space-x-3">
            {latestArticles.map((article) => (
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
      </section>
    </div>
  );
}