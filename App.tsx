import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ProblemSection } from './components/ProblemSection';
import { SolutionSection } from './components/SolutionSection';
import { Testimonials } from './components/Testimonials';
import { FAQ } from './components/FAQ';
import { Footer } from './components/Footer';
import { BookingPage } from './components/BookingPage';
import { PrivacyPolicy } from './components/PrivacyPolicy';

// Landing Page Component
function LandingPage() {
  return (
    <>
      <Navbar />
      <Hero />
      <ProblemSection />
      <SolutionSection />
      <Testimonials />
      <FAQ />
      <Footer />
    </>
  );
}

function App() {
  return (
    <div className="min-h-screen bg-slate-50 font-body selection:bg-teal-500/30 selection:text-teal-900">
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/foglalas" element={<BookingPage />} />
        <Route path="/adatvedelem" element={<PrivacyPolicy />} />
      </Routes>
    </div>
  );
}

export default App;