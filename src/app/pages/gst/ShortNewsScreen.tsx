import { useState } from 'react';
import { Heart, MessageCircle, Share2, Bookmark, ChevronUp, ChevronDown, MoreVertical, Filter, X, Flag, VolumeX, Volume2, MapPin, ThumbsUp, ThumbsDown, Download } from 'lucide-react';
import { getStateNames, getDistrictsByState, getMandalsByDistrict } from '../../data/indianLocations';

// Multilingual News Data with Location and Language Support
const shortNews = [
  {
    id: 1,
    image: 'https://images.unsplash.com/photo-1554224311-beee460c201f?w=600&h=800&fit=crop',
    headline: 'GST Council announces major rate reduction',
    content: 'The 52nd GST Council meeting concluded with significant rate cuts. Electronics GST reduced from 18% to 12% effective April 1, 2026.',
    time: '4 hours ago',
    location: 'New Delhi, Delhi',
    language: 'English',
    category: 'National',
    district: 'Central Delhi',
    mandal: 'Connaught Place',
    likes: 1245,
    dislikes: 23,
    comments: 89,
    shares: 156,
  },
  {
    id: 2,
    image: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=600&h=800&fit=crop',
    headline: 'ई-इनवॉइस अनिवार्य: 5 करोड़ टर्नओवर',
    content: 'सरकार ने 5 करोड़ रुपये से अधिक वार्षिक टर्नओवर वाले सभी व्यवसाों के लिए ई-इनवॉइसिंग अनिवार्य कर दी है। 1 अप्रैल 2026 से प्रभावी।',
    time: '8 hours ago',
    location: 'Hyderabad, Telangana',
    language: 'हिन्दी',
    category: 'Local',
    district: 'Hyderabad',
    mandal: 'Kukatpally',
    likes: 892,
    dislikes: 15,
    comments: 45,
    shares: 78,
  },
  {
    id: 3,
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=800&fit=crop',
    headline: 'ஜிஎஸ்டி தாக்கல் காலக்கெடு நீட்டிக்கப்பட்டது',
    content: 'சிறு வணிகர்களுக்கு ஜிஎஸ்டி வருமானம் தாக்கல் செய்வதற்கான காலக்கெடு மார்ச் 31, 2026 வரை நீட்டிக்கப்பட்டுள்ளது।',
    time: '12 hours ago',
    location: 'Chennai, Tamil Nadu',
    language: 'தமிழ்',
    category: 'Regional',
    district: 'Chennai',
    mandal: 'T Nagar',
    likes: 1567,
    dislikes: 12,
    comments: 123,
    shares: 234,
  },
  {
    id: 4,
    image: 'https://images.unsplash.com/photo-1553877522-43269d4ea984?w=600&h=800&fit=crop',
    headline: 'ఇన్‌పుట్ టాక్స్ క్రెడిట్ నియమాలు సులభతరం',
    content: 'వ్యాపారాలకు ప్రధాన ఉపశమనంగా, జిఎస్టి కౌన్సిల్ ఇన్‌పుట్ టాక్స్ క్రెడిట్ నియమాలను సులభతరం చేసింది। కంపెనీలు తమ కొనుగోళ్లపై క్రెడిట్ క్లెయిమ్ చేయడం సులభం అవుతుంది।',
    time: '1 day ago',
    location: 'Vijayawada, Andhra Pradesh',
    language: 'తెలుగు',
    category: 'State',
    district: 'Krishna',
    mandal: 'Vijayawada Rural',
    likes: 2103,
    dislikes: 34,
    comments: 187,
    shares: 312,
  },
  {
    id: 5,
    image: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=600&h=800&fit=crop',
    headline: 'ರಿಯಲ್ ಎಸ್ಟೇಟ್ ಮೇಲೆ GST: ಸುಪ್ರೀಂ ತೀರ್ಪು',
    content: 'ನಿರ್ಮಾಣ ಹಂತದಲ್ಲಿರುವ ವಸತಿ ಆಸ್ತಿಗಳ ಮೇಲೆ 5% GST ಅನ್ವಯವಾಗುತ್ತದೆ ಎಂದು ಸುಪ್ರೀಂ ಕೋರ್ಟ್ ತೀರ್ಪು ನೀಡಿದೆ।',
    time: '1 day ago',
    location: 'Bangalore, Karnataka',
    language: 'ಕನ್ನಡ',
    category: 'National',
    district: 'Bangalore Urban',
    mandal: 'Yeshwanthpur',
    likes: 1876,
    dislikes: 45,
    comments: 156,
    shares: 201,
  },
  {
    id: 6,
    image: 'https://images.unsplash.com/photo-1551836022-deb4988cc6c0?w=600&h=800&fit=crop',
    headline: 'GST പോർട്ടൽ പുതിയ സവിശേഷതകൾ ലോഞ്ച് ചെയ്തു',
    content: 'GST നെറ്റ്‌വർക്ക് നികുതി അടയ്ക്കുന്നവർക്കായി പുതിയ AI ചാറ്റ്ബോട്ട്, മൊബൈൽ ആപ്പ് എന്നിവ അവതരിപ്പിച്ചു।',
    time: '2 days ago',
    location: 'Kochi, Kerala',
    language: 'മലയാളം',
    category: 'Tech',
    district: 'Ernakulam',
    mandal: 'Fort Kochi',
    likes: 945,
    dislikes: 8,
    comments: 67,
    shares: 98,
  },
  {
    id: 7,
    image: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=600&h=800&fit=crop',
    headline: 'જાન્યુઆરીમાં GST રેવન્યુ રેકોર્ડ ઊંચાઈએ',
    content: 'જાન્યુઆરી 2026 માટે ભારતનો GST રેવન્યુ કલેકશન સર્વકાલીન ઉચ્ચ સપાટી પર પહોંચ્યો છે - રૂ. 1.78 લાખ કરોડ।',
    time: '3 days ago',
    location: 'Ahmedabad, Gujarat',
    language: 'ગુજરાતી',
    category: 'Economy',
    district: 'Ahmedabad',
    mandal: 'Navrangpura',
    likes: 2234,
    dislikes: 56,
    comments: 198,
    shares: 345,
  },
  {
    id: 8,
    image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&h=800&fit=crop',
    headline: 'प्रलंबित प्रकरणांसाठी नवीन माफी योजना',
    content: 'सरकारने प्रलंबित विवाद आणि नोटिसा असलेल्या करदात्यांना सवलत देणारी विशेष GST माफी योजना जाहीर केली आहे।',
    time: '4 days ago',
    location: 'Mumbai, Maharashtra',
    language: 'मराठी',
    category: 'Policy',
    district: 'Mumbai Suburban',
    mandal: 'Andheri',
    likes: 1654,
    dislikes: 29,
    comments: 142,
    shares: 178,
  },
  {
    id: 9,
    image: 'https://images.unsplash.com/photo-1434626881859-194d67b2b86f?w=600&h=800&fit=crop',
    headline: 'অনলাইন গেমিং এ GST: নতুন নিয়ম',
    content: 'অর্থ মন্ত্রক অনলাইন গেমিং, ক্যাসিনো এবং ঘোড়দৌড়ের জন্য GST নির্দেশিকা জারি করেছে। বাজির সম্পূর্ণ মূল্যের উপর 28% GST প্রযোজ্য হবে।',
    time: '5 days ago',
    location: 'Kolkata, West Bengal',
    language: 'বাংলা',
    category: 'Gaming',
    district: 'Kolkata',
    mandal: 'Salt Lake',
    likes: 1432,
    dislikes: 67,
    comments: 234,
    shares: 189,
  },
  {
    id: 10,
    image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=600&h=800&fit=crop',
    headline: 'Export Incentives Enhanced Under GST',
    content: 'Government has enhanced GST incentives for export-oriented units. Faster refund processing with 7-day commitment and simplified documentation for exporters.',
    time: '6 days ago',
    location: 'Pune, Maharashtra',
    language: 'English',
    category: 'Business',
    district: 'Pune',
    mandal: 'Kothrud',
    likes: 1123,
    dislikes: 18,
    comments: 78,
    shares: 134,
  },
];

