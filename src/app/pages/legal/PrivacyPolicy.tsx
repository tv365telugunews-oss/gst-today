import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router';

export default function PrivacyPolicy() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-[#E53935] text-white p-4 sticky top-0 z-10 shadow-md">
        <div className="flex items-center space-x-4">
          <button
            onClick={() => navigate(-1)}
            className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center hover:bg-white/30 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h1 className="text-xl font-bold">Privacy Policy</h1>
        </div>
      </header>

      {/* Content */}
      <div className="max-w-4xl mx-auto p-6">
        <div className="bg-white rounded-2xl shadow-md p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Privacy Policy</h1>
          <p className="text-sm text-gray-600 mb-8">Effective Date: February 11, 2026</p>

          <div className="space-y-6 text-gray-700">
            <p>
              GST TODAY ("we", "our", or "us") operates the GST TODAY mobile application (the "App"). 
              This page informs users regarding our policies with the collection, use, and disclosure of Personal Information.
            </p>

            <p>
              By using our App, you agree to the collection and use of information in accordance with this Privacy Policy.
            </p>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Information We Collect</h2>
              
              <h3 className="text-xl font-semibold text-gray-800 mb-2">a) Personal Information</h3>
              <p className="mb-4">
                When you log in using phone number authentication, we may collect:
              </p>
              <ul className="list-disc pl-6 mb-4 space-y-1">
                <li>Phone number</li>
                <li>Firebase User ID</li>
              </ul>
              <p className="mb-4">
                This information is used only for authentication and account management.
              </p>

              <h3 className="text-xl font-semibold text-gray-800 mb-2">b) Automatically Collected Information</h3>
              <p className="mb-4">
                We may collect certain information automatically through Firebase and Google services:
              </p>
              <ul className="list-disc pl-6 space-y-1">
                <li>Device information</li>
                <li>App usage data</li>
                <li>Crash logs</li>
                <li>Advertising identifiers (if ads are enabled)</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Use of Information</h2>
              <p className="mb-4">We use the collected data for:</p>
              <ul className="list-disc pl-6 space-y-1">
                <li>User authentication</li>
                <li>Providing and maintaining the app</li>
                <li>Improving app performance</li>
                <li>Displaying relevant advertisements</li>
                <li>Ensuring app security</li>
              </ul>
              <p className="mt-4 font-semibold">We do not sell user data.</p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">3. Advertising</h2>
              <p className="mb-4">
                GST TODAY uses Google AdMob to display advertisements.
              </p>
              <p className="mb-4">AdMob may collect:</p>
              <ul className="list-disc pl-6 mb-4 space-y-1">
                <li>Device identifiers</li>
                <li>Advertising ID</li>
                <li>Usage data</li>
              </ul>
              <p className="mb-4">
                This data is used to provide personalized and non-personalized ads.
              </p>
              <p>
                You can learn more about Google's privacy practices here:{' '}
                <a 
                  href="https://policies.google.com/privacy" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-[#E53935] hover:underline"
                >
                  https://policies.google.com/privacy
                </a>
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Data Sharing</h2>
              <p className="mb-4">We do not share personal data with third parties except:</p>
              <ul className="list-disc pl-6 mb-4 space-y-1">
                <li>Google Firebase (authentication & backend services)</li>
                <li>Google AdMob (advertising services)</li>
                <li>Legal authorities if required by law</li>
              </ul>
              <p>All data is transmitted securely using encryption.</p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Data Security</h2>
              <p>
                We value your trust in providing your information. We use commercially acceptable 
                security measures through Firebase services to protect your data.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Account Deletion</h2>
              <p className="mb-4">Users may request account deletion directly within the app.</p>
              <p className="mb-4">When you delete your account:</p>
              <ul className="list-disc pl-6 mb-4 space-y-1">
                <li>Your authentication data will be removed</li>
                <li>Associated user data stored in Firebase will be deleted</li>
              </ul>
              <p>
                For assistance, contact:{' '}
                <a href="mailto:gsttodaytv99@gmail.com" className="text-[#E53935] hover:underline">
                  gsttodaytv99@gmail.com
                </a>
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Children's Privacy</h2>
              <p>
                GST TODAY is not intended for children under the age of 13. 
                We do not knowingly collect personal information from children.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">8. Changes to This Privacy Policy</h2>
              <p>
                We may update this Privacy Policy from time to time. Users are advised to review 
                this page periodically for changes.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">9. Contact Us</h2>
              <p className="mb-2">If you have any questions regarding this Privacy Policy, contact:</p>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="font-semibold">Kasturi Gopala Krishna</p>
                <p>
                  Email:{' '}
                  <a href="mailto:gsttodaytv99@gmail.com" className="text-[#E53935] hover:underline">
                    gsttodaytv99@gmail.com
                  </a>
                </p>
                <p>Country: India</p>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
