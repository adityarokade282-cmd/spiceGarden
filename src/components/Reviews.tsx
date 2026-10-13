import { reviews } from '@/data';
import { Star, Quote } from 'lucide-react';
import { useScrollReveal } from '@/hooks';

export default function Reviews() {
  const { ref, visible } = useScrollReveal();

  return (
    <section className="py-20 sm:py-28 bg-charcoal-950 relative overflow-hidden">
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-saffron-500/5 rounded-full blur-3xl" />
      <div className="absolute top-0 right-0 w-80 h-80 bg-crimson-600/5 rounded-full blur-3xl" />

      <div
        ref={ref}
        className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative reveal ${visible ? 'visible' : ''}`}
      >
        <div className="text-center mb-12">
          <span className="text-sm font-semibold uppercase tracking-[0.2em] text-saffron-400 mb-3 block">
            Customer Reviews
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-cream-100 mb-4">
            What Our <span className="text-gradient-gold">Guests Say</span>
          </h2>
          <p className="text-cream-100/60 max-w-2xl mx-auto text-base">
            Real stories from our wonderful guests. These are sample reviews for demonstration.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {reviews.map((review, idx) => (
            <article
              key={review.id}
              className="relative p-6 rounded-2xl bg-charcoal-800 border border-cream-100/5 shadow-card hover:border-saffron-400/20 hover:shadow-card-hover transition-all duration-300"
              style={{ animationDelay: `${idx * 0.08}s` }}
            >
              <Quote className="absolute top-5 right-5 w-8 h-8 text-saffron-400/20" />

              {/* Stars */}
              <div className="flex items-center gap-0.5 mb-4">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 ${
                      i < review.rating
                        ? 'text-saffron-400 fill-saffron-400'
                        : 'text-cream-100/20'
                    }`}
                  />
                ))}
              </div>

              <p className="text-sm text-cream-100/70 leading-relaxed mb-6">
                "{review.text}"
              </p>

              <div className="flex items-center gap-3 pt-4 border-t border-cream-100/5">
                <div className="w-11 h-11 rounded-full bg-gradient-to-br from-saffron-400 to-crimson-600 flex items-center justify-center text-white font-bold text-base">
                  {review.name.charAt(0)}
                </div>
                <div>
                  <div className="text-sm font-bold text-cream-100">{review.name}</div>
                  <div className="text-xs text-cream-100/50">
                    {review.location} · {review.date}
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
