import React from 'react';
import { PageRoute } from '../types';
import { CHEF_PROFILE, VALUES_LIST } from '../data/restaurantData';
import { useTheme } from '../context/ThemeContext';
import { Award, Flame, HeartHandshake, Sparkles, ChefHat, Compass, ArrowRight } from 'lucide-react';

interface AboutPageProps {
  onNavigate: (page: PageRoute) => void;
  onOpenReservation: () => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onNavigate, onOpenReservation }) => {
  const { isDark } = useTheme();
  const goldAccent = isDark ? '#C5A059' : '#A67C00';

  const philosophyItems = [
    {
      title: 'Uncompromised Quality',
      description: 'We harvest ingredients at the height of their natural expression, working alongside sustainable generational growers.',
      icon: <Award className="w-5 h-5" style={{ color: goldAccent }} />,
    },
    {
      title: 'Fearless Creativity',
      description: 'French culinary discipline reimagined through modern Japanese balance and delicate smoke aromatics.',
      icon: <Sparkles className="w-5 h-5" style={{ color: goldAccent }} />,
    },
    {
      title: 'Fresh & Seasonal Sourcing',
      description: 'Our kitchen writes daily tasting courses reflecting the exact micro-climate offerings of morning markets.',
      icon: <Flame className="w-5 h-5" style={{ color: goldAccent }} />,
    },
    {
      title: 'Warm & Intuitive Hospitality',
      description: 'Hospitality is the art of feeling anticipated, cherished, and entirely relaxed from entrance to farewell.',
      icon: <HeartHandshake className="w-5 h-5" style={{ color: goldAccent }} />,
    },
    {
      title: 'Memorable Experiences',
      description: 'Every plate, wine decanting, and personalized dessert is structured to create memories that stand the test of time.',
      icon: <Compass className="w-5 h-5" style={{ color: goldAccent }} />,
    },
  ];

  return (
    <div
      className={`pt-24 transition-colors duration-400 ${
        isDark ? 'bg-[#0C0D0E] text-[#EDE6D8]' : 'bg-[#FAF8F3] text-[#171717]'
      }`}
    >
      {/* 1. HERO SECTION */}
      <section
        className={`relative py-20 sm:py-32 overflow-hidden border-b transition-colors duration-400 ${
          isDark ? 'border-[#1C1E24]' : 'border-[#E2D9CA]'
        }`}
      >
        <div className="absolute inset-0 z-0 opacity-25">
          <img
            src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=2000&auto=format&fit=crop"
            alt="Maison Ember Architecture"
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
            <span className="text-xs uppercase tracking-[0.25em] font-medium">
              About Maison Ember
            </span>
          </div>

          <h1
            data-reveal="up"
            className={`font-serif text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight ${
              isDark ? 'text-[#EDE6D8]' : 'text-[#171717]'
            }`}
          >
            Our Story
          </h1>

          <p
            data-reveal="up"
            className="font-serif italic text-xl sm:text-2xl max-w-2xl mx-auto"
            style={{ color: goldAccent }}
          >
            &ldquo;Where Every Bite Becomes a Memory.&rdquo;
          </p>

          <p
            data-reveal="fade"
            className={`text-sm sm:text-base max-w-xl mx-auto leading-relaxed font-light ${
              isDark ? 'text-[#B8B0A2]' : 'text-[#57534E]'
            }`}
          >
            Founded on a passion for open-fire culinary heritage, rare cellar vintages, and heartfelt human connection in the heart of the city.
          </p>
        </div>
      </section>

      {/* 2. OUR BEGINNING */}
      <section className="py-24 sm:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            {/* Text story */}
            <div className="lg:col-span-6 space-y-6" data-reveal="left">
              <div className="inline-flex items-center gap-2">
                <span className="w-8 h-[1px]" style={{ backgroundColor: goldAccent }} />
                <span
                  className="text-xs uppercase tracking-[0.25em] font-semibold"
                  style={{ color: goldAccent }}
                >
                  OUR BEGINNING
                </span>
              </div>

              <h2
                className={`font-serif text-3xl sm:text-5xl font-bold leading-tight ${
                  isDark ? 'text-[#EDE6D8]' : 'text-[#171717]'
                }`}
              >
                Born From the Hearth, <br />
                <span className="italic" style={{ color: goldAccent }}>
                  Refined for Modern Connoisseurs
                </span>
              </h2>

              <p
                className={`text-sm sm:text-base leading-relaxed ${
                  isDark ? 'text-[#B8B0A2]' : 'text-[#57534E]'
                }`}
              >
                Maison Ember was conceived with a singular devotion: to strip away the pretentious aloofness of old-school fine dining and replace it with authentic culinary soul, warmth, and peerless technical execution.
              </p>

              <p
                className={`text-sm leading-relaxed ${
                  isDark ? 'text-[#8F887C]' : 'text-[#78716C]'
                }`}
              >
                Our founders spent years traversing the artisan fishing ports of Hokkaido, truffle groves of Périgord, and regenerative vineyards across Burgundy and Napa. They envisioned a sanctuary where the elemental alchemy of embers — smoke, flame, heat, and time — could honor these world-class ingredients in an atmosphere of relaxed elegance.
              </p>

              <div
                className={`p-5 rounded-xl border-l-2 text-xs italic ${
                  isDark
                    ? 'bg-[#131518] text-[#EDE6D8]'
                    : 'bg-white text-[#171717] shadow-sm border-[#A67C00]'
                }`}
                style={{ borderLeftColor: goldAccent }}
              >
                &ldquo;We wanted a room where guests could lose track of time, savoring every aroma, while knowing every person on our team cares deeply about their evening.&rdquo;
              </div>
            </div>

            {/* Visual Collage */}
            <div className="lg:col-span-6 relative" data-reveal="right">
              <div
                className={`rounded-2xl overflow-hidden border shadow-2xl ${
                  isDark ? 'border-[#252830]' : 'border-[#E2D9CA]'
                }`}
              >
                <img
                  src="https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=1200&auto=format&fit=crop"
                  alt="Maison Ember dining room atmosphere"
                  className="w-full h-[450px] object-cover"
                />
              </div>
              <div
                className={`absolute -bottom-6 -left-6 border p-5 rounded-xl shadow-xl hidden sm:block max-w-xs ${
                  isDark
                    ? 'bg-[#16181D] border-[#2D313A]'
                    : 'bg-white border-[#E2D9CA]'
                }`}
              >
                <p className="font-serif text-xl font-bold" style={{ color: goldAccent }}>
                  2020 &ndash; 2026
                </p>
                <p className={`text-xs mt-1 ${isDark ? 'text-[#8F887C]' : 'text-[#78716C]'}`}>
                  Continuously recognized for culinary excellence, sommelier cellar curation, and timeless hospitality.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. OUR PHILOSOPHY */}
      <section
        className={`py-24 border-y transition-colors duration-400 ${
          isDark
            ? 'bg-[#0E1013] border-[#1D2026]'
            : 'bg-[#F4EFE6] border-[#E2D9CA]'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-3" data-reveal-group>
            <span
              data-reveal="up"
              className="text-xs uppercase tracking-[0.25em] font-semibold"
              style={{ color: goldAccent }}
            >
              GUIDING PRINCIPLES
            </span>
            <h2
              data-reveal="up"
              className={`font-serif text-3xl sm:text-5xl font-bold ${
                isDark ? 'text-[#EDE6D8]' : 'text-[#171717]'
              }`}
            >
              Our Philosophy
            </h2>
            <p data-reveal="fade" className={`text-xs sm:text-sm ${isDark ? 'text-[#8F887C]' : 'text-[#78716C]'}`}>
              Five foundational pillars that shape every menu we craft and every guest we welcome.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" data-reveal-group>
            {philosophyItems.map((item, index) => (
              <div
                key={index}
                data-reveal="up"
                className={`p-8 rounded-2xl border transition-all duration-300 space-y-3 shadow-md ${
                  isDark
                    ? 'bg-[#131518] border-[#23272F] hover:border-[#C5A059]/40'
                    : 'bg-white border-[#E2D9CA] hover:border-[#A67C00]/40 shadow-stone-200/50'
                }`}
              >
                <div
                  className={`reveal-icon w-10 h-10 rounded-lg border flex items-center justify-center ${
                    isDark
                      ? 'bg-[#181B20] border-[#2B2F38]'
                      : 'bg-[#F4EFE6] border-[#D5CCBE]'
                  }`}
                >
                  {item.icon}
                </div>
                <h3
                  className={`font-serif text-xl font-bold ${
                    isDark ? 'text-[#EDE6D8]' : 'text-[#171717]'
                  }`}
                >
                  {item.title}
                </h3>
                <p
                  className={`text-xs leading-relaxed ${
                    isDark ? 'text-[#8F887C]' : 'text-[#78716C]'
                  }`}
                >
                  {item.description}
                </p>
              </div>
            ))}

            {/* Quote Card */}
            <div
              data-reveal="up"
              className={`p-8 rounded-2xl border flex flex-col justify-between shadow-md ${
                isDark
                  ? 'bg-gradient-to-br from-[#1C1914] to-[#121316] border-[#C5A059]/40'
                  : 'bg-gradient-to-br from-[#FFFDF8] to-[#F9F5EC] border-[#A67C00]/40'
              }`}
            >
              <span className="font-serif text-3xl" style={{ color: goldAccent }}>&ldquo;</span>
              <p
                className={`font-serif italic text-sm leading-relaxed ${
                  isDark ? 'text-[#EDE6D8]' : 'text-[#171717]'
                }`}
              >
                Hospitality is not a transaction; it is a sacred gesture of care and fellowship around the table.
              </p>
              <p
                className="text-[11px] uppercase tracking-widest font-medium pt-4"
                style={{ color: goldAccent }}
              >
                &mdash; The Maison Ember Creed
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. OUR CHEF */}
      <section
        className={`py-24 sm:py-32 transition-colors duration-400 ${
          isDark ? 'bg-[#0C0D0E]' : 'bg-[#FAF8F3]'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            {/* Chef Portrait */}
            <div className="lg:col-span-5 relative" data-reveal="left">
              <div
                className={`rounded-2xl overflow-hidden border shadow-2xl relative ${
                  isDark ? 'border-[#2B2F38]' : 'border-[#E2D9CA]'
                }`}
              >
                <img
                  src={CHEF_PROFILE.image}
                  alt={CHEF_PROFILE.name}
                  className="w-full h-[500px] object-cover object-top"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                <div className="absolute bottom-6 left-6 right-6 text-left">
                  <span
                    className="px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider"
                    style={{
                      backgroundColor: goldAccent,
                      color: isDark ? '#0C0D0E' : '#FFFFFF',
                    }}
                  >
                    Executive Chef
                  </span>
                  <h3 className="font-serif text-2xl font-bold text-white mt-2">
                    {CHEF_PROFILE.name}
                  </h3>
                  <p className="text-xs text-stone-300">
                    {CHEF_PROFILE.michelinBackground}
                  </p>
                </div>
              </div>
            </div>

            {/* Chef Profile Details */}
            <div className="lg:col-span-7 space-y-6" data-reveal="right">
              <div className="inline-flex items-center gap-2">
                <ChefHat className="w-4 h-4" style={{ color: goldAccent }} />
                <span
                  className="text-xs uppercase tracking-[0.25em] font-semibold"
                  style={{ color: goldAccent }}
                >
                  CULINARY LEADERSHIP
                </span>
              </div>

              <h2
                className={`font-serif text-3xl sm:text-5xl font-bold ${
                  isDark ? 'text-[#EDE6D8]' : 'text-[#171717]'
                }`}
              >
                Meet Chef {CHEF_PROFILE.name}
              </h2>

              <p
                className="font-serif italic text-lg leading-relaxed"
                style={{ color: goldAccent }}
              >
                {CHEF_PROFILE.philosophyQuote}
              </p>

              <p
                className={`text-sm leading-relaxed ${
                  isDark ? 'text-[#B8B0A2]' : 'text-[#57534E]'
                }`}
              >
                {CHEF_PROFILE.bio}
              </p>

              <div
                className={`pt-4 grid grid-cols-2 gap-4 border-t ${
                  isDark ? 'border-[#22252C]' : 'border-[#E2D9CA]'
                }`}
              >
                <div>
                  <h4 className={`text-xs uppercase tracking-wider ${isDark ? 'text-[#8F887C]' : 'text-[#78716C]'}`}>
                    Culinary Training
                  </h4>
                  <p className={`text-xs font-medium mt-1 ${isDark ? 'text-[#EDE6D8]' : 'text-[#171717]'}`}>
                    L’Institut Paul Bocuse, Lyon
                  </p>
                </div>
                <div>
                  <h4 className={`text-xs uppercase tracking-wider ${isDark ? 'text-[#8F887C]' : 'text-[#78716C]'}`}>
                    Specialty
                  </h4>
                  <p className={`text-xs font-medium mt-1 ${isDark ? 'text-[#EDE6D8]' : 'text-[#171717]'}`}>
                    Wood-fired Embers &amp; Sauces
                  </p>
                </div>
              </div>

              <div className="pt-2">
                <button
                  id="chef-view-menu-btn"
                  onClick={() => {
                    onNavigate('menu');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className={`inline-flex items-center gap-2 px-6 py-3 rounded-full border text-xs font-semibold uppercase tracking-[0.2em] transition-all hover:-translate-y-0.5 cursor-pointer ${
                    isDark
                      ? 'border-[#C5A059] text-[#C5A059] hover:bg-[#C5A059] hover:text-[#0C0D0E]'
                      : 'border-[#A67C00] text-[#A67C00] hover:bg-[#A67C00] hover:text-white'
                  }`}
                >
                  <span>Taste Chef&apos;s Creations</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. OUR VALUES */}
      <section
        className={`py-24 border-t transition-colors duration-400 ${
          isDark
            ? 'bg-[#0E1013] border-[#1C1F25]'
            : 'bg-[#F4EFE6] border-[#E2D9CA]'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-xl mx-auto mb-16 space-y-2" data-reveal-group>
            <span
              data-reveal="up"
              className="text-xs uppercase tracking-[0.25em] font-semibold"
              style={{ color: goldAccent }}
            >
              THE VALUES WE EMBODY
            </span>
            <h2
              data-reveal="up"
              className={`font-serif text-3xl sm:text-4xl font-bold ${
                isDark ? 'text-[#EDE6D8]' : 'text-[#171717]'
              }`}
            >
              Our Core Values
            </h2>
            <p data-reveal="fade" className={`text-xs ${isDark ? 'text-[#8F887C]' : 'text-[#78716C]'}`}>
              What we stand for every moment our doors are open.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6" data-reveal-group>
            {VALUES_LIST.map((val, idx) => (
              <div
                key={idx}
                data-reveal="up"
                className={`p-8 rounded-2xl border transition-all duration-300 space-y-3 shadow-md ${
                  isDark
                    ? 'bg-[#131518] border-[#23272F] hover:border-[#C5A059]/50'
                    : 'bg-white border-[#E2D9CA] hover:border-[#A67C00]/50 shadow-stone-200/50'
                }`}
              >
                <div
                  className="reveal-icon w-8 h-8 rounded-full border flex items-center justify-center font-serif text-sm font-bold"
                  style={{ borderColor: goldAccent, color: goldAccent }}
                >
                  {idx + 1}
                </div>
                <h3
                  className={`font-serif text-lg font-bold ${
                    isDark ? 'text-[#EDE6D8]' : 'text-[#171717]'
                  }`}
                >
                  {val.title}
                </h3>
                <p
                  className={`text-xs leading-relaxed ${
                    isDark ? 'text-[#8F887C]' : 'text-[#78716C]'
                  }`}
                >
                  {val.description}
                </p>
              </div>
            ))}
          </div>

          {/* Bottom CTA Banner */}
          <div
            data-reveal-group
            className={`mt-20 p-8 sm:p-12 rounded-3xl border flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left shadow-lg ${
              isDark
                ? 'bg-[#14161B] border-[#2A2E38]'
                : 'bg-white border-[#E2D9CA]'
            }`}
          >
            <div className="space-y-1">
              <h3
                data-reveal="up"
                className={`font-serif text-2xl font-bold ${
                  isDark ? 'text-[#EDE6D8]' : 'text-[#171717]'
                }`}
              >
                Experience Our Story in Person
              </h3>
              <p data-reveal="fade" className={`text-xs ${isDark ? 'text-[#8F887C]' : 'text-[#78716C]'}`}>
                Reservations are recommended 2–4 weeks in advance for weekend dinners.
              </p>
            </div>
            <button
              id="about-reserve-btn"
              data-reveal="scale"
              onClick={onOpenReservation}
              className={`px-8 py-3.5 rounded-full text-xs font-semibold uppercase tracking-[0.2em] transition-all hover:-translate-y-0.5 cursor-pointer whitespace-nowrap shadow-md ${
                isDark
                  ? 'bg-[#C5A059] hover:bg-[#DFBF77] text-[#0C0D0E]'
                  : 'bg-[#A67C00] hover:bg-[#B8860B] text-white'
              }`}
            >
              Reserve a Table
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
