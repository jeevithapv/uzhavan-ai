import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, Navigate, useLocation } from 'react-router-dom';
import { Home, Mic, Leaf, ShoppingCart, User } from 'lucide-react';
import { useTranslation } from 'react-i18next';

// Pages
import HomePageComponent from './pages/Home';
import AskComponent from './pages/Ask';
import MarketComponent from './pages/Market';
import ProfilePage from './pages/Profile';
import LoginPage from './pages/Login';
import RegisterPage from './pages/Register';
import WeatherPage from './pages/Weather';
import RecommendationPage from './pages/Recommendation';
import DiseasePage from './pages/Disease';
import SupportPage from './pages/Support';

// Protected Route Wrapper
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const user = localStorage.getItem('uzhavan_user');
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  return <>{children}</>;
};

const Layout = ({ children }: { children: React.ReactNode }) => {
  const { t, i18n } = useTranslation();
  const location = useLocation();

  // Don't show layout elements on auth pages
  const isAuthPage = location.pathname === '/login' || location.pathname === '/register';

  if (isAuthPage) {
    return <div className="h-screen bg-ui-background max-w-md mx-auto shadow-2xl overflow-hidden">{children}</div>;
  }

  return (
    <div className="flex flex-col h-screen bg-ui-background max-w-md mx-auto shadow-2xl relative overflow-hidden">
      {/* Header */}
      <header className="p-4 flex justify-between items-center bg-white shadow-sm z-10">
        <h1 className="text-xl font-bold text-brand-dark flex items-center gap-2">
          <img src="/logo.png" alt="Uzhavan AI Logo" className="h-8 w-auto object-contain" />
          {t('app_name')}
        </h1>
        <div className="flex items-center">
           <select 
             value={i18n.language}
             onChange={(e) => {
               i18n.changeLanguage(e.target.value);
               localStorage.setItem('uzhavan_lang', e.target.value);
             }}
             className="bg-gray-100 text-sm font-bold text-gray-700 rounded-lg px-2 py-1 outline-none focus:ring-2 focus:ring-brand"
           >
             <option value="en">EN</option>
             <option value="ta">தமிழ்</option>
             <option value="hi">हिंदी</option>
             <option value="te">తెలుగు</option>
             <option value="kn">ಕನ್ನಡ</option>
             <option value="ml">മലയാളം</option>
             <option value="mr">मराठी</option>
             <option value="bn">বাংলা</option>
           </select>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto pb-24 no-scrollbar">
        {children}
      </main>

      {/* Bottom Navigation */}
      <nav className="absolute bottom-0 w-full bg-white border-t border-gray-100 pb-safe z-20">
        <div className="flex justify-around items-center h-20 px-2 pb-2">
          <NavLink to="/" icon={<Home size={28} />} label={t('home') || 'Home'} />
          <NavLink to="/ask" icon={<Mic size={28} />} label={t('ask') || 'Ask AI'} highlight />
          <NavLink to="/market" icon={<ShoppingCart size={28} />} label={'Market'} />
          <NavLink to="/profile" icon={<User size={28} />} label={'Profile'} />
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
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          
          <Route path="/" element={<ProtectedRoute><HomePageComponent /></ProtectedRoute>} />
          <Route path="/ask" element={<ProtectedRoute><AskComponent /></ProtectedRoute>} />
          <Route path="/market" element={<ProtectedRoute><MarketComponent /></ProtectedRoute>} />
          <Route path="/profile" element={<ProtectedRoute><ProfilePage /></ProtectedRoute>} />
          <Route path="/weather" element={<ProtectedRoute><WeatherPage /></ProtectedRoute>} />
          <Route path="/recommendation" element={<ProtectedRoute><RecommendationPage /></ProtectedRoute>} />
          <Route path="/disease" element={<ProtectedRoute><DiseasePage /></ProtectedRoute>} />
          <Route path="/support" element={<ProtectedRoute><SupportPage /></ProtectedRoute>} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
