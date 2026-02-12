import { useState } from 'react';
import { Calculator, Percent, Search, FileText, TrendingUp, Calendar, AlertCircle, BookOpen, ArrowLeft, X, ChevronRight } from 'lucide-react';
import { hsnData, sacData, commodityRates } from '../../data/gstData';

type ToolView = 'main' | 'late-fee' | 'interest' | 'hsn-finder' | 'itc' | 'due-dates' | 'tax-rate' | 'glossary';

const glossaryTerms = [
  { term: 'GST', definition: 'Goods and Services Tax - An indirect tax levied on the supply of goods and services in India.' },
  { term: 'CGST', definition: 'Central Goods and Services Tax - Tax collected by the Central Government on intra-state supplies.' },
  { term: 'SGST', definition: 'State Goods and Services Tax - Tax collected by the State Government on intra-state supplies.' },
  { term: 'IGST', definition: 'Integrated Goods and Services Tax - Tax collected by Central Government on inter-state supplies.' },
  { term: 'ITC', definition: 'Input Tax Credit - Credit of tax paid on inputs used for business purposes.' },
  { term: 'HSN Code', definition: 'Harmonized System of Nomenclature - International system for classifying goods.' },
  { term: 'SAC Code', definition: 'Services Accounting Code - Classification code for services under GST.' },
  { term: 'GSTIN', definition: 'GST Identification Number - Unique 15-digit number assigned to every GST registered business.' },
  { term: 'Reverse Charge', definition: 'Mechanism where recipient of goods/services is liable to pay GST instead of supplier.' },
  { term: 'Composition Scheme', definition: 'Simplified GST scheme for small taxpayers with limited compliance requirements.' },
  { term: 'E-Way Bill', definition: 'Electronic document required for movement of goods worth more than ₹50,000.' },
  { term: 'GSTR-1', definition: 'Monthly/Quarterly return for outward supplies of goods and services.' },
  { term: 'GSTR-3B', definition: 'Summary return showing tax liability and payment for a particular month.' },
  { term: 'Turnover', definition: 'Total value of outward supplies (sales) made during a financial year.' },
  { term: 'Place of Supply', definition: 'Location where goods/services are deemed to be supplied, determines CGST/SGST or IGST.' },
];

const dueDates = [
  { return: 'GSTR-1', type: 'Outward Supplies', monthly: '11th of next month', quarterly: '13th of month after quarter' },
  { return: 'GSTR-3B', type: 'Summary Return', monthly: '20th of next month', quarterly: '22nd/24th of month after quarter' },
  { return: 'GSTR-4', type: 'Composition', monthly: 'N/A', quarterly: '18th of month after quarter' },
  { return: 'GSTR-5', type: 'Non-Resident', monthly: '20th of next month', quarterly: 'N/A' },
  { return: 'GSTR-6', type: 'Input Service Distributor', monthly: '13th of next month', quarterly: 'N/A' },
  { return: 'GSTR-7', type: 'TDS Return', monthly: '10th of next month', quarterly: 'N/A' },
  { return: 'GSTR-8', type: 'E-Commerce Operator', monthly: '10th of next month', quarterly: 'N/A' },
  { return: 'GSTR-9', type: 'Annual Return', monthly: 'N/A', quarterly: '31st December of next FY' },
];

