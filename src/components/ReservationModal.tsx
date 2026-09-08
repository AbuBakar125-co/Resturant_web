import React, { useState } from 'react';
import { ReservationData } from '../types';
import { RESTAURANT_INFO } from '../data/restaurantData';
import { useTheme } from '../context/ThemeContext';
import { X, Calendar, Clock, Users, Sparkles, CheckCircle2, Phone, Mail, User, BookmarkCheck } from 'lucide-react';

interface ReservationModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultDate?: string;
  defaultGuests?: number;
}

const TIME_SLOTS = [
  '5:00 PM',
  '5:30 PM',
  '6:00 PM',
  '6:30 PM',
  '7:00 PM',
  '7:30 PM',
  '8:00 PM',
  '8:30 PM',
  '9:00 PM',
  '9:30 PM',
];

const SEATING_ZONES = [
  { id: 'main', label: 'Main Dining Salon', desc: 'Intimate velvet banquettes & warm ambient lighting' },
  { id: 'counter', label: 'Chef’s Ember Counter', desc: 'Front-row view of our wood-fired hearth and plating' },
  { id: 'cellar', label: 'Wine Cellar Alcove', desc: 'Surrounded by our 2,400-bottle temperature-controlled reserve' },
  { id: 'veranda', label: 'Heated Garden Veranda', desc: 'Lush greenery, stone fountains & starlit canopies' },
];

