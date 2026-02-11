import { useNavigate } from 'react-router';
import { 
  LayoutDashboard, 
  FileText, 
  Video, 
  Users, 
  TrendingUp, 
  Eye,
  Calendar,
  Settings,
  LogOut,
  ArrowUp,
  ArrowDown,
  BarChart3
} from 'lucide-react';

const stats = [
  {
    label: 'Total Articles',
    value: '2,847',
    change: '+12.5%',
    trend: 'up',
    icon: FileText,
    color: 'bg-blue-500',
  },
  {
    label: 'Total Videos',
    value: '1,234',
    change: '+8.2%',
    trend: 'up',
    icon: Video,
    color: 'bg-red-500',
  },
  {
    label: 'Active Users',
    value: '45,892',
    change: '+23.1%',
    trend: 'up',
    icon: Users,
    color: 'bg-green-500',
  },
  {
    label: 'Total Views',
    value: '892K',
    change: '-2.4%',
    trend: 'down',
    icon: Eye,
    color: 'bg-purple-500',
  },
];

const recentArticles = [
  {
    id: 1,
    title: 'GST Rate Changes for Q1 2026',
    status: 'Published',
    views: '12.5K',
    date: '2 hours ago',
  },
  {
    id: 2,
    title: 'New E-Invoice Rules Announced',
    status: 'Published',
    views: '8.3K',
    date: '5 hours ago',
  },
  {
    id: 3,
    title: 'Input Tax Credit Guidelines',
    status: 'Draft',
    views: '-',
    date: '1 day ago',
  },
];

const recentVideos = [
  {
    id: 1,
    title: 'GSTR-3B Filing Tutorial',
    status: 'Published',
    views: '25.4K',
    date: '1 day ago',
  },
  {
    id: 2,
    title: 'GST Audit Process Explained',
    status: 'Published',
    views: '18.2K',
    date: '2 days ago',
  },
];

