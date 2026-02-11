import { useState } from 'react';
import { useNavigate } from 'react-router';
import { FileText, X, Check } from 'lucide-react';

export default function TermsScreen() {
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);

  const handleAccept = () => {
    navigate('/setup');
  };

  const handleDecline = () => {
    navigate('/login');
  };

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const element = e.currentTarget;
    if (element.scrollTop > 50) {
      setScrolled(true);
    }
  };

  return (
    <div className="min-h-screen bg-[#F3F4F6] flex flex-col">
      {/* Header */}
      <header className="bg-[#E53935] text-white p-4 shadow-md">
        <h1 className="text-xl font-bold">GST TODAY TV</h1>
        <p className="text-sm text-white/90">Legal Policy</p>
      </header>

      {/* Content Area */}
      <div 
        className="flex-1 overflow-y-auto p-4"
        onScroll={handleScroll}
      >
        <div className="bg-white rounded-xl shadow-md p-6 max-w-2xl mx-auto">
          {/* Last Updated */}
          <p className="text-xs text-[#6B7280] mb-4">Last updated: 02.02.2026</p>

          {/* Introduction */}
          <p className="text-sm text-black mb-6 leading-relaxed">
            Welcome to <span className="font-bold text-[#E53935]">GST TODAY TV</span>, your 
            trusted platform for GST news, updates, videos, and educational content. By accessing 
            or using our application, you agree to be bound by these Terms and Conditions.
          </p>

          {/* Section Header */}
          <div className="bg-[#1976D2] text-white p-4 rounded-lg mb-4 flex items-center space-x-2">
            <FileText className="w-5 h-5" />
            <h2 className="font-bold text-base">TERMS & CONDITIONS</h2>
          </div>

          {/* Section 1 */}
          <div className="mb-6">
            <h3 className="font-bold text-black text-base mb-3">1. Acceptance of Terms</h3>
            <ul className="space-y-2 text-sm text-[#6B7280] list-disc list-inside">
              <li>
                By using <span className="font-semibold text-[#E53935]">GST TODAY TV</span>, 
                you acknowledge that you have read, understood, and agree to these terms.
              </li>
              <li>
                If you do not agree with any part of these terms, you must not use our services.
              </li>
              <li>
                We reserve the right to modify these terms at any time without prior notice.
              </li>
              <li>
                Continued use of the app after changes constitutes acceptance of the modified terms.
              </li>
            </ul>
          </div>

          {/* Section 2 */}
          <div className="mb-6">
            <h3 className="font-bold text-black text-base mb-3">2. About GST TODAY TV</h3>
            <ul className="space-y-2 text-sm text-[#6B7280] list-disc list-inside">
              <li>
                <span className="font-semibold text-[#E53935]">GST TODAY TV</span> provides 
                news, articles, videos, and educational content related to GST (Goods and Services Tax).
              </li>
              <li>
                Our content is for informational purposes only and should not be considered as 
                professional tax advice.
              </li>
              <li>
                We strive to provide accurate and up-to-date information, but we do not guarantee 
                the completeness or accuracy of the content.
              </li>
              <li>
                Users should consult with qualified tax professionals for specific tax-related decisions.
              </li>
            </ul>
          </div>

          {/* Section 3 */}
          <div className="mb-6">
            <h3 className="font-bold text-black text-base mb-3">3. User Responsibilities</h3>
            <ul className="space-y-2 text-sm text-[#6B7280] list-disc list-inside">
              <li>You agree to use the app only for lawful purposes.</li>
              <li>You must not misuse or attempt to gain unauthorized access to our services.</li>
              <li>You are responsible for maintaining the confidentiality of your account information.</li>
              <li>You must provide accurate information when registering or using our services.</li>
            </ul>
          </div>

          {/* Section 4 */}
          <div className="mb-6">
            <h3 className="font-bold text-black text-base mb-3">4. Privacy & Data Collection</h3>
            <ul className="space-y-2 text-sm text-[#6B7280] list-disc list-inside">
              <li>We collect and process personal data in accordance with our Privacy Policy.</li>
              <li>Your data is used to improve our services and provide personalized content.</li>
              <li>We implement security measures to protect your personal information.</li>
              <li>We do not sell or share your personal data with third parties without consent.</li>
            </ul>
          </div>

          {/* Section 5 */}
          <div className="mb-6">
            <h3 className="font-bold text-black text-base mb-3">5. Content Ownership</h3>
            <ul className="space-y-2 text-sm text-[#6B7280] list-disc list-inside">
              <li>
                All content on <span className="font-semibold text-[#E53935]">GST TODAY TV</span> is 
                owned by us or our content providers.
              </li>
              <li>You may not reproduce, distribute, or create derivative works without permission.</li>
              <li>User-generated content remains your property, but you grant us license to use it.</li>
            </ul>
          </div>

          {/* Section 6 */}
          <div className="mb-6">
            <h3 className="font-bold text-black text-base mb-3">6. Limitation of Liability</h3>
            <ul className="space-y-2 text-sm text-[#6B7280] list-disc list-inside">
              <li>We are not liable for any direct, indirect, or consequential damages.</li>
              <li>We do not guarantee uninterrupted or error-free service.</li>
              <li>Use of information from our app is at your own risk.</li>
            </ul>
          </div>

          {/* Contact */}
          <div className="mt-8 p-4 bg-[#F3F4F6] rounded-lg">
            <p className="text-xs text-[#6B7280]">
              For questions about these terms, please contact us at:
            </p>
            <p className="text-sm font-semibold text-[#E53935] mt-1">
              gsttodaytv99@gmail.com
            </p>
          </div>
        </div>
      </div>

      {/* Bottom Action Buttons */}
      <div className="bg-white border-t border-[#E5E7EB] p-4 shadow-lg">
        <div className="flex space-x-3 max-w-2xl mx-auto">
          {/* Decline Button */}
          <button
            onClick={handleDecline}
            className="flex-1 h-12 bg-white border-2 border-[#E53935] text-[#E53935] rounded-lg font-semibold flex items-center justify-center space-x-2 hover:bg-red-50 transition-all active:scale-95"
          >
            <X className="w-5 h-5" />
            <span>Decline</span>
          </button>

          {/* Accept Button */}
          <button
            onClick={handleAccept}
            className="flex-1 h-12 bg-[#10B981] hover:bg-[#059669] text-white rounded-lg font-semibold flex items-center justify-center space-x-2 transition-all active:scale-95"
          >
            <Check className="w-5 h-5" />
            <span>Accept & Continue</span>
          </button>
        </div>
      </div>
    </div>
  );
}
