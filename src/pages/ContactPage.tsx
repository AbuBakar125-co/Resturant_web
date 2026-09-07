import React, { useState } from 'react';
import { PageRoute, ContactFormData } from '../types';
import { RESTAURANT_INFO } from '../data/restaurantData';
import { useTheme } from '../context/ThemeContext';
import {
  Phone,
  Mail,
  Clock,
  MapPin,
  CheckCircle2,
  Calendar,
  Users,
  Send,
  Navigation,
  ShieldCheck,
  Car
} from 'lucide-react';

interface ContactPageProps {
  onNavigate: (page: PageRoute) => void;
  onOpenReservation: () => void;
}

export const ContactPage: React.FC<ContactPageProps> = () => {
  const { isDark } = useTheme();
  const goldAccent = isDark ? '#C5A059' : '#A67C00';

  const [formData, setFormData] = useState<ContactFormData>({
    fullName: '',
    email: '',
    phone: '',
    date: new Date(Date.now() + 86400000).toISOString().split('T')[0],
    guests: 2,
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [formErrors, setFormErrors] = useState<{ [key: string]: string }>({});

  const validateForm = () => {
    const errors: { [key: string]: string } = {};
    if (!formData.fullName.trim()) {
      errors.fullName = 'Please provide your full name.';
    }
    if (!formData.email.trim() || !formData.email.includes('@')) {
      errors.email = 'Please provide a valid email address.';
    }
    if (!formData.phone.trim()) {
      errors.phone = 'Please provide a valid telephone number.';
    }
    if (!formData.date) {
      errors.date = 'Please specify a preferred dining date.';
    }
    return errors;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }
    setFormErrors({});
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitSuccess(true);
      setFormData({
        fullName: '',
        email: '',
        phone: '',
        date: new Date(Date.now() + 86400000).toISOString().split('T')[0],
        guests: 2,
        message: '',
      });
    }, 900);
  };

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
            alt="Maison Ember Concierge"
            className="w-full h-full object-cover"
          />
          <div
            className={`absolute inset-0 ${
              isDark
                ? 'bg-gradient-to-t from-[#0C0D0E] via-[#0C0D0E]/80 to-black/70'
                : 'bg-gradient-to-t from-[#FAF8F3] via-[#FAF8F3]/85 to-white/70'
            }`}
          />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <div
            className={`inline-flex items-center gap-2 px-3.5 py-1 rounded-full border backdrop-blur-md ${
              isDark
                ? 'border-[#C5A059]/40 bg-[#16181D]/80 text-[#C5A059]'
                : 'border-[#A67C00]/40 bg-white/80 text-[#A67C00] shadow-sm'
            }`}
          >
            <span className="text-xs uppercase tracking-[0.25em] font-medium">
              Guest Concierge
            </span>
          </div>

          <h1
            className={`font-serif text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight ${
              isDark ? 'text-[#EDE6D8]' : 'text-[#171717]'
            }`}
          >
            Let&apos;s Make Your Visit Memorable
          </h1>

          <p
            className="font-serif italic text-xl sm:text-2xl max-w-2xl mx-auto"
            style={{ color: goldAccent }}
          >
            &ldquo;{RESTAURANT_INFO.tagline}&rdquo;
          </p>

          <p
            className={`text-sm sm:text-base max-w-xl mx-auto leading-relaxed font-light ${
              isDark ? 'text-[#B8B0A2]' : 'text-[#57534E]'
            }`}
          >
            Our guest relation team is at your disposal for table bookings, private dining inquiries, dietary arrangements, and special requests.
          </p>
        </div>
      </section>

      {/* 2. CONTACT INFO & RESERVATION FORM */}
      <section className="py-20 sm:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
            {/* Left: Contact Info Cards */}
            <div className="lg:col-span-5 space-y-8">
              <div>
                <span
                  className="text-xs uppercase tracking-[0.25em] font-semibold"
                  style={{ color: goldAccent }}
                >
                  DIRECT CONTACT
                </span>
                <h2
                  className={`font-serif text-3xl font-bold mt-1 ${
                    isDark ? 'text-[#EDE6D8]' : 'text-[#171717]'
                  }`}
                >
                  Get in Touch
                </h2>
                <p
                  className={`text-xs mt-2 leading-relaxed ${
                    isDark ? 'text-[#8F887C]' : 'text-[#78716C]'
                  }`}
                >
                  Connect with our dining concierge directly by phone, email, or through the reservation ledger.
                </p>
              </div>

              {/* Info Tiles */}
              <div className="space-y-4">
                {/* Phone */}
                <div
                  className={`p-5 rounded-2xl border flex items-start gap-4 transition-all ${
                    isDark
                      ? 'bg-[#131518] border-[#22252C]'
                      : 'bg-white border-[#E2D9CA] shadow-sm'
                  }`}
                >
                  <div
                    className={`w-10 h-10 rounded-xl border flex items-center justify-center shrink-0 mt-0.5 ${
                      isDark
                        ? 'bg-[#1A1D23] border-[#2F343E] text-[#C5A059]'
                        : 'bg-[#F9F6F0] border-[#E5DEC9] text-[#A67C00]'
                    }`}
                  >
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <p
                      className={`text-xs uppercase tracking-wider ${
                        isDark ? 'text-[#8F887C]' : 'text-[#78716C]'
                      }`}
                    >
                      Phone
                    </p>
                    <a
                      href={`tel:${RESTAURANT_INFO.phone}`}
                      className={`font-serif text-lg font-bold transition-colors ${
                        isDark
                          ? 'text-[#EDE6D8] hover:text-[#C5A059]'
                          : 'text-[#171717] hover:text-[#A67C00]'
                      }`}
                    >
                      {RESTAURANT_INFO.phone}
                    </a>
                    <p className={`text-[11px] mt-0.5 ${isDark ? 'text-[#666]' : 'text-[#888]'}`}>
                      Call anytime during dining hours
                    </p>
                  </div>
                </div>

                {/* Email */}
                <div
                  className={`p-5 rounded-2xl border flex items-start gap-4 transition-all ${
                    isDark
                      ? 'bg-[#131518] border-[#22252C]'
                      : 'bg-white border-[#E2D9CA] shadow-sm'
                  }`}
                >
                  <div
                    className={`w-10 h-10 rounded-xl border flex items-center justify-center shrink-0 mt-0.5 ${
                      isDark
                        ? 'bg-[#1A1D23] border-[#2F343E] text-[#C5A059]'
                        : 'bg-[#F9F6F0] border-[#E5DEC9] text-[#A67C00]'
                    }`}
                  >
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <p
                      className={`text-xs uppercase tracking-wider ${
                        isDark ? 'text-[#8F887C]' : 'text-[#78716C]'
                      }`}
                    >
                      Email
                    </p>
                    <a
                      href={`mailto:${RESTAURANT_INFO.email}`}
                      className={`font-serif text-base sm:text-lg font-bold transition-colors ${
                        isDark
                          ? 'text-[#EDE6D8] hover:text-[#C5A059]'
                          : 'text-[#171717] hover:text-[#A67C00]'
                      }`}
                    >
                      {RESTAURANT_INFO.email}
                    </a>
                    <p className={`text-[11px] mt-0.5 ${isDark ? 'text-[#666]' : 'text-[#888]'}`}>
                      Prompt response within 2 hours
                    </p>
                  </div>
                </div>

                {/* Opening Hours */}
                <div
                  className={`p-5 rounded-2xl border flex items-start gap-4 transition-all ${
                    isDark
                      ? 'bg-[#131518] border-[#22252C]'
                      : 'bg-white border-[#E2D9CA] shadow-sm'
                  }`}
                >
                  <div
                    className={`w-10 h-10 rounded-xl border flex items-center justify-center shrink-0 mt-0.5 ${
                      isDark
                        ? 'bg-[#1A1D23] border-[#2F343E] text-[#C5A059]'
                        : 'bg-[#F9F6F0] border-[#E5DEC9] text-[#A67C00]'
                    }`}
                  >
                    <Clock className="w-5 h-5" />
                  </div>
                  <div className="w-full">
                    <p
                      className={`text-xs uppercase tracking-wider mb-2 ${
                        isDark ? 'text-[#8F887C]' : 'text-[#78716C]'
                      }`}
                    >
                      Opening Hours
                    </p>
                    <div className="space-y-1.5 text-xs">
                      {RESTAURANT_INFO.hours.map((h, i) => (
                        <div
                          key={i}
                          className={`flex items-center justify-between border-b pb-1 ${
                            isDark ? 'border-[#1D2026]' : 'border-[#F0EAE1]'
                          }`}
                        >
                          <span
                            className={`font-medium ${
                              isDark ? 'text-[#EDE6D8]' : 'text-[#171717]'
                            }`}
                          >
                            {h.days}
                          </span>
                          <span style={{ color: goldAccent }}>{h.time}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Address */}
                <div
                  className={`p-5 rounded-2xl border flex items-start gap-4 transition-all ${
                    isDark
                      ? 'bg-[#131518] border-[#22252C]'
                      : 'bg-white border-[#E2D9CA] shadow-sm'
                  }`}
                >
                  <div
                    className={`w-10 h-10 rounded-xl border flex items-center justify-center shrink-0 mt-0.5 ${
                      isDark
                        ? 'bg-[#1A1D23] border-[#2F343E] text-[#C5A059]'
                        : 'bg-[#F9F6F0] border-[#E5DEC9] text-[#A67C00]'
                    }`}
                  >
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <p
                      className={`text-xs uppercase tracking-wider ${
                        isDark ? 'text-[#8F887C]' : 'text-[#78716C]'
                      }`}
                    >
                      Address
                    </p>
                    <p
                      className={`font-serif text-base font-bold ${
                        isDark ? 'text-[#EDE6D8]' : 'text-[#171717]'
                      }`}
                    >
                      Maison Ember
                    </p>
                    <p
                      className={`text-xs mt-0.5 ${
                        isDark ? 'text-[#B8B0A2]' : 'text-[#57534E]'
                      }`}
                    >
                      {RESTAURANT_INFO.address.street}, {RESTAURANT_INFO.address.city}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Contact Form */}
            <div className="lg:col-span-7">
              <div
                className={`p-8 sm:p-10 rounded-3xl border shadow-2xl relative transition-all ${
                  isDark
                    ? 'bg-[#121417] border-[#252932]'
                    : 'bg-white border-[#E2D9CA]'
                }`}
              >
                <div className="mb-6 space-y-1.5">
                  <span
                    className="text-xs uppercase tracking-[0.25em] font-semibold"
                    style={{ color: goldAccent }}
                  >
                    RESERVATION REQUEST
                  </span>
                  <h3
                    className={`font-serif text-2xl sm:text-3xl font-bold ${
                      isDark ? 'text-[#EDE6D8]' : 'text-[#171717]'
                    }`}
                  >
                    Send Us Your Dining Inquiry
                  </h3>
                  <p
                    className={`text-xs ${
                      isDark ? 'text-[#8F887C]' : 'text-[#78716C]'
                    }`}
                  >
                    Fill out the details below and our Maître d&apos; will promptly confirm your table.
                  </p>
                </div>

                {submitSuccess ? (
                  <div className="py-12 text-center space-y-4">
                    <div
                      className={`w-14 h-14 rounded-full border flex items-center justify-center mx-auto ${
                        isDark
                          ? 'bg-[#C5A059]/20 border-[#C5A059] text-[#C5A059]'
                          : 'bg-[#A67C00]/15 border-[#A67C00] text-[#A67C00]'
                      }`}
                    >
                      <CheckCircle2 className="w-8 h-8" />
                    </div>
                    <h4
                      className={`font-serif text-2xl font-bold ${
                        isDark ? 'text-[#EDE6D8]' : 'text-[#171717]'
                      }`}
                    >
                      Request Received With Honor
                    </h4>
                    <p
                      className={`text-xs max-w-md mx-auto leading-relaxed ${
                        isDark ? 'text-[#B8B0A2]' : 'text-[#57534E]'
                      }`}
                    >
                      Thank you for contacting Maison Ember. Our concierge will review your reservation preferences and reach out shortly at{' '}
                      <strong style={{ color: goldAccent }}>{RESTAURANT_INFO.phoneFormatted}</strong>.
                    </p>
                    <button
                      onClick={() => setSubmitSuccess(false)}
                      className={`px-6 py-2.5 rounded-full border text-xs uppercase tracking-wider transition-all cursor-pointer ${
                        isDark
                          ? 'bg-[#1A1D24] border-[#2B2F38] text-[#EDE6D8] hover:border-[#C5A059]'
                          : 'bg-[#F5EFE6] border-[#D5CCBE] text-[#171717] hover:border-[#A67C00]'
                      }`}
                    >
                      Submit Another Request
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Full Name */}
                    <div>
                      <label
                        className={`block text-xs uppercase tracking-wider mb-1 font-medium ${
                          isDark ? 'text-[#B8B0A2]' : 'text-[#57534E]'
                        }`}
                      >
                        Full Name *
                      </label>
                      <input
                        id="contact-form-name"
                        type="text"
                        placeholder="e.g. Lady Vivienne Montgomery"
                        value={formData.fullName}
                        onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                        className={`w-full rounded-xl px-4 py-3 text-xs transition-all focus:outline-none ${
                          isDark
                            ? 'bg-[#181A1F] text-[#EDE6D8] placeholder-[#555]'
                            : 'bg-[#FAF8F3] text-[#171717] placeholder-[#888]'
                        } ${
                          formErrors.fullName
                            ? 'border border-red-500 focus:border-red-500'
                            : isDark
                            ? 'border border-[#292D35] focus:border-[#C5A059]'
                            : 'border border-[#D5CCBE] focus:border-[#A67C00]'
                        }`}
                      />
                      {formErrors.fullName && (
                        <p className="text-[11px] text-red-500 mt-1">{formErrors.fullName}</p>
                      )}
                    </div>

                    {/* Email & Phone */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label
                          className={`block text-xs uppercase tracking-wider mb-1 font-medium ${
                            isDark ? 'text-[#B8B0A2]' : 'text-[#57534E]'
                          }`}
                        >
                          Email Address *
                        </label>
                        <input
                          id="contact-form-email"
                          type="email"
                          placeholder="e.g. guest@domain.com"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          className={`w-full rounded-xl px-4 py-3 text-xs transition-all focus:outline-none ${
                            isDark
                              ? 'bg-[#181A1F] text-[#EDE6D8] placeholder-[#555]'
                              : 'bg-[#FAF8F3] text-[#171717] placeholder-[#888]'
                          } ${
                            formErrors.email
                              ? 'border border-red-500 focus:border-red-500'
                              : isDark
                              ? 'border border-[#292D35] focus:border-[#C5A059]'
                              : 'border border-[#D5CCBE] focus:border-[#A67C00]'
                          }`}
                        />
                        {formErrors.email && (
                          <p className="text-[11px] text-red-500 mt-1">{formErrors.email}</p>
                        )}
                      </div>

                      <div>
                        <label
                          className={`block text-xs uppercase tracking-wider mb-1 font-medium ${
                            isDark ? 'text-[#B8B0A2]' : 'text-[#57534E]'
                          }`}
                        >
                          Phone Number *
                        </label>
                        <input
                          id="contact-form-phone"
                          type="tel"
                          placeholder="e.g. 1234567890"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          className={`w-full rounded-xl px-4 py-3 text-xs transition-all focus:outline-none ${
                            isDark
                              ? 'bg-[#181A1F] text-[#EDE6D8] placeholder-[#555]'
                              : 'bg-[#FAF8F3] text-[#171717] placeholder-[#888]'
                          } ${
                            formErrors.phone
                              ? 'border border-red-500 focus:border-red-500'
                              : isDark
                              ? 'border border-[#292D35] focus:border-[#C5A059]'
                              : 'border border-[#D5CCBE] focus:border-[#A67C00]'
                          }`}
                        />
                        {formErrors.phone && (
                          <p className="text-[11px] text-red-500 mt-1">{formErrors.phone}</p>
                        )}
                      </div>
                    </div>

                    {/* Date & Guests */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label
                          className={`block text-xs uppercase tracking-wider mb-1 font-medium ${
                            isDark ? 'text-[#B8B0A2]' : 'text-[#57534E]'
                          }`}
                        >
                          Preferred Date *
                        </label>
                        <input
                          id="contact-form-date"
                          type="date"
                          min={new Date().toISOString().split('T')[0]}
                          value={formData.date}
                          onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                          className={`w-full rounded-xl px-4 py-3 text-xs focus:outline-none transition-colors ${
                            isDark
                              ? 'bg-[#181A1F] border border-[#292D35] text-[#EDE6D8] focus:border-[#C5A059]'
                              : 'bg-[#FAF8F3] border border-[#D5CCBE] text-[#171717] focus:border-[#A67C00]'
                          }`}
                        />
                      </div>

                      <div>
                        <label
                          className={`block text-xs uppercase tracking-wider mb-1 font-medium ${
                            isDark ? 'text-[#B8B0A2]' : 'text-[#57534E]'
                          }`}
                        >
                          Number of Guests
                        </label>
                        <select
                          id="contact-form-guests"
                          value={formData.guests}
                          onChange={(e) => setFormData({ ...formData, guests: Number(e.target.value) })}
                          className={`w-full rounded-xl px-4 py-3 text-xs focus:outline-none transition-colors ${
                            isDark
                              ? 'bg-[#181A1F] border border-[#292D35] text-[#EDE6D8] focus:border-[#C5A059]'
                              : 'bg-[#FAF8F3] border border-[#D5CCBE] text-[#171717] focus:border-[#A67C00]'
                          }`}
                        >
                          {[1, 2, 3, 4, 5, 6, 7, 8, 10, 12, 16, 20].map((num) => (
                            <option
                              key={num}
                              value={num}
                              className={isDark ? 'bg-[#121417] text-[#EDE6D8]' : 'bg-white text-[#171717]'}
                            >
                              {num} {num === 1 ? 'Guest' : 'Guests'}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    {/* Message */}
                    <div>
                      <label
                        className={`block text-xs uppercase tracking-wider mb-1 font-medium ${
                          isDark ? 'text-[#B8B0A2]' : 'text-[#57534E]'
                        }`}
                      >
                        Special Requests, Allergies or Occasion
                      </label>
                      <textarea
                        id="contact-form-message"
                        rows={3}
                        placeholder="Tell us about dietary restrictions, seating preferences, anniversary celebration..."
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        className={`w-full rounded-xl px-4 py-3 text-xs focus:outline-none transition-colors resize-none ${
                          isDark
                            ? 'bg-[#181A1F] border border-[#292D35] text-[#EDE6D8] placeholder-[#555] focus:border-[#C5A059]'
                            : 'bg-[#FAF8F3] border border-[#D5CCBE] text-[#171717] placeholder-[#888] focus:border-[#A67C00]'
                        }`}
                      />
                    </div>

                    {/* Submit Button */}
                    <div className="pt-2">
                      <button
                        id="contact-form-submit"
                        type="submit"
                        disabled={isSubmitting}
                        className={`w-full py-4 rounded-full font-semibold text-xs uppercase tracking-[0.2em] transition-all shadow-lg flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 ${
                          isDark
                            ? 'bg-[#C5A059] hover:bg-[#DFBF77] text-[#0C0D0E] shadow-[#C5A059]/20 hover:shadow-[#C5A059]/40'
                            : 'bg-[#A67C00] hover:bg-[#B8860B] text-white shadow-[#A67C00]/20'
                        }`}
                      >
                        {isSubmitting ? (
                          <span>Dispatching Request...</span>
                        ) : (
                          <>
                            <Send className="w-4 h-4" />
                            <span>Send Reservation Request</span>
                          </>
                        )}
                      </button>
                    </div>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. LOCATION & LUXURY MAP SECTION */}
      <section
        id="location-section"
        className={`py-20 border-t transition-colors duration-400 ${
          isDark
            ? 'bg-[#0E1013] border-[#1C1F25]'
            : 'bg-[#F5EFE6] border-[#E2D9CA]'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
            <span
              className="text-xs uppercase tracking-[0.25em] font-semibold"
              style={{ color: goldAccent }}
            >
              FIND US
            </span>
            <h2
              className={`font-serif text-3xl sm:text-4xl font-bold ${
                isDark ? 'text-[#EDE6D8]' : 'text-[#171717]'
              }`}
            >
              Location &amp; Arrival
            </h2>
            <p
              className={`text-xs ${
                isDark ? 'text-[#8F887C]' : 'text-[#78716C]'
              }`}
            >
              Located in the heart of the historic City Center, surrounded by cultural landmarks and boutique avenues.
            </p>
          </div>

          {/* Professional Map Placeholder */}
          <div
            className={`relative rounded-3xl overflow-hidden border shadow-2xl transition-all ${
              isDark
                ? 'border-[#252932] bg-[#121417]'
                : 'border-[#E2D9CA] bg-white'
            }`}
          >
            {/* Styled Map Canvas Background */}
            <div
              className={`h-96 sm:h-[420px] w-full relative overflow-hidden flex items-center justify-center ${
                isDark ? 'bg-[#0F1114]' : 'bg-[#EDE8DF]'
              }`}
            >
              {/* Architectural Grid Lines & Map Geometry */}
              <div
                className={`absolute inset-0 [background-size:24px_24px] opacity-40 ${
                  isDark
                    ? 'bg-[radial-gradient(#252830_1px,transparent_1px)]'
                    : 'bg-[radial-gradient(#C5BDB0_1px,transparent_1px)]'
                }`}
              />

              {/* Simulated Road Lines */}
              <svg
                className={`absolute inset-0 w-full h-full fill-none opacity-40 ${
                  isDark ? 'stroke-[#252830]' : 'stroke-[#C8BFB2]'
                } stroke-[2]`}
              >
                <path d="M-50,120 Q300,160 800,100 T1600,140" />
                <path d="M-50,280 Q400,240 900,310 T1600,270" />
                <path
                  d="M350,-20 L380,500"
                  strokeWidth="4"
                  stroke={isDark ? '#2F333E' : '#B8AFA0'}
                />
                <path
                  d="M720,-20 L680,500"
                  strokeWidth="3"
                  stroke={isDark ? '#262933' : '#BFB6A8'}
                />
                <circle
                  cx="50%"
                  cy="50%"
                  r="90"
                  stroke={goldAccent}
                  strokeWidth="1"
                  strokeDasharray="4 4"
                  className="animate-spin [animation-duration:40s]"
                />
              </svg>

              {/* Pulsing Pin Centerpiece */}
              <div className="relative z-10 flex flex-col items-center">
                <div className="relative flex items-center justify-center">
                  <div
                    className="absolute w-16 h-16 rounded-full animate-ping"
                    style={{ backgroundColor: `${goldAccent}33` }}
                  />
                  <div
                    className="relative w-12 h-12 rounded-full flex items-center justify-center shadow-lg"
                    style={{
                      backgroundColor: goldAccent,
                      color: isDark ? '#0C0D0E' : '#FFFFFF',
                    }}
                  >
                    <MapPin className="w-6 h-6 fill-current" />
                  </div>
                </div>

                {/* Floating Pin Label Card */}
                <div
                  className={`mt-4 px-5 py-3 rounded-xl border shadow-2xl backdrop-blur-md text-center max-w-xs ${
                    isDark
                      ? 'bg-[#14161B]/95 border-[#C5A059]/60'
                      : 'bg-white/95 border-[#A67C00]/60 shadow-stone-200'
                  }`}
                >
                  <h4
                    className={`font-serif text-sm font-bold ${
                      isDark ? 'text-[#EDE6D8]' : 'text-[#171717]'
                    }`}
                  >
                    Maison Ember
                  </h4>
                  <p className="text-[11px] font-medium" style={{ color: goldAccent }}>
                    123 Culinary Avenue, City Center
                  </p>
                  <p
                    className={`text-[10px] mt-1 ${
                      isDark ? 'text-[#8F887C]' : 'text-[#78716C]'
                    }`}
                  >
                    Valet Station at Main Porte-Cochère
                  </p>
                </div>
              </div>
            </div>

            {/* Arrival & Directions Info Footer */}
            <div
              className={`p-6 sm:p-8 border-t grid grid-cols-1 sm:grid-cols-3 gap-6 text-xs transition-colors ${
                isDark
                  ? 'bg-[#15171C] border-[#23272F] text-[#EDE6D8]'
                  : 'bg-[#FAF8F3] border-[#E2D9CA] text-[#171717]'
              }`}
            >
              <div className="flex items-start gap-3">
                <Car className="w-5 h-5 shrink-0 mt-0.5" style={{ color: goldAccent }} />
                <div>
                  <h5
                    className={`font-serif font-bold text-sm ${
                      isDark ? 'text-[#EDE6D8]' : 'text-[#171717]'
                    }`}
                  >
                    Valet Parking
                  </h5>
                  <p
                    className={`text-[11px] mt-0.5 leading-relaxed ${
                      isDark ? 'text-[#8F887C]' : 'text-[#78716C]'
                    }`}
                  >
                    Complimentary white-glove valet service available at the front entrance for all dining guests.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Navigation className="w-5 h-5 shrink-0 mt-0.5" style={{ color: goldAccent }} />
                <div>
                  <h5
                    className={`font-serif font-bold text-sm ${
                      isDark ? 'text-[#EDE6D8]' : 'text-[#171717]'
                    }`}
                  >
                    Metro &amp; Transit
                  </h5>
                  <p
                    className={`text-[11px] mt-0.5 leading-relaxed ${
                      isDark ? 'text-[#8F887C]' : 'text-[#78716C]'
                    }`}
                  >
                    Two blocks from Grand Central Promenade Station. Dedicated taxi &amp; rideshare drop zone.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <ShieldCheck className="w-5 h-5 shrink-0 mt-0.5" style={{ color: goldAccent }} />
                <div>
                  <h5
                    className={`font-serif font-bold text-sm ${
                      isDark ? 'text-[#EDE6D8]' : 'text-[#171717]'
                    }`}
                  >
                    Dress Code &amp; Etiquette
                  </h5>
                  <p
                    className={`text-[11px] mt-0.5 leading-relaxed ${
                      isDark ? 'text-[#8F887C]' : 'text-[#78716C]'
                    }`}
                  >
                    Smart elegant attire is warmly appreciated. Jackets recommended for gentlemen in the main salon.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
