import React from 'react';
import { ChatInterface } from './ChatInterface';
import { CheckCircle2, ArrowRight, Star, MapPin } from 'lucide-react';

export const Hero: React.FC = () => {
  return (
    <section className="relative w-full min-h-[90vh] pt-32 pb-20 lg:pt-40 lg:pb-32 overflow-hidden bg-gradient-to-br from-black via-gray-900 to-black flex items-center">
      {/* Background Decor - Subtle pattern */}
      <div className="absolute inset-0 z-0 opacity-10 bg-[radial-gradient(#d4af37_1px,transparent_1px)] [background-size:40px_40px] pointer-events-none"></div>

      {/* Ambient glow effects */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-5%] w-[500px] h-[500px] bg-gold-400/10 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-[-10%] right-[-5%] w-[600px] h-[600px] bg-gold-400/5 rounded-full blur-[120px]"></div>
        <div className="absolute top-[30%] right-[15%] w-[200px] h-[200px] bg-gold-400/10 rounded-full blur-[80px]"></div>
      </div>

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">

          {/* Text Content */}
          <div className="flex-1 text-center lg:text-left space-y-8 max-w-2xl mx-auto lg:mx-0">

            {/* Trust Badge - Google Rating */}
            <div className="inline-flex items-center gap-3 px-5 py-2.5 bg-white/5 backdrop-blur-md rounded-full shadow-lg border border-gold-400/20 mx-auto lg:mx-0 animate-fade-in-up group hover:scale-[1.02] transition-transform cursor-default">
              <div className="flex gap-0.5 text-[#FBBC05]">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star key={star} size={16} fill="currentColor" strokeWidth={0} />
                ))}
              </div>
              <div className="h-4 w-px bg-white/20"></div>
              <div className="flex text-lg font-bold tracking-tighter">
                <span className="text-[#4285F4]">G</span>
                <span className="text-[#EA4335]">o</span>
                <span className="text-[#FBBC05]">o</span>
                <span className="text-[#4285F4]">g</span>
                <span className="text-[#34A853]">l</span>
                <span className="text-[#EA4335]">e</span>
              </div>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-7xl font-extrabold font-heading text-white leading-[1.1] tracking-tight">
              Lazíts. <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold-300 via-gold-400 to-gold-500">
                Töltődj fel.
              </span>
            </h1>

            <p className="text-lg md:text-xl text-gray-400 font-body leading-relaxed">
              5 csillagos masszázs élmény Nyíregyháza szívében. <br className="hidden md:block" />
              <strong className="text-gold-400">Bence</strong> – képzett masszőr, akire bátran ráhagyatkozhatsz.
            </p>

            {/* Address instead of Features */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start pt-2">
              <div className="flex items-center gap-3 text-gold-400 bg-gold-400/10 px-6 py-3 rounded-2xl border border-gold-400/20 shadow-lg shadow-gold-400/5">
                <MapPin className="shrink-0" size={24} />
                <span className="text-lg font-bold tracking-wide">4400 Nyíregyháza, Szent István utca 2.</span>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start pt-4">
              <button
                onClick={() => document.getElementById('chatbot-input')?.focus()}
                className="group flex items-center justify-center gap-3 px-8 py-4 rounded-2xl font-bold font-heading border border-gold-400/30 text-gold-400 hover:bg-gold-400/10 hover:border-gold-400 transition-all duration-300"
              >
                Segíts választani
                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </button>
              <a
                href="/foglalas"
                className="group flex items-center justify-center gap-3 bg-gradient-to-r from-gold-400 to-gold-500 text-black px-8 py-4 rounded-2xl font-bold font-heading shadow-xl shadow-gold-400/20 hover:from-gold-500 hover:to-gold-600 hover:scale-[1.02] transition-all transform"
              >
                Időpontfoglalás
              </a>
            </div>
          </div>

          {/* Chatbot Interface - Hero Piece */}
          <div className="flex-1 w-full relative perspective-1000">
            {/* Glow Effect behind chat */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-gradient-to-tr from-gold-400/10 to-gold-600/5 blur-3xl rounded-full z-0"></div>

            <div className="relative z-10">
              <ChatInterface />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};