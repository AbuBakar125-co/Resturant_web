import React, { useState } from 'react';
import { PageRoute, ServiceItem } from '../types';
import { SERVICES_LIST, RESTAURANT_INFO } from '../data/restaurantData';
import { useTheme } from '../context/ThemeContext';
import { PageHero } from '../components/PageHero';
import {
  UtensilsCrossed,
  Crown,
  Briefcase,
  Gift,
  Truck,
  GlassWater,
  CheckCircle2,
  Users,
  X,
  Phone,
  ArrowRight,
  Mail,
  Sparkles
} from 'lucide-react';

interface ServicesPageProps {
  onNavigate: (page: PageRoute) => void;
  onOpenReservation: () => void;
}

export const ServicesPage: React.FC<ServicesPageProps> = ({ onNavigate, onOpenReservation }) => {
  const { isDark } = useTheme();
  const goldAccent = isDark ? '#C5A059' : '#A67C00';
  const [selectedService, setSelectedService] = useState<ServiceItem | null>(null);

  const getServiceIcon = (name: string) => {
    switch (name) {
      case 'UtensilsCrossed':
        return <UtensilsCrossed className="w-5 h-5" style={{ color: goldAccent }} />;
      case 'Crown':
        return <Crown className="w-5 h-5" style={{ color: goldAccent }} />;
      case 'Briefcase':
        return <Briefcase className="w-5 h-5" style={{ color: goldAccent }} />;
      case 'Gift':
        return <Gift className="w-5 h-5" style={{ color: goldAccent }} />;
      case 'Truck':
        return <Truck className="w-5 h-5" style={{ color: goldAccent }} />;
      case 'GlassWater':
        return <GlassWater className="w-5 h-5" style={{ color: goldAccent }} />;
      default:
        return <UtensilsCrossed className="w-5 h-5" style={{ color: goldAccent }} />;
    }
  };

  return (
    <div
      className={`transition-colors duration-400 ${
        isDark ? 'bg-[#0C0D0E] text-[#EDE6D8]' : 'bg-[#FAF8F3] text-[#171717]'
      }`}
    >
      {/* 1. HERO SECTION */}
      <PageHero
        image="https://images.unsplash.com/photo-1511795409834-ef04bbd61622?q=80&w=2000&auto=format&fit=crop"
        imageAlt="An elegant long fine-dining table set with crystal glassware and fresh floral arrangements"
        badgeIcon={<Sparkles className="w-3.5 h-3.5" />}
        badgeLabel="Hospitality & Gatherings"
        title={
          <>
            Exceptional Dining, <br className="hidden sm:inline" />
            <span className="italic" style={{ color: goldAccent }}>
              Every Occasion
            </span>
          </>
        }
        description="Whether an intimate dinner for two, a landmark birthday, or an exclusive restaurant buyout, we craft bespoke culinary experiences tailored to your vision."
        breadcrumbLabel="Services"
        onNavigate={onNavigate}
      />

      {/* 2. SERVICES GRID */}
      <section className="py-24 sm:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" data-reveal-group>
            {SERVICES_LIST.map((service) => (
              <div
                key={service.id}
                id={`service-card-${service.id}`}
                data-reveal="up"
                className={`group relative rounded-2xl overflow-hidden border transition-all duration-500 hover:-translate-y-2 flex flex-col justify-between shadow-lg ${
                  isDark
                    ? 'bg-[#121417] border-[#22252D] hover:border-[#C5A059]/60 hover:shadow-2xl hover:shadow-[#C5A059]/10'
                    : 'bg-white border-[#E2D9CA] hover:border-[#A67C00]/60 shadow-stone-200/60 hover:shadow-xl'
                }`}
              >
                {/* Image & Icon Header */}
                <div className="relative h-60 overflow-hidden bg-black">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-80"
                    loading="lazy"
                  />
                  <div
                    className={`absolute inset-0 ${
                      isDark
                        ? 'bg-gradient-to-t from-[#121417] via-transparent to-black/40'
                        : 'bg-gradient-to-t from-white via-transparent to-black/40'
                    }`}
                  />

                  {/* Icon badge */}
                  <div
                    className={`reveal-icon absolute top-4 left-4 w-10 h-10 rounded-xl border backdrop-blur-md flex items-center justify-center transition-transform group-hover:scale-110 group-hover:-rotate-3 ${
                      isDark
                        ? 'bg-[#181A1F]/90 border-[#2D313A]'
                        : 'bg-white/90 border-[#E2D9CA] shadow-sm'
                    }`}
                  >
                    {getServiceIcon(service.iconName)}
                  </div>

                  {service.capacity && (
                    <div
                      className="absolute top-4 right-4 px-3 py-1 rounded-full bg-black/75 backdrop-blur-md border border-white/10 text-[10px] uppercase tracking-wider flex items-center gap-1.5 font-medium"
                      style={{ color: goldAccent }}
                    >
                      <Users className="w-3 h-3" style={{ color: goldAccent }} />
                      <span>{service.capacity}</span>
                    </div>
                  )}
                </div>

                {/* Body Content */}
                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    <p
                      className="text-[11px] uppercase tracking-[0.2em] font-medium"
                      style={{ color: goldAccent }}
                    >
                      {service.tagline}
                    </p>
                    <h3
                      className={`font-serif text-2xl font-bold transition-colors ${
                        isDark
                          ? 'text-[#EDE6D8] group-hover:text-[#C5A059]'
                          : 'text-[#171717] group-hover:text-[#A67C00]'
                      }`}
                    >
                      {service.title}
                    </h3>
                    <p
                      className={`text-xs leading-relaxed ${
                        isDark ? 'text-[#8F887C]' : 'text-[#78716C]'
                      }`}
                    >
                      {service.description}
                    </p>
                  </div>

                  {/* Highlights preview */}
                  <ul
                    className={`space-y-1.5 pt-2 border-t text-xs ${
                      isDark ? 'border-[#1F2228] text-[#B8B0A2]' : 'border-[#E8E2D6] text-[#57534E]'
                    }`}
                  >
                    {service.features.slice(0, 3).map((f, i) => (
                      <li key={i} className="flex items-center gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 shrink-0" style={{ color: goldAccent }} />
                        <span className="truncate">{f}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Action */}
                  <div className="pt-2">
                    <button
                      id={`learn-more-${service.id}`}
                      onClick={() => setSelectedService(service)}
                      className={`w-full py-2.5 rounded-xl border text-xs font-semibold uppercase tracking-[0.18em] transition-all hover:-translate-y-0.5 flex items-center justify-center gap-2 cursor-pointer ${
                        isDark
                          ? 'border-[#2B2F38] hover:border-[#C5A059] bg-[#16181D] hover:bg-[#C5A059] text-[#EDE6D8] hover:text-[#0C0D0E]'
                          : 'border-[#E2D9CA] hover:border-[#A67C00] bg-[#F4EFE6] hover:bg-[#A67C00] text-[#171717] hover:text-white'
                      }`}
                    >
                      <span>Learn More &amp; Inquire</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. PRIVATE EVENT CONCIERGE BANNER */}
      <section
        className={`py-20 border-t transition-colors duration-400 ${
          isDark
            ? 'bg-[#0E1013] border-[#1C1F25]'
            : 'bg-[#F4EFE6] border-[#E2D9CA]'
        }`}
      >
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div
            data-reveal-group
            className={`p-8 sm:p-12 rounded-3xl border flex flex-col md:flex-row items-center justify-between gap-8 text-center md:text-left shadow-lg ${
              isDark
                ? 'bg-[#14161B] border-[#2B2F38]'
                : 'bg-white border-[#E2D9CA]'
            }`}
          >
            <div className="space-y-2 max-w-xl">
              <span
                data-reveal="up"
                className="text-xs uppercase tracking-[0.25em] font-medium"
                style={{ color: goldAccent }}
              >
                Dedicated Event Director
              </span>
              <h3
                data-reveal="up"
                className={`font-serif text-2xl sm:text-3xl font-bold ${
                  isDark ? 'text-[#EDE6D8]' : 'text-[#171717]'
                }`}
              >
                Planning a Bespoke Gathering?
              </h3>
              <p
                data-reveal="fade"
                className={`text-xs sm:text-sm leading-relaxed ${
                  isDark ? 'text-[#8F887C]' : 'text-[#78716C]'
                }`}
              >
                Our Private Dining Director works directly with you to craft custom tasting menus, sommelier cellar selections, floral arrangements, and personalized menu prints.
              </p>
            </div>

            <div data-reveal="scale" className="flex flex-col sm:flex-row items-center gap-4">
              <a
                href={`tel:${RESTAURANT_INFO.phone}`}
                className={`w-full sm:w-auto px-6 py-3.5 rounded-full border text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-2 transition-colors ${
                  isDark
                    ? 'border-[#2E333C] hover:border-[#C5A059] text-[#EDE6D8]'
                    : 'border-[#D5CCBE] hover:border-[#A67C00] text-[#171717] bg-[#F9F6F0]'
                }`}
              >
                <Phone className="w-4 h-4" style={{ color: goldAccent }} />
                <span>{RESTAURANT_INFO.phoneFormatted}</span>
              </a>

              <button
                onClick={() => {
                  onNavigate('contact');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className={`w-full sm:w-auto px-6 py-3.5 rounded-full text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer whitespace-nowrap ${
                  isDark
                    ? 'bg-[#C5A059] hover:bg-[#DFBF77] text-[#0C0D0E]'
                    : 'bg-[#A67C00] hover:bg-[#B8860B] text-white'
                }`}
              >
                Submit Event Inquiry
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Service Detail Modal */}
      {selectedService && (
        <div className="anim-overlay-in fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md">
          <div
            className={`anim-modal-in relative w-full max-w-2xl border rounded-2xl p-6 sm:p-8 shadow-2xl my-8 max-h-[90vh] overflow-y-auto ${
              isDark
                ? 'bg-[#111215] border-[#2D3138] text-[#EDE6D8]'
                : 'bg-white border-[#E2D9CA] text-[#171717]'
            }`}
          >
            <button
              onClick={() => setSelectedService(null)}
              className={`absolute top-4 right-4 p-2 rounded-full transition-colors cursor-pointer ${
                isDark
                  ? 'bg-[#181A1F] text-[#B8B0A2] hover:text-[#EDE6D8]'
                  : 'bg-[#F4EFE6] text-[#78716C] hover:text-[#171717]'
              }`}
            >
              <X className="w-5 h-5" />
            </button>

            <div className="space-y-6">
              <div className="h-56 rounded-xl overflow-hidden relative">
                <img
                  src={selectedService.image}
                  alt={selectedService.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <span
                    className="text-[11px] uppercase tracking-widest font-medium"
                    style={{ color: goldAccent }}
                  >
                    {selectedService.tagline}
                  </span>
                  <h3 className="font-serif text-2xl sm:text-3xl font-bold text-white">
                    {selectedService.title}
                  </h3>
                </div>
              </div>

              <p
                className={`text-sm leading-relaxed ${
                  isDark ? 'text-[#B8B0A2]' : 'text-[#57534E]'
                }`}
              >
                {selectedService.description}
              </p>

              <div className="space-y-3">
                <h4
                  className={`font-serif text-base font-bold border-b pb-2 ${
                    isDark ? 'text-[#EDE6D8] border-[#25282F]' : 'text-[#171717] border-[#E8E2D6]'
                  }`}
                >
                  What is Included:
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {selectedService.features.map((feat, idx) => (
                    <div
                      key={idx}
                      className={`flex items-center gap-2 text-xs ${
                        isDark ? 'text-[#EDE6D8]' : 'text-[#171717]'
                      }`}
                    >
                      <CheckCircle2 className="w-4 h-4 shrink-0" style={{ color: goldAccent }} />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div
                className={`p-4 rounded-xl border flex items-center justify-between ${
                  isDark
                    ? 'bg-[#16181D] border-[#282C34]'
                    : 'bg-[#FAF8F3] border-[#E2D9CA]'
                }`}
              >
                <div>
                  <p className={`text-xs ${isDark ? 'text-[#8F887C]' : 'text-[#78716C]'}`}>Seating &amp; Capacity</p>
                  <p className={`text-sm font-semibold ${isDark ? 'text-[#EDE6D8]' : 'text-[#171717]'}`}>
                    {selectedService.capacity}
                  </p>
                </div>
                <div className="text-right">
                  <p className={`text-xs ${isDark ? 'text-[#8F887C]' : 'text-[#78716C]'}`}>Availability</p>
                  <p className="text-xs font-semibold" style={{ color: goldAccent }}>
                    Advance Booking Required
                  </p>
                </div>
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  onClick={() => {
                    setSelectedService(null);
                    onOpenReservation();
                  }}
                  className={`flex-1 py-3 rounded-full font-semibold text-xs uppercase tracking-wider transition-all cursor-pointer text-center ${
                    isDark
                      ? 'bg-[#C5A059] hover:bg-[#DFBF77] text-[#0C0D0E]'
                      : 'bg-[#A67C00] hover:bg-[#B8860B] text-white'
                  }`}
                >
                  Book Table for This Service
                </button>
                <button
                  onClick={() => {
                    setSelectedService(null);
                    onNavigate('contact');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className={`px-6 py-3 rounded-full border text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer ${
                    isDark
                      ? 'border-[#2B2F38] text-[#EDE6D8] hover:border-[#C5A059]'
                      : 'border-[#D5CCBE] text-[#171717] hover:border-[#A67C00]'
                  }`}
                >
                  Send Inquiry
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
