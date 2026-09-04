import React, { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { Mic, Volume2, RotateCcw } from 'lucide-react';

// Polyfill for SpeechRecognition
const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

const Ask = () => {
  const { t, i18n } = useTranslation();
  const [status, setStatus] = useState<'idle' | 'listening' | 'thinking' | 'answered'>('idle');
  const [transcript, setTranscript] = useState('');
  const [answer, setAnswer] = useState('');
  
  const recognitionRef = useRef<any>(null);

  useEffect(() => {
    if (SpeechRecognition) {
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = true;
      
      recognitionRef.current.onresult = (event: any) => {
        let currentTranscript = '';
        for (let i = event.resultIndex; i < event.results.length; ++i) {
          if (event.results[i].isFinal) {
            currentTranscript += event.results[i][0].transcript;
            handleSendToAI(currentTranscript);
          } else {
            currentTranscript += event.results[i][0].transcript;
            setTranscript(currentTranscript);
          }
        }
      };

      recognitionRef.current.onend = () => {
        if (status === 'listening') {
          // If it ends without final result, just reset
          // setStatus('idle');
        }
      };
      
      recognitionRef.current.onerror = (event: any) => {
        console.error("Speech recognition error", event.error);
        setStatus('idle');
      };
    }
  }, []);

  const startListening = () => {
    if (recognitionRef.current) {
      setTranscript('');
      setAnswer('');
      setStatus('listening');
      // Set language based on i18n
      recognitionRef.current.lang = i18n.language === 'ta' ? 'ta-IN' : 'en-US';
      recognitionRef.current.start();
    } else {
      alert("Voice input is not supported in this browser.");
    }
  };

  const handleSendToAI = async (text: string) => {
    setStatus('thinking');
    setTranscript(text);
    try {
      const baseUrl = import.meta.env.VITE_API_BASE_URL || 'http://127.0.0.1:8000';
      const response = await fetch(`${baseUrl}/api/ai/ask`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question: text, language: i18n.language })
      });
      const data = await response.json();
      setAnswer(data.answer);
      setStatus('answered');
      speakAnswer(data.answer);
    } catch (error) {
      console.error(error);
      setAnswer("Sorry, I couldn't reach the server.");
      setStatus('answered');
    }
  };

  const speakAnswer = (text: string) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = i18n.language === 'ta' ? 'ta-IN' : 'en-US';
      window.speechSynthesis.speak(utterance);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center p-6 min-h-full h-[80vh]">
      
      {/* Status Text above mic */}
      <div className="mb-10 text-center h-16 flex flex-col justify-end">
        {status === 'idle' && (
          <h2 className="text-xl font-bold text-brand-dark animate-pulse">{t('tap_and_speak')}</h2>
        )}
        {status === 'listening' && (
          <h2 className="text-xl font-bold text-blue-600 animate-pulse">{t('listening')}</h2>
        )}
        {status === 'thinking' && (
          <h2 className="text-xl font-bold text-orange-500 animate-pulse">{t('thinking')}</h2>
        )}
      </div>

      {/* Big Mic Button */}
      <button 
        onClick={startListening}
        disabled={status === 'listening' || status === 'thinking'}
        className={`w-40 h-40 rounded-full flex items-center justify-center shadow-soft transition-all
          ${status === 'listening' ? 'bg-blue-100 scale-110 shadow-blue-300 ring-4 ring-blue-500' : 
            status === 'thinking' ? 'bg-orange-100 opacity-80' : 
            'bg-brand text-white hover:bg-brand-dark active:scale-95'}`}
      >
        <Mic size={80} className={status === 'listening' ? 'text-blue-600' : status === 'thinking' ? 'text-orange-500' : 'text-white'} />
      </button>

      {/* Helper text */}
      {status === 'idle' && (
        <p className="mt-8 text-ui-muted text-center">{t('ask_anything')}</p>
      )}

      {/* Transcript and Answer */}
      {(transcript || answer) && (
        <div className="mt-12 w-full max-w-md bg-white rounded-3xl p-6 shadow-soft border border-gray-100 relative">
          {transcript && (
            <div className="mb-4">
              <span className="text-xs text-ui-muted uppercase font-bold tracking-wider">You said:</span>
              <p className="text-sm font-medium text-gray-800 mt-1 italic">"{transcript}"</p>
            </div>
          )}
          
          {answer && (
            <div>
              <span className="text-xs text-brand uppercase font-bold tracking-wider">Uzhavan AI:</span>
              <p className="text-lg font-bold text-brand-dark mt-2 leading-relaxed">{answer}</p>
              
              <div className="flex justify-end gap-3 mt-6 pt-4 border-t border-gray-100">
                <button onClick={() => speakAnswer(answer)} className="p-3 bg-brand-light text-brand-dark rounded-full hover:bg-brand-dark hover:text-white transition-colors">
                  <Volume2 size={24} />
                </button>
                <button onClick={startListening} className="p-3 bg-brand text-white rounded-full hover:bg-brand-dark transition-colors">
                  <RotateCcw size={24} />
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Ask;
