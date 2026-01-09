import React from 'react';
import { Award, GraduationCap, Globe, FileCheck, Stethoscope, Users } from 'lucide-react';
import { DOCTOR_CREDENTIALS, TRUST_ELEMENTS } from '../constants';

export const ProblemSection: React.FC = () => {
  const trustCards = [
    {
      icon: Award,
      gradient: "from-teal-500/10 via-teal-400/10 to-cyan-500/10",
      iconGradient: "from-teal-500 to-teal-600",
      title: "25+ év tapasztalat",
      desc: "1998 óta végzünk esztétikai műtéteket magas színvonalon. Több ezer elégedett páciens.",
      highlight: "Rutinos, biztos kezek"
    },
    {
      icon: GraduationCap,
      gradient: "from-cyan-500/10 via-blue-500/10 to-teal-500/10",
      iconGradient: "from-cyan-500 to-blue-600",
      title: "Egyetemi Főorvos",
      desc: "Dr. Péter Zoltán a Debreceni Egyetem Bőr- és Nemikórtani Klinikájának főorvosa.",
      highlight: "Akadémiai háttér"
    },
    {
      icon: Globe,
      gradient: "from-blue-500/10 via-indigo-500/10 to-violet-500/10",
      iconGradient: "from-blue-500 to-indigo-600",
      title: "Nemzetközi képzés",
      desc: "Koppenhága, Dublin, Linköping - európai vezető klinikákon szerzett tapasztalat.",
      highlight: "Világszínvonalú tudás"
    },
    {
      icon: FileCheck,
      gradient: "from-emerald-500/10 via-teal-500/10 to-cyan-500/10",
      iconGradient: "from-emerald-500 to-teal-600",
      title: "ÁNTSZ engedélyezett",
      desc: "Hivatalosan engedélyezett rendelő, a legmagasabb biztonsági és higiénés szabványokkal.",
      highlight: "Engedélyszám: 060060274"
    }
  ];

  const scrollToChatbot = () => {
    const chatInput = document.getElementById('chatbot-input');
    if (chatInput) {
      chatInput.scrollIntoView({ behavior: 'smooth', block: 'center' });
      setTimeout(() => chatInput.focus(), 500);
    }
  };

  return (
    <section className="py-24 bg-gradient-to-b from-slate-50 via-white to-slate-50 relative z-10 overflow-hidden">
      {/* Decorative background effects */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-teal-400/10 rounded-full blur-3xl opacity-40"></div>
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-teal-400/5 rounded-full blur-3xl opacity-40"></div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <span className="text-teal-600 font-bold uppercase tracking-widest text-sm mb-3 block">Miért válasszon minket?</span>
          <h2 className="text-4xl md:text-5xl font-extrabold font-heading text-slate-800 mb-6 leading-tight">
            Tapasztalat és{' '}
            <span className="bg-gradient-to-r from-teal-500 to-teal-600 bg-clip-text text-transparent">
              megbízhatóság
            </span>
          </h2>
          <p className="text-lg text-slate-600 leading-relaxed">
            Az Ön biztonsága és elégedettsége a legfontosabb számunkra.
            <br className="hidden md:block" />
            <span className="font-semibold text-teal-600">Dr. Péter Zoltán</span> garantálja a szakértelmet.
          </p>
          <div className="w-24 h-1.5 bg-gradient-to-r from-teal-400 to-teal-600 mx-auto mt-6 rounded-full"></div>
        </div>

        <div className="grid md:grid-cols-2 gap-6 lg:gap-8 max-w-6xl mx-auto">
          {trustCards.map((card, idx) => (
            <div
              key={idx}
              className={`group relative bg-white backdrop-blur-sm rounded-3xl p-8 border border-slate-200 shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2`}
            >
              {/* Glow effect on hover */}
              <div className={`absolute inset-0 rounded-3xl bg-gradient-to-br ${card.iconGradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500 blur-xl`}></div>

              <div className="relative z-10">
                {/* Icon with gradient */}
                <div className={`mb-6 w-14 h-14 rounded-2xl bg-gradient-to-br ${card.iconGradient} text-white flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-all duration-500`}>
                  <card.icon size={28} strokeWidth={2} />
                </div>

                {/* Title */}
                <h3 className="text-2xl font-bold font-heading text-slate-800 mb-4 leading-tight">
                  {card.title}
                </h3>

                {/* Description */}
                <p className="text-slate-600 leading-relaxed mb-4">
                  {card.desc}
                </p>

                {/* Highlight - highlighted */}
                <div className="pt-4 border-t border-slate-100">
                  <p className="text-sm font-semibold text-teal-600 flex items-start gap-2">
                    <span className="mt-0.5">→</span>
                    <span>{card.highlight}</span>
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Doctor credentials */}
        <div className="mt-16 max-w-4xl mx-auto">
          <div className="bg-gradient-to-br from-teal-600 to-teal-700 rounded-3xl p-8 md:p-12 text-white shadow-2xl shadow-teal-600/20">
            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="shrink-0">
                <div className="w-24 h-24 bg-white/20 rounded-full flex items-center justify-center">
                  <Stethoscope size={48} className="text-white" />
                </div>
              </div>
              <div className="flex-1 text-center md:text-left">
                <h3 className="text-2xl font-bold font-heading mb-2">{DOCTOR_CREDENTIALS.name}</h3>
                <p className="text-teal-100 mb-4">{DOCTOR_CREDENTIALS.title} • {DOCTOR_CREDENTIALS.specialty}</p>
                <p className="text-teal-50 text-sm leading-relaxed mb-4">
                  {DOCTOR_CREDENTIALS.publications}
                </p>
                <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                  {DOCTOR_CREDENTIALS.specializations.slice(0, 3).map((spec, i) => (
                    <span key={i} className="text-xs bg-white/20 px-3 py-1 rounded-full">
                      {spec}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Button */}
        <div className="mt-16 text-center">
          <button
            onClick={scrollToChatbot}
            className="group inline-flex items-center gap-3 bg-gradient-to-r from-teal-500 to-teal-600 text-white px-10 py-5 rounded-2xl font-bold text-lg shadow-2xl shadow-teal-500/30 hover:shadow-teal-500/50 hover:scale-[1.05] transition-all duration-300"
          >
            <Users size={24} className="group-hover:rotate-12 transition-transform" />
            Beszéljünk az Ön igényeiről
            <span className="text-2xl">→</span>
          </button>
          <p className="text-sm text-slate-500 mt-4">
            Virtuális asszisztensünk segít az első lépésekben
          </p>
        </div>
      </div>
    </section>
  );
};