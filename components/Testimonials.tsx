import React from 'react';
import { DOCTOR_CREDENTIALS } from '../constants';
import { Award, GraduationCap, Globe, FileCheck, BookOpen, Building2 } from 'lucide-react';

export const Testimonials: React.FC = () => {
  // Since no testimonials/reviews provided, show credentials section instead
  const credentials = [
    {
      icon: GraduationCap,
      title: "Képzettség",
      items: DOCTOR_CREDENTIALS.education
    }
  ];

  const trainingLocations = [
    { city: "Koppenhága", country: "Dánia", year: "1994, 1997, 2004", icon: "🇩🇰" },
    { city: "Dublin", country: "Írország", year: "1996", icon: "🇮🇪" },
    { city: "Linköping", country: "Svédország", year: "2007", icon: "🇸🇪" },
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-white to-slate-50 overflow-hidden">
      <div className="container mx-auto px-4">

        {/* Section Header */}
        <div className="text-center mb-12">
          <span className="text-teal-600 font-bold uppercase tracking-widest text-sm mb-3 block">Referenciák</span>
          <h2 className="text-3xl md:text-4xl font-bold font-heading text-slate-800 mb-4">
            Képzettség és Tapasztalat
          </h2>
          <p className="text-slate-600 max-w-2xl mx-auto">
            Dr. Péter Zoltán nemzetközi szinten elismert szakember,
            Európa vezető klinikáin szerzett tapasztalattal.
          </p>
        </div>

        {/* Education Timeline */}
        <div className="max-w-4xl mx-auto mb-16">
          <div className="bg-white rounded-2xl shadow-xl border border-slate-200 p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-teal-100 rounded-xl flex items-center justify-center">
                <GraduationCap className="text-teal-600" size={24} />
              </div>
              <h3 className="text-xl font-bold text-slate-800">Szakmai Végzettség</h3>
            </div>
            <div className="space-y-4">
              {DOCTOR_CREDENTIALS.education.map((item, i) => (
                <div key={i} className="flex items-start gap-4 p-4 bg-slate-50 rounded-xl">
                  <div className="w-8 h-8 bg-teal-500 rounded-full flex items-center justify-center shrink-0 mt-0.5">
                    <span className="text-white text-sm font-bold">{i + 1}</span>
                  </div>
                  <p className="text-slate-700">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* International Training */}
        <div className="max-w-5xl mx-auto mb-16">
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 text-teal-600 font-semibold mb-2">
              <Globe size={20} />
              <span className="uppercase tracking-wide text-sm">Nemzetközi Tanulmányutak</span>
            </div>
            <h3 className="text-2xl font-bold text-slate-800">Európa Vezető Klinikáin</h3>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {trainingLocations.map((loc, i) => (
              <div key={i} className="bg-white rounded-2xl shadow-lg border border-slate-200 p-6 text-center hover:shadow-xl hover:-translate-y-1 transition-all">
                <div className="text-4xl mb-4">{loc.icon}</div>
                <h4 className="text-xl font-bold text-slate-800 mb-1">{loc.city}</h4>
                <p className="text-slate-500 text-sm mb-2">{loc.country}</p>
                <p className="text-teal-600 font-semibold">{loc.year}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Specializations & Publications */}
        <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-8">
          {/* Specializations */}
          <div className="bg-gradient-to-br from-teal-500 to-teal-600 rounded-2xl p-8 text-white shadow-xl">
            <div className="flex items-center gap-3 mb-6">
              <Award className="text-white" size={28} />
              <h3 className="text-xl font-bold">Szakterületek</h3>
            </div>
            <ul className="space-y-3">
              {DOCTOR_CREDENTIALS.specializations.map((spec, i) => (
                <li key={i} className="flex items-center gap-3">
                  <span className="w-2 h-2 bg-white rounded-full"></span>
                  <span className="text-teal-50">{spec}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Publications */}
          <div className="bg-white rounded-2xl p-8 border border-slate-200 shadow-xl">
            <div className="flex items-center gap-3 mb-6">
              <BookOpen className="text-teal-600" size={28} />
              <h3 className="text-xl font-bold text-slate-800">Publikációk</h3>
            </div>
            <p className="text-slate-600 leading-relaxed mb-4">
              {DOCTOR_CREDENTIALS.publications}
            </p>
            <div className="flex flex-wrap gap-2">
              <span className="text-xs bg-slate-100 text-slate-600 px-3 py-1 rounded-full">Magyar Sebészet</span>
              <span className="text-xs bg-slate-100 text-slate-600 px-3 py-1 rounded-full">Magyar Traumatológia</span>
              <span className="text-xs bg-slate-100 text-slate-600 px-3 py-1 rounded-full">Int. Wound Journal</span>
              <span className="text-xs bg-slate-100 text-slate-600 px-3 py-1 rounded-full">Eur. J. Plast. Surg.</span>
            </div>
          </div>
        </div>

        {/* ÁNTSZ Badge */}
        <div className="mt-12 text-center">
          <div className="inline-flex items-center gap-3 bg-emerald-50 border border-emerald-200 px-6 py-3 rounded-full">
            <FileCheck className="text-emerald-600" size={24} />
            <span className="text-emerald-700 font-semibold">ÁNTSZ Engedélyszám: 060060274</span>
          </div>
        </div>

      </div>
    </section>
  );
};