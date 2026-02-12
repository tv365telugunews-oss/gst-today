import { useState, useRef, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router';
import { ArrowLeft, ThumbsUp, Share2, Play, Pause, Maximize, Minimize, Volume2, VolumeX } from 'lucide-react';

const videoData = {
  title: 'GSTR-9 Annual Return Filing: Complete Step by Step Guide',
  date: 'Feb 10, 2026',
  views: '15.2K views',
  likes: '1.2K',
  description: 'Learn how to file GSTR-9 Annual Return with this comprehensive guide. We cover all sections, common mistakes to avoid, and practical tips for accurate filing. Perfect for tax professionals, accountants, and business owners.',
};

const relatedVideos = [
  {
    id: 2,
    title: 'Input Tax Credit Rules Explained',
    thumbnail: 'https://images.unsplash.com/photo-1554224311-beee460c201f?w=400&h=300&fit=crop',
    duration: '8:30',
    views: '22K',
  },
  {
    id: 3,
    title: 'E-Invoice Implementation Guide',
    thumbnail: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=300&fit=crop',
    duration: '10:15',
    views: '18K',
  },
  {
    id: 4,
    title: 'GST on Services: Latest Updates',
    thumbnail: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=400&h=300&fit=crop',
    duration: '15:20',
    views: '12K',
  },
];

export default function VideoPlayerScreen() {
  const { videoId } = useParams();
  const navigate = useNavigate();
  const [isPlaying, setIsPlaying] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const controlsTimeoutRef = useRef<NodeJS.Timeout>();

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  const handleMouseMove = () => {
    setShowControls(true);
    if (controlsTimeoutRef.current) {
      clearTimeout(controlsTimeoutRef.current);
    }
    controlsTimeoutRef.current = setTimeout(() => {
      if (isPlaying && isFullscreen) {
        setShowControls(false);
      }
    }, 3000);
  };

  useEffect(() => {
    return () => {
      if (controlsTimeoutRef.current) {
        clearTimeout(controlsTimeoutRef.current);
      }
    };
  }, []);

  return (
    <div className={`bg-gray-50 min-h-screen pb-20 ${isFullscreen ? 'fixed inset-0 z-50 bg-black pb-0' : ''}`}>
      {/* Header - Hide in fullscreen */}
      {!isFullscreen && (
        <header className="bg-[#E53935] text-white p-4 flex items-center sticky top-0 z-10">
          <button
            onClick={() => navigate('/app/gst-tv')}
            className="p-2 -ml-2 hover:bg-white/20 rounded-full transition-colors"
          >
            <ArrowLeft className="w-6 h-6" />
          </button>
          <h1 className="text-lg font-bold ml-2">Video Player</h1>
        </header>
      )}

      {/* Video Player Container */}
      <section 
        className={`bg-black relative ${isFullscreen ? 'h-full flex items-center justify-center' : ''}`}
        onMouseMove={handleMouseMove}
        onTouchStart={handleMouseMove}
      >
        <div className={`relative ${isFullscreen ? 'w-full h-full' : 'aspect-video'} max-w-full`}>
          {/* Video Thumbnail/Player */}
          <img
            src="https://images.unsplash.com/photo-1553877522-43269d4ea984?w=1200&h=675&fit=crop"
            alt="Video"
            className="w-full h-full object-cover"
          />
          
          {/* Play/Pause Overlay */}
          <div 
            className="absolute inset-0 bg-black/20 flex items-center justify-center cursor-pointer"
            onClick={togglePlay}
          >
            {!isPlaying && (
              <div className="w-20 h-20 bg-white/30 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/40 transition-colors">
                <Play className="w-10 h-10 text-white fill-white ml-1" />
              </div>
            )}
          </div>

          {/* Video Controls - YouTube Style */}
          {showControls && (
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 via-black/70 to-transparent p-4">
              {/* Progress Bar */}
              <div className="mb-3">
                <div className="relative h-1 bg-white/30 rounded-full cursor-pointer hover:h-2 transition-all group">
                  <div className="absolute h-full w-1/3 bg-[#E53935] rounded-full"></div>
                  <div className="absolute h-3 w-3 bg-[#E53935] rounded-full top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity" style={{ left: '33%' }}></div>
                </div>
                <div className="flex justify-between text-xs text-white mt-1">
                  <span>4:32</span>
                  <span>12:45</span>
                </div>
              </div>

              {/* Control Buttons */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  {/* Play/Pause */}
                  <button 
                    onClick={togglePlay}
                    className="text-white hover:text-[#E53935] transition-colors"
                  >
                    {isPlaying ? (
                      <Pause className="w-8 h-8" fill="white" />
                    ) : (
                      <Play className="w-8 h-8" fill="white" />
                    )}
                  </button>

                  {/* Volume */}
                  <button 
                    onClick={toggleMute}
                    className="text-white hover:text-[#E53935] transition-colors"
                  >
                    {isMuted ? (
                      <VolumeX className="w-6 h-6" />
                    ) : (
                      <Volume2 className="w-6 h-6" />
                    )}
                  </button>

                  {/* Time Display */}
                  <span className="text-white text-sm font-semibold">4:32 / 12:45</span>
                </div>

                <div className="flex items-center space-x-4">
                  {/* Quality Selector */}
                  <button className="text-white text-sm font-semibold hover:text-[#E53935] transition-colors px-2 py-1 border border-white/50 rounded">
                    720p
                  </button>

                  {/* Fullscreen Toggle */}
                  <button 
                    onClick={toggleFullscreen}
                    className="text-white hover:text-[#E53935] transition-colors"
                    title={isFullscreen ? 'Exit Fullscreen' : 'Enter Fullscreen'}
                  >
                    {isFullscreen ? (
                      <Minimize className="w-6 h-6" />
                    ) : (
                      <Maximize className="w-6 h-6" />
                    )}
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Back Button in Fullscreen */}
          {isFullscreen && showControls && (
            <button
              onClick={toggleFullscreen}
              className="absolute top-4 left-4 p-2 bg-black/50 backdrop-blur-sm rounded-full text-white hover:bg-black/70 transition-colors"
            >
              <ArrowLeft className="w-6 h-6" />
            </button>
          )}

          {/* Fullscreen Title */}
          {isFullscreen && showControls && (
            <div className="absolute top-4 left-16 right-4">
              <h2 className="text-white text-lg font-bold drop-shadow-lg">
                {videoData.title}
              </h2>
            </div>
          )}
        </div>
      </section>

      {/* Video Info - Hide in fullscreen */}
      {!isFullscreen && (
        <>
          <section className="bg-white p-4 border-b border-gray-200">
            <h2 className="text-xl font-bold text-gray-900 mb-2">
              {videoData.title}
            </h2>
            <div className="flex items-center justify-between mb-4">
              <div className="text-sm text-gray-600">
                {videoData.views} • {videoData.date}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center space-x-4">
              <button className="flex items-center space-x-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-full transition-colors">
                <ThumbsUp className="w-5 h-5" />
                <span className="font-semibold">{videoData.likes}</span>
              </button>
              <button className="flex items-center space-x-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-full transition-colors">
                <Share2 className="w-5 h-5" />
                <span className="font-semibold">Share</span>
              </button>
            </div>
          </section>

          {/* Description */}
          <section className="bg-white p-4 border-b border-gray-200">
            <h3 className="font-bold text-gray-900 mb-2">Description</h3>
            <p className="text-sm text-gray-700 leading-relaxed">
              {videoData.description}
            </p>
          </section>

          {/* Related Videos */}
          <section className="bg-white p-4 pb-20">
            <h3 className="font-bold text-gray-900 mb-4">Related Videos</h3>
            <div className="space-y-4">
              {relatedVideos.map((video) => (
                <div
                  key={video.id}
                  onClick={() => navigate(`/app/gst-tv/${video.id}`)}
                  className="flex space-x-3 cursor-pointer group"
                >
                  <div className="relative flex-shrink-0 w-40 h-24 rounded-lg overflow-hidden">
                    <img
                      src={video.thumbnail}
                      alt={video.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                    />
                    <div className="absolute bottom-1 right-1 bg-black/80 text-white text-xs px-1 rounded">
                      {video.duration}
                    </div>
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-900 text-sm line-clamp-2 mb-1 group-hover:text-[#E53935]">
                      {video.title}
                    </h4>
                    <p className="text-xs text-gray-600">{video.views} views</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </>
      )}
    </div>
  );
}