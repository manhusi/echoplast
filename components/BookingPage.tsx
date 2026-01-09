import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Calendar, Clock, MapPin, Star, Sparkles, Bot } from 'lucide-react';
import { BookingWidget } from '../booking/BookingWidget';
import '../booking/styles.css';

// Parse search params
export const BookingPage: React.FC = () => {
  const [searchParams] = React.useMemo(() => {
    // Basic polyfill/usage if useSearchParams from react-router aren't available setup in this file context,
    // assuming standard window.location parsing or we could use 'useLocation' hook.
    // Since we only import Link from react-router-dom, let's use window.location for simplicity or add the hook.
    // Actually, good practice to use useLocation.
    return [new URLSearchParams(window.location.search)];
  }, []);

  const recommendedService = searchParams.get('service');
  const recommendationReason = searchParams.get('reason');

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black font-body">
      {/* Background Decor */}
      <div className="absolute inset-0 z-0 opacity-10 bg-[radial-gradient(#d4af37_1px,transparent_1px)] [background-size:40px_40px] pointer-events-none"></div>
      <div className="absolute top-[-10%] left-[-5%] w-[500px] h-[500px] bg-gold-400/10 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-[-10%] right-[-5%] w-[600px] h-[600px] bg-gold-400/5 rounded-full blur-[120px] pointer-events-none"></div>

      {/* Header */}
      <header className="relative z-10 container mx-auto px-4 py-6">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-gold-400 hover:text-gold-300 transition-colors font-medium group"
        >
          <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
          Vissza a főoldalra
        </Link>
      </header>

      {/* Main Content */}
      <main className="relative z-10 container mx-auto px-4 pb-16">
        {/* Recommendation Banner */}
        {recommendedService && recommendationReason && (
          <div className="max-w-3xl mx-auto mb-8 animate-fade-in-up">
            <div className="bg-gradient-to-r from-gray-800 to-gray-900 border border-gold-400/40 rounded-2xl p-6 shadow-xl shadow-gold-400/10 relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4 opacity-10 text-gold-400">
                <Sparkles size={100} />
              </div>
              <div className="relative z-10">
                <div className="flex items-center gap-2 text-gold-400 font-bold uppercase text-xs tracking-wider mb-2">
                  <Bot size={16} />
                  <span>Személyre szabott ajánlás</span>
                </div>
                <h3 className="text-2xl font-heading font-bold text-white mb-2">
                  Ezt választottuk neked: <span className="text-gold-400">{recommendedService}</span>
                </h3>
                <p className="text-gray-300 leading-relaxed max-w-2xl">
                  {recommendationReason}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Hero Section */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 bg-gold-400/10 text-gold-400 px-4 py-2 rounded-full text-sm font-semibold mb-6 border border-gold-400/20">
            <Calendar size={16} />
            Online időpontfoglalás
          </div>
          <h1 className="font-heading text-4xl md:text-5xl font-bold text-white mb-4">
            Foglalj <span className="text-gold-400">időpontot</span>
          </h1>
          <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
            Bence Masszázs Szalon – válaszd ki a számodra megfelelő időpontot pár kattintással.
          </p>
        </div>

        {/* Location Card  */}
        <div className="max-w-lg mx-auto mb-8">
          <div className="bg-gray-900/80 backdrop-blur-sm border border-gray-800 rounded-2xl p-6 flex items-center justify-between shadow-lg hover:border-gold-400/30 transition-all group">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gray-800 rounded-full flex items-center justify-center border border-gray-700 group-hover:border-gold-400/50 group-hover:bg-gold-400/10 transition-all">
                <MapPin size={24} className="text-gray-400 group-hover:text-gold-400 transition-colors" />
              </div>
              <div>
                <p className="text-gray-500 text-xs font-bold uppercase tracking-wider mb-1">Helyszín</p>
                <p className="text-white text-lg font-bold font-heading">
                  4400 Nyíregyháza
                </p>
                <p className="text-gray-300">
                  Szent István utca 2.
                </p>
              </div>
            </div>

            <a
              href="https://www.google.com/maps/search/?api=1&query=Nyíregyháza+Szent+István+utca+2"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:flex items-center gap-2 text-sm font-bold text-gold-400 hover:text-white transition-colors bg-gold-400/10 hover:bg-gold-400/20 px-4 py-2 rounded-lg"
            >
              Térkép
              <ArrowLeft className="rotate-180" size={14} />
            </a>
          </div>
        </div>

        {/* Booking Widget Container */}
        <div className="max-w-lg mx-auto mb-12">
          <BookingWidget initialService={recommendedService} />
        </div>

        {/* Cancellation Policy & Pass Info */}
        <div className="max-w-2xl mx-auto">
          <div className="bg-gray-900/50 border border-gray-800 rounded-2xl p-8 backdrop-blur-sm">
            <h3 className="font-heading font-bold text-white text-xl mb-6 flex items-center gap-2">
              <span className="text-gold-400">ℹ️</span>
              Lemondási Feltételek és Házirend
            </h3>

            <div className="space-y-6 text-gray-400 text-sm leading-relaxed">
              <div>
                <h4 className="text-white font-semibold mb-2">Időpont lemondása és módosítása</h4>
                <ul className="space-y-2 list-disc pl-4">
                  <li><strong>48 órával</strong> az időpont előtt: Díjmentes.</li>
                  <li><strong>24-48 órán belül</strong>: Módosítás/lemondás esetén felár fizetendő.</li>
                  <li><strong>Aznap / Meg nem jelenés</strong>: A kezelés teljes díja fizetendő.</li>
                </ul>
                <p className="mt-2 text-xs italic text-gray-500">
                  Meg nem jelenés és értesítés elmulasztása esetén a későbbiekben nem áll módomban új időpontot biztosítani.
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="text-white font-semibold mb-2">Ajándékutalványok</h4>
                  <p>
                    Lefoglalt időpontban való meg nem jelenés esetén az utalvány <strong>felhasználtnak minősül</strong>.
                  </p>
                </div>

                <div>
                  <h4 className="text-white font-semibold mb-2">Bérletek érvényessége</h4>
                  <ul className="space-y-1">
                    <li><span className="text-gold-400">3 alkalmas:</span> 5 hónap</li>
                    <li><span className="text-gold-400">5 alkalmas:</span> 6 hónap</li>
                    <li><span className="text-gold-400">8 alkalmas:</span> 8 hónap</li>
                    <li><span className="text-gold-400">10 alkalmas:</span> 12 hónap</li>
                  </ul>
                </div>
              </div>

              <div className="pt-4 border-t border-gray-800 text-center">
                <p className="text-white font-medium">
                  Kérlek, a fentiek tudatában foglalj időpontot. Köszönöm az együttműködést!
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer note */}
        <p className="text-center text-gray-500 text-sm mt-8 max-w-md mx-auto">
          A foglalás után visszaigazolást kapsz. Ha kérdésed van, keress bátran!
        </p>
      </main>
    </div>
  );
};


export default BookingPage;
