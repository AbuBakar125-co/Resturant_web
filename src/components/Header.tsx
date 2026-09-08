import React, { useState, useEffect } from 'react';
import { PageRoute } from '../types';
import { useTheme } from '../context/ThemeContext';
import { ThemeToggle } from './ThemeToggle';
import { Menu, X, Calendar, Sparkles } from 'lucide-react';

interface HeaderProps {
  currentPage: PageRoute;
  onNavigate: (page: PageRoute) => void;
  onOpenReservation: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentPage,
  onNavigate,
  onOpenReservation,
}) => {
  const { isDark } = useTheme();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks: { label: string; page: PageRoute }[] = [
    { label: 'Home', page: 'home' },
    { label: 'About', page: 'about' },
    { label: 'Services', page: 'services' },
    { label: 'Menu', page: 'menu' },
    { label: 'Gallery', page: 'gallery' },
    { label: 'Contact', page: 'contact' },
  ];

  const handleNavClick = (page: PageRoute) => {
    onNavigate(page);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Header styling when scrolled vs transparent top
  const headerBgClass = isScrolled
    ? isDark
      ? 'bg-[#0C0D0E]/95 backdrop-blur-md py-3.5 border-b border-[#25282C]/70 shadow-2xl shadow-black/40'
      : 'bg-[#FAF8F3]/95 backdrop-blur-md py-3.5 border-b border-[#E8E2D6] shadow-sm shadow-black/5'
    : 'bg-gradient-to-b from-black/80 via-black/40 to-transparent py-5';

  const logoTextClass = isScrolled && !isDark
    ? 'text-[#171717] group-hover:text-[#A67C00]'
    : 'text-[#EDE6D8] group-hover:text-[#C5A059]';

  const subLogoClass = isScrolled && !isDark
    ? 'text-[#78716C]'
    : 'text-[#B8B0A2]/80';

  const goldAccent = isDark ? '#C5A059' : '#A67C00';

  return (
    <header
      id="main-header"
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${headerBgClass}`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand Logo */}
        <button
          id="nav-logo-btn"
          onClick={() => handleNavClick('home')}
          className="group flex items-center gap-3 text-left cursor-pointer focus:outline-none"
        >
          <div
            className={`w-9 h-9 rounded-full border flex items-center justify-center transition-all duration-300 ${
              isScrolled && !isDark
                ? 'border-[#A67C00]/40 bg-[#FAF8F3] group-hover:border-[#A67C00] shadow-sm'
                : 'border-[#C5A059]/40 bg-[#141518]/70 group-hover:border-[#C5A059] group-hover:shadow-[0_0_15px_rgba(197,160,89,0.3)]'
            }`}
          >
            <span
              className="font-serif text-xl font-bold tracking-tighter"
              style={{ color: goldAccent }}
            >
              M
            </span>
          </div>
          <div>
            <span
              className={`block whitespace-nowrap font-serif text-base tracking-[0.1em] sm:text-xl sm:tracking-[0.15em] md:text-2xl md:tracking-[0.18em] font-bold transition-colors ${logoTextClass}`}
            >
              MAISON EMBER
            </span>
            <span
              className={`hidden sm:block whitespace-nowrap text-[10px] uppercase tracking-[0.3em] -mt-0.5 font-sans font-medium transition-colors ${subLogoClass}`}
            >
              Fine Dining &bull; City Center
            </span>
          </div>
        </button>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8" aria-label="Main Navigation">
          {navLinks.map((item) => {
            const isActive = currentPage === item.page;
            const linkColor = isActive
              ? isDark
                ? 'text-[#C5A059] font-semibold'
                : 'text-[#A67C00] font-semibold'
              : isScrolled && !isDark
              ? 'text-[#4A443C] hover:text-[#171717]'
              : 'text-[#EDE6D8]/80 hover:text-[#EDE6D8]';

            return (
              <button
                key={item.page}
                id={`nav-link-${item.page}`}
                onClick={() => handleNavClick(item.page)}
                className={`relative py-1 text-sm tracking-[0.15em] uppercase font-sans font-medium transition-all duration-300 cursor-pointer ${linkColor}`}
              >
                {item.label}
                {isActive && (
                  <span
                    className="absolute bottom-0 left-0 w-full h-[2px] rounded-full"
                    style={{
                      backgroundColor: goldAccent,
                      boxShadow: `0 0 8px ${goldAccent}`,
                    }}
                  />
                )}
              </button>
            );
          })}
        </nav>

        {/* Action Button & Theme Toggle */}
        <div className="hidden md:flex items-center gap-4">
          {/* Theme Toggle (Circular compact) */}
          <ThemeToggle id="header-theme-toggle" />

          {/* Reserve a Table CTA */}
          <button
            id="header-reserve-btn"
            onClick={onOpenReservation}
            className={`relative group overflow-hidden px-5 py-2.5 rounded-full border text-xs font-semibold uppercase tracking-[0.18em] transition-all duration-300 flex items-center gap-2 cursor-pointer ${
              isDark
                ? 'border-[#C5A059] bg-[#C5A059]/10 hover:bg-[#C5A059] text-[#EDE6D8] hover:text-[#0C0D0E] shadow-[0_0_15px_rgba(197,160,89,0.15)] hover:shadow-[0_0_25px_rgba(197,160,89,0.4)]'
                : 'border-[#A67C00] bg-[#A67C00] hover:bg-[#B8860B] text-[#FFFFFF] shadow-md shadow-[#A67C00]/20'
            }`}
          >
            <Calendar className="w-3.5 h-3.5 transition-transform group-hover:scale-110" />
            <span>Reserve a Table</span>
          </button>
        </div>

        {/* Mobile Header Elements: Theme Toggle + Quick Reserve + Hamburger */}
        <div className="flex md:hidden items-center gap-2">
          {/* Mobile Theme Toggle */}
          <ThemeToggle id="mobile-header-theme-toggle" className="p-2" />

          <button
            id="mobile-quick-reserve"
            onClick={onOpenReservation}
            className={`px-3 py-1.5 rounded-full border text-[11px] font-semibold uppercase tracking-wider ${
              isDark
                ? 'border-[#C5A059]/60 bg-[#C5A059]/15 text-[#C5A059]'
                : 'border-[#A67C00] bg-[#A67C00] text-[#FFFFFF]'
            }`}
          >
            Reserve
          </button>

          <button
            id="mobile-menu-toggle"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className={`p-2 rounded-lg focus:outline-none cursor-pointer ${
              isScrolled && !isDark ? 'text-[#171717]' : 'text-[#EDE6D8]'
            }`}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div
          className={`anim-drawer-in md:hidden absolute inset-x-0 top-full max-h-[calc(100svh-4rem)] overflow-y-auto border-b backdrop-blur-xl shadow-2xl px-6 py-8 ${
            isDark
              ? 'bg-[#0C0D0E]/98 border-[#25282C] text-[#EDE6D8]'
              : 'bg-[#FAF8F3]/98 border-[#E8E2D6] text-[#171717]'
          }`}
        >
          <div className="flex flex-col gap-5">
            {navLinks.map((item) => {
              const isActive = currentPage === item.page;
              return (
                <button
                  key={item.page}
                  id={`mobile-nav-link-${item.page}`}
                  onClick={() => handleNavClick(item.page)}
                  className={`text-left py-2 text-base uppercase tracking-[0.2em] font-sans transition-all flex items-center justify-between cursor-pointer ${
                    isActive
                      ? isDark
                        ? 'text-[#C5A059] font-bold pl-2 border-l-2 border-[#C5A059]'
                        : 'text-[#A67C00] font-bold pl-2 border-l-2 border-[#A67C00]'
                      : isDark
                      ? 'text-[#EDE6D8]/80 hover:text-[#EDE6D8]'
                      : 'text-[#4A443C] hover:text-[#171717]'
                  }`}
                >
                  <span>{item.label}</span>
                  {isActive && <Sparkles className="w-4 h-4" style={{ color: goldAccent }} />}
                </button>
              );
            })}

            {/* Mobile Drawer Theme Selector row */}
            <div className="pt-4 border-t border-[#25282C]/20 flex items-center justify-between">
              <span className="text-xs uppercase tracking-wider font-medium text-theme-muted">
                Display Theme
              </span>
              <ThemeToggle id="mobile-drawer-theme-toggle" variant="pill" />
            </div>

            <div className="pt-4 border-t border-[#25282C]/20">
              <button
                id="mobile-drawer-reserve-btn"
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenReservation();
                }}
                className={`w-full py-3 rounded-full font-semibold text-xs uppercase tracking-[0.2em] shadow-lg flex items-center justify-center gap-2 cursor-pointer ${
                  isDark
                    ? 'bg-[#C5A059] text-[#0C0D0E] shadow-[#C5A059]/20'
                    : 'bg-[#A67C00] text-white shadow-[#A67C00]/20'
                }`}
              >
                <Calendar className="w-4 h-4" />
                <span>Reserve a Table</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

