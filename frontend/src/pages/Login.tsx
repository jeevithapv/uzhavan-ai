import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { LogIn } from 'lucide-react';

export default function Login() {
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!identifier || !password) {
      setError('Please enter both email/phone and password.');
      return;
    }
    
    // For demo purposes, any login sets a default user if they haven't registered
    const existingUser = localStorage.getItem('uzhavan_user');
    if (!existingUser) {
       localStorage.setItem('uzhavan_user', JSON.stringify({
          fullName: 'Demo Farmer',
          phone: identifier,
          location: 'Chennai, Tamil Nadu',
          cropType: 'Paddy',
          landArea: '5 Acres',
          soilType: 'Alluvial',
          registeredDate: new Date().toLocaleDateString()
       }));
    }
    
    navigate('/');
  };

  return (
    <div className="flex flex-col items-center justify-center h-full p-6 bg-ui-background">
      <div className="w-full max-w-sm card bg-white p-8 rounded-3xl shadow-soft">
        <div className="flex flex-col items-center mb-8 text-center">
          <img src="/logo.png" alt="Uzhavan AI Logo" className="h-16 w-auto object-contain mb-4" />
          <p className="text-xs font-semibold text-brand mb-4 px-2 tracking-wide leading-tight">
            உழவன் AI — One voice-first AI companion and one direct marketplace
          </p>
          <h2 className="text-2xl font-bold text-brand-dark">Welcome Back</h2>
          <p className="text-ui-muted mt-2">Login to your Uzhavan AI account</p>
        </div>

        {error && <div className="mb-4 p-3 bg-red-100 text-red-600 rounded-xl text-sm text-center">{error}</div>}

        <form onSubmit={handleLogin} className="flex flex-col gap-4">
          <div>
            <label className="block text-sm font-semibold text-ui-text mb-1">Phone Number / Email</label>
            <input 
              type="text" 
              className="w-full p-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand focus:border-transparent"
              placeholder="Enter phone or email"
              value={identifier}
              onChange={(e) => setIdentifier(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-ui-text mb-1">Password</label>
            <input 
              type="password" 
              className="w-full p-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand focus:border-transparent"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          
          <button type="submit" className="btn-primary mt-4 w-full">
            Login
          </button>
        </form>

        <div className="mt-6 text-center text-sm text-ui-muted">
          Don't have an account? <Link to="/register" className="text-brand font-bold hover:underline">Register Here</Link>
        </div>
      </div>
    </div>
  );
}
