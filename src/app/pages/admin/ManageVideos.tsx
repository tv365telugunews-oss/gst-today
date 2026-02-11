import { useState } from 'react';
import { useNavigate } from 'react-router';
import { 
  ArrowLeft, 
  Search, 
  Plus, 
  Edit, 
  Trash2, 
  Eye,
  Filter,
  Video,
  Play,
  Clock
} from 'lucide-react';

const videos = [
  {
    id: 1,
    title: 'GSTR-9 Annual Return Filing: Complete Guide',
    thumbnail: 'https://images.unsplash.com/photo-1553877522-43269d4ea984?w=150&h=100&fit=crop',
    category: 'Returns & Filing',
    status: 'Published',
    views: '25.4K',
    duration: '12:45',
    date: '2024-02-09',
  },
  {
    id: 2,
    title: 'Input Tax Credit Rules Explained',
    thumbnail: 'https://images.unsplash.com/photo-1554224311-beee460c201f?w=150&h=100&fit=crop',
    category: 'GST Explained',
    status: 'Published',
    views: '22K',
    duration: '8:30',
    date: '2024-02-08',
  },
  {
    id: 3,
    title: 'E-Invoice Implementation Tutorial',
    thumbnail: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=150&h=100&fit=crop',
    category: 'Daily GST News',
    status: 'Published',
    views: '18K',
    duration: '10:15',
    date: '2024-02-07',
  },
  {
    id: 4,
    title: 'GST on Services: Latest Updates',
    thumbnail: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=150&h=100&fit=crop',
    category: 'GST Explained',
    status: 'Draft',
    views: '-',
    duration: '15:20',
    date: '2024-02-06',
  },
  {
    id: 5,
    title: 'GST Audit: What Businesses Should Know',
    thumbnail: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=150&h=100&fit=crop',
    category: 'Case Laws',
    status: 'Published',
    views: '16.7K',
    duration: '20:00',
    date: '2024-02-05',
  },
];

