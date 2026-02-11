import { useState } from 'react';
import { useNavigate } from 'react-router';
import { Phone, ArrowUp, Settings } from 'lucide-react';

export default function LoginScreen() {
  const navigate = useNavigate();
  const [mobile, setMobile] = useState('');
  const [error, setError] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (mobile.length !== 10) {
      setError('Please enter a valid 10-digit mobile number');
      return;
    }

    // Navigate to terms & conditions
    navigate('/terms');
  };

  const handleDemoLogin = () => {
    setMobile('9876543210');
    setTimeout(() => {
      navigate('/terms');
    }, 500);
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Header Section */}
      <div className="flex-1 flex flex-col items-center justify-center p-8 pb-4">
        {/* Upward Arrow */}
        <div className="mb-6">
          <div className="w-16 h-16 bg-gradient-to-b from-[#FF6B35] to-[#E53935] rounded-full flex items-center justify-center shadow-xl">
            <ArrowUp className="w-10 h-10 text-white" strokeWidth={3} />
          </div>
        </div>

        {/* Logo */}
        <h1 
          className="text-4xl font-black uppercase mb-3 text-center"
          style={{
            color: '#E53935',
            textShadow: '2px 2px 0px rgba(0, 0, 0, 0.1), 4px 4px 0px rgba(229, 57, 53, 0.2)',
            letterSpacing: '1px',
          }}
        >
          GST TODAY TV
        </h1>

        {/* Subtitle */}
        <p className="text-[#6B7280] text-center text-sm mb-2">
          Enter your mobile number to continue
        </p>
      </div>

      {/* Login Card */}
      <div className="px-4 pb-8">
        <div className="bg-white rounded-xl shadow-lg p-6 border border-[#E5E7EB]">
          <h2 className="text-xl font-bold text-black mb-6">Login</h2>

          <form onSubmit={handleLogin}>
            {/* Mobile Number Field */}
            <div className="mb-4">
              <label className="block text-sm font-semibold text-black mb-2">
                Mobile Number
              </label>
              <div className="relative">
                <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#6B7280]" />
                <input
                  type="tel"
                  placeholder="9876543210"
                  value={mobile}
                  onChange={(e) => {
                    setError('');
                    setMobile(e.target.value.replace(/\D/g, '').slice(0, 10));
                  }}
                  className="w-full h-12 pl-12 pr-4 bg-[#F9FAFB] border border-[#E5E7EB] rounded-lg focus:outline-none focus:border-[#1976D2] transition-colors text-base"
                  maxLength={10}
                />
              </div>
              <p className="text-xs text-[#6B7280] mt-2">Enter 10-digit mobile number</p>
              {error && (
                <p className="text-xs text-[#E53935] mt-2">{error}</p>
              )}
            </div>

            {/* Login Button */}
            <button
              type="submit"
              className="w-full h-12 bg-[#E53935] hover:bg-[#C62828] text-white rounded-lg font-semibold flex items-center justify-center space-x-2 transition-all active:scale-95 mb-4"
            >
              <Settings className="w-5 h-5" />
              <span>Login</span>
            </button>

            {/* Demo Number */}
            <div className="text-center">
              <p className="text-sm text-[#6B7280] mb-2">Demo Number:</p>
              <button
                type="button"
                onClick={handleDemoLogin}
                className="text-lg font-bold text-[#6B7280] hover:text-[#E53935] transition-colors"
              >
                9876543210
              </button>
            </div>
          </form>
        </div>

        {/* Footer Text */}
        <p className="text-xs text-center text-[#6B7280] mt-6 px-4">
          By continuing, you agree to our Terms & Privacy Policy
        </p>
      </div>
    </div>
  );
}
