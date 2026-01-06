import React from 'react';
import { LANDING_DATA } from '../constants';
import { MapPin, Phone, Clock, ExternalLink } from 'lucide-react';

export const Footer: React.FC = () => {
  const { contact_details } = LANDING_DATA;

  return (
    <footer className="bg-black text-white pt-20 pb-10 border-t border-gold-400/20">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">

          {/* Brand */}
          <div className="col-span-1 lg:col-span-2">
            <h3 className="text-2xl font-bold font-heading text-white mb-6">
              Bence<span className="text-gold-400">Masszázs</span>
            </h3>
            <p className="text-gray-400 max-w-md leading-relaxed mb-6">
              Professzionális masszázs szolgáltatások Nyíregyháza központjában. Svéd, relax, aromaterápiás masszázs és speciális kezelések a tested és lelked harmóniájáért.
            </p>
            <a
              href="https://bencemasszazsnyiregyhaza.booked4.us/public/book"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-gold-400 text-black px-6 py-3 rounded-full font-bold hover:bg-gold-500 transition-colors"
            >
              Online időpontfoglalás
              <ExternalLink size={16} />
            </a>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-lg font-bold font-heading text-white mb-6">Elérhetőség</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-gray-400 hover:text-gold-400 transition-colors">
                <MapPin size={20} className="shrink-0 mt-1 text-gold-400" />
                <span>{contact_details.address}</span>
              </li>
              <li className="flex items-center gap-3 text-gray-400 hover:text-gold-400 transition-colors">
                <Phone size={20} className="shrink-0 text-gold-400" />
                <a href={`tel:${contact_details.phone_number.replace(/\s/g, '')}`}>{contact_details.phone_number}</a>
              </li>
            </ul>
          </div>

          {/* Hours */}
          <div>
            <h4 className="text-lg font-bold font-heading text-white mb-6">Nyitvatartás</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-gray-400">
                <Clock size={20} className="shrink-0 mt-1 text-gold-400" />
                <span>{contact_details.opening_hours}</span>
              </li>
              <li className="text-sm text-gray-500 italic mt-4">
                Bejelentkezés szükséges minden kezelésre.
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center text-gray-500 text-sm">
          <p>&copy; {new Date().getFullYear()} Bence Masszázs Szalon. Minden jog fenntartva.</p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <a href="#" className="hover:text-gold-400 transition-colors">Adatkezelés</a>
            <a href="#" className="hover:text-gold-400 transition-colors">ÁSZF</a>
          </div>
        </div>
      </div>
    </footer>
  );
};