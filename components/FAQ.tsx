import React, { useState } from 'react';
import { FAQ_ITEMS } from '../constants';
import { Plus, Minus } from 'lucide-react';

export const FAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="py-20 bg-slate-50">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="text-center mb-12">
          <span className="text-teal-600 font-bold uppercase tracking-widest text-sm mb-3 block">Kérdések</span>
          <h2 className="text-3xl md:text-4xl font-bold font-heading text-slate-800 mb-4">
            Gyakori Kérdések
          </h2>
          <p className="text-slate-600">
            Válaszok a leggyakrabban feltett kérdésekre a plasztikai sebészettel kapcsolatban
          </p>
        </div>

        <div className="space-y-4">
          {FAQ_ITEMS.map((item, index) => (
            <div key={index} className="border border-slate-200 rounded-2xl overflow-hidden transition-all duration-300 hover:border-teal-300 bg-white shadow-sm hover:shadow-lg">
              <button
                className="w-full flex items-center justify-between p-6 text-left focus:outline-none"
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
              >
                <span className="font-bold text-lg text-slate-800 font-heading pr-4">{item.question}</span>
                <span className={`p-2 rounded-full transition-colors shrink-0 ${openIndex === index ? 'bg-teal-500 text-white' : 'bg-slate-100 text-teal-600'}`}>
                  {openIndex === index ? <Minus size={20} /> : <Plus size={20} />}
                </span>
              </button>
              <div
                className={`overflow-hidden transition-all duration-300 ease-in-out ${openIndex === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                  }`}
              >
                <div className="p-6 pt-0 text-slate-600 leading-relaxed border-t border-slate-100">
                  {item.answer}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Contact CTA */}
        <div className="mt-12 text-center bg-gradient-to-r from-teal-500 to-teal-600 rounded-2xl p-8 text-white">
          <h3 className="text-xl font-bold mb-2">Van más kérdése?</h3>
          <p className="text-teal-100 mb-6">Hívjon minket, vagy kérjen konzultációt online!</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="tel:+36209763574" className="bg-white text-teal-600 px-6 py-3 rounded-full font-bold hover:bg-teal-50 transition-colors">
              +36/20 976-3574
            </a>
            <a href="/foglalas" className="bg-teal-700 text-white px-6 py-3 rounded-full font-bold hover:bg-teal-800 transition-colors border border-teal-400">
              Online konzultáció
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};