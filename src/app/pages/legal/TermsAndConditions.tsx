import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router';

export default function TermsAndConditions() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-[#1976D2] text-white p-4 sticky top-0 z-10 shadow-md">
        <div className="flex items-center space-x-4">
          <button
            onClick={() => navigate(-1)}
            className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center hover:bg-white/30 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h1 className="text-xl font-bold">Terms & Conditions</h1>
        </div>
      </header>

      {/* Content */}
      <div className="max-w-4xl mx-auto p-6">
        <div className="bg-white rounded-2xl shadow-md p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Terms & Conditions</h1>
          <p className="text-sm text-gray-600 mb-8">Effective Date: February 11, 2026</p>

          <div className="space-y-6 text-gray-700">
            <p>
              Welcome to GST TODAY. These Terms and Conditions govern your use of the GST TODAY 
              mobile application operated by Kasturi Gopala Krishna ("we", "our", or "us").
            </p>

            <p>
              By accessing or using the App, you agree to be bound by these Terms.
            </p>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Use of the App</h2>
              <p className="mb-4">
                GST TODAY provides GST-related information, updates, and advertisements uploaded 
                by the app administrator.
              </p>
              <p className="mb-4">Users agree to:</p>
              <ul className="list-disc pl-6 space-y-1">
                <li>Use the app for lawful purposes only</li>
                <li>Not misuse or attempt to hack the application</li>
                <li>Not engage in fraudulent activity</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">2. User Accounts</h2>
              <p className="mb-4">
                Users log in using phone number authentication powered by Firebase.
              </p>
              <p className="mb-4">You are responsible for:</p>
              <ul className="list-disc pl-6 mb-4 space-y-1">
                <li>Maintaining the confidentiality of your account</li>
                <li>Ensuring your login information is accurate</li>
              </ul>
              <p>
                We reserve the right to suspend or terminate accounts that violate these terms.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">3. Advertisements</h2>
              <p className="mb-4">
                GST TODAY displays advertisements via Google AdMob.
              </p>
              <p className="mb-4">We are not responsible for:</p>
              <ul className="list-disc pl-6 mb-4 space-y-1">
                <li>The content of third-party ads</li>
                <li>Transactions made through advertisements</li>
              </ul>
              <p>Users interact with advertisements at their own risk.</p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Intellectual Property</h2>
              <p className="mb-4">All content within GST TODAY including:</p>
              <ul className="list-disc pl-6 mb-4 space-y-1">
                <li>Text</li>
                <li>Graphics</li>
                <li>Logos</li>
                <li>App design</li>
              </ul>
              <p className="mb-4">
                is owned by Kasturi Gopala Krishna unless otherwise stated.
              </p>
              <p>Unauthorized copying or distribution is prohibited.</p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Limitation of Liability</h2>
              <p className="mb-4">
                We strive to provide accurate GST information. However:
              </p>
              <ul className="list-disc pl-6 mb-4 space-y-1">
                <li>We do not guarantee completeness or accuracy</li>
                <li>We are not liable for business or financial decisions made based on app content</li>
              </ul>
              <p>Users should consult professionals for official advice.</p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Account Termination</h2>
              <p className="mb-4">We reserve the right to terminate accounts that:</p>
              <ul className="list-disc pl-6 space-y-1">
                <li>Violate these Terms</li>
                <li>Misuse the app</li>
                <li>Engage in unlawful activity</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Changes to Terms</h2>
              <p>
                We may update these Terms at any time. Continued use of the app means acceptance 
                of updated Terms.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">8. Contact Information</h2>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="font-semibold">Owner: Kasturi Gopala Krishna</p>
                <p>
                  Email:{' '}
                  <a href="mailto:gsttodaytv99@gmail.com" className="text-[#1976D2] hover:underline">
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
