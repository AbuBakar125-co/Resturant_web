import React, { useEffect } from 'react';
import { GalleryItem } from '../types';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

interface LightboxProps {
  items: GalleryItem[];
  currentIndex: number | null;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}

export const Lightbox: React.FC<LightboxProps> = ({
  items,
  currentIndex,
  onClose,
  onPrev,
  onNext,
}) => {
  useEffect(() => {
    if (currentIndex === null) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') onPrev();
      if (e.key === 'ArrowRight') onNext();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentIndex, onClose, onPrev, onNext]);

  if (currentIndex === null || !items[currentIndex]) return null;
  const currentItem = items[currentIndex];

  return (
    <div
      id="lightbox-backdrop"
      className="anim-overlay-in fixed inset-0 z-50 bg-black/95 backdrop-blur-xl flex flex-col justify-between p-4 sm:p-8"
    >
      {/* Top Bar */}
      <div className="flex items-center justify-between z-10">
        <div className="flex items-center gap-3">
          <span className="font-serif text-sm tracking-[0.2em] uppercase text-[#C5A059]">
            Maison Ember Gallery
          </span>
          <span className="text-xs text-[#8F887C]">
            ({currentIndex + 1} / {items.length})
          </span>
        </div>
        <button
          id="close-lightbox-btn"
          onClick={onClose}
          className="p-2.5 rounded-full bg-[#181A1F] text-[#B8B0A2] hover:text-[#EDE6D8] hover:bg-[#25282F] transition-colors cursor-pointer"
          aria-label="Close Lightbox"
        >
          <X className="w-6 h-6" />
        </button>
      </div>

      {/* Main Image Stage */}
      <div className="relative flex-1 flex items-center justify-center max-h-[78vh] my-auto">
        {/* Prev Button */}
        <button
          id="lightbox-prev-btn"
          onClick={onPrev}
          className="absolute left-2 sm:left-4 z-20 p-3 rounded-full bg-black/60 text-[#EDE6D8] hover:text-[#C5A059] hover:bg-black/90 transition-all border border-[#2D3138] cursor-pointer"
          aria-label="Previous image"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>

        {/* Image Display */}
        <div
          key={currentIndex}
          className="anim-lightbox-in relative max-h-full max-w-5xl overflow-hidden rounded-xl border border-[#23272E] shadow-2xl bg-[#0F1012]"
        >
          <img
            src={currentItem.image}
            alt={currentItem.title}
            className="max-h-[70vh] w-auto object-contain mx-auto transition-transform duration-500 hover:scale-105"
            loading="eager"
          />
        </div>

        {/* Next Button */}
        <button
          id="lightbox-next-btn"
          onClick={onNext}
          className="absolute right-2 sm:right-4 z-20 p-3 rounded-full bg-black/60 text-[#EDE6D8] hover:text-[#C5A059] hover:bg-black/90 transition-all border border-[#2D3138] cursor-pointer"
          aria-label="Next image"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>

      {/* Caption & Metadata Footer */}
      <div className="max-w-2xl mx-auto text-center space-y-1.5 z-10 pt-2">
        <h4 className="font-serif text-lg sm:text-xl font-bold text-[#EDE6D8]">
          {currentItem.title}
        </h4>
        <p className="text-xs sm:text-sm text-[#B8B0A2] leading-relaxed">
          {currentItem.caption}
        </p>
      </div>
    </div>
  );
};
