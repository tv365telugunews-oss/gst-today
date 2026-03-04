import { useState } from 'react';
import { useNavigate } from 'react-router';
import { ArrowLeft, Bell, Clock, CheckCircle, AlertCircle, Info, TrendingUp, Calendar } from 'lucide-react';

interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'alert' | 'success' | 'update';
  time: string;
  read: boolean;
  category: string;
}

const mockNotifications: Notification[] = [
  {
    id: '1',
    title: 'GST Rate Changes Effective Now',
    message: 'New GST rates for textile sector have been implemented from March 1, 2026. Check the updated rates.',
    type: 'alert',
    time: '2 hours ago',
    read: false,
    category: 'GST Updates',
  },
  {
    id: '2',
    title: 'GSTR-3B Due Date Reminder',
    message: 'Your GSTR-3B filing is due on March 20, 2026. File before the deadline to avoid penalties.',
    type: 'alert',
    time: '5 hours ago',
    read: false,
    category: 'Due Dates',
  },
  {
    id: '3',
    title: 'New Video: E-Invoice Tutorial',
    message: 'Watch our latest tutorial on E-Invoice generation and compliance requirements.',
    type: 'info',
    time: '1 day ago',
    read: true,
    category: 'Videos',
  },
  {
    id: '4',
    title: 'ITC Claim Guidelines Updated',
    message: 'CBIC has released new guidelines for claiming Input Tax Credit. Read the circular for details.',
    type: 'update',
    time: '1 day ago',
    read: false,
    category: 'Circulars',
  },
  {
    id: '5',
    title: 'Successfully Filed GSTR-1',
    message: 'Your GSTR-1 for February 2026 has been successfully filed and acknowledged.',
    type: 'success',
    time: '2 days ago',
    read: true,
    category: 'Filing Status',
  },
  {
    id: '6',
    title: 'Supreme Court Ruling on GST',
    message: 'Important judgment on Input Tax Credit eligibility. Click to read the full case law.',
    type: 'info',
    time: '2 days ago',
    read: true,
    category: 'Case Laws',
  },
  {
    id: '7',
    title: 'Annual Return GSTR-9 Reminder',
    message: 'GSTR-9 Annual Return filing deadline is approaching. Due date: March 31, 2026.',
    type: 'alert',
    time: '3 days ago',
    read: true,
    category: 'Due Dates',
  },
  {
    id: '8',
    title: 'GST Portal Maintenance',
    message: 'GST portal will be under maintenance on March 10, 2026 from 2:00 AM to 6:00 AM.',
    type: 'info',
    time: '4 days ago',
    read: true,
    category: 'System Updates',
  },
];

