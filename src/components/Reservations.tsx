import { useState } from 'react';
import { CalendarHeart, CheckCircle2, User, Phone, Mail, Calendar, Clock, Users, MessageSquare } from 'lucide-react';
import { useScrollReveal } from '@/hooks';

interface FormData {
  name: string;
  phone: string;
  email: string;
  date: string;
  time: string;
  guests: string;
  requests: string;
}

interface FormErrors {
  [key: string]: string;
}

const initialState: FormData = {
  name: '',
  phone: '',
  email: '',
  date: '',
  time: '',
  guests: '2',
  requests: '',
};

const timeSlots = [
  '12:00 PM', '12:30 PM', '1:00 PM', '1:30 PM', '2:00 PM',
  '7:00 PM', '7:30 PM', '8:00 PM', '8:30 PM', '9:00 PM', '9:30 PM',
];

export default function Reservations() {
  const { ref, visible } = useScrollReveal();
  const [form, setForm] = useState<FormData>(initialState);
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitted, setSubmitted] = useState(false);

  const validate = (): boolean => {
    const e: FormErrors = {};
    if (!form.name.trim()) e.name = 'Name is required';
    if (!form.phone.trim()) e.phone = 'Phone number is required';
    else if (!/^\+?[\d\s-]{10,15}$/.test(form.phone)) e.phone = 'Enter a valid phone number';
    if (!form.email.trim()) e.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Enter a valid email';
    if (!form.date) e.date = 'Date is required';
    else {
      const selected = new Date(form.date);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      if (selected < today) e.date = 'Date cannot be in the past';
    }
    if (!form.time) e.time = 'Time is required';
    if (!form.guests) e.guests = 'Number of guests is required';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = (ev: React.FormEvent) => {
    ev.preventDefault();
    if (validate()) {
      setSubmitted(true);
    }
  };

  const handleChange = (field: keyof FormData, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: '' }));
  };

  const today = new Date().toISOString().split('T')[0];

  return (
    <section
      id="reservations"
      className="py-20 sm:py-28 bg-charcoal-900 relative overflow-hidden"
    >
      <div className="absolute top-0 right-0 w-96 h-96 bg-crimson-600/5 rounded-full blur-3xl" />

      <div
        ref={ref}
        className={`max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative reveal ${visible ? 'visible' : ''}`}
      >
        <div className="text-center mb-10">
          <span className="text-sm font-semibold uppercase tracking-[0.2em] text-saffron-400 mb-3 block">
            Reservations
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-cream-100 mb-4">
            Book Your <span className="text-gradient-gold">Table</span>
          </h2>
          <p className="text-cream-100/60 max-w-2xl mx-auto text-base">
            Reserve a table for an unforgettable dining experience. We can't wait to welcome you.
          </p>
        </div>

        {submitted ? (
          <div className="rounded-3xl bg-charcoal-800 border border-saffron-400/20 p-8 sm:p-12 text-center shadow-card animate-fade-in">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-green-500 to-green-700 flex items-center justify-center mx-auto mb-5">
              <CheckCircle2 className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-cream-100 mb-3">Reservation Confirmed!</h3>
            <p className="text-cream-100/70 max-w-md mx-auto mb-6">
              Thank you, {form.name}. Your table for {form.guests} guests has been reserved for{' '}
              {form.date} at {form.time}. We look forward to serving you at Spice Garden Restaurant.
            </p>
            <p className="text-xs text-cream-100/40 mb-6">
              This is a demo confirmation. No actual reservation has been made.
            </p>
            <button
              onClick={() => {
                setForm(initialState);
                setSubmitted(false);
              }}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl glass-light text-cream-100 font-semibold hover:bg-cream-100/10 transition-all"
            >
              Make Another Reservation
            </button>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="rounded-3xl bg-charcoal-800 border border-cream-100/5 p-6 sm:p-8 shadow-card"
          >
            <div className="grid sm:grid-cols-2 gap-5">
              {/* Name */}
              <div>
                <label className="text-sm font-medium text-cream-100/80 mb-1.5 flex items-center gap-1.5">
                  <User className="w-4 h-4 text-saffron-400" /> Full Name
                </label>
                <input
                  type="text"
                  value={form.name}
                  onChange={(e) => handleChange('name', e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-charcoal-900 border border-cream-100/10 text-cream-100 placeholder-cream-100/30 focus:border-saffron-400 focus:outline-none focus:ring-1 focus:ring-saffron-400 transition-all"
                  placeholder="John Doe"
                />
                {errors.name && <p className="text-xs text-crimson-400 mt-1">{errors.name}</p>}
              </div>

              {/* Phone */}
              <div>
                <label className="text-sm font-medium text-cream-100/80 mb-1.5 flex items-center gap-1.5">
                  <Phone className="w-4 h-4 text-saffron-400" /> Phone Number
                </label>
                <input
                  type="tel"
                  value={form.phone}
                  onChange={(e) => handleChange('phone', e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-charcoal-900 border border-cream-100/10 text-cream-100 placeholder-cream-100/30 focus:border-saffron-400 focus:outline-none focus:ring-1 focus:ring-saffron-400 transition-all"
                  placeholder="+91 98765 43210"
                />
                {errors.phone && <p className="text-xs text-crimson-400 mt-1">{errors.phone}</p>}
              </div>

              {/* Email */}
              <div>
                <label className="text-sm font-medium text-cream-100/80 mb-1.5 flex items-center gap-1.5">
                  <Mail className="w-4 h-4 text-saffron-400" /> Email Address
                </label>
                <input
                  type="email"
                  value={form.email}
                  onChange={(e) => handleChange('email', e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-charcoal-900 border border-cream-100/10 text-cream-100 placeholder-cream-100/30 focus:border-saffron-400 focus:outline-none focus:ring-1 focus:ring-saffron-400 transition-all"
                  placeholder="john@example.com"
                />
                {errors.email && <p className="text-xs text-crimson-400 mt-1">{errors.email}</p>}
              </div>

              {/* Guests */}
              <div>
                <label className="text-sm font-medium text-cream-100/80 mb-1.5 flex items-center gap-1.5">
                  <Users className="w-4 h-4 text-saffron-400" /> Number of Guests
                </label>
                <select
                  value={form.guests}
                  onChange={(e) => handleChange('guests', e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-charcoal-900 border border-cream-100/10 text-cream-100 focus:border-saffron-400 focus:outline-none focus:ring-1 focus:ring-saffron-400 transition-all"
                >
                  {Array.from({ length: 20 }, (_, i) => i + 1).map((n) => (
                    <option key={n} value={n}>
                      {n} {n === 1 ? 'Guest' : 'Guests'}
                    </option>
                  ))}
                </select>
                {errors.guests && <p className="text-xs text-crimson-400 mt-1">{errors.guests}</p>}
              </div>

              {/* Date */}
              <div>
                <label className="text-sm font-medium text-cream-100/80 mb-1.5 flex items-center gap-1.5">
                  <Calendar className="w-4 h-4 text-saffron-400" /> Date
                </label>
                <input
                  type="date"
                  min={today}
                  value={form.date}
                  onChange={(e) => handleChange('date', e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-charcoal-900 border border-cream-100/10 text-cream-100 placeholder-cream-100/30 focus:border-saffron-400 focus:outline-none focus:ring-1 focus:ring-saffron-400 transition-all"
                />
                {errors.date && <p className="text-xs text-crimson-400 mt-1">{errors.date}</p>}
              </div>

              {/* Time */}
              <div>
                <label className="text-sm font-medium text-cream-100/80 mb-1.5 flex items-center gap-1.5">
                  <Clock className="w-4 h-4 text-saffron-400" /> Preferred Time
                </label>
                <select
                  value={form.time}
                  onChange={(e) => handleChange('time', e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-charcoal-900 border border-cream-100/10 text-cream-100 focus:border-saffron-400 focus:outline-none focus:ring-1 focus:ring-saffron-400 transition-all"
                >
                  <option value="">Select a time</option>
                  {timeSlots.map((slot) => (
                    <option key={slot} value={slot}>{slot}</option>
                  ))}
                </select>
                {errors.time && <p className="text-xs text-crimson-400 mt-1">{errors.time}</p>}
              </div>
            </div>

            {/* Special requests */}
            <div className="mt-5">
              <label className="text-sm font-medium text-cream-100/80 mb-1.5 flex items-center gap-1.5">
                <MessageSquare className="w-4 h-4 text-saffron-400" /> Special Requests
                <span className="text-cream-100/40 text-xs font-normal">(optional)</span>
              </label>
              <textarea
                value={form.requests}
                onChange={(e) => handleChange('requests', e.target.value)}
                rows={3}
                className="w-full px-4 py-3 rounded-xl bg-charcoal-900 border border-cream-100/10 text-cream-100 placeholder-cream-100/30 focus:border-saffron-400 focus:outline-none focus:ring-1 focus:ring-saffron-400 transition-all resize-none"
                placeholder="Any dietary preferences, allergies, or special occasion..."
              />
            </div>

            <button
              type="submit"
              className="w-full mt-6 inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-to-r from-saffron-500 to-crimson-600 text-white font-semibold shadow-glow-saffron hover:shadow-glow-crimson hover:scale-[1.02] transition-all"
            >
              <CalendarHeart className="w-5 h-5" />
              Confirm Reservation
            </button>
            <p className="text-xs text-cream-100/40 text-center mt-3">
              This is a demo form. No actual reservation will be made.
            </p>
          </form>
        )}
      </div>
    </section>
  );
}
