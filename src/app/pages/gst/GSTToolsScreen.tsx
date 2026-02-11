import { useState } from 'react';
import { Calculator, Percent, Search, FileText, TrendingUp, Calendar, AlertCircle, BookOpen } from 'lucide-react';

const tools = [
  {
    id: 1,
    name: 'GST Calculator',
    description: 'Calculate GST amount with different tax rates',
    icon: Calculator,
    color: 'bg-[#DC2626]',
    path: '/calculator',
  },
  {
    id: 2,
    name: 'Late Fee Calculator',
    description: 'Calculate late fees for delayed GST returns',
    icon: AlertCircle,
    color: 'bg-[#F59E0B]',
    path: '/late-fee',
  },
  {
    id: 3,
    name: 'Interest Calculator',
    description: 'Calculate interest on delayed GST payment',
    icon: Percent,
    color: 'bg-[#2563EB]',
    path: '/interest',
  },
  {
    id: 4,
    name: 'HSN/SAC Finder',
    description: 'Search HSN and SAC codes for goods and services',
    icon: Search,
    color: 'bg-[#059669]',
    path: '/hsn-finder',
  },
  {
    id: 5,
    name: 'ITC Calculator',
    description: 'Calculate eligible Input Tax Credit',
    icon: TrendingUp,
    color: 'bg-[#7C3AED]',
    path: '/itc',
  },
  {
    id: 6,
    name: 'Return Due Date',
    description: 'Check GST return filing due dates',
    icon: Calendar,
    color: 'bg-[#EC4899]',
    path: '/due-dates',
  },
  {
    id: 7,
    name: 'Tax Rate Finder',
    description: 'Find applicable GST rate for products/services',
    icon: FileText,
    color: 'bg-[#06B6D4]',
    path: '/tax-rate',
  },
  {
    id: 8,
    name: 'GST Glossary',
    description: 'Understand GST terms and definitions',
    icon: BookOpen,
    color: 'bg-[#F97316]',
    path: '/glossary',
  },
];

