import { specialties } from '@/data';
import type { MenuItem } from '@/types';
import { Leaf, Drumstick, Plus, Star } from 'lucide-react';
import { useScrollReveal } from '@/hooks';
import { SPECIALTIES_BG } from '@/data';

interface SpecialtiesProps {
  onAddToCart: (item: MenuItem) => void;
}

export default function Specialties({ onAddToCart }: SpecialtiesProps) {
  const { ref, visible } = useScrollReveal();

  return (
    <section
      id="specialties"
      className="py-20 sm:py-28 relative overflow-hidden"
      style={{
        backgroundImage: `url(${SPECIALTIES_BG})`,
        backgroundSize: 'cover',
        backgroundAttachment: 'fixed',
        backgroundPosition: 'center',
      }}
    >
      <div className="absolute inset-0 bg-charcoal-950/90" />

      <div
        ref={ref}
        className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative reveal ${visible ? 'visible' : ''}`}
      >
        {/* Header */}
        <div className="text-center mb-12">
          <span className="text-sm font-semibold uppercase tracking-[0.2em] text-saffron-400 mb-3 block">
            Our Specialties
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-cream-100 mb-4">
            Chef's <span className="text-gradient-gold">Signature Dishes</span>
          </h2>
          <p className="text-cream-100/60 max-w-2xl mx-auto text-base">
            The most loved dishes at Spice Garden, crafted to perfection by our master chefs.
          </p>
        </div>

        {/* Cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {specialties.map((item, idx) => (
            <article
              key={item.id}
              className="group relative rounded-3xl overflow-hidden shadow-card hover:shadow-card-hover transition-all duration-300"
              style={{ animationDelay: `${idx * 0.08}s` }}
            >
              {/* Image */}
              <div className="relative h-72 overflow-hidden">
                <img
                  src={item.image}
                  alt={item.name}
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal-950 via-charcoal-950/40 to-transparent" />

                {/* Veg indicator */}
                <div className="absolute top-4 left-4">
                  <span
                    className={`flex items-center justify-center w-7 h-7 rounded-md border-2 ${
                      item.isVeg ? 'border-green-500 bg-charcoal-900/80' : 'border-crimson-500 bg-charcoal-900/80'
                    }`}
                  >
                    {item.isVeg ? (
                      <Leaf className="w-3.5 h-3.5 text-green-500" />
                    ) : (
                      <Drumstick className="w-3.5 h-3.5 text-crimson-500" />
                    )}
                  </span>
                </div>

                {/* Popular badge */}
                <div className="absolute top-4 right-4 flex items-center gap-1 px-3 py-1.5 rounded-full bg-saffron-500 text-charcoal-900 text-xs font-bold shadow-glow-saffron">
                  <Star className="w-3 h-3 fill-charcoal-900" />
                  Most Loved
                </div>
              </div>

              {/* Content overlay */}
              <div className="absolute bottom-0 left-0 right-0 p-5">
                <h3 className="text-xl font-bold text-cream-100 mb-1.5">{item.name}</h3>
                <p className="text-sm text-cream-100/65 leading-relaxed mb-3 line-clamp-2">
                  {item.description}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-xl font-bold text-saffron-400">&#8377;{item.price}</span>
                  <button
                    onClick={() => onAddToCart(item)}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-saffron-500 to-crimson-600 text-white text-sm font-semibold shadow-glow-saffron hover:scale-105 transition-all"
                  >
                    <Plus className="w-4 h-4" />
                    Add to Cart
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
