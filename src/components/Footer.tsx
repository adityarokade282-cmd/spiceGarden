import { useState } from 'react';
import { UtensilsCrossed, Facebook, Instagram, Twitter, Youtube, Send, CheckCircle2 } from 'lucide-react';

const quickLinks = [
  { label: 'Home', href: '#home' },
  { label: 'About Us', href: '#about' },
  { label: 'Menu', href: '#menu' },
  { label: 'Our Specialties', href: '#specialties' },
  { label: 'Gallery', href: '#gallery' },
  { label: 'Reservations', href: '#reservations' },
  { label: 'Contact Us', href: '#contact' },
];

const openingHours = [
  { day: 'Mon – Thu', time: '11 AM – 11 PM' },
  { day: 'Fri – Sat', time: '11 AM – 12:30 AM' },
  { day: 'Sunday', time: '10 AM – 11 PM' },
];

const socials = [
  { icon: Facebook, href: '#', label: 'Facebook' },
  { icon: Instagram, href: '#', label: 'Instagram' },
  { icon: Twitter, href: '#', label: 'Twitter' },
  { icon: Youtube, href: '#', label: 'YouTube' },
];

export default function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setSubscribed(true);
      setEmail('');
    }
  };

  return (
    <footer className="bg-charcoal-950 border-t border-cream-100/5 pt-16 pb-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-10">
          {/* Brand + description */}
          <div className="sm:col-span-2 lg:col-span-1">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-saffron-400 to-crimson-600 flex items-center justify-center">
                <UtensilsCrossed className="w-5 h-5 text-charcoal-900" />
              </div>
              <div className="leading-tight">
                <span className="block font-serif font-bold text-lg text-cream-100">Spice Garden</span>
                <span className="block text-[10px] uppercase tracking-[0.2em] text-saffron-400">Restaurant</span>
              </div>
            </div>
            <p className="text-sm text-cream-100/60 leading-relaxed mb-5">
              Serving authentic Indian cuisine with fresh ingredients, traditional spices, and
              warm hospitality. A dining experience that celebrates the rich flavours of India.
            </p>
            <div className="flex items-center gap-2.5">
              {socials.map((s) => {
                const Icon = s.icon;
                return (
                  <a
                    key={s.label}
                    href={s.href}
                    aria-label={s.label}
                    className="w-9 h-9 rounded-lg glass-light flex items-center justify-center text-cream-100/70 hover:text-saffron-400 hover:bg-cream-100/10 transition-all"
                  >
                    <Icon className="w-4 h-4" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="text-sm font-bold text-cream-100 uppercase tracking-wider mb-4">
              Quick Links
            </h4>
            <ul className="space-y-2.5">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-sm text-cream-100/60 hover:text-saffron-400 transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Opening hours */}
          <div>
            <h4 className="text-sm font-bold text-cream-100 uppercase tracking-wider mb-4">
              Opening Hours
            </h4>
            <ul className="space-y-2.5">
              {openingHours.map((h) => (
                <li key={h.day} className="text-sm">
                  <span className="text-cream-100/60">{h.day}</span>
                  <br />
                  <span className="text-saffron-400 font-medium">{h.time}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-sm font-bold text-cream-100 uppercase tracking-wider mb-4">
              Newsletter
            </h4>
            <p className="text-sm text-cream-100/60 mb-4">
              Subscribe for special offers, new dishes, and event updates.
            </p>
            {subscribed ? (
              <div className="flex items-center gap-2 p-3 rounded-xl bg-green-500/10 border border-green-500/20">
                <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0" />
                <span className="text-sm text-green-400">Subscribed! Thank you.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex gap-2">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your email"
                  className="flex-1 min-w-0 px-3 py-2.5 rounded-xl bg-charcoal-800 border border-cream-100/10 text-sm text-cream-100 placeholder-cream-100/30 focus:border-saffron-400 focus:outline-none transition-all"
                />
                <button
                  type="submit"
                  aria-label="Subscribe to newsletter"
                  className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-saffron-500 to-crimson-600 text-white flex items-center justify-center hover:scale-105 transition-all"
                >
                  <Send className="w-4 h-4" />
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-6 border-t border-cream-100/5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-cream-100/50">
            &copy; {new Date().getFullYear()} Spice Garden Restaurant. All rights reserved.
          </p>
          <p className="text-xs text-cream-100/40">
            Crafted with passion for authentic Indian cuisine.
          </p>
        </div>
      </div>
    </footer>
  );
}