const languages = [
  'All Languages',
  'English',
  'हिन्दी',
  'தமிழ்',
  'తెలుగు',
  'ಕನ್ನಡ',
  'മലയാളം',
  'ગુજરાતી',
  'मराठी',
  'বাংলা',
];

const categories = [
  'All Categories',
  'National',
  'Local',
  'Regional',
  'State',
  'Tech',
  'Economy',
  'Policy',
  'Gaming',
  'Business',
];

export default function ShortNewsScreen() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const [liked, setLiked] = useState(false);
  const [disliked, setDisliked] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);
  const [showShareMenu, setShowShareMenu] = useState(false);
  const [showMoreMenu, setShowMoreMenu] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState('All Languages');
  const [selectedCategory, setSelectedCategory] = useState('All Categories');
  const [commentText, setCommentText] = useState('');
  const [userComments, setUserComments] = useState<Array<{id: number, text: string, time: string}>>([]);
  
  // Location state
  const [selectedState, setSelectedState] = useState('All States');
  const [selectedDistrict, setSelectedDistrict] = useState('All Districts');
  const [selectedMandal, setSelectedMandal] = useState('All Mandals');
  
  // Get location options
  const stateOptions = getStateNames();
  const districtOptions = getDistrictsByState(selectedState);
  const mandalOptions = getMandalsByDistrict(selectedState, selectedDistrict);
  
  // Handle state change
  const handleStateChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedState(e.target.value);
    setSelectedDistrict('All Districts');
    setSelectedMandal('All Mandals');
  };
  
  // Handle district change
  const handleDistrictChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedDistrict(e.target.value);
    setSelectedMandal('All Mandals');
  };
  
  // Handle post comment
  const handlePostComment = () => {
    if (commentText.trim()) {
      const newComment = {
        id: Date.now(),
        text: commentText,
        time: 'Just now'
      };
      setUserComments([newComment, ...userComments]);
      setCommentText('');
    }
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.touches[0].clientY);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.touches[0].clientY);
  };

  const handleTouchEnd = () => {
    if (touchStart === 0) return;
    
    const diff = touchStart - touchEnd;
    
    // Minimum swipe distance: 50px for better control
    if (Math.abs(diff) > 50) {
      if (diff > 0) {
        // Swipe up - next news
        if (currentIndex < shortNews.length - 1) {
          setCurrentIndex(currentIndex + 1);
          resetInteractions();
        }
      } else {
        // Swipe down - previous news
        if (currentIndex > 0) {
          setCurrentIndex(currentIndex - 1);
          resetInteractions();
        }
      }
    }
    
    // Reset touch positions
    setTouchStart(0);
    setTouchEnd(0);
  };

  const resetInteractions = () => {
    setLiked(false);
    setDisliked(false);
    setBookmarked(false);
    setShowShareMenu(false);
    setShowMoreMenu(false);
  };

  const handleLike = () => {
    setLiked(!liked);
    if (disliked) setDisliked(false);
  };

  const handleDislike = () => {
    setDisliked(!disliked);
    if (liked) setLiked(false);
  };

  const currentNews = shortNews[currentIndex];

  return (
    <div className="h-screen w-full bg-[#F5F5F5] relative overflow-hidden flex flex-col">
      {/* Top Filter Bar */}
      <div className="bg-[#D32F2F] px-4 py-3 flex items-center justify-between shadow-lg z-10">
        <div className="flex items-center space-x-2">
          <MapPin className="w-4 h-4 text-white" />
          <span className="text-white text-sm font-semibold">{currentNews.location}</span>
        </div>
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-white text-xs font-semibold hover:bg-white/30 transition-colors"
        >
          Filters
        </button>
      </div>

      {/* Main Content Container - Account for both action bar (64px) and bottom nav (64px) */}
      <div 
        className="flex-1 relative pb-32"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {/* Photo Section - 42% */}
        <div className="absolute top-0 left-0 right-0 h-[42%]">
          <img
            src={currentNews.image}
            alt="News"
            className="w-full h-full object-cover"
          />
          {/* Glassmorphism Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/60"></div>
          
          {/* Location Badge on Photo - Top Left Corner */}
          <div className="absolute top-3 left-3 bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/20">
            <div className="flex items-center space-x-1.5">
              <MapPin className="w-3 h-3 text-[#FFC107]" />
              <span className="text-white text-xs font-semibold">{currentNews.district}</span>
            </div>
          </div>

          {/* Category Badge - Top Right */}
          <div className="absolute top-3 right-3 bg-[#FFC107] px-3 py-1 rounded-full">
            <span className="text-[#212121] text-xs font-bold uppercase">{currentNews.category}</span>
          </div>

          {/* Language Badge - Below Location */}
          <div className="absolute top-14 left-3 bg-white/20 backdrop-blur-md px-2.5 py-1 rounded-full border border-white/30">
            <span className="text-white text-xs font-medium">{currentNews.language}</span>
          </div>
        </div>

        {/* Text Section - Account for action bar + bottom nav */}
        <div className="absolute top-[42%] left-0 right-0 bottom-32 bg-[#FFFFFF] overflow-y-auto">
          <div className="p-5 pb-8">
            {/* Headline */}
            <h2 className="text-2xl font-black text-[#212121] mb-3 leading-tight">
              {currentNews.headline}
            </h2>

            {/* Content Text */}
            <p className="text-base text-[#212121]/80 leading-relaxed mb-4">
              {currentNews.content}
            </p>

            {/* Meta Info - Bottom Section */}
            <div className="flex items-center justify-between mt-6 pt-4 border-t border-gray-200">
              {/* Page Number - Bottom Left */}
              <div className="flex items-center space-x-2">
                <span className="text-sm font-bold text-[#D32F2F]">
                  {currentIndex + 1}
                </span>
                <span className="text-xs text-gray-500">of</span>
                <span className="text-sm font-bold text-gray-600">
                  {shortNews.length}
                </span>
              </div>

              {/* Upload Time - Bottom Right */}
              <div className="flex items-center space-x-1">
                <div className="w-1.5 h-1.5 bg-[#10B981] rounded-full animate-pulse"></div>
                <span className="text-xs font-medium text-gray-500">
                  {currentNews.time}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons Bar - Above bottom navigation */}
      <div className="fixed bottom-16 left-0 right-0 bg-[#FFFFFF] border-t border-gray-200 shadow-2xl z-40">
        <div className="h-16 flex items-center justify-around px-2">
          {/* Three Dots Menu */}
          <button 
            onClick={() => setShowMoreMenu(!showMoreMenu)}
            className="relative flex flex-col items-center justify-center group"
          >
            <div className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors">
              <MoreVertical className="w-5 h-5 text-[#212121]" />
            </div>
          </button>

          {/* Share Button */}
          <button 
            onClick={() => setShowShareMenu(!showShareMenu)}
            className="flex flex-col items-center justify-center group"
          >
            <div className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-blue-50 transition-colors">
              <Share2 className="w-5 h-5 text-[#1976D2]" />
            </div>
          </button>

          {/* Like Button */}
          <button 
            onClick={handleLike}
            className="flex flex-col items-center justify-center group"
          >
            <div className={`w-10 h-10 flex items-center justify-center rounded-full transition-all ${
              liked ? 'bg-green-50' : 'hover:bg-green-50'
            }`}>
              <ThumbsUp 
                className={`w-5 h-5 transition-all ${
                  liked ? 'text-[#10B981] fill-[#10B981]' : 'text-[#212121]'
                }`} 
              />
            </div>
          </button>

          {/* Dislike Button */}
          <button 
            onClick={handleDislike}
            className="flex flex-col items-center justify-center group"
          >
            <div className={`w-10 h-10 flex items-center justify-center rounded-full transition-all ${
              disliked ? 'bg-red-50' : 'hover:bg-red-50'
            }`}>
              <ThumbsDown 
                className={`w-5 h-5 transition-all ${
                  disliked ? 'text-[#D32F2F] fill-[#D32F2F]' : 'text-[#212121]'
                }`} 
              />
            </div>
          </button>

          {/* Comment Button */}
          <button 
            onClick={() => setShowComments(!showComments)}
            className="flex flex-col items-center justify-center group"
          >
            <div className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-purple-50 transition-colors relative">
              <MessageCircle className="w-5 h-5 text-[#7C3AED]" />
              <span className="absolute -top-1 -right-1 bg-[#D32F2F] text-white text-xs font-bold px-1.5 py-0.5 rounded-full min-w-[18px] text-center">
                {currentNews.comments}
              </span>
            </div>
          </button>

          {/* Bookmark Button */}
          <button 
            onClick={() => setBookmarked(!bookmarked)}
            className="flex flex-col items-center justify-center group"
          >
            <div className={`w-10 h-10 flex items-center justify-center rounded-full transition-all ${
              bookmarked ? 'bg-yellow-50' : 'hover:bg-yellow-50'
            }`}>
              <Bookmark 
                className={`w-5 h-5 transition-all ${
                  bookmarked ? 'text-[#FFC107] fill-[#FFC107]' : 'text-[#212121]'
                }`} 
              />
            </div>
          </button>
        </div>
      </div>

      {/* More Menu Modal */}
      {showMoreMenu && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-end z-50 animate-fade-in">
          <div className="bg-white w-full rounded-t-3xl p-6 animate-slide-up">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-bold text-[#212121]">More Options</h3>
              <button onClick={() => setShowMoreMenu(false)}>
                <X className="w-6 h-6 text-gray-400" />
              </button>
            </div>

            <div className="space-y-3">
              <button 
                onClick={() => setBookmarked(!bookmarked)}
                className="w-full flex items-center space-x-4 p-4 rounded-xl hover:bg-gray-50 transition-colors"
              >
                <Bookmark className={`w-6 h-6 ${bookmarked ? 'text-[#D32F2F] fill-[#D32F2F]' : 'text-gray-600'}`} />
                <span className="text-base font-semibold text-[#212121]">
                  {bookmarked ? 'Remove Bookmark' : 'Bookmark Story'}
                </span>
              </button>

              <button className="w-full flex items-center space-x-4 p-4 rounded-xl hover:bg-gray-50 transition-colors">
                <Download className="w-6 h-6 text-gray-600" />
                <span className="text-base font-semibold text-[#212121]">Download Image</span>
              </button>

              <button className="w-full flex items-center space-x-4 p-4 rounded-xl hover:bg-red-50 transition-colors">
                <Flag className="w-6 h-6 text-[#D32F2F]" />
                <span className="text-base font-semibold text-[#D32F2F]">Report Story</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Share Menu Modal */}
      {showShareMenu && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-end z-50 animate-fade-in">
          <div className="bg-white w-full rounded-t-3xl p-6 pb-24 animate-slide-up">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-bold text-[#212121]">Share Story</h3>
              <button onClick={() => setShowShareMenu(false)}>
                <X className="w-6 h-6 text-gray-400" />
              </button>
            </div>

            <div className="grid grid-cols-4 gap-4">
              <button className="flex flex-col items-center space-y-2">
                <div className="w-14 h-14 bg-[#25D366] rounded-2xl flex items-center justify-center shadow-lg">
                  <MessageCircle className="w-7 h-7 text-white" />
                </div>
                <span className="text-xs font-medium text-gray-600">WhatsApp</span>
              </button>

              <button className="flex flex-col items-center space-y-2">
                <div className="w-14 h-14 bg-[#1877F2] rounded-2xl flex items-center justify-center shadow-lg">
                  <Share2 className="w-7 h-7 text-white" />
                </div>
                <span className="text-xs font-medium text-gray-600">Facebook</span>
              </button>

              <button className="flex flex-col items-center space-y-2">
                <div className="w-14 h-14 bg-[#1DA1F2] rounded-2xl flex items-center justify-center shadow-lg">
                  <Share2 className="w-7 h-7 text-white" />
                </div>
                <span className="text-xs font-medium text-gray-600">Twitter</span>
              </button>

              <button className="flex flex-col items-center space-y-2">
                <div className="w-14 h-14 bg-gradient-to-br from-[#833AB4] via-[#FD1D1D] to-[#F77737] rounded-2xl flex items-center justify-center shadow-lg">
                  <Share2 className="w-7 h-7 text-white" />
                </div>
                <span className="text-xs font-medium text-gray-600">Instagram</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Filters Modal */}
      {showFilters && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-end z-50 animate-fade-in">
          <div className="bg-white w-full rounded-t-3xl shadow-2xl max-h-[85vh] flex flex-col">
            {/* Header - Fixed */}
            <div className="flex items-center justify-between p-6 pb-4 border-b border-gray-200">
              <h3 className="text-lg font-bold text-[#212121]">Customize Your Feed</h3>
              <button onClick={() => setShowFilters(false)}>
                <X className="w-6 h-6 text-gray-400" />
              </button>
            </div>

            {/* Scrollable Content */}
            <div className="flex-1 overflow-y-auto p-6 pt-4">
              {/* Language Filter */}
              <div className="mb-6">
                <h4 className="text-sm font-bold text-gray-500 uppercase mb-3">Language</h4>
                <div className="grid grid-cols-3 gap-2">
                  {languages.map((lang) => (
                    <button
                      key={lang}
                      onClick={() => setSelectedLanguage(lang)}
                      className={`p-3 rounded-xl text-sm font-semibold transition-all ${
                        selectedLanguage === lang
                          ? 'bg-[#D32F2F] text-white shadow-lg'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {lang}
                    </button>
                  ))}
                </div>
              </div>

              {/* Category Filter */}
              <div className="mb-6">
                <h4 className="text-sm font-bold text-gray-500 uppercase mb-3">Category</h4>
                <div className="grid grid-cols-2 gap-2">
                  {categories.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setSelectedCategory(cat)}
                      className={`p-3 rounded-xl text-sm font-semibold transition-all ${
                        selectedCategory === cat
                          ? 'bg-[#1976D2] text-white shadow-lg'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              {/* Location Selector */}
              <div className="mb-6">
                <h4 className="text-sm font-bold text-gray-500 uppercase mb-3">Location Preference</h4>
                <div className="space-y-3">
                  <select
                    className="w-full p-3 bg-gray-100 rounded-xl font-semibold text-gray-700 border-none outline-none"
                    value={selectedState}
                    onChange={handleStateChange}
                  >
                    {stateOptions.map((state) => (
                      <option key={state} value={state}>{state}</option>
                    ))}
                  </select>

                  <select
                    className="w-full p-3 bg-gray-100 rounded-xl font-semibold text-gray-700 border-none outline-none"
                    value={selectedDistrict}
                    onChange={handleDistrictChange}
                  >
                    {districtOptions.map((district) => (
                      <option key={district} value={district}>{district}</option>
                    ))}
                  </select>

                  <select
                    className="w-full p-3 bg-gray-100 rounded-xl font-semibold text-gray-700 border-none outline-none"
                    value={selectedMandal}
                    onChange={(e) => setSelectedMandal(e.target.value)}
                  >
                    {mandalOptions.map((mandal) => (
                      <option key={mandal} value={mandal}>{mandal}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Fixed Button at Bottom - Above bottom nav */}
            <div className="p-6 pt-3 bg-white border-t border-gray-200 mb-16">
              <button
                onClick={() => setShowFilters(false)}
                className="w-full p-4 bg-[#D32F2F] text-white rounded-xl font-bold shadow-lg hover:bg-[#C62828] transition-colors active:scale-95"
              >
                Apply Filters
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Swipe Indicator */}
      {currentIndex === 0 && (
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none z-30">
          <div className="bg-black/70 backdrop-blur-md text-white px-6 py-3 rounded-full animate-bounce">
            <p className="text-sm font-semibold">↑ Swipe to explore </p>
          </div>
        </div>
      )}

      {/* Comments Modal */}
      {showComments && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-end z-50 animate-fade-in">
          <div className="bg-white w-full rounded-t-3xl shadow-2xl max-h-[85vh] flex flex-col">
            {/* Header - Fixed */}
            <div className="flex items-center justify-between p-6 pb-4 border-b border-gray-200">
              <div className="flex items-center space-x-2">
                <MessageCircle className="w-5 h-5 text-[#7C3AED]" />
                <h3 className="text-lg font-bold text-[#212121]">
                  Comments ({currentNews.comments})
                </h3>
              </div>
              <button onClick={() => setShowComments(false)}>
                <X className="w-6 h-6 text-gray-400" />
              </button>
            </div>

            {/* Scrollable Comments */}
            <div className="flex-1 overflow-y-auto p-6 pt-4">
              {/* Mock Comments */}
              <div className="space-y-4">
                {/* User Posted Comments */}
                {userComments.map((comment) => (
                  <div key={comment.id} className="flex items-start space-x-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-[#10B981] to-[#059669] rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                      U
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-1">
                        <span className="font-bold text-sm text-[#212121]">You</span>
                        <span className="text-xs text-gray-500">{comment.time}</span>
                      </div>
                      <p className="text-sm text-gray-700">{comment.text}</p>
                      <div className="flex items-center space-x-4 mt-2">
                        <button className="flex items-center space-x-1 text-gray-500 hover:text-[#10B981]">
                          <ThumbsUp className="w-4 h-4" />
                          <span className="text-xs">0</span>
                        </button>
                        <button className="text-xs text-gray-500 hover:text-[#7C3AED]">Reply</button>
                      </div>
                    </div>
                  </div>
                ))}

                <div className="flex items-start space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-[#7C3AED] to-[#A855F7] rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                    RK
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                      <span className="font-bold text-sm text-[#212121]">Rajesh Kumar</span>
                      <span className="text-xs text-gray-500">2h ago</span>
                    </div>
                    <p className="text-sm text-gray-700">Great news! This will really help small businesses.</p>
                    <div className="flex items-center space-x-4 mt-2">
                      <button className="flex items-center space-x-1 text-gray-500 hover:text-[#10B981]">
                        <ThumbsUp className="w-4 h-4" />
                        <span className="text-xs">24</span>
                      </button>
                      <button className="text-xs text-gray-500 hover:text-[#7C3AED]">Reply</button>
                    </div>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-[#1976D2] to-[#2196F3] rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                    PS
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                      <span className="font-bold text-sm text-[#212121]">Priya Sharma</span>
                      <span className="text-xs text-gray-500">5h ago</span>
                    </div>
                    <p className="text-sm text-gray-700">Finally! Been waiting for this update.</p>
                    <div className="flex items-center space-x-4 mt-2">
                      <button className="flex items-center space-x-1 text-gray-500 hover:text-[#10B981]">
                        <ThumbsUp className="w-4 h-4" />
                        <span className="text-xs">12</span>
                      </button>
                      <button className="text-xs text-gray-500 hover:text-[#7C3AED]">Reply</button>
                    </div>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-[#D32F2F] to-[#F44336] rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                    AM
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                      <span className="font-bold text-sm text-[#212121]">Amit Mehta</span>
                      <span className="text-xs text-gray-500">1d ago</span>
                    </div>
                    <p className="text-sm text-gray-700">Can someone explain how this affects exports?</p>
                    <div className="flex items-center space-x-4 mt-2">
                      <button className="flex items-center space-x-1 text-gray-500 hover:text-[#10B981]">
                        <ThumbsUp className="w-4 h-4" />
                        <span className="text-xs">8</span>
                      </button>
                      <button className="text-xs text-gray-500 hover:text-[#7C3AED]">Reply</button>
                    </div>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-[#F57C00] to-[#FF9800] rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                    SK
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                      <span className="font-bold text-sm text-[#212121]">Sneha Kapoor</span>
                      <span className="text-xs text-gray-500">1d ago</span>
                    </div>
                    <p className="text-sm text-gray-700">Very informative! Thanks for sharing 🙏</p>
                    <div className="flex items-center space-x-4 mt-2">
                      <button className="flex items-center space-x-1 text-gray-500 hover:text-[#10B981]">
                        <ThumbsUp className="w-4 h-4" />
                        <span className="text-xs">15</span>
                      </button>
                      <button className="text-xs text-gray-500 hover:text-[#7C3AED]">Reply</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Comment Input - Fixed at Bottom */}
            <div className="p-4 border-t border-gray-200 mb-16 bg-white">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-br from-[#10B981] to-[#059669] rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                  U
                </div>
                <input
                  type="text"
                  placeholder="Add a comment..."
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                  className="flex-1 px-4 py-2 bg-gray-100 rounded-full text-sm outline-none focus:ring-2 focus:ring-[#7C3AED]"
                />
                <button
                  onClick={handlePostComment}
                  className="px-4 py-2 bg-[#7C3AED] text-white rounded-full text-sm font-semibold hover:bg-[#6D28D9] transition-colors"
                >
                  Post
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}