export default function AdminDashboard() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('adminAuth');
    navigate('/admin/login');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-gradient-to-br from-[#E53935] to-[#C62828] rounded-xl flex items-center justify-center">
                <LayoutDashboard className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">Admin Dashboard</h1>
                <p className="text-sm text-gray-600">GST TODAY TV</p>
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center space-x-2 px-4 py-2 bg-red-50 text-[#E53935] rounded-xl hover:bg-red-100 transition-colors"
            >
              <LogOut className="w-4 h-4" />
              <span className="font-medium">Logout</span>
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto p-4 space-y-6">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <div key={stat.label} className="bg-white rounded-2xl p-6 shadow-md hover:shadow-lg transition-shadow">
                <div className="flex items-start justify-between mb-4">
                  <div className={`w-12 h-12 ${stat.color} rounded-xl flex items-center justify-center`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <div className={`flex items-center space-x-1 px-2 py-1 rounded-lg ${
                    stat.trend === 'up' ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'
                  }`}>
                    {stat.trend === 'up' ? (
                      <ArrowUp className="w-3 h-3" />
                    ) : (
                      <ArrowDown className="w-3 h-3" />
                    )}
                    <span className="text-xs font-bold">{stat.change}</span>
                  </div>
                </div>
                <h3 className="text-3xl font-bold text-gray-900 mb-1">{stat.value}</h3>
                <p className="text-sm text-gray-600">{stat.label}</p>
              </div>
            );
          })}
        </div>

        {/* Quick Actions */}
        <section className="p-4">
          <h2 className="text-lg font-bold text-gray-900 mb-4">Content Management</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <button
              onClick={() => navigate('/admin/ads')}
              className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow"
            >
              <div className="w-12 h-12 bg-gradient-to-br from-[#E53935] to-[#C62828] rounded-xl flex items-center justify-center mb-3">
                <FileText className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-bold text-gray-900">Advertisements</h3>
              <p className="text-sm text-gray-600 mt-1">Manage home ads</p>
            </button>

            <button
              onClick={() => navigate('/admin/short-news')}
              className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow"
            >
              <div className="w-12 h-12 bg-gradient-to-br from-[#1976D2] to-[#1565C0] rounded-xl flex items-center justify-center mb-3">
                <FileText className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-bold text-gray-900">Short News</h3>
              <p className="text-sm text-gray-600 mt-1">Flip news cards</p>
            </button>

            <button
              onClick={() => navigate('/admin/articles')}
              className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow"
            >
              <div className="w-12 h-12 bg-gradient-to-br from-[#10B981] to-[#059669] rounded-xl flex items-center justify-center mb-3">
                <FileText className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-bold text-gray-900">Articles</h3>
              <p className="text-sm text-gray-600 mt-1">News articles</p>
            </button>

            <button
              onClick={() => navigate('/admin/videos')}
              className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow"
            >
              <div className="w-12 h-12 bg-gradient-to-br from-[#F59E0B] to-[#D97706] rounded-xl flex items-center justify-center mb-3">
                <Video className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-bold text-gray-900">Videos</h3>
              <p className="text-sm text-gray-600 mt-1">GST TV content</p>
            </button>

            <button
              onClick={() => navigate('/admin/users')}
              className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow"
            >
              <div className="w-12 h-12 bg-gradient-to-br from-[#8B5CF6] to-[#7C3AED] rounded-xl flex items-center justify-center mb-3">
                <Users className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-bold text-gray-900">Users</h3>
              <p className="text-sm text-gray-600 mt-1">User management</p>
            </button>

            <button
              onClick={() => navigate('/admin/analytics')}
              className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow"
            >
              <div className="w-12 h-12 bg-gradient-to-br from-[#06B6D4] to-[#0891B2] rounded-xl flex items-center justify-center mb-3">
                <BarChart3 className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-bold text-gray-900">Analytics</h3>
              <p className="text-sm text-gray-600 mt-1">View stats</p>
            </button>
          </div>
        </section>

        {/* Recent Content */}
        <div className="grid lg:grid-cols-2 gap-6">
          {/* Recent Articles */}
          <div className="bg-white rounded-2xl p-6 shadow-md">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold text-gray-900">Recent Articles</h2>
              <button
                onClick={() => navigate('/admin/articles')}
                className="text-sm text-blue-600 hover:text-blue-700 font-medium"
              >
                View All →
              </button>
            </div>
            <div className="space-y-3">
              {recentArticles.map((article) => (
                <div key={article.id} className="p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors cursor-pointer">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-semibold text-gray-900 text-sm flex-1">{article.title}</h3>
                    <span className={`px-2 py-1 text-xs font-bold rounded-lg ml-2 ${
                      article.status === 'Published' 
                        ? 'bg-green-100 text-green-700' 
                        : 'bg-yellow-100 text-yellow-700'
                    }`}>
                      {article.status}
                    </span>
                  </div>
                  <div className="flex items-center space-x-4 text-xs text-gray-600">
                    <div className="flex items-center space-x-1">
                      <Eye className="w-3 h-3" />
                      <span>{article.views}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Calendar className="w-3 h-3" />
                      <span>{article.date}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Videos */}
          <div className="bg-white rounded-2xl p-6 shadow-md">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold text-gray-900">Recent Videos</h2>
              <button
                onClick={() => navigate('/admin/videos')}
                className="text-sm text-blue-600 hover:text-blue-700 font-medium"
              >
                View All →
              </button>
            </div>
            <div className="space-y-3">
              {recentVideos.map((video) => (
                <div key={video.id} className="p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors cursor-pointer">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-semibold text-gray-900 text-sm flex-1">{video.title}</h3>
                    <span className="px-2 py-1 text-xs font-bold rounded-lg ml-2 bg-green-100 text-green-700">
                      {video.status}
                    </span>
                  </div>
                  <div className="flex items-center space-x-4 text-xs text-gray-600">
                    <div className="flex items-center space-x-1">
                      <Eye className="w-3 h-3" />
                      <span>{video.views}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Calendar className="w-3 h-3" />
                      <span>{video.date}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Chart Placeholder */}
        <div className="bg-white rounded-2xl p-6 shadow-md">
          <h2 className="text-lg font-bold text-gray-900 mb-4">Analytics Overview</h2>
          <div className="h-64 bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl flex items-center justify-center">
            <div className="text-center">
              <TrendingUp className="w-16 h-16 text-blue-400 mx-auto mb-3" />
              <p className="text-gray-600 font-medium">Analytics Chart</p>
              <p className="text-sm text-gray-500">Coming Soon</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}