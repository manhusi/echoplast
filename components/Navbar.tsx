import React, { useState, useEffect } from 'react';
import { Phone } from 'lucide-react';
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
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? 'bg-black/95 backdrop-blur-md shadow-lg shadow-black/20 py-3' : 'bg-transparent py-6'}`}>
      <div className="container mx-auto px-4 lg:px-8 flex justify-between items-center">
        {/* Logo Section */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-gold-400 to-gold-600 rounded-full flex items-center justify-center">
            <span className="text-black font-bold text-lg">B</span>
          </div>
          <div className="flex flex-col">
            <span className={`text-xl font-extrabold font-heading leading-none ${scrolled ? 'text-white' : 'text-white'}`}>
              Bence
            </span>
            <span className="text-sm font-bold text-gold-400 tracking-widest uppercase">
              Masszázs
            </span>
          </div>
        </div>

        {/* Contact CTA - No Navigation Links */}
        <div className="flex items-center gap-4">
          <a
            href={`tel:${LANDING_DATA.contact_details.phone_number.replace(/\s/g, '')}`}
            className={`group flex items-center gap-2 px-5 py-2.5 rounded-full font-bold text-sm transition-all duration-300 shadow-lg ${scrolled
              ? 'bg-gold-400 text-black hover:bg-gold-500 shadow-gold-400/30'
              : 'bg-gold-400/90 text-black hover:bg-gold-400 shadow-gold-400/20'
              }`}
          >
            <Phone size={18} className="transition-transform group-hover:rotate-12" />
            <span className="hidden md:inline">{LANDING_DATA.contact_details.phone_number}</span>
            <span className="md:hidden">Hívás</span>
          </a>
        </div>
      </div>
    </nav>
  );
};