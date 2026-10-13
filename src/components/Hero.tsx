import { Star, UtensilsCrossed, CalendarHeart } from 'lucide-react';
import { HERO_IMAGE } from '@/data';

export default function Hero() {
  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <img
          src={HERO_IMAGE}
          alt="Authentic Indian food spread"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-hero-overlay" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 text-center pt-20 pb-12">
        {/* Special offer badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-light mb-6 animate-fade-in">
          <Star className="w-4 h-4 text-saffron-400 fill-saffron-400" />
          <span className="text-sm font-medium text-cream-100">Special Offer: 20% off your first online order</span>
        </div>

        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-cream-100 leading-[1.15] mb-6 animate-fade-up">
          Taste the Tradition,
          <br />
          <span className="text-gradient-gold">Experience the Flavour.</span>
        </h1>

        <p className="text-base sm:text-lg md:text-xl text-cream-100/80 max-w-2xl mx-auto mb-10 leading-relaxed animate-fade-up reveal-delay-1">
          Discover delicious Indian cuisine made with fresh ingredients and authentic spices,
          crafted with love and served with warmth.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-up reveal-delay-2">
          <a
            href="#menu"
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-gradient-to-r from-saffron-500 to-crimson-600 text-white font-semibold text-base shadow-glow-saffron hover:shadow-glow-crimson hover:scale-105 transition-all"
          >
            <UtensilsCrossed className="w-5 h-5" />
            Explore Menu
          </a>
          <a
            href="#reservations"
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl glass-light text-cream-100 font-semibold text-base border border-cream-100/20 hover:bg-cream-100/10 hover:scale-105 transition-all"
          >
            <CalendarHeart className="w-5 h-5 text-saffron-400" />
            Book a Table
          </a>
        </div>

        {/* Decorative scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden md:block animate-float">
          <div className="w-6 h-10 rounded-full border-2 border-cream-100/30 flex items-start justify-center p-1.5">
            <div className="w-1.5 h-3 rounded-full bg-saffron-400" />
          </div>
        </div>
      </div>
    </section>
  );
}
