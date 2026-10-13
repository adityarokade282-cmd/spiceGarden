import { UtensilsCrossed, ShoppingCart, Menu as MenuIcon, X } from 'lucide-react';
import { useState } from 'react';
import { useScrollPosition } from '@/hooks';

interface NavbarProps {
  cartCount: number;
  onCartClick: () => void;
}

const links = [
  { label: 'Home', href: '#home' },
  { label: 'About Us', href: '#about' },
  { label: 'Menu', href: '#menu' },
  { label: 'Our Specialties', href: '#specialties' },
  { label: 'Gallery', href: '#gallery' },
  { label: 'Reservations', href: '#reservations' },
  { label: 'Contact Us', href: '#contact' },
];

export default function Navbar({ cartCount, onCartClick }: NavbarProps) {
  const scrolled = useScrollPosition();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'glass shadow-card py-3' : 'bg-transparent py-5'
      }`}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Logo */}
        <a href="#home" className="flex items-center gap-2.5 group" aria-label="Spice Garden Restaurant home">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-saffron-400 to-crimson-600 flex items-center justify-center shadow-glow-saffron group-hover:scale-110 transition-transform">
            <UtensilsCrossed className="w-5 h-5 text-charcoal-900" />
          </div>
          <div className="leading-tight">
            <span className="block font-serif font-bold text-lg text-cream-100 tracking-wide">Spice Garden</span>
            <span className="block text-[10px] uppercase tracking-[0.2em] text-saffron-400">Restaurant</span>
          </div>
        </a>

        {/* Desktop nav */}
        <ul className="hidden lg:flex items-center gap-1">
          {links.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="px-3.5 py-2 text-sm font-medium text-cream-100/80 hover:text-saffron-400 hover:bg-cream-100/5 rounded-lg transition-all"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Actions */}
        <div className="flex items-center gap-3">
          <button
            onClick={onCartClick}
            className="relative p-2.5 rounded-xl glass-light hover:bg-cream-100/10 transition-all"
            aria-label={`Cart with ${cartCount} items`}
          >
            <ShoppingCart className="w-5 h-5 text-cream-100" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-crimson-500 text-white text-xs font-bold flex items-center justify-center animate-pulse-slow">
                {cartCount}
              </span>
            )}
          </button>

          <a
            href="#menu"
            className="hidden sm:inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-saffron-500 to-crimson-600 text-white font-semibold text-sm shadow-glow-saffron hover:shadow-glow-crimson hover:scale-105 transition-all"
          >
            Order Now
          </a>

          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden p-2.5 rounded-xl glass-light hover:bg-cream-100/10 transition-all"
            aria-label="Toggle navigation menu"
          >
            {mobileOpen ? <X className="w-5 h-5 text-cream-100" /> : <MenuIcon className="w-5 h-5 text-cream-100" />}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="lg:hidden mt-3 mx-4 rounded-2xl glass shadow-card overflow-hidden animate-fade-in">
          <ul className="flex flex-col py-2">
            {links.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="block px-5 py-3 text-sm font-medium text-cream-100/80 hover:text-saffron-400 hover:bg-cream-100/5 transition-all"
                >
                  {link.label}
                </a>
              </li>
            ))}
            <li className="px-5 py-3">
              <a
                href="#menu"
                onClick={() => setMobileOpen(false)}
                className="block text-center px-5 py-2.5 rounded-xl bg-gradient-to-r from-saffron-500 to-crimson-600 text-white font-semibold text-sm"
              >
                Order Now
              </a>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
