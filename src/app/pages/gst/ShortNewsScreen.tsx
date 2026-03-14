import { useEffect, useMemo, useState } from 'react';
import { MessageCircle, Share2, Bookmark, ChevronUp, ChevronDown, MoreVertical, X, Flag, VolumeX, MapPin, ThumbsUp, ThumbsDown, Download } from 'lucide-react';
import { getStateNames, getDistrictsByState, getMandalsByDistrict } from '../../data/indianLocations';
import logoImg from '../../../assets/1a24d26cd66941b78a3f0f37f5bc5291408335be.png';

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

type TranslationTarget = 'Off' | 'Auto' | 'English' | 'Hindi' | 'Tamil' | 'Telugu' | 'Kannada' | 'Malayalam' | 'Gujarati' | 'Marathi' | 'Bengali';

const translationLanguageCodeMap: Record<Exclude<TranslationTarget, 'Off' | 'Auto'>, string> = {
  English: 'en',
  Hindi: 'hi',
  Tamil: 'ta',
  Telugu: 'te',
  Kannada: 'kn',
  Malayalam: 'ml',
  Gujarati: 'gu',
  Marathi: 'mr',
  Bengali: 'bn',
};

const translationTargetOptions: TranslationTarget[] = [
  'Off',
  'Auto',
  'English',
  'Hindi',
  'Tamil',
  'Telugu',
  'Kannada',
  'Malayalam',
  'Gujarati',
  'Marathi',
  'Bengali',
];

const browserLanguageToTarget: Record<string, Exclude<TranslationTarget, 'Off' | 'Auto'>> = {
  en: 'English',
  hi: 'Hindi',
  ta: 'Tamil',
  te: 'Telugu',
  kn: 'Kannada',
  ml: 'Malayalam',
  gu: 'Gujarati',
  mr: 'Marathi',
  bn: 'Bengali',
};

function detectAutoTranslationTarget(): Exclude<TranslationTarget, 'Off' | 'Auto'> {
  const browserLanguages = navigator.languages && navigator.languages.length > 0
    ? navigator.languages
    : [navigator.language];

  for (const languageTag of browserLanguages) {
    const normalized = (languageTag || '').toLowerCase().split('-')[0];
    if (browserLanguageToTarget[normalized]) {
      return browserLanguageToTarget[normalized];
    }
  }

  return 'English';
}

