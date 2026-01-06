import React from 'react';
import { LANDING_DATA } from '../constants';
import { ArrowRight } from 'lucide-react';

const STATIC_IMAGES: Record<string, string> = {
  "Svéd Masszázs": "/images/sved-masszazs.jpg",
  "Relax Masszázs": "/images/relax-masszazs-1.jpg",
  "Aromaterápiás Masszázs": "/images/relax-masszazs-2.jpg",
  "Talpmasszázs": "/images/nyak-masszazs.jpg",
  "Speciális Kezelések": "/images/sport-masszazs.jpg"
};

export const SolutionSection: React.FC = () => {
  const marqueeItems = [...LANDING_DATA.service_categories, ...LANDING_DATA.service_categories];

  const scrollToChatbot = () => {
    const chatInput = document.getElementById('chatbot-input');
    if (chatInput) {
      chatInput.scrollIntoView({ behavior: 'smooth', block: 'center' });
      setTimeout(() => chatInput.focus(), 500);
    }
  };

  return (
    <section id="solutions" className="py-24 bg-black text-white relative overflow-hidden">
      {/* Background patterns */}
      <div className="absolute top-0 left-0 w-full h-full opacity-5 bg-[radial-gradient(#d4af37_1px,transparent_1px)] [background-size:40px_40px]"></div>
      <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-gold-400/5 to-transparent"></div>

      <div className="container mx-auto px-4 relative z-10 mb-16">
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto">
          <span className="text-gold-400 font-bold uppercase tracking-widest text-sm mb-3 block">Szolgáltatásaink</span>
          <h2 className="text-3xl md:text-5xl font-bold font-heading text-white mb-6">
            Professzionális Masszázs Kezelések
          </h2>
          <p className="text-gray-400 text-lg leading-relaxed">
            Válaszd ki a számodra ideális kezelést. Svéd, relax, aromaterápiás és speciális technikák a tested felfrissítéséért.
          </p>
        </div>
      </div>

      <div className="relative w-full overflow-hidden pb-12">
        <div className="flex w-max animate-marquee hover:[animation-play-state:paused] items-stretch gap-6 px-4">
          {marqueeItems.map((service, idx) => (
            <div
              key={`${service.category_name}-${idx}`}
              onClick={scrollToChatbot}
              className="w-[300px] md:w-[380px] flex flex-col bg-white/5 backdrop-blur-md rounded-2xl border border-gold-400/20 transition-all duration-300 group overflow-hidden hover:bg-white/10 hover:shadow-2xl hover:shadow-gold-400/10 hover:-translate-y-2 cursor-pointer"
            >
              <div className="h-48 w-full relative overflow-hidden shrink-0">
                <img
                  src={STATIC_IMAGES[service.category_name] || "/images/sved-masszazs.jpg"}
                  alt={service.category_name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-80 group-hover:opacity-100"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-80"></div>
              </div>

              <div className="p-6 flex flex-col flex-grow relative">
                <h3 className="text-xl font-bold font-heading mb-3 text-white group-hover:text-gold-400 transition-colors">
                  {service.category_name}
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed mb-4 flex-grow">
                  {service.description}
                </p>
                <div className="mt-auto flex items-center text-gold-400 text-sm font-bold gap-1 opacity-0 group-hover:opacity-100 transition-opacity transform translate-y-2 group-hover:translate-y-0">
                  Tudj meg többet <ArrowRight size={14} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="container mx-auto px-4 relative z-10 flex justify-center pb-4">
        <button
          onClick={() => document.getElementById('chatbot-input')?.focus()}
          className="text-gold-400 border border-gold-400/50 px-8 py-4 rounded-full hover:bg-gold-400 hover:text-black transition-all font-bold flex items-center gap-3 group bg-gold-400/5 backdrop-blur-sm"
        >
          Melyik masszázs való nekem? <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
    </section>
  );
};