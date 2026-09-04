import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { Home, Mic, Leaf, ShoppingCart, User } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import HomePageComponent from './pages/Home';
import AskComponent from './pages/Ask';
import BazzarComponent from './pages/Bazzar';

// Placeholder Pages
const CropsPage = () => <div className="p-4 text-center">My Crops Coming Soon</div>;
const ProfilePage = () => <div className="p-4 text-center">Profile Coming Soon</div>;

const Layout = ({ children }: { children: React.ReactNode }) => {
  const { t, i18n } = useTranslation();

  const toggleLanguage = () => {
    i18n.changeLanguage(i18n.language === 'en' ? 'ta' : 'en');
  };

  return (
    <div className="flex flex-col h-screen bg-ui-background max-w-md mx-auto shadow-2xl relative overflow-hidden">
      {/* Header */}
      <header className="p-4 flex justify-between items-center bg-white shadow-sm z-10">
        <h1 className="text-xl font-bold text-brand-dark flex items-center gap-2">
          <span className="text-2xl">🌾</span> {t('app_name')}
        </h1>
        <button 
          onClick={toggleLanguage}
          className="text-2xl hover:scale-110 transition-transform active:scale-95"
          aria-label="Toggle Language"
        >
          {i18n.language === 'en' ? '🇮🇳' : 'A'}
        </button>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto pb-24 no-scrollbar">
        {children}
      </main>

      {/* Bottom Navigation */}
      <nav className="absolute bottom-0 w-full bg-white border-t border-gray-100 pb-safe z-20">
        <div className="flex justify-around items-center h-20 px-2 pb-2">
          <NavLink to="/" icon={<Home size={28} />} label={t('home')} />
          <NavLink to="/ask" icon={<Mic size={28} />} label={t('ask')} highlight />
          <NavLink to="/crops" icon={<Leaf size={28} />} label={t('crops')} />
          <NavLink to="/bazzar" icon={<ShoppingCart size={28} />} label={t('bazzar')} />
          <NavLink to="/profile" icon={<User size={28} />} label={t('profile')} />
        </div>
      </nav>
    </div>
  );
};

const NavLink = ({ to, icon, label, highlight = false }: { to: string, icon: React.ReactNode, label: string, highlight?: boolean }) => {
  return (
    <Link to={to} className="flex flex-col items-center justify-center gap-1 w-16">
      <div className={`p-2 rounded-2xl transition-colors ${highlight ? 'bg-brand text-white shadow-soft shadow-brand/30' : 'text-ui-muted hover:text-brand-dark hover:bg-brand-light'}`}>
        {icon}
      </div>
      <span className={`text-[10px] font-medium ${highlight ? 'text-brand font-bold' : 'text-ui-muted'}`}>
        {label}
      </span>
    </Link>
  );
};

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<HomePageComponent />} />
          <Route path="/ask" element={<AskComponent />} />
          <Route path="/crops" element={<CropsPage />} />
          <Route path="/bazzar" element={<BazzarComponent />} />
          <Route path="/profile" element={<ProfilePage />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
