import { useState } from 'react';
import { useNavigate } from 'react-router';
import { ArrowLeft, Plus, Edit, Trash2, Image as ImageIcon } from 'lucide-react';

interface Ad {
  id: number;
  image: string;
  title: string;
  subtitle: string;
  bgColor: string;
  active: boolean;
}

export default function ManageAds() {
  const navigate = useNavigate();
  const [ads, setAds] = useState<Ad[]>([
    {
      id: 1,
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=400&fit=crop',
      title: 'GST Compliance Made Easy',
      subtitle: 'Get Expert Guidance Today',
      bgColor: 'from-blue-600 to-blue-800',
      active: true,
    },
    {
      id: 2,
      image: 'https://images.unsplash.com/photo-1554224311-beee460c201f?w=800&h=400&fit=crop',
      title: 'File Returns in Minutes',
      subtitle: 'Trusted by 10,000+ Businesses',
      bgColor: 'from-green-600 to-green-800',
      active: true,
    },
    {
      id: 3,
      image: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=800&h=400&fit=crop',
      title: 'GST Software Solutions',
      subtitle: 'Automate Your Tax Management',
      bgColor: 'from-purple-600 to-purple-800',
      active: true,
    },
    {
      id: 4,
      image: 'https://images.unsplash.com/photo-1551836022-deb4988cc6c0?w=800&h=400&fit=crop',
      title: 'E-Invoice Integration',
      subtitle: 'Seamless & Secure Platform',
      bgColor: 'from-red-600 to-red-800',
      active: true,
    },
  ]);

  const [showAddModal, setShowAddModal] = useState(false);
  const [editingAd, setEditingAd] = useState<Ad | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    subtitle: '',
    image: '',
    bgColor: 'from-blue-600 to-blue-800',
  });

  const handleDelete = (id: number) => {
    if (confirm('Are you sure you want to delete this ad?')) {
      setAds(ads.filter(ad => ad.id !== id));
    }
  };

  const handleToggleActive = (id: number) => {
    setAds(ads.map(ad => 
      ad.id === id ? { ...ad, active: !ad.active } : ad
    ));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (editingAd) {
      // Update existing ad
      setAds(ads.map(ad => 
        ad.id === editingAd.id 
          ? { ...ad, ...formData }
          : ad
      ));
    } else {
      // Add new ad
      const newAd: Ad = {
        id: Math.max(...ads.map(a => a.id), 0) + 1,
        ...formData,
        active: true,
      };
      setAds([...ads, newAd]);
    }
    
    setShowAddModal(false);
    setEditingAd(null);
    setFormData({ title: '', subtitle: '', image: '', bgColor: 'from-blue-600 to-blue-800' });
  };

  const openEditModal = (ad: Ad) => {
    setEditingAd(ad);
    setFormData({
      title: ad.title,
      subtitle: ad.subtitle,
      image: ad.image,
      bgColor: ad.bgColor,
    });
    setShowAddModal(true);
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
                <h1 className="text-xl font-bold text-gray-900">Manage Advertisements</h1>
                <p className="text-sm text-gray-600">Home page banner ads</p>
              </div>
            </div>
            <button
              onClick={() => setShowAddModal(true)}
              className="flex items-center space-x-2 px-4 py-2 bg-[#E53935] text-white rounded-lg hover:bg-[#C62828] transition-colors"
            >
              <Plus className="w-5 h-5" />
              <span>Add New Ad</span>
            </button>
          </div>
        </div>
      </header>

      {/* Content */}
      <div className="max-w-7xl mx-auto p-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {ads.map((ad) => (
            <div key={ad.id} className="bg-white rounded-xl shadow-md overflow-hidden">
              {/* Ad Preview */}
              <div className="relative h-48">
                <img
                  src={ad.image}
                  alt={ad.title}
                  className="w-full h-full object-cover"
                />
                <div className={`absolute inset-0 bg-gradient-to-r ${ad.bgColor} opacity-80`}></div>
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6">
                  <h3 className="text-white text-xl font-bold mb-2">{ad.title}</h3>
                  <p className="text-white/90 text-sm">{ad.subtitle}</p>
                </div>
                
                {/* Status Badge */}
                <div className="absolute top-2 right-2">
                  <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                    ad.active ? 'bg-green-500 text-white' : 'bg-gray-500 text-white'
                  }`}>
                    {ad.active ? 'Active' : 'Inactive'}
                  </span>
                </div>
              </div>

              {/* Actions */}
              <div className="p-4 flex items-center justify-between">
                <button
                  onClick={() => handleToggleActive(ad.id)}
                  className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
                    ad.active
                      ? 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                      : 'bg-green-500 text-white hover:bg-green-600'
                  }`}
                >
                  {ad.active ? 'Deactivate' : 'Activate'}
                </button>
                
                <div className="flex space-x-2">
                  <button
                    onClick={() => openEditModal(ad)}
                    className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                  >
                    <Edit className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => handleDelete(ad.id)}
                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Add/Edit Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                {editingAd ? 'Edit Advertisement' : 'Add New Advertisement'}
              </h2>
              
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Title
                  </label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#E53935]"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Subtitle
                  </label>
                  <input
                    type="text"
                    value={formData.subtitle}
                    onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#E53935]"
                    required
                  />
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
                    <img src={formData.image} alt="Preview" className="mt-2 w-full h-32 object-cover rounded-lg" />
                  )}
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Background Gradient
                  </label>
                  <select
                    value={formData.bgColor}
                    onChange={(e) => setFormData({ ...formData, bgColor: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#E53935]"
                  >
                    <option value="from-blue-600 to-blue-800">Blue</option>
                    <option value="from-green-600 to-green-800">Green</option>
                    <option value="from-purple-600 to-purple-800">Purple</option>
                    <option value="from-red-600 to-red-800">Red</option>
                    <option value="from-yellow-600 to-yellow-800">Yellow</option>
                    <option value="from-pink-600 to-pink-800">Pink</option>
                  </select>
                </div>

                <div className="flex space-x-3 pt-4">
                  <button
                    type="button"
                    onClick={() => {
                      setShowAddModal(false);
                      setEditingAd(null);
                      setFormData({ title: '', subtitle: '', image: '', bgColor: 'from-blue-600 to-blue-800' });
                    }}
                    className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 px-4 py-2 bg-[#E53935] text-white rounded-lg hover:bg-[#C62828] transition-colors"
                  >
                    {editingAd ? 'Update' : 'Create'}
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
