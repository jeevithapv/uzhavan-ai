import { useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, LogOut, Phone, MapPin, Maximize, Leaf, Layers, Calendar, PhoneCall, ChevronRight } from 'lucide-react';

export default function Profile() {
  const navigate = useNavigate();
  const userString = localStorage.getItem('uzhavan_user');
  const user = userString ? JSON.parse(userString) : null;

  const handleLogout = () => {
    localStorage.removeItem('uzhavan_user');
    navigate('/login');
  };

  if (!user) {
    navigate('/login');
    return null;
  }

  // Generate initials for avatar
  const initials = user.fullName 
    ? user.fullName.split(' ').map((n: string) => n[0]).join('').substring(0, 2).toUpperCase()
    : 'U';

  return (
    <div className="flex flex-col min-h-full bg-ui-background pb-20">
      {/* Header */}
      <div className="bg-white px-4 py-4 flex items-center justify-between shadow-sm sticky top-0 z-10">
        <button onClick={() => navigate(-1)} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
          <ArrowLeft size={24} className="text-gray-700" />
        </button>
        <h1 className="font-bold text-lg text-gray-800 tracking-wider">MY PROFILE</h1>
        <button 
          onClick={handleLogout}
          className="flex items-center gap-1 bg-red-500 text-white px-3 py-1.5 rounded-lg text-sm font-bold hover:bg-red-600 transition-colors shadow-sm"
        >
          <LogOut size={16} /> LOGOUT
        </button>
      </div>

      <div className="p-4 space-y-6">
        {/* Main Profile Card */}
        <div className="bg-white rounded-3xl shadow-soft p-6 border border-gray-100">
          <div className="flex flex-col items-center mb-6">
            <div className="w-24 h-24 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center text-3xl font-bold mb-3 shadow-inner">
              {initials}
            </div>
            <h2 className="text-xl font-bold text-gray-900">{user.fullName || 'Farmer'}</h2>
            <p className="text-emerald-600 font-medium">Farmer</p>
          </div>

          <div className="space-y-4">
            <div className="flex items-center gap-4 p-3 bg-gray-50 rounded-2xl">
              <div className="bg-white p-2 rounded-xl shadow-sm"><Phone size={20} className="text-emerald-500" /></div>
              <div>
                <p className="text-xs text-gray-500 font-semibold uppercase tracking-wider">Phone Number</p>
                <p className="font-medium text-gray-900">{user.phone}</p>
              </div>
            </div>

            <div className="flex items-center gap-4 p-3 bg-gray-50 rounded-2xl">
              <div className="bg-white p-2 rounded-xl shadow-sm"><MapPin size={20} className="text-emerald-500" /></div>
              <div>
                <p className="text-xs text-gray-500 font-semibold uppercase tracking-wider">Location</p>
                <p className="font-medium text-gray-900">{user.location || 'Not set'}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-2xl">
                <div className="bg-white p-2 rounded-xl shadow-sm"><Maximize size={18} className="text-emerald-500" /></div>
                <div>
                  <p className="text-[10px] text-gray-500 font-semibold uppercase">Land Area</p>
                  <p className="font-medium text-gray-900 text-sm">{user.landArea ? `${user.landArea} ${user.landUnit || 'Acres'}` : 'N/A'}</p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-2xl">
                <div className="bg-white p-2 rounded-xl shadow-sm"><Leaf size={18} className="text-emerald-500" /></div>
                <div>
                  <p className="text-[10px] text-gray-500 font-semibold uppercase">Crop Type</p>
                  <p className="font-medium text-gray-900 text-sm">{user.cropType || 'N/A'}</p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-2xl">
                <div className="bg-white p-2 rounded-xl shadow-sm"><Layers size={18} className="text-emerald-500" /></div>
                <div>
                  <p className="text-[10px] text-gray-500 font-semibold uppercase">Soil Type</p>
                  <p className="font-medium text-gray-900 text-sm">{user.soilType || 'N/A'}</p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-2xl">
                <div className="bg-white p-2 rounded-xl shadow-sm"><Calendar size={18} className="text-emerald-500" /></div>
                <div>
                  <p className="text-[10px] text-gray-500 font-semibold uppercase">Registered</p>
                  <p className="font-medium text-gray-900 text-sm">{user.registeredDate || 'Today'}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Secondary Action Card */}
        <Link to="/support" className="block">
          <div className="bg-white rounded-3xl p-5 border-2 border-emerald-200 shadow-soft hover:shadow-md transition-shadow active:scale-95 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center">
                <PhoneCall size={24} className="text-emerald-600" />
              </div>
              <div>
                <h3 className="font-bold text-gray-900">Call History</h3>
                <p className="text-xs text-gray-500 font-medium">View past expert consultations</p>
              </div>
            </div>
            <ChevronRight size={24} className="text-gray-400" />
          </div>
        </Link>
      </div>
    </div>
  );
}
