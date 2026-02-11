import { useState, useEffect } from 'react';
import { 
  ThumbsUp, 
  ThumbsDown, 
  MessageCircle, 
  Share2, 
  MoreVertical,
  Bookmark,
  Download,
  Flag,
  Camera,
  User
} from 'lucide-react';
import { ImageWithFallback } from '@/app/components/figma/ImageWithFallback';
import { ProfileMenu } from '@/app/components/ProfileMenu';
import { SimpleUpload } from '@/app/components/SimpleUpload';
import { NewsRoboLogo } from '@/app/components/NewsRoboLogo';
import { ShareModal } from '@/app/components/ShareModal';
import { CommentsSection } from '@/app/components/CommentsSection';
import { ReporterLogin } from '@/app/components/ReporterLogin';
import { useReporterAuth } from '@/app/contexts/ReporterAuthContext';
import { bookmarkManager } from '@/app/utils/bookmarkManager';

interface NewsArticle {
  id: string;
  title: string;
  content: string;
  image: string;
  category: string;
  source: string;
  timestamp: string;
  location: string;
  trustScore: number;
  likes: number;
  dislikes: number;
  comments: number;
  tags?: string[];
  isBreaking?: boolean;
}

interface NewsFlipCardProps {
  news: NewsArticle;
  currentIndex: number;
  totalArticles: number;
  language: string;
  location: string;
  onLanguageChange?: (language: string) => void;
  onLocationChange?: (location: string) => void;
}

