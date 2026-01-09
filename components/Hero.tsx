import React from 'react';
import { ChatInterface } from './ChatInterface';
import { ArrowRight, Award, GraduationCap, Globe, FileCheck, MapPin } from 'lucide-react';
import { DOCTOR_CREDENTIALS, TRUST_ELEMENTS, LANDING_DATA } from '../constants';

export const Hero: React.FC = () => {
  return (
    <section className="relative w-full min-h-[90vh] pt-32 pb-20 lg:pt-40 lg:pb-32 overflow-hidden bg-gradient-to-br from-white via-slate-50 to-teal-50/30 flex items-center">
      {/* Background Decor - Subtle pattern */}
      <div className="absolute inset-0 z-0 opacity-30 bg-[radial-gradient(#0d9488_0.5px,transparent_0.5px)] [background-size:32px_32px] pointer-events-none"></div>

      {/* Ambient glow effects */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-5%] w-[500px] h-[500px] bg-teal-400/10 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-[-10%] right-[-5%] w-[600px] h-[600px] bg-teal-400/5 rounded-full blur-[120px]"></div>
      </div>

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">

          {/* Text Content */}
          <div className="flex-1 text-center lg:text-left space-y-8 max-w-2xl mx-auto lg:mx-0">

            {/* Trust Badge */}
            <div className="inline-flex items-center gap-3 px-5 py-2.5 bg-white/80 backdrop-blur-md rounded-full shadow-lg border border-teal-100 mx-auto lg:mx-0 animate-fade-in group hover:scale-[1.02] transition-transform cursor-default">
              <Award className="text-teal-600" size={20} />
              <span className="text-slate-700 font-semibold text-sm">25+ év szakmai tapasztalat</span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold font-heading text-slate-800 leading-[1.1] tracking-tight">
              Professzionális <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-500 via-teal-600 to-teal-700">
                Plasztikai Sebészet
              </span>
            </h1>

            <div className="space-y-2">
              <p className="text-xl md:text-2xl text-slate-700 font-heading font-semibold">
                Dr. Péter Zoltán
              </p>
              <p className="text-lg text-slate-500">
                Egyetemi Főorvos • Plasztikai Sebész
              </p>
            </div>

            <p className="text-lg text-slate-600 font-body leading-relaxed">
              Nemzetközi tapasztalat, modern technikák, személyre szabott megoldások.
              <br className="hidden md:block" />
              <strong className="text-teal-600">Debrecenben</strong>, az Ön szolgálatában.
            </p>

            {/* Address Card */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start pt-2">
              <div className="flex items-center gap-3 text-slate-600 bg-white px-6 py-3 rounded-2xl border border-slate-200 shadow-lg">
                <MapPin className="shrink-0 text-teal-600" size={24} />
                <span className="text-base font-medium">{LANDING_DATA.contact_details.address}</span>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start pt-4">
              <button
                onClick={() => document.getElementById('chatbot-input')?.focus()}
                className="group flex items-center justify-center gap-3 px-8 py-4 rounded-2xl font-bold font-heading border border-teal-300 text-teal-600 hover:bg-teal-50 hover:border-teal-400 transition-all duration-300"
              >
                Mire számíthatok?
                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </button>
              <a
                href="/foglalas"
                className="group flex items-center justify-center gap-3 bg-gradient-to-r from-teal-500 to-teal-600 text-white px-8 py-4 rounded-2xl font-bold font-heading shadow-xl shadow-teal-500/20 hover:from-teal-600 hover:to-teal-700 hover:scale-[1.02] transition-all transform"
              >
                Konzultáció kérése
              </a>
            </div>
          </div>

          {/* Chatbot Interface - Hero Piece */}
          <div className="flex-1 w-full relative perspective-1000">
            {/* Glow Effect behind chat */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-gradient-to-tr from-teal-400/10 to-teal-600/5 blur-3xl rounded-full z-0"></div>

            <div className="relative z-10">
              <ChatInterface />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};