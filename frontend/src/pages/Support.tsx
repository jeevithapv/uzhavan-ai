import { ArrowLeft, PhoneCall, HeadphonesIcon, HelpCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function Support() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col min-h-full bg-ui-background pb-20">
      <div className="bg-white px-4 py-4 flex items-center shadow-sm sticky top-0 z-10">
        <button onClick={() => navigate(-1)} className="mr-4 p-2 hover:bg-gray-100 rounded-full">
          <ArrowLeft size={24} />
        </button>
        <h1 className="font-bold text-lg text-gray-800">Kisan Helpline</h1>
      </div>

      <div className="p-4 space-y-4">
        <a href="tel:18001801551" className="block">
          <div className="bg-brand rounded-3xl p-8 text-white shadow-lg text-center hover:bg-brand-dark transition-colors active:scale-95 cursor-pointer">
            <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4 backdrop-blur-sm">
              <PhoneCall size={40} className="text-white" />
            </div>
            <h2 className="text-2xl font-bold mb-2">Call Kisan Center</h2>
            <p className="text-brand-light text-xl font-mono bg-black/10 inline-block px-4 py-2 rounded-xl mb-2">1800-180-1551</p>
            <p className="text-brand-light text-sm mt-2">Toll-Free • Available 6am - 10pm</p>
          </div>
        </a>

        <div className="grid grid-cols-2 gap-4 mt-6">
          <div className="bg-white p-6 rounded-3xl shadow-soft text-center border border-gray-100">
            <HeadphonesIcon size={32} className="text-emerald-500 mx-auto mb-3" />
            <h3 className="font-bold text-gray-800">Book Expert</h3>
            <p className="text-xs text-gray-500 mt-1">Schedule a video call</p>
          </div>
          
          <div className="bg-white p-6 rounded-3xl shadow-soft text-center border border-gray-100">
            <HelpCircle size={32} className="text-blue-500 mx-auto mb-3" />
            <h3 className="font-bold text-gray-800">FAQ</h3>
            <p className="text-xs text-gray-500 mt-1">Common answers</p>
          </div>
        </div>
      </div>
    </div>
  );
}
