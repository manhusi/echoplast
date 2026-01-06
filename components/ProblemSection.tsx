import React from 'react';
import { Frown, BatteryLow, AlertCircle, Zap, MessageCircle } from 'lucide-react';

export const ProblemSection: React.FC = () => {
  const problems = [
    {
      icon: Frown,
      gradient: "from-gold-400/10 via-gold-500/10 to-amber-500/10",
      iconGradient: "from-gold-400 to-gold-600",
      glowColor: "shadow-gold-400/20",
      title: "Feszültség és izommerevség",
      desc: "Egész nap ülsz az irodában vagy fizikailag megterhelő munkát végzel? Az izmaid megfeszülnek, a nyakad, hátad fáj, és nehezen tudsz ellazulni.",
      impact: "A rendszeres feszültség hosszú távon komolyabb problémákhoz vezethet."
    },
    {
      icon: BatteryLow,
      gradient: "from-amber-500/10 via-orange-500/10 to-red-500/10",
      iconGradient: "from-amber-500 to-orange-600",
      glowColor: "shadow-orange-500/20",
      title: "Krónikus fáradtság és kimerültség",
      desc: "Hiába alszol eleget, mégis fáradtan ébredsz? A tested jelez, hogy szüksége van regenerálódásra – de a mindennapok forgatagában erre ritkán jut idő.",
      impact: "A kimerültség csökkenti a teljesítőképességed és az életminőséged."
    },
    {
      icon: AlertCircle,
      gradient: "from-rose-500/10 via-pink-500/10 to-purple-500/10",
      iconGradient: "from-rose-500 to-pink-600",
      glowColor: "shadow-rose-500/20",
      title: "Stressz és alvási problémák",
      desc: "A stressz nemcsak a fejedben van – a testedben is megjelenik. Rossz alvás, fejfájás, hangulatváltozások jelzik, hogy ideje tenni valamit.",
      impact: "A stressz kezeletlen marad, ha csak a tüneteket kezeled."
    },
    {
      icon: Zap,
      gradient: "from-violet-500/10 via-purple-500/10 to-fuchsia-500/10",
      iconGradient: "from-violet-500 to-purple-600",
      glowColor: "shadow-purple-500/20",
      title: "Sport utáni regeneráció",
      desc: "Edzés után fájnak az izmaid, lassan regenerálódsz? A masszázs felgyorsítja a felépülést és csökkenti az izomlázat.",
      impact: "Masszázs nélkül tovább tart a regeneráció és nagyobb a sérülés kockázata."
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
    <section className="py-24 bg-gradient-to-b from-gray-900 via-gray-950 to-black relative z-10 -mt-8 rounded-t-[3rem] shadow-[0_-20px_50px_rgba(0,0,0,0.3)] overflow-hidden">
      {/* Decorative background effects */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-gold-400/10 rounded-full blur-3xl opacity-40"></div>
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-gold-400/5 rounded-full blur-3xl opacity-40"></div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <h2 className="text-4xl md:text-5xl font-extrabold font-heading text-white mb-6 leading-tight">
            Ismerős{' '}
            <span className="bg-gradient-to-r from-gold-400 to-gold-500 bg-clip-text text-transparent">
              helyzetek
            </span>
            ?
          </h2>
          <p className="text-lg text-gray-400 leading-relaxed">
            Nem vagy egyedül ezekkel. Sok ember küzd hasonló problémákkal –
            és <span className="font-bold text-gold-400">van megoldás</span>.
          </p>
          <div className="w-24 h-1.5 bg-gradient-to-r from-gold-400 to-gold-600 mx-auto mt-6 rounded-full"></div>
        </div>

        <div className="grid md:grid-cols-2 gap-6 lg:gap-8 max-w-6xl mx-auto">
          {problems.map((prob, idx) => (
            <div
              key={idx}
              className={`group relative bg-gradient-to-br ${prob.gradient} backdrop-blur-sm rounded-3xl p-8 border border-white/10 shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2`}
            >
              {/* Glow effect on hover */}
              <div className={`absolute inset-0 rounded-3xl bg-gradient-to-br ${prob.iconGradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500 blur-xl`}></div>

              <div className="relative z-10">
                {/* Icon with gradient */}
                <div className={`mb-6 w-14 h-14 rounded-2xl bg-gradient-to-br ${prob.iconGradient} text-white flex items-center justify-center shadow-lg ${prob.glowColor} group-hover:scale-110 group-hover:rotate-3 transition-all duration-500`}>
                  <prob.icon size={28} strokeWidth={2} />
                </div>

                {/* Title */}
                <h3 className="text-2xl font-bold font-heading text-white mb-4 leading-tight">
                  {prob.title}
                </h3>

                {/* Description */}
                <p className="text-gray-300 leading-relaxed mb-4">
                  {prob.desc}
                </p>

                {/* Impact - highlighted */}
                <div className="pt-4 border-t border-white/10">
                  <p className="text-sm font-semibold text-gray-400 italic flex items-start gap-2">
                    <span className="text-gold-400 mt-0.5">→</span>
                    <span>{prob.impact}</span>
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Button to Chatbot */}
        <div className="mt-16 text-center">
          <button
            onClick={scrollToChatbot}
            className="group inline-flex items-center gap-3 bg-gradient-to-r from-gold-400 to-gold-500 text-black px-10 py-5 rounded-2xl font-bold text-lg shadow-2xl shadow-gold-400/30 hover:shadow-gold-400/50 hover:scale-[1.05] transition-all duration-300"
          >
            <MessageCircle size={24} className="group-hover:rotate-12 transition-transform" />
            Találd meg a megoldást
            <span className="text-2xl">→</span>
          </button>
          <p className="text-sm text-gray-500 mt-4">
            Segítünk kiválasztani a neked megfelelő masszázst
          </p>
        </div>
      </div>
    </section>
  );
};