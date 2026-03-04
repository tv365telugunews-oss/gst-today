import { useState, useRef, useEffect } from 'react';
import { 
  X, BookOpen, ChevronLeft, ChevronRight, ZoomIn, ZoomOut, 
  Menu, Search, Bookmark, Settings, Home, Moon, Sun,
  Grid, List, BookmarkCheck
} from 'lucide-react';

// Import cover and book images
import coverImage from 'figma:asset/5d29fc4613f466074b070e79c0d44178b10da28a.png';
import openBookImage from 'figma:asset/8d689f20c85e4ce4e2c83c02a3bb3e90903829e6.png';

const magazinePages = [
  {
    id: 1,
    title: 'GST TODAY Magazine',
    subtitle: 'February 2026 Edition',
    content: 'Your Complete Guide to GST Updates, News, and Compliance',
    image: coverImage,
    type: 'cover',
    thumbnail: 'https://images.unsplash.com/photo-1554224311-beee460c201f?w=150&h=200&fit=crop',
  },
  {
    id: 2,
    title: 'Editor\'s Note',
    content: 'Welcome to the February 2026 edition of GST TODAY Magazine. This month, we bring you comprehensive coverage of the latest GST Council decisions, important compliance updates, and expert insights on upcoming changes in the GST regime.',
    image: 'https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=800&h=1000&fit=crop',
    type: 'editorial',
    thumbnail: 'https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=150&h=200&fit=crop',
  },
  {
    id: 3,
    title: 'GST Rate Changes for 2026',
    content: 'The GST Council has announced significant rate changes effective from April 1, 2026. Electronics GST reduced from 18% to 12%. Textiles sector gets relief with rate cut from 12% to 5%.',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=1000&fit=crop',
    type: 'article',
    thumbnail: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=150&h=200&fit=crop',
  },
  {
    id: 4,
    title: 'E-Invoice: Complete Guide',
    content: 'E-invoicing is now mandatory for businesses with turnover above Rs 5 crore. This comprehensive guide covers how to generate e-invoices, integration with accounting software, and common errors.',
    image: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=800&h=1000&fit=crop',
    type: 'article',
    thumbnail: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=150&h=200&fit=crop',
  },
  {
    id: 5,
    title: 'Input Tax Credit Simplified',
    content: 'Understanding ITC is crucial for businesses. Key points: ITC can be claimed on goods and services used for business. Time limit extended to 30 November of next financial year.',
    image: 'https://images.unsplash.com/photo-1553877522-43269d4ea984?w=800&h=1000&fit=crop',
    type: 'article',
    thumbnail: 'https://images.unsplash.com/photo-1553877522-43269d4ea984?w=150&h=200&fit=crop',
  },
  {
    id: 6,
    title: 'GST Return Filing Calendar',
    content: 'Important deadlines for Quarter 4 FY 2025-26: GSTR-1: 11th of next month, GSTR-3B: 20th of next month, GSTR-9: 31st December 2026.',
    image: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=800&h=1000&fit=crop',
    type: 'calendar',
    thumbnail: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=150&h=200&fit=crop',
  },
  {
    id: 7,
    title: 'Expert Interview: CA Ramesh Kumar',
    content: 'In conversation with leading GST expert CA Ramesh Kumar. "The recent GST reforms are business-friendly and aim to reduce compliance burden. Small businesses will benefit the most."',
    image: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=800&h=1000&fit=crop',
    type: 'interview',
    thumbnail: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=150&h=200&fit=crop',
  },
  {
    id: 8,
    title: 'Case Study: Manufacturing Success',
    content: 'How XYZ Industries saved Rs 50 lakhs through proper GST planning. Challenge: Complex supply chain with multiple vendors. Solution: Implemented e-invoicing and automated ITC reconciliation.',
    image: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=800&h=1000&fit=crop',
    type: 'case-study',
    thumbnail: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=150&h=200&fit=crop',
  },
];

type Screen = 'library' | 'reader' | 'settings';

