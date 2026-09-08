import React, { useEffect, useState } from 'react';

export const LoadingScreen: React.FC = () => {
  const [visible, setVisible] = useState(true);
  const [fading, setFading] = useState(false);

  useEffect(() => {
    // Elegant quick entrance loader
    const timer = setTimeout(() => {
      setFading(true);
      const removeTimer = setTimeout(() => {
        setVisible(false);
      }, 700);
      return () => clearTimeout(removeTimer);
    }, 1100);

    return () => clearTimeout(timer);
  }, []);

  if (!visible) return null;

  return (
    <div
      id="app-loader"
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#090A0C] text-[#EDE6D8] transition-opacity duration-700 ${
        fading ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      <div className="flex flex-col items-center space-y-6">
        {/* Emblem */}
        <div className="w-14 h-14 rounded-full border border-[#C5A059]/50 flex items-center justify-center bg-[#121316]">
          <span className="font-serif text-[#C5A059] text-2xl font-bold">M</span>
        </div>

        {/* Brand Name */}
        <div className="text-center space-y-2">
          <h1 className="font-serif text-2xl sm:text-3xl tracking-[0.3em] font-bold text-[#EDE6D8]">
            MAISON EMBER
          </h1>
          <p className="text-[11px] font-sans uppercase tracking-[0.4em] text-[#C5A059]">
            Fine Dining &bull; City Center
          </p>
        </div>

        {/* Minimal Animated Golden Line */}
        <div className="w-48 h-[2px] bg-[#1E2024] relative overflow-hidden rounded-full">
          <div className="absolute inset-y-0 left-0 bg-gradient-to-r from-transparent via-[#C5A059] to-transparent w-24 animate-[slide_1.4s_ease-in-out_infinite]" />
        </div>
      </div>
    </div>
  );
};
