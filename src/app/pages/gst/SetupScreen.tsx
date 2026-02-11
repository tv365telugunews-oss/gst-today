import { useState } from 'react';
import { useNavigate } from 'react-router';
import { MapPin, Globe, ChevronDown, Sparkles, Building2 } from 'lucide-react';

const states = [
  'Select State',
  'Andhra Pradesh',
  'Arunachal Pradesh',
  'Assam',
  'Bihar',
  'Chhattisgarh',
  'Goa',
  'Gujarat',
  'Haryana',
  'Himachal Pradesh',
  'Jharkhand',
  'Karnataka',
  'Kerala',
  'Madhya Pradesh',
  'Maharashtra',
  'Manipur',
  'Meghalaya',
  'Mizoram',
  'Nagaland',
  'Odisha',
  'Punjab',
  'Rajasthan',
  'Sikkim',
  'Tamil Nadu',
  'Telangana',
  'Tripura',
  'Uttar Pradesh',
  'Uttarakhand',
  'West Bengal',
];

const districtsByState: Record<string, string[]> = {
  'Select State': ['Select District'],
  'Andhra Pradesh': ['All Districts', 'Visakhapatnam', 'Vijayawada', 'Guntur', 'Tirupati', 'Kakinada', 'Rajahmundry', 'Nellore', 'Kurnool', 'Anantapur', 'Kadapa'],
  'Telangana': ['All Districts', 'Hyderabad', 'Warangal', 'Nizamabad', 'Karimnagar', 'Khammam', 'Mahbubnagar', 'Nalgonda', 'Rangareddy', 'Medak', 'Adilabad'],
  'Tamil Nadu': ['All Districts', 'Chennai', 'Coimbatore', 'Madurai', 'Tiruchirappalli', 'Salem', 'Tirunelveli', 'Tiruppur', 'Erode', 'Vellore', 'Thoothukudi'],
  'Karnataka': ['All Districts', 'Bengaluru', 'Mysuru', 'Mangaluru', 'Hubballi', 'Belagavi', 'Kalaburagi', 'Davanagere', 'Ballari', 'Vijayapura', 'Shivamogga'],
  'Maharashtra': ['All Districts', 'Mumbai', 'Pune', 'Nagpur', 'Nashik', 'Thane', 'Aurangabad', 'Solapur', 'Kolhapur', 'Amravati', 'Navi Mumbai'],
  'Gujarat': ['All Districts', 'Ahmedabad', 'Surat', 'Vadodara', 'Rajkot', 'Bhavnagar', 'Jamnagar', 'Junagadh', 'Gandhinagar', 'Anand', 'Nadiad'],
  'Kerala': ['All Districts', 'Thiruvananthapuram', 'Kochi', 'Kozhikode', 'Thrissur', 'Kollam', 'Malappuram', 'Palakkad', 'Alappuzha', 'Kannur', 'Kottayam'],
  'Rajasthan': ['All Districts', 'Jaipur', 'Jodhpur', 'Kota', 'Bikaner', 'Udaipur', 'Ajmer', 'Bhilwara', 'Alwar', 'Bharatpur', 'Sikar'],
  'Uttar Pradesh': ['All Districts', 'Lucknow', 'Kanpur', 'Ghaziabad', 'Agra', 'Varanasi', 'Meerut', 'Allahabad', 'Bareilly', 'Aligarh', 'Moradabad'],
  'West Bengal': ['All Districts', 'Kolkata', 'Howrah', 'Durgapur', 'Asansol', 'Siliguri', 'Bardhaman', 'Malda', 'Baharampur', 'Kharagpur', 'Haldia'],
  'Madhya Pradesh': ['All Districts', 'Indore', 'Bhopal', 'Jabalpur', 'Gwalior', 'Ujjain', 'Sagar', 'Dewas', 'Satna', 'Ratlam', 'Rewa'],
  'Punjab': ['All Districts', 'Ludhiana', 'Amritsar', 'Jalandhar', 'Patiala', 'Bathinda', 'Mohali', 'Hoshiarpur', 'Batala', 'Pathankot', 'Moga'],
  'Haryana': ['All Districts', 'Faridabad', 'Gurgaon', 'Hisar', 'Rohtak', 'Panipat', 'Karnal', 'Sonipat', 'Yamunanagar', 'Panchkula', 'Ambala'],
  'Bihar': ['All Districts', 'Patna', 'Gaya', 'Bhagalpur', 'Muzaffarpur', 'Darbhanga', 'Bihar Sharif', 'Arrah', 'Begusarai', 'Katihar', 'Munger'],
  'Odisha': ['All Districts', 'Bhubaneswar', 'Cuttack', 'Rourkela', 'Brahmapur', 'Sambalpur', 'Puri', 'Balasore', 'Bhadrak', 'Baripada', 'Jharsuguda'],
  'Jharkhand': ['All Districts', 'Ranchi', 'Jamshedpur', 'Dhanbad', 'Bokaro', 'Deoghar', 'Phusro', 'Hazaribagh', 'Giridih', 'Ramgarh', 'Medininagar'],
  'Assam': ['All Districts', 'Guwahati', 'Silchar', 'Dibrugarh', 'Jorhat', 'Nagaon', 'Tinsukia', 'Tezpur', 'Bongaigaon', 'Dhubri', 'Diphu'],
  'Uttarakhand': ['All Districts', 'Dehradun', 'Haridwar', 'Roorkee', 'Haldwani', 'Rudrapur', 'Kashipur', 'Rishikesh', 'Kotdwar', 'Ramnagar', 'Pithoragarh'],
  'Himachal Pradesh': ['All Districts', 'Shimla', 'Dharamshala', 'Solan', 'Mandi', 'Palampur', 'Baddi', 'Nahan', 'Sundarnagar', 'Chamba', 'Una'],
  'Chhattisgarh': ['All Districts', 'Raipur', 'Bhilai', 'Bilaspur', 'Korba', 'Durg', 'Rajnandgaon', 'Jagdalpur', 'Raigarh', 'Ambikapur', 'Dhamtari'],
  'Goa': ['All Districts', 'Panaji', 'Margao', 'Vasco da Gama', 'Mapusa', 'Ponda', 'Bicholim', 'Curchorem', 'Sanquelim', 'Cuncolim', 'Quepem'],
};

