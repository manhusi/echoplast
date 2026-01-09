import React from 'react';
import { LANDING_DATA } from '../constants';
import { MapPin, Phone, Mail, Clock, ExternalLink } from 'lucide-react';

export const Footer: React.FC = () => {
  const { contact_details } = LANDING_DATA;

  return (
    <footer className="bg-slate-900 text-white pt-20 pb-10">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">

          {/* Brand */}
          <div className="col-span-1 lg:col-span-2">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-teal-400 to-teal-600 rounded-xl flex items-center justify-center">
                <span className="text-white font-bold text-xl">E</span>
              </div>
              <div>
                <h3 className="text-2xl font-bold font-heading text-white">
                  ECHO
                </h3>
                <span className="text-teal-400 text-sm font-semibold">Plasztikai Sebészet</span>
              </div>
            </div>
            <p className="text-slate-400 max-w-md leading-relaxed mb-6">
              Dr. Péter Zoltán egyetemi főorvos - professzionális plasztikai sebészeti szolgáltatások Debrecenben.
              25+ év tapasztalat, nemzetközi képzés, személyre szabott megoldások.
            </p>
            <a
              href="/foglalas"
              className="inline-flex items-center gap-2 bg-teal-500 text-white px-6 py-3 rounded-full font-bold hover:bg-teal-600 transition-colors"
            >
              Konzultáció kérése
              <ExternalLink size={16} />
            </a>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-lg font-bold font-heading text-white mb-6">Elérhetőség</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-slate-400 hover:text-teal-400 transition-colors">
                <MapPin size={20} className="shrink-0 mt-1 text-teal-400" />
                <span>{contact_details.address}</span>
              </li>
              <li>
                <a href={`tel:${contact_details.phone_number}`} className="flex items-start gap-3 text-slate-400 hover:text-teal-400 transition-colors">
                  <Phone size={20} className="shrink-0 mt-1 text-teal-400" />
                  <span>{contact_details.phone_number}</span>
                </a>
              </li>
              <li>
                <a href={`mailto:${contact_details.email_address}`} className="flex items-start gap-3 text-slate-400 hover:text-teal-400 transition-colors">
                  <Mail size={20} className="shrink-0 mt-1 text-teal-400" />
                  <span>{contact_details.email_address}</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Hours */}
          <div>
            <h4 className="text-lg font-bold font-heading text-white mb-6">Rendelési idő</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-slate-400">
                <Clock size={20} className="shrink-0 mt-1 text-teal-400" />
                <span>{contact_details.opening_hours}</span>
              </li>
              <li className="text-sm text-slate-500 italic mt-4">
                Konzultáció időpontfoglalással.
              </li>
            </ul>

            {/* ÁNTSZ */}
            <div className="mt-6 pt-4 border-t border-slate-800">
              <p className="text-xs text-slate-500">
                ÁNTSZ engedélyszám: <span className="text-slate-400">060060274</span>
              </p>
            </div>
          </div>
        </div>

        <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center text-slate-500 text-sm">
          <p>&copy; {new Date().getFullYear()} ECHO Plasztikai Sebészet. Minden jog fenntartva.</p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <a href="/adatvedelem" className="hover:text-teal-400 transition-colors">Adatkezelés</a>
            <a href="https://www.echoplast.hu" target="_blank" rel="noopener noreferrer" className="hover:text-teal-400 transition-colors">echoplast.hu</a>
          </div>
        </div>
      </div>
    </footer>
  );
};