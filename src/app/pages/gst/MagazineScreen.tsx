import { useState } from 'react';
import { ChevronLeft, ChevronRight, BookOpen, X, Maximize } from 'lucide-react';

const magazinePages = [
  {
    id: 1,
    title: 'GST TODAY Magazine',
    subtitle: 'February 2026 Edition',
    content: 'Your Complete Guide to GST Updates, News, and Compliance',
    image: 'https://images.unsplash.com/photo-1554224311-beee460c201f?w=600&h=800&fit=crop',
    type: 'cover',
  },
  {
    id: 2,
    title: 'Editor\'s Note',
    content: 'Welcome to the February 2026 edition of GST TODAY Magazine. This month, we bring you comprehensive coverage of the latest GST Council decisions, important compliance updates, and expert insights on upcoming changes in the GST regime. Our team has worked diligently to provide you with actionable information that will help your business stay compliant and make informed decisions.',
    image: 'https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=600&h=800&fit=crop',
    type: 'editorial',
  },
  {
    id: 3,
    title: 'GST Rate Changes for 2026',
    content: 'The GST Council has announced significant rate changes effective from April 1, 2026. Electronics GST reduced from 18% to 12%. Textiles sector gets relief with rate cut from 12% to 5%. Healthcare services remain exempt. E-commerce operators face new compliance requirements. Real estate sector sees clarity on input tax credit. These changes are expected to boost manufacturing and provide relief to consumers.',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=800&fit=crop',
    type: 'article',
  },
  {
    id: 4,
    title: 'E-Invoice: Complete Guide',
    content: 'E-invoicing is now mandatory for businesses with turnover above Rs 5 crore. This comprehensive guide covers: How to generate e-invoices, Integration with accounting software, Common errors and solutions, Benefits of e-invoicing system, Step-by-step implementation process. The government has provided extensive support through training programs and dedicated helplines to ensure smooth transition.',
    image: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=600&h=800&fit=crop',
    type: 'article',
  },
  {
    id: 5,
    title: 'Input Tax Credit Simplified',
    content: 'Understanding ITC is crucial for businesses. Key points: ITC can be claimed on goods and services used for business. Time limit extended to 30 November of next financial year. Blocked credit categories clearly defined. Reversal rules simplified. Documentation requirements reduced. Auto-population of ITC in returns. These changes will significantly reduce compliance burden and improve cash flow for businesses.',
    image: 'https://images.unsplash.com/photo-1553877522-43269d4ea984?w=600&h=800&fit=crop',
    type: 'article',
  },
  {
    id: 6,
    title: 'GST Return Filing Calendar',
    content: 'Important deadlines for Quarter 4 FY 2025-26: GSTR-1: 11th of next month, GSTR-3B: 20th of next month, GSTR-9: 31st December 2026, GSTR-9C: 31st December 2026. Special provisions for composition dealers. Late fee waiver for small taxpayers. Extension provisions during technical glitches. Plan your filing schedule to avoid penalties and ensure smooth compliance.',
    image: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=600&h=800&fit=crop',
    type: 'calendar',
  },
  {
    id: 7,
    title: 'Expert Interview: CA Ramesh Kumar',
    content: 'In conversation with leading GST expert CA Ramesh Kumar. "The recent GST reforms are business-friendly and aim to reduce compliance burden. Small businesses will benefit the most from simplified procedures and reduced documentation. E-invoicing will significantly reduce tax evasion. The future of GST is digital and automated. Businesses should invest in good accounting software and training."',
    image: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=600&h=800&fit=crop',
    type: 'interview',
  },
  {
    id: 8,
    title: 'Case Study: Manufacturing Success',
    content: 'How XYZ Industries saved Rs 50 lakhs through proper GST planning. Challenge: Complex supply chain with multiple vendors. Solution: Implemented e-invoicing and automated ITC reconciliation. Results: 99% accuracy in returns, Zero penalties in 2 years, Improved cash flow by 30%, Reduced compliance team size. Key Learning: Investment in technology and training pays off in GST compliance.',
    image: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=600&h=800&fit=crop',
    type: 'case-study',
  },
  {
    id: 9,
    title: 'Upcoming GST Webinars',
    content: 'Join our expert-led webinars: March 15: E-Invoice Implementation Workshop, March 22: ITC Optimization Strategies, March 29: Annual Return Filing Tips, April 5: GST Audit Preparation. All webinars are free for GST TODAY subscribers. Get certificates of participation. Interactive Q&A sessions. Limited seats available. Register now at gsttodaytv.com',
    image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=600&h=800&fit=crop',
    type: 'events',
  },
  {
    id: 10,
    title: 'Contact Us',
    content: 'GST TODAY TV - Your trusted partner in GST compliance. Email: gsttodaytv99@gmail.com, Phone: +91 9849884466, Contact: Kasturi Gopala Krishna. Website: www.gsttodaytv.com. Follow us on social media for daily updates. Subscribe to our YouTube channel for video tutorials. Download our mobile app for news on the go. Thank you for reading!',
    image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=600&h=800&fit=crop',
    type: 'contact',
  },
];

