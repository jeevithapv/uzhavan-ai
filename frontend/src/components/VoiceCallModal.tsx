import { useState, useEffect, useRef } from 'react';
import { Phone, PhoneOff, UserCircle } from 'lucide-react';
import { useTranslation } from 'react-i18next';

interface VoiceCallModalProps {
  isOpen: boolean;
  onClose: () => void;
  advisoryType: 'weather' | 'support';
}

export default function VoiceCallModal({ isOpen, onClose, advisoryType }: VoiceCallModalProps) {
  const { i18n } = useTranslation();
  const [callState, setCallState] = useState<'ringing' | 'connected' | 'ended'>('ringing');
  const [timer, setTimer] = useState(0);
  const synth = window.speechSynthesis;
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const getAdvisoryText = (lang: string, type: 'weather' | 'support') => {
    // Determine text based on language and type
    const langCode = lang.split('-')[0];
    if (type === 'weather') {
      if (langCode === 'ta') return 'வணக்கம், நாளை உங்கள் பகுதியில் கனமழை பெய்ய வாய்ப்புள்ளது. பூச்சிக்கொல்லி தெளிப்பதை தவிர்க்கவும்.';
      if (langCode === 'hi') return 'नमस्ते, कल आपके क्षेत्र में भारी बारिश की संभावना है। कृपया कीटनाशकों का छिड़काव करने से बचें।';
      if (langCode === 'te') return 'నమస్కారం, రేపు మీ ప్రాంతంలో భారీ వర్షం పడే అవకాశం ఉంది. దయచేసి పురుగుల మందులు చల్లకండి.';
      // Default to english
      return 'Hello, heavy rain is expected in your area tomorrow. Please avoid spraying pesticides and protect your harvested crops.';
    } else {
      if (langCode === 'ta') return 'உழவன் கிசான் மையத்திற்கு உங்களை வரவேற்கிறோம். எங்கள் நிபுணர் விரைவில் இணைவார்.';
      if (langCode === 'hi') return 'उज़हावन किसान केंद्र में आपका स्वागत है। हमारे विशेषज्ञ जल्द ही जुड़ेंगे।';
      // Default
      return 'Welcome to Uzhavan Kisan Center. An expert will join you shortly.';
    }
  };

  const getVoice = (lang: string) => {
    const voices = synth.getVoices();
    // Try to find a voice that matches the language
    const langPrefix = lang.split('-')[0];
    const match = voices.find(v => v.lang.startsWith(langPrefix));
    return match || voices.find(v => v.lang.startsWith('en')) || voices[0];
  };

  const handleAnswer = () => {
    setCallState('connected');
    
    // Start speaking
    const text = getAdvisoryText(i18n.language, advisoryType);
    const utterance = new SpeechSynthesisUtterance(text);
    const voice = getVoice(i18n.language);
    if (voice) utterance.voice = voice;
    utterance.rate = 0.9;
    
    utterance.onend = () => {
      setTimeout(handleEndCall, 1000);
    };
    
    synth.speak(utterance);

    // Start timer
    timerRef.current = setInterval(() => {
      setTimer(t => t + 1);
    }, 1000);
  };

  const handleEndCall = () => {
    synth.cancel();
    setCallState('ended');
    if (timerRef.current) clearInterval(timerRef.current);
    setTimeout(() => {
      setCallState('ringing');
      setTimer(0);
      onClose();
    }, 1000);
  };

  // Pre-load voices
  useEffect(() => {
    synth.getVoices();
  }, []);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-900/95 z-50 flex flex-col items-center justify-between py-16 px-6 backdrop-blur-md">
      {/* Top Section */}
      <div className="flex flex-col items-center mt-10">
        <div className="w-32 h-32 bg-gray-800 rounded-full flex items-center justify-center shadow-lg border-4 border-gray-700 mb-6">
          <UserCircle size={80} className="text-gray-400" />
        </div>
        <h2 className="text-3xl font-bold text-white mb-2 tracking-wide">Uzhavan AI</h2>
        <p className="text-lg text-gray-400">
          {callState === 'ringing' && 'Incoming Voice Advisory...'}
          {callState === 'connected' && `Connected • 00:${timer.toString().padStart(2, '0')}`}
          {callState === 'ended' && 'Call Ended'}
        </p>
      </div>

      {/* Middle Section - Waveform (only when connected) */}
      <div className="flex-1 flex items-center justify-center w-full">
        {callState === 'connected' && (
          <div className="flex gap-2 h-24 items-end justify-center w-full max-w-xs">
            {[...Array(6)].map((_, i) => (
              <div 
                key={i}
                className="w-4 bg-brand rounded-full animate-bounce"
                style={{ 
                  height: `${Math.max(20, Math.random() * 100)}%`,
                  animationDelay: `${i * 0.1}s`,
                  animationDuration: '0.8s'
                }}
              />
            ))}
          </div>
        )}
      </div>

      {/* Bottom Actions */}
      <div className="flex w-full justify-around items-center max-w-xs mb-10">
        <button 
          onClick={handleEndCall}
          className="w-20 h-20 bg-red-500 rounded-full flex items-center justify-center text-white shadow-lg active:scale-95 transition-transform"
          aria-label="Decline"
        >
          <PhoneOff size={32} />
        </button>

        {callState === 'ringing' && (
          <button 
            onClick={handleAnswer}
            className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center text-white shadow-lg active:scale-95 transition-transform animate-pulse"
            aria-label="Answer"
          >
            <Phone size={32} />
          </button>
        )}
      </div>
    </div>
  );
}
