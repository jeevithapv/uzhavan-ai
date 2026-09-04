import React from 'react';
import { useTranslation } from 'react-i18next';
import { Mic, Leaf, Camera, CloudSun, TrendingUp, ShoppingBag, ShieldCheck } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <div className="p-4 space-y-6">
      {/* Top Section - Welcome & Weather */}
      <div className="flex justify-between items-start">
        <div>
          <h2 className="text-sm text-ui-muted">{t('subtitle')}</h2>
          <h3 className="text-xl font-bold text-brand-dark mt-1">Vanakkam, Ravi 👋</h3>
        </div>
        <div className="flex gap-2">
          <div className="flex flex-col items-end">
            <span className="text-sm font-bold flex items-center gap-1">
              32°C <CloudSun size={16} className="text-accent" />
            </span>
            <span className="text-xs text-ui-muted">Chennai</span>
          </div>
        </div>
      </div>

      {/* Main Actions Grid */}
      <div className="grid grid-cols-2 gap-4">
        <ActionCard 
          icon={<Mic size={40} className="text-brand" />}
          label={t('ask_uzhavan')}
          onClick={() => navigate('/ask')}
          primary
        />
        <ActionCard 
          icon={<Camera size={40} className="text-orange-500" />}
          label={t('check_disease')}
          onClick={() => console.log('Go to disease check')}
        />
        <ActionCard 
          icon={<Leaf size={40} className="text-green-600" />}
          label={t('my_crop')}
          onClick={() => navigate('/crops')}
        />
        <ActionCard 
          icon={<TrendingUp size={40} className="text-blue-500" />}
          label={t('market_price')}
          onClick={() => console.log('Go to market')}
        />
        <ActionCard 
          icon={<ShoppingBag size={40} className="text-purple-500" />}
          label={t('sell_crop')}
          onClick={() => navigate('/bazzar')}
        />
        <ActionCard 
          icon={<ShieldCheck size={40} className="text-teal-500" />}
          label={t('schemes')}
          onClick={() => console.log('Go to schemes')}
        />
      </div>

      {/* Mini alerts section */}
      <div className="card bg-brand-light/50 border-brand/20">
        <div className="flex items-start gap-3">
          <div className="text-2xl mt-1">⚠️</div>
          <div>
            <h4 className="font-bold text-brand-dark text-sm">Rain Expected Tomorrow</h4>
            <p className="text-xs text-ui-muted mt-1">Please protect harvested crops and avoid spraying fertilizers today.</p>
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
      className={`action-card ${primary ? 'ring-2 ring-brand ring-offset-2' : ''}`}
    >
      <div className="p-3 bg-gray-50 rounded-full">
        {icon}
      </div>
      <span className="font-bold text-brand-dark text-sm leading-tight">{label}</span>
    </div>
  );
};

export default Home;