async function translateText(text: string, targetCode: string): Promise<string> {
  if (!text.trim()) {
    return text;
  }

  const endpoint = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=auto&tl=${targetCode}&dt=t&q=${encodeURIComponent(text)}`;
  const response = await fetch(endpoint);

  if (!response.ok) {
    throw new Error('Failed to translate text');
  }

  const payload = await response.json();
  const chunks = Array.isArray(payload?.[0]) ? payload[0] : [];
  const translated = chunks.map((chunk: unknown[]) => chunk?.[0]).join('');
  return translated || text;
}

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
  const [translationTarget, setTranslationTarget] = useState<TranslationTarget>('Off');
  const [isTranslating, setIsTranslating] = useState(false);
  const [translationError, setTranslationError] = useState('');
  const [translatedNews, setTranslatedNews] = useState<Record<string, { headline: string; content: string }>>({});
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
        if (currentIndex < filteredNews.length - 1) {
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

  const filteredNews = useMemo(() => {
    return shortNews.filter((news) => {
      const languageMatch = selectedLanguage === 'All Languages' || news.language === selectedLanguage;
      const categoryMatch = selectedCategory === 'All Categories' || news.category === selectedCategory;
      const stateMatch = selectedState === 'All States' || news.location.includes(selectedState);
      const districtMatch = selectedDistrict === 'All Districts' || news.district === selectedDistrict;
      const mandalMatch = selectedMandal === 'All Mandals' || news.mandal === selectedMandal;

      return languageMatch && categoryMatch && stateMatch && districtMatch && mandalMatch;
    });
  }, [selectedLanguage, selectedCategory, selectedState, selectedDistrict, selectedMandal]);

  useEffect(() => {
    if (currentIndex >= filteredNews.length) {
      setCurrentIndex(0);
    }
  }, [currentIndex, filteredNews.length]);

  const currentNews = filteredNews[currentIndex];

  const resolvedTargetLanguage = useMemo(() => {
    if (translationTarget === 'Off') {
      return null;
    }

    if (translationTarget === 'Auto') {
      const autoTarget = detectAutoTranslationTarget();
      return {
        label: autoTarget,
        code: translationLanguageCodeMap[autoTarget],
      };
    }

    return {
      label: translationTarget,
      code: translationLanguageCodeMap[translationTarget],
    };
  }, [translationTarget]);

  const currentTranslationKey = currentNews && resolvedTargetLanguage
    ? `${currentNews.id}-${resolvedTargetLanguage.code}`
    : '';

  const translatedCurrentNews = currentTranslationKey ? translatedNews[currentTranslationKey] : null;

  const translatedHeadline = translatedCurrentNews?.headline || currentNews?.headline || '';
  const translatedContent = translatedCurrentNews?.content || currentNews?.content || '';

  const handleTranslateInOneShot = async () => {
    if (!resolvedTargetLanguage || filteredNews.length === 0) {
      return;
    }

    setIsTranslating(true);
    setTranslationError('');

    try {
      const translatedEntries = await Promise.all(
        filteredNews.map(async (newsItem) => {
          const key = `${newsItem.id}-${resolvedTargetLanguage.code}`;

          if (translatedNews[key]) {
            return [key, translatedNews[key]] as const;
          }

          const [headline, content] = await Promise.all([
            translateText(newsItem.headline, resolvedTargetLanguage.code),
            translateText(newsItem.content, resolvedTargetLanguage.code),
          ]);

          return [
            key,
            {
              headline,
              content,
            },
          ] as const;
        })
      );

      setTranslatedNews((previous) => {
        const updates = Object.fromEntries(translatedEntries);
        return {
          ...previous,
          ...updates,
        };
      });
    } catch (error) {
      setTranslationError('Translation service is currently unavailable. Showing original text.');
    } finally {
      setIsTranslating(false);
    }
  };

  if (!currentNews) {
    return (
      <div className="h-screen w-full bg-[#F5F5F5] flex items-center justify-center px-6 text-center">
        <div>
          <h2 className="text-xl font-bold text-[#212121] mb-2">No news found</h2>
          <p className="text-gray-600 mb-4">Try changing filters to see available stories.</p>
          <button
            onClick={() => {
              setSelectedLanguage('All Languages');
              setSelectedCategory('All Categories');
              setSelectedState('All States');
              setSelectedDistrict('All Districts');
              setSelectedMandal('All Mandals');
              setShowFilters(false);
            }}
            className="px-4 py-2 bg-[#D32F2F] text-white rounded-lg font-semibold hover:bg-[#C62828] transition-colors"
          >
            Reset Filters
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen w-full bg-[#F5F5F5] relative overflow-hidden flex flex-col">
      {/* Top Filter Bar */}
      <div className="bg-[#D32F2F] px-4 py-3 flex items-center justify-between shadow-lg z-10">
        <div className="flex items-center space-x-2">
          <img 
            src={logoImg} 
            alt="GST TODAY TV" 
            className="h-10 w-10 object-contain"
          />
          <div className="flex items-center space-x-1.5">
            <MapPin className="w-3.5 h-3.5 text-white" />
            <span className="text-white text-xs font-semibold">{currentNews.location}</span>
          </div>
        </div>
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-white text-xs font-semibold hover:bg-white/30 transition-colors"
        >
          Filters
        </button>
      </div>

      {/* Main Content Container - Account for action bar and bottom nav */}
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
            <span className="text-white text-xs font-medium">{resolvedTargetLanguage ? `${currentNews.language} -> ${resolvedTargetLanguage.label}` : currentNews.language}</span>
          </div>

          {/* Swipe Navigation Hints */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex flex-col items-center space-y-1">
            <ChevronUp 
              className={`w-6 h-6 transition-opacity ${
                currentIndex === 0 ? 'text-white/30' : 'text-white animate-bounce'
              }`}
            />
            <span className="text-white text-xs font-semibold">{currentIndex + 1} / {filteredNews.length}</span>
            <ChevronDown 
              className={`w-6 h-6 transition-opacity ${
                currentIndex === filteredNews.length - 1 ? 'text-white/30' : 'text-white animate-bounce'
              }`}
            />
          </div>
        </div>

        {/* Content Section - 58% */}
        <div 
          className="absolute top-[42%] left-0 right-0 bottom-32 bg-white rounded-t-3xl shadow-2xl overflow-y-auto overscroll-contain"
          onTouchStart={(e) => e.stopPropagation()}
          onTouchMove={(e) => e.stopPropagation()}
          onTouchEnd={(e) => e.stopPropagation()}
        >
          <div className="p-6 space-y-4 pb-8">
            {/* Headline */}
            <h2 className="text-2xl font-bold text-[#212121] leading-tight">
              {translatedHeadline}
            </h2>

            {/* Time and Source */}
            <div className="flex items-center space-x-3 text-sm text-gray-600">
              <span>{currentNews.time}</span>
              <span>•</span>
              <span className="font-medium">GST TODAY</span>
            </div>

            {/* Content */}
            <p className="text-base text-gray-700 leading-relaxed">
              {translatedContent}
            </p>

            {translationError && (
              <p className="text-xs text-red-600 bg-red-50 border border-red-100 rounded-lg px-3 py-2">
                {translationError}
              </p>
            )}

            {/* Comments Section */}
            {showComments && (
              <div className="pt-4 border-t border-gray-200 space-y-4">
                <h3 className="font-bold text-gray-900">Comments ({currentNews.comments + userComments.length})</h3>
                
                {/* Comment Input */}
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#E53935] to-[#C62828] flex items-center justify-center flex-shrink-0">
                    <span className="text-white text-sm font-bold">U</span>
                  </div>
                  <div className="flex-1">
                    <textarea
                      value={commentText}
                      onChange={(e) => setCommentText(e.target.value)}
                      placeholder="Add a comment..."
                      className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#D32F2F] resize-none"
                      rows={2}
                    />
                    <button
                      onClick={handlePostComment}
                      disabled={!commentText.trim()}
                      className="mt-2 px-4 py-2 bg-[#D32F2F] text-white font-semibold rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[#C62828] transition-colors"
                    >
                      Post
                    </button>
                  </div>
                </div>

                {/* User Comments */}
                {userComments.map((comment) => (
                  <div key={comment.id} className="flex items-start space-x-3 p-3 bg-gray-50 rounded-xl">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#1976D2] to-[#1565C0] flex items-center justify-center flex-shrink-0">
                      <span className="text-white text-sm font-bold">U</span>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-1">
                        <span className="font-semibold text-gray-900 text-sm">You</span>
                        <span className="text-xs text-gray-500">{comment.time}</span>
                      </div>
                      <p className="text-gray-700 text-sm">{comment.text}</p>
                    </div>
                  </div>
                ))}

                {/* Sample Comments */}
                <div className="flex items-start space-x-3 p-3 bg-gray-50 rounded-xl">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center flex-shrink-0">
                    <span className="text-white text-sm font-bold">R</span>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                      <span className="font-semibold text-gray-900 text-sm">Rajesh Kumar</span>
                      <span className="text-xs text-gray-500">2 hours ago</span>
                    </div>
                    <p className="text-gray-700 text-sm">This is great news for small businesses! Finally some relief.</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3 p-3 bg-gray-50 rounded-xl">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center flex-shrink-0">
                    <span className="text-white text-sm font-bold">P</span>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                      <span className="font-semibold text-gray-900 text-sm">Priya Sharma</span>
                      <span className="text-xs text-gray-500">5 hours ago</span>
                    </div>
                    <p className="text-gray-700 text-sm">Very informative article. Thanks for sharing!</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Action Bar - Fixed at bottom, above navigation */}
      <div className="absolute bottom-16 left-0 right-0 bg-white border-t border-gray-200 px-4 py-2 z-30">
        <div className="flex items-center justify-between max-w-lg mx-auto">
          {/* Like */}
          <button
            onClick={handleLike}
            className="flex items-center space-x-1 group"
          >
            <ThumbsUp className={`w-5 h-5 transition-colors ${
              liked ? 'text-[#D32F2F] fill-[#D32F2F]' : 'text-gray-600'
            }`} />
            <span className={`text-sm font-semibold ${liked ? 'text-[#D32F2F]' : 'text-gray-700'}`}>
              {liked ? currentNews.likes + 1 : currentNews.likes}
            </span>
          </button>

          {/* Dislike */}
          <button
            onClick={handleDislike}
            className="flex items-center space-x-1 group"
          >
            <ThumbsDown className={`w-5 h-5 transition-colors ${
              disliked ? 'text-[#D32F2F] fill-[#D32F2F]' : 'text-gray-600'
            }`} />
            <span className={`text-sm font-semibold ${disliked ? 'text-[#D32F2F]' : 'text-gray-700'}`}>
              {disliked ? currentNews.dislikes + 1 : currentNews.dislikes}
            </span>
          </button>

          {/* Comments */}
          <button
            onClick={() => setShowComments(!showComments)}
            className="flex items-center space-x-1 group"
          >
            <MessageCircle className={`w-5 h-5 transition-colors ${
              showComments ? 'text-[#D32F2F]' : 'text-gray-600'
            }`} />
            <span className={`text-sm font-semibold ${showComments ? 'text-[#D32F2F]' : 'text-gray-700'}`}>
              {currentNews.comments + userComments.length}
            </span>
          </button>

          {/* Share */}
          <button
            onClick={() => setShowShareMenu(!showShareMenu)}
            className="flex items-center space-x-1 group relative"
          >
            <Share2 className={`w-5 h-5 transition-colors ${
              showShareMenu ? 'text-[#D32F2F]' : 'text-gray-600'
            }`} />
            <span className={`text-sm font-semibold ${showShareMenu ? 'text-[#D32F2F]' : 'text-gray-700'}`}>
              {currentNews.shares}
            </span>
          </button>

          {/* Bookmark */}
          <button
            onClick={() => setBookmarked(!bookmarked)}
            className="group"
          >
            <Bookmark className={`w-5 h-5 transition-colors ${
              bookmarked ? 'text-[#D32F2F] fill-[#D32F2F]' : 'text-gray-600'
            }`} />
          </button>

          {/* More Options */}
          <button
            onClick={() => setShowMoreMenu(!showMoreMenu)}
            className="group relative"
          >
            <MoreVertical className={`w-5 h-5 transition-colors ${
              showMoreMenu ? 'text-[#D32F2F]' : 'text-gray-600'
            }`} />
          </button>
        </div>
      </div>

      {/* Share Menu Popup */}
      {showShareMenu && (
        <div className="absolute bottom-32 left-1/2 -translate-x-1/2 bg-white rounded-2xl shadow-2xl border border-gray-200 p-4 w-72 z-40">
          <button
            onClick={() => setShowShareMenu(false)}
            className="absolute top-2 right-2 p-1 hover:bg-gray-100 rounded-full"
          >
            <X className="w-4 h-4 text-gray-600" />
          </button>
          <h3 className="font-bold text-gray-900 mb-3">Share via</h3>
          <div className="grid grid-cols-3 gap-3">
            {/* WhatsApp */}
            <button className="flex flex-col items-center space-y-1 p-2 hover:bg-gray-50 rounded-xl transition-colors">
              <div className="w-12 h-12 bg-[#25D366] rounded-full flex items-center justify-center">
                <svg className="w-7 h-7 text-white" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                </svg>
              </div>
              <span className="text-xs text-gray-700">WhatsApp</span>
            </button>
            
            {/* Facebook */}
            <button className="flex flex-col items-center space-y-1 p-2 hover:bg-gray-50 rounded-xl transition-colors">
              <div className="w-12 h-12 bg-[#1877F2] rounded-full flex items-center justify-center">
                <svg className="w-7 h-7 text-white" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </div>
              <span className="text-xs text-gray-700">Facebook</span>
            </button>
            
            {/* Twitter/X */}
            <button className="flex flex-col items-center space-y-1 p-2 hover:bg-gray-50 rounded-xl transition-colors">
              <div className="w-12 h-12 bg-black rounded-full flex items-center justify-center">
                <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </div>
              <span className="text-xs text-gray-700">Twitter</span>
            </button>
          </div>
        </div>
      )}

      {/* More Options Menu */}
      {showMoreMenu && (
        <div className="absolute bottom-32 right-4 bg-white rounded-2xl shadow-2xl border border-gray-200 w-56 overflow-hidden z-40">
          <button
            onClick={() => setShowMoreMenu(false)}
            className="absolute top-2 right-2 p-1 hover:bg-gray-100 rounded-full z-10"
          >
            <X className="w-4 h-4 text-gray-600" />
          </button>
          <div className="py-2">
            <button className="w-full flex items-center space-x-3 px-4 py-3 hover:bg-gray-50 transition-colors">
              <Download className="w-5 h-5 text-gray-700" />
              <span className="text-sm font-medium text-gray-900">Download</span>
            </button>
            <button className="w-full flex items-center space-x-3 px-4 py-3 hover:bg-gray-50 transition-colors">
              <Flag className="w-5 h-5 text-gray-700" />
              <span className="text-sm font-medium text-gray-900">Report</span>
            </button>
            <button className="w-full flex items-center space-x-3 px-4 py-3 hover:bg-gray-50 transition-colors">
              <VolumeX className="w-5 h-5 text-gray-700" />
              <span className="text-sm font-medium text-gray-900">Mute</span>
            </button>
          </div>
        </div>
      )}

      {/* Filter Panel Overlay */}
      {showFilters && (
        <div className="absolute inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-end">
          <div className="w-full bg-white rounded-t-3xl max-h-[80vh] overflow-y-auto">
            {/* Filter Header */}
            <div className="sticky top-0 bg-white px-6 py-4 border-b border-gray-200 flex items-center justify-between">
              <h2 className="text-xl font-bold text-gray-900">Filters</h2>
              <button
                onClick={() => setShowFilters(false)}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X className="w-6 h-6 text-gray-600" />
              </button>
            </div>

            <div className="p-6 space-y-6">
              {/* Language Filter */}
              <div>
                <label className="block text-sm font-bold text-gray-900 mb-3">Language</label>
                <select
                  value={selectedLanguage}
                  onChange={(e) => setSelectedLanguage(e.target.value)}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#D32F2F]"
                >
                  {languages.map((lang) => (
                    <option key={lang} value={lang}>{lang}</option>
                  ))}
                </select>
              </div>

              {/* Translation */}
              <div>
                <label className="block text-sm font-bold text-gray-900 mb-3">Auto Translation</label>
                <select
                  value={translationTarget}
                  onChange={(e) => setTranslationTarget(e.target.value as TranslationTarget)}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#D32F2F]"
                >
                  {translationTargetOptions.map((target) => (
                    <option key={target} value={target}>
                      {target === 'Auto' ? 'Auto (Device Language)' : target}
                    </option>
                  ))}
                </select>
                <button
                  onClick={handleTranslateInOneShot}
                  disabled={translationTarget === 'Off' || isTranslating}
                  className="w-full mt-3 px-4 py-3 bg-[#212121] text-white font-semibold rounded-xl disabled:opacity-50 disabled:cursor-not-allowed hover:bg-black transition-colors"
                >
                  {isTranslating ? 'Translating...' : 'Translate In One Shot'}
                </button>
              </div>

              {/* Category Filter */}
              <div>
                <label className="block text-sm font-bold text-gray-900 mb-3">Category</label>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#D32F2F]"
                >
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>

              {/* State Filter */}
              <div>
                <label className="block text-sm font-bold text-gray-900 mb-3">State</label>
                <select
                  value={selectedState}
                  onChange={handleStateChange}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#D32F2F]"
                >
                  <option value="All States">All States</option>
                  {stateOptions.map((state) => (
                    <option key={state} value={state}>{state}</option>
                  ))}
                </select>
              </div>

              {/* District Filter */}
              {selectedState !== 'All States' && (
                <div>
                  <label className="block text-sm font-bold text-gray-900 mb-3">District</label>
                  <select
                    value={selectedDistrict}
                    onChange={handleDistrictChange}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#D32F2F]"
                  >
                    <option value="All Districts">All Districts</option>
                    {districtOptions.map((district) => (
                      <option key={district} value={district}>{district}</option>
                    ))}
                  </select>
                </div>
              )}

              {/* Mandal Filter */}
              {selectedDistrict !== 'All Districts' && (
                <div>
                  <label className="block text-sm font-bold text-gray-900 mb-3">Mandal/City</label>
                  <select
                    value={selectedMandal}
                    onChange={(e) => setSelectedMandal(e.target.value)}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#D32F2F]"
                  >
                    <option value="All Mandals">All Mandals</option>
                    {mandalOptions.map((mandal) => (
                      <option key={mandal} value={mandal}>{mandal}</option>
                    ))}
                  </select>
                </div>
              )}

              {/* Apply Button */}
              <button
                onClick={() => {
                  setCurrentIndex(0);
                  setShowFilters(false);
                }}
                className="w-full py-4 bg-[#D32F2F] text-white font-bold rounded-xl shadow-lg hover:bg-[#C62828] transition-colors"
              >
                Apply Filters
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}