export default function GSTToolsScreen() {
  const [amount, setAmount] = useState<string>('');
  const [gstRate, setGstRate] = useState<number>(18);
  const [calculationType, setCalculationType] = useState<'add' | 'remove'>('add');
  const [showComingSoon, setShowComingSoon] = useState(false);
  const [selectedTool, setSelectedTool] = useState<string>('');

  const handleToolClick = (toolName: string, toolId: number) => {
    if (toolId === 1) {
      // GST Calculator - scroll to quick calculator
      const calcSection = document.getElementById('quick-calculator');
      calcSection?.scrollIntoView({ behavior: 'smooth' });
    } else {
      // Other tools - show coming soon
      setSelectedTool(toolName);
      setShowComingSoon(true);
      setTimeout(() => setShowComingSoon(false), 2500);
    }
  };

  // Calculate GST
  const calculateGST = () => {
    const numAmount = parseFloat(amount) || 0;
    
    if (calculationType === 'add') {
      // Add GST to amount (Exclusive)
      const gstAmount = (numAmount * gstRate) / 100;
      const totalAmount = numAmount + gstAmount;
      return { gstAmount, totalAmount };
    } else {
      // Remove GST from amount (Inclusive)
      const totalAmount = numAmount;
      const baseAmount = (numAmount * 100) / (100 + gstRate);
      const gstAmount = totalAmount - baseAmount;
      return { gstAmount, totalAmount, baseAmount };
    }
  };

  const result = calculateGST();

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Header */}
      <header className="bg-gradient-to-r from-[#059669] to-[#047857] text-white p-4 sticky top-0 z-10 shadow-md">
        <h1 className="text-2xl font-bold">GST Tools</h1>
        <p className="text-sm text-white/90">Calculators and utilities for GST compliance</p>
      </header>

      {/* Featured Tool */}
      <section className="p-4">
        <div className="bg-gradient-to-br from-[#DC2626] to-[#B91C1C] rounded-2xl p-6 text-white shadow-xl">
          <div className="flex items-start space-x-4">
            <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center flex-shrink-0">
              <Calculator className="w-8 h-8" />
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-bold mb-2">GST Calculator</h3>
              <p className="text-white/90 text-sm mb-4">
                Quick and easy GST calculation with all tax rates
              </p>
              <button 
                onClick={() => {
                  const calcSection = document.getElementById('quick-calculator');
                  calcSection?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="px-6 py-2.5 bg-white text-[#DC2626] rounded-xl font-semibold hover:bg-gray-100 transition-colors"
              >
                Use Now
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* All Tools */}
      <section className="p-4">
        <h2 className="text-lg font-bold text-gray-900 mb-3">All Tools</h2>
        <div className="grid grid-cols-2 gap-3">
          {tools.map((tool) => {
            const Icon = tool.icon;
            return (
              <button
                key={tool.id}
                onClick={() => handleToolClick(tool.name, tool.id)}
                className="bg-white rounded-xl p-4 shadow-md hover:shadow-lg transition-shadow text-left"
              >
                <div className={`w-12 h-12 ${tool.color} rounded-xl flex items-center justify-center mb-3`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-bold text-gray-900 text-sm mb-1">
                  {tool.name}
                </h3>
                <p className="text-xs text-gray-600 line-clamp-2">
                  {tool.description}
                </p>
              </button>
            );
          })}
        </div>
      </section>

      {/* GST Calculator Card */}
      <section className="p-4 pb-6" id="quick-calculator">
        <div className="bg-white rounded-2xl p-6 shadow-md">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Quick GST Calculator</h3>
          
          {/* Amount Input */}
          <div className="mb-4">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Enter Amount
            </label>
            <input
              type="number"
              placeholder="0.00"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-[#2563EB] transition-colors text-lg"
            />
          </div>

          {/* GST Rate Selection */}
          <div className="mb-4">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Select GST Rate
            </label>
            <div className="grid grid-cols-4 gap-2">
              {[5, 12, 18, 28].map((rate) => (
                <button
                  key={rate}
                  onClick={() => setGstRate(rate)}
                  className={`py-3 border-2 rounded-xl font-bold transition-colors ${
                    gstRate === rate
                      ? 'border-[#2563EB] bg-blue-50 text-[#2563EB]'
                      : 'border-gray-200 text-gray-700 hover:border-[#2563EB] hover:bg-blue-50 hover:text-[#2563EB]'
                  }`}
                >
                  {rate}%
                </button>
              ))}
            </div>
          </div>

          {/* Calculate Type */}
          <div className="mb-4">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Calculate
            </label>
            <div className="grid grid-cols-2 gap-2">
              <button 
                onClick={() => setCalculationType('add')}
                className={`py-3 rounded-xl font-semibold transition-colors ${
                  calculationType === 'add'
                    ? 'bg-[#2563EB] text-white'
                    : 'border-2 border-gray-200 text-gray-700 hover:bg-gray-50'
                }`}
              >
                Add GST
              </button>
              <button 
                onClick={() => setCalculationType('remove')}
                className={`py-3 rounded-xl font-semibold transition-colors ${
                  calculationType === 'remove'
                    ? 'bg-[#2563EB] text-white'
                    : 'border-2 border-gray-200 text-gray-700 hover:bg-gray-50'
                }`}
              >
                Remove GST
              </button>
            </div>
          </div>

          {/* Result */}
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-4 border-2 border-blue-100">
            {calculationType === 'remove' && result.baseAmount !== undefined && (
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-600">Base Amount:</span>
                <span className="text-lg font-bold text-gray-700">₹ {result.baseAmount.toFixed(2)}</span>
              </div>
            )}
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-600">GST Amount ({gstRate}%):</span>
              <span className="text-xl font-bold text-[#2563EB]">₹ {result.gstAmount.toFixed(2)}</span>
            </div>
            <div className="flex items-center justify-between pt-2 border-t-2 border-blue-200">
              <span className="text-sm font-semibold text-gray-700">Total Amount:</span>
              <span className="text-2xl font-bold text-gray-900">₹ {result.totalAmount.toFixed(2)}</span>
            </div>
          </div>

          {/* Calculation Details */}
          {amount && parseFloat(amount) > 0 && (
            <div className="mt-4 p-4 bg-gray-50 rounded-xl">
              <p className="text-xs text-gray-600 mb-2">
                {calculationType === 'add' ? (
                  <>
                    <strong>Calculation:</strong> ₹{parseFloat(amount).toFixed(2)} + ({gstRate}% GST) = ₹{result.totalAmount.toFixed(2)}
                  </>
                ) : (
                  <>
                    <strong>Calculation:</strong> ₹{parseFloat(amount).toFixed(2)} ÷ (100 + {gstRate}) × 100 = ₹{result.baseAmount?.toFixed(2)} (Base)
                  </>
                )}
              </p>
              <p className="text-xs text-gray-500">
                {calculationType === 'add' 
                  ? 'This adds GST to your base amount (Exclusive pricing)'
                  : 'This removes GST from your total amount (Inclusive pricing)'}
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Coming Soon Notification */}
      {showComingSoon && (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 z-50 animate-fade-in">
          <div className="bg-gradient-to-r from-[#2563EB] to-[#1D4ED8] text-white px-6 py-4 rounded-2xl shadow-2xl border-2 border-white/20">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0">
                <AlertCircle className="w-6 h-6" />
              </div>
              <div>
                <p className="font-bold text-sm">Coming Soon!</p>
                <p className="text-xs text-white/90">{selectedTool} is under development</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}