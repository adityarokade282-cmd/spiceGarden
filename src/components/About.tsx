import { useScrollReveal } from '@/hooks';
import { ABOUT_IMAGE, ABOUT_IMAGE_2 } from '@/data';
import { Users, ChefHat, Award } from 'lucide-react';

const stats = [
  { icon: Users, value: '15,000+', label: 'Happy Customers' },
  { icon: ChefHat, value: '120+', label: 'Popular Dishes' },
  { icon: Award, value: '12', label: 'Years of Experience' },
];

export default function About() {
  const { ref, visible } = useScrollReveal();

  return (
    <section id="about" className="py-20 sm:py-28 bg-charcoal-900 relative overflow-hidden">
      {/* Decorative */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-saffron-500/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-crimson-600/5 rounded-full blur-3xl" />

      <div
        ref={ref}
        className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative reveal ${visible ? 'visible' : ''}`}
      >
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Images */}
          <div className="relative">
            <div className="grid grid-cols-2 gap-4">
              <img
                src={ABOUT_IMAGE}
                alt="Traditional Indian thali"
                className="rounded-2xl shadow-card w-full h-64 sm:h-80 object-cover"
              />
              <img
                src={ABOUT_IMAGE_2}
                alt="Colorful Indian spices"
                className="rounded-2xl shadow-card w-full h-64 sm:h-80 object-cover mt-8"
              />
            </div>
            {/* Badge */}
            <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 px-6 py-3 rounded-2xl glass shadow-card flex items-center gap-3 whitespace-nowrap">
              <Award className="w-6 h-6 text-saffron-400" />
              <div className="text-left">
                <div className="text-sm font-bold text-cream-100">Award Winning</div>
                <div className="text-xs text-cream-100/60">Best Indian Restaurant 2024</div>
              </div>
            </div>
          </div>

          {/* Text */}
          <div>
            <span className="text-sm font-semibold uppercase tracking-[0.2em] text-saffron-400 mb-3 block">
              About Us
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-cream-100 mb-6 leading-tight">
              A Journey of <span className="text-gradient-gold">Authentic Flavours</span>
            </h2>
            <p className="text-cream-100/70 text-base leading-relaxed mb-5">
              At Spice Garden Restaurant, we believe that every meal should be a celebration.
              For over a decade, we have been serving authentic Indian cuisine crafted from
              time-honored recipes passed down through generations. Our chefs source the freshest
              ingredients and blend them with hand-ground spices to create dishes that are both
              comforting and extraordinary.
            </p>
            <p className="text-cream-100/70 text-base leading-relaxed mb-8">
              From the moment you step through our doors, you are not just a customer — you are
              family. Our warm hospitality, elegant ambiance, and dedication to quality make every
              visit a memorable dining experience. Whether it's a casual lunch, a family dinner, or
              a special celebration, we make it our mission to exceed your expectations.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 sm:gap-6">
              {stats.map((stat) => {
                const Icon = stat.icon;
                return (
                  <div
                    key={stat.label}
                    className="text-center p-4 rounded-2xl glass-light hover:bg-cream-100/10 transition-all"
                  >
                    <Icon className="w-6 h-6 text-saffron-400 mx-auto mb-2" />
                    <div className="text-xl sm:text-2xl font-bold text-cream-100">{stat.value}</div>
                    <div className="text-xs text-cream-100/60 mt-1">{stat.label}</div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