export default function MagazineScreen() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('library');
  const [currentPage, setCurrentPage] = useState(0);
  const [isFlipping, setIsFlipping] = useState(false);
  const [flipDirection, setFlipDirection] = useState<'next' | 'prev'>('next');
  const [darkMode, setDarkMode] = useState(false);
  const [zoom, setZoom] = useState(1);
  const [showTOC, setShowTOC] = useState(false);
  const [showThumbnails, setShowThumbnails] = useState(true);
  const [bookmarkedPages, setBookmarkedPages] = useState<number[]>([0]);
  const [searchOpen, setSearchOpen] = useState(false);
  const [touchStart, setTouchStart] = useState<{ x: number; y: number; time: number } | null>(null);
  const [pinchStart, setPinchStart] = useState<{ distance: number; zoom: number } | null>(null);
  
  const pageRef = useRef<HTMLDivElement>(null);
  const totalPages = magazinePages.length;

  // Page turn sound
  const playPageTurnSound = () => {
    try {
      const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();

      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);

      oscillator.frequency.value = 200;
      oscillator.type = 'sine';

      gainNode.gain.setValueAtTime(0.2, audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5);

      oscillator.start(audioContext.currentTime);
      oscillator.stop(audioContext.currentTime + 0.5);
    } catch (error) {
      console.log('Audio not supported');
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages - 1 && !isFlipping) {
      setIsFlipping(true);
      setFlipDirection('next');
      playPageTurnSound();
      setTimeout(() => {
        setCurrentPage(currentPage + 1);
        setIsFlipping(false);
      }, 1200);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 0 && !isFlipping) {
      setIsFlipping(true);
      setFlipDirection('prev');
      playPageTurnSound();
      setTimeout(() => {
        setCurrentPage(currentPage - 1);
        setIsFlipping(false);
      }, 1200);
    }
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length === 2) {
      // Pinch to zoom
      const touch1 = e.touches[0];
      const touch2 = e.touches[1];
      const distance = Math.hypot(
        touch2.clientX - touch1.clientX,
        touch2.clientY - touch1.clientY
      );
      setPinchStart({ distance, zoom });
    } else if (e.touches.length === 1) {
      // Single touch for swipe
      setTouchStart({
        x: e.touches[0].clientX,
        y: e.touches[0].clientY,
        time: Date.now(),
      });
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (e.touches.length === 2 && pinchStart) {
      // Handle pinch zoom
      const touch1 = e.touches[0];
      const touch2 = e.touches[1];
      const distance = Math.hypot(
        touch2.clientX - touch1.clientX,
        touch2.clientY - touch1.clientY
      );
      
      const scale = distance / pinchStart.distance;
      const newZoom = Math.min(Math.max(pinchStart.zoom * scale, 1), 3);
      setZoom(newZoom);
    }
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (pinchStart) {
      setPinchStart(null);
      return;
    }

    if (!touchStart) return;

    const touchEnd = {
      x: e.changedTouches[0].clientX,
      y: e.changedTouches[0].clientY,
      time: Date.now(),
    };

    const deltaX = touchStart.x - touchEnd.x;
    const deltaY = Math.abs(touchStart.y - touchEnd.y);
    const deltaTime = touchEnd.time - touchStart.time;

    // Swipe detection: horizontal movement > 50px, vertical < 100px, time < 500ms
    // Only flip pages when zoom is at 1 (not zoomed in)
    if (zoom === 1 && Math.abs(deltaX) > 50 && deltaY < 100 && deltaTime < 500) {
      if (deltaX > 0) {
        handleNextPage();
      } else {
        handlePrevPage();
      }
    }

    setTouchStart(null);
  };

  const toggleBookmark = () => {
    if (bookmarkedPages.includes(currentPage)) {
      setBookmarkedPages(bookmarkedPages.filter(p => p !== currentPage));
    } else {
      setBookmarkedPages([...bookmarkedPages, currentPage]);
    }
  };

  const currentPageData = magazinePages[currentPage];
  const bgColor = darkMode ? 'bg-[#1a1a1a]' : 'bg-[#f5f5f5]';
  const cardBg = darkMode ? 'bg-[#2a2a2a]' : 'bg-white';
  const textColor = darkMode ? 'text-white' : 'text-gray-900';
  const textSecondary = darkMode ? 'text-gray-400' : 'text-gray-600';

  // Library Screen
  if (currentScreen === 'library') {
    return (
      <div className={`min-h-screen pb-20 ${bgColor}`}>
        {/* Header */}
        <header className={`${cardBg} shadow-md sticky top-0 z-10`}>
          <div className="px-4 py-4">
            <h1 className={`text-2xl font-bold ${textColor}`}>My Library</h1>
            <p className={`text-sm ${textSecondary} mt-1`}>Your GST Magazine Collection</p>
          </div>
          
          {/* Tabs */}
          <div className="flex border-t border-gray-200 dark:border-gray-700">
            <button className="flex-1 px-4 py-3 text-sm font-medium text-[#E53935] border-b-2 border-[#E53935]">
              Recent
            </button>
            <button className={`flex-1 px-4 py-3 text-sm font-medium ${textSecondary}`}>
              Favorites
            </button>
            <button className={`flex-1 px-4 py-3 text-sm font-medium ${textSecondary}`}>
              All Books
            </button>
          </div>
        </header>

        {/* Book Card */}
        <div className="p-4">
          <div 
            onClick={() => setCurrentScreen('reader')}
            className={`${cardBg} rounded-2xl shadow-lg overflow-hidden active:scale-98 transition-transform`}
          >
            <div className="relative h-64">
              <img
                src={coverImage}
                alt="GST TODAY Magazine"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>
              <div className="absolute bottom-4 left-4 right-4">
                <h2 className="text-2xl font-bold text-white mb-1">GST TODAY Magazine</h2>
                <p className="text-sm text-white/90">February 2026 Edition</p>
              </div>
              <div className="absolute top-4 right-4 bg-[#E53935] text-white text-xs font-bold px-3 py-1 rounded-full">
                NEW
              </div>
            </div>
            
            <div className="p-4">
              <div className="flex items-center justify-between mb-3">
                <span className={`text-sm ${textSecondary}`}>8 pages • 15 min read</span>
                <span className="text-sm font-medium text-[#10B981]">Continue Reading</span>
              </div>
              
              {/* Progress Bar */}
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                <div className="bg-[#E53935] h-2 rounded-full" style={{ width: '35%' }}></div>
              </div>
            </div>
          </div>

          {/* Features */}
          <div className="mt-6 space-y-3">
            <h3 className={`text-lg font-bold ${textColor} mb-3`}>Features</h3>
            
            <div className={`${cardBg} rounded-xl p-4 flex items-center space-x-3`}>
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
                <BookOpen className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              </div>
              <div className="flex-1">
                <h4 className={`font-semibold ${textColor}`}>Realistic Page Flip</h4>
                <p className={`text-sm ${textSecondary}`}>3D page curl animation</p>
              </div>
            </div>

            <div className={`${cardBg} rounded-xl p-4 flex items-center space-x-3`}>
              <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center">
                <Grid className="w-6 h-6 text-purple-600 dark:text-purple-400" />
              </div>
              <div className="flex-1">
                <h4 className={`font-semibold ${textColor}`}>Page Thumbnails</h4>
                <p className={`text-sm ${textSecondary}`}>Quick navigation</p>
              </div>
            </div>

            <div className={`${cardBg} rounded-xl p-4 flex items-center space-x-3`}>
              <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center">
                <ZoomIn className="w-6 h-6 text-green-600 dark:text-green-400" />
              </div>
              <div className="flex-1">
                <h4 className={`font-semibold ${textColor}`}>Zoom & Pan</h4>
                <p className={`text-sm ${textSecondary}`}>Pinch to zoom support</p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Nav */}
        <div className={`fixed bottom-0 left-0 right-0 ${cardBg} border-t border-gray-200 dark:border-gray-700 pb-safe`}>
          <div className="flex items-center justify-around py-2">
            <button className="flex flex-col items-center p-2 text-[#E53935]">
              <Home className="w-6 h-6 mb-1" />
              <span className="text-xs font-medium">Library</span>
            </button>
            <button 
              onClick={() => setCurrentScreen('reader')}
              className={`flex flex-col items-center p-2 ${textSecondary}`}
            >
              <BookOpen className="w-6 h-6 mb-1" />
              <span className="text-xs font-medium">Reader</span>
            </button>
            <button 
              onClick={() => setCurrentScreen('settings')}
              className={`flex flex-col items-center p-2 ${textSecondary}`}
            >
              <Settings className="w-6 h-6 mb-1" />
              <span className="text-xs font-medium">Settings</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Settings Screen
  if (currentScreen === 'settings') {
    return (
      <div className={`min-h-screen pb-20 ${bgColor}`}>
        {/* Header */}
        <header className={`${cardBg} shadow-md`}>
          <div className="px-4 py-4 flex items-center">
            <button onClick={() => setCurrentScreen('library')} className="mr-3">
              <ChevronLeft className={`w-6 h-6 ${textColor}`} />
            </button>
            <h1 className={`text-xl font-bold ${textColor}`}>Settings</h1>
          </div>
        </header>

        <div className="p-4 space-y-4">
          {/* Theme */}
          <div className={`${cardBg} rounded-xl p-4`}>
            <h3 className={`font-semibold ${textColor} mb-4`}>Appearance</h3>
            
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                {darkMode ? <Moon className="w-5 h-5 text-blue-500" /> : <Sun className="w-5 h-5 text-yellow-500" />}
                <div>
                  <p className={`font-medium ${textColor}`}>Dark Mode</p>
                  <p className={`text-sm ${textSecondary}`}>Reduce eye strain</p>
                </div>
              </div>
              <button
                onClick={() => setDarkMode(!darkMode)}
                className={`w-14 h-8 rounded-full transition-colors ${
                  darkMode ? 'bg-blue-500' : 'bg-gray-300'
                }`}
              >
                <div className={`w-6 h-6 bg-white rounded-full shadow-md transition-transform ${
                  darkMode ? 'translate-x-7' : 'translate-x-1'
                }`}></div>
              </button>
            </div>
          </div>

          {/* Reading Preferences */}
          <div className={`${cardBg} rounded-xl p-4`}>
            <h3 className={`font-semibold ${textColor} mb-4`}>Reading Preferences</h3>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className={`font-medium ${textColor}`}>Page Thumbnails</p>
                  <p className={`text-sm ${textSecondary}`}>Show at bottom</p>
                </div>
                <button
                  onClick={() => setShowThumbnails(!showThumbnails)}
                  className={`w-14 h-8 rounded-full transition-colors ${
                    showThumbnails ? 'bg-blue-500' : 'bg-gray-300'
                  }`}
                >
                  <div className={`w-6 h-6 bg-white rounded-full shadow-md transition-transform ${
                    showThumbnails ? 'translate-x-7' : 'translate-x-1'
                  }`}></div>
                </button>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className={`font-medium ${textColor}`}>Page Flip Sound</p>
                  <p className={`text-sm ${textSecondary}`}>Audio feedback</p>
                </div>
                <button className="w-14 h-8 rounded-full bg-blue-500">
                  <div className="w-6 h-6 bg-white rounded-full shadow-md translate-x-7"></div>
                </button>
              </div>
            </div>
          </div>

          {/* About */}
          <div className={`${cardBg} rounded-xl p-4`}>
            <h3 className={`font-semibold ${textColor} mb-4`}>About</h3>
            <div className="space-y-2">
              <p className={`text-sm ${textSecondary}`}>GST TODAY Magazine Reader</p>
              <p className={`text-sm ${textSecondary}`}>Version 1.0.0</p>
              <p className={`text-sm ${textSecondary}`}>© 2026 GST TODAY TV</p>
            </div>
          </div>
        </div>

        {/* Bottom Nav */}
        <div className={`fixed bottom-0 left-0 right-0 ${cardBg} border-t border-gray-200 dark:border-gray-700 pb-safe`}>
          <div className="flex items-center justify-around py-2">
            <button 
              onClick={() => setCurrentScreen('library')}
              className={`flex flex-col items-center p-2 ${textSecondary}`}
            >
              <Home className="w-6 h-6 mb-1" />
              <span className="text-xs font-medium">Library</span>
            </button>
            <button 
              onClick={() => setCurrentScreen('reader')}
              className={`flex flex-col items-center p-2 ${textSecondary}`}
            >
              <BookOpen className="w-6 h-6 mb-1" />
              <span className="text-xs font-medium">Reader</span>
            </button>
            <button className="flex flex-col items-center p-2 text-[#E53935]">
              <Settings className="w-6 h-6 mb-1" />
              <span className="text-xs font-medium">Settings</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Reader Screen
  return (
    <div className={`min-h-screen flex flex-col ${bgColor}`}>
      {/* Top Header */}
      <header className={`${cardBg} shadow-sm z-20`}>
        <div className="px-4 py-3 flex items-center justify-between">
          <button onClick={() => setCurrentScreen('library')}>
            <ChevronLeft className={`w-6 h-6 ${textColor}`} />
          </button>
          
          <div className="flex-1 mx-4 text-center">
            <h1 className={`text-sm font-semibold ${textColor} truncate`}>
              {currentPageData.title}
            </h1>
            <p className={`text-xs ${textSecondary}`}>
              Page {currentPage + 1} of {totalPages}
            </p>
          </div>

          <div className="flex items-center space-x-2">
            <button onClick={() => setSearchOpen(!searchOpen)}>
              <Search className={`w-5 h-5 ${textColor}`} />
            </button>
            <button onClick={toggleBookmark}>
              {bookmarkedPages.includes(currentPage) ? (
                <BookmarkCheck className="w-5 h-5 text-[#E53935]" />
              ) : (
                <Bookmark className={`w-5 h-5 ${textColor}`} />
              )}
            </button>
            <button onClick={() => setShowTOC(true)}>
              <Menu className={`w-5 h-5 ${textColor}`} />
            </button>
          </div>
        </div>
      </header>

      {/* Page Container */}
      <div 
        className="flex-1 flex items-center justify-center relative overflow-hidden pb-20"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {/* Navigation Arrows */}
        <button
          onClick={handlePrevPage}
          disabled={currentPage === 0 || isFlipping}
          className={`absolute left-2 z-10 w-10 h-10 ${cardBg} rounded-full shadow-lg flex items-center justify-center transition-all ${
            currentPage === 0 || isFlipping ? 'opacity-0 pointer-events-none' : 'opacity-70 hover:opacity-100'
          }`}
        >
          <ChevronLeft className={`w-6 h-6 ${textColor}`} />
        </button>

        <button
          onClick={handleNextPage}
          disabled={currentPage === totalPages - 1 || isFlipping}
          className={`absolute right-2 z-10 w-10 h-10 ${cardBg} rounded-full shadow-lg flex items-center justify-center transition-all ${
            currentPage === totalPages - 1 || isFlipping ? 'opacity-0 pointer-events-none' : 'opacity-70 hover:opacity-100'
          }`}
        >
          <ChevronRight className={`w-6 h-6 ${textColor}`} />
        </button>

        {/* Page with Flip Animation */}
        <div
          ref={pageRef}
          className="absolute inset-0 mx-2"
          style={{
            perspective: '1500px',
          }}
        >
          {/* Next/Previous Page (underneath) */}
          {isFlipping && (
            <div
              className={`absolute inset-0 ${cardBg} rounded-lg shadow-2xl overflow-hidden`}
              style={{
                transform: `scale(${zoom})`,
              }}
            >
              <div className="relative w-full h-full">
                {flipDirection === 'next' && currentPage < totalPages - 1 ? (
                  magazinePages[currentPage + 1].type === 'cover' ? (
                    <div className="h-full relative">
                      <img
                        src={magazinePages[currentPage + 1].image}
                        alt={magazinePages[currentPage + 1].title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-br from-[#E53935]/95 via-[#E53935]/80 to-black/70 flex flex-col items-center justify-center p-8 text-center">
                        <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mb-6 border-4 border-white/40">
                          <BookOpen className="w-10 h-10 text-white" />
                        </div>
                        <h1 className="text-4xl font-black text-white mb-4 uppercase tracking-tight">
                          {magazinePages[currentPage + 1].title}
                        </h1>
                        <div className="w-24 h-1 bg-white/80 mb-4"></div>
                        <p className="text-xl font-bold text-white/95 mb-3">
                          {magazinePages[currentPage + 1].subtitle}
                        </p>
                        <p className="text-sm text-white/90 max-w-xs">
                          {magazinePages[currentPage + 1].content}
                        </p>
                      </div>
                    </div>
                  ) : (
                    <div className={`h-full flex flex-col ${darkMode ? 'bg-[#2a2a2a]' : 'bg-white'}`}>
                      <div className="relative h-2/5 overflow-hidden">
                        <img
                          src={magazinePages[currentPage + 1].image}
                          alt={magazinePages[currentPage + 1].title}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/20"></div>
                      </div>
                      
                      <div className="flex-1 p-6 overflow-y-auto">
                        <h2 className={`text-2xl font-bold mb-4 ${textColor}`}>
                          {magazinePages[currentPage + 1].title}
                        </h2>
                        <p className={`text-base leading-relaxed ${textSecondary}`}>
                          {magazinePages[currentPage + 1].content}
                        </p>
                      </div>

                      <div className={`absolute bottom-4 right-6 text-sm font-medium ${textSecondary}`}>
                        {currentPage + 2}
                      </div>
                    </div>
                  )
                ) : flipDirection === 'prev' && currentPage > 0 ? (
                  magazinePages[currentPage - 1].type === 'cover' ? (
                    <div className="h-full relative">
                      <img
                        src={magazinePages[currentPage - 1].image}
                        alt={magazinePages[currentPage - 1].title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-br from-[#E53935]/95 via-[#E53935]/80 to-black/70 flex flex-col items-center justify-center p-8 text-center">
                        <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mb-6 border-4 border-white/40">
                          <BookOpen className="w-10 h-10 text-white" />
                        </div>
                        <h1 className="text-4xl font-black text-white mb-4 uppercase tracking-tight">
                          {magazinePages[currentPage - 1].title}
                        </h1>
                        <div className="w-24 h-1 bg-white/80 mb-4"></div>
                        <p className="text-xl font-bold text-white/95 mb-3">
                          {magazinePages[currentPage - 1].subtitle}
                        </p>
                        <p className="text-sm text-white/90 max-w-xs">
                          {magazinePages[currentPage - 1].content}
                        </p>
                      </div>
                    </div>
                  ) : (
                    <div className={`h-full flex flex-col ${darkMode ? 'bg-[#2a2a2a]' : 'bg-white'}`}>
                      <div className="relative h-2/5 overflow-hidden">
                        <img
                          src={magazinePages[currentPage - 1].image}
                          alt={magazinePages[currentPage - 1].title}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/20"></div>
                      </div>
                      
                      <div className="flex-1 p-6 overflow-y-auto">
                        <h2 className={`text-2xl font-bold mb-4 ${textColor}`}>
                          {magazinePages[currentPage - 1].title}
                        </h2>
                        <p className={`text-base leading-relaxed ${textSecondary}`}>
                          {magazinePages[currentPage - 1].content}
                        </p>
                      </div>

                      <div className={`absolute bottom-4 right-6 text-sm font-medium ${textSecondary}`}>
                        {currentPage}
                      </div>
                    </div>
                  )
                ) : null}
              </div>
            </div>
          )}

          {/* Current Page (turning) */}
          <div
            className={`absolute inset-0 ${cardBg} rounded-lg shadow-2xl overflow-hidden transition-all duration-800 ${
              isFlipping 
                ? flipDirection === 'next'
                  ? 'animate-page-turn-next'
                  : 'animate-page-turn-prev'
                : ''
            }`}
            style={{
              transformStyle: 'preserve-3d',
              transform: `scale(${zoom})`,
              transformOrigin: flipDirection === 'next' ? 'left center' : 'right center',
            }}
          >
            {/* Page Shadow */}
            <div className="absolute -bottom-4 left-4 right-4 h-8 bg-black/30 blur-xl rounded-full"></div>

            {/* Page Curl Shadow Overlay (appears during turn) */}
            {isFlipping && (
              <div 
                className={`absolute inset-0 pointer-events-none z-10 ${
                  flipDirection === 'next' ? 'animate-curl-shadow-next' : 'animate-curl-shadow-prev'
                }`}
                style={{
                  background: flipDirection === 'next' 
                    ? 'linear-gradient(to right, transparent 0%, rgba(0,0,0,0) 50%, rgba(0,0,0,0.3) 100%)'
                    : 'linear-gradient(to left, transparent 0%, rgba(0,0,0,0) 50%, rgba(0,0,0,0.3) 100%)',
                }}
              ></div>
            )}

            {/* Page Content */}
            <div className="relative w-full h-full">
              {currentPageData.type === 'cover' ? (
                // Cover Page
                <div className="h-full relative">
                  <img
                    src={currentPageData.image}
                    alt={currentPageData.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-br from-[#E53935]/95 via-[#E53935]/80 to-black/70 flex flex-col items-center justify-center p-8 text-center">
                    <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mb-6 border-4 border-white/40">
                      <BookOpen className="w-10 h-10 text-white" />
                    </div>
                    <h1 className="text-4xl font-black text-white mb-4 uppercase tracking-tight">
                      {currentPageData.title}
                    </h1>
                    <div className="w-24 h-1 bg-white/80 mb-4"></div>
                    <p className="text-xl font-bold text-white/95 mb-3">
                      {currentPageData.subtitle}
                    </p>
                    <p className="text-sm text-white/90 max-w-xs">
                      {currentPageData.content}
                    </p>
                  </div>
                </div>
              ) : (
                // Content Page
                <div className={`h-full flex flex-col ${darkMode ? 'bg-[#2a2a2a]' : 'bg-white'}`}>
                  <div className="relative h-2/5 overflow-hidden">
                    <img
                      src={currentPageData.image}
                      alt={currentPageData.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/20"></div>
                  </div>
                  
                  <div className="flex-1 p-6 overflow-y-auto">
                    <h2 className={`text-2xl font-bold mb-4 ${textColor}`}>
                      {currentPageData.title}
                    </h2>
                    <p className={`text-base leading-relaxed ${textSecondary}`}>
                      {currentPageData.content}
                    </p>
                  </div>

                  {/* Page Number */}
                  <div className={`absolute bottom-4 right-6 text-sm font-medium ${textSecondary}`}>
                    {currentPage + 1}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Swipe Hint */}
        {currentPage === 0 && !isFlipping && (
          <div className="absolute bottom-32 left-1/2 -translate-x-1/2 bg-black/80 text-white text-sm px-4 py-2 rounded-full animate-bounce">
            👈 Swipe to flip pages 👉
          </div>
        )}
      </div>

      {/* Table of Contents Modal */}
      {showTOC && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-end">
          <div className={`${cardBg} rounded-t-3xl w-full max-h-[70vh] overflow-hidden animate-slide-up`}>
            <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
              <h2 className={`text-xl font-bold ${textColor}`}>Table of Contents</h2>
              <button onClick={() => setShowTOC(false)}>
                <X className={`w-6 h-6 ${textColor}`} />
              </button>
            </div>
            
            <div className="overflow-y-auto max-h-[60vh] p-4 space-y-2">
              {magazinePages.map((page, index) => (
                <button
                  key={page.id}
                  onClick={() => {
                    setCurrentPage(index);
                    setShowTOC(false);
                    playPageTurnSound();
                  }}
                  className={`w-full text-left p-3 rounded-lg transition-colors ${
                    index === currentPage
                      ? 'bg-[#E53935] text-white'
                      : `${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'} ${textColor}`
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <span className="text-sm font-bold opacity-60">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <div className="flex-1">
                      <p className="font-medium">{page.title}</p>
                      <p className={`text-xs ${index === currentPage ? 'text-white/80' : textSecondary}`}>
                        {page.type}
                      </p>
                    </div>
                    {bookmarkedPages.includes(index) && (
                      <BookmarkCheck className="w-5 h-5" />
                    )}
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      <style>{`
        @keyframes page-turn-next {
          0% {
            transform: perspective(2000px) rotateY(0deg) translateX(0) translateZ(0);
            box-shadow: 0 10px 30px rgba(0,0,0,0.15);
            opacity: 1;
          }
          100% {
            transform: perspective(2000px) rotateY(-180deg) translateX(0) translateZ(0);
            box-shadow: 0 10px 30px rgba(0,0,0,0.15);
            opacity: 1;
          }
        }

        @keyframes page-turn-prev {
          0% {
            transform: perspective(2000px) rotateY(0deg) translateX(0) translateZ(0);
            box-shadow: 0 10px 30px rgba(0,0,0,0.15);
            opacity: 1;
          }
          100% {
            transform: perspective(2000px) rotateY(180deg) translateX(0) translateZ(0);
            box-shadow: 0 10px 30px rgba(0,0,0,0.15);
            opacity: 1;
          }
        }

        @keyframes curl-shadow-next {
          0% {
            opacity: 0;
          }
          50% {
            opacity: 0.4;
          }
          100% {
            opacity: 0;
          }
        }

        @keyframes curl-shadow-prev {
          0% {
            opacity: 0;
          }
          50% {
            opacity: 0.4;
          }
          100% {
            opacity: 0;
          }
        }

        .animate-page-turn-next {
          animation: page-turn-next 1.2s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }

        .animate-page-turn-prev {
          animation: page-turn-prev 1.2s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }

        .animate-curl-shadow-next {
          animation: curl-shadow-next 1.2s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }

        .animate-curl-shadow-prev {
          animation: curl-shadow-prev 1.2s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }

        @keyframes slide-up {
          from {
            transform: translateY(100%);
          }
          to {
            transform: translateY(0);
          }
        }

        .animate-slide-up {
          animation: slide-up 0.3s ease-out;
        }

        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }

        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }

        .pb-safe {
          padding-bottom: env(safe-area-inset-bottom);
        }
      `}</style>
    </div>
  );
}