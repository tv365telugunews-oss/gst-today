import { useState } from 'react';
import { Calendar, Bell, BellOff, ChevronRight } from 'lucide-react';

const dueDates = [
  {
    id: 1,
    return: 'GSTR-1',
    description: 'Monthly return for outward supplies',
    dueDate: 'February 11, 2026',
    daysLeft: 1,
    reminder: true,
    priority: 'high',
  },
  {
    id: 2,
    return: 'GSTR-3B',
    description: 'Monthly summary return',
    dueDate: 'February 20, 2026',
    daysLeft: 10,
    reminder: true,
    priority: 'medium',
  },
  {
    id: 3,
    return: 'GSTR-5',
    description: 'Return for non-resident taxable person',
    dueDate: 'February 20, 2026',
    daysLeft: 10,
    reminder: false,
    priority: 'medium',
  },
  {
    id: 4,
    return: 'IFF',
    description: 'Invoice Furnishing Facility',
    dueDate: 'February 13, 2026',
    daysLeft: 3,
    reminder: true,
    priority: 'high',
  },
  {
    id: 5,
    return: 'GSTR-6',
    description: 'Return for input service distributor',
    dueDate: 'February 13, 2026',
    daysLeft: 3,
    reminder: false,
    priority: 'low',
  },
  {
    id: 6,
    return: 'CMP-08',
    description: 'Quarterly return for composition dealers',
    dueDate: 'April 18, 2026',
    daysLeft: 67,
    reminder: true,
    priority: 'low',
  },
  {
    id: 7,
    return: 'GSTR-9',
    description: 'Annual Return',
    dueDate: 'December 31, 2026',
    daysLeft: 323,
    reminder: false,
    priority: 'low',
  },
];

export default function DueDatesScreen() {
  const [reminders, setReminders] = useState(
    dueDates.reduce((acc, item) => {
      acc[item.id] = item.reminder;
      return acc;
    }, {} as Record<number, boolean>)
  );

  const toggleReminder = (id: number) => {
    setReminders((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'bg-red-100 text-red-700 border-red-200';
      case 'medium':
        return 'bg-orange-100 text-orange-700 border-orange-200';
      default:
        return 'bg-blue-100 text-blue-700 border-blue-200';
    }
  };

  const getDaysLeftColor = (days: number) => {
    if (days <= 3) return 'text-red-600';
    if (days <= 10) return 'text-orange-600';
    return 'text-gray-600';
  };

  return (
    <div className="bg-gray-50 min-h-screen pb-20">
      {/* Header */}
      <header className="bg-gradient-to-r from-[#FFC107] to-[#F59E0B] text-gray-900 p-4 sticky top-0 z-10 shadow-md">
        <div className="flex items-center space-x-3 mb-2">
          <Calendar className="w-8 h-8" />
          <div>
            <h1 className="text-2xl font-bold">GST Due Dates</h1>
            <p className="text-sm text-gray-800">Never miss a deadline</p>
          </div>
        </div>
      </header>

      {/* Current Month */}
      <section className="p-4 bg-white border-b border-gray-200">
        <h2 className="text-lg font-bold text-gray-900 mb-2">February 2026</h2>
        <div className="flex items-center space-x-4 text-sm text-gray-600">
          <div className="flex items-center">
            <div className="w-3 h-3 bg-red-500 rounded-full mr-2" />
            <span>Due Soon</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 bg-orange-500 rounded-full mr-2" />
            <span>This Month</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 bg-blue-500 rounded-full mr-2" />
            <span>Upcoming</span>
          </div>
        </div>
      </section>

      {/* Due Dates List */}
      <section className="p-4 space-y-3">
        {dueDates.map((item) => (
          <div
            key={item.id}
            className={`bg-white rounded-xl p-4 shadow-md border-2 ${getPriorityColor(
              item.priority
            )}`}
          >
            {/* Header */}
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-1">
                  <h3 className="text-lg font-bold text-gray-900">
                    {item.return}
                  </h3>
                  {item.daysLeft <= 3 && (
                    <span className="px-2 py-0.5 bg-red-500 text-white text-xs font-bold rounded-full">
                      URGENT
                    </span>
                  )}
                </div>
                <p className="text-sm text-gray-600">{item.description}</p>
              </div>

              {/* Reminder Toggle */}
              <button
                onClick={() => toggleReminder(item.id)}
                className={`p-2 rounded-lg transition-colors ${
                  reminders[item.id]
                    ? 'bg-[#2563EB] text-white'
                    : 'bg-gray-200 text-gray-600'
                }`}
              >
                {reminders[item.id] ? (
                  <Bell className="w-5 h-5" />
                ) : (
                  <BellOff className="w-5 h-5" />
                )}
              </button>
            </div>

            {/* Due Date Info */}
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-gray-500 mb-1">Due Date</p>
                <p className="text-sm font-semibold text-gray-900">
                  {item.dueDate}
                </p>
              </div>
              <div className="text-right">
                <p className="text-xs text-gray-500 mb-1">Days Left</p>
                <p className={`text-lg font-bold ${getDaysLeftColor(item.daysLeft)}`}>
                  {item.daysLeft}
                </p>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="mt-3 bg-gray-200 rounded-full h-2 overflow-hidden">
              <div
                className={`h-full transition-all ${
                  item.daysLeft <= 3
                    ? 'bg-red-500'
                    : item.daysLeft <= 10
                    ? 'bg-orange-500'
                    : 'bg-blue-500'
                }`}
                style={{
                  width: `${Math.max(10, Math.min(100, 100 - (item.daysLeft / 30) * 100))}%`,
                }}
              />
            </div>
          </div>
        ))}
      </section>

      {/* Help Section */}
      <section className="p-4 mb-6">
        <div className="bg-gradient-to-br from-[#2563EB] to-[#1D4ED8] rounded-2xl p-6 text-white">
          <h3 className="text-lg font-bold mb-2">Need Help with Filing?</h3>
          <p className="text-sm text-white/90 mb-4">
            Watch our step-by-step video guides for each return type
          </p>
          <button className="flex items-center justify-between w-full px-4 py-3 bg-white text-[#2563EB] rounded-xl font-semibold hover:bg-gray-100 transition-colors">
            <span>Watch Filing Guides</span>
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </section>
    </div>
  );
}