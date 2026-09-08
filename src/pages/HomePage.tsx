import React, { useState, useEffect, useRef, useCallback } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { PageRoute } from '../types';
import { SIGNATURE_DISHES, WHY_CHOOSE_US, REVIEWS } from '../data/restaurantData';
import { useTheme } from '../context/ThemeContext';
import { useHeroScrollEffects } from '../hooks/useHeroScrollEffects';
import {
  Calendar,
  Utensils,
  ArrowRight,
  Sparkles,
  ChevronLeft,
  ChevronRight,
  Star,
  Leaf,
  ChefHat,
  Wine,
  Flame,
  Award
} from 'lucide-react';

interface HomePageProps {
  onNavigate: (page: PageRoute) => void;
  onOpenReservation: () => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onNavigate, onOpenReservation }) => {
  const { isDark } = useTheme();
  const goldAccent = isDark ? '#C5A059' : '#A67C00';

  // Cinematic exit: hero content fades/rises/scales down as the visitor
  // scrolls past it; the background layers drift via the existing parallax.
  useHeroScrollEffects('home-hero');

  // ---------------------------------------------------------------------------
  // HERO SLIDER
  // ---------------------------------------------------------------------------
  const HERO_SLIDES = [
    {
      id: 'signature-dining',
      image:
        'https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=2400&auto=format&fit=crop',
      badge: 'Signature Dining',
      heading: 'Where Every Bite Becomes a Memory.',
      description:
        'Experience thoughtfully crafted cuisine, exceptional ingredients, and an atmosphere designed for unforgettable moments.',
      primary: { label: 'Explore Our Menu', page: 'menu' as PageRoute },
      secondary: { label: 'Reserve a Table', reserve: true as const },
    },
    {
      id: 'crafted-with-passion',
      image:
        'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?q=80&w=2400&auto=format&fit=crop',
      badge: 'Crafted With Passion',
      heading: 'Crafted With Passion, Served With Purpose.',
      description:
        'Discover beautifully prepared dishes made with fresh ingredients, creativity, and a passion for extraordinary flavor.',
      primary: { label: 'Discover Our Menu', page: 'menu' as PageRoute },
      secondary: { label: 'Our Story', page: 'about' as PageRoute },
    },
    {
      id: 'unforgettable-experience',
      image:
        'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=2400&auto=format&fit=crop',
      badge: 'Unforgettable Experience',
      heading: "More Than a Meal. It's an Experience.",
      description:
        'Step into an elegant dining experience where exceptional food, warm hospitality, and unforgettable moments come together.',
      primary: { label: 'Book a Table', reserve: true as const },
      secondary: { label: 'Discover More', page: 'services' as PageRoute },
    },
  ];

  const SLIDE_DURATION = 7000;
  const [heroIndex, setHeroIndex] = useState(0);
  const heroTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const heroPaused = useRef(false);

  const clearHeroTimer = () => {
    if (heroTimer.current) {
      clearTimeout(heroTimer.current);
      heroTimer.current = null;
    }
  };

  const scheduleHero = useCallback(() => {
    clearHeroTimer();
    if (heroPaused.current) return;
    heroTimer.current = setTimeout(() => {
      setHeroIndex((prev) => (prev + 1) % HERO_SLIDES.length);
    }, SLIDE_DURATION);
  }, [HERO_SLIDES.length]);

  useEffect(() => {
    scheduleHero();
    return clearHeroTimer;
  }, [heroIndex, scheduleHero]);

  const goToHeroSlide = (next: number) => {
    setHeroIndex((next + HERO_SLIDES.length) % HERO_SLIDES.length);
  };

  const pauseHero = () => {
    heroPaused.current = true;
    clearHeroTimer();
  };

  const resumeHero = () => {
    heroPaused.current = false;
    scheduleHero();
  };

  const handleSlideNav = (next: number) => {
    pauseHero();
    goToHeroSlide(next);
    // resume autoplay a moment after the user stops interacting
    window.setTimeout(resumeHero, 1500);
  };

  const runSlideAction = (
    action: { page?: PageRoute; reserve?: true }
  ) => {
    if (action.reserve) {
      onOpenReservation();
      return;
    }
    if (action.page) {
      onNavigate(action.page);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // Testimonials Carousel State
  const [currentReviewIndex, setCurrentReviewIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentReviewIndex((prev) => (prev + 1) % REVIEWS.length);
    }, 6500);
    return () => clearInterval(timer);
  }, []);

  const getFeatureIcon = (name: string) => {
    switch (name) {
      case 'Leaf':
        return <Leaf className="w-5 h-5" style={{ color: goldAccent }} />;
      case 'ChefHat':
        return <ChefHat className="w-5 h-5" style={{ color: goldAccent }} />;
      case 'Sparkles':
        return <Sparkles className="w-5 h-5" style={{ color: goldAccent }} />;
      case 'Wine':
        return <Wine className="w-5 h-5" style={{ color: goldAccent }} />;
      default:
        return <Sparkles className="w-5 h-5" style={{ color: goldAccent }} />;
    }
  };

  return (
    <div className="relative overflow-hidden">
      {/* 1. HERO SLIDER */}
      <section
        id="home-hero"
        className="relative h-screen min-h-[600px] w-full overflow-hidden bg-black"
        aria-roledescription="carousel"
        aria-label="Maison Ember featured highlights"
        onMouseEnter={pauseHero}
        onMouseLeave={resumeHero}
        onTouchStart={pauseHero}
        onFocusCapture={pauseHero}
        onBlurCapture={resumeHero}
      >
        {HERO_SLIDES.map((slide, i) => {
          const isActive = i === heroIndex;
          return (
            <div
              key={slide.id}
              className={`absolute inset-0 transition-opacity duration-[1200ms] ease-in-out ${
                isActive
                  ? 'opacity-100 z-10 hero-slide-active'
                  : 'opacity-0 z-0 pointer-events-none'
              }`}
              aria-hidden={!isActive}
              aria-roledescription="slide"
              aria-label={`${i + 1} of ${HERO_SLIDES.length} — ${slide.badge}`}
            >
              {/* Background image + Ken Burns, drift/zoom tied to scroll via useHeroScrollEffects */}
              <div className="absolute inset-0 overflow-hidden" data-hero-bg>
                <img
                  src={slide.image}
                  alt={slide.badge}
                  className="hero-slide-img w-full h-full object-cover object-center scale-105"
                  loading={i === 0 ? 'eager' : 'lazy'}
                />
              </div>

              {/* Dark readability overlays */}
              <div className="absolute inset-0 bg-black/55" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-black/50" />
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_transparent_0%,_rgba(0,0,0,0.55)_100%)]" />

              {/* Slide content: fades/rises/scales away as the visitor scrolls past the hero */}
              <div className="hero-content-fade relative z-10 h-full flex items-center justify-center">
                <div className="max-w-4xl mx-auto px-6 sm:px-8 text-center pt-20 pb-24">
                  <div
                    className="hero-anim hero-anim-1 inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full border border-[#C5A059]/50 bg-black/40 backdrop-blur-md mb-7"
                  >
                    <span
                      className="w-1.5 h-1.5 rounded-full animate-float-slow"
                      style={{ backgroundColor: goldAccent }}
                    />
                    <span className="text-[11px] uppercase tracking-[0.32em] font-sans font-medium text-[#EDE6D8]">
                      {slide.badge}
                    </span>
                  </div>

                  <h1 className="hero-anim hero-anim-2 font-serif text-[2.6rem] leading-[1.08] sm:text-6xl lg:text-7xl font-bold text-[#F5EFE6] tracking-tight mb-6">
                    {slide.heading}
                  </h1>

                  <p className="hero-anim hero-anim-3 text-base sm:text-lg lg:text-xl max-w-2xl mx-auto leading-relaxed font-light text-[#D8D1C4] mb-10">
                    {slide.description}
                  </p>

                  <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-5">
                    <button
                      onClick={() => runSlideAction(slide.primary)}
                      className="hero-anim hero-anim-4 w-full sm:w-auto px-8 py-4 rounded-full text-xs font-semibold uppercase tracking-[0.22em] transition-all hover:-translate-y-0.5 flex items-center justify-center gap-2 cursor-pointer group text-[#0C0D0E]"
                      style={{ backgroundColor: goldAccent }}
                    >
                      <Utensils className="w-4 h-4 transition-transform group-hover:rotate-12" />
                      <span>{slide.primary.label}</span>
                    </button>

                    <button
                      onClick={() => runSlideAction(slide.secondary)}
                      className="hero-anim hero-anim-5 w-full sm:w-auto px-8 py-4 rounded-full border border-[#EDE6D8]/50 bg-white/5 hover:bg-[#EDE6D8] text-[#EDE6D8] hover:text-[#0C0D0E] text-xs font-semibold uppercase tracking-[0.22em] transition-all hover:-translate-y-0.5 backdrop-blur-sm flex items-center justify-center gap-2 cursor-pointer group"
                    >
                      <Calendar className="w-4 h-4 transition-transform group-hover:scale-110" />
                      <span>{slide.secondary.label}</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}

        {/* Prev / Next arrows. Hidden below sm: at phone widths they sit at
            vertical-center of the full-height hero and overlap the centered
            headline/subtext stack. Dots + swipe carry navigation on touch. */}
        <button
          id="hero-prev-btn"
          onClick={() => handleSlideNav(heroIndex - 1)}
          aria-label="Previous slide"
          className="hidden sm:block absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 z-20 p-3 sm:p-3.5 rounded-full border border-[#EDE6D8]/30 bg-black/40 backdrop-blur-md text-[#EDE6D8] hover:bg-[#C5A059] hover:text-[#0C0D0E] hover:border-[#C5A059] transition-all cursor-pointer"
        >
          <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
        </button>
        <button
          id="hero-next-btn"
          onClick={() => handleSlideNav(heroIndex + 1)}
          aria-label="Next slide"
          className="hidden sm:block absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 z-20 p-3 sm:p-3.5 rounded-full border border-[#EDE6D8]/30 bg-black/40 backdrop-blur-md text-[#EDE6D8] hover:bg-[#C5A059] hover:text-[#0C0D0E] hover:border-[#C5A059] transition-all cursor-pointer"
        >
          <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
        </button>

        {/* Bottom controls: counter + dots */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-4">
          <div className="flex items-center gap-3 text-[#EDE6D8]/80 text-xs font-sans tracking-[0.3em]">
            <span className="font-serif text-lg text-[#EDE6D8]">
              {String(heroIndex + 1).padStart(2, '0')}
            </span>
            <span className="w-10 h-[1px] bg-[#EDE6D8]/40" />
            <span>{String(HERO_SLIDES.length).padStart(2, '0')}</span>
          </div>

          <div className="flex items-center justify-center gap-2.5">
            {HERO_SLIDES.map((s, i) => (
              <button
                key={s.id}
                onClick={() => handleSlideNav(i)}
                aria-label={`Go to slide ${i + 1}`}
                aria-current={i === heroIndex}
                className={`h-2 rounded-full transition-all cursor-pointer ${
                  i === heroIndex ? 'w-9' : 'w-2 bg-[#EDE6D8]/40 hover:bg-[#EDE6D8]/70'
                }`}
                style={i === heroIndex ? { backgroundColor: goldAccent } : undefined}
              />
            ))}
          </div>
        </div>

        {/* Scroll prompt */}
        <div className="absolute bottom-8 right-6 z-20 hidden lg:flex flex-col items-center gap-2 text-[10px] uppercase tracking-[0.3em] text-[#EDE6D8]/60">
          <span>Scroll</span>
          <div className="w-4 h-7 rounded-full border border-[#EDE6D8]/50 flex items-start justify-center p-1">
            <div className="w-1 h-2 rounded-full animate-bounce" style={{ backgroundColor: goldAccent }} />
          </div>
        </div>
      </section>

      {/* 2. FEATURED INTRODUCTION (OUR STORY) */}
      <section
        id="featured-story"
        className={`py-24 sm:py-32 relative transition-colors duration-400 ${
          isDark ? 'bg-[#0C0D0E]' : 'bg-[#FAF8F3]'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            {/* Left: Food/Restaurant Image */}
            <div className="lg:col-span-6 relative" data-reveal="left">
              <div
                data-parallax="0.045"
                className={`img-parallax relative z-10 rounded-2xl overflow-hidden border shadow-2xl ${
                  isDark ? 'border-[#262A32]' : 'border-[#E2D9CA]'
                }`}
              >
                <img
                  src="https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?q=80&w=1200&auto=format&fit=crop"
                  alt="Maison Ember Culinary Craft"
                  className="w-full h-[460px] sm:h-[540px] object-cover transition-transform duration-700 hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                <div
                  className={`absolute bottom-6 left-6 right-6 p-4 backdrop-blur-md rounded-xl border flex items-center justify-between ${
                    isDark
                      ? 'bg-[#14161A]/90 border-[#2B2F38] text-[#EDE6D8]'
                      : 'bg-white/90 border-[#E2D9CA] text-[#171717] shadow-lg'
                  }`}
                >
                  <div>
                    <p className="text-xs uppercase tracking-widest font-medium" style={{ color: goldAccent }}>
                      Bespoke Gastronomy
                    </p>
                    <p className="text-sm font-serif font-bold">Honoring Elemental Fire &amp; Season</p>
                  </div>
                  <div
                    className={`reveal-icon w-10 h-10 rounded-full border flex items-center justify-center ${
                      isDark ? 'bg-[#C5A059]/20 border-[#C5A059]' : 'bg-[#A67C00]/15 border-[#A67C00]'
                    }`}
                    style={{ color: goldAccent }}
                  >
                    <Flame className="w-5 h-5" />
                  </div>
                </div>
              </div>

              {/* Decorative Geometric Gold Accent */}
              <div
                className="absolute -top-4 -left-4 w-28 h-28 border-t-2 border-l-2 rounded-tl-3xl pointer-events-none hidden sm:block opacity-60"
                style={{ borderColor: goldAccent }}
              />
              <div
                className="absolute -bottom-4 -right-4 w-28 h-28 border-b-2 border-r-2 rounded-br-3xl pointer-events-none hidden sm:block opacity-60"
                style={{ borderColor: goldAccent }}
              />
            </div>

            {/* Right: Narrative Story */}
            <div className="lg:col-span-6 space-y-6" data-reveal="right">
              <div className="inline-flex items-center gap-2">
                <span className="w-8 h-[1px]" style={{ backgroundColor: goldAccent }} />
                <span
                  className="text-xs uppercase tracking-[0.3em] font-semibold"
                  style={{ color: goldAccent }}
                >
                  OUR STORY
                </span>
              </div>

              <h2
                className={`font-serif text-3xl sm:text-5xl font-bold leading-tight tracking-tight ${
                  isDark ? 'text-[#EDE6D8]' : 'text-[#171717]'
                }`}
              >
                Crafted With Passion, <br className="hidden sm:inline" />
                <span className="italic" style={{ color: goldAccent }}>
                  Served With Purpose
                </span>
              </h2>

              <p
                className={`text-base leading-relaxed font-light ${
                  isDark ? 'text-[#B8B0A2]' : 'text-[#57534E]'
                }`}
              >
                At Maison Ember, dining transcends sustenance. Born from a reverence for open embers and old-world cellar craftsmanship, our culinary salon brings together pure, uncompromised ingredients and the warmest traditions of European hospitality.
              </p>

              <p
                className={`text-sm leading-relaxed ${
                  isDark ? 'text-[#8F887C]' : 'text-[#78716C]'
                }`}
              >
                From hand-foraged mushrooms to prime A5 Wagyu aged to perfection, every component on your plate is treated with patience and precision. We curate not just meals, but transcendent sensory encounters that linger in memory for years to come.
              </p>

              {/* Key Pillars Highlights */}
              <div
                className={`grid grid-cols-2 gap-4 pt-4 border-t ${
                  isDark ? 'border-[#22252B]' : 'border-[#E2D9CA]'
                }`}
              >
                <div>
                  <h4 className={`font-serif text-2xl font-bold ${isDark ? 'text-[#EDE6D8]' : 'text-[#171717]'}`}>
                    2,400+
                  </h4>
                  <p className={`text-xs uppercase tracking-wider mt-0.5 ${isDark ? 'text-[#8F887C]' : 'text-[#78716C]'}`}>
                    Cellar Vintages
                  </p>
                </div>
                <div>
                  <h4 className={`font-serif text-2xl font-bold ${isDark ? 'text-[#EDE6D8]' : 'text-[#171717]'}`}>
                    100%
                  </h4>
                  <p className={`text-xs uppercase tracking-wider mt-0.5 ${isDark ? 'text-[#8F887C]' : 'text-[#78716C]'}`}>
                    Farm-Direct Artisans
                  </p>
                </div>
              </div>

              <div className="pt-2">
                <button
                  id="featured-story-btn"
                  onClick={() => {
                    onNavigate('about');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className={`inline-flex items-center gap-3 px-6 py-3.5 rounded-full border text-xs font-semibold uppercase tracking-[0.2em] transition-all hover:-translate-y-0.5 group cursor-pointer ${
                    isDark
                      ? 'border-[#C5A059]/60 hover:border-[#C5A059] bg-[#C5A059]/10 hover:bg-[#C5A059] text-[#EDE6D8] hover:text-[#0C0D0E]'
                      : 'border-[#A67C00]/60 hover:border-[#A67C00] bg-[#A67C00]/10 hover:bg-[#A67C00] text-[#171717] hover:text-white'
                  }`}
                >
                  <span>Discover Our Story</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. SIGNATURE DISHES */}
      <section
        id="signature-dishes"
        className={`py-24 sm:py-32 relative border-t transition-colors duration-400 ${
          isDark
            ? 'bg-[#0E1013] border-[#1C1F25]'
            : 'bg-[#F4EFE6] border-[#E2D9CA]'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header: label, then heading, then decorative line, then description — each its own beat */}
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-3" data-reveal-group>
            <span
              data-reveal="up"
              className="text-xs uppercase tracking-[0.3em] font-semibold"
              style={{ color: goldAccent }}
            >
              CHEF’S MASTERWORK
            </span>
            <h2
              data-reveal="up"
              className={`font-serif text-3xl sm:text-5xl font-bold ${
                isDark ? 'text-[#EDE6D8]' : 'text-[#171717]'
              }`}
            >
              Our Signature Dishes
            </h2>
            <span
              data-reveal="scale"
              className="block w-10 h-[2px] mx-auto"
              style={{ backgroundColor: goldAccent }}
            />
            <p data-reveal="fade" className={`font-serif italic text-lg ${isDark ? 'text-[#B8B0A2]' : 'text-[#57534E]'}`}>
              &ldquo;Timeless flavors, thoughtfully reimagined.&rdquo;
            </p>
          </div>

          {/* 4 Premium Food Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8" data-reveal-group>
            {SIGNATURE_DISHES.map((dish) => (
              <div
                key={dish.id}
                id={`signature-card-${dish.id}`}
                data-reveal="up"
                className={`group relative rounded-2xl overflow-hidden border transition-all duration-500 hover:-translate-y-2 flex flex-col justify-between ${
                  isDark
                    ? 'bg-[#131518] border-[#23272F] hover:border-[#C5A059]/60 hover:shadow-2xl hover:shadow-[#C5A059]/10'
                    : 'bg-[#FFFFFF] border-[#E2D9CA] hover:border-[#A67C00]/60 shadow-md shadow-[#4A3B2C]/5 hover:shadow-xl hover:shadow-[#A67C00]/15'
                }`}
              >
                {/* Image Container with Zoom */}
                <div className="relative h-64 overflow-hidden bg-black/40">
                  <img
                    src={dish.image}
                    alt={dish.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    loading="lazy"
                  />
                  {/* Category Pill */}
                  <div
                    className="absolute top-3.5 left-3.5 px-3 py-1 rounded-full bg-black/75 backdrop-blur-md border border-white/10 text-[10px] uppercase tracking-wider font-medium"
                    style={{ color: goldAccent }}
                  >
                    {dish.category}
                  </div>

                  {/* Price Badge */}
                  <div
                    className="absolute top-3.5 right-3.5 px-3 py-1 rounded-full text-xs font-bold font-serif"
                    style={{
                      backgroundColor: goldAccent,
                      color: isDark ? '#0C0D0E' : '#FFFFFF',
                    }}
                  >
                    {dish.price}
                  </div>

                  {/* Overlay Revealed on Hover with CTA */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                    <button
                      onClick={onOpenReservation}
                      className="w-full py-2.5 rounded-lg font-semibold text-xs uppercase tracking-wider transition-transform transform translate-y-2 group-hover:translate-y-0 cursor-pointer"
                      style={{
                        backgroundColor: goldAccent,
                        color: isDark ? '#0C0D0E' : '#FFFFFF',
                      }}
                    >
                      Reserve For This Dish
                    </button>
                  </div>
                </div>

                {/* Details */}
                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    <h3
                      className={`font-serif text-xl font-bold transition-colors line-clamp-1 ${
                        isDark
                          ? 'text-[#EDE6D8] group-hover:text-[#C5A059]'
                          : 'text-[#171717] group-hover:text-[#A67C00]'
                      }`}
                    >
                      {dish.name}
                    </h3>
                    <p
                      className={`text-xs leading-relaxed mt-2 line-clamp-3 ${
                        isDark ? 'text-[#8F887C]' : 'text-[#78716C]'
                      }`}
                    >
                      {dish.description}
                    </p>
                  </div>

                  {dish.pairing && (
                    <div
                      className={`pt-3 border-t text-[11px] italic flex items-center gap-1.5 ${
                        isDark ? 'border-[#1F2228]' : 'border-[#E8E2D6]'
                      }`}
                      style={{ color: goldAccent }}
                    >
                      <Wine className="w-3.5 h-3.5 shrink-0" style={{ color: goldAccent }} />
                      <span className="truncate">{dish.pairing}</span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* View Full Menu CTA */}
          <div className="text-center mt-12" data-reveal="up">
            <button
              id="view-complete-menu-btn"
              onClick={() => {
                onNavigate('menu');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className={`inline-flex items-center gap-3 px-8 py-4 rounded-full border text-xs font-semibold uppercase tracking-[0.2em] transition-all hover:-translate-y-0.5 cursor-pointer group ${
                isDark
                  ? 'border-[#C5A059] bg-[#C5A059]/10 hover:bg-[#C5A059] text-[#EDE6D8] hover:text-[#0C0D0E]'
                  : 'border-[#A67C00] bg-[#A67C00]/10 hover:bg-[#A67C00] text-[#171717] hover:text-white'
              }`}
            >
              <span>Explore Complete Menu &amp; Cellar Flight</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </button>
          </div>
        </div>
      </section>

      {/* 4. WHY CHOOSE US */}
      <section
        id="why-choose-us"
        className={`py-24 relative transition-colors duration-400 ${
          isDark ? 'bg-[#0C0D0E]' : 'bg-[#FAF8F3]'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-xl mx-auto mb-16 space-y-2" data-reveal-group>
            <span
              data-reveal="up"
              className="text-xs uppercase tracking-[0.3em] font-semibold"
              style={{ color: goldAccent }}
            >
              THE MAISON STANDARD
            </span>
            <h2
              data-reveal="up"
              className={`font-serif text-3xl sm:text-4xl font-bold ${
                isDark ? 'text-[#EDE6D8]' : 'text-[#171717]'
              }`}
            >
              Why Choose Maison Ember
            </h2>
            <p data-reveal="fade" className={`text-xs ${isDark ? 'text-[#8F887C]' : 'text-[#78716C]'}`}>
              Every nuance is refined to deliver peerless luxury and culinary wonder.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8" data-reveal-group>
            {WHY_CHOOSE_US.map((item) => (
              <div
                key={item.id}
                id={`feature-card-${item.id}`}
                data-reveal="up"
                className={`group p-8 rounded-2xl border transition-all duration-300 hover:-translate-y-1.5 space-y-4 shadow-lg ${
                  isDark
                    ? 'bg-[#121417] border-[#21242B] hover:border-[#C5A059]/50'
                    : 'bg-[#FFFFFF] border-[#E2D9CA] hover:border-[#A67C00]/50 shadow-stone-200/60'
                }`}
              >
                <div
                  className={`reveal-icon w-12 h-12 rounded-xl border flex items-center justify-center transition-all group-hover:scale-110 group-hover:rotate-3 ${
                    isDark
                      ? 'bg-[#181B20] border-[#2D313A] group-hover:border-[#C5A059]'
                      : 'bg-[#F4EFE6] border-[#D5CCBE] group-hover:border-[#A67C00]'
                  }`}
                >
                  {getFeatureIcon(item.iconName)}
                </div>
                <h3
                  className={`font-serif text-lg font-bold transition-colors ${
                    isDark
                      ? 'text-[#EDE6D8] group-hover:text-[#C5A059]'
                      : 'text-[#171717] group-hover:text-[#A67C00]'
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
          </div>
        </div>
      </section>

      {/* 5. RESTAURANT EXPERIENCE (IMMERSIVE FULL-WIDTH SECTION) */}
      <section
        id="restaurant-experience"
        className="reveal-bg-zoom relative py-32 sm:py-40 bg-fixed bg-cover bg-center overflow-hidden"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=2000&auto=format&fit=crop')`,
        }}
      >
        {/* Dark Film Gradients */}
        <div className="absolute inset-0 bg-black/80 backdrop-brightness-50" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/70 to-black/90" />

        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6" data-reveal-group>
          <div data-reveal="up" className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-amber-400/40 bg-black/60 backdrop-blur-md">
            <Award className="w-3.5 h-3.5" style={{ color: goldAccent }} />
            <span
              className="text-xs uppercase tracking-[0.25em] font-medium"
              style={{ color: goldAccent }}
            >
              An Immersive Journey
            </span>
          </div>

          <h2 data-reveal="up" className="font-serif text-4xl sm:text-6xl font-bold text-[#EDE6D8] leading-tight">
            More Than a Meal. <br />
            <span className="italic" style={{ color: goldAccent }}>
              It&apos;s an Experience.
            </span>
          </h2>

          <p data-reveal="fade" className="text-base sm:text-lg text-[#B8B0A2] max-w-2xl mx-auto leading-relaxed font-light">
            From the warmth of our hearth embers to the choreography of tableside finishing and sommelier pairings, immerse yourself in an atmosphere curated for memorable celebrations and genuine connection.
          </p>

          <div data-reveal="scale" className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-5">
            <button
              id="exp-reserve-btn"
              onClick={onOpenReservation}
              className={`w-full sm:w-auto px-8 py-4 rounded-full text-xs font-semibold uppercase tracking-[0.2em] transition-all hover:-translate-y-0.5 cursor-pointer ${
                isDark
                  ? 'bg-[#C5A059] hover:bg-[#DFBF77] text-[#0C0D0E]'
                  : 'bg-[#A67C00] hover:bg-[#B8860B] text-white'
              }`}
            >
              Book An Experience
            </button>

            <button
              id="exp-services-btn"
              onClick={() => {
                onNavigate('services');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="w-full sm:w-auto px-8 py-4 rounded-full border border-[#EDE6D8]/40 hover:border-[#EDE6D8] bg-black/40 text-[#EDE6D8] text-xs font-semibold uppercase tracking-[0.2em] transition-all hover:-translate-y-0.5 cursor-pointer"
            >
              Private Dining &amp; Events
            </button>
          </div>
        </div>
      </section>

      {/* 6. CUSTOMER REVIEWS (PREMIUM TESTIMONIALS CAROUSEL) */}
      <section
        id="customer-reviews"
        className={`py-24 sm:py-32 relative border-b transition-colors duration-400 ${
          isDark
            ? 'bg-[#0C0D0E] border-[#1C1F25]'
            : 'bg-[#FAF8F3] border-[#E2D9CA]'
        }`}
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center" data-reveal-group>
          <span
            className="text-xs uppercase tracking-[0.3em] font-semibold block mb-2"
            style={{ color: goldAccent }}
            data-reveal="up"
          >
            CRITICAL ACCLAIM &amp; GUEST VOICES
          </span>
          <h2
            className={`font-serif text-3xl sm:text-5xl font-bold mb-12 ${
              isDark ? 'text-[#EDE6D8]' : 'text-[#171717]'
            }`}
            data-reveal="up"
          >
            What Our Patrons Say
          </h2>

          {/* Testimonial Active Display */}
          <div
            data-reveal="scale"
            className={`relative min-h-[260px] flex flex-col justify-center items-center overflow-hidden border rounded-3xl p-8 sm:p-12 shadow-2xl transition-colors duration-500 ${
              isDark
                ? 'bg-[#111316] border-[#252932]'
                : 'bg-[#FFFFFF] border-[#E2D9CA] shadow-stone-200/80'
            }`}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={currentReviewIndex}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                className="flex flex-col items-center"
              >
                {/* 5 Stars */}
                <div className="flex items-center justify-center gap-1.5 mb-6">
                  {[...Array(REVIEWS[currentReviewIndex].rating)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-4 h-4"
                      style={{ fill: goldAccent, color: goldAccent }}
                    />
                  ))}
                </div>

                {/* Review Quote */}
                <p
                  className={`font-serif text-lg sm:text-2xl leading-relaxed italic max-w-2xl mb-8 ${
                    isDark ? 'text-[#EDE6D8]' : 'text-[#171717]'
                  }`}
                >
                  &ldquo;{REVIEWS[currentReviewIndex].content}&rdquo;
                </p>

                {/* Author Profile */}
                <div className="flex items-center gap-3.5">
                  <img
                    src={REVIEWS[currentReviewIndex].avatar}
                    alt={REVIEWS[currentReviewIndex].name}
                    className="w-11 h-11 rounded-full object-cover border"
                    style={{ borderColor: goldAccent }}
                  />
                  <div className="text-left">
                    <p
                      className={`font-serif text-sm font-bold ${
                        isDark ? 'text-[#EDE6D8]' : 'text-[#171717]'
                      }`}
                    >
                      {REVIEWS[currentReviewIndex].name}
                    </p>
                    <p
                      className={`text-[11px] uppercase tracking-wider ${
                        isDark ? 'text-[#8F887C]' : 'text-[#78716C]'
                      }`}
                    >
                      {REVIEWS[currentReviewIndex].role} &bull; {REVIEWS[currentReviewIndex].date}
                    </p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Prev / Next controls */}
            <div className="absolute left-4 top-1/2 -translate-y-1/2 hidden sm:block">
              <button
                id="review-prev-btn"
                onClick={() =>
                  setCurrentReviewIndex(
                    (prev) => (prev - 1 + REVIEWS.length) % REVIEWS.length
                  )
                }
                className={`p-2.5 rounded-full border transition-colors cursor-pointer ${
                  isDark
                    ? 'bg-[#1A1D23] border-[#2E333C] text-[#B8B0A2] hover:text-[#C5A059]'
                    : 'bg-[#F4EFE6] border-[#D5CCBE] text-[#57534E] hover:text-[#A67C00]'
                }`}
                aria-label="Previous review"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
            </div>
            <div className="absolute right-4 top-1/2 -translate-y-1/2 hidden sm:block">
              <button
                id="review-next-btn"
                onClick={() =>
                  setCurrentReviewIndex((prev) => (prev + 1) % REVIEWS.length)
                }
                className={`p-2.5 rounded-full border transition-colors cursor-pointer ${
                  isDark
                    ? 'bg-[#1A1D23] border-[#2E333C] text-[#B8B0A2] hover:text-[#C5A059]'
                    : 'bg-[#F4EFE6] border-[#D5CCBE] text-[#57534E] hover:text-[#A67C00]'
                }`}
                aria-label="Next review"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Dots Indicator */}
          <div className="flex items-center justify-center gap-2.5 mt-8">
            {REVIEWS.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentReviewIndex(i)}
                className={`h-2 rounded-full transition-all cursor-pointer ${
                  i === currentReviewIndex
                    ? 'w-8'
                    : isDark
                    ? 'w-2 bg-[#2E333D] hover:bg-[#4D5360]'
                    : 'w-2 bg-[#D5CCBE] hover:bg-[#A8A29E]'
                }`}
                style={i === currentReviewIndex ? { backgroundColor: goldAccent } : undefined}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* 7. CTA SECTION */}
      <section
        id="home-cta"
        className={`py-24 sm:py-32 relative overflow-hidden text-center transition-colors duration-400 ${
          isDark ? 'bg-[#090A0C]' : 'bg-[#F2ECE1]'
        }`}
      >
        {/* Ambient Glow */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] rounded-full blur-3xl pointer-events-none opacity-20"
          style={{ backgroundColor: goldAccent }}
        />

        <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6" data-reveal-group>
          <span
            data-reveal="up"
            className="text-xs uppercase tracking-[0.3em] font-semibold"
            style={{ color: goldAccent }}
          >
            RESERVATIONS OPEN
          </span>

          <h2
            data-reveal="up"
            className={`font-serif text-4xl sm:text-6xl font-bold tracking-tight ${
              isDark ? 'text-[#EDE6D8]' : 'text-[#171717]'
            }`}
          >
            Your Table Is Waiting
          </h2>

          <p
            data-reveal="fade"
            className={`text-base sm:text-lg font-light max-w-xl mx-auto ${
              isDark ? 'text-[#B8B0A2]' : 'text-[#57534E]'
            }`}
          >
            Join us for an unforgettable dining experience. Reserve your seating in our main dining salon, wine cellar, or chef&apos;s ember counter.
          </p>

          <div data-reveal="scale" className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              id="cta-reserve-btn"
              onClick={onOpenReservation}
              className={`w-full sm:w-auto px-9 py-4 rounded-full text-xs font-semibold uppercase tracking-[0.22em] transition-all hover:-translate-y-0.5 cursor-pointer ${
                isDark
                  ? 'bg-[#C5A059] hover:bg-[#DFBF77] text-[#0C0D0E]'
                  : 'bg-[#A67C00] hover:bg-[#B8860B] text-white'
              }`}
            >
              Reserve Your Table
            </button>

            <button
              id="cta-contact-btn"
              onClick={() => {
                onNavigate('contact');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className={`w-full sm:w-auto px-8 py-4 rounded-full border text-xs font-semibold uppercase tracking-[0.22em] transition-all hover:-translate-y-0.5 cursor-pointer ${
                isDark
                  ? 'border-[#2D3139] hover:border-[#C5A059] text-[#EDE6D8]'
                  : 'border-[#D5CCBE] hover:border-[#A67C00] text-[#171717] bg-white/70'
              }`}
            >
              Contact Concierge
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