export default function NotificationsScreen() {
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState(mockNotifications);
  const [filter, setFilter] = useState<'all' | 'unread'>('all');

  const unreadCount = notifications.filter(n => !n.read).length;

  const handleMarkAsRead = (id: string) => {
    setNotifications(prev =>
      prev.map(n => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const handleNotificationClick = (notification: Notification) => {
    // Mark as read first
    handleMarkAsRead(notification.id);

    // Navigate based on category
    switch (notification.category) {
      case 'Videos':
        navigate('/app/gst-tv');
        break;
      case 'Circulars':
      case 'Case Laws':
      case 'GST Updates':
        navigate('/app/news');
        break;
      case 'Due Dates':
        navigate('/app/due-dates');
        break;
      case 'Filing Status':
        navigate('/app/tools');
        break;
      case 'System Updates':
        // Stay on notifications page for system updates
        break;
      default:
        // Default to home page
        navigate('/app');
        break;
    }
  };

  const handleMarkAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  const getIcon = (type: string) => {
    switch (type) {
      case 'alert':
        return <AlertCircle className="w-5 h-5 text-[#E53935]" />;
      case 'success':
        return <CheckCircle className="w-5 h-5 text-[#10B981]" />;
      case 'update':
        return <TrendingUp className="w-5 h-5 text-[#1976D2]" />;
      default:
        return <Info className="w-5 h-5 text-[#1976D2]" />;
    }
  };

  const filteredNotifications = filter === 'unread' 
    ? notifications.filter(n => !n.read) 
    : notifications;

  return (
    <div className="bg-[#F3F4F6] min-h-screen pb-20">
      {/* Header */}
      <header className="bg-[#E53935] text-white p-4 sticky top-0 z-10 shadow-md">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate(-1)}
              className="p-2 hover:bg-white/20 rounded-full transition-colors"
            >
              <ArrowLeft className="w-6 h-6" />
            </button>
            <div>
              <h1 className="text-xl font-bold">Notifications</h1>
              <p className="text-xs text-white/90">
                {unreadCount} unread notification{unreadCount !== 1 ? 's' : ''}
              </p>
            </div>
          </div>
          <button
            onClick={handleMarkAllAsRead}
            className="text-sm font-semibold bg-white/20 px-3 py-1.5 rounded-full hover:bg-white/30 transition-colors"
          >
            Mark all read
          </button>
        </div>
      </header>

      {/* Filter Tabs */}
      <section className="bg-white border-b border-[#E5E7EB] sticky top-[72px] z-10">
        <div className="flex p-3 gap-2">
          <button
            onClick={() => setFilter('all')}
            className={`flex-1 px-4 py-2 rounded-full text-sm font-semibold transition-all ${
              filter === 'all'
                ? 'bg-[#1976D2] text-white'
                : 'bg-white border border-[#E5E7EB] text-[#6B7280] hover:border-[#1976D2]'
            }`}
          >
            All ({notifications.length})
          </button>
          <button
            onClick={() => setFilter('unread')}
            className={`flex-1 px-4 py-2 rounded-full text-sm font-semibold transition-all ${
              filter === 'unread'
                ? 'bg-[#1976D2] text-white'
                : 'bg-white border border-[#E5E7EB] text-[#6B7280] hover:border-[#1976D2]'
            }`}
          >
            Unread ({unreadCount})
          </button>
        </div>
      </section>

      {/* Notifications List */}
      <section className="p-4 space-y-3">
        {filteredNotifications.length === 0 ? (
          <div className="bg-white rounded-xl p-8 text-center shadow-sm">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Bell className="w-8 h-8 text-gray-400" />
            </div>
            <p className="text-gray-600 font-semibold">No notifications</p>
            <p className="text-gray-400 text-sm mt-1">
              {filter === 'unread' ? "You're all caught up!" : 'Check back later for updates'}
            </p>
          </div>
        ) : (
          filteredNotifications.map((notification) => (
            <div
              key={notification.id}
              onClick={() => handleNotificationClick(notification)}
              className={`bg-white rounded-xl shadow-sm hover:shadow-md transition-all cursor-pointer overflow-hidden ${
                !notification.read ? 'border-l-4 border-[#1976D2]' : ''
              }`}
            >
              <div className="p-4">
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 mt-1">
                    {getIcon(notification.type)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2 mb-1">
                      <h3
                        className={`font-bold text-sm ${
                          !notification.read ? 'text-black' : 'text-gray-700'
                        }`}
                      >
                        {notification.title}
                      </h3>
                      {!notification.read && (
                        <span className="flex-shrink-0 w-2 h-2 bg-[#1976D2] rounded-full mt-1.5"></span>
                      )}
                    </div>
                    <p
                      className={`text-sm mb-2 ${
                        !notification.read ? 'text-gray-700' : 'text-gray-500'
                      }`}
                    >
                      {notification.message}
                    </p>
                    <div className="flex items-center gap-3 text-xs">
                      <span className="text-gray-400 flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {notification.time}
                      </span>
                      <span className="px-2 py-0.5 bg-gray-100 text-gray-600 rounded-full font-medium">
                        {notification.category}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </section>

      {/* Empty State Helper */}
      {filteredNotifications.length > 0 && (
        <div className="px-4 pb-4">
          <div className="bg-gradient-to-br from-[#1976D2]/10 to-[#1565C0]/10 rounded-xl p-4 border border-[#1976D2]/20">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 bg-[#1976D2] rounded-full flex items-center justify-center flex-shrink-0">
                <Calendar className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="font-bold text-sm text-[#1976D2] mb-1">
                  Stay Updated
                </h3>
                <p className="text-xs text-gray-600">
                  Enable push notifications in Settings to never miss important GST updates and due dates.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}