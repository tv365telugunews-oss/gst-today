import { useNavigate } from 'react-router';
import { Play, Clock, TrendingUp } from 'lucide-react';
import { useState } from 'react';

const categories = [
  'All Videos',
  'Daily GST News',
  'GST Explained',
  'Returns & Filing',
  'Case Laws',
];

const videos = [
  {
    id: 'featured',
    title: 'GSTR-9 Annual Return Filing: Complete Guide',
    thumbnail: 'https://images.unsplash.com/photo-1553877522-43269d4ea984?w=600&h=400&fit=crop',
    duration: '12:45',
    views: '15K',
    category: 'Returns & Filing',
    featured: true,
  },
  {
    id: 2,
    title: 'Input Tax Credit Rules Explained',
    thumbnail: 'https://images.unsplash.com/photo-1554224311-beee460c201f?w=600&h=400&fit=crop',
    duration: '8:30',
    views: '22K',
    category: 'GST Explained',
  },
  {
    id: 3,
    title: 'E-Invoice Implementation: What You Need to Know',
    thumbnail: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop',
    duration: '10:15',
    views: '18K',
    category: 'Daily GST News',
  },
  {
    id: 4,
    title: 'GST on Services: Latest Updates',
    thumbnail: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=600&h=400&fit=crop',
    duration: '15:20',
    views: '12K',
    category: 'GST Explained',
  },
  {
    id: 5,
    title: 'Recent GST Case Laws Explained',
    thumbnail: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=600&h=400&fit=crop',
    duration: '20:00',
    views: '9K',
    category: 'Case Laws',
  },
  {
    id: 6,
    title: 'GSTR-1 Filing: Common Mistakes to Avoid',
    thumbnail: 'https://images.unsplash.com/photo-1551836022-deb4988cc6c0?w=600&h=400&fit=crop',
    duration: '9:45',
    views: '14K',
    category: 'Returns & Filing',
  },
];

export default function GSTTVScreen() {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState('All Videos');

  // Filter videos based on selected category
  const filteredVideos = selectedCategory === 'All Videos' 
    ? videos.slice(1) 
    : videos.slice(1).filter(video => video.category === selectedCategory);

  return (
    <div className="bg-[#F3F4F6] min-h-screen pb-20">
      {/* Header */}
      <header className="bg-[#E53935] text-white p-4 sticky top-0 z-10 shadow-md">
        <h1 className="text-xl font-bold">GST TV</h1>
        <p className="text-xs text-white/90">Watch and Learn GST</p>
      </header>

      {/* Featured Video */}
      <section className="p-4">
        <div
          onClick={() => navigate(`/app/gst-tv/featured`)}
          className="relative rounded-2xl overflow-hidden shadow-2xl cursor-pointer group"
        >
          <img
            src={videos[0].thumbnail}
            alt={videos[0].title}
            className="w-full h-56 object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
          
          {/* Play Button */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-16 h-16 bg-white/30 backdrop-blur-sm rounded-full flex items-center justify-center group-hover:bg-white/40 transition-colors">
              <Play className="w-8 h-8 text-white fill-white ml-1" />
            </div>
          </div>

          {/* Video Info */}
          <div className="absolute bottom-0 left-0 right-0 p-4">
            <span className="inline-block px-3 py-1 bg-[#DC2626] text-white text-xs font-bold rounded-full mb-2">
              FEATURED
            </span>
            <h3 className="text-white font-bold text-xl mb-2">
              {videos[0].title}
            </h3>
            <div className="flex items-center space-x-4 text-white/90 text-sm">
              <div className="flex items-center">
                <Clock className="w-4 h-4 mr-1" />
                {videos[0].duration}
              </div>
              <div className="flex items-center">
                <TrendingUp className="w-4 h-4 mr-1" />
                {videos[0].views} views
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="px-4 pb-4">
        <div className="flex space-x-2 overflow-x-auto scrollbar-hide pb-2">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-full font-semibold text-sm whitespace-nowrap transition-colors ${
                selectedCategory === category
                  ? 'bg-[#DC2626] text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-100'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </section>

      {/* Video List */}
      <section className="px-4 space-y-4">
        <h2 className="text-lg font-bold text-gray-900">
          {selectedCategory === 'All Videos' ? 'Latest Videos' : selectedCategory}
        </h2>
        {filteredVideos.length > 0 ? (
          <div className="space-y-4">
            {filteredVideos.map((video) => (
              <div
                key={video.id}
                onClick={() => navigate(`/app/gst-tv/${video.id}`)}
                className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow cursor-pointer"
              >
                <div className="flex">
                  {/* Thumbnail */}
                  <div className="relative w-40 h-24 flex-shrink-0">
                    <img
                      src={video.thumbnail}
                      alt={video.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                      <Play className="w-8 h-8 text-white fill-white" />
                    </div>
                    <div className="absolute bottom-1 right-1 bg-black/80 text-white text-xs px-1.5 py-0.5 rounded">
                      {video.duration}
                    </div>
                  </div>

                  {/* Video Info */}
                  <div className="flex-1 p-3">
                    <h3 className="font-bold text-gray-900 text-sm mb-1 line-clamp-2">
                      {video.title}
                    </h3>
                    <div className="flex items-center space-x-2 text-xs text-gray-600 mb-1">
                      <span>{video.views} views</span>
                    </div>
                    <span className="inline-block px-2 py-0.5 bg-blue-100 text-blue-700 text-xs font-medium rounded">
                      {video.category}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-xl p-8 text-center shadow-md">
            <Play className="w-12 h-12 text-gray-400 mx-auto mb-3" />
            <p className="text-gray-600 font-medium">No videos available in this category</p>
            <p className="text-sm text-gray-500 mt-1">Check back soon for new content!</p>
          </div>
        )}
      </section>
    </div>
  );
}