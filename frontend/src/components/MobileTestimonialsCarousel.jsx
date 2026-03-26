import React, { useEffect, useRef, useState } from 'react';

// Mobile-only testimonials carousel
const testimonials = [
  {
    quote:
      'Estate Curator transformed our living spaces into timeless blends of heritage and luxury.',
    name: 'Alex M.',
    title: 'Property Investor',
  },
  {
    quote:
      'The Northern designs feel premium yet welcoming — a rare balance.',
    name: 'Priya K.',
    title: 'Architect',
  },
  {
    quote:
      'Quality, integrity, and thoughtful detail from start to finish.',
    name: 'Jon D.',
    title: 'Home Owner',
  },
  {
    quote:
      'Sustainability with style; the spaces breathe with the climate.',
    name: 'Nila P.',
    title: 'Developer',
  },
  {
    quote:
      'The team understands place and culture; the spaces breathe.',
    name: 'Sanjay R.',
    title: 'Gallerist',
  },
];

const MobileTestimonialsCarousel = () => {
  const [index, setIndex] = useState(0);
  const length = testimonials.length;
  const touchStartX = useRef(null);
  const touchEndX = useRef(null);

  // Auto-rotate every 4 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((i) => (i + 1) % length);
    }, 4000);
    return () => clearInterval(interval);
  }, [length]);

  // Swipe handling for mobile
  const onTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };
  const onTouchMove = (e) => {
    touchEndX.current = e.touches[0].clientX;
  };
  const onTouchEnd = () => {
    if (touchStartX.current != null && touchEndX.current != null) {
      const delta = touchEndX.current - touchStartX.current;
      if (Math.abs(delta) > 40) {
        if (delta < 0) {
          // swipe left -> next
          setIndex((i) => (i + 1) % length);
        } else {
          // swipe right -> previous
          setIndex((i) => (i - 1 + length) % length);
        }
      }
    }
    touchStartX.current = null;
    touchEndX.current = null;
  };

  return (
    <section className="md:hidden py-6" aria-label="What Our Clients Say (mobile)">
      <div className="max-w-sm mx-auto px-4">
        <h2 className="text-lg font-semibold mb-4">What Our Clients Say</h2>
        <div
          className="relative overflow-hidden rounded-lg shadow-md bg-white p-5"
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
        >
          {testimonials.map((t, i) => (
            <div
              key={i}
              role="article"
              aria-label={`${t.name} testimonial`}
              className={`transition-opacity duration-500 ${i === index ? 'opacity-100' : 'opacity-0 absolute top-0 left-0 w-full'}`}
              style={{ minHeight: 120 }}
            >
              <p className="text-gray-800 italic mb-4">“{t.quote}”</p>
              <div className="text-sm font-semibold">{t.name}</div>
              <div className="text-xs text-gray-500">{t.title}</div>
            </div>
          ))}
          <div className="absolute bottom-2 left-0 right-0 flex justify-center space-x-2">
            {testimonials.map((_, idx) => (
              <span key={idx} className={`inline-block w-2 h-2 rounded-full ${idx === index ? 'bg-gray-800' : 'bg-gray-300'}`} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default MobileTestimonialsCarousel;
