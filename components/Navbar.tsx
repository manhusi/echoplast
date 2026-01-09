import React, { useState, useEffect } from 'react';
import { Phone, CalendarCheck } from 'lucide-react';
import { LANDING_DATA } from '../constants';

export const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? 'bg-white/95 backdrop-blur-md shadow-lg shadow-slate-200/50 py-3' : 'bg-transparent py-6'}`}>
      <div className="container mx-auto px-4 lg:px-8 flex justify-between items-center">
        {/* Logo Section */}
        <a href="/" className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-teal-500 to-teal-600 rounded-xl flex items-center justify-center shadow-lg shadow-teal-500/20">
            <span className="text-white font-bold text-lg">E</span>
          </div>
          <div className="flex flex-col">
            <span className={`text-xl font-extrabold font-heading leading-none ${scrolled ? 'text-slate-800' : 'text-slate-800'}`}>
              ECHO
            </span>
            <span className="text-sm font-semibold text-teal-600 tracking-wide">
              Plasztikai Sebészet
            </span>
          </div>
        </a>

        {/* Contact Info & CTA */}
        <div className="flex items-center gap-4">
          {/* Phone - hidden on mobile */}
          <a
            href={`tel:${LANDING_DATA.contact_details.phone_number}`}
            className="hidden md:flex items-center gap-2 text-slate-600 hover:text-teal-600 transition-colors"
          >
            <Phone size={18} />
            <span className="font-medium">{LANDING_DATA.contact_details.phone_number}</span>
          </a>

          <a
            href="/foglalas"
            className={`group flex items-center gap-2 px-5 py-2.5 rounded-full font-bold text-sm transition-all duration-300 shadow-lg ${scrolled
              ? 'bg-teal-500 text-white hover:bg-teal-600 shadow-teal-500/30'
              : 'bg-teal-500 text-white hover:bg-teal-600 shadow-teal-500/20'
              }`}
          >
            <CalendarCheck size={18} className="transition-transform group-hover:scale-110" />
            <span>Konzultáció</span>
          </a>
        </div>
      </div>
    </nav>
  );
};