// Default districts for states not in the map
const defaultDistricts = ['All Districts'];

const languages = [
  'Choose Your Language',
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

export default function SetupScreen() {
  const navigate = useNavigate();
  const [selectedState, setSelectedState] = useState('Select State');
  const [selectedDistrict, setSelectedDistrict] = useState('Select District');
  const [selectedLanguage, setSelectedLanguage] = useState('Choose Your Language');

  const availableDistricts = districtsByState[selectedState] || defaultDistricts;

  const canProceed = 
    selectedState !== 'Select State' && 
    selectedDistrict !== 'Select District' && 
    selectedLanguage !== 'Choose Your Language';

  const handleStateChange = (state: string) => {
    setSelectedState(state);
    setSelectedDistrict('Select District');
  };

  const handleGetStarted = () => {
    if (canProceed) {
      // Store location preferences
      localStorage.setItem('userState', selectedState);
      localStorage.setItem('userDistrict', selectedDistrict);
      localStorage.setItem('userLanguage', selectedLanguage);
      navigate('/app');
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Header */}
      <div className="p-6 text-center">
        <h1 
          className="text-3xl font-black uppercase mb-2"
          style={{
            color: '#E53935',
            textShadow: '2px 2px 0px rgba(0, 0, 0, 0.1)',
            letterSpacing: '1px',
          }}
        >
          GST TODAY TV
        </h1>
        <p className="text-[#6B7280] text-sm">Setup Your Preferences</p>
      </div>

      {/* Content */}
      <div className="flex-1 px-4 space-y-6 overflow-y-auto">
        {/* Location Section */}
        <div className="bg-white rounded-xl border border-[#E5E7EB] shadow-sm p-5">
          {/* Icon and Title */}
          <div className="flex items-start space-x-3 mb-4">
            <div className="w-12 h-12 bg-[#FEE2E2] rounded-full flex items-center justify-center flex-shrink-0">
              <MapPin className="w-6 h-6 text-[#E53935]" />
            </div>
            <div className="flex-1">
              <h2 className="text-lg font-bold text-black">Select Your Location</h2>
              <p className="text-sm text-[#6B7280]">Get news from your area</p>
            </div>
          </div>

          {/* State Dropdown */}
          <div className="mb-4">
            <label className="block text-sm font-semibold text-black mb-2">
              Select State
            </label>
            <div className="relative">
              <select
                value={selectedState}
                onChange={(e) => handleStateChange(e.target.value)}
                className="w-full h-12 pl-4 pr-10 bg-[#F9FAFB] border border-[#E5E7EB] rounded-lg focus:outline-none focus:border-[#1976D2] transition-colors appearance-none text-base cursor-pointer"
              >
                {states.map((state) => (
                  <option key={state} value={state}>
                    {state}
                  </option>
                ))}
              </select>
              <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#6B7280] pointer-events-none" />
            </div>
          </div>

          {/* District Dropdown */}
          <div>
            <label className="block text-sm font-semibold text-black mb-2">
              Select District
            </label>
            <div className="relative">
              <select
                value={selectedDistrict}
                onChange={(e) => setSelectedDistrict(e.target.value)}
                disabled={selectedState === 'Select State'}
                className="w-full h-12 pl-4 pr-10 bg-[#F9FAFB] border border-[#E5E7EB] rounded-lg focus:outline-none focus:border-[#1976D2] transition-colors appearance-none text-base cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <option value="Select District">Select District</option>
                {availableDistricts.map((district) => (
                  <option key={district} value={district}>
                    {district}
                  </option>
                ))}
              </select>
              <Building2 className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#6B7280] pointer-events-none" />
            </div>
          </div>
        </div>

        {/* Language Section */}
        <div className="bg-white rounded-xl border border-[#E5E7EB] shadow-sm p-5">
          {/* Icon and Title */}
          <div className="flex items-start space-x-3 mb-4">
            <div className="w-12 h-12 bg-[#DBEAFE] rounded-full flex items-center justify-center flex-shrink-0">
              <Globe className="w-6 h-6 text-[#1976D2]" />
            </div>
            <div className="flex-1">
              <h2 className="text-lg font-bold text-black">Choose Your Language</h2>
              <p className="text-sm text-[#6B7280]">Read news in your preferred language</p>
            </div>
          </div>

          {/* Dropdown */}
          <div>
            <label className="block text-sm font-semibold text-black mb-2">
              Choose Your Language
            </label>
            <div className="relative">
              <select
                value={selectedLanguage}
                onChange={(e) => setSelectedLanguage(e.target.value)}
                className="w-full h-12 pl-4 pr-10 bg-[#F9FAFB] border border-[#E5E7EB] rounded-lg focus:outline-none focus:border-[#1976D2] transition-colors appearance-none text-base cursor-pointer"
              >
                {languages.map((language) => (
                  <option key={language} value={language}>
                    {language}
                  </option>
                ))}
              </select>
              <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#6B7280] pointer-events-none" />
            </div>
          </div>
        </div>

        {/* Helper Text */}
        <p className="text-xs text-center text-[#6B7280] px-4">
          You can change these settings anytime in the menu
        </p>
      </div>

      {/* Get Started Button */}
      <div className="p-4">
        <button
          onClick={handleGetStarted}
          disabled={!canProceed}
          className={`w-full h-12 rounded-lg font-semibold flex items-center justify-center space-x-2 transition-all active:scale-95 ${
            canProceed
              ? 'bg-[#E53935] hover:bg-[#C62828] text-white'
              : 'bg-[#F3F4F6] text-[#6B7280] cursor-not-allowed'
          }`}
        >
          <Sparkles className="w-5 h-5" />
          <span>Get Started</span>
        </button>
      </div>
    </div>
  );
}
