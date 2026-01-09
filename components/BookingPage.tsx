import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Calendar, Clock, MapPin, Star, Sparkles, Bot, Phone, Mail } from 'lucide-react';
import { BookingWidget } from '../booking/BookingWidget';
import { LANDING_DATA } from '../constants';
import '../booking/styles.css';

// Parse search params
export const BookingPage: React.FC = () => {
  const [searchParams] = React.useMemo(() => {
    return [new URLSearchParams(window.location.search)];
  }, []);

  const recommendedService = searchParams.get('service');
  const recommendationReason = searchParams.get('reason');

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-teal-50/30 font-body">
      {/* Background Decor */}
      <div className="absolute inset-0 z-0 opacity-30 bg-[radial-gradient(#0d9488_0.5px,transparent_0.5px)] [background-size:32px_32px] pointer-events-none"></div>
      <div className="absolute top-[-10%] left-[-5%] w-[500px] h-[500px] bg-teal-400/10 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-[-10%] right-[-5%] w-[600px] h-[600px] bg-teal-400/5 rounded-full blur-[120px] pointer-events-none"></div>

      {/* Header */}
      <header className="relative z-10 container mx-auto px-4 py-6">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-teal-600 hover:text-teal-700 transition-colors font-medium group"
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
            <div className="bg-gradient-to-r from-teal-50 to-white border border-teal-200 rounded-2xl p-6 shadow-xl shadow-teal-500/10 relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4 opacity-10 text-teal-400">
                <Sparkles size={100} />
              </div>
              <div className="relative z-10">
                <div className="flex items-center gap-2 text-teal-600 font-bold uppercase text-xs tracking-wider mb-2">
                  <Bot size={16} />
                  <span>Személyre szabott ajánlás</span>
                </div>
                <h3 className="text-2xl font-heading font-bold text-slate-800 mb-2">
                  Ajánlott beavatkozás: <span className="text-teal-600">{recommendedService}</span>
                </h3>
                <p className="text-slate-600 leading-relaxed max-w-2xl">
                  {recommendationReason}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Hero Section */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 bg-teal-100 text-teal-700 px-4 py-2 rounded-full text-sm font-semibold mb-6 border border-teal-200">
            <Calendar size={16} />
            Online konzultáció foglalás
          </div>
          <h1 className="font-heading text-4xl md:text-5xl font-bold text-slate-800 mb-4">
            Foglaljon <span className="text-teal-600">konzultációt</span>
          </h1>
          <p className="text-slate-600 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
            ECHO Plasztikai Sebészet – Dr. Péter Zoltán egyetemi főorvos személyesen vizsgálja meg.
          </p>
        </div>

        {/* Location Card  */}
        <div className="max-w-lg mx-auto mb-8">
          <div className="bg-white border border-slate-200 rounded-2xl p-6 flex items-center justify-between shadow-lg hover:border-teal-300 transition-all group">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-teal-50 rounded-full flex items-center justify-center border border-teal-100 group-hover:border-teal-300 group-hover:bg-teal-100 transition-all">
                <MapPin size={24} className="text-teal-600" />
              </div>
              <div>
                <p className="text-slate-500 text-xs font-bold uppercase tracking-wider mb-1">Helyszín</p>
                <p className="text-slate-800 text-lg font-bold font-heading">
                  {LANDING_DATA.contact_details.address}
                </p>
              </div>
            </div>

            <a
              href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(LANDING_DATA.contact_details.address)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:flex items-center gap-2 text-sm font-bold text-teal-600 hover:text-white hover:bg-teal-500 transition-colors bg-teal-50 px-4 py-2 rounded-lg border border-teal-200"
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

        {/* Consultation Info */}
        <div className="max-w-2xl mx-auto">
          <div className="bg-white border border-slate-200 rounded-2xl p-8 shadow-lg">
            <h3 className="font-heading font-bold text-slate-800 text-xl mb-6 flex items-center gap-2">
              <span className="text-teal-500">ℹ️</span>
              Tudnivalók a konzultációról
            </h3>

            <div className="space-y-6 text-slate-600 text-sm leading-relaxed">
              <div>
                <h4 className="text-slate-800 font-semibold mb-2">Mi történik a konzultáción?</h4>
                <ul className="space-y-2 list-disc pl-4">
                  <li>Dr. Péter Zoltán személyesen megvizsgálja az Ön helyzetét</li>
                  <li>Megbeszélik az elképzeléseit és a realisztikus lehetőségeket</li>
                  <li>Részletes tájékoztatást kap a beavatkozásról és a kockázatokról</li>
                  <li>Választ kap minden kérdésére</li>
                </ul>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="text-slate-800 font-semibold mb-2">Konzultáció díja</h4>
                  <p>
                    A konzultáció díja <strong className="text-teal-600">beleszámít</strong> a későbbi műtét árába, amennyiben a beavatkozás mellett dönt.
                  </p>
                </div>

                <div>
                  <h4 className="text-slate-800 font-semibold mb-2">Lemondás</h4>
                  <p>
                    Kérjük, lemondás esetén legalább <strong>24 órával</strong> korábban jelezze telefonon.
                  </p>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100">
                <h4 className="text-slate-800 font-semibold mb-3">Elérhetőségek</h4>
                <div className="flex flex-col sm:flex-row gap-4">
                  <a href={`tel:${LANDING_DATA.contact_details.phone_number}`} className="flex items-center gap-2 text-teal-600 hover:text-teal-700">
                    <Phone size={18} />
                    {LANDING_DATA.contact_details.phone_number}
                  </a>
                  <a href={`mailto:${LANDING_DATA.contact_details.email_address}`} className="flex items-center gap-2 text-teal-600 hover:text-teal-700">
                    <Mail size={18} />
                    {LANDING_DATA.contact_details.email_address}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer note */}
        <p className="text-center text-slate-500 text-sm mt-8 max-w-md mx-auto">
          A foglalás után visszaigazolást kap. Ha kérdése van, keressen minket bizalommal!
        </p>
      </main>
    </div>
  );
};


export default BookingPage;