export function NewsFlipCard({ 
  news, 
  currentIndex, 
  totalArticles,
  language,
  location,
  onLanguageChange,
  onLocationChange
}: NewsFlipCardProps) {
  const [liked, setLiked] = useState(false);
  const [disliked, setDisliked] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);
  const [showMoreMenu, setShowMoreMenu] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showUpload, setShowUpload] = useState(false);
  const [shareModalOpen, setShareModalOpen] = useState(false);

  useEffect(() => {
    const isBookmarked = bookmarkManager.isBookmarked(news.id);
    setBookmarked(isBookmarked);
  }, [news.id]);

  const handleLike = () => {
    setLiked(!liked);
    if (disliked) setDisliked(false);
  };

  const handleDislike = () => {
    setDisliked(!disliked);
    if (liked) setLiked(false);
  };

  const handleShare = () => {
    setShareModalOpen(true);
  };

  const handleDownload = () => {
    // Mock download functionality
    alert('Image download started...');
    setShowMoreMenu(false);
  };

  const handleReport = () => {
    alert('Report submitted. Thank you for helping us maintain quality!');
    setShowMoreMenu(false);
  };

  const handleBookmark = () => {
    const toggleResult = bookmarkManager.toggle({
      id: news.id,
      title: news.title,
      content: news.content,
      image: news.image,
      category: news.category,
      timestamp: news.timestamp
    });
    setBookmarked(toggleResult);
    setShowMoreMenu(false);
  };

  const handleCitizenJournalism = () => {
    setShowUpload(true);
  };

  return (
    <div className="relative w-full h-full flex flex-col">
      {/* Photo Section - 42% */}
      <div className="relative h-[42vh] w-full overflow-hidden">
        <ImageWithFallback
          src={news.image}
          alt={news.title}
          className="w-full h-full object-cover"
        />
        
        {/* Profile Button - Top Left */}
        <button
          onClick={() => setShowProfileMenu(true)}
          className="absolute top-4 left-4 bg-black/60 backdrop-blur-sm p-2.5 rounded-full hover:bg-black/80 transition-all hover:scale-110"
        >
          <User className="w-5 h-5 text-white" />
        </button>

        {/* Category Badge - Bottom Left */}
        <div className="absolute bottom-4 left-4 bg-[#D32F2F] px-4 py-1.5 rounded-full">
          <span className="text-white text-sm font-semibold">{news.category}</span>
        </div>

        {/* Location Tag - Bottom Right */}
        <div className="absolute bottom-4 right-4 bg-black/60 backdrop-blur-sm px-3 py-1.5 rounded-full flex items-center gap-1.5">
          <div className="w-1.5 h-1.5 bg-[#D32F2F] rounded-full animate-pulse" />
          <span className="text-white text-xs font-medium">{news.location}</span>
        </div>
      </div>

      {/* Text Section - 52% */}
      <div className="h-[52vh] bg-white px-6 py-5 overflow-y-auto relative">
        {/* Source and Trust Score */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1.5">
              <NewsRoboLogo className="h-4 w-4" />
              <span className="text-[#D32F2F] font-bold text-xs">NEWS ROBO</span>
            </div>
            <div className="flex items-center gap-1 bg-green-100 px-2 py-0.5 rounded-full">
              <span className="text-green-700 text-xs font-medium">✓ {news.trustScore}%</span>
            </div>
          </div>
        </div>

        {/* Title */}
        <h1 className="text-[#212121] font-bold text-xl mb-3 leading-tight">
          {news.title}
        </h1>

        {/* Content */}
        <p className="text-[#212121]/80 text-base leading-relaxed mb-4">
          {news.content}
        </p>

        {/* Tags */}
        {news.tags && news.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {news.tags.map((tag, index) => (
              <span 
                key={index}
                className="text-xs bg-[#F5F5F5] text-[#212121]/70 px-2 py-1 rounded-full"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}

        {/* Bottom Info */}
        <div className="absolute bottom-5 left-6 right-6 flex items-center justify-between">
          <div className="text-[#212121]/50 text-xs">
            {currentIndex + 1} of {totalArticles} Pages
          </div>
          <div className="text-[#212121]/50 text-xs">
            {news.timestamp}
          </div>
        </div>
      </div>

      {/* Logo - Positioned at boundary between text and black bar */}
      <div className="absolute bottom-[3vh] left-1/2 -translate-x-1/2 z-40">
        <div className="relative w-16 h-16 rounded-full border-4 border-white shadow-lg overflow-hidden bg-white flex items-center justify-center">
          <NewsRoboLogo className="w-12 h-12" />
        </div>
      </div>

      {/* Bottom Action Bar - 6% (Black Area) */}
      <div className="absolute bottom-0 left-0 right-0 h-[6vh] bg-[#212121] flex items-center justify-around px-3 z-30">
        {/* More Options */}
        <div className="relative">
          <button
            onClick={() => setShowMoreMenu(!showMoreMenu)}
            className="flex flex-col items-center gap-1 hover:scale-110 transition-transform"
          >
            <MoreVertical className="w-5 h-5 text-white/90" />
          </button>
          
          {/* More Menu Dropdown */}
          {showMoreMenu && (
            <div className="absolute bottom-14 left-1/2 -translate-x-1/2 bg-white rounded-lg shadow-xl p-2 min-w-[140px] border border-gray-100">
              <button
                onClick={handleReport}
                className="w-full flex items-center gap-3 px-3 py-2 hover:bg-[#F5F5F5] rounded-lg text-left"
              >
                <Flag className="w-4 h-4 text-[#D32F2F]" />
                <span className="text-sm text-[#212121]">Report Story</span>
              </button>
              <button
                onClick={handleDownload}
                className="w-full flex items-center gap-3 px-3 py-2 hover:bg-[#F5F5F5] rounded-lg text-left"
              >
                <Download className="w-4 h-4 text-[#212121]" />
                <span className="text-sm text-[#212121]">Download</span>
              </button>
              <button
                onClick={handleBookmark}
                className="w-full flex items-center gap-3 px-3 py-2 hover:bg-[#F5F5F5] rounded-lg text-left"
              >
                <Bookmark className={`w-4 h-4 ${bookmarked ? 'text-[#FFC107] fill-[#FFC107]' : 'text-[#212121]'}`} />
                <span className="text-sm text-[#212121]">
                  {bookmarked ? 'Bookmarked' : 'Bookmark'}
                </span>
              </button>
            </div>
          )}
        </div>

        {/* Citizen Journalism - Yellow Camera Icon */}
        <button
          onClick={handleCitizenJournalism}
          className="flex flex-col items-center gap-1 hover:scale-110 transition-transform relative"
        >
          <div className="relative">
            <Camera className="w-6 h-6 text-[#FFC107]" />
            <div className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-[#D32F2F] rounded-full animate-pulse" />
          </div>
          <span className="text-[8px] text-[#FFC107] font-medium">Upload</span>
        </button>

        {/* Share */}
        <button
          onClick={handleShare}
          className="flex flex-col items-center gap-1 hover:scale-110 transition-transform"
        >
          <Share2 className="w-5 h-5 text-white/90" />
        </button>

        {/* Center spacer for logo */}
        <div className="w-8"></div>

        {/* Like */}
        <button
          onClick={handleLike}
          className="flex flex-col items-center gap-0.5 hover:scale-110 transition-transform"
        >
          <ThumbsUp className={`w-5 h-5 ${liked ? 'text-[#D32F2F] fill-[#D32F2F]' : 'text-white/90'}`} />
          <span className="text-[9px] text-white/80 font-medium">
            {news.likes + (liked ? 1 : 0)}
          </span>
        </button>

        {/* Dislike */}
        <button
          onClick={handleDislike}
          className="flex flex-col items-center gap-0.5 hover:scale-110 transition-transform"
        >
          <ThumbsDown className={`w-5 h-5 ${disliked ? 'text-white/90 fill-white/90' : 'text-white/90'}`} />
          <span className="text-[9px] text-white/80 font-medium">
            {news.dislikes + (disliked ? 1 : 0)}
          </span>
        </button>

        {/* Comments */}
        <button
          onClick={() => setShowComments(!showComments)}
          className="flex flex-col items-center gap-0.5 hover:scale-110 transition-transform"
        >
          <MessageCircle className="w-5 h-5 text-white/90" />
          <span className="text-[9px] text-white/80 font-medium">
            {news.comments}
          </span>
        </button>

        {/* Profile Menu */}
        <ProfileMenu
          isOpen={showProfileMenu}
          onClose={() => setShowProfileMenu(false)}
          currentLanguage={language}
          currentLocation={location}
          onLanguageChange={onLanguageChange || (() => {})}
          onLocationChange={onLocationChange || (() => {})}
        />
      </div>

      {/* Comments Panel */}
      <CommentsSection 
        isOpen={showComments}
        onClose={() => setShowComments(false)}
        newsId={news.id}
        newsTitle={news.title}
      />

      {/* Simple Upload Component */}
      <SimpleUpload isOpen={showUpload} onClose={() => setShowUpload(false)} />

      {/* Share Modal */}
      <ShareModal
        isOpen={shareModalOpen}
        onClose={() => setShareModalOpen(false)}
        title={news.title}
        content={news.content}
        url={window.location.href}
      />
    </div>
  );
}