import { useState } from 'react';
import { useNavigate } from 'react-router';
import { Search } from 'lucide-react';

const tabs = ['Latest', 'Notifications', 'Circulars', 'Case Laws'];

const newsArticles = [
  {
    id: 1,
    title: 'GST Council Meeting: Key Decisions on Tax Rates and Compliance',
    date: 'Feb 10, 2026',
    preview: 'The 52nd GST Council meeting concluded with major decisions affecting multiple sectors including real estate, healthcare, and e-commerce...',
    category: 'Latest',
    tag: 'Breaking',
  },
  {
    id: 2,
    title: 'New GST Return Filing Deadline Extended to March 31',
    date: 'Feb 9, 2026',
    preview: 'The Central Board of Indirect Taxes has extended the deadline for filing GSTR-3B and GSTR-1 returns for small taxpayers...',
    category: 'Notifications',
    tag: 'Important',
  },
  {
    id: 3,
    title: 'E-Invoice Mandatory for Businesses Above 5 Crore Turnover',
    date: 'Feb 8, 2026',
    preview: 'Starting April 1, 2026, all businesses with annual turnover exceeding Rs 5 crore must implement e-invoicing system...',
    category: 'Circulars',
    tag: 'Circular',
  },
  {
    id: 4,
    title: 'Understanding GST Input Tax Credit: Complete Guide',
    date: 'Feb 7, 2026',
    preview: 'Comprehensive analysis of ITC rules, eligibility criteria, and recent amendments that every business owner should know...',
    category: 'Latest',
  },
  {
    id: 5,
    title: 'Supreme Court Ruling on ITC Reversal in Case of Bad Debts',
    date: 'Feb 6, 2026',
    preview: 'Landmark judgment provides clarity on treatment of input tax credit when invoices become bad debts...',
    category: 'Case Laws',
    tag: 'Judgment',
  },
  {
    id: 6,
    title: 'GST on Real Estate: New Clarifications Issued',
    date: 'Feb 5, 2026',
    preview: 'CBIC issues fresh guidelines on GST applicability for under-construction properties and affordable housing...',
    category: 'Latest',
  },
];

export default function NewsScreen() {
  const [activeTab, setActiveTab] = useState('Latest');
  const navigate = useNavigate();

  const filteredNews = newsArticles.filter(
    (article) => activeTab === 'Latest' || article.category === activeTab
  );

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Header */}
      <header className="bg-gradient-to-r from-[#2563EB] to-[#1D4ED8] text-white p-4 sticky top-0 z-10 shadow-md">
        <h1 className="text-2xl font-bold mb-3">GST News</h1>
        
        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search news, notifications..."
            className="w-full pl-10 pr-4 py-2.5 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-white placeholder-white/60 focus:outline-none focus:bg-white/20 transition-colors"
          />
        </div>
      </header>

      {/* Filter Tabs */}
      <section className="bg-white border-b border-gray-200 sticky top-[120px] z-10">
        <div className="flex space-x-1 overflow-x-auto scrollbar-hide p-2">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded-lg font-semibold text-sm whitespace-nowrap transition-colors ${
                activeTab === tab
                  ? 'bg-[#DC2626] text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </section>

      {/* News Articles */}
      <section className="p-4 space-y-4">
        {filteredNews.map((article) => (
          <div
            key={article.id}
            onClick={() => navigate(`/app/news/${article.id}`)}
            className="bg-white rounded-xl p-4 shadow-md hover:shadow-lg transition-shadow cursor-pointer"
          >
            {/* Tag */}
            {article.tag && (
              <span
                className={`inline-block px-2 py-1 text-xs font-bold rounded mb-2 ${
                  article.tag === 'Breaking'
                    ? 'bg-red-100 text-red-700'
                    : article.tag === 'Important'
                    ? 'bg-orange-100 text-orange-700'
                    : article.tag === 'Circular'
                    ? 'bg-blue-100 text-blue-700'
                    : 'bg-purple-100 text-purple-700'
                }`}
              >
                {article.tag}
              </span>
            )}

            {/* Title */}
            <h3 className="font-bold text-gray-900 text-lg mb-2">
              {article.title}
            </h3>

            {/* Preview */}
            <p className="text-sm text-gray-600 mb-3 line-clamp-2">
              {article.preview}
            </p>

            {/* Date */}
            <div className="flex items-center justify-between">
              <p className="text-xs text-gray-500">{article.date}</p>
              <span className="text-[#DC2626] text-sm font-semibold">
                Read more →
              </span>
            </div>
          </div>
        ))}
      </section>
    </div>
  );
}
