import { useState } from 'react';
import { menuItems } from '@/data';
import type { MenuItem, MenuCategory } from '@/types';
import { Leaf, Drumstick, Plus, Star } from 'lucide-react';

interface MenuProps {
  onAddToCart: (item: MenuItem) => void;
}

const categories: MenuCategory[] = [
  'Starters',
  'North Indian',
  'South Indian',
  'Chinese',
  'Main Course',
  'Desserts',
  'Beverages',
];

export default function Menu({ onAddToCart }: MenuProps) {
  const [active, setActive] = useState<MenuCategory>('Starters');
  const items = menuItems.filter((item) => item.category === active);

  return (
    <section id="menu" className="py-20 sm:py-28 bg-charcoal-950 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <span className="text-sm font-semibold uppercase tracking-[0.2em] text-saffron-400 mb-3 block">
            Our Menu
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-cream-100 mb-4">
            Explore Our <span className="text-gradient-gold">Delicious Offerings</span>
          </h2>
          <p className="text-cream-100/60 max-w-2xl mx-auto text-base">
            From sizzling starters to indulgent desserts, every dish is prepared with authentic
            spices and the freshest ingredients.
          </p>
        </div>

        {/* Category tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-10">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActive(cat)}
              className={`px-4 sm:px-5 py-2.5 rounded-xl text-sm font-medium transition-all ${
                active === cat
                  ? 'bg-gradient-to-r from-saffron-500 to-crimson-600 text-white shadow-glow-saffron'
                  : 'glass-light text-cream-100/70 hover:bg-cream-100/10 hover:text-cream-100'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Cards grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {items.map((item, idx) => (
            <article
              key={item.id}
              className="group rounded-2xl bg-charcoal-800 border border-cream-100/5 overflow-hidden shadow-card hover:shadow-card-hover hover:border-saffron-400/30 transition-all duration-300 animate-fade-up"
              style={{ animationDelay: `${idx * 0.05}s`, animationFillMode: 'both' }}
            >
              {/* Image */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={item.image}
                  alt={item.name}
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal-900/80 to-transparent" />
                {/* Veg/non-veg indicator */}
                <div className="absolute top-3 left-3">
                  <span
                    className={`flex items-center justify-center w-7 h-7 rounded-md border-2 ${
                      item.isVeg
                        ? 'border-green-500 bg-charcoal-900/80'
                        : 'border-crimson-500 bg-charcoal-900/80'
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
                {item.isPopular && (
                  <div className="absolute top-3 right-3 flex items-center gap-1 px-2.5 py-1 rounded-full bg-saffron-500/90 text-charcoal-900 text-xs font-semibold">
                    <Star className="w-3 h-3 fill-charcoal-900" />
                    Popular
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="p-5">
                <h3 className="text-lg font-bold text-cream-100 mb-1.5">{item.name}</h3>
                <p className="text-sm text-cream-100/55 leading-relaxed mb-4 line-clamp-2">
                  {item.description}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-xl font-bold text-saffron-400">
                    &#8377;{item.price}
                  </span>
                  <button
                    onClick={() => onAddToCart(item)}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-cream-100/5 text-cream-100 text-sm font-medium hover:bg-gradient-to-r hover:from-saffron-500 hover:to-crimson-600 hover:text-white transition-all"
                  >
                    <Plus className="w-4 h-4" />
                    Add
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
