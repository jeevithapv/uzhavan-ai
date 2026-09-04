import { useState, useMemo } from 'react';
import { ArrowLeft, CloudRain, Sun, Thermometer, Droplets, Wind, Cloud, CloudLightning, Info } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import VoiceCallModal from '../components/VoiceCallModal';
import { useTranslation } from 'react-i18next';

// Generate 30 days of deterministic mock weather data
const generateMonthlyForecast = () => {
  const data = [];
  const today = new Date();
  
  for (let i = 0; i < 30; i++) {
    const date = new Date(today);
    date.setDate(today.getDate() + i);
    
    // Create a deterministic but varied pattern
    const isRainyPhase = (i >= 5 && i <= 8) || (i >= 22 && i <= 24);
    const isHotPhase = i >= 12 && i <= 18;
    
    let tempMax, tempMin, pop, rainMm, humidity, wind, icon;
    
    if (isRainyPhase) {
      tempMax = 28 + (i % 3);
      tempMin = 23;
      pop = 70 + (i % 20); // 70-90%
      rainMm = 15 + (i % 10);
      humidity = 85;
      wind = 15 + (i % 5);
      icon = pop > 85 ? 'storm' : 'rain';
    } else if (isHotPhase) {
      tempMax = 35 + (i % 4);
      tempMin = 26;
      pop = i % 10;
      rainMm = 0;
      humidity = 40 + (i % 10);
      wind = 8 + (i % 4);
      icon = 'sun';
    } else {
      tempMax = 31 + (i % 3);
      tempMin = 24;
      pop = 20 + (i % 15);
      rainMm = i % 3;
      humidity = 60 + (i % 15);
      wind = 10 + (i % 5);
      icon = pop > 30 ? 'cloud' : 'sun-cloud';
    }
    
    data.push({
      dayIndex: i,
      date,
      tempMax,
      tempMin,
      pop,
      rainMm,
      humidity,
      wind,
      icon,
    });
  }
  return data;
};

