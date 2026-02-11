import { useState } from 'react';
import { ThumbsUp, ThumbsDown, MessageCircle, Share2, Bookmark, Facebook, Twitter, Linkedin, Mail, Link as LinkIcon, X } from 'lucide-react';

const shortNews = [
  {
    id: 1,
    image: 'https://images.unsplash.com/photo-1554224311-beee460c201f?w=600&h=800&fit=crop',
    headline: 'GST Council Announces Major Rate Changes for 2026',
    content: 'The 52nd GST Council meeting concluded with significant decisions affecting multiple sectors. Key highlights include reduction in tax rates for electronics from 18% to 12%, and introduction of new compliance measures for e-commerce operators. The Council also announced relaxation in return filing procedures for small taxpayers with turnover below Rs 5 crore. Finance Minister emphasized that these changes aim to simplify tax structure and boost manufacturing sector. The new rates will be effective from April 1, 2026. Industry bodies have welcomed the decision, particularly the reduction in electronics GST which is expected to make consumer goods more affordable.',
    time: '5 hours ago',
    likes: 1245,
    comments: 89,
  },
  {
    id: 2,
    image: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=600&h=800&fit=crop',
    headline: 'E-Invoice Mandatory for Rs 5 Crore Turnover Businesses',
    content: 'Government has mandated e-invoicing for all businesses with annual turnover exceeding Rs 5 crore starting from April 1, 2026. This move is expected to bring over 2 lakh additional businesses under the e-invoicing system. The Finance Ministry stated that this will significantly reduce tax evasion and ensure better compliance. Businesses will need to generate e-invoices through the Invoice Registration Portal (IRP) for all B2B transactions. The government has assured technical support and training programs for smooth transition. Tax experts suggest businesses should start preparing their systems immediately to avoid last-minute challenges.',
    time: '8 hours ago',
    likes: 892,
    comments: 45,
  },
  {
    id: 3,
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=800&fit=crop',
    headline: 'GST Return Filing Deadline Extended for Small Taxpayers',
    content: 'The Central Board of Indirect Taxes and Customs (CBIC) has extended the deadline for filing GSTR-3B and GSTR-1 returns for taxpayers with turnover less than Rs 5 crore. The new deadline is March 31, 2026, providing relief to over 1 crore small businesses. This extension comes in response to requests from trade bodies citing technical difficulties on the GST portal. The CBIC has also waived late fees for this period. Tax practitioners have appreciated this move, stating it will help small businesses focus on their core operations during the busy quarter-end period. The government portal has been upgraded to handle increased traffic.',
    time: '12 hours ago',
    likes: 1567,
    comments: 123,
  },
  {
    id: 4,
    image: 'https://images.unsplash.com/photo-1553877522-43269d4ea984?w=600&h=800&fit=crop',
    headline: 'Input Tax Credit Rules Simplified by GST Council',
    content: 'In a major relief to businesses, the GST Council has simplified Input Tax Credit (ITC) rules making it easier for companies to claim credit on their purchases. The new rules remove several restrictions that were causing compliance burden. Key changes include relaxation in time limits for claiming ITC, simplified documentation requirements, and automated verification process. The Council has also clarified that businesses can claim ITC even if suppliers have not filed their returns, subject to certain conditions. Industry experts believe this will improve cash flow for businesses and reduce litigation. The simplified rules are expected to boost business sentiment.',
    time: '1 day ago',
    likes: 2103,
    comments: 187,
  },
  {
    id: 5,
    image: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=600&h=800&fit=crop',
    headline: 'Supreme Court Verdict on GST on Real Estate',
    content: 'The Supreme Court has delivered a landmark judgment clarifying the applicability of GST on under-construction properties. The court ruled that GST at 5% without input tax credit is applicable on residential properties under construction, while completed properties are exempt. The judgment provides much-needed clarity to both developers and homebuyers who were facing confusion due to conflicting interpretations. The court also addressed the issue of transition from old regime to new GST rates. Real estate developers association has welcomed the verdict saying it will bring transparency in the sector. Legal experts suggest this will reduce disputes.',
    time: '1 day ago',
    likes: 1876,
    comments: 156,
  },
  {
    id: 6,
    image: 'https://images.unsplash.com/photo-1551836022-deb4988cc6c0?w=600&h=800&fit=crop',
    headline: 'GST Portal Launches New Features for Easy Compliance',
    content: 'The GST Network has launched several new features on the GST portal aimed at simplifying compliance for taxpayers. Key additions include an AI-powered chatbot for instant query resolution, automated return filing for regular taxpayers, and a mobile app with all essential features. The portal now also offers pre-filled return forms based on invoice data, reducing manual data entry. A new dashboard provides visual analytics of GST liability and ITC utilization. The government has also introduced video tutorials in multiple languages. Small businesses have particularly benefited from the simplified user interface and step-by-step guidance.',
    time: '2 days ago',
    likes: 945,
    comments: 67,
  },
  {
    id: 7,
    image: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=600&h=800&fit=crop',
    headline: 'GST Revenue Collection Hits Record High in January',
    content: 'Indias GST revenue collection for January 2026 has reached an all-time high of Rs 1.78 lakh crore, marking a 12% increase from the previous year. This surge is attributed to improved compliance, increased economic activity, and effective implementation of e-invoicing. The Finance Ministry highlighted that this achievement reflects the growing formalization of the economy. Experts believe the trend will continue as more businesses come under the tax net. The government has used these enhanced revenues for infrastructure development and social welfare programs. Tax authorities credit the success to technology-driven enforcement and taxpayer education initiatives.',
    time: '3 days ago',
    likes: 2234,
    comments: 198,
  },
  {
    id: 8,
    image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&h=800&fit=crop',
    headline: 'New GST Amnesty Scheme Announced for Pending Cases',
    content: 'The government has announced a special GST amnesty scheme offering relief to taxpayers with pending disputes and show-cause notices. Under this scheme, taxpayers can settle cases by paying a reduced penalty of 25% without interest for disputes up to Rs 10 lakh. For cases above Rs 10 lakh, a 50% penalty waiver is offered. The scheme covers disputes arising from mismatches, ITC denial, and classification issues. Tax experts expect over 5 lakh cases to be resolved under this scheme, providing significant relief to small and medium businesses. The scheme is open for 90 days from announcement date.',
    time: '4 days ago',
    likes: 1654,
    comments: 142,
  },
  {
    id: 9,
    image: 'https://images.unsplash.com/photo-1434626881859-194d67b2b86f?w=600&h=800&fit=crop',
    headline: 'GST on Online Gaming and Casinos: New Rules Clarified',
    content: 'The Finance Ministry has issued detailed guidelines on GST applicability for online gaming, casinos, and horse racing. The clarification states that 28% GST will be levied on the full face value of bets placed. This addresses the confusion in the industry regarding whether tax should be on gross gaming revenue or total bet amount. The new rules also mandate that gaming platforms must register in every state where they operate. Industry representatives have expressed concerns about the high tax rate impacting the sector. The government maintains this will ensure proper regulation and prevent tax evasion in the rapidly growing gaming industry.',
    time: '5 days ago',
    likes: 1432,
    comments: 234,
  },
  {
    id: 10,
    image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=600&h=800&fit=crop',
    headline: 'Export Incentives Under GST: Government Enhances Benefits',
    content: 'In a move to boost exports, the government has enhanced incentives under GST for export-oriented units. Key benefits include faster refund processing with a commitment to release refunds within 7 days, relaxation in bank guarantee requirements for regular exporters, and simplification of export documentation. The Commerce Ministry has also launched a dedicated helpdesk for resolving export-related GST queries. Export bodies have welcomed these measures stating they will improve competitiveness of Indian products in global markets. The government aims to increase exports by 15% in the current fiscal year. Special focus is being given to MSME exporters.',
    time: '6 days ago',
    likes: 1123,
    comments: 78,
  },
];

