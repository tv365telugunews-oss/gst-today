import { ArrowLeft, Trash2, Mail, Phone } from 'lucide-react';
import { useNavigate } from 'react-router';

export default function AccountDeletion() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-[#DC2626] text-white p-4 sticky top-0 z-10 shadow-md">
        <div className="flex items-center space-x-4">
          <button
            onClick={() => navigate(-1)}
            className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center hover:bg-white/30 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h1 className="text-xl font-bold">Account Deletion</h1>
        </div>
      </header>

      {/* Content */}
      <div className="max-w-4xl mx-auto p-6">
        <div className="bg-white rounded-2xl shadow-md p-8">
          <div className="flex items-center space-x-4 mb-6">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center">
              <Trash2 className="w-8 h-8 text-red-600" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Account Deletion Policy</h1>
              <p className="text-sm text-gray-600">Effective Date: February 11, 2026</p>
            </div>
          </div>

          <div className="space-y-6 text-gray-700">
            <p className="text-lg">
              GST TODAY allows users to delete their account and associated data at any time.
            </p>

            <section className="bg-blue-50 border-l-4 border-blue-500 p-6 rounded-r-lg">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                How to Delete Your Account Inside the App
              </h2>
              <ol className="list-decimal pl-6 space-y-2">
                <li>Open GST TODAY app</li>
                <li>Go to <strong>Profile</strong> section</li>
                <li>Scroll down and tap <strong>"Delete Account"</strong></li>
                <li>Confirm deletion</li>
              </ol>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">What Happens After Deletion?</h2>
              <p className="mb-4">Once you confirm account deletion:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Your Firebase authentication account will be <strong>permanently deleted</strong></li>
                <li>Associated user data will be removed from our systems</li>
                <li>You will no longer be able to access the account</li>
                <li>This action <strong>cannot be undone</strong></li>
              </ul>
            </section>

            <section className="bg-amber-50 border-l-4 border-amber-500 p-6 rounded-r-lg">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Alternative Method</h2>
              <p className="mb-4">
                If you cannot access the app, you may request deletion by contacting:
              </p>
              <div className="flex items-center space-x-3 mb-4">
                <Mail className="w-5 h-5 text-amber-600" />
                <a 
                  href="mailto:gsttodaytv99@gmail.com" 
                  className="text-[#DC2626] font-semibold hover:underline"
                >
                  gsttodaytv99@gmail.com
                </a>
              </div>
              <p className="mb-4 font-semibold">Please include in your email:</p>
              <ul className="list-disc pl-6 space-y-1">
                <li>Your registered phone number</li>
                <li>Subject: "Account Deletion Request"</li>
                <li>Reason for deletion (optional)</li>
              </ul>
              <p className="mt-4 text-sm text-gray-600">
                We will process deletion requests within <strong>7 working days</strong>.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Data Retention</h2>
              <p className="mb-4">After account deletion:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  <strong>Personal data</strong> (phone number, user ID) will be permanently removed
                </li>
                <li>
                  Some <strong>non-personal technical logs</strong> may be retained for security 
                  and legal compliance purposes
                </li>
                <li>
                  Anonymized analytics data may be retained but will not be linked to your identity
                </li>
              </ul>
            </section>

            <section className="bg-gray-100 p-6 rounded-lg">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Need Help?</h2>
              <p className="mb-4">
                If you have questions about account deletion or data privacy, please contact:
              </p>
              <div className="bg-white p-4 rounded-lg border-2 border-gray-200">
                <p className="font-semibold text-lg mb-2">Kasturi Gopala Krishna</p>
                <div className="space-y-2">
                  <div className="flex items-center space-x-3">
                    <Mail className="w-5 h-5 text-gray-600" />
                    <a 
                      href="mailto:gsttodaytv99@gmail.com" 
                      className="text-[#DC2626] hover:underline"
                    >
                      gsttodaytv99@gmail.com
                    </a>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Phone className="w-5 h-5 text-gray-600" />
                    <span className="text-gray-700">+91 9849884466</span>
                  </div>
                  <p className="text-gray-600 text-sm mt-2">Country: India</p>
                </div>
              </div>
            </section>

            <section className="bg-red-50 border border-red-200 p-6 rounded-lg">
              <h3 className="text-xl font-bold text-red-900 mb-2">⚠️ Important Note</h3>
              <p className="text-red-800">
                Account deletion is permanent and cannot be reversed. Please make sure you want 
                to proceed before confirming deletion.
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
