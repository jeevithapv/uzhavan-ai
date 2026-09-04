import React, { useState, useRef, useEffect } from 'react';
import { Camera, X, Upload, Zap, Loader2, CheckCircle2 } from 'lucide-react';

export type ScanMode = 'detect_crop' | 'detect_soil' | 'measure_land';

interface ScanHubProps {
  isOpen: boolean;
  onClose: () => void;
  mode: ScanMode;
  onResult: (result: string) => void;
}

export default function ScanHub({ isOpen, onClose, mode, onResult }: ScanHubProps) {
  const [phase, setPhase] = useState<'idle' | 'scanning' | 'processing' | 'result'>('idle');
  const [resultData, setResultData] = useState<{ value: string; confidence: number } | null>(null);
  
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const streamRef = useRef<MediaStream | null>(null);

  // Reset phase when opened
  useEffect(() => {
    if (isOpen) {
      setPhase('idle');
      setResultData(null);
    } else {
      stopCamera();
    }
  }, [isOpen]);

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } });
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
      setPhase('scanning');
    } catch (err) {
      console.error("Error accessing camera:", err);
      // Fallback for devices without camera access
      startMockProcess();
    }
  };

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
  };

  const handleSnap = () => {
    if (videoRef.current && canvasRef.current) {
      const context = canvasRef.current.getContext('2d');
      if (context) {
        canvasRef.current.width = videoRef.current.videoWidth;
        canvasRef.current.height = videoRef.current.videoHeight;
        context.drawImage(videoRef.current, 0, 0);
      }
    }
    stopCamera();
    startMockProcess();
  };

  const startMockProcess = () => {
    setPhase('processing');
    
    // Simulate AI processing delay
    setTimeout(() => {
      let mockValue = '';
      let mockConfidence = 0;

      if (mode === 'detect_crop') {
        const crops = ['Paddy', 'Sugarcane', 'Cotton', 'Banana'];
        mockValue = crops[Math.floor(Math.random() * crops.length)];
        mockConfidence = 92 + Math.floor(Math.random() * 7); // 92-98%
      } else if (mode === 'detect_soil') {
        const soils = ['Red Loamy', 'Black Clay', 'Alluvial'];
        mockValue = soils[Math.floor(Math.random() * soils.length)];
        mockConfidence = 88 + Math.floor(Math.random() * 10); // 88-97%
      } else if (mode === 'measure_land') {
        // Generate a reasonable acreage
        const acres = (Math.random() * 5 + 1).toFixed(1);
        mockValue = acres; 
        mockConfidence = 85 + Math.floor(Math.random() * 10);
      }

      setResultData({ value: mockValue, confidence: mockConfidence });
      setPhase('result');
    }, 2500);
  };

  const handleApply = () => {
    if (resultData) {
      onResult(resultData.value);
    }
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl w-full max-w-md overflow-hidden shadow-2xl relative flex flex-col">
        
        {/* Header */}
        <div className="flex justify-between items-center p-4 border-b border-gray-100">
          <h2 className="font-bold text-gray-800 flex items-center gap-2">
            <Zap size={20} className="text-brand" /> 
            {mode === 'detect_crop' ? 'Scan Crop' : mode === 'detect_soil' ? 'Scan Soil' : 'Measure Land'}
          </h2>
          <button onClick={onClose} className="p-2 bg-gray-100 rounded-full hover:bg-gray-200">
            <X size={20} className="text-gray-600" />
          </button>
        </div>

        {/* Content Area */}
        <div className="flex-1 flex flex-col relative min-h-[400px] bg-gray-50">
          
          {phase === 'idle' && (
            <div className="flex flex-col items-center justify-center h-full p-8 text-center">
              <div className="w-24 h-24 bg-brand/10 rounded-full flex items-center justify-center mb-6">
                <Camera size={40} className="text-brand" />
              </div>
              <h3 className="font-bold text-xl text-gray-800 mb-2">AI Vision Scanner</h3>
              <p className="text-gray-500 text-sm mb-8">
                Position your camera clearly over the {mode === 'detect_crop' ? 'crop leaves' : mode === 'detect_soil' ? 'soil surface' : 'field boundaries'} to allow AI analysis.
              </p>
              
              <div className="w-full space-y-3">
                <button 
                  onClick={startCamera}
                  className="w-full bg-brand text-white font-bold py-4 rounded-xl shadow-lg hover:bg-brand-dark transition-colors flex items-center justify-center gap-2"
                >
                  <Camera size={20} /> Open Camera
                </button>
                <button 
                  onClick={startMockProcess}
                  className="w-full bg-white text-gray-700 font-bold py-4 rounded-xl shadow-sm border border-gray-200 hover:bg-gray-50 transition-colors flex items-center justify-center gap-2"
                >
                  <Upload size={20} /> Upload from Gallery
                </button>
              </div>
            </div>
          )}

          {phase === 'scanning' && (
            <div className="relative w-full h-full flex flex-col bg-black">
              <video 
                ref={videoRef} 
                autoPlay 
                playsInline 
                className="w-full h-full object-cover opacity-90"
              />
              <canvas ref={canvasRef} className="hidden" />
              
              {/* Viewfinder Overlay */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="w-64 h-64 border-4 border-brand/80 rounded-3xl relative">
                  <div className="absolute top-0 left-0 w-8 h-8 border-t-4 border-l-4 border-white rounded-tl-3xl -mt-1 -ml-1"></div>
                  <div className="absolute top-0 right-0 w-8 h-8 border-t-4 border-r-4 border-white rounded-tr-3xl -mt-1 -mr-1"></div>
                  <div className="absolute bottom-0 left-0 w-8 h-8 border-b-4 border-l-4 border-white rounded-bl-3xl -mb-1 -ml-1"></div>
                  <div className="absolute bottom-0 right-0 w-8 h-8 border-b-4 border-r-4 border-white rounded-br-3xl -mb-1 -mr-1"></div>
                </div>
              </div>

              {/* Shutter Button */}
              <div className="absolute bottom-8 left-0 right-0 flex justify-center pb-safe">
                <button 
                  onClick={handleSnap}
                  className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center border-4 border-white backdrop-blur-sm active:scale-95 transition-transform"
                >
                  <div className="w-16 h-16 bg-white rounded-full shadow-lg"></div>
                </button>
              </div>
            </div>
          )}

          {phase === 'processing' && (
            <div className="flex flex-col items-center justify-center h-full p-8 text-center relative overflow-hidden">
              {/* Optional: Show captured canvas faintly in bg */}
              <div className="absolute inset-0 opacity-10 bg-black"></div>
              
              <Loader2 size={64} className="text-brand animate-spin mb-6 relative z-10" />
              <h3 className="font-bold text-xl text-gray-800 mb-2 relative z-10">AI is Analyzing</h3>
              <p className="text-gray-500 font-medium relative z-10">
                {mode === 'detect_crop' ? 'Identifying leaf structures...' : 
                 mode === 'detect_soil' ? 'Determining soil texture...' : 
                 'Calculating field perimeter...'}
              </p>
            </div>
          )}

          {phase === 'result' && resultData && (
            <div className="flex flex-col items-center justify-center h-full p-8 text-center bg-emerald-50">
              <div className="w-24 h-24 bg-emerald-500 rounded-full flex items-center justify-center mb-6 shadow-xl shadow-emerald-500/30">
                <CheckCircle2 size={48} className="text-white" />
              </div>
              
              <p className="text-sm font-bold text-emerald-600 uppercase tracking-widest mb-1">Detection Complete</p>
              
              <h3 className="text-4xl font-black text-gray-900 mb-2">
                {resultData.value} {mode === 'measure_land' ? 'Acres' : ''}
              </h3>
              
              <div className="bg-white px-4 py-2 rounded-full shadow-sm border border-emerald-100 flex items-center gap-2 mb-8">
                <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
                <span className="text-sm font-bold text-gray-700">{resultData.confidence}% Confidence</span>
              </div>
              
              <div className="w-full space-y-3 mt-auto">
                <button 
                  onClick={handleApply}
                  className="w-full bg-brand text-white font-bold py-4 rounded-xl shadow-lg hover:bg-brand-dark transition-colors"
                >
                  Apply & Save
                </button>
                <button 
                  onClick={() => setPhase('idle')}
                  className="w-full bg-white text-gray-600 font-bold py-3 rounded-xl border border-gray-200 hover:bg-gray-50 transition-colors"
                >
                  Re-Scan
                </button>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