export default function GSTToolsScreen() {
  const [currentView, setCurrentView] = useState<ToolView>('main');
  
  // GST Calculator State
  const [amount, setAmount] = useState<string>('');
  const [gstRate, setGstRate] = useState<number>(18);
  const [calculationType, setCalculationType] = useState<'add' | 'remove'>('add');
  
  // Late Fee Calculator State
  const [daysDelayed, setDaysDelayed] = useState<string>('');
  const [turnover, setTurnover] = useState<string>('');
  
  // Interest Calculator State
  const [taxAmount, setTaxAmount] = useState<string>('');
  const [delayDays, setDelayDays] = useState<string>('');
  
  // HSN/SAC Finder State
  const [searchType, setSearchType] = useState<'HSN' | 'SAC'>('HSN');
  const [searchQuery, setSearchQuery] = useState('');
  
  // ITC Calculator State
  const [inputGST, setInputGST] = useState<string>('');
  const [eligibilityPercent, setEligibilityPercent] = useState<number>(100);
  
  // Tax Rate Finder State
  const [selectedCategory, setSelectedCategory] = useState('');
  const [commoditySearch, setCommoditySearch] = useState('');
  
  // Glossary State
  const [glossarySearch, setGlossarySearch] = useState('');

  // Calculate GST
  const calculateGST = () => {
    const numAmount = parseFloat(amount) || 0;
    
    if (calculationType === 'add') {
      const gstAmount = (numAmount * gstRate) / 100;
      const totalAmount = numAmount + gstAmount;
      return { gstAmount, totalAmount, baseAmount: numAmount };
    } else {
      const totalAmount = numAmount;
      const baseAmount = (numAmount * 100) / (100 + gstRate);
      const gstAmount = totalAmount - baseAmount;
      return { gstAmount, totalAmount, baseAmount };
    }
  };

  // Calculate Late Fee
  const calculateLateFee = () => {
    const days = parseInt(daysDelayed) || 0;
    const annualTurnover = parseFloat(turnover) || 0;
    
    const isNilReturn = annualTurnover === 0;
    const feePerDay = isNilReturn ? 20 : 50; // ₹20 for nil return, ₹50 for normal
    
    const cgstFee = Math.min(days * feePerDay, 5000);
    const sgstFee = Math.min(days * feePerDay, 5000);
    const totalFee = cgstFee + sgstFee;
    
    return { cgstFee, sgstFee, totalFee, feePerDay };
  };

  // Calculate Interest
  const calculateInterest = () => {
    const principal = parseFloat(taxAmount) || 0;
    const days = parseInt(delayDays) || 0;
    const interestRate = 18; // 18% per annum
    
    const interest = (principal * interestRate * days) / (100 * 365);
    const totalAmount = principal + interest;
    
    return { interest, totalAmount, interestRate };
  };

  // Calculate ITC
  const calculateITC = () => {
    const totalInputGST = parseFloat(inputGST) || 0;
    const eligibleITC = (totalInputGST * eligibilityPercent) / 100;
    const ineligibleITC = totalInputGST - eligibleITC;
    
    return { eligibleITC, ineligibleITC, totalInputGST };
  };

  // Filter HSN/SAC Data
  const filteredData = searchType === 'HSN' 
    ? hsnData.filter(item => 
        item.code.includes(searchQuery) || 
        item.description.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : sacData.filter(item => 
        item.code.includes(searchQuery) || 
        item.description.toLowerCase().includes(searchQuery.toLowerCase())
      );

  // Main View
  if (currentView === 'main') {
    const result = calculateGST();
    
    return (
      <div className="bg-gray-50 min-h-screen pb-20">
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
            <button
              onClick={() => setCurrentView('late-fee')}
              className="bg-white rounded-xl p-4 shadow-md hover:shadow-lg transition-shadow text-left"
            >
              <div className="w-12 h-12 bg-[#F59E0B] rounded-xl flex items-center justify-center mb-3">
                <AlertCircle className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-bold text-gray-900 text-sm mb-1">Late Fee Calculator</h3>
              <p className="text-xs text-gray-600 line-clamp-2">Calculate late fees for delayed GST returns</p>
            </button>

            <button
              onClick={() => setCurrentView('interest')}
              className="bg-white rounded-xl p-4 shadow-md hover:shadow-lg transition-shadow text-left"
            >
              <div className="w-12 h-12 bg-[#2563EB] rounded-xl flex items-center justify-center mb-3">
                <Percent className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-bold text-gray-900 text-sm mb-1">Interest Calculator</h3>
              <p className="text-xs text-gray-600 line-clamp-2">Calculate interest on delayed GST payment</p>
            </button>

            <button
              onClick={() => setCurrentView('hsn-finder')}
              className="bg-white rounded-xl p-4 shadow-md hover:shadow-lg transition-shadow text-left"
            >
              <div className="w-12 h-12 bg-[#059669] rounded-xl flex items-center justify-center mb-3">
                <Search className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-bold text-gray-900 text-sm mb-1">HSN/SAC Finder</h3>
              <p className="text-xs text-gray-600 line-clamp-2">Search HSN and SAC codes for goods and services</p>
            </button>

            <button
              onClick={() => setCurrentView('itc')}
              className="bg-white rounded-xl p-4 shadow-md hover:shadow-lg transition-shadow text-left"
            >
              <div className="w-12 h-12 bg-[#7C3AED] rounded-xl flex items-center justify-center mb-3">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-bold text-gray-900 text-sm mb-1">ITC Calculator</h3>
              <p className="text-xs text-gray-600 line-clamp-2">Calculate eligible Input Tax Credit</p>
            </button>

            <button
              onClick={() => setCurrentView('due-dates')}
              className="bg-white rounded-xl p-4 shadow-md hover:shadow-lg transition-shadow text-left"
            >
              <div className="w-12 h-12 bg-[#EC4899] rounded-xl flex items-center justify-center mb-3">
                <Calendar className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-bold text-gray-900 text-sm mb-1">Return Due Date</h3>
              <p className="text-xs text-gray-600 line-clamp-2">Check GST return filing due dates</p>
            </button>

            <button
              onClick={() => setCurrentView('tax-rate')}
              className="bg-white rounded-xl p-4 shadow-md hover:shadow-lg transition-shadow text-left"
            >
              <div className="w-12 h-12 bg-[#06B6D4] rounded-xl flex items-center justify-center mb-3">
                <FileText className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-bold text-gray-900 text-sm mb-1">Tax Rate Finder</h3>
              <p className="text-xs text-gray-600 line-clamp-2">Find applicable GST rate for products/services</p>
            </button>

            <button
              onClick={() => setCurrentView('glossary')}
              className="bg-white rounded-xl p-4 shadow-md hover:shadow-lg transition-shadow text-left"
            >
              <div className="w-12 h-12 bg-[#F97316] rounded-xl flex items-center justify-center mb-3">
                <BookOpen className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-bold text-gray-900 text-sm mb-1">GST Glossary</h3>
              <p className="text-xs text-gray-600 line-clamp-2">Understand GST terms and definitions</p>
            </button>
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
              {calculationType === 'remove' && (
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
                      <strong>Calculation:</strong> ₹{parseFloat(amount).toFixed(2)} ÷ (100 + {gstRate}) × 100 = ₹{result.baseAmount.toFixed(2)} (Base)
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
      </div>
    );
  }

  // Late Fee Calculator View
  if (currentView === 'late-fee') {
    const lateFeeResult = calculateLateFee();
    
    return (
      <div className="bg-gray-50 min-h-screen pb-20">
        <header className="bg-gradient-to-r from-[#F59E0B] to-[#D97706] text-white p-4 sticky top-0 z-10 shadow-md">
          <button onClick={() => setCurrentView('main')} className="mb-2">
            <ArrowLeft className="w-6 h-6" />
          </button>
          <h1 className="text-2xl font-bold">Late Fee Calculator</h1>
          <p className="text-sm text-white/90">Calculate penalties for delayed GST return filing</p>
        </header>

        <section className="p-4">
          <div className="bg-white rounded-2xl p-6 shadow-md">
            <div className="mb-4">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Number of Days Delayed
              </label>
              <input
                type="number"
                placeholder="Enter days"
                value={daysDelayed}
                onChange={(e) => setDaysDelayed(e.target.value)}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-[#F59E0B] transition-colors text-lg"
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Annual Turnover (₹)
              </label>
              <input
                type="number"
                placeholder="Enter turnover (0 for nil return)"
                value={turnover}
                onChange={(e) => setTurnover(e.target.value)}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-[#F59E0B] transition-colors text-lg"
              />
              <p className="text-xs text-gray-500 mt-1">Enter 0 for nil return (₹20/day) or amount for normal return (₹50/day)</p>
            </div>

            {/* Result */}
            <div className="bg-gradient-to-br from-orange-50 to-amber-50 rounded-xl p-4 border-2 border-orange-100">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-600">CGST Late Fee:</span>
                <span className="text-lg font-bold text-gray-700">₹ {lateFeeResult.cgstFee.toFixed(2)}</span>
              </div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-600">SGST Late Fee:</span>
                <span className="text-lg font-bold text-gray-700">₹ {lateFeeResult.sgstFee.toFixed(2)}</span>
              </div>
              <div className="flex items-center justify-between pt-2 border-t-2 border-orange-200">
                <span className="text-sm font-semibold text-gray-700">Total Late Fee:</span>
                <span className="text-2xl font-bold text-[#F59E0B]">₹ {lateFeeResult.totalFee.toFixed(2)}</span>
              </div>
            </div>

            {daysDelayed && parseInt(daysDelayed) > 0 && (
              <div className="mt-4 p-4 bg-gray-50 rounded-xl">
                <p className="text-xs text-gray-600 mb-2">
                  <strong>Calculation:</strong> ₹{lateFeeResult.feePerDay}/day × {daysDelayed} days = ₹{lateFeeResult.cgstFee} (CGST) + ₹{lateFeeResult.sgstFee} (SGST)
                </p>
                <p className="text-xs text-gray-500">Maximum late fee is ₹5,000 for CGST and ₹5,000 for SGST (Total: ₹10,000)</p>
              </div>
            )}
          </div>

          <div className="bg-blue-50 rounded-xl p-4 mt-4 border-2 border-blue-100">
            <h4 className="font-bold text-gray-900 text-sm mb-2 flex items-center">
              <AlertCircle className="w-4 h-4 mr-2 text-blue-600" />
              Important Information
            </h4>
            <ul className="text-xs text-gray-600 space-y-1 ml-6 list-disc">
              <li>For nil returns: ₹20 per day (₹10 CGST + ₹10 SGST)</li>
              <li>For normal returns: ₹50 per day (₹25 CGST + ₹25 SGST)</li>
              <li>Maximum late fee: ₹10,000 (₹5,000 CGST + ₹5,000 SGST)</li>
              <li>Late fee is applicable from the day after the due date</li>
            </ul>
          </div>
        </section>
      </div>
    );
  }

  // Interest Calculator View
  if (currentView === 'interest') {
    const interestResult = calculateInterest();
    
    return (
      <div className="bg-gray-50 min-h-screen pb-20">
        <header className="bg-gradient-to-r from-[#2563EB] to-[#1D4ED8] text-white p-4 sticky top-0 z-10 shadow-md">
          <button onClick={() => setCurrentView('main')} className="mb-2">
            <ArrowLeft className="w-6 h-6" />
          </button>
          <h1 className="text-2xl font-bold">Interest Calculator</h1>
          <p className="text-sm text-white/90">Calculate interest on delayed GST payment</p>
        </header>

        <section className="p-4">
          <div className="bg-white rounded-2xl p-6 shadow-md">
            <div className="mb-4">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Tax Amount (₹)
              </label>
              <input
                type="number"
                placeholder="Enter tax amount"
                value={taxAmount}
                onChange={(e) => setTaxAmount(e.target.value)}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-[#2563EB] transition-colors text-lg"
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Delay Period (Days)
              </label>
              <input
                type="number"
                placeholder="Enter number of days"
                value={delayDays}
                onChange={(e) => setDelayDays(e.target.value)}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-[#2563EB] transition-colors text-lg"
              />
            </div>

            {/* Result */}
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-4 border-2 border-blue-100">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-600">Tax Amount:</span>
                <span className="text-lg font-bold text-gray-700">₹ {(parseFloat(taxAmount) || 0).toFixed(2)}</span>
              </div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-600">Interest ({interestResult.interestRate}% p.a.):</span>
                <span className="text-xl font-bold text-[#2563EB]">₹ {interestResult.interest.toFixed(2)}</span>
              </div>
              <div className="flex items-center justify-between pt-2 border-t-2 border-blue-200">
                <span className="text-sm font-semibold text-gray-700">Total Payable:</span>
                <span className="text-2xl font-bold text-gray-900">₹ {interestResult.totalAmount.toFixed(2)}</span>
              </div>
            </div>

            {taxAmount && delayDays && parseFloat(taxAmount) > 0 && parseInt(delayDays) > 0 && (
              <div className="mt-4 p-4 bg-gray-50 rounded-xl">
                <p className="text-xs text-gray-600 mb-2">
                  <strong>Formula:</strong> Interest = (Tax Amount × Rate × Days) / (100 × 365)
                </p>
                <p className="text-xs text-gray-600 mb-2">
                  <strong>Calculation:</strong> (₹{taxAmount} × 18% × {delayDays} days) / 36,500 = ₹{interestResult.interest.toFixed(2)}
                </p>
                <p className="text-xs text-gray-500">Interest is calculated on a daily basis at 18% per annum</p>
              </div>
            )}
          </div>

          <div className="bg-blue-50 rounded-xl p-4 mt-4 border-2 border-blue-100">
            <h4 className="font-bold text-gray-900 text-sm mb-2 flex items-center">
              <AlertCircle className="w-4 h-4 mr-2 text-blue-600" />
              Important Information
            </h4>
            <ul className="text-xs text-gray-600 space-y-1 ml-6 list-disc">
              <li>Interest rate: 18% per annum (as per Section 50 of CGST Act)</li>
              <li>Interest is calculated from the due date till the date of payment</li>
              <li>Interest is payable separately under CGST and SGST/UTGST</li>
              <li>Interest is applicable on both tax and cess</li>
            </ul>
          </div>
        </section>
      </div>
    );
  }

  // HSN/SAC Finder View
  if (currentView === 'hsn-finder') {
    return (
      <div className="bg-gray-50 min-h-screen pb-20">
        <header className="bg-gradient-to-r from-[#059669] to-[#047857] text-white p-4 sticky top-0 z-10 shadow-md">
          <button onClick={() => setCurrentView('main')} className="mb-2">
            <ArrowLeft className="w-6 h-6" />
          </button>
          <h1 className="text-2xl font-bold">HSN/SAC Finder</h1>
          <p className="text-sm text-white/90">Search classification codes for goods and services</p>
        </header>

        <section className="p-4">
          <div className="bg-white rounded-2xl p-4 shadow-md mb-4">
            <div className="flex gap-2 mb-4">
              <button
                onClick={() => setSearchType('HSN')}
                className={`flex-1 py-3 rounded-xl font-semibold transition-colors ${
                  searchType === 'HSN'
                    ? 'bg-[#059669] text-white'
                    : 'border-2 border-gray-200 text-gray-700 hover:bg-gray-50'
                }`}
              >
                HSN (Goods)
              </button>
              <button
                onClick={() => setSearchType('SAC')}
                className={`flex-1 py-3 rounded-xl font-semibold transition-colors ${
                  searchType === 'SAC'
                    ? 'bg-[#059669] text-white'
                    : 'border-2 border-gray-200 text-gray-700 hover:bg-gray-50'
                }`}
              >
                SAC (Services)
              </button>
            </div>

            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder={`Search ${searchType} code or description...`}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-[#059669] transition-colors"
              />
            </div>
          </div>

          <div className="space-y-3">
            {filteredData.length === 0 && searchQuery && (
              <div className="bg-white rounded-xl p-6 text-center">
                <Search className="w-12 h-12 text-gray-300 mx-auto mb-2" />
                <p className="text-gray-500">No results found for "{searchQuery}"</p>
              </div>
            )}
            
            {filteredData.map((item, index) => (
              <div key={index} className="bg-white rounded-xl p-4 shadow-md">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <span className="text-xs font-semibold text-gray-500">{searchType} CODE</span>
                    <p className="text-xl font-bold text-[#059669]">{item.code}</p>
                  </div>
                  <span className="px-3 py-1 bg-blue-50 text-[#2563EB] text-sm font-bold rounded-full">
                    {item.rate}
                  </span>
                </div>
                <p className="text-sm text-gray-700">{item.description}</p>
              </div>
            ))}

            {!searchQuery && (
              <div className="bg-blue-50 rounded-xl p-4 border-2 border-blue-100">
                <h4 className="font-bold text-gray-900 text-sm mb-2 flex items-center">
                  <AlertCircle className="w-4 h-4 mr-2 text-blue-600" />
                  How to use
                </h4>
                <ul className="text-xs text-gray-600 space-y-1 ml-6 list-disc">
                  <li>Select HSN for goods or SAC for services</li>
                  <li>Search by code number or description</li>
                  <li>HSN codes classify goods, SAC codes classify services</li>
                  <li>Use 4, 6, or 8 digit codes based on turnover</li>
                </ul>
              </div>
            )}
          </div>
        </section>
      </div>
    );
  }

  // ITC Calculator View
  if (currentView === 'itc') {
    const itcResult = calculateITC();
    
    return (
      <div className="bg-gray-50 min-h-screen pb-20">
        <header className="bg-gradient-to-r from-[#7C3AED] to-[#6D28D9] text-white p-4 sticky top-0 z-10 shadow-md">
          <button onClick={() => setCurrentView('main')} className="mb-2">
            <ArrowLeft className="w-6 h-6" />
          </button>
          <h1 className="text-2xl font-bold">ITC Calculator</h1>
          <p className="text-sm text-white/90">Calculate eligible Input Tax Credit</p>
        </header>

        <section className="p-4">
          <div className="bg-white rounded-2xl p-6 shadow-md">
            <div className="mb-4">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Total Input GST (₹)
              </label>
              <input
                type="number"
                placeholder="Enter total input GST"
                value={inputGST}
                onChange={(e) => setInputGST(e.target.value)}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-[#7C3AED] transition-colors text-lg"
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Eligibility Percentage: {eligibilityPercent}%
              </label>
              <input
                type="range"
                min="0"
                max="100"
                step="5"
                value={eligibilityPercent}
                onChange={(e) => setEligibilityPercent(parseInt(e.target.value))}
                className="w-full"
              />
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>0%</span>
                <span>50%</span>
                <span>100%</span>
              </div>
            </div>

            {/* Result */}
            <div className="bg-gradient-to-br from-purple-50 to-indigo-50 rounded-xl p-4 border-2 border-purple-100">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-600">Total Input GST:</span>
                <span className="text-lg font-bold text-gray-700">₹ {itcResult.totalInputGST.toFixed(2)}</span>
              </div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-600">Eligible ITC ({eligibilityPercent}%):</span>
                <span className="text-xl font-bold text-[#7C3AED]">₹ {itcResult.eligibleITC.toFixed(2)}</span>
              </div>
              <div className="flex items-center justify-between pt-2 border-t-2 border-purple-200">
                <span className="text-sm font-semibold text-gray-700">Ineligible ITC:</span>
                <span className="text-lg font-bold text-red-600">₹ {itcResult.ineligibleITC.toFixed(2)}</span>
              </div>
            </div>

            {inputGST && parseFloat(inputGST) > 0 && (
              <div className="mt-4 p-4 bg-gray-50 rounded-xl">
                <p className="text-xs text-gray-600 mb-2">
                  <strong>Calculation:</strong> ₹{inputGST} × {eligibilityPercent}% = ₹{itcResult.eligibleITC.toFixed(2)}
                </p>
                <p className="text-xs text-gray-500">Adjust eligibility percentage based on blocked credit rules</p>
              </div>
            )}
          </div>

          <div className="bg-blue-50 rounded-xl p-4 mt-4 border-2 border-blue-100">
            <h4 className="font-bold text-gray-900 text-sm mb-2 flex items-center">
              <AlertCircle className="w-4 h-4 mr-2 text-blue-600" />
              Blocked ITC (Section 17(5))
            </h4>
            <ul className="text-xs text-gray-600 space-y-1 ml-6 list-disc">
              <li>Motor vehicles (except specific business use)</li>
              <li>Food, beverages, outdoor catering</li>
              <li>Membership of clubs, health & fitness centres</li>
              <li>Travel benefits to employees (except specified)</li>
              <li>Construction of immovable property (except plant & machinery)</li>
            </ul>
          </div>
        </section>
      </div>
    );
  }

  // Due Dates View
  if (currentView === 'due-dates') {
    return (
      <div className="bg-gray-50 min-h-screen pb-20">
        <header className="bg-gradient-to-r from-[#EC4899] to-[#DB2777] text-white p-4 sticky top-0 z-10 shadow-md">
          <button onClick={() => setCurrentView('main')} className="mb-2">
            <ArrowLeft className="w-6 h-6" />
          </button>
          <h1 className="text-2xl font-bold">GST Return Due Dates</h1>
          <p className="text-sm text-white/90">Filing deadlines for all GST returns</p>
        </header>

        <section className="p-4">
          <div className="space-y-3">
            {dueDates.map((item, index) => (
              <div key={index} className="bg-white rounded-xl p-4 shadow-md">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="text-lg font-bold text-gray-900">{item.return}</h3>
                    <p className="text-sm text-gray-600">{item.type}</p>
                  </div>
                  <Calendar className="w-6 h-6 text-[#EC4899]" />
                </div>
                
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-pink-50 rounded-lg p-3">
                    <p className="text-xs text-gray-600 mb-1">Monthly</p>
                    <p className="text-sm font-bold text-gray-900">{item.monthly}</p>
                  </div>
                  <div className="bg-purple-50 rounded-lg p-3">
                    <p className="text-xs text-gray-600 mb-1">Quarterly</p>
                    <p className="text-sm font-bold text-gray-900">{item.quarterly}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-blue-50 rounded-xl p-4 mt-4 border-2 border-blue-100">
            <h4 className="font-bold text-gray-900 text-sm mb-2 flex items-center">
              <AlertCircle className="w-4 h-4 mr-2 text-blue-600" />
              Important Notes
            </h4>
            <ul className="text-xs text-gray-600 space-y-1 ml-6 list-disc">
              <li>Quarterly filing available for taxpayers with turnover up to ₹5 crore</li>
              <li>Due dates may be extended by CBIC notifications</li>
              <li>Late filing attracts late fee and interest</li>
              <li>Check official GST portal for latest updates</li>
            </ul>
          </div>
        </section>
      </div>
    );
  }

  // Tax Rate Finder View
  if (currentView === 'tax-rate') {
    const filteredCommodities = commodityRates.filter(item =>
      item.name.toLowerCase().includes(commoditySearch.toLowerCase()) ||
      item.category.toLowerCase().includes(commoditySearch.toLowerCase()) ||
      item.rate.includes(commoditySearch)
    );

    return (
      <div className="bg-gray-50 min-h-screen pb-20">
        <header className="bg-gradient-to-r from-[#06B6D4] to-[#0891B2] text-white p-4 sticky top-0 z-10 shadow-md">
          <button onClick={() => setCurrentView('main')} className="mb-2">
            <ArrowLeft className="w-6 h-6" />
          </button>
          <h1 className="text-2xl font-bold">Tax Rate Finder</h1>
          <p className="text-sm text-white/90">Search GST rates for any commodity</p>
        </header>

        <section className="p-4">
          {/* Search Bar */}
          <div className="bg-white rounded-2xl p-4 shadow-md mb-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search commodity name, category, or rate..."
                value={commoditySearch}
                onChange={(e) => setCommoditySearch(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-[#06B6D4] transition-colors"
              />
            </div>
          </div>

          {/* Search Results */}
          <div className="space-y-3">
            {filteredCommodities.length === 0 && commoditySearch && (
              <div className="bg-white rounded-xl p-6 text-center">
                <Search className="w-12 h-12 text-gray-300 mx-auto mb-2" />
                <p className="text-gray-500">No commodities found for "{commoditySearch}"</p>
              </div>
            )}
            
            {filteredCommodities.map((item, index) => (
              <div key={index} className="bg-white rounded-xl p-4 shadow-md">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-gray-900">{item.name}</h3>
                    <p className="text-sm text-gray-600">{item.category}</p>
                    {item.hsn && (
                      <p className="text-xs text-gray-500 mt-1">HSN: {item.hsn}</p>
                    )}
                    {item.sac && (
                      <p className="text-xs text-gray-500 mt-1">SAC: {item.sac}</p>
                    )}
                  </div>
                  <div className={`px-4 py-2 rounded-lg font-bold text-white ${
                    item.rate === '0%' ? 'bg-green-500' :
                    item.rate.includes('5%') ? 'bg-blue-500' :
                    item.rate.includes('12%') ? 'bg-indigo-500' :
                    item.rate.includes('18%') ? 'bg-purple-500' :
                    item.rate.includes('28%') ? 'bg-red-500' :
                    'bg-yellow-500'
                  }`}>
                    {item.rate}
                  </div>
                </div>
              </div>
            ))}

            {!commoditySearch && (
              <div className="bg-blue-50 rounded-xl p-4 border-2 border-blue-100">
                <h4 className="font-bold text-gray-900 text-sm mb-2 flex items-center">
                  <AlertCircle className="w-4 h-4 mr-2 text-blue-600" />
                  How to use
                </h4>
                <ul className="text-xs text-gray-600 space-y-1 ml-6 list-disc">
                  <li>Search by commodity name (e.g., "mobile phone", "sugar")</li>
                  <li>Search by category (e.g., "dairy", "electronics")</li>
                  <li>Search by rate (e.g., "18%", "5%")</li>
                  <li>View HSN/SAC codes with each commodity</li>
                </ul>
                <div className="mt-3 pt-3 border-t border-blue-200">
                  <p className="text-xs font-bold text-gray-700 mb-1">GST Rate Slabs:</p>
                  <p className="text-xs text-gray-600"><strong>0%:</strong> Essential items (grains, milk, vegetables)</p>
                  <p className="text-xs text-gray-600"><strong>5%:</strong> Daily necessities (sugar, tea, LPG)</p>
                  <p className="text-xs text-gray-600"><strong>12%:</strong> Standard goods (computers, processed food)</p>
                  <p className="text-xs text-gray-600"><strong>18%:</strong> Most goods and services</p>
                  <p className="text-xs text-gray-600"><strong>28%:</strong> Luxury items (cars, tobacco, AC)</p>
                </div>
              </div>
            )}
          </div>
        </section>
      </div>
    );
  }

  // GST Glossary View
  if (currentView === 'glossary') {
    const filteredTerms = glossaryTerms.filter(item =>
      item.term.toLowerCase().includes(glossarySearch.toLowerCase()) ||
      item.definition.toLowerCase().includes(glossarySearch.toLowerCase())
    );

    return (
      <div className="bg-gray-50 min-h-screen pb-20">
        <header className="bg-gradient-to-r from-[#F97316] to-[#EA580C] text-white p-4 sticky top-0 z-10 shadow-md">
          <button onClick={() => setCurrentView('main')} className="mb-2">
            <ArrowLeft className="w-6 h-6" />
          </button>
          <h1 className="text-2xl font-bold">GST Glossary</h1>
          <p className="text-sm text-white/90">Essential GST terms and definitions</p>
        </header>

        <section className="p-4">
          <div className="bg-white rounded-2xl p-4 shadow-md mb-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search terms..."
                value={glossarySearch}
                onChange={(e) => setGlossarySearch(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-[#F97316] transition-colors"
              />
            </div>
          </div>

          <div className="space-y-3">
            {filteredTerms.map((item, index) => (
              <div key={index} className="bg-white rounded-xl p-4 shadow-md">
                <h3 className="text-lg font-bold text-[#F97316] mb-2">{item.term}</h3>
                <p className="text-sm text-gray-700 leading-relaxed">{item.definition}</p>
              </div>
            ))}

            {filteredTerms.length === 0 && (
              <div className="bg-white rounded-xl p-6 text-center">
                <BookOpen className="w-12 h-12 text-gray-300 mx-auto mb-2" />
                <p className="text-gray-500">No terms found for "{glossarySearch}"</p>
              </div>
            )}
          </div>
        </section>
      </div>
    );
  }

  return null;
}