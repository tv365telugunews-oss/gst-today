import { useNavigate } from 'react-router';
import { ArrowLeft, TrendingUp, Users, Eye, FileText, Video, BarChart3, Calendar } from 'lucide-react';

export default function Analytics() {
  const navigate = useNavigate();

  const stats = [
    { label: 'Total Users', value: '12,543', change: '+12%', icon: Users, color: 'blue' },
    { label: 'Total Views', value: '1.2M', change: '+8%', icon: Eye, color: 'green' },
    { label: 'Articles Published', value: '234', change: '+15%', icon: FileText, color: 'purple' },
    { label: 'Videos Uploaded', value: '89', change: '+5%', icon: Video, color: 'red' },
  ];

  const recentActivity = [
    { type: 'user', message: 'New user registered: Rajesh Kumar', time: '5 minutes ago' },
    { type: 'article', message: 'Article published: GST Rate Changes 2026', time: '1 hour ago' },
    { type: 'video', message: 'New video uploaded: E-Invoice Guide', time: '2 hours ago' },
    { type: 'user', message: 'User milestone: 10,000 active users', time: '3 hours ago' },
    { type: 'article', message: 'Article edited: Input Tax Credit Rules', time: '5 hours ago' },
  ];

  const topArticles = [
    { title: 'GST Rate Changes for 2026', views: '25,432', date: 'Feb 8, 2026' },
    { title: 'E-Invoice Implementation Guide', views: '18,765', date: 'Feb 7, 2026' },
    { title: 'Input Tax Credit Rules Explained', views: '15,234', date: 'Feb 6, 2026' },
    { title: 'GST Return Filing Calendar', views: '12,890', date: 'Feb 5, 2026' },
    { title: 'GST on Real Estate Sector', views: '10,567', date: 'Feb 4, 2026' },
  ];

  const topVideos = [
    { title: 'GSTR-9 Annual Return Filing Guide', views: '45,678', duration: '12:45' },
    { title: 'Input Tax Credit Rules', views: '32,456', duration: '8:30' },
    { title: 'E-Invoice Implementation', views: '28,234', duration: '10:15' },
    { title: 'GST on Services Updates', views: '24,567', duration: '15:20' },
  ];

  const monthlyData = [
    { month: 'Jan', users: 8500, articles: 45, videos: 12 },
    { month: 'Feb', users: 12543, articles: 67, videos: 18 },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => navigate('/admin/dashboard')}
              className="w-10 h-10 bg-gray-100 rounded-xl flex items-center justify-center hover:bg-gray-200 transition-colors"
            >
              <ArrowLeft className="w-5 h-5 text-gray-600" />
            </button>
            <div>
              <h1 className="text-xl font-bold text-gray-900">Analytics Dashboard</h1>
              <p className="text-sm text-gray-600">Detailed insights and statistics</p>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto p-4 space-y-6">
        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white rounded-2xl p-6 shadow-md">
              <div className="flex items-center justify-between mb-4">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center bg-${stat.color}-100`}>
                  <stat.icon className={`w-6 h-6 text-${stat.color}-600`} />
                </div>
                <span className="text-sm font-semibold text-green-600">{stat.change}</span>
              </div>
              <p className="text-3xl font-bold text-gray-900 mb-1">{stat.value}</p>
              <p className="text-sm text-gray-600">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Monthly Growth Chart */}
          <div className="bg-white rounded-2xl p-6 shadow-md">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-bold text-gray-900">Monthly Growth</h2>
              <BarChart3 className="w-5 h-5 text-gray-400" />
            </div>
            <div className="space-y-4">
              {monthlyData.map((data, index) => (
                <div key={index}>
                  <div className="flex items-center justify-between text-sm mb-2">
                    <span className="font-semibold text-gray-700">{data.month}</span>
                    <span className="text-gray-600">{data.users.toLocaleString()} users</span>
                  </div>
                  <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-[#E53935] to-[#1976D2] rounded-full"
                      style={{ width: `${(data.users / 15000) * 100}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-white rounded-2xl p-6 shadow-md">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-bold text-gray-900">Recent Activity</h2>
              <Calendar className="w-5 h-5 text-gray-400" />
            </div>
            <div className="space-y-4">
              {recentActivity.map((activity, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <div className={`w-2 h-2 rounded-full mt-2 ${
                    activity.type === 'user' ? 'bg-blue-500' : 
                    activity.type === 'article' ? 'bg-green-500' : 'bg-red-500'
                  }`}></div>
                  <div className="flex-1">
                    <p className="text-sm text-gray-900">{activity.message}</p>
                    <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Top Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Top Articles */}
          <div className="bg-white rounded-2xl p-6 shadow-md">
            <h2 className="text-lg font-bold text-gray-900 mb-6">Top Articles</h2>
            <div className="space-y-4">
              {topArticles.map((article, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                  <div className="flex-1">
                    <p className="font-semibold text-gray-900 text-sm mb-1">{article.title}</p>
                    <p className="text-xs text-gray-500">{article.date}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-bold text-[#E53935]">{article.views}</p>
                    <p className="text-xs text-gray-500">views</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Top Videos */}
          <div className="bg-white rounded-2xl p-6 shadow-md">
            <h2 className="text-lg font-bold text-gray-900 mb-6">Top Videos</h2>
            <div className="space-y-4">
              {topVideos.map((video, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                  <div className="flex-1">
                    <p className="font-semibold text-gray-900 text-sm mb-1">{video.title}</p>
                    <p className="text-xs text-gray-500">{video.duration}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-bold text-[#1976D2]">{video.views}</p>
                    <p className="text-xs text-gray-500">views</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Performance Summary */}
        <div className="bg-gradient-to-r from-[#E53935] to-[#1976D2] rounded-2xl p-6 text-white shadow-lg">
          <div className="flex items-center space-x-3 mb-4">
            <TrendingUp className="w-8 h-8" />
            <h2 className="text-xl font-bold">Performance Summary</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <p className="text-white/80 text-sm mb-1">Average Daily Users</p>
              <p className="text-3xl font-bold">8,543</p>
            </div>
            <div>
              <p className="text-white/80 text-sm mb-1">Content Engagement</p>
              <p className="text-3xl font-bold">78%</p>
            </div>
            <div>
              <p className="text-white/80 text-sm mb-1">User Retention Rate</p>
              <p className="text-3xl font-bold">85%</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