export default function ShortNewsScreen() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const [liked, setLiked] = useState(false);
  const [disliked, setDisliked] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);
  const [showShareMenu, setShowShareMenu] = useState(false);

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.touches[0].clientY);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.touches[0].clientY);
  };

  const handleTouchEnd = () => {
    if (touchStart === 0) return;
    
    const diff = touchStart - touchEnd;
    
    // Minimum swipe distance: 30px
    if (Math.abs(diff) > 30) {
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
  };

  const handleLike = () => {
    setLiked(!liked);
    if (disliked) setDisliked(false);
  };

  const handleDislike = () => {
    setDisliked(!disliked);
    if (liked) setLiked(false);
  };

  const handleShare = (platform: string) => {
    const news = shortNews[currentIndex];
    const text = encodeURIComponent(news.headline);
    const url = encodeURIComponent(window.location.href);

    const shareUrls: Record<string, string> = {
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${url}`,
      twitter: `https://twitter.com/intent/tweet?text=${text}&url=${url}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${url}`,
      whatsapp: `https://wa.me/?text=${text}%20${url}`,
      email: `mailto:?subject=${text}&body=${url}`,
    };

    if (platform === 'copy') {
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    } else if (shareUrls[platform]) {
      window.open(shareUrls[platform], '_blank');
    }
    setShowShareMenu(false);
  };

  const currentNews = shortNews[currentIndex];

  return (
    <div 
      className="h-screen w-full bg-white relative overflow-hidden flex flex-col"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* Upper Section - Image (40% of screen) */}
      <div className="h-[40vh] relative flex-shrink-0">
        <img
          src={currentNews.image}
          alt="News"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 to-transparent"></div>
        
        {/* Page Counter - Top Left */}
        <div className="absolute top-4 left-4 bg-black/70 backdrop-blur-sm px-3 py-1 rounded-full">
          <span className="text-white text-sm font-bold">
            {currentIndex + 1} of {shortNews.length}
          </span>
        </div>

        {/* Time - Top Right */}
        <div className="absolute top-4 right-4 bg-black/70 backdrop-blur-sm px-3 py-1 rounded-full">
          <span className="text-white text-xs font-medium">{currentNews.time}</span>
        </div>
      </div>

      {/* Middle Section - Content (40% of screen) */}
      <div className="h-[40vh] bg-white overflow-y-auto px-4 pt-4 pb-4 flex-shrink-0">
        {/* Headline */}
        <h2 className="text-xl font-bold text-black mb-3 leading-tight">
          {currentNews.headline}
        </h2>

        {/* Content Text */}
        <p className="text-sm text-[#6B7280] leading-relaxed">
          {currentNews.content}
        </p>
      </div>

      {/* Bottom Action Bar (Remaining ~20% for buttons) */}
      <div className="flex-1 bg-white border-t border-[#E5E7EB] flex items-center justify-center px-4 shadow-lg">
        <div className="flex items-center justify-around w-full max-w-md">
          {/* Like */}
          <button 
            onClick={handleLike}
            className="flex flex-col items-center space-y-1 group"
          >
            <ThumbsUp 
              className={`w-6 h-6 transition-colors ${
                liked ? 'text-[#E53935] fill-[#E53935]' : 'text-[#6B7280]'
              }`} 
            />
            <span className="text-xs font-semibold text-[#6B7280]">
              {liked ? currentNews.likes + 1 : currentNews.likes}
            </span>
          </button>

          {/* Dislike */}
          <button 
            onClick={handleDislike}
            className="flex flex-col items-center space-y-1 group"
          >
            <ThumbsDown 
              className={`w-6 h-6 transition-colors ${
                disliked ? 'text-[#E53935] fill-[#E53935]' : 'text-[#6B7280]'
              }`} 
            />
          </button>

          {/* Share */}
          <button 
            onClick={() => setShowShareMenu(!showShareMenu)}
            className="flex flex-col items-center space-y-1 group relative"
          >
            <Share2 className="w-6 h-6 text-[#6B7280] group-hover:text-[#E53935] transition-colors" />
            <span className="text-xs font-semibold text-[#6B7280]">Share</span>
          </button>

          {/* Comment */}
          <button className="flex flex-col items-center space-y-1 group">
            <MessageCircle className="w-6 h-6 text-[#6B7280] group-hover:text-[#E53935] transition-colors" />
            <span className="text-xs font-semibold text-[#6B7280]">{currentNews.comments}</span>
          </button>

          {/* Bookmark */}
          <button 
            onClick={() => setBookmarked(!bookmarked)}
            className="flex flex-col items-center space-y-1 group"
          >
            <Bookmark 
              className={`w-6 h-6 transition-colors ${
                bookmarked ? 'text-[#E53935] fill-[#E53935]' : 'text-[#6B7280]'
              }`} 
            />
          </button>
        </div>
      </div>

      {/* Share Menu Modal */}
      {showShareMenu && (
        <div className="fixed inset-0 bg-black/50 flex items-end z-50 animate-fade-in">
          <div className="bg-white w-full rounded-t-3xl p-6 animate-slide-up">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-bold text-black">Share via</h3>
              <button onClick={() => setShowShareMenu(false)}>
                <X className="w-6 h-6 text-[#6B7280]" />
              </button>
            </div>

            <div className="grid grid-cols-4 gap-4">
              {/* Facebook */}
              <button 
                onClick={() => handleShare('facebook')}
                className="flex flex-col items-center space-y-2"
              >
                <div className="w-14 h-14 bg-[#1877F2] rounded-full flex items-center justify-center">
                  <Facebook className="w-7 h-7 text-white" fill="white" />
                </div>
                <span className="text-xs text-[#6B7280]">Facebook</span>
              </button>

              {/* Twitter */}
              <button 
                onClick={() => handleShare('twitter')}
                className="flex flex-col items-center space-y-2"
              >
                <div className="w-14 h-14 bg-[#1DA1F2] rounded-full flex items-center justify-center">
                  <Twitter className="w-7 h-7 text-white" fill="white" />
                </div>
                <span className="text-xs text-[#6B7280]">Twitter</span>
              </button>

              {/* LinkedIn */}
              <button 
                onClick={() => handleShare('linkedin')}
                className="flex flex-col items-center space-y-2"
              >
                <div className="w-14 h-14 bg-[#0A66C2] rounded-full flex items-center justify-center">
                  <Linkedin className="w-7 h-7 text-white" fill="white" />
                </div>
                <span className="text-xs text-[#6B7280]">LinkedIn</span>
              </button>

              {/* WhatsApp */}
              <button 
                onClick={() => handleShare('whatsapp')}
                className="flex flex-col items-center space-y-2"
              >
                <div className="w-14 h-14 bg-[#25D366] rounded-full flex items-center justify-center">
                  <MessageCircle className="w-7 h-7 text-white" fill="white" />
                </div>
                <span className="text-xs text-[#6B7280]">WhatsApp</span>
              </button>

              {/* Email */}
              <button 
                onClick={() => handleShare('email')}
                className="flex flex-col items-center space-y-2"
              >
                <div className="w-14 h-14 bg-[#EA4335] rounded-full flex items-center justify-center">
                  <Mail className="w-7 h-7 text-white" />
                </div>
                <span className="text-xs text-[#6B7280]">Email</span>
              </button>

              {/* Copy Link */}
              <button 
                onClick={() => handleShare('copy')}
                className="flex flex-col items-center space-y-2"
              >
                <div className="w-14 h-14 bg-[#6B7280] rounded-full flex items-center justify-center">
                  <LinkIcon className="w-7 h-7 text-white" />
                </div>
                <span className="text-xs text-[#6B7280]">Copy Link</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Swipe Indicator */}
      {currentIndex < shortNews.length - 1 && (
        <div className="absolute bottom-20 left-1/2 -translate-x-1/2 text-[#6B7280] text-xs animate-bounce pointer-events-none">
          ↑ Swipe up for next
        </div>
      )}
    </div>
  );
}