export default function Weather() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const user = JSON.parse(localStorage.getItem('uzhavan_user') || '{}');
  const cropType = user.cropType || 'crops';
  
  const [isCallOpen, setIsCallOpen] = useState(false);
  const [timeRange, setTimeRange] = useState<'today' | '7-day' | '30-day'>('30-day');
  
  const forecast = useMemo(() => generateMonthlyForecast(), []);
  
  // Calculate specific advisories for the month
  const advisories = useMemo(() => {
    const alerts = [];
    
    // Find phases
    const heavyRainDays = forecast.filter(d => d.pop > 70 && d.rainMm > 15);
    const hotDays = forecast.filter(d => d.tempMax >= 36);
    const idealSprayDays = forecast.filter(d => d.pop < 20 && d.wind < 12).slice(0, 3);
    
    if (heavyRainDays.length > 0) {
      const firstRain = heavyRainDays[0];
      alerts.push({
        type: 'warning',
        title: 'Heavy Rain Warning',
        date: firstRain.date,
        msg: `High rainfall (${firstRain.rainMm}mm) expected on ${firstRain.date.toLocaleDateString()}. Pause irrigation 2 days prior and ensure field drainage for ${cropType}.`
      });
    }
    
    if (hotDays.length > 0) {
      const firstHot = hotDays[0];
      alerts.push({
        type: 'alert',
        title: 'High Heat Stress',
        date: firstHot.date,
        msg: `Temperatures reaching ${firstHot.tempMax}°C starting ${firstHot.date.toLocaleDateString()}. Deep watering recommended to protect ${cropType}.`
      });
    }
    
    if (idealSprayDays.length > 0) {
      const firstSpray = idealSprayDays[0];
      alerts.push({
        type: 'success',
        title: 'Optimal Spray Window',
        date: firstSpray.date,
        msg: `Clear skies and low wind on ${firstSpray.date.toLocaleDateString()}. Ideal time for fertilizer or pesticide application.`
      });
    }
    
    return alerts;
  }, [forecast, cropType]);

  const displayedForecast = forecast.slice(0, timeRange === 'today' ? 1 : timeRange === '7-day' ? 7 : 30);
  
  const renderIcon = (type: string, className = "w-6 h-6") => {
    switch (type) {
      case 'sun': return <Sun className={`${className} text-yellow-500`} />;
      case 'sun-cloud': return <Cloud className={`${className} text-blue-300`} />;
      case 'cloud': return <Cloud className={`${className} text-gray-400`} />;
      case 'rain': return <CloudRain className={`${className} text-blue-500`} />;
      case 'storm': return <CloudLightning className={`${className} text-indigo-600`} />;
      default: return <Sun className={`${className} text-yellow-500`} />;
    }
  };

  // Generate dynamic Voice Summary text
  const voiceSummaryContext = `Based on the 30-day forecast, you have a dry window this week which is perfect for spraying. However, please be alert as heavy rainfall is expected next week around ${forecast[5].date.toLocaleDateString()}. Ensure proper drainage for your ${cropType}.`;

  return (
    <div className="flex flex-col min-h-full bg-ui-background pb-20 relative">
      <div className="bg-brand text-white px-4 py-4 flex items-center shadow-md sticky top-0 z-30">
        <button onClick={() => navigate(-1)} className="mr-4 p-2 hover:bg-brand-dark rounded-full transition-colors">
          <ArrowLeft size={24} />
        </button>
        <h1 className="font-bold text-lg">{t('weather') || 'Weather Forecast'}</h1>
      </div>

      <div className="p-4 md:p-8">
        
        <div className="md:grid md:grid-cols-2 md:gap-8">
          
          {/* Left Column (Desktop) */}
          <div className="flex flex-col">
            {/* Tabs */}
            <div className="flex bg-white rounded-xl p-1 mb-4 shadow-sm border border-gray-100">
              {(['today', '7-day', '30-day'] as const).map(tab => (
                <button
                  key={tab}
                  onClick={() => setTimeRange(tab)}
                  className={`flex-1 py-2 text-sm font-bold rounded-lg capitalize transition-colors ${
                    timeRange === tab ? 'bg-brand text-white shadow' : 'text-gray-500 hover:text-brand'
                  }`}
                >
                  {tab.replace('-', ' ')}
                </button>
              ))}
            </div>

            {/* Action Button */}
            <button 
              onClick={() => setIsCallOpen(true)}
              className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-emerald-500 to-brand text-white font-bold py-3 px-4 rounded-2xl shadow-lg hover:opacity-90 transition-opacity mb-6"
            >
              📞 Request AI Voice Advisory Call
            </button>

            {/* Phase-wise Alerts */}
            <div className="space-y-3 mb-6 md:mb-0">
              <h3 className="font-bold text-gray-800 px-1 text-sm uppercase tracking-wider">Agronomic Advisories</h3>
              {advisories.map((adv, idx) => (
                <div key={idx} className={`p-4 rounded-2xl border-l-4 shadow-sm bg-white ${
                  adv.type === 'warning' ? 'border-l-blue-500' : 
                  adv.type === 'alert' ? 'border-l-orange-500' : 'border-l-green-500'
                }`}>
                  <div className="flex items-center gap-2 mb-1">
                    <Info size={16} className={
                      adv.type === 'warning' ? 'text-blue-500' : 
                      adv.type === 'alert' ? 'text-orange-500' : 'text-green-500'
                    } />
                    <h4 className="font-bold text-gray-800 text-sm">{adv.title}</h4>
                  </div>
                  <p className="text-xs text-gray-600 leading-relaxed">{adv.msg}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column (Desktop) Forecast Timeline */}
          <div className="bg-white rounded-3xl p-2 shadow-soft border border-gray-100 mb-4 h-fit max-h-[70vh] overflow-y-auto no-scrollbar">
            <div className="space-y-1">
              {displayedForecast.map((day, idx) => (
                <div key={idx} className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-2xl transition-colors border-b border-gray-50 last:border-0">
                  <div className="w-16">
                    <p className="text-xs font-bold text-gray-800">
                      {day.dayIndex === 0 ? 'Today' : day.date.toLocaleDateString('en-US', { weekday: 'short' })}
                    </p>
                    <p className="text-[10px] text-gray-400">{day.date.getDate()} {day.date.toLocaleDateString('en-US', { month: 'short' })}</p>
                  </div>
                  
                  <div className="flex-1 flex justify-center">
                    {renderIcon(day.icon, "w-8 h-8")}
                  </div>
                  
                  <div className="w-24 flex items-center justify-between">
                    <span className="font-bold text-gray-800">{day.tempMax}°</span>
                    <span className="text-sm font-medium text-gray-400">{day.tempMin}°</span>
                  </div>
                  
                  <div className="w-12 text-right">
                    <div className="flex items-center justify-end gap-1 text-[10px] font-bold text-blue-500">
                      <CloudRain size={10} /> {day.pop}%
                    </div>
                    <div className="text-[9px] text-gray-400">{day.rainMm > 0 ? `${day.rainMm}mm` : '-'}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
      
      <VoiceCallModal 
        isOpen={isCallOpen} 
        onClose={() => setIsCallOpen(false)} 
        advisoryType="weather"
        dynamicSummary={voiceSummaryContext}
      />
    </div>
  );
}