export default function ManageVideos() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('All');
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState<number | null>(null);
  const [showUploadModal, setShowUploadModal] = useState(false);

  const filteredVideos = videos.filter(video => {
    const matchesSearch = video.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = filterStatus === 'All' || video.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const handleDelete = (id: number) => {
    setSelectedVideo(id);
    setShowDeleteModal(true);
  };

  const confirmDelete = () => {
    // Delete logic here
    setShowDeleteModal(false);
    setSelectedVideo(null);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => navigate('/admin/dashboard')}
                className="w-10 h-10 bg-gray-100 rounded-xl flex items-center justify-center hover:bg-gray-200 transition-colors"
              >
                <ArrowLeft className="w-5 h-5 text-gray-600" />
              </button>
              <div>
                <h1 className="text-xl font-bold text-gray-900">Manage Videos</h1>
                <p className="text-sm text-gray-600">{filteredVideos.length} total videos</p>
              </div>
            </div>
            <button 
              onClick={() => setShowUploadModal(true)}
              className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-[#DC2626] to-[#B91C1C] text-white rounded-xl hover:shadow-lg transition-shadow"
            >
              <Plus className="w-5 h-5" />
              <span className="font-semibold">Upload Video</span>
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto p-4 space-y-4">
        {/* Search and Filter */}
        <div className="bg-white rounded-2xl p-4 shadow-md">
          <div className="flex flex-col md:flex-row gap-3">
            {/* Search */}
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search videos..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-[#DC2626] transition-colors"
              />
            </div>

            {/* Filter */}
            <div className="relative">
              <Filter className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="pl-12 pr-8 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-[#DC2626] transition-colors appearance-none cursor-pointer bg-white"
              >
                <option>All</option>
                <option>Published</option>
                <option>Draft</option>
              </select>
            </div>
          </div>
        </div>

        {/* Videos Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredVideos.map((video) => (
            <div key={video.id} className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-lg transition-shadow">
              {/* Thumbnail */}
              <div className="relative">
                <img
                  src={video.thumbnail}
                  alt={video.title}
                  className="w-full h-48 object-cover"
                />
                <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                  <div className="w-12 h-12 bg-white/90 rounded-full flex items-center justify-center">
                    <Play className="w-6 h-6 text-[#DC2626] fill-[#DC2626] ml-1" />
                  </div>
                </div>
                <div className="absolute bottom-2 right-2 px-2 py-1 bg-black/80 text-white text-xs font-bold rounded">
                  {video.duration}
                </div>
                <span className={`absolute top-2 left-2 px-2 py-1 text-xs font-bold rounded-lg ${
                  video.status === 'Published'
                    ? 'bg-green-500 text-white'
                    : 'bg-yellow-500 text-white'
                }`}>
                  {video.status}
                </span>
              </div>

              {/* Content */}
              <div className="p-4">
                <h3 className="font-bold text-gray-900 mb-2 line-clamp-2">{video.title}</h3>
                
                <div className="flex items-center justify-between mb-3">
                  <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs font-medium rounded">
                    {video.category}
                  </span>
                  <div className="flex items-center space-x-1 text-gray-600">
                    <Eye className="w-4 h-4" />
                    <span className="text-sm font-medium">{video.views}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
                  <span>{video.date}</span>
                </div>

                {/* Actions */}
                <div className="flex space-x-2">
                  <button className="flex-1 flex items-center justify-center space-x-1 px-3 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors">
                    <Edit className="w-4 h-4" />
                    <span className="text-sm font-semibold">Edit</span>
                  </button>
                  <button 
                    onClick={() => handleDelete(video.id)}
                    className="flex-1 flex items-center justify-center space-x-1 px-3 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                    <span className="text-sm font-semibold">Delete</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full">
            <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Video className="w-6 h-6 text-red-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 text-center mb-2">Delete Video?</h3>
            <p className="text-gray-600 text-center mb-6">
              Are you sure you want to delete this video? This action cannot be undone.
            </p>
            <div className="flex space-x-3">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="flex-1 px-4 py-3 bg-gray-100 text-gray-700 rounded-xl font-semibold hover:bg-gray-200 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="flex-1 px-4 py-3 bg-red-600 text-white rounded-xl font-semibold hover:bg-red-700 transition-colors"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Upload Video Modal */}
      {showUploadModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <h3 className="text-xl font-bold text-gray-900 mb-6">Upload New Video</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Video Title</label>
                <input
                  type="text"
                  placeholder="Enter video title"
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-[#DC2626] transition-colors"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Category</label>
                <select className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-[#DC2626] transition-colors">
                  <option>Returns & Filing</option>
                  <option>GST Explained</option>
                  <option>Daily GST News</option>
                  <option>Case Laws</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Video URL</label>
                <input
                  type="text"
                  placeholder="Enter video URL (YouTube, Vimeo, etc.)"
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-[#DC2626] transition-colors"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Duration</label>
                <input
                  type="text"
                  placeholder="e.g., 12:45"
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-[#DC2626] transition-colors"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Description</label>
                <textarea
                  rows={5}
                  placeholder="Write video description here..."
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-[#DC2626] transition-colors resize-none"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Status</label>
                <select className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-[#DC2626] transition-colors">
                  <option>Draft</option>
                  <option>Published</option>
                </select>
              </div>
            </div>

            <div className="flex space-x-3 mt-6">
              <button
                onClick={() => setShowUploadModal(false)}
                className="flex-1 px-4 py-3 bg-gray-100 text-gray-700 rounded-xl font-semibold hover:bg-gray-200 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  // Save logic here
                  alert('Video uploaded successfully!');
                  setShowUploadModal(false);
                }}
                className="flex-1 px-4 py-3 bg-gradient-to-r from-[#DC2626] to-[#B91C1C] text-white rounded-xl font-semibold hover:shadow-lg transition-shadow"
              >
                Upload Video
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}