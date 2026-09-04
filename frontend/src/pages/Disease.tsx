import { useState, useRef } from 'react';
import { ArrowLeft, Scan, AlertTriangle, ShieldCheck } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function Disease() {
  const navigate = useNavigate();
  const [isScanning, setIsScanning] = useState(false);
  const [result, setResult] = useState<any>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);

  const startScan = async () => {
    setIsScanning(true);
    setResult(null);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } });
      if (videoRef.current) videoRef.current.srcObject = stream;
      streamRef.current = stream;
    } catch (err) {
      console.error(err);
      setTimeout(mockResult, 1500); // Fallback mock
    }
  };

  const stopCamera = () => {
    if (streamRef.current) streamRef.current.getTracks().forEach(t => t.stop());
  };

  const mockResult = () => {
    stopCamera();
    setIsScanning(false);
    setResult({
      name: "Early Blight (Tomato)",
      confidence: "92%",
      organic: "Neem oil extract spray (5ml/L water)",
      chemical: "Mancozeb 75% WP (2g/L water)"
    });
  };

  return (
    <div className="flex flex-col min-h-full bg-ui-background pb-20">
      <div className="bg-white px-4 py-4 flex items-center shadow-sm sticky top-0 z-10">
        <button onClick={() => { stopCamera(); navigate(-1); }} className="mr-4 p-2 hover:bg-gray-100 rounded-full">
          <ArrowLeft size={24} />
        </button>
        <h1 className="font-bold text-lg text-gray-800">Disease Scanner</h1>
      </div>

      <div className="p-4 space-y-4">
        {!isScanning && !result && (
          <div className="bg-white rounded-3xl p-8 shadow-soft text-center border border-gray-100 mt-10">
            <div className="w-24 h-24 bg-brand-light rounded-full flex items-center justify-center mx-auto mb-6">
              <Scan size={48} className="text-brand" />
            </div>
            <h2 className="text-xl font-bold mb-2">Scan Affected Leaf</h2>
            <p className="text-gray-500 mb-8">Point your camera at the sick plant to identify diseases instantly.</p>
            <button onClick={startScan} className="btn-primary w-full">Open Camera</button>
          </div>
        )}

        {isScanning && (
          <div className="relative rounded-3xl overflow-hidden bg-black h-[60vh] flex flex-col">
            <video ref={videoRef} autoPlay playsInline className="w-full h-full object-cover" />
            <div className="absolute inset-0 border-4 border-dashed border-white m-8 rounded-3xl animate-pulse" />
            <button onClick={mockResult} className="absolute bottom-8 left-1/2 -translate-x-1/2 w-16 h-16 bg-white rounded-full border-4 border-gray-300 active:scale-95 z-10 shadow-lg" />
            <div className="absolute top-4 left-0 w-full text-center text-white font-bold bg-black/50 py-2">
              Position leaf within frame & tap button
            </div>
          </div>
        )}

        {result && (
          <div className="bg-white rounded-3xl p-6 shadow-soft border border-gray-100">
            <div className="flex items-center gap-3 mb-6 text-red-500 bg-red-50 p-4 rounded-2xl">
              <AlertTriangle size={32} />
              <div>
                <h2 className="font-bold text-xl">{result.name}</h2>
                <p className="text-sm font-medium">Confidence: {result.confidence}</p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="p-4 bg-green-50 rounded-2xl border border-green-100">
                <h3 className="font-bold text-green-800 flex items-center gap-2 mb-2">
                  <ShieldCheck size={18} /> Organic Remedy
                </h3>
                <p className="text-green-700">{result.organic}</p>
              </div>
              
              <div className="p-4 bg-orange-50 rounded-2xl border border-orange-100">
                <h3 className="font-bold text-orange-800 flex items-center gap-2 mb-2">
                  <AlertTriangle size={18} /> Chemical Treatment
                </h3>
                <p className="text-orange-700">{result.chemical}</p>
              </div>
            </div>
            <button onClick={() => setResult(null)} className="btn-secondary w-full mt-6">Scan Another</button>
          </div>
        )}
      </div>
    </div>
  );
}
