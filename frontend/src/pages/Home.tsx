import React from 'react';
import { useTranslation } from 'react-i18next';
import { Mic, Leaf, Camera, CloudSun, TrendingUp, ShieldCheck } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  
  const userString = localStorage.getItem('uzhavan_user');
  const user = userString ? JSON.parse(userString) : { fullName: 'Farmer' };
  const firstName = user.fullName.split(' ')[0];

  return (
    <div className="flex flex-col bg-gray-50 min-h-full pb-20">
      
      {/* Hero Visual Layer */}
      <div className="relative h-64 w-full bg-black rounded-b-3xl overflow-hidden shadow-lg">
        {/* Background Image */}
        <img 
          src="/hero_bg.png" 
          alt="Tea Plantation Background" 
          className="absolute inset-0 w-full h-full object-cover opacity-80"
        />
        
        {/* Gradient Overlay for Text Readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/80" />

        {/* Top Header Row (Inside Hero) */}
        <div className="absolute top-0 left-0 w-full p-4 flex justify-between items-center text-white z-10">
          <div className="flex items-center gap-2">
            <img src="/logo.png" alt="Logo" className="h-6 w-auto brightness-0 invert" />
            <span className="font-bold tracking-wide">Uzhavan AI</span>
          </div>
          <span className="text-xs font-bold bg-white/20 px-2 py-1 rounded-md backdrop-blur-sm">IN</span>
        </div>

        {/* Hero Content */}
        <div className="absolute bottom-4 left-4 right-4 z-10 flex justify-between items-end">
          <div>
            <h2 className="text-white/90 text-sm font-medium flex items-center gap-1 mb-1">
              Your Farming Companion <Leaf size={14} className="text-brand" />
            </h2>
            <h3 className="text-2xl font-bold text-white">Vanakkam, {firstName} 👋</h3>
          </div>
          
          <div className="text-right">
            <div className="flex items-center gap-1 text-white text-xl font-bold">
              32°C <CloudSun size={24} className="text-yellow-300" />
            </div>
            <p className="text-white/80 text-xs">Chennai</p>
          </div>
        </div>
      </div>

      {/* Main Feature Grid */}
      <div className="p-4 mt-2">
        <div className="grid grid-cols-2 gap-4">
          <ActionCard 
            icon={<Mic size={32} className="text-brand" />}
            label={t('ask_uzhavan') || 'Ask Uzhavan'}
            onClick={() => navigate('/ask')}
            primary
          />
          <ActionCard 
            icon={<Camera size={32} className="text-brand" />}
            label={t('check_disease') || 'Disease Scanner'}
            onClick={() => navigate('/disease')}
          />
          <ActionCard 
            icon={<Leaf size={32} className="text-brand" />}
            label={t('my_crop') || 'Crop Advice'}
            onClick={() => navigate('/recommendation')}
          />
          <ActionCard 
            icon={<TrendingUp size={32} className="text-brand" />}
            label={t('market_price') || 'Market Insights'}
            onClick={() => navigate('/market')}
          />
          <ActionCard 
            icon={<CloudSun size={32} className="text-brand" />}
            label={'Weather'}
            onClick={() => navigate('/weather')}
          />
          <ActionCard 
            icon={<ShieldCheck size={32} className="text-brand" />}
            label={t('schemes') || 'Kisan Helpline'}
            onClick={() => navigate('/support')}
          />
        </div>

        {/* Mini alerts section */}
        <div className="mt-6 bg-brand-light/30 border border-brand/20 rounded-2xl p-4 shadow-sm">
          <div className="flex items-start gap-3">
            <div className="text-2xl mt-1">⚠️</div>
            <div>
              <h4 className="font-bold text-brand-dark text-sm">Rain Expected Tomorrow</h4>
              <p className="text-xs text-gray-600 mt-1">Please protect harvested crops and avoid spraying fertilizers today.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const ActionCard = ({ icon, label, onClick, primary = false }: { icon: React.ReactNode, label: string, onClick: () => void, primary?: boolean }) => {
  return (
    <div 
      onClick={onClick}
      className={`relative bg-white rounded-3xl p-5 flex flex-col items-center justify-center text-center gap-3 cursor-pointer transition-all active:scale-95 shadow-soft hover:shadow-md border border-gray-100 overflow-hidden group ${primary ? 'ring-2 ring-brand ring-offset-1' : ''}`}
    >
      {primary && <div className="absolute inset-0 bg-brand/5 group-hover:bg-brand/10 transition-colors" />}
      <div className="p-3 bg-brand-light/50 rounded-2xl text-brand group-hover:scale-110 transition-transform">
        {icon}
      </div>
      <span className="font-bold text-gray-800 text-sm leading-tight z-10">{label}</span>
    </div>
  );
};

export default Home;
