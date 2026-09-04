import { useState, useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Camera, MapPin, Maximize } from 'lucide-react';

export default function Register() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    location: '',
    cropType: 'Paddy',
    landArea: '',
    landUnit: 'Acres',
    soilType: 'Alluvial',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');
  
  // Camera Modal State
  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const [cameraMode, setCameraMode] = useState<'crop' | 'land' | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);

  const CROP_TYPES = ['Paddy', 'Sugarcane', 'Cotton', 'Maize', 'Banana', 'Groundnut', 'Vegetables', 'Pulses'];
  const SOIL_TYPES = ['Alluvial', 'Black Clay', 'Red Loamy', 'Sandy', 'Laterite', 'Mud soil'];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleGPSLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          // Mock geocoding for demo
          setFormData(prev => ({ ...prev, location: `Lat: ${position.coords.latitude.toFixed(4)}, Lng: ${position.coords.longitude.toFixed(4)}` }));
        },
        () => setError('Unable to retrieve your location')
      );
    } else {
      setError('Geolocation not supported by this browser.');
    }
  };

  const openCamera = async (mode: 'crop' | 'land') => {
    setCameraMode(mode);
    setIsCameraOpen(true);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
      streamRef.current = stream;
    } catch (err) {
      console.error("Camera error:", err);
      // Fallback if camera is blocked/unavailable - just mock instantly
      setTimeout(() => mockScanResult(mode), 1000);
    }
  };

  const closeCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
    }
    setIsCameraOpen(false);
  };

  const mockScanResult = (mode: 'crop' | 'land') => {
    if (mode === 'crop') {
      setFormData(prev => ({ ...prev, cropType: 'Tomato' })); // Added Tomato for disease demo
      if(!CROP_TYPES.includes('Tomato')) CROP_TYPES.push('Tomato');
    } else if (mode === 'land') {
      setFormData(prev => ({ ...prev, landArea: '2.5', landUnit: 'Acres' }));
    }
    closeCamera();
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    if (!formData.fullName || !formData.phone || !formData.password) {
      setError('Please fill all required fields');
      return;
    }

    const userProfile = {
      ...formData,
      registeredDate: new Date().toLocaleDateString()
    };
    
    localStorage.setItem('uzhavan_user', JSON.stringify(userProfile));
    navigate('/');
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6 bg-ui-background">
      <div className="w-full max-w-md card bg-white p-6 rounded-3xl shadow-soft">
        <h2 className="text-2xl font-bold text-brand-dark mb-6 text-center">Farmer Registration</h2>
        
        {error && <div className="mb-4 p-3 bg-red-100 text-red-600 rounded-xl text-sm text-center">{error}</div>}

        <form onSubmit={handleRegister} className="flex flex-col gap-4">
          <input name="fullName" placeholder="Full Name *" onChange={handleInputChange} className="input-field" required />
          <input name="email" type="email" placeholder="Email (Optional)" onChange={handleInputChange} className="input-field" />
          <input name="phone" type="tel" placeholder="Phone Number *" onChange={handleInputChange} className="input-field" required />

          {/* Location */}
          <div className="flex gap-2">
            <input name="location" value={formData.location} placeholder="Location / Village" onChange={handleInputChange} className="input-field flex-1" required />
            <button type="button" onClick={handleGPSLocation} className="btn-secondary px-3" aria-label="Detect GPS">
              <MapPin size={20} className="text-brand" />
            </button>
          </div>

          {/* Crop Type */}
          <div className="flex gap-2">
            <select name="cropType" value={formData.cropType} onChange={handleInputChange} className="input-field flex-1 bg-white">
              {CROP_TYPES.map(crop => <option key={crop} value={crop}>{crop}</option>)}
            </select>
            <button type="button" onClick={() => openCamera('crop')} className="btn-secondary px-3" title="Scan Crop via Camera">
              <Camera size={20} className="text-brand" />
            </button>
          </div>

          {/* Land Area */}
          <div className="flex gap-2">
            <input name="landArea" type="number" step="0.01" value={formData.landArea} placeholder="Land Area" onChange={handleInputChange} className="input-field flex-1" />
            <select name="landUnit" value={formData.landUnit} onChange={handleInputChange} className="input-field w-24 bg-white">
              <option value="Acres">Acres</option>
              <option value="Hectares">Ha</option>
              <option value="Cents">Cents</option>
            </select>
            <button type="button" onClick={() => openCamera('land')} className="btn-secondary px-3" title="Measure Land Area">
              <Maximize size={20} className="text-brand" />
            </button>
          </div>

          {/* Soil Type */}
          <select name="soilType" value={formData.soilType} onChange={handleInputChange} className="input-field bg-white">
            {SOIL_TYPES.map(soil => <option key={soil} value={soil}>{soil}</option>)}
          </select>

          <input name="password" type="password" placeholder="Password *" onChange={handleInputChange} className="input-field" required />
          <input name="confirmPassword" type="password" placeholder="Confirm Password *" onChange={handleInputChange} className="input-field" required />

          <button type="submit" className="btn-primary mt-2">Complete Registration</button>
        </form>

        <div className="mt-6 text-center text-sm text-ui-muted">
          Already registered? <Link to="/login" className="text-brand font-bold hover:underline">Login</Link>
        </div>
      </div>

      {/* Camera Modal */}
      {isCameraOpen && (
        <div className="fixed inset-0 bg-black z-50 flex flex-col">
          <div className="p-4 flex justify-between items-center text-white">
            <span className="font-bold">{cameraMode === 'crop' ? 'Scanning Crop...' : 'Measuring Land...'}</span>
            <button onClick={closeCamera} className="text-xl">✕</button>
          </div>
          <div className="flex-1 relative overflow-hidden bg-gray-900">
            <video ref={videoRef} autoPlay playsInline className="w-full h-full object-cover" />
            <div className="absolute inset-0 border-4 border-brand/50 m-12 rounded-3xl" />
          </div>
          <div className="p-8 pb-12 flex justify-center bg-black">
            <button 
              onClick={() => mockScanResult(cameraMode!)} 
              className="w-20 h-20 bg-white rounded-full border-4 border-gray-300 focus:outline-none active:scale-95"
            />
          </div>
        </div>
      )}

      {/* Inject styles for inputs here for simplicity */}
      <style>{`
        .input-field {
          padding: 0.75rem;
          border: 1px solid #e5e7eb;
          border-radius: 0.75rem;
          outline: none;
        }
        .input-field:focus {
          border-color: #22c55e;
          box-shadow: 0 0 0 2px rgba(34, 197, 94, 0.2);
        }
      `}</style>
    </div>
  );
}