export const ReservationModal: React.FC<ReservationModalProps> = ({
  isOpen,
  onClose,
  defaultDate,
  defaultGuests = 2,
}) => {
  const { isDark } = useTheme();
  const [formData, setFormData] = useState<ReservationData>({
    name: '',
    email: '',
    phone: '',
    date: defaultDate || new Date(Date.now() + 86400000).toISOString().split('T')[0],
    time: '7:00 PM',
    guests: defaultGuests,
    seatingZone: 'Main Dining Salon',
    specialRequest: '',
  });

  const [confirmedReservation, setConfirmedReservation] = useState<{
    code: string;
    data: ReservationData;
  } | null>(null);

  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const goldAccent = isDark ? '#C5A059' : '#A67C00';

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      const code = 'ME-' + Math.floor(100000 + Math.random() * 900000);
      const newReservation = {
        ...formData,
        id: code,
        status: 'confirmed' as const,
        createdAt: new Date().toISOString(),
      };

      // Save to localStorage for user review
      try {
        const existing = JSON.parse(localStorage.getItem('maison_ember_reservations') || '[]');
        localStorage.setItem('maison_ember_reservations', JSON.stringify([newReservation, ...existing]));
      } catch (err) {
        console.error(err);
      }

      setConfirmedReservation({ code, data: newReservation });
      setIsSubmitting(false);
    }, 800);
  };

  const handleResetAndClose = () => {
    setConfirmedReservation(null);
    onClose();
  };

  return (
    <div
      id="reservation-modal-overlay"
      className="anim-overlay-in fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-md overflow-y-auto"
    >
      <div
        id="reservation-modal-content"
        className={`anim-modal-in relative w-full max-w-2xl rounded-2xl p-6 sm:p-8 shadow-2xl my-8 max-h-[90vh] overflow-y-auto border transition-colors ${
          isDark
            ? 'bg-[#111215] border-[#2D3138] text-[#EDE6D8] shadow-black/80'
            : 'bg-[#FFFFFF] border-[#E2D9CA] text-[#171717] shadow-xl shadow-black/15'
        }`}
      >
        {/* Close Button */}
        <button
          id="close-reservation-modal"
          onClick={handleResetAndClose}
          className={`absolute top-5 right-5 p-2 rounded-full transition-colors cursor-pointer ${
            isDark
              ? 'bg-[#181A1E] text-[#B8B0A2] hover:text-[#EDE6D8] hover:bg-[#25282E]'
              : 'bg-[#F4EFE6] text-[#57534E] hover:text-[#171717] hover:bg-[#EAE3D6]'
          }`}
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {confirmedReservation ? (
          /* Confirmation View */
          <div className="text-center py-6 space-y-6">
            <div
              className={`w-16 h-16 rounded-full border flex items-center justify-center mx-auto shadow-md ${
                isDark
                  ? 'bg-[#C5A059]/20 border-[#C5A059] text-[#C5A059]'
                  : 'bg-[#A67C00]/15 border-[#A67C00] text-[#A67C00]'
              }`}
            >
              <CheckCircle2 className="w-9 h-9" />
            </div>

            <div className="space-y-2">
              <span
                className="text-xs uppercase tracking-[0.25em] font-semibold"
                style={{ color: goldAccent }}
              >
                Table Reserved Successfully
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl font-bold">
                We Look Forward to Welcoming You
              </h3>
              <p className={`text-sm max-w-md mx-auto ${isDark ? 'text-[#B8B0A2]' : 'text-[#57534E]'}`}>
                A formal dining confirmation and calendar invitation has been prepared for{' '}
                <strong className={isDark ? 'text-[#EDE6D8]' : 'text-[#171717]'}>
                  {confirmedReservation.data.email}
                </strong>.
              </p>
            </div>

            <div
              className={`border rounded-xl p-5 text-left max-w-lg mx-auto space-y-3 ${
                isDark
                  ? 'bg-[#181A1F] border-[#2A2E35]'
                  : 'bg-[#F9F7F2] border-[#E5DFD4]'
              }`}
            >
              <div
                className={`flex items-center justify-between border-b pb-3 ${
                  isDark ? 'border-[#25282F]' : 'border-[#E8E2D6]'
                }`}
              >
                <span className={`text-xs uppercase tracking-wider ${isDark ? 'text-[#8F887C]' : 'text-[#78716C]'}`}>
                  Confirmation Ref
                </span>
                <span className="font-mono text-sm font-bold" style={{ color: goldAccent }}>
                  {confirmedReservation.code}
                </span>
              </div>
              <div className="grid grid-cols-2 gap-3 text-xs">
                <div>
                  <span className={`block text-[11px] ${isDark ? 'text-[#8F887C]' : 'text-[#78716C]'}`}>Guest</span>
                  <span className="font-medium">{confirmedReservation.data.name}</span>
                </div>
                <div>
                  <span className={`block text-[11px] ${isDark ? 'text-[#8F887C]' : 'text-[#78716C]'}`}>Party Size</span>
                  <span className="font-medium">{confirmedReservation.data.guests} Guests</span>
                </div>
                <div>
                  <span className={`block text-[11px] ${isDark ? 'text-[#8F887C]' : 'text-[#78716C]'}`}>Date</span>
                  <span className="font-medium">{confirmedReservation.data.date}</span>
                </div>
                <div>
                  <span className={`block text-[11px] ${isDark ? 'text-[#8F887C]' : 'text-[#78716C]'}`}>Seating Time</span>
                  <span className="font-medium">{confirmedReservation.data.time}</span>
                </div>
                <div className="col-span-2">
                  <span className={`block text-[11px] ${isDark ? 'text-[#8F887C]' : 'text-[#78716C]'}`}>Seating Area</span>
                  <span className="font-medium" style={{ color: goldAccent }}>
                    {confirmedReservation.data.seatingZone}
                  </span>
                </div>
                {confirmedReservation.data.specialRequest && (
                  <div className="col-span-2">
                    <span className={`block text-[11px] ${isDark ? 'text-[#8F887C]' : 'text-[#78716C]'}`}>Special Notes</span>
                    <span className={`italic ${isDark ? 'text-[#B8B0A2]' : 'text-[#57534E]'}`}>
                      {confirmedReservation.data.specialRequest}
                    </span>
                  </div>
                )}
              </div>
            </div>

            <div
              className={`p-3 rounded-lg text-xs max-w-lg mx-auto flex items-center gap-2 text-left ${
                isDark ? 'bg-[#16181C] text-[#8F887C]' : 'bg-[#F2ECE1] text-[#57534E]'
              }`}
            >
              <BookmarkCheck className="w-4 h-4 shrink-0" style={{ color: goldAccent }} />
              <span>Complimentary valet parking is ready upon arrival at 123 Culinary Avenue.</span>
            </div>

            <button
              id="finish-reservation-btn"
              onClick={handleResetAndClose}
              className={`px-8 py-3 rounded-full text-xs font-semibold uppercase tracking-[0.2em] transition-all cursor-pointer ${
                isDark
                  ? 'bg-[#C5A059] hover:bg-[#DFBF77] text-[#0C0D0E]'
                  : 'bg-[#A67C00] hover:bg-[#B8860B] text-white'
              }`}
            >
              Done
            </button>
          </div>
        ) : (
          /* Booking Form */
          <div>
            <div className="text-center mb-6 space-y-1.5">
              <div
                className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] font-medium"
                style={{ color: goldAccent }}
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Reserve Your Table</span>
              </div>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold">
                An Unforgettable Dining Experience
              </h2>
              <p className={`text-xs ${isDark ? 'text-[#B8B0A2]' : 'text-[#57534E]'}`}>
                For parties exceeding 8 guests or private salon buyouts, please call us directly at{' '}
                <a
                  href={`tel:${RESTAURANT_INFO.phone}`}
                  className="hover:underline"
                  style={{ color: goldAccent }}
                >
                  {RESTAURANT_INFO.phoneFormatted}
                </a>.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Date & Time & Guests Row */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {/* Date */}
                <div>
                  <label
                    className={`block text-xs uppercase tracking-wider mb-1.5 font-medium ${
                      isDark ? 'text-[#B8B0A2]' : 'text-[#57534E]'
                    }`}
                  >
                    Date
                  </label>
                  <div className="relative">
                    <input
                      id="res-input-date"
                      type="date"
                      required
                      min={new Date().toISOString().split('T')[0]}
                      value={formData.date}
                      onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                      className={`w-full rounded-lg px-3.5 py-2.5 text-xs focus:outline-none transition-colors border ${
                        isDark
                          ? 'bg-[#16181D] border-[#2B2F38] text-[#EDE6D8] focus:border-[#C5A059]'
                          : 'bg-[#F9F7F2] border-[#D5CCBE] text-[#171717] focus:border-[#A67C00]'
                      }`}
                    />
                  </div>
                </div>

                {/* Time */}
                <div>
                  <label
                    className={`block text-xs uppercase tracking-wider mb-1.5 font-medium ${
                      isDark ? 'text-[#B8B0A2]' : 'text-[#57534E]'
                    }`}
                  >
                    Time
                  </label>
                  <select
                    id="res-input-time"
                    value={formData.time}
                    onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                    className={`w-full rounded-lg px-3.5 py-2.5 text-xs focus:outline-none transition-colors border ${
                      isDark
                        ? 'bg-[#16181D] border-[#2B2F38] text-[#EDE6D8] focus:border-[#C5A059]'
                        : 'bg-[#F9F7F2] border-[#D5CCBE] text-[#171717] focus:border-[#A67C00]'
                    }`}
                  >
                    {TIME_SLOTS.map((t) => (
                      <option
                        key={t}
                        value={t}
                        className={isDark ? 'bg-[#111215] text-[#EDE6D8]' : 'bg-[#FFFFFF] text-[#171717]'}
                      >
                        {t}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Guests */}
                <div>
                  <label
                    className={`block text-xs uppercase tracking-wider mb-1.5 font-medium ${
                      isDark ? 'text-[#B8B0A2]' : 'text-[#57534E]'
                    }`}
                  >
                    Guests
                  </label>
                  <select
                    id="res-input-guests"
                    value={formData.guests}
                    onChange={(e) => setFormData({ ...formData, guests: Number(e.target.value) })}
                    className={`w-full rounded-lg px-3.5 py-2.5 text-xs focus:outline-none transition-colors border ${
                      isDark
                        ? 'bg-[#16181D] border-[#2B2F38] text-[#EDE6D8] focus:border-[#C5A059]'
                        : 'bg-[#F9F7F2] border-[#D5CCBE] text-[#171717] focus:border-[#A67C00]'
                    }`}
                  >
                    {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
                      <option
                        key={num}
                        value={num}
                        className={isDark ? 'bg-[#111215] text-[#EDE6D8]' : 'bg-[#FFFFFF] text-[#171717]'}
                      >
                        {num} {num === 1 ? 'Guest' : 'Guests'}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Seating Zone Preference */}
              <div>
                <label
                  className={`block text-xs uppercase tracking-wider mb-2 font-medium ${
                    isDark ? 'text-[#B8B0A2]' : 'text-[#57534E]'
                  }`}
                >
                  Seating Ambience
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {SEATING_ZONES.map((zone) => {
                    const isSelected = formData.seatingZone === zone.label;
                    return (
                      <button
                        key={zone.id}
                        type="button"
                        onClick={() => setFormData({ ...formData, seatingZone: zone.label })}
                        className={`text-left p-3 rounded-lg border transition-all cursor-pointer ${
                          isSelected
                            ? isDark
                              ? 'bg-[#C5A059]/15 border-[#C5A059] text-[#EDE6D8]'
                              : 'bg-[#A67C00]/10 border-[#A67C00] text-[#171717]'
                            : isDark
                            ? 'bg-[#16181D] border-[#252932] text-[#B8B0A2] hover:border-[#3E434D]'
                            : 'bg-[#F9F7F2] border-[#E2D9CA] text-[#57534E] hover:border-[#A67C00]'
                        }`}
                      >
                        <p className={`text-xs font-semibold ${isDark ? 'text-[#EDE6D8]' : 'text-[#171717]'}`}>
                          {zone.label}
                        </p>
                        <p className={`text-[11px] leading-snug mt-0.5 ${isDark ? 'text-[#8F887C]' : 'text-[#78716C]'}`}>
                          {zone.desc}
                        </p>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Guest Information */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label
                    className={`block text-xs uppercase tracking-wider mb-1.5 font-medium ${
                      isDark ? 'text-[#B8B0A2]' : 'text-[#57534E]'
                    }`}
                  >
                    Full Name *
                  </label>
                  <div className="relative">
                    <input
                      id="res-input-name"
                      type="text"
                      required
                      placeholder="e.g. Lorde Hastings"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className={`w-full rounded-lg px-3.5 py-2.5 text-xs focus:outline-none transition-colors border ${
                        isDark
                          ? 'bg-[#16181D] border-[#2B2F38] text-[#EDE6D8] placeholder-[#555] focus:border-[#C5A059]'
                          : 'bg-[#F9F7F2] border-[#D5CCBE] text-[#171717] placeholder-[#888] focus:border-[#A67C00]'
                      }`}
                    />
                  </div>
                </div>

                <div>
                  <label
                    className={`block text-xs uppercase tracking-wider mb-1.5 font-medium ${
                      isDark ? 'text-[#B8B0A2]' : 'text-[#57534E]'
                    }`}
                  >
                    Email Address *
                  </label>
                  <div className="relative">
                    <input
                      id="res-input-email"
                      type="email"
                      required
                      placeholder="e.g. guest@domain.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className={`w-full rounded-lg px-3.5 py-2.5 text-xs focus:outline-none transition-colors border ${
                        isDark
                          ? 'bg-[#16181D] border-[#2B2F38] text-[#EDE6D8] placeholder-[#555] focus:border-[#C5A059]'
                          : 'bg-[#F9F7F2] border-[#D5CCBE] text-[#171717] placeholder-[#888] focus:border-[#A67C00]'
                      }`}
                    />
                  </div>
                </div>

                <div>
                  <label
                    className={`block text-xs uppercase tracking-wider mb-1.5 font-medium ${
                      isDark ? 'text-[#B8B0A2]' : 'text-[#57534E]'
                    }`}
                  >
                    Phone Number *
                  </label>
                  <div className="relative">
                    <input
                      id="res-input-phone"
                      type="tel"
                      required
                      placeholder="e.g. (123) 456-7890"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className={`w-full rounded-lg px-3.5 py-2.5 text-xs focus:outline-none transition-colors border ${
                        isDark
                          ? 'bg-[#16181D] border-[#2B2F38] text-[#EDE6D8] placeholder-[#555] focus:border-[#C5A059]'
                          : 'bg-[#F9F7F2] border-[#D5CCBE] text-[#171717] placeholder-[#888] focus:border-[#A67C00]'
                      }`}
                    />
                  </div>
                </div>
              </div>

              {/* Special Request */}
              <div>
                <label
                  className={`block text-xs uppercase tracking-wider mb-1.5 font-medium ${
                    isDark ? 'text-[#B8B0A2]' : 'text-[#57534E]'
                  }`}
                >
                  Special Request or Dietary Notes
                </label>
                <textarea
                  id="res-input-special-request"
                  rows={2}
                  placeholder="Anniversary, birthday, shellfish allergy, wine preference..."
                  value={formData.specialRequest}
                  onChange={(e) => setFormData({ ...formData, specialRequest: e.target.value })}
                  className={`w-full rounded-lg px-3.5 py-2 text-xs focus:outline-none transition-colors resize-none border ${
                    isDark
                      ? 'bg-[#16181D] border-[#2B2F38] text-[#EDE6D8] placeholder-[#555] focus:border-[#C5A059]'
                      : 'bg-[#F9F7F2] border-[#D5CCBE] text-[#171717] placeholder-[#888] focus:border-[#A67C00]'
                  }`}
                />
              </div>

              {/* Submit CTA */}
              <div className="pt-2">
                <button
                  id="confirm-reservation-btn"
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full py-3.5 rounded-full font-semibold text-xs uppercase tracking-[0.2em] transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 ${
                    isDark
                      ? 'bg-[#C5A059] hover:bg-[#DFBF77] text-[#0C0D0E]'
                      : 'bg-[#A67C00] hover:bg-[#B8860B] text-white'
                  }`}
                >
                  {isSubmitting ? (
                    <span>Securing Table...</span>
                  ) : (
                    <>
                      <Calendar className="w-4 h-4" />
                      <span>Confirm Reservation</span>
                    </>
                  )}
                </button>
              </div>

              <p className={`text-[11px] text-center ${isDark ? 'text-[#7F796E]' : 'text-[#8C8478]'}`}>
                We hold tables for 15 minutes past scheduled reservation time. Cancellations are kindly requested 24 hours prior.
              </p>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

