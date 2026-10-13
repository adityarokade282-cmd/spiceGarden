import { MapPin, Phone, Mail, Clock, MessageCircle } from 'lucide-react';
import { useScrollReveal } from '@/hooks';

const contactInfo = [
  {
    icon: MapPin,
    label: 'Address',
    value: '123 Spice Garden Road, Foodie District, Mumbai, India 400001',
    note: 'Sample address — replace with your actual location',
  },
  {
    icon: Phone,
    label: 'Phone',
    value: '+91 98765 43210',
    note: 'Sample number — replace with your actual phone',
  },
  {
    icon: Mail,
    label: 'Email',
    value: 'hello@spicegarden.com',
    note: 'Sample email — replace with your actual email',
  },
];

const hours = [
  { day: 'Monday – Thursday', time: '11:00 AM – 11:00 PM' },
  { day: 'Friday – Saturday', time: '11:00 AM – 12:30 AM' },
  { day: 'Sunday', time: '10:00 AM – 11:00 PM' },
];

export default function Contact() {
  const { ref, visible } = useScrollReveal();

  return (
    <section id="contact" className="py-20 sm:py-28 bg-charcoal-950">
      <div
        ref={ref}
        className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 reveal ${visible ? 'visible' : ''}`}
      >
        <div className="text-center mb-12">
          <span className="text-sm font-semibold uppercase tracking-[0.2em] text-saffron-400 mb-3 block">
            Contact Us
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-cream-100 mb-4">
            Get in <span className="text-gradient-gold">Touch</span>
          </h2>
          <p className="text-cream-100/60 max-w-2xl mx-auto text-base">
            Have a question or want to reach us? We'd love to hear from you. The details below are
            samples — replace them with your actual information.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Contact info + hours */}
          <div className="space-y-6">
            {/* Contact cards */}
            <div className="grid sm:grid-cols-1 gap-4">
              {contactInfo.map((info) => {
                const Icon = info.icon;
                return (
                  <div
                    key={info.label}
                    className="flex items-start gap-4 p-5 rounded-2xl bg-charcoal-800 border border-cream-100/5 shadow-card hover:border-saffron-400/20 transition-all"
                  >
                    <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-saffron-400 to-crimson-600 flex items-center justify-center flex-shrink-0">
                      <Icon className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <div className="text-sm font-bold text-cream-100 mb-0.5">{info.label}</div>
                      <div className="text-sm text-cream-100/70">{info.value}</div>
                      <div className="text-xs text-cream-100/40 mt-1">{info.note}</div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Opening hours */}
            <div className="p-5 rounded-2xl bg-charcoal-800 border border-cream-100/5 shadow-card">
              <div className="flex items-center gap-2 mb-4">
                <Clock className="w-5 h-5 text-saffron-400" />
                <h3 className="text-base font-bold text-cream-100">Opening Hours</h3>
              </div>
              <ul className="space-y-2.5">
                {hours.map((h) => (
                  <li key={h.day} className="flex items-center justify-between text-sm">
                    <span className="text-cream-100/70">{h.day}</span>
                    <span className="text-cream-100 font-medium">{h.time}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* WhatsApp button */}
            <a
              href="https://wa.me/919876543210"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2.5 w-full px-6 py-3.5 rounded-xl bg-gradient-to-r from-green-500 to-green-700 text-white font-semibold shadow-lg hover:scale-[1.02] transition-all"
            >
              <MessageCircle className="w-5 h-5" />
              Chat with us on WhatsApp
            </a>
          </div>

          {/* Map placeholder */}
          <div className="relative rounded-2xl overflow-hidden shadow-card min-h-[400px] bg-charcoal-800 border border-cream-100/5">
            <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center">
              {/* Stylized map placeholder */}
              <div className="absolute inset-0 opacity-10">
                <div className="w-full h-full" style={{
                  backgroundImage: `repeating-linear-gradient(0deg, transparent, transparent 40px, rgba(255,154,55,0.3) 40px, rgba(255,154,55,0.3) 41px),
                    repeating-linear-gradient(90deg, transparent, transparent 40px, rgba(255,154,55,0.3) 40px, rgba(255,154,55,0.3) 41px)`,
                }} />
              </div>
              <div className="relative z-10">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-saffron-400 to-crimson-600 flex items-center justify-center mx-auto mb-4 shadow-glow-saffron animate-pulse-slow">
                  <MapPin className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-lg font-bold text-cream-100 mb-2">Find Us on the Map</h3>
                <p className="text-sm text-cream-100/60 max-w-xs mb-4">
                  This is a placeholder for a Google Maps embed. Add your Google Maps API key
                  to display an interactive map here.
                </p>
                <a
                  href="https://maps.google.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl glass-light text-cream-100 text-sm font-medium hover:bg-cream-100/10 transition-all"
                >
                  <MapPin className="w-4 h-4 text-saffron-400" />
                  Open Google Maps
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
