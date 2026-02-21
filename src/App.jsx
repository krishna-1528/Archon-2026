import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import ArchonPreloader from './components/ArchonPreloader';
import LandingAnimation from './components/LandingAnimation';
import FloatingSidebar from './components/FloatingSidebar';
import HomePage from './pages/HomePage';
import ArenasPage from './pages/ArenasPage';
import WorkshopsPage from './pages/WorkshopsPage';
import EventsPage from './pages/EventsPage';
import ExpoPage from './pages/ExpoPage';
import AboutPage from './pages/AboutPage';
// 1. Import the background component
import GamingPortalBG from './components/GamingPortalBG';

function App() {
  const hasSessionLoaded = typeof window !== 'undefined' && sessionStorage.getItem('archonLoaded') === 'true';
  const [showPreloader, setShowPreloader] = useState(!hasSessionLoaded);
  const [showLanding, setShowLanding] = useState(!hasSessionLoaded);

  const handlePreloaderComplete = () => {
    setShowPreloader(false);
  };

  const handleLandingComplete = () => {
    setShowLanding(false);
    if (typeof window !== 'undefined') {
      sessionStorage.setItem('archonLoaded', 'true');
    }
  };

  // src/App.jsx - Only showing the modified return section
return (
  <Router>
    <div className="bg-background min-h-screen text-white">
      <AnimatePresence mode="wait">
        {showPreloader && (
          <ArchonPreloader key="preloader" onComplete={handlePreloaderComplete} />
        )}
      </AnimatePresence>

      <AnimatePresence mode="wait">
        {!showPreloader && showLanding && (
          <LandingAnimation key="landing" onComplete={handleLandingComplete} />
        )}
      </AnimatePresence>

      {!showPreloader && !showLanding && (
        <>
          {/* 1. Add the background here so it stays behind all routes */}
          <GamingPortalBG />

          {/* 2. Lower the opacity of the grain texture so the animation is visible */}
          <div className="fixed inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 pointer-events-none z-10" />
          
          <FloatingSidebar />

          <main className="relative z-20">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/arenas" element={<ArenasPage />} />
              <Route path="/workshops" element={<WorkshopsPage />} />
              <Route path="/events" element={<EventsPage />} />
              <Route path="/expo" element={<ExpoPage />} />
              <Route path="/about" element={<AboutPage />} />
            </Routes>

            <footer className="relative px-4 py-8 text-center border-t border-white/10 opacity-50 text-[10px] tracking-widest uppercase">
              Archon 2026 // RRU Gandhinagar // Innovating Technology for National Security
            </footer>
          </main>
        </>
      )}
    </div>
  </Router>
);

}

export default App;