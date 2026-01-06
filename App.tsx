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
    <div className="min-h-screen bg-black font-body selection:bg-gold-400/30 selection:text-white">
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/foglalas" element={<BookingPage />} />
      </Routes>
    </div>
  );
}

export default App;