export default function MagazineScreen() {
  const [isReading, setIsReading] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [isFlipping, setIsFlipping] = useState(false);
  const [flipDirection, setFlipDirection] = useState<'next' | 'prev'>('next');
  const [touchStartX, setTouchStartX] = useState(0);

  const handleNextPage = () => {
    if (currentPage < magazinePages.length - 1 && !isFlipping) {
      setIsFlipping(true);
      setFlipDirection('next');
      setTimeout(() => {
        setCurrentPage(currentPage + 1);
        setIsFlipping(false);
      }, 600);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 0 && !isFlipping) {
      setIsFlipping(true);
      setFlipDirection('prev');
      setTimeout(() => {
        setCurrentPage(currentPage - 1);
        setIsFlipping(false);
      }, 600);
    }
  };

  const handleSwipe = (e: React.TouchEvent, type: 'start' | 'end') => {
    if (type === 'start') {
      setTouchStartX(e.touches[0].clientX);
    } else {
      const touchEndX = e.changedTouches[0].clientX;
      const diff = touchStartX - touchEndX;
      
      // Minimum swipe distance: 30px
      if (Math.abs(diff) > 30) {
        if (diff > 0) {
          // Swipe left - next page
          handleNextPage();
        } else {
          // Swipe right - previous page
          handlePrevPage();
        }
      }
      setTouchStartX(0);
    }
  };

  const page = magazinePages[currentPage];

  if (!isReading) {
    return (
      <div className="bg-white min-h-screen pb-20 flex flex-col">
        {/* Header */}
        <header className="bg-[#10B981] text-white p-4 text-center shadow-md">
          <h1 className="text-xl font-bold">GST TODAY</h1>
        </header>

        {/* Content */}
        <div className="flex-1 flex flex-col items-center justify-center p-8">
          {/* FlipBook Icon */}
          <div className="relative mb-8">
            {/* Book Illustration */}
            <div className="relative w-48 h-48">
              {/* Back pages */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#06B6D4] to-[#0891B2] rounded-2xl transform rotate-6 shadow-lg"></div>
              <div className="absolute inset-0 bg-gradient-to-br from-[#06B6D4] to-[#0891B2] rounded-2xl transform rotate-3 shadow-lg"></div>
              
              {/* Front page */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#06B6D4] to-[#0891B2] rounded-2xl shadow-2xl flex items-center justify-center">
                <BookOpen className="w-24 h-24 text-white" strokeWidth={1.5} />
              </div>

              {/* Opening effect */}
              <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-[#06B6D4]/50 to-transparent rounded-r-2xl"></div>
            </div>

            {/* Animated lines */}
            <div className="absolute -right-4 top-1/2 -translate-y-1/2 space-y-2">
              <div className="w-16 h-1 bg-[#06B6D4]/30 rounded animate-pulse"></div>
              <div className="w-12 h-1 bg-[#06B6D4]/30 rounded animate-pulse" style={{ animationDelay: '0.2s' }}></div>
              <div className="w-14 h-1 bg-[#06B6D4]/30 rounded animate-pulse" style={{ animationDelay: '0.4s' }}></div>
            </div>
          </div>

          {/* Title */}
          <h2 className="text-3xl font-bold text-[#06B6D4] mb-2">FlipBook</h2>
          <p className="text-[#6B7280] text-center max-w-sm mb-2">
            Read GST TODAY Magazine in an interactive flipbook format
          </p>
          <p className="text-sm font-semibold text-[#E53935] mb-6">
            February 2026 Edition - 10 Pages
          </p>

          {/* Read Now Button */}
          <button
            onClick={() => setIsReading(true)}
            className="px-8 py-3 bg-[#E53935] hover:bg-[#C62828] text-white rounded-xl font-bold shadow-lg transition-all active:scale-95"
          >
            Read Magazine Now
          </button>

          {/* Features */}
          <div className="mt-12 w-full max-w-md space-y-3">
            <div className="flex items-center space-x-3 p-3 bg-[#F0FDFA] rounded-lg">
              <div className="w-2 h-2 bg-[#06B6D4] rounded-full"></div>
              <p className="text-sm text-[#6B7280]">Interactive page flipping</p>
            </div>
            <div className="flex items-center space-x-3 p-3 bg-[#F0FDFA] rounded-lg">
              <div className="w-2 h-2 bg-[#06B6D4] rounded-full"></div>
              <p className="text-sm text-[#6B7280]">10 pages of GST insights</p>
            </div>
            <div className="flex items-center space-x-3 p-3 bg-[#F0FDFA] rounded-lg">
              <div className="w-2 h-2 bg-[#06B6D4] rounded-full"></div>
              <p className="text-sm text-[#6B7280]">Swipe to turn pages</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-black min-h-screen flex flex-col relative">
      {/* Close Button */}
      <button
        onClick={() => setIsReading(false)}
        className="absolute top-4 right-4 z-20 w-10 h-10 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center hover:bg-white/30 transition-colors"
      >
        <X className="w-6 h-6 text-white" />
      </button>

      {/* Page Counter */}
      <div className="absolute top-4 left-4 z-20 bg-white/20 backdrop-blur-md px-4 py-2 rounded-full">
        <span className="text-white text-sm font-bold">
          Page {currentPage + 1} of {magazinePages.length}
        </span>
      </div>

      {/* Magazine Page with Flip Animation */}
      <div 
        className="flex-1 flex items-center justify-center p-4 perspective-1000"
        onTouchStart={(e) => handleSwipe(e, 'start')}
        onTouchEnd={(e) => handleSwipe(e, 'end')}
      >
        <div className="relative w-full max-w-md h-[600px]">
          {/* Page Container with 3D Flip Effect */}
          <div 
            className={`absolute inset-0 transition-all duration-600 transform-style-3d ${
              isFlipping 
                ? flipDirection === 'next' 
                  ? 'animate-flip-next' 
                  : 'animate-flip-prev'
                : ''
            }`}
            style={{
              transformStyle: 'preserve-3d',
              transition: 'transform 0.6s',
            }}
          >
            <div className="bg-white rounded-2xl shadow-2xl overflow-hidden h-full backface-hidden">
              {/* Page Image */}
              <div className="relative h-64">
                <img
                  src={page.image}
                  alt={page.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-transparent"></div>
                {page.type === 'cover' && (
                  <div className="absolute inset-0 flex items-center justify-center text-center p-6">
                    <div>
                      <h1 className="text-4xl font-black text-white mb-2">{page.title}</h1>
                      <p className="text-xl font-bold text-white/90">{page.subtitle}</p>
                      <p className="text-sm text-white/80 mt-2">{page.content}</p>
                    </div>
                  </div>
                )}
              </div>

              {/* Page Content */}
              {page.type !== 'cover' && (
                <div className="p-6 overflow-y-auto" style={{ maxHeight: 'calc(600px - 256px)' }}>
                  <h2 className="text-2xl font-bold text-black mb-4">{page.title}</h2>
                  <p className="text-sm text-[#6B7280] leading-relaxed whitespace-pre-line">
                    {page.content}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Controls */}
      <div className="bg-white/10 backdrop-blur-md p-4">
        <div className="flex items-center justify-between max-w-md mx-auto">
          <button
            onClick={handlePrevPage}
            disabled={currentPage === 0 || isFlipping}
            className="flex items-center space-x-2 px-4 py-2 bg-white/20 rounded-lg disabled:opacity-30 disabled:cursor-not-allowed hover:bg-white/30 transition-colors"
          >
            <ChevronLeft className="w-5 h-5 text-white" />
            <span className="text-white font-semibold">Previous</span>
          </button>

          <div className="flex space-x-2">
            {magazinePages.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  if (!isFlipping && index !== currentPage) {
                    setIsFlipping(true);
                    setFlipDirection(index > currentPage ? 'next' : 'prev');
                    setTimeout(() => {
                      setCurrentPage(index);
                      setIsFlipping(false);
                    }, 600);
                  }
                }}
                className={`w-2 h-2 rounded-full transition-all ${
                  index === currentPage ? 'bg-white w-6' : 'bg-white/40'
                }`}
              />
            ))}
          </div>

          <button
            onClick={handleNextPage}
            disabled={currentPage === magazinePages.length - 1 || isFlipping}
            className="flex items-center space-x-2 px-4 py-2 bg-white/20 rounded-lg disabled:opacity-30 disabled:cursor-not-allowed hover:bg-white/30 transition-colors"
          >
            <span className="text-white font-semibold">Next</span>
            <ChevronRight className="w-5 h-5 text-white" />
          </button>
        </div>
      </div>

      {/* Swipe Hint */}
      {currentPage === 0 && (
        <div className="absolute bottom-24 left-1/2 -translate-x-1/2 text-white text-xs animate-bounce pointer-events-none">
          ← Swipe to turn pages →
        </div>
      )}

      <style>{`
        @keyframes flip-next {
          0% {
            transform: perspective(1000px) rotateY(0deg);
          }
          100% {
            transform: perspective(1000px) rotateY(-180deg);
          }
        }
        
        @keyframes flip-prev {
          0% {
            transform: perspective(1000px) rotateY(0deg);
          }
          100% {
            transform: perspective(1000px) rotateY(180deg);
          }
        }
        
        .animate-flip-next {
          animation: flip-next 0.6s ease-in-out;
        }
        
        .animate-flip-prev {
          animation: flip-prev 0.6s ease-in-out;
        }
        
        .backface-hidden {
          backface-visibility: hidden;
        }
        
        .perspective-1000 {
          perspective: 1000px;
        }
        
        .transform-style-3d {
          transform-style: preserve-3d;
        }
      `}</style>
    </div>
  );
}