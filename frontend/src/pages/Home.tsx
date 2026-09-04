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
      <div className="relative w-full aspect-video bg-black rounded-b-3xl overflow-hidden shadow-lg border-b border-gray-200">
        {/* Background Image containing the brand text */}
        <img 
          src="/hero_bg.jpg" 
          alt="Uzhavan AI Hero Banner" 
          className="absolute inset-0 w-full h-full object-cover"
        />
        
        {/* Subtle gradient for transition to the white area */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
      </div>

      {/* Main Feature Grid */}
      <div className="p-4 md:p-8 mt-2">
        <h3 className="text-xl md:text-2xl font-bold text-gray-800 mb-4 px-1 md:mb-6">Vanakkam, {firstName} 👋</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
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
