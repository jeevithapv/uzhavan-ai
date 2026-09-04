import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, LogOut, Phone, MapPin, Maximize, Leaf, Layers, Calendar, PhoneCall, ChevronRight, Edit2, CheckCircle, Save, Camera } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import ScanHub from '../components/ScanHub';
import type { ScanMode } from '../components/ScanHub';

export default function Profile() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  
  const [user, setUser] = useState<any>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({
    cropType: '',
    soilType: '',
    landArea: '',
    landUnit: 'Acres'
  });
  const [showToast, setShowToast] = useState(false);

  // ScanHub State
  const [isScanHubOpen, setIsScanHubOpen] = useState(false);
  const [scanMode, setScanMode] = useState<ScanMode>('detect_crop');

  useEffect(() => {
    const userString = localStorage.getItem('uzhavan_user');
    if (userString) {
      const parsedUser = JSON.parse(userString);
      setUser(parsedUser);
      setEditData({
        cropType: parsedUser.cropType || '',
        soilType: parsedUser.soilType || '',
        landArea: parsedUser.landArea || '',
        landUnit: parsedUser.landUnit || 'Acres'
      });
    } else {
      navigate('/login');
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('uzhavan_user');
    navigate('/login');
  };

  const persistSave = (updatedData: any) => {
    if (user) {
      const updatedUser = { ...user, ...updatedData };
      localStorage.setItem('uzhavan_user', JSON.stringify(updatedUser));
      setUser(updatedUser);
      
      // Show toast
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
    }
  };

  const handleSave = () => {
    persistSave(editData);
    setIsEditing(false);
  };

  const handleScanResult = (result: string) => {
    let updatedData = { ...editData };
    if (scanMode === 'detect_crop') {
      updatedData.cropType = result;
    } else if (scanMode === 'detect_soil') {
      updatedData.soilType = result;
    } else if (scanMode === 'measure_land') {
      updatedData.landArea = result;
      updatedData.landUnit = 'Acres';
    }
    
    setEditData(updatedData);
    persistSave(updatedData);
  };

  const openScan = (mode: ScanMode) => {
    setScanMode(mode);
    setIsScanHubOpen(true);
  };

  if (!user) return null;

  const initials = user.fullName 
    ? user.fullName.split(' ').map((n: string) => n[0]).join('').substring(0, 2).toUpperCase()
    : 'U';

  const CROP_OPTIONS = ['Paddy', 'Sugarcane', 'Cotton', 'Maize', 'Banana', 'Groundnut', 'Vegetables', 'Pulses'];
  const SOIL_OPTIONS = ['Alluvial', 'Black Clay', 'Red Loamy', 'Sandy', 'Laterite', 'Mud'];
  const UNIT_OPTIONS = ['Acres', 'Hectares', 'Cents'];

  return (
    <div className="flex flex-col min-h-full bg-ui-background pb-20 relative">
      
      {/* Toast Notification */}
      {showToast && (
        <div className="fixed top-20 left-1/2 transform -translate-x-1/2 z-50 bg-gray-900 text-white px-4 py-3 rounded-xl shadow-2xl flex items-center gap-2 animate-bounce">
          <CheckCircle className="text-emerald-400" size={20} />
          <span className="font-bold text-sm">{t('saved_successfully')}</span>
        </div>
      )}

      {/* Header */}
      <div className="bg-white px-4 py-4 flex items-center justify-between shadow-sm sticky top-0 z-10">
        <div className="flex items-center gap-3">
          <button onClick={() => navigate(-1)} className="p-2 hover:bg-gray-100 rounded-full transition-colors -ml-2">
            <ArrowLeft size={24} className="text-gray-700" />
          </button>
          <div className="flex items-center gap-2">
            <img src="/logo.png" alt="" className="h-6 w-auto" onError={(e) => (e.currentTarget.style.display = 'none')} />
            <h1 className="font-bold text-lg text-gray-800 uppercase tracking-wider">{t('profile_title')}</h1>
          </div>
        </div>
        <button 
          onClick={handleLogout}
          className="flex items-center gap-1 bg-red-50 text-red-600 px-3 py-1.5 rounded-lg text-sm font-bold hover:bg-red-100 transition-colors shadow-sm"
        >
          <LogOut size={16} /> {t('logout')}
        </button>
      </div>

      <div className="p-4 md:p-8 space-y-6 md:space-y-0 md:grid md:grid-cols-2 md:gap-8">
        
        {/* Left Column (Desktop) */}
        <div className="space-y-6">
          <div className="bg-white rounded-3xl shadow-soft p-6 border border-gray-100 flex flex-col items-center">
            <div className="w-32 h-32 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center text-4xl font-bold mb-4 shadow-inner">
              {initials}
            </div>
            <h2 className="text-2xl font-bold text-gray-900">{user.fullName || 'Farmer'}</h2>
            <p className="text-emerald-600 font-medium">{t('profile_title').includes('PROFILE') ? 'Farmer' : 'விவசாயி'}</p>
          </div>

          {/* Secondary Action Card */}
          <Link to="/support" className="block">
            <div className="bg-white rounded-3xl p-5 border-2 border-emerald-200 shadow-soft hover:shadow-md transition-shadow active:scale-95 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center">
                  <PhoneCall size={24} className="text-emerald-600" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900">{t('call_history')}</h3>
                  <p className="text-xs text-gray-500 font-medium">{t('view_consultations')}</p>
                </div>
              </div>
              <ChevronRight size={24} className="text-gray-400" />
            </div>
          </Link>
        </div>

        {/* Right Column (Desktop) Main Profile Card */}
        <div className="bg-white rounded-3xl shadow-soft p-6 border border-gray-100 relative h-fit">
          
          <button 
            onClick={() => isEditing ? handleSave() : setIsEditing(true)}
            className={`absolute top-4 right-4 flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-bold transition-all shadow-sm z-10 ${
              isEditing ? 'bg-brand text-white shadow-brand/30' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            {isEditing ? (
              <><Save size={14} /> {t('save_changes')}</>
            ) : (
              <><Edit2 size={14} /> {t('edit_details')}</>
            )}
          </button>

          <div className="space-y-4 mt-8 md:mt-2">
            <div className="flex items-center gap-4 p-3 bg-gray-50 rounded-2xl">
              <div className="bg-white p-2 rounded-xl shadow-sm"><Phone size={20} className="text-emerald-500" /></div>
              <div>
                <p className="text-xs text-gray-500 font-semibold uppercase tracking-wider">{t('phone_number')}</p>
                <p className="font-medium text-gray-900">{user.phone}</p>
              </div>
            </div>

            <div className="flex items-center gap-4 p-3 bg-gray-50 rounded-2xl">
              <div className="bg-white p-2 rounded-xl shadow-sm"><MapPin size={20} className="text-emerald-500" /></div>
              <div>
                <p className="text-xs text-gray-500 font-semibold uppercase tracking-wider">{t('location')}</p>
                <p className="font-medium text-gray-900">{user.location || 'Not set'}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col p-3 bg-gray-50 rounded-2xl relative overflow-hidden group">
                <div className="flex items-center gap-2 mb-2 relative z-10">
                  <div className="bg-white p-1.5 rounded-lg shadow-sm"><Maximize size={16} className="text-emerald-500" /></div>
                  <p className="text-[10px] text-gray-500 font-semibold uppercase">{t('land_area')}</p>
                </div>
                {isEditing ? (
                  <div className="flex gap-1 relative z-10">
                    <input 
                      type="number" 
                      value={editData.landArea} 
                      onChange={e => setEditData({...editData, landArea: e.target.value})}
                      className="w-1/2 bg-white text-sm font-bold p-1 rounded border border-gray-200"
                    />
                    <select 
                      value={editData.landUnit}
                      onChange={e => setEditData({...editData, landUnit: e.target.value})}
                      className="w-1/2 bg-white text-xs font-bold p-1 rounded border border-gray-200"
                    >
                      {UNIT_OPTIONS.map(u => <option key={u}>{u}</option>)}
                    </select>
                  </div>
                ) : (
                  <div className="relative z-10 ml-1">
                    <p className="font-medium text-gray-900 text-sm">
                      {user.landArea ? `${user.landArea} ${user.landUnit || 'Acres'}`.replace('Acres Acres', 'Acres') : 'N/A'}
                    </p>
                    <button onClick={() => openScan('measure_land')} className="flex items-center gap-1 text-[10px] font-bold text-brand mt-1 hover:text-brand-dark transition-colors">
                      <Camera size={12} /> Scan with AI
                    </button>
                  </div>
                )}
              </div>

              <div className="flex flex-col p-3 bg-gray-50 rounded-2xl relative overflow-hidden group">
                <div className="flex items-center gap-2 mb-2 relative z-10">
                  <div className="bg-white p-1.5 rounded-lg shadow-sm"><Leaf size={16} className="text-emerald-500" /></div>
                  <p className="text-[10px] text-gray-500 font-semibold uppercase">{t('crop_type')}</p>
                </div>
                {isEditing ? (
                  <select 
                    value={editData.cropType}
                    onChange={e => setEditData({...editData, cropType: e.target.value})}
                    className="w-full bg-white text-xs font-bold p-1.5 rounded border border-gray-200 relative z-10"
                  >
                    {CROP_OPTIONS.map(c => <option key={c}>{c}</option>)}
                  </select>
                ) : (
                  <div className="relative z-10 ml-1">
                    <p className="font-medium text-gray-900 text-sm">{user.cropType || 'N/A'}</p>
                    <button onClick={() => openScan('detect_crop')} className="flex items-center gap-1 text-[10px] font-bold text-brand mt-1 hover:text-brand-dark transition-colors">
                      <Camera size={12} /> Scan with AI
                    </button>
                  </div>
                )}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col p-3 bg-gray-50 rounded-2xl relative overflow-hidden group">
                <div className="flex items-center gap-2 mb-2 relative z-10">
                  <div className="bg-white p-1.5 rounded-lg shadow-sm"><Layers size={16} className="text-emerald-500" /></div>
                  <p className="text-[10px] text-gray-500 font-semibold uppercase">{t('soil_type')}</p>
                </div>
                {isEditing ? (
                  <select 
                    value={editData.soilType}
                    onChange={e => setEditData({...editData, soilType: e.target.value})}
                    className="w-full bg-white text-xs font-bold p-1.5 rounded border border-gray-200 relative z-10"
                  >
                    {SOIL_OPTIONS.map(s => <option key={s}>{s}</option>)}
                  </select>
                ) : (
                  <div className="relative z-10 ml-1">
                    <p className="font-medium text-gray-900 text-sm">{user.soilType || 'N/A'}</p>
                    <button onClick={() => openScan('detect_soil')} className="flex items-center gap-1 text-[10px] font-bold text-brand mt-1 hover:text-brand-dark transition-colors">
                      <Camera size={12} /> Scan with AI
                    </button>
                  </div>
                )}
              </div>

              <div className="flex flex-col p-3 bg-gray-50 rounded-2xl">
                <div className="flex items-center gap-2 mb-2">
                  <div className="bg-white p-1.5 rounded-lg shadow-sm"><Calendar size={16} className="text-emerald-500" /></div>
                  <p className="text-[10px] text-gray-500 font-semibold uppercase">{t('registered')}</p>
                </div>
                <p className="font-medium text-gray-900 text-sm ml-1">{user.registeredDate || 'Today'}</p>
              </div>
            </div>
          </div>
        </div>

      </div>

      <ScanHub 
        isOpen={isScanHubOpen}
        onClose={() => setIsScanHubOpen(false)}
        mode={scanMode}
        onResult={handleScanResult}
      />
    </div>
  );
}
