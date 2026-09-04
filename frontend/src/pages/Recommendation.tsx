import { ArrowLeft, Sprout, CheckCircle2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function Recommendation() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('uzhavan_user') || '{}');

  return (
    <div className="flex flex-col min-h-full bg-emerald-50 pb-20">
      <div className="bg-white px-4 py-4 flex items-center shadow-sm sticky top-0 z-10">
        <button onClick={() => navigate(-1)} className="mr-4 p-2 hover:bg-gray-100 rounded-full">
          <ArrowLeft size={24} />
        </button>
        <h1 className="font-bold text-lg text-gray-800">Crop Recommendation</h1>
      </div>

      <div className="p-4 space-y-4">
        <div className="bg-white rounded-3xl p-6 shadow-soft border border-emerald-100">
          <div className="flex justify-between items-start mb-4">
            <div>
              <p className="text-sm text-gray-500 font-medium">Analysis for your land:</p>
              <h2 className="text-xl font-bold text-emerald-800">{user.landArea || 'N/A'} of {user.soilType || 'Soil'}</h2>
            </div>
            <div className="p-3 bg-emerald-100 rounded-full">
              <Sprout className="text-emerald-600" size={24} />
            </div>
          </div>
          
          <div className="space-y-4 mt-6">
            <h3 className="font-bold text-gray-800">Top Suggested Crops:</h3>
            
            <div className="flex items-center gap-4 p-4 border-2 border-emerald-500 rounded-2xl bg-emerald-50">
              <div className="text-4xl">🍅</div>
              <div className="flex-1">
                <h4 className="font-bold text-lg">Tomato</h4>
                <p className="text-sm text-gray-600">High yield probability (85%)</p>
              </div>
              <CheckCircle2 className="text-emerald-500" />
            </div>

            <div className="flex items-center gap-4 p-4 border border-gray-200 rounded-2xl bg-white">
              <div className="text-4xl">🌽</div>
              <div className="flex-1">
                <h4 className="font-bold text-lg">Maize</h4>
                <p className="text-sm text-gray-600">Medium yield probability (70%)</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
