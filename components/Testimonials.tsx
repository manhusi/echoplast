import React from 'react';
import { LANDING_DATA } from '../constants';
import { Star, ChevronLeft, Quote } from 'lucide-react';

export const Testimonials: React.FC = () => {
  const testimonials = LANDING_DATA.trust_signals.filter(t => t.type === 'testimonial');

  return (
    <section className="py-20 bg-gradient-to-b from-black to-gray-900 overflow-hidden">
      <div className="container mx-auto px-4 relative">

        {/* Header Widget */}
        <div className="flex flex-col items-center mb-16">
          <h2 className="text-xl md:text-2xl font-bold font-heading text-gold-400 uppercase tracking-widest mb-4">
            Vélemények
          </h2>
          <div className="flex gap-1.5 text-gold-400 mb-3">
            {[1, 2, 3, 4, 5].map((s) => (
              <Star key={s} size={28} fill="currentColor" strokeWidth={0} />
            ))}
          </div>
          <p className="text-gray-400 text-center">
            Vendégeink elégedettsége a legfontosabb
          </p>
        </div>

        {/* Carousel / Grid Area */}
        <div className="relative max-w-7xl mx-auto">

          {/* Decorative Left Arrow (Visual only for now) */}
          <div className="hidden lg:flex absolute left-[-40px] top-1/2 -translate-y-1/2 text-gray-600 cursor-pointer hover:text-gold-400 transition-colors">
            <ChevronLeft size={32} />
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-10">
            {testimonials.slice(0, 3).map((test, idx) => (
              <div key={idx} className="bg-white/5 backdrop-blur-sm border border-gold-400/20 rounded-2xl p-6 md:p-8 flex flex-col h-full hover:bg-white/10 transition-colors">

                {/* Quote Icon */}
                <div className="mb-4">
                  <Quote size={32} className="text-gold-400/50" />
                </div>

                {/* Content */}
                <div className="flex-grow mb-6">
                  <p className="text-gray-300 text-[15px] leading-relaxed">
                    "{test.content}"
                  </p>
                </div>

                {/* Card Footer */}
                <div className="flex items-center justify-between pt-4 border-t border-white/10">
                  <div className="flex items-center gap-3">
                    <img
                      src={test.avatar}
                      alt={test.source || 'User'}
                      className="w-10 h-10 rounded-full object-cover shadow-sm border border-gold-400/30"
                      loading="lazy"
                    />
                    <div>
                      <h4 className="font-bold text-white text-[15px] leading-tight">
                        {test.source}
                      </h4>
                      <span className="text-gray-500 text-xs">{test.date}</span>
                    </div>
                  </div>
                  {/* Rating */}
                  <div className="flex text-gold-400 gap-0.5">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <Star key={s} size={14} fill="currentColor" strokeWidth={0} />
                    ))}
                  </div>
                </div>

              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};