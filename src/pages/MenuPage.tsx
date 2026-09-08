import React, { useState, useMemo } from 'react';
import { PageRoute, MenuItem } from '../types';
import { FULL_MENU } from '../data/restaurantData';
import { useTheme } from '../context/ThemeContext';
import { PageHero } from '../components/PageHero';
import {
  Search,
  Flame,
  Leaf,
  Sparkles,
  Wine,
  Calendar,
  Utensils,
  Check,
  Info
} from 'lucide-react';

interface MenuPageProps {
  onNavigate: (page: PageRoute) => void;
  onOpenReservation: () => void;
}

type MenuCategory = 'all' | 'starters' | 'mains' | 'pasta' | 'seafood' | 'desserts' | 'beverages';

export const MenuPage: React.FC<MenuPageProps> = ({ onNavigate, onOpenReservation }) => {
  const { isDark } = useTheme();
  const goldAccent = isDark ? '#C5A059' : '#A67C00';

  const [selectedCategory, setSelectedCategory] = useState<MenuCategory>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [dietaryFilter, setDietaryFilter] = useState<'all' | 'vegetarian' | 'spicy' | 'special'>('all');
  const [savedItems, setSavedItems] = useState<string[]>([]);

  const categories: { id: MenuCategory; label: string }[] = [
    { id: 'all', label: 'Complete Collection' },
    { id: 'starters', label: 'Starters' },
    { id: 'mains', label: 'Main Courses' },
    { id: 'pasta', label: 'Artisan Pasta' },
    { id: 'seafood', label: 'Seafood' },
    { id: 'desserts', label: 'Desserts' },
    { id: 'beverages', label: 'Cellar & Bar' },
  ];

  const filteredMenu = useMemo(() => {
    return FULL_MENU.filter((item) => {
      // Category check
      if (selectedCategory !== 'all' && item.category !== selectedCategory) {
        return false;
      }
      // Dietary filter check
      if (dietaryFilter === 'vegetarian' && !item.isVegetarian) return false;
      if (dietaryFilter === 'spicy' && !item.isSpicy) return false;
      if (dietaryFilter === 'special' && !item.isChefSpecial) return false;

      // Search query check
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        return (
          item.name.toLowerCase().includes(q) ||
          item.description.toLowerCase().includes(q) ||
          (item.pairing && item.pairing.toLowerCase().includes(q))
        );
      }
      return true;
    });
  }, [selectedCategory, dietaryFilter, searchQuery]);

  const toggleSaveItem = (id: string) => {
    setSavedItems((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  return (
    <div
      className={`transition-colors duration-400 ${
        isDark ? 'bg-[#0C0D0E] text-[#EDE6D8]' : 'bg-[#FAF8F3] text-[#171717]'
      }`}
    >
      {/* 1. HERO SECTION */}
      <PageHero
        image="https://images.unsplash.com/photo-1611270629569-8b357cb88da9?q=80&w=2000&auto=format&fit=crop"
        imageAlt="Overhead view of house truffle tagliolini, elegantly plated with shaved black truffle"
        badgeIcon={<Utensils className="w-3.5 h-3.5" />}
        badgeLabel="Seasonal Carte Du Jour"
        title="The Tasting & À La Carte Menu"
        quote="Timeless flavors, thoughtfully reimagined."
        description="Each dish is seasoned with elements of wood smoke, garden herbs, and old-world cellar pairings. Sourced from regenerative regional purveyors."
        breadcrumbLabel="Menu"
        onNavigate={onNavigate}
      />

      {/* 2. FILTER CONTROLS & SEARCH */}
      <section
        className={`sticky top-16 z-30 backdrop-blur-md border-b py-4 transition-all ${
          isDark
            ? 'bg-[#0C0D0E]/95 border-[#1F2228]'
            : 'bg-[#FAF8F3]/95 border-[#E2D9CA]'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          {/* Top Row: Search and Dietary filters */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            {/* Search Input */}
            <div className="relative w-full sm:w-80">
              <Search
                className={`w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 ${
                  isDark ? 'text-[#8F887C]' : 'text-[#78716C]'
                }`}
              />
              <input
                id="menu-search-input"
                type="text"
                placeholder="Search dishes, ingredients, pairings..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={`w-full rounded-full pl-9 pr-4 py-2 text-xs transition-colors focus:outline-none ${
                  isDark
                    ? 'bg-[#131518] border border-[#262A32] text-[#EDE6D8] placeholder-[#666] focus:border-[#C5A059]'
                    : 'bg-white border border-[#D5CCBE] text-[#171717] placeholder-[#888] focus:border-[#A67C00] shadow-sm'
                }`}
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className={`absolute right-3 top-1/2 -translate-y-1/2 text-xs cursor-pointer ${
                    isDark ? 'text-[#8F887C] hover:text-[#EDE6D8]' : 'text-[#78716C] hover:text-[#171717]'
                  }`}
                >
                  Clear
                </button>
              )}
            </div>

            {/* Dietary Tags */}
            <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0">
              <button
                onClick={() => setDietaryFilter('all')}
                className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all cursor-pointer whitespace-nowrap ${
                  dietaryFilter === 'all'
                    ? isDark
                      ? 'bg-[#EDE6D8] text-[#0C0D0E]'
                      : 'bg-[#171717] text-[#FAF8F3]'
                    : isDark
                    ? 'bg-[#15171B] text-[#8F887C] hover:text-[#EDE6D8]'
                    : 'bg-white text-[#78716C] hover:text-[#171717] border border-[#E2D9CA]'
                }`}
              >
                All Diets
              </button>
              <button
                onClick={() => setDietaryFilter('vegetarian')}
                className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all flex items-center gap-1.5 cursor-pointer whitespace-nowrap ${
                  dietaryFilter === 'vegetarian'
                    ? isDark
                      ? 'bg-[#2E4A28] text-[#A2E696] border border-[#48843E]'
                      : 'bg-[#EBF5E9] text-[#2E6822] border border-[#A1D197]'
                    : isDark
                    ? 'bg-[#15171B] text-[#8F887C] hover:text-[#EDE6D8]'
                    : 'bg-white text-[#78716C] hover:text-[#171717] border border-[#E2D9CA]'
                }`}
              >
                <Leaf className="w-3.5 h-3.5" />
                <span>Vegetarian</span>
              </button>
              <button
                onClick={() => setDietaryFilter('spicy')}
                className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all flex items-center gap-1.5 cursor-pointer whitespace-nowrap ${
                  dietaryFilter === 'spicy'
                    ? isDark
                      ? 'bg-[#502424] text-[#FFA8A8] border border-[#8C3A3A]'
                      : 'bg-[#FBEAEA] text-[#9E2A2B] border border-[#E9A1A1]'
                    : isDark
                    ? 'bg-[#15171B] text-[#8F887C] hover:text-[#EDE6D8]'
                    : 'bg-white text-[#78716C] hover:text-[#171717] border border-[#E2D9CA]'
                }`}
              >
                <Flame className="w-3.5 h-3.5" />
                <span>Spicy</span>
              </button>
              <button
                onClick={() => setDietaryFilter('special')}
                className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all flex items-center gap-1.5 cursor-pointer whitespace-nowrap ${
                  dietaryFilter === 'special'
                    ? isDark
                      ? 'bg-[#3A321E] text-[#FFDC82] border border-[#C5A059]'
                      : 'bg-[#FCF6E9] text-[#8A6300] border border-[#D8BE76]'
                    : isDark
                    ? 'bg-[#15171B] text-[#8F887C] hover:text-[#EDE6D8]'
                    : 'bg-white text-[#78716C] hover:text-[#171717] border border-[#E2D9CA]'
                }`}
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Chef&apos;s Special</span>
              </button>
            </div>
          </div>

          {/* Category Tabs */}
          <div
            className={`flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none border-t pt-3 ${
              isDark ? 'border-[#1C1F25]' : 'border-[#E2D9CA]'
            }`}
          >
            {categories.map((cat) => {
              const isActive = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  id={`cat-tab-${cat.id}`}
                  onClick={() => setSelectedCategory(cat.id)}
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
        </div>
      </section>

      {/* 3. MENU ITEMS DISPLAY */}
      <section className="py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {filteredMenu.length === 0 ? (
            <div className="text-center py-24 space-y-4">
              <Utensils
                className={`w-12 h-12 mx-auto ${isDark ? 'text-[#8F887C]' : 'text-[#78716C]'}`}
              />
              <h3
                className={`font-serif text-2xl font-bold ${
                  isDark ? 'text-[#EDE6D8]' : 'text-[#171717]'
                }`}
              >
                No dishes found
              </h3>
              <p
                className={`text-xs max-w-sm mx-auto ${
                  isDark ? 'text-[#8F887C]' : 'text-[#78716C]'
                }`}
              >
                No menu selections match your search or filter criteria. Try clearing filters.
              </p>
              <button
                onClick={() => {
                  setSelectedCategory('all');
                  setSearchQuery('');
                  setDietaryFilter('all');
                }}
                className={`px-5 py-2 rounded-full text-xs font-semibold uppercase tracking-wider cursor-pointer ${
                  isDark
                    ? 'bg-[#C5A059] text-[#0C0D0E]'
                    : 'bg-[#A67C00] text-white'
                }`}
              >
                Reset Menu Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10" data-reveal-group>
              {filteredMenu.map((item) => {
                const isSaved = savedItems.includes(item.id);
                return (
                  <div
                    key={item.id}
                    id={`dish-${item.id}`}
                    data-reveal="up"
                    className={`group flex flex-col sm:flex-row gap-5 p-5 rounded-2xl border transition-all duration-300 hover:shadow-xl ${
                      isDark
                        ? 'bg-[#121417] border-[#22252C] hover:border-[#C5A059]/50 hover:shadow-black/40'
                        : 'bg-white border-[#E2D9CA] hover:border-[#A67C00]/50 shadow-stone-200/60'
                    }`}
                  >
                    {/* Dish Photo */}
                    <div className="relative w-full sm:w-40 h-44 sm:h-auto rounded-xl overflow-hidden shrink-0 bg-black">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        loading="lazy"
                      />
                      {item.isFeatured && (
                        <div
                          className="absolute top-2 left-2 px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider"
                          style={{
                            backgroundColor: goldAccent,
                            color: isDark ? '#0C0D0E' : '#FFFFFF',
                          }}
                        >
                          Signature
                        </div>
                      )}
                    </div>

                    {/* Dish Content */}
                    <div className="flex-1 flex flex-col justify-between space-y-2">
                      <div>
                        {/* Header & Price */}
                        <div
                          className={`flex items-start justify-between gap-4 border-b pb-2 ${
                            isDark ? 'border-[#1F2228]' : 'border-[#E8E2D6]'
                          }`}
                        >
                          <div className="flex items-center gap-2 flex-wrap">
                            <h3
                              className={`font-serif text-lg sm:text-xl font-bold transition-colors ${
                                isDark
                                  ? 'text-[#EDE6D8] group-hover:text-[#C5A059]'
                                  : 'text-[#171717] group-hover:text-[#A67C00]'
                              }`}
                            >
                              {item.name}
                            </h3>
                            {/* Badges */}
                            {item.isVegetarian && (
                              <span
                                className={`p-1 rounded-full ${
                                  isDark ? 'bg-[#2E4A28]/40 text-[#8AE079]' : 'bg-[#EBF5E9] text-[#2E6822]'
                                }`}
                                title="Vegetarian"
                              >
                                <Leaf className="w-3.5 h-3.5" />
                              </span>
                            )}
                            {item.isSpicy && (
                              <span
                                className={`p-1 rounded-full ${
                                  isDark ? 'bg-[#502424]/40 text-[#FFA0A0]' : 'bg-[#FBEAEA] text-[#9E2A2B]'
                                }`}
                                title="Spicy"
                              >
                                <Flame className="w-3.5 h-3.5" />
                              </span>
                            )}
                            {item.isChefSpecial && (
                              <span
                                className={`p-1 rounded-full ${
                                  isDark ? 'bg-[#3A321E]/60 text-[#FFD777]' : 'bg-[#FCF6E9] text-[#8A6300]'
                                }`}
                                title="Chef's Special"
                              >
                                <Sparkles className="w-3.5 h-3.5" />
                              </span>
                            )}
                          </div>
                          <span
                            className="font-serif text-lg sm:text-xl font-bold whitespace-nowrap"
                            style={{ color: goldAccent }}
                          >
                            {item.price}
                          </span>
                        </div>

                        {/* Description */}
                        <p
                          className={`text-xs leading-relaxed mt-2 ${
                            isDark ? 'text-[#8F887C]' : 'text-[#78716C]'
                          }`}
                        >
                          {item.description}
                        </p>
                      </div>

                      {/* Wine Pairing & Save Action */}
                      <div className="pt-2 flex items-center justify-between gap-3 text-xs">
                        {item.pairing ? (
                          <div
                            className="flex items-center gap-1.5 text-[11px] italic truncate"
                            style={{ color: goldAccent }}
                          >
                            <Wine className="w-3.5 h-3.5 shrink-0" style={{ color: goldAccent }} />
                            <span className="truncate">{item.pairing}</span>
                          </div>
                        ) : (
                          <span
                            className={`text-[11px] capitalize ${
                              isDark ? 'text-[#666]' : 'text-[#888]'
                            }`}
                          >
                            {item.category}
                          </span>
                        )}

                        <button
                          onClick={() => toggleSaveItem(item.id)}
                          className={`p-1.5 rounded-lg border transition-colors cursor-pointer flex items-center gap-1.5 text-[11px] shrink-0 ${
                            isSaved
                              ? isDark
                                ? 'bg-[#C5A059]/20 border-[#C5A059] text-[#C5A059]'
                                : 'bg-[#A67C00]/15 border-[#A67C00] text-[#A67C00]'
                              : isDark
                              ? 'bg-[#181A1F] border-[#2A2E36] text-[#8F887C] hover:text-[#EDE6D8]'
                              : 'bg-[#F4EFE6] border-[#D5CCBE] text-[#78716C] hover:text-[#171717]'
                          }`}
                          title="Save to tasting wishlist"
                        >
                          {isSaved ? (
                            <>
                              <Check className="w-3 h-3" />
                              <span>Saved</span>
                            </>
                          ) : (
                            <span>Wishlist</span>
                          )}
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* Tasting Wishlist Drawer Notice if items saved */}
          {savedItems.length > 0 && (
            <div
              className={`fixed bottom-6 left-1/2 -translate-x-1/2 z-40 rounded-full px-6 py-3 shadow-2xl backdrop-blur-md flex items-center gap-4 text-xs border ${
                isDark
                  ? 'bg-[#14161B]/95 border-[#C5A059] text-[#EDE6D8]'
                  : 'bg-white/95 border-[#A67C00] text-[#171717]'
              }`}
            >
              <span>
                <strong>{savedItems.length}</strong> dish{savedItems.length > 1 ? 'es' : ''} saved in your tasting wishlist
              </span>
              <button
                onClick={onOpenReservation}
                className={`px-4 py-1.5 rounded-full font-bold uppercase tracking-wider text-[11px] cursor-pointer ${
                  isDark
                    ? 'bg-[#C5A059] hover:bg-[#DFBF77] text-[#0C0D0E]'
                    : 'bg-[#A67C00] hover:bg-[#B8860B] text-white'
                }`}
              >
                Reserve Table Now
              </button>
            </div>
          )}

          {/* Sommelier & Tasting Menu Note */}
          <div
            data-reveal-group
            className={`mt-20 p-8 sm:p-10 rounded-3xl border max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left shadow-lg ${
              isDark
                ? 'bg-[#14161B] border-[#282C35]'
                : 'bg-white border-[#E2D9CA]'
            }`}
          >
            <div className="space-y-2">
              <div
                data-reveal="up"
                className="inline-flex items-center gap-2 text-xs uppercase tracking-widest font-semibold"
                style={{ color: goldAccent }}
              >
                <Info className="w-4 h-4" />
                <span>Chef&apos;s 7-Course Omakase Tasting</span>
              </div>
              <h3
                data-reveal="up"
                className={`font-serif text-2xl font-bold ${
                  isDark ? 'text-[#EDE6D8]' : 'text-[#171717]'
                }`}
              >
                Grand Tasting Menu Available Nightly
              </h3>
              <p
                data-reveal="fade"
                className={`text-xs max-w-md ${
                  isDark ? 'text-[#8F887C]' : 'text-[#78716C]'
                }`}
              >
                $185 per guest &bull; Sommelier Grand Reserve Pairing $95. Requires participation of the entire table.
              </p>
            </div>

            <button
              data-reveal="scale"
              onClick={onOpenReservation}
              className={`px-8 py-3.5 rounded-full text-xs font-semibold uppercase tracking-[0.2em] transition-all cursor-pointer whitespace-nowrap ${
                isDark
                  ? 'bg-[#C5A059] hover:bg-[#DFBF77] text-[#0C0D0E]'
                  : 'bg-[#A67C00] hover:bg-[#B8860B] text-white'
              }`}
            >
              Reserve Tasting
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
