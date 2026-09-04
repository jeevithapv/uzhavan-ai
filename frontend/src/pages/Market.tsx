import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { PlusCircle, Search } from 'lucide-react';

const Market = () => {
  const { t } = useTranslation();
  const [tab, setTab] = useState<'buy' | 'sell'>('buy');

  const mockListings = [
    { id: 1, crop: 'Tomato', variety: 'Hybrid Nattu', qty: '500 kg', price: '₹28/kg', farmer: 'Ravi', location: 'Chennai', img: 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=400&q=80' },
    { id: 2, crop: 'Onion', variety: 'Bellary', qty: '1000 kg', price: '₹40/kg', farmer: 'Senthil', location: 'Madurai', img: 'https://images.unsplash.com/photo-1621506289937-a8e4df240d0b?w=400&q=80' },
  ];

  return (
    <div className="p-4 flex flex-col h-full bg-gray-50">
      
      {/* Tabs */}
      <div className="flex bg-white rounded-full p-1 shadow-sm mb-6">
        <button 
          onClick={() => setTab('buy')}
          className={`flex-1 py-3 text-center rounded-full font-bold transition-all ${tab === 'buy' ? 'bg-brand text-white shadow-md' : 'text-gray-500'}`}
        >
          {t('home')} / Buy
        </button>
        <button 
          onClick={() => setTab('sell')}
          className={`flex-1 py-3 text-center rounded-full font-bold transition-all ${tab === 'sell' ? 'bg-accent text-white shadow-md' : 'text-gray-500'}`}
        >
          {t('sell_crop')}
        </button>
      </div>

      {tab === 'buy' && (
        <div className="space-y-4">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
            <input 
              type="text" 
              placeholder="Search crops or locations..." 
              className="w-full pl-12 pr-4 py-4 rounded-2xl border-none shadow-soft outline-none focus:ring-2 focus:ring-brand"
            />
          </div>

          <div className="grid gap-4 mt-6">
            {mockListings.map(listing => (
              <div key={listing.id} className="bg-white p-4 rounded-3xl shadow-soft flex gap-4 items-center">
                <img src={listing.img} alt={listing.crop} className="w-24 h-24 rounded-2xl object-cover" />
                <div className="flex-1">
                  <h4 className="font-bold text-brand-dark text-lg">{listing.crop}</h4>
                  <p className="text-sm text-gray-500">{listing.variety} • {listing.location}</p>
                  <div className="flex justify-between items-end mt-2">
                    <span className="font-bold text-accent text-xl">{listing.price}</span>
                    <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded text-xs font-bold">{listing.qty}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {tab === 'sell' && (
        <div className="flex flex-col items-center justify-center h-full pt-10">
          <div className="w-32 h-32 bg-accent/20 text-accent rounded-full flex items-center justify-center mb-6">
            <PlusCircle size={64} />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">List your crop</h2>
          <p className="text-center text-gray-500 mb-8 max-w-[250px]">
            Take a photo of your harvest and connect with buyers directly.
          </p>
          <button className="btn-primary w-full max-w-xs bg-accent hover:bg-yellow-600">
            Start Listing
          </button>
        </div>
      )}

    </div>
  );
};

export default Market;
