import { useState } from 'react';
import { galleryImages } from '@/data';
import { X, ZoomIn } from 'lucide-react';
import { useScrollReveal } from '@/hooks';

export default function Gallery() {
  const { ref, visible } = useScrollReveal();
  const [lightbox, setLightbox] = useState<number | null>(null);

  return (
    <section id="gallery" className="py-20 sm:py-28 bg-charcoal-900">
      <div
        ref={ref}
        className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 reveal ${visible ? 'visible' : ''}`}
      >
        {/* Header */}
        <div className="text-center mb-12">
          <span className="text-sm font-semibold uppercase tracking-[0.2em] text-saffron-400 mb-3 block">
            Gallery
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-cream-100 mb-4">
            A Glimpse Into Our <span className="text-gradient-gold">World</span>
          </h2>
          <p className="text-cream-100/60 max-w-2xl mx-auto text-base">
            Step inside Spice Garden and experience the warmth of our restaurant, the artistry of
            our chefs, and the beauty of our cuisine.
          </p>
        </div>

        {/* Masonry grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
          {galleryImages.map((img, idx) => (
            <button
              key={idx}
              onClick={() => setLightbox(idx)}
              className={`group relative overflow-hidden rounded-2xl shadow-card cursor-pointer ${
                idx === 0 ? 'col-span-2 row-span-2' : ''
              } ${idx === 3 ? 'col-span-2' : ''}`}
            >
              <img
                src={img.src}
                alt={img.alt}
                loading="lazy"
                className={`w-full object-cover group-hover:scale-110 transition-transform duration-500 ${
                  idx === 0 ? 'h-full min-h-[300px]' : 'h-40 sm:h-52'
                } ${idx === 3 ? 'h-40 sm:h-52' : ''}`}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal-950/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="absolute bottom-0 left-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity">
                <span className="text-xs text-saffron-400 font-semibold uppercase tracking-wider">
                  {img.category}
                </span>
                <p className="text-sm text-cream-100 mt-0.5 line-clamp-1">{img.alt}</p>
              </div>
              <div className="absolute top-3 right-3 w-8 h-8 rounded-full glass flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <ZoomIn className="w-4 h-4 text-cream-100" />
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {lightbox !== null && (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center bg-charcoal-950/95 animate-fade-in p-4"
          onClick={() => setLightbox(null)}
        >
          <button
            className="absolute top-5 right-5 w-10 h-10 rounded-full glass flex items-center justify-center hover:bg-cream-100/10 transition-all"
            onClick={() => setLightbox(null)}
            aria-label="Close lightbox"
          >
            <X className="w-5 h-5 text-cream-100" />
          </button>
          <img
            src={galleryImages[lightbox].src.replace('h=600&w=800', 'h=900&w=1200')}
            alt={galleryImages[lightbox].alt}
            className="max-w-full max-h-[85vh] rounded-2xl shadow-card object-contain"
            onClick={(e) => e.stopPropagation()}
          />
          <div className="absolute bottom-6 left-0 right-0 text-center">
            <span className="text-saffron-400 text-sm font-semibold uppercase tracking-wider">
              {galleryImages[lightbox].category}
            </span>
            <p className="text-cream-100 mt-1">{galleryImages[lightbox].alt}</p>
          </div>
        </div>
      )}
    </section>
  );
}
