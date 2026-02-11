import { useState } from 'react';
import { User, Globe, Bell, Bookmark, Info, Mail, ChevronRight, Settings, Shield, X, Check } from 'lucide-react';
import { useNavigate } from 'react-router';

const languages = [
  'English',
  'हिन्दी (Hindi)',
  'தமிழ் (Tamil)',
  'తెలుగు (Telugu)',
  'ಕನ್ನಡ (Kannada)',
  'മലയാളം (Malayalam)',
  'ગુજરાતી (Gujarati)',
  'मराठी (Marathi)',
  'বাংলা (Bengali)',
];

export default function ProfileScreen() {
  const navigate = useNavigate();
  const [showLanguageModal, setShowLanguageModal] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showAbout, setShowAbout] = useState(false);
  const [showContact, setShowContact] = useState(false);
  const [showAppSettings, setShowAppSettings] = useState(false);
  const [showSavedArticles, setShowSavedArticles] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState('English');
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);

  const handleLanguageSelect = (language: string) => {
    setSelectedLanguage(language);
    localStorage.setItem('appLanguage', language);
    setShowLanguageModal(false);
  };

  return (
    <div className="bg-[#F3F4F6] min-h-screen pb-20">
      {/* Header */}
      <header className="bg-gradient-to-r from-[#8B5CF6] to-[#7C3AED] text-white p-4 sticky top-0 z-10 shadow-md">
        <h1 className="text-xl font-bold">Profile</h1>
        <p className="text-xs text-white/90">Manage your account and preferences</p>
      </header>

      {/* User Section */}
      <section className="p-4">
        <div className="bg-white rounded-xl p-6 shadow-md text-center">
          <div className="w-20 h-20 bg-gradient-to-br from-[#E53935] to-[#1976D2] rounded-full flex items-center justify-center mx-auto mb-4">
            <User className="w-10 h-10 text-white" />
          </div>
          <h2 className="text-lg font-bold text-black mb-2">Kasturi Gopala Krishna</h2>
          <p className="text-sm text-[#6B7280]">
            GST TODAY TV User
          </p>
        </div>
      </section>

      {/* Preferences */}
      <section className="px-4 pb-4">
        <h3 className="text-sm font-bold text-gray-500 uppercase mb-3">
          Preferences
        </h3>
        <div className="bg-white rounded-2xl shadow-md overflow-hidden divide-y divide-gray-100">
          {/* Language Selection */}
          <button 
            onClick={() => setShowLanguageModal(true)}
            className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors"
          >
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <Globe className="w-5 h-5 text-[#2563EB]" />
              </div>
              <div className="text-left">
                <p className="font-semibold text-gray-900">Language</p>
                <p className="text-sm text-gray-600">{selectedLanguage}</p>
              </div>
            </div>
            <ChevronRight className="w-5 h-5 text-gray-400" />
          </button>

          {/* Notification Settings */}
          <button 
            onClick={() => setShowNotifications(true)}
            className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors"
          >
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                <Bell className="w-5 h-5 text-[#F59E0B]" />
              </div>
              <div className="text-left">
                <p className="font-semibold text-gray-900">Notifications</p>
                <p className="text-sm text-gray-600">Manage alerts and reminders</p>
              </div>
            </div>
            <ChevronRight className="w-5 h-5 text-gray-400" />
          </button>

          {/* App Settings */}
          <button 
            onClick={() => setShowAppSettings(true)}
            className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors"
          >
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                <Settings className="w-5 h-5 text-[#7C3AED]" />
              </div>
              <div className="text-left">
                <p className="font-semibold text-gray-900">App Settings</p>
                <p className="text-sm text-gray-600">Customize app preferences</p>
              </div>
            </div>
            <ChevronRight className="w-5 h-5 text-gray-400" />
          </button>
        </div>
      </section>

      {/* Your Content */}
      <section className="px-4 pb-4">
        <h3 className="text-sm font-bold text-gray-500 uppercase mb-3">
          Your Content
        </h3>
        <div className="bg-white rounded-2xl shadow-md overflow-hidden">
          <button 
            onClick={() => setShowSavedArticles(true)}
            className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors"
          >
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                <Bookmark className="w-5 h-5 text-[#E53935]" />
              </div>
              <div className="text-left">
                <p className="font-semibold text-gray-900">Saved Articles</p>
                <p className="text-sm text-gray-600">24 articles saved</p>
              </div>
            </div>
            <ChevronRight className="w-5 h-5 text-gray-400" />
          </button>
        </div>
      </section>

      {/* Support */}
      <section className="px-4 pb-4">
        <h3 className="text-sm font-bold text-gray-500 uppercase mb-3">
          Support
        </h3>
        <div className="bg-white rounded-2xl shadow-md overflow-hidden divide-y divide-gray-100">
          <button 
            onClick={() => setShowAbout(true)}
            className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors"
          >
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                <Info className="w-5 h-5 text-[#10B981]" />
              </div>
              <div className="text-left">
                <p className="font-semibold text-gray-900">About</p>
                <p className="text-sm text-gray-600">App info and version</p>
              </div>
            </div>
            <ChevronRight className="w-5 h-5 text-gray-400" />
          </button>

          <button 
            onClick={() => setShowContact(true)}
            className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors"
          >
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <Mail className="w-5 h-5 text-[#2563EB]" />
              </div>
              <div className="text-left">
                <p className="font-semibold text-gray-900">Contact Us</p>
                <p className="text-sm text-gray-600">Get help and support</p>
              </div>
            </div>
            <ChevronRight className="w-5 h-5 text-gray-400" />
          </button>
        </div>
      </section>

      {/* Admin Panel - Moved to Bottom */}
      <section className="px-4 pb-4">
        <div 
          onClick={() => navigate('/admin/login')}
          className="bg-gradient-to-r from-[#E53935] to-[#C62828] rounded-xl p-5 shadow-lg cursor-pointer hover:shadow-xl transition-all active:scale-98"
        >
          <div className="flex items-center space-x-4">
            <div className="w-14 h-14 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center flex-shrink-0">
              <Shield className="w-8 h-8 text-white" />
            </div>
            <div className="flex-1">
              <h3 className="text-base font-bold text-white mb-1">Admin Panel</h3>
              <p className="text-xs text-white/90">Manage content, users, and analytics</p>
            </div>
            <ChevronRight className="w-6 h-6 text-white" />
          </div>
        </div>
      </section>

      {/* Legal & Privacy Section */}
      <section className="px-4 pb-4">
        <h3 className="text-sm font-bold text-gray-500 uppercase mb-3">
          Legal & Privacy
        </h3>
        <div className="bg-white rounded-2xl shadow-md overflow-hidden divide-y divide-gray-100">
          <button 
            onClick={() => navigate('/privacy-policy')}
            className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors"
          >
            <div className="text-left">
              <p className="font-semibold text-gray-900">Privacy Policy</p>
              <p className="text-sm text-gray-600">How we handle your data</p>
            </div>
            <ChevronRight className="w-5 h-5 text-gray-400" />
          </button>

          <button 
            onClick={() => navigate('/terms-and-conditions')}
            className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors"
          >
            <div className="text-left">
              <p className="font-semibold text-gray-900">Terms & Conditions</p>
              <p className="text-sm text-gray-600">App usage terms</p>
            </div>
            <ChevronRight className="w-5 h-5 text-gray-400" />
          </button>

          <button 
            onClick={() => navigate('/account-deletion')}
            className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors"
          >
            <div className="text-left">
              <p className="font-semibold text-gray-900">Account Deletion</p>
              <p className="text-sm text-gray-600">Delete your account & data</p>
            </div>
            <ChevronRight className="w-5 h-5 text-gray-400" />
          </button>
        </div>
      </section>

      {/* Delete Account Section */}
      <section className="px-4 pb-6">
        <button
          onClick={() => {
            if (confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
              alert('Account deletion requested. Please contact support at gsttodaytv99@gmail.com to complete the process.');
            }
          }}
          className="w-full bg-red-50 border-2 border-red-200 rounded-xl p-4 hover:bg-red-100 transition-colors"
        >
          <div className="flex items-center justify-center space-x-3">
            <Bookmark className="w-5 h-5 text-red-600" />
            <span className="font-semibold text-red-600">Delete My Account</span>
          </div>
          <p className="text-xs text-red-500 mt-2">This action is permanent and cannot be undone</p>
        </button>
      </section>

      {/* Footer */}
      <div className="text-center py-6 text-[#6B7280]">
        <p className="text-lg font-bold mb-1">GST TODAY TV</p>
        <p className="text-xs">Version 1.0.0</p>
        <p className="text-xs mt-2">Your trusted source for GST news and updates</p>
      </div>

      {/* Language Modal */}
      {showLanguageModal && (
        <div className="fixed inset-0 bg-black/50 flex items-end z-50 animate-fade-in">
          <div className="bg-white w-full rounded-t-3xl p-6 animate-slide-up max-h-[80vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-bold text-black">Select Language</h3>
              <button onClick={() => setShowLanguageModal(false)}>
                <X className="w-6 h-6 text-[#6B7280]" />
              </button>
            </div>

            <div className="space-y-2">
              {languages.map((language) => (
                <button
                  key={language}
                  onClick={() => handleLanguageSelect(language)}
                  className={`w-full flex items-center justify-between p-4 rounded-xl transition-colors ${
                    selectedLanguage === language 
                      ? 'bg-[#E53935] text-white' 
                      : 'bg-gray-50 text-gray-900 hover:bg-gray-100'
                  }`}
                >
                  <span className="font-semibold">{language}</span>
                  {selectedLanguage === language && <Check className="w-5 h-5" />}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Notifications Modal */}
      {showNotifications && (
        <div className="fixed inset-0 bg-black/50 flex items-end z-50 animate-fade-in">
          <div className="bg-white w-full rounded-t-3xl p-6 animate-slide-up">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-bold text-black">Notification Settings</h3>
              <button onClick={() => setShowNotifications(false)}>
                <X className="w-6 h-6 text-[#6B7280]" />
              </button>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                <div>
                  <p className="font-semibold text-gray-900">Push Notifications</p>
                  <p className="text-sm text-gray-600">Get updates on GST news</p>
                </div>
                <button
                  onClick={() => setNotificationsEnabled(!notificationsEnabled)}
                  className={`w-12 h-7 rounded-full transition-colors ${
                    notificationsEnabled ? 'bg-[#10B981]' : 'bg-gray-300'
                  }`}
                >
                  <div className={`w-5 h-5 bg-white rounded-full shadow-md transition-transform ${
                    notificationsEnabled ? 'translate-x-6' : 'translate-x-1'
                  }`}></div>
                </button>
              </div>

              <div className="p-4 bg-gray-50 rounded-xl">
                <p className="font-semibold text-gray-900 mb-2">Notification Preferences</p>
                <div className="space-y-2 text-sm text-gray-600">
                  <p>✓ Breaking GST News</p>
                  <p>✓ Daily Updates</p>
                  <p>✓ New Videos</p>
                  <p>✓ Due Date Reminders</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* About Modal */}
      {showAbout && (
        <div className="fixed inset-0 bg-black/50 flex items-end z-50 animate-fade-in">
          <div className="bg-white w-full rounded-t-3xl p-6 animate-slide-up">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-bold text-black">About GST TODAY TV</h3>
              <button onClick={() => setShowAbout(false)}>
                <X className="w-6 h-6 text-[#6B7280]" />
              </button>
            </div>

            <div className="space-y-4">
              <div className="text-center">
                <div className="w-20 h-20 bg-gradient-to-br from-[#E53935] to-[#1976D2] rounded-full flex items-center justify-center mx-auto mb-4">
                  <Info className="w-10 h-10 text-white" />
                </div>
                <h4 className="text-2xl font-bold text-black mb-2">GST TODAY TV</h4>
                <p className="text-sm text-gray-600 mb-4">Version 1.0.0</p>
              </div>

              <div className="p-4 bg-gray-50 rounded-xl">
                <p className="text-sm text-gray-700 leading-relaxed">
                  GST TODAY TV is your trusted source for GST news, updates, videos, and educational content. 
                  We provide comprehensive coverage of the latest GST developments, compliance guidelines, 
                  and expert insights to help businesses stay informed and compliant.
                </p>
              </div>

              <div className="text-sm text-gray-600">
                <p>© 2026 GST TODAY TV</p>
                <p>All rights reserved</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Contact Modal */}
      {showContact && (
        <div className="fixed inset-0 bg-black/50 flex items-end z-50 animate-fade-in">
          <div className="bg-white w-full rounded-t-3xl p-6 animate-slide-up">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-bold text-black">Contact Us</h3>
              <button onClick={() => setShowContact(false)}>
                <X className="w-6 h-6 text-[#6B7280]" />
              </button>
            </div>

            <div className="space-y-4">
              <div className="p-4 bg-gray-50 rounded-xl">
                <p className="text-sm font-semibold text-gray-700 mb-2">Contact Person</p>
                <p className="text-lg font-bold text-black">Kasturi Gopala Krishna</p>
              </div>

              <div className="p-4 bg-gray-50 rounded-xl">
                <p className="text-sm font-semibold text-gray-700 mb-2">Phone</p>
                <a href="tel:+919849884466" className="text-lg font-bold text-[#E53935]">
                  +91 9849884466
                </a>
              </div>

              <div className="p-4 bg-gray-50 rounded-xl">
                <p className="text-sm font-semibold text-gray-700 mb-2">Email</p>
                <a href="mailto:gsttodaytv99@gmail.com" className="text-lg font-bold text-[#E53935]">
                  gsttodaytv99@gmail.com
                </a>
              </div>

              <div className="p-4 bg-gray-50 rounded-xl">
                <p className="text-sm font-semibold text-gray-700 mb-2">Address</p>
                <p className="text-sm text-gray-600">
                  GST TODAY TV<br />
                  Hyderabad, Telangana<br />
                  India
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* App Settings Modal */}
      {showAppSettings && (
        <div className="fixed inset-0 bg-black/50 flex items-end z-50 animate-fade-in">
          <div className="bg-white w-full rounded-t-3xl p-6 animate-slide-up">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-bold text-black">App Settings</h3>
              <button onClick={() => setShowAppSettings(false)}>
                <X className="w-6 h-6 text-[#6B7280]" />
              </button>
            </div>

            <div className="space-y-4">
              <div className="p-4 bg-gray-50 rounded-xl">
                <p className="text-sm font-semibold text-gray-700 mb-2">General Settings</p>
                <p className="text-sm text-gray-600 leading-relaxed">
                  Customize your app experience with various settings to suit your preferences.
                </p>
              </div>

              <div className="p-4 bg-gray-50 rounded-xl">
                <p className="text-sm font-semibold text-gray-700 mb-2">Privacy Settings</p>
                <p className="text-sm text-gray-600 leading-relaxed">
                  Manage your privacy settings to control how your data is used and shared.
                </p>
              </div>

              <div className="p-4 bg-gray-50 rounded-xl">
                <p className="text-sm font-semibold text-gray-700 mb-2">Security Settings</p>
                <p className="text-sm text-gray-600 leading-relaxed">
                  Enhance your account security with strong passwords and two-factor authentication.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Saved Articles Modal */}
      {showSavedArticles && (
        <div className="fixed inset-0 bg-black/50 flex items-end z-50 animate-fade-in">
          <div className="bg-white w-full rounded-t-3xl p-6 animate-slide-up">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-bold text-black">Saved Articles</h3>
              <button onClick={() => setShowSavedArticles(false)}>
                <X className="w-6 h-6 text-[#6B7280]" />
              </button>
            </div>

            <div className="space-y-4">
              <div className="p-4 bg-gray-50 rounded-xl">
                <p className="text-sm font-semibold text-gray-700 mb-2">Article 1</p>
                <p className="text-sm text-gray-600 leading-relaxed">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
                  Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </p>
              </div>

              <div className="p-4 bg-gray-50 rounded-xl">
                <p className="text-sm font-semibold text-gray-700 mb-2">Article 2</p>
                <p className="text-sm text-gray-600 leading-relaxed">
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                </p>
              </div>

              <div className="p-4 bg-gray-50 rounded-xl">
                <p className="text-sm font-semibold text-gray-700 mb-2">Article 3</p>
                <p className="text-sm text-gray-600 leading-relaxed">
                  Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}