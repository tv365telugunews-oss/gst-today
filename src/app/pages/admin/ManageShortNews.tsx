import { useState } from 'react';
import { useNavigate } from 'react-router';
import { ArrowLeft, Plus, Edit, Trash2, Eye } from 'lucide-react';

interface ShortNews {
  id: number;
  image: string;
  headline: string;
  content: string;
  time: string;
  likes: number;
  comments: number;
  active: boolean;
}

export default function ManageShortNews() {
  const navigate = useNavigate();
  const [news, setNews] = useState<ShortNews[]>([
    {
      id: 1,
      image: 'https://images.unsplash.com/photo-1554224311-beee460c201f?w=600&h=800&fit=crop',
      headline: 'GST Council Announces Major Rate Changes for 2026',
      content: 'The 52nd GST Council meeting concluded with significant decisions affecting multiple sectors. Key highlights include reduction in tax rates for electronics from 18% to 12%, and introduction of new compliance measures for e-commerce operators.',
      time: '5 hours ago',
      likes: 1245,
      comments: 89,
      active: true,
    },
    {
      id: 2,
      image: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=600&h=800&fit=crop',
      headline: 'E-Invoice Mandatory for Rs 5 Crore Turnover Businesses',
      content: 'Government has mandated e-invoicing for all businesses with annual turnover exceeding Rs 5 crore starting from April 1, 2026. This move is expected to bring over 2 lakh additional businesses under the e-invoicing system.',
      time: '8 hours ago',
      likes: 892,
      comments: 45,
      active: true,
    },
  ]);

  const [showModal, setShowModal] = useState(false);
  const [editingNews, setEditingNews] = useState<ShortNews | null>(null);
  const [formData, setFormData] = useState({
    headline: '',
    content: '',
    image: '',
  });

  const handleDelete = (id: number) => {
    if (confirm('Are you sure you want to delete this news item?')) {
      setNews(news.filter(n => n.id !== id));
    }
  };

  const handleToggleActive = (id: number) => {
    setNews(news.map(n => 
      n.id === id ? { ...n, active: !n.active } : n
    ));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (editingNews) {
      setNews(news.map(n => 
        n.id === editingNews.id 
          ? { ...n, ...formData }
          : n
      ));
    } else {
      const newNews: ShortNews = {
        id: Math.max(...news.map(n => n.id), 0) + 1,
        ...formData,
        time: 'Just now',
        likes: 0,
        comments: 0,
        active: true,
      };
      setNews([newNews, ...news]);
    }
    
    setShowModal(false);
    setEditingNews(null);
    setFormData({ headline: '', content: '', image: '' });
  };

  const openEditModal = (item: ShortNews) => {
    setEditingNews(item);
    setFormData({
      headline: item.headline,
      content: item.content,
      image: item.image,
    });
    setShowModal(true);
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
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <ArrowLeft className="w-6 h-6 text-gray-700" />
              </button>
              <div>
                <h1 className="text-xl font-bold text-gray-900">Manage Short News</h1>
                <p className="text-sm text-gray-600">Flip-style news cards</p>
              </div>
            </div>
            <button
              onClick={() => setShowModal(true)}
              className="flex items-center space-x-2 px-4 py-2 bg-[#E53935] text-white rounded-lg hover:bg-[#C62828] transition-colors"
            >
              <Plus className="w-5 h-5" />
              <span>Add News</span>
            </button>
          </div>
        </div>
      </header>

      {/* Content */}
      <div className="max-w-7xl mx-auto p-4">
        <div className="space-y-4">
          {news.map((item) => (
            <div key={item.id} className="bg-white rounded-xl shadow-md overflow-hidden">
              <div className="flex flex-col md:flex-row">
                {/* Image */}
                <div className="md:w-48 h-48 md:h-auto flex-shrink-0">
                  <img
                    src={item.image}
                    alt={item.headline}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Content */}
                <div className="flex-1 p-6">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-gray-900 mb-2">{item.headline}</h3>
                      <p className="text-sm text-gray-600 line-clamp-2">{item.content}</p>
                    </div>
                    <span className={`ml-4 px-2 py-1 rounded-full text-xs font-semibold whitespace-nowrap ${
                      item.active ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'
                    }`}>
                      {item.active ? 'Active' : 'Inactive'}
                    </span>
                  </div>

                  {/* Stats */}
                  <div className="flex items-center space-x-4 text-sm text-gray-500 mb-4">
                    <span>{item.likes} likes</span>
                    <span>{item.comments} comments</span>
                    <span>{item.time}</span>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => handleToggleActive(item.id)}
                      className={`px-4 py-2 rounded-lg font-semibold text-sm transition-colors ${
                        item.active
                          ? 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                          : 'bg-green-500 text-white hover:bg-green-600'
                      }`}
                    >
                      {item.active ? 'Deactivate' : 'Activate'}
                    </button>
                    
                    <button
                      onClick={() => openEditModal(item)}
                      className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                    >
                      <Edit className="w-5 h-5" />
                    </button>
                    
                    <button
                      onClick={() => handleDelete(item.id)}
                      className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Add/Edit Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                {editingNews ? 'Edit Short News' : 'Add New Short News'}
              </h2>
              
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Headline
                  </label>
                  <input
                    type="text"
                    value={formData.headline}
                    onChange={(e) => setFormData({ ...formData, headline: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#E53935]"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Content (500 characters max)
                  </label>
                  <textarea
                    value={formData.content}
                    onChange={(e) => setFormData({ ...formData, content: e.target.value.slice(0, 500) })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#E53935] h-32"
                    required
                  />
                  <p className="text-xs text-gray-500 mt-1">{formData.content.length}/500 characters</p>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Image URL
                  </label>
                  <input
                    type="url"
                    value={formData.image}
                    onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#E53935]"
                    placeholder="https://example.com/image.jpg"
                    required
                  />
                  {formData.image && (
                    <img src={formData.image} alt="Preview" className="mt-2 w-full h-48 object-cover rounded-lg" />
                  )}
                </div>

                <div className="flex space-x-3 pt-4">
                  <button
                    type="button"
                    onClick={() => {
                      setShowModal(false);
                      setEditingNews(null);
                      setFormData({ headline: '', content: '', image: '' });
                    }}
                    className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 px-4 py-2 bg-[#E53935] text-white rounded-lg hover:bg-[#C62828] transition-colors"
                  >
                    {editingNews ? 'Update' : 'Create'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
