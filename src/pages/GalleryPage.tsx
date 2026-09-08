import React, { useState, useMemo } from 'react';
import { PageRoute, GalleryItem } from '../types';
import { GALLERY_ITEMS } from '../data/restaurantData';
import { Lightbox } from '../components/Lightbox';
import { useTheme } from '../context/ThemeContext';
import { Maximize2, Sparkles, Camera } from 'lucide-react';

interface GalleryPageProps {
  onNavigate: (page: PageRoute) => void;
  onOpenReservation: () => void;
}

type GalleryCategory = 'all' | 'culinary' | 'interior' | 'chef' | 'experience';

export const GalleryPage: React.FC<GalleryPageProps> = ({ onOpenReservation }) => {
  const { isDark } = useTheme();
  const goldAccent = isDark ? '#C5A059' : '#A67C00';

  const [activeCategory, setActiveCategory] = useState<GalleryCategory>('all');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const categories: { id: GalleryCategory; label: string }[] = [
    { id: 'all', label: 'All Photographs' },
    { id: 'interior', label: 'Architecture & Ambiance' },
    { id: 'culinary', label: 'Artisanal Plates' },
    { id: 'chef', label: 'Kitchen & Chef' },
    { id: 'experience', label: 'Cellar & Sommelier' },
  ];

  const filteredItems = useMemo(() => {
    if (activeCategory === 'all') return GALLERY_ITEMS;
    return GALLERY_ITEMS.filter((item) => item.category === activeCategory);
  }, [activeCategory]);

  return (
    <div
      className={`pt-24 transition-colors duration-400 ${
        isDark ? 'bg-[#0C0D0E] text-[#EDE6D8]' : 'bg-[#FAF8F3] text-[#171717]'
      }`}
    >
      {/* 1. HERO SECTION */}
      <section
        className={`relative py-20 sm:py-28 overflow-hidden border-b transition-colors duration-400 ${
          isDark ? 'border-[#1C1F25]' : 'border-[#E2D9CA]'
        }`}
      >
        <div className="absolute inset-0 z-0 opacity-20">
          <img
            src="https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?q=80&w=2000&auto=format&fit=crop"
            alt="Maison Ember Ambiance"
            className="img-kenburns w-full h-full object-cover"
          />
          <div
            className={`absolute inset-0 ${
              isDark
                ? 'bg-gradient-to-t from-[#0C0D0E] via-[#0C0D0E]/80 to-black/70'
                : 'bg-gradient-to-t from-[#FAF8F3] via-[#FAF8F3]/85 to-white/70'
            }`}
          />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4" data-reveal-group>
          <div
            data-reveal="up"
            className={`inline-flex items-center gap-2 px-3.5 py-1 rounded-full border backdrop-blur-md ${
              isDark
                ? 'border-[#C5A059]/40 bg-[#16181D]/80 text-[#C5A059]'
                : 'border-[#A67C00]/40 bg-white/80 text-[#A67C00] shadow-sm'
            }`}
          >
            <Camera className="w-3.5 h-3.5" style={{ color: goldAccent }} />
            <span className="text-xs uppercase tracking-[0.25em] font-medium">
              Atmosphere &amp; Artistry
            </span>
          </div>

          <h1
            data-reveal="up"
            className={`font-serif text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight ${
              isDark ? 'text-[#EDE6D8]' : 'text-[#171717]'
            }`}
          >
            Visual Chronicle
          </h1>

          <p
            data-reveal="up"
            className="font-serif italic text-xl sm:text-2xl max-w-2xl mx-auto"
            style={{ color: goldAccent }}
          >
            &ldquo;Every plate, candle, and vintage has a story.&rdquo;
          </p>

          <p
            data-reveal="fade"
            className={`text-sm sm:text-base max-w-xl mx-auto leading-relaxed font-light ${
              isDark ? 'text-[#B8B0A2]' : 'text-[#57534E]'
            }`}
          >
            Glimpses into our dining salon, hearthside kitchen pass, sommelier reserve, and delicate culinary compositions.
          </p>
        </div>
      </section>

      {/* 2. FILTER TABS */}
      <section
        className={`sticky top-16 z-30 backdrop-blur-md border-b py-4 transition-all ${
          isDark
            ? 'bg-[#0C0D0E]/95 border-[#1F2228]'
            : 'bg-[#FAF8F3]/95 border-[#E2D9CA]'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-center gap-2 overflow-x-auto pb-1">
          {categories.map((cat) => {
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                id={`gallery-filter-${cat.id}`}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-4 py-2 rounded-full text-xs uppercase tracking-wider font-sans font-medium transition-all cursor-pointer whitespace-nowrap ${
                  isActive
                    ? isDark
                      ? 'bg-[#C5A059] text-[#0C0D0E] font-bold'
                      : 'bg-[#A67C00] text-white font-bold'
                    : isDark
                    ? 'bg-[#131518] text-[#B8B0A2] hover:text-[#EDE6D8] hover:bg-[#1A1C20] border border-[#23272F]'
                    : 'bg-white text-[#78716C] hover:text-[#171717] hover:bg-[#F4EFE6] border border-[#E2D9CA]'
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>
      </section>

      {/* 3. MASONRY / GRID PHOTO GALLERY */}
      <section className="py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6" data-reveal-group>
            {filteredItems.map((item, index) => {
              const spanClass =
                item.aspectRatio === 'wide'
                  ? 'sm:col-span-2'
                  : item.aspectRatio === 'tall'
                  ? 'row-span-2'
                  : '';

              return (
                <div
                  key={item.id}
                  id={`gallery-item-${item.id}`}
                  onClick={() => setLightboxIndex(index)}
                  data-reveal="scale"
                  className={`group relative overflow-hidden rounded-2xl border cursor-pointer transition-all duration-500 hover:shadow-2xl ${spanClass} min-h-[300px] ${
                    isDark
                      ? 'bg-[#121417] border-[#22252C] hover:border-[#C5A059]/60 hover:shadow-[#C5A059]/10'
                      : 'bg-white border-[#E2D9CA] hover:border-[#A67C00]/60 shadow-stone-200/60'
                  }`}
                >
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                  />

                  {/* Dark Vignette Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-between p-6">
                    {/* Top corner icon */}
                    <div className="self-end p-2 rounded-full bg-black/60 backdrop-blur-md text-white border border-white/20">
                      <Maximize2 className="w-4 h-4" />
                    </div>

                    {/* Bottom caption text */}
                    <div className="space-y-1 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                      <span
                        className="text-[10px] uppercase tracking-[0.25em] font-medium block"
                        style={{ color: goldAccent }}
                      >
                        {item.category}
                      </span>
                      <h3 className="font-serif text-xl font-bold text-white">
                        {item.title}
                      </h3>
                      <p className="text-xs text-stone-300 line-clamp-2">
                        {item.caption}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Bottom Prompt */}
          <div className="mt-20 text-center space-y-4" data-reveal="up">
            <p className={`text-xs uppercase tracking-[0.2em] ${isDark ? 'text-[#8F887C]' : 'text-[#78716C]'}`}>
              Share your moments with us on Instagram &bull; #MaisonEmber
            </p>
            <button
              id="gallery-reserve-btn"
              onClick={onOpenReservation}
              className={`px-8 py-3.5 rounded-full text-xs font-semibold uppercase tracking-[0.2em] transition-all cursor-pointer ${
                isDark
                  ? 'bg-[#C5A059] hover:bg-[#DFBF77] text-[#0C0D0E]'
                  : 'bg-[#A67C00] hover:bg-[#B8860B] text-white'
              }`}
            >
              Reserve Your Table
            </button>
          </div>
        </div>
      </section>

      {/* Lightbox Modal */}
      <Lightbox
        items={filteredItems}
        currentIndex={lightboxIndex}
        onClose={() => setLightboxIndex(null)}
        onPrev={() =>
          setLightboxIndex((prev) =>
            prev !== null ? (prev - 1 + filteredItems.length) % filteredItems.length : 0
          )
        }
        onNext={() =>
          setLightboxIndex((prev) =>
            prev !== null ? (prev + 1) % filteredItems.length : 0
          )
        }
      />
    </div>
  );
};
