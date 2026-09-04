import { ArrowLeft, CloudRain, Sun, Thermometer, Droplets, Wind } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function Weather() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('uzhavan_user') || '{}');

  return (
    <div className="flex flex-col min-h-full bg-blue-50 pb-20">
      <div className="bg-white px-4 py-4 flex items-center shadow-sm sticky top-0 z-10">
        <button onClick={() => navigate(-1)} className="mr-4 p-2 hover:bg-gray-100 rounded-full">
          <ArrowLeft size={24} />
        </button>
        <h1 className="font-bold text-lg text-gray-800">Weather Forecast</h1>
      </div>

      <div className="p-4 space-y-4">
        <div className="bg-gradient-to-br from-blue-400 to-blue-600 rounded-3xl p-6 text-white shadow-lg">
          <h2 className="text-xl font-medium mb-1">{user.location || 'Current Location'}</h2>
          <p className="text-blue-100 mb-6">Today, {new Date().toLocaleDateString()}</p>
          
          <div className="flex justify-between items-center mb-8">
            <div className="text-6xl font-bold">28°</div>
            <Sun size={64} className="text-yellow-300" />
          </div>

          <div className="grid grid-cols-3 gap-4 text-center">
            <div className="bg-white/20 p-3 rounded-2xl">
              <Thermometer size={24} className="mx-auto mb-1" />
              <p className="text-sm">Feels 30°</p>
            </div>
            <div className="bg-white/20 p-3 rounded-2xl">
              <Droplets size={24} className="mx-auto mb-1" />
              <p className="text-sm">65%</p>
            </div>
            <div className="bg-white/20 p-3 rounded-2xl">
              <Wind size={24} className="mx-auto mb-1" />
              <p className="text-sm">12 km/h</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-3xl p-5 shadow-soft border border-gray-100">
          <h3 className="font-bold text-gray-800 flex items-center gap-2 mb-4">
            <CloudRain className="text-blue-500" /> Farming Advisory
          </h3>
          <p className="text-gray-600 leading-relaxed text-sm">
            No rain expected in the next 48 hours. Good time for pesticide spraying and irrigation for your {user.cropType || 'crops'}. Avoid heavy fertilization until next week.
          </p>
        </div>
      </div>
    </div>
  );
}
