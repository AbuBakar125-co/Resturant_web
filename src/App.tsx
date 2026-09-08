import React, { useState, useEffect } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { PageRoute } from './types';
import { ThemeProvider, useTheme } from './context/ThemeContext';
import { useImageAnimations } from './hooks/useImageAnimations';
import { useScrollReveal } from './hooks/useScrollReveal';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { ReservationModal } from './components/ReservationModal';
import { LoadingScreen } from './components/LoadingScreen';
import { ScrollProgressBar } from './components/ScrollProgressBar';
import { HomePage } from './pages/HomePage';
import { AboutPage } from './pages/AboutPage';
import { ServicesPage } from './pages/ServicesPage';
import { MenuPage } from './pages/MenuPage';
import { GalleryPage } from './pages/GalleryPage';
import { ContactPage } from './pages/ContactPage';

function AppContent() {
  const { isDark } = useTheme();
  const [currentPage, setCurrentPage] = useState<PageRoute>('home');
  const [reservationModalOpen, setReservationModalOpen] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  // Site-wide subtle image animations (reveal on scroll + gentle parallax)
  useImageAnimations(currentPage);

  // Site-wide scroll-triggered reveals for headings, copy, cards & layout blocks
  useScrollReveal(currentPage);

  // Sync initial route with pathname or hash
  useEffect(() => {
    const parseRoute = (): PageRoute => {
      const path = window.location.pathname.replace(/^\//, '').toLowerCase();
      const hash = window.location.hash.replace(/^#\/?/, '').toLowerCase();
      const target = hash || path;

      if (['about', 'services', 'menu', 'gallery', 'contact'].includes(target)) {
        return target as PageRoute;
      }
      return 'home';
    };

    setCurrentPage(parseRoute());

    const handlePopState = () => {
      setCurrentPage(parseRoute());
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Update document title dynamically based on current page
  useEffect(() => {
    const titles: Record<PageRoute, string> = {
      home: 'Maison Ember | Fine Dining & Luxury Restaurant',
      about: 'Our Story & Philosophy | Maison Ember',
      services: 'Bespoke Services & Private Dining | Maison Ember',
      menu: 'Seasonal Tasting & Carte Du Jour | Maison Ember',
      gallery: 'Visual Atmosphere & Chronicle | Maison Ember',
      contact: 'Reservations & Guest Concierge | Maison Ember',
    };
    document.title = titles[currentPage] || 'Maison Ember';
  }, [currentPage]);

  const handleNavigate = (page: PageRoute) => {
    setCurrentPage(page);
    // Push state so URL matches
    const newPath = page === 'home' ? '/' : `/${page}`;
    if (window.location.pathname !== newPath) {
      window.history.pushState({}, '', newPath);
    }
  };

  return (
    <div
      className={`min-h-screen font-sans antialiased flex flex-col justify-between transition-colors duration-400 ${
        isDark
          ? 'bg-[#0C0D0E] text-[#EDE6D8] selection:bg-[#C5A059] selection:text-black'
          : 'bg-[#FAF8F3] text-[#171717] selection:bg-[#A67C00] selection:text-white'
      }`}
    >
      {/* Skip to Content for Accessibility */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 z-[999] px-4 py-2 bg-[#C5A059] text-black text-xs uppercase tracking-widest font-bold rounded"
      >
        Skip to main content
      </a>

      {/* Loading Splash */}
      <LoadingScreen />

      {/* Thin scroll-position indicator */}
      <ScrollProgressBar routeKey={currentPage} />

      {/* Global Luxury Navigation Header */}
      <Header
        currentPage={currentPage}
        onNavigate={handleNavigate}
        onOpenReservation={() => setReservationModalOpen(true)}
      />

      {/* Main Routed Page Content */}
      <main id="main-content" className="flex-1">
        <motion.div
          key={currentPage}
          initial={prefersReducedMotion ? undefined : { opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        >
        {currentPage === 'home' && (
          <HomePage
            onNavigate={handleNavigate}
            onOpenReservation={() => setReservationModalOpen(true)}
          />
        )}
        {currentPage === 'about' && (
          <AboutPage
            onNavigate={handleNavigate}
            onOpenReservation={() => setReservationModalOpen(true)}
          />
        )}
        {currentPage === 'services' && (
          <ServicesPage
            onNavigate={handleNavigate}
            onOpenReservation={() => setReservationModalOpen(true)}
          />
        )}
        {currentPage === 'menu' && (
          <MenuPage
            onNavigate={handleNavigate}
            onOpenReservation={() => setReservationModalOpen(true)}
          />
        )}
        {currentPage === 'gallery' && (
          <GalleryPage
            onNavigate={handleNavigate}
            onOpenReservation={() => setReservationModalOpen(true)}
          />
        )}
        {currentPage === 'contact' && (
          <ContactPage
            onNavigate={handleNavigate}
            onOpenReservation={() => setReservationModalOpen(true)}
          />
        )}
        </motion.div>
      </main>

      {/* Global Footer */}
      <Footer
        onNavigate={handleNavigate}
        onOpenReservation={() => setReservationModalOpen(true)}
      />

      {/* Reservation Experience Modal */}
      <ReservationModal
        isOpen={reservationModalOpen}
        onClose={() => setReservationModalOpen(false)}
      />
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}

