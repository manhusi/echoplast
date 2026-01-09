import React from 'react';
import { ECHOPLAST_SERVICES, LANDING_DATA } from '../constants';
import { ArrowRight } from 'lucide-react';

// Static placeholder images for procedures
const PROCEDURE_IMAGES: Record<string, string> = {
  "Mellnagyobbítás": "https://images.unsplash.com/photo-1559757175-0eb30cd8c063?w=400&h=300&fit=crop",
  "Zsírleszívás": "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop",
  "Mellfelvarrás": "https://images.unsplash.com/photo-1559757175-0eb30cd8c063?w=400&h=300&fit=crop",
  "Szemhéjplasztika": "https://images.unsplash.com/photo-1516914943479-89db7d9ae7f2?w=400&h=300&fit=crop",
  "Hasplasztika": "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop",
  "Orrplasztika": "https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?w=400&h=300&fit=crop",
  "Fülplasztika": "https://images.unsplash.com/photo-1516914943479-89db7d9ae7f2?w=400&h=300&fit=crop",
  "Mellkisebbítés": "https://images.unsplash.com/photo-1559757175-0eb30cd8c063?w=400&h=300&fit=crop",
  "Arcplasztika (Face-lift)": "https://images.unsplash.com/photo-1516914943479-89db7d9ae7f2?w=400&h=300&fit=crop",
  "Hajátültetés": "https://images.unsplash.com/photo-1585747860715-2ba37e788b70?w=400&h=300&fit=crop",
  "Hónalji hyperhidrosis kezelés": "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=400&h=300&fit=crop",
  "Anyajegyek és bőrdaganatok kimetszése": "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=400&h=300&fit=crop",
  "Gynecomastia kezelés": "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop",
};

const DEFAULT_IMAGE = "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=400&h=300&fit=crop";

export const SolutionSection: React.FC = () => {
  // Take first 8 services for display, duplicate for marquee
  const displayServices = ECHOPLAST_SERVICES.slice(0, 8);
  const marqueeItems = [...displayServices, ...displayServices];

  const askAboutProcedure = (procedureName: string) => {
    const chatInput = document.getElementById('chatbot-input') as HTMLInputElement;
    if (chatInput) {
      chatInput.scrollIntoView({ behavior: 'smooth', block: 'center' });
      setTimeout(() => {
        const message = `Érdekel a ${procedureName}. Mire számíthatok?`;

        const nativeInputValueSetter = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, 'value')?.set;
        nativeInputValueSetter?.call(chatInput, message);

        const inputEvent = new Event('input', { bubbles: true });
        chatInput.dispatchEvent(inputEvent);

        setTimeout(() => {
          const enterEvent = new KeyboardEvent('keydown', {
            key: 'Enter',
            code: 'Enter',
            keyCode: 13,
            which: 13,
            bubbles: true
          });
          chatInput.dispatchEvent(enterEvent);
        }, 100);
      }, 600);
    }
  };

  return (
    <section id="services" className="py-24 bg-white text-slate-800 relative overflow-hidden">
      {/* Background patterns */}
      <div className="absolute top-0 left-0 w-full h-full opacity-30 bg-[radial-gradient(#0d9488_0.5px,transparent_0.5px)] [background-size:32px_32px]"></div>
      <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-teal-50/50 to-transparent"></div>

      <div className="container mx-auto px-4 relative z-10 mb-16">
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto">
          <span className="text-teal-600 font-bold uppercase tracking-widest text-sm mb-3 block">Beavatkozásaink</span>
          <h2 className="text-3xl md:text-5xl font-bold font-heading text-slate-800 mb-6">
            Plasztikai Sebészeti Szolgáltatások
          </h2>
          <p className="text-slate-600 text-lg leading-relaxed">
            Modern technikák, tapasztalt sebész, természetes eredmények.
            <br className="hidden md:block" />
            Ismerje meg beavatkozásainkat és kérjen személyre szabott konzultációt.
          </p>
        </div>
      </div>

      <div className="relative w-full overflow-hidden pb-12">
        <div className="flex w-max animate-marquee hover:[animation-play-state:paused] items-stretch gap-6 px-4">
          {marqueeItems.map((service, idx) => (
            <div
              key={`${service.service_name}-${idx}`}
              onClick={() => askAboutProcedure(service.service_name)}
              className="w-[300px] md:w-[350px] flex flex-col bg-white backdrop-blur-md rounded-2xl border border-slate-200 transition-all duration-300 group overflow-hidden hover:border-teal-300 hover:shadow-2xl hover:shadow-teal-500/10 hover:-translate-y-2 cursor-pointer"
            >
              <div className="h-48 w-full relative overflow-hidden shrink-0 bg-gradient-to-br from-teal-100 to-slate-100">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-20 h-20 bg-teal-500/20 rounded-full flex items-center justify-center">
                    <span className="text-3xl text-teal-600">💎</span>
                  </div>
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent opacity-80"></div>
              </div>

              <div className="p-6 flex flex-col flex-grow relative">
                <h3 className="text-xl font-bold font-heading mb-3 text-slate-800 group-hover:text-teal-600 transition-colors">
                  {service.service_name}
                </h3>
                <p className="text-slate-600 text-sm leading-relaxed mb-4 flex-grow">
                  {service.description}
                </p>
                <div className="mt-auto flex items-center text-teal-600 text-sm font-bold gap-1 opacity-0 group-hover:opacity-100 transition-opacity transform translate-y-2 group-hover:translate-y-0">
                  Tudjon meg többet <ArrowRight size={14} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Service Categories */}
      <div className="container mx-auto px-4 relative z-10 mt-8">
        <div className="grid md:grid-cols-4 gap-4 max-w-5xl mx-auto mb-12">
          {LANDING_DATA.service_categories.map((cat, i) => (
            <div key={i} className="bg-slate-50 rounded-xl p-5 border border-slate-200 hover:border-teal-300 hover:bg-teal-50/50 transition-all cursor-pointer group"
              onClick={() => {
                const chatInput = document.getElementById('chatbot-input');
                chatInput?.focus();
              }}
            >
              <h4 className="font-bold text-slate-800 mb-2 group-hover:text-teal-600 transition-colors">{cat.category_name}</h4>
              <p className="text-sm text-slate-600 leading-relaxed">{cat.description}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="container mx-auto px-4 relative z-10 flex justify-center pb-4">
        <button
          onClick={() => document.getElementById('chatbot-input')?.focus()}
          className="text-teal-600 border border-teal-300 px-8 py-4 rounded-full hover:bg-teal-500 hover:text-white hover:border-teal-500 transition-all font-bold flex items-center gap-3 group bg-white shadow-lg"
        >
          Melyik beavatkozás való nekem? <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
    </section>
  );
};