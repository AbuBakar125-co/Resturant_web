import React, { useState } from 'react';
import { PageRoute } from '../types';
import { RESTAURANT_INFO } from '../data/restaurantData';
import { useTheme } from '../context/ThemeContext';
import { ArrowUp, Mail, Phone, MapPin, Instagram, Facebook, Compass, CheckCircle2 } from 'lucide-react';

interface FooterProps {
  onNavigate: (page: PageRoute) => void;
  onOpenReservation: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, onOpenReservation }) => {
  const { isDark } = useTheme();
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterSubscribed, setNewsletterSubscribed] = useState(false);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newsletterEmail.trim()) {
      setNewsletterSubscribed(true);
      setNewsletterEmail('');
      setTimeout(() => setNewsletterSubscribed(false), 6000);
    }
  };

  const navLinks: { label: string; page: PageRoute }[] = [
    { label: 'Home', page: 'home' },
    { label: 'About Us', page: 'about' },
    { label: 'Services & Events', page: 'services' },
    { label: 'A La Carte Menu', page: 'menu' },
    { label: 'Atmosphere Gallery', page: 'gallery' },
    { label: 'Contact & Location', page: 'contact' },
  ];

  const goldAccent = isDark ? '#C5A059' : '#A67C00';

  return (
    <footer
      id="main-footer"
      className={`border-t pt-20 pb-12 relative overflow-hidden transition-colors duration-400 ${
        isDark
          ? 'bg-[#08090A] text-[#EDE6D8] border-[#1C1E22]'
          : 'bg-[#F2ECE1] text-[#171717] border-[#E2D9CA]'
      }`}
    >
      {/* Decorative ambient subtle glow */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-[1px] pointer-events-none"
        style={{
          background: `linear-gradient(to right, transparent, ${goldAccent}60, transparent)`,
        }}
      />
      <div
        className="absolute -top-32 left-1/2 -translate-x-1/2 w-96 h-96 rounded-full blur-3xl pointer-events-none opacity-10"
        style={{ backgroundColor: goldAccent }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-16">
          {/* Column 1: Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div
                className={`w-8 h-8 rounded-full border flex items-center justify-center ${
                  isDark ? 'border-[#C5A059] bg-[#141518]' : 'border-[#A67C00] bg-[#FFFFFF]'
                }`}
              >
                <span className="font-serif text-lg font-bold" style={{ color: goldAccent }}>
                  M
                </span>
              </div>
              <span
                className={`font-serif text-2xl tracking-[0.16em] font-bold ${
                  isDark ? 'text-[#EDE6D8]' : 'text-[#171717]'
                }`}
              >
                MAISON EMBER
              </span>
            </div>
            <p
              className="text-sm font-serif italic tracking-wide"
              style={{ color: goldAccent }}
            >
              &ldquo;{RESTAURANT_INFO.tagline}&rdquo;
            </p>
            <p
              className={`text-xs leading-relaxed max-w-sm ${
                isDark ? 'text-[#B8B0A2]' : 'text-[#57534E]'
              }`}
            >
              An intimate fine dining sanctuary committed to artisanal culinary craft, wood-fired hearth mastery, and unforgettable hospitality.
            </p>
            <div className="pt-2">
              <button
                id="footer-reserve-btn"
                onClick={onOpenReservation}
                className="text-xs uppercase tracking-[0.18em] font-semibold flex items-center gap-2 group transition-colors cursor-pointer"
                style={{ color: goldAccent }}
              >
                <span>Book Your Experience</span>
                <span className="transition-transform group-hover:translate-x-1">&rarr;</span>
              </button>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="space-y-4">
            <h4
              className={`font-serif text-base tracking-[0.15em] uppercase font-semibold border-b pb-2 inline-block ${
                isDark ? 'text-[#EDE6D8] border-[#22252A]' : 'text-[#171717] border-[#DCD3C3]'
              }`}
            >
              Navigation
            </h4>
            <ul className="space-y-2.5">
              {navLinks.map((item) => (
                <li key={item.page}>
                  <button
                    id={`footer-nav-${item.page}`}
                    onClick={() => {
                      onNavigate(item.page);
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className={`text-xs uppercase tracking-wider transition-colors cursor-pointer ${
                      isDark
                        ? 'text-[#B8B0A2] hover:text-[#C5A059]'
                        : 'text-[#57534E] hover:text-[#A67C00]'
                    }`}
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Contact & Hours */}
          <div className="space-y-4">
            <h4
              className={`font-serif text-base tracking-[0.15em] uppercase font-semibold border-b pb-2 inline-block ${
                isDark ? 'text-[#EDE6D8] border-[#22252A]' : 'text-[#171717] border-[#DCD3C3]'
              }`}
            >
              Hospitality &amp; Hours
            </h4>
            <ul className={`space-y-3 text-xs ${isDark ? 'text-[#B8B0A2]' : 'text-[#57534E]'}`}>
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 shrink-0 mt-0.5" style={{ color: goldAccent }} />
                <span>{RESTAURANT_INFO.address.full}</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 shrink-0" style={{ color: goldAccent }} />
                <a
                  href={`tel:${RESTAURANT_INFO.phone}`}
                  className={isDark ? 'hover:text-[#EDE6D8]' : 'hover:text-[#171717]'}
                >
                  {RESTAURANT_INFO.phoneFormatted}
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 shrink-0" style={{ color: goldAccent }} />
                <a
                  href={`mailto:${RESTAURANT_INFO.email}`}
                  className={isDark ? 'hover:text-[#EDE6D8]' : 'hover:text-[#171717]'}
                >
                  {RESTAURANT_INFO.email}
                </a>
              </li>
            </ul>

            <div className={`pt-2 text-xs space-y-1 ${isDark ? 'text-[#8F887C]' : 'text-[#78716C]'}`}>
              <p className={`font-medium ${isDark ? 'text-[#B8B0A2]' : 'text-[#44403C]'}`}>Service Hours:</p>
              {RESTAURANT_INFO.hours.map((h, i) => (
                <p key={i}>
                  <span className={isDark ? 'text-[#EDE6D8]/80' : 'text-[#171717]/80'}>{h.days}:</span> {h.time}
                </p>
              ))}
            </div>
          </div>

          {/* Column 4: Newsletter & Socials */}
          <div className="space-y-4">
            <h4
              className={`font-serif text-base tracking-[0.15em] uppercase font-semibold border-b pb-2 inline-block ${
                isDark ? 'text-[#EDE6D8] border-[#22252A]' : 'text-[#171717] border-[#DCD3C3]'
              }`}
            >
              The Cellar Dispatch
            </h4>
            <p className={`text-xs leading-relaxed ${isDark ? 'text-[#B8B0A2]' : 'text-[#57534E]'}`}>
              Receive seasonal menu previews, rare cellar releases, and invitation-only guest chef events.
            </p>

            {newsletterSubscribed ? (
              <div
                className={`p-3 border rounded-lg flex items-center gap-2 text-xs ${
                  isDark
                    ? 'bg-[#C5A059]/15 border-[#C5A059]/40 text-[#EDE6D8]'
                    : 'bg-[#A67C00]/10 border-[#A67C00]/30 text-[#171717]'
                }`}
              >
                <CheckCircle2 className="w-4 h-4" style={{ color: goldAccent }} />
                <span>Thank you. You have been placed on our guest ledger.</span>
              </div>
            ) : (
              <form onSubmit={handleNewsletterSubmit} className="space-y-2">
                <div className="relative">
                  <input
                    id="newsletter-email-input"
                    type="email"
                    required
                    placeholder="Enter your email"
                    value={newsletterEmail}
                    onChange={(e) => setNewsletterEmail(e.target.value)}
                    className={`w-full border rounded-lg px-3.5 py-2.5 text-xs focus:outline-none transition-colors ${
                      isDark
                        ? 'bg-[#121417] border-[#262A30] text-[#EDE6D8] placeholder-[#666] focus:border-[#C5A059]'
                        : 'bg-[#FFFFFF] border-[#D5CCBE] text-[#171717] placeholder-[#888] focus:border-[#A67C00]'
                    }`}
                  />
                  <button
                    id="newsletter-submit-btn"
                    type="submit"
                    className={`absolute right-1 top-1 bottom-1 px-3 font-semibold text-xs rounded transition-colors ${
                      isDark
                        ? 'bg-[#C5A059] hover:bg-[#DFC27F] text-[#0C0D0E]'
                        : 'bg-[#A67C00] hover:bg-[#B8860B] text-[#FFFFFF]'
                    }`}
                  >
                    Join
                  </button>
                </div>
              </form>
            )}

            <div className="pt-3">
              <p className={`text-xs uppercase tracking-wider mb-2.5 ${isDark ? 'text-[#8F887C]' : 'text-[#78716C]'}`}>
                Follow Us
              </p>
              <div className="flex items-center gap-3">
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noreferrer"
                  className={`w-8 h-8 rounded-full border flex items-center justify-center transition-all ${
                    isDark
                      ? 'border-[#2A2E35] text-[#B8B0A2] hover:text-[#C5A059] hover:border-[#C5A059]'
                      : 'border-[#D5CCBE] bg-white text-[#57534E] hover:text-[#A67C00] hover:border-[#A67C00] shadow-sm'
                  }`}
                  aria-label="Instagram"
                >
                  <Instagram className="w-4 h-4" />
                </a>
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noreferrer"
                  className={`w-8 h-8 rounded-full border flex items-center justify-center transition-all ${
                    isDark
                      ? 'border-[#2A2E35] text-[#B8B0A2] hover:text-[#C5A059] hover:border-[#C5A059]'
                      : 'border-[#D5CCBE] bg-white text-[#57534E] hover:text-[#A67C00] hover:border-[#A67C00] shadow-sm'
                  }`}
                  aria-label="Facebook"
                >
                  <Facebook className="w-4 h-4" />
                </a>
                <a
                  href="https://tiktok.com"
                  target="_blank"
                  rel="noreferrer"
                  className={`w-8 h-8 rounded-full border flex items-center justify-center transition-all ${
                    isDark
                      ? 'border-[#2A2E35] text-[#B8B0A2] hover:text-[#C5A059] hover:border-[#C5A059]'
                      : 'border-[#D5CCBE] bg-white text-[#57534E] hover:text-[#A67C00] hover:border-[#A67C00] shadow-sm'
                  }`}
                  aria-label="TikTok"
                >
                  <Compass className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div
          className={`pt-8 border-t flex flex-col sm:row items-center justify-between gap-4 text-xs ${
            isDark ? 'border-[#1C1E22] text-[#7A7468]' : 'border-[#E2D9CA] text-[#78716C]'
          }`}
        >
          <p>© 2026 Maison Ember. All Rights Reserved.</p>
          <div className="flex items-center gap-6">
            <span>Valet Parking Available</span>
            <span>&bull;</span>
            <span>Smart Elegant Dress Code</span>
          </div>
          <button
            id="back-to-top-btn"
            onClick={scrollToTop}
            className={`flex items-center gap-1.5 text-xs transition-colors cursor-pointer group ${
              isDark ? 'text-[#B8B0A2] hover:text-[#C5A059]' : 'text-[#57534E] hover:text-[#A67C00]'
            }`}
          >
            <span>Back to Top</span>
            <div
              className={`w-6 h-6 rounded-full border flex items-center justify-center transition-colors ${
                isDark
                  ? 'border-[#282B30] group-hover:border-[#C5A059]'
                  : 'border-[#D5CCBE] bg-white group-hover:border-[#A67C00]'
              }`}
            >
              <ArrowUp className="w-3 h-3 group-hover:-translate-y-0.5 transition-transform" />
            </div>
          </button>
        </div>
      </div>
    </footer>
  );
};

