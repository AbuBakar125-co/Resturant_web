import React from 'react';
import { PageRoute } from '../types';
import { useTheme } from '../context/ThemeContext';
import { ChevronRight, Home as HomeIcon } from 'lucide-react';

interface PageHeroProps {
  image: string;
  imageAlt: string;
  badgeIcon?: React.ReactNode;
  badgeLabel: string;
  title: React.ReactNode;
  quote?: string;
  description: string;
  breadcrumbLabel: string;
  onNavigate: (page: PageRoute) => void;
}

/**
 * Shared cinematic hero for every secondary page (About, Services, Menu,
 * Gallery, Contact) — full-opacity photo, a layered dark scrim tuned for
 * text contrast without crushing the image, a slow continuous Ken Burns
 * zoom (`img-kenburns`) plus a scroll-linked parallax drift
 * (`data-parallax`), and a staged label -> breadcrumb -> title -> quote ->
 * description reveal. One template, so every page shares Home's visual
 * identity; only the photo and copy change per page.
 */
export const PageHero: React.FC<PageHeroProps> = ({
  image,
  imageAlt,
  badgeIcon,
  badgeLabel,
  title,
  quote,
  description,
  breadcrumbLabel,
  onNavigate,
}) => {
  const { isDark } = useTheme();
  const goldAccent = isDark ? '#C5A059' : '#A67C00';

  const goHome = () => {
    onNavigate('home');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <section
      className="relative py-28 sm:py-40 min-h-[520px] overflow-hidden border-b border-black/20"
      aria-label={`${breadcrumbLabel} page introduction`}
    >
      {/* Full-bleed photo: slow autonomous zoom + scroll-linked drift */}
      <div className="absolute inset-0 z-0 overflow-hidden" data-parallax="0.05">
        <img
          src={image}
          alt={imageAlt}
          className="img-kenburns w-full h-full object-cover"
        />
      </div>

      {/* Layered scrim: enough contrast for white text, never a flat block */}
      <div className="absolute inset-0 bg-black/40" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-black/25" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_transparent_35%,_rgba(0,0,0,0.45)_100%)]" />

      <div
        className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-5"
        data-reveal-group
      >
        {/* Breadcrumb */}
        <nav
          data-reveal="up"
          aria-label="Breadcrumb"
          className="flex items-center justify-center gap-1.5 text-[11px] uppercase tracking-[0.2em] text-[#EDE6D8]/60"
        >
          <button
            onClick={goHome}
            className="flex items-center gap-1 hover:text-[#EDE6D8] transition-colors cursor-pointer"
          >
            <HomeIcon className="w-3 h-3" />
            <span>Home</span>
          </button>
          <ChevronRight className="w-3 h-3" />
          <span style={{ color: goldAccent }}>{breadcrumbLabel}</span>
        </nav>

        <div
          data-reveal="up"
          className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border backdrop-blur-md border-[#EDE6D8]/25 bg-black/35"
          style={{ color: goldAccent }}
        >
          {badgeIcon}
          <span className="text-xs uppercase tracking-[0.25em] font-medium">
            {badgeLabel}
          </span>
        </div>

        <h1
          data-reveal="up"
          className="font-serif text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-[#F5EFE6]"
        >
          {title}
        </h1>

        {quote && (
          <p
            data-reveal="up"
            className="font-serif italic text-xl sm:text-2xl max-w-2xl mx-auto"
            style={{ color: goldAccent }}
          >
            &ldquo;{quote}&rdquo;
          </p>
        )}

        <p
          data-reveal="fade"
          className="text-sm sm:text-base max-w-xl mx-auto leading-relaxed font-light text-[#D8D1C4]"
        >
          {description}
        </p>
      </div>
    </section>
